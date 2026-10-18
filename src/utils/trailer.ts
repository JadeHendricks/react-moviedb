import type { Video } from '../types/tmdb';

/**
 * The YouTube key to open for "Watch Trailer" (B10): a YouTube video of type Trailer if there is one,
 * otherwise the first YouTube video. Returns undefined when there is nothing playable.
 */
export const pickTrailerKey = (videos: readonly Video[] | undefined): string | undefined => {
  const youtube = (videos ?? []).filter((video) => video.site === 'YouTube' && video.key);
  return (youtube.find((video) => video.type === 'Trailer') ?? youtube[0])?.key;
};

export const youtubeWatchUrl = (key: string): string => `https://www.youtube.com/watch?v=${encodeURIComponent(key)}`;