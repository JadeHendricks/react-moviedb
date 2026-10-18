import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { videosOptions, type MediaType } from '../api/queries';
import { pickTrailerKey, youtubeWatchUrl } from '../utils/trailer';

const openTrailer = (key: string | undefined) => {
  // `noopener` so the YouTube tab cannot reach back into this window (B10).
  if (key) window.open(youtubeWatchUrl(key), '_blank', 'noopener,noreferrer');
};

/**
 * One implementation of "Watch Trailer" for the hero, the cards and the detail page (B10).
 * Spread the result on the trigger: `<button {...useTrailer(type, id)}>`.
 *
 * The videos are fetched when the pointer or focus arrives, so by the click they are cached and the tab
 * opens synchronously, which popup blockers allow. If the click is the first contact (e.g. a keyboard
 * activation with no focus event), it waits for the videos and opens afterwards.
 */
export const useTrailer = (type: MediaType, id: string | number | undefined) => {
  const queryClient = useQueryClient();

  const prefetch = useCallback(() => {
    if (id === undefined) return;
    void queryClient.prefetchQuery(videosOptions(type, id));
  }, [queryClient, type, id]);

  const onClick = useCallback(() => {
    if (id === undefined) return;
    const options = videosOptions(type, id);
    const cached = queryClient.getQueryData(options.queryKey);
    if (cached) {
      openTrailer(pickTrailerKey(cached.results));
      return;
    }
    // A failed request just means there is no trailer to open; it must not become an unhandled rejection.
    queryClient
      .fetchQuery(options)
      .then((data) => openTrailer(pickTrailerKey(data.results)))
      .catch(() => undefined);
  }, [queryClient, type, id]);

  return useMemo(
    () => ({ onClick, onPointerEnter: prefetch, onPointerDown: prefetch, onFocus: prefetch }),
    [onClick, prefetch],
  );
};