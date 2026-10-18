import React, { type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ApiError } from './tmdbClient';
import {
  searchResultKey,
  useDetails,
  useGenres,
  useMediaList,
  useMostPopular,
  usePersonMovieCredits,
  useSearch,
} from './queries';

const item = (id: number, extra: Record<string, unknown> = {}) => ({
  id,
  backdrop_path: null,
  poster_path: '/p.jpg',
  overview: '',
  vote_average: 5,
  popularity: 1,
  ...extra,
});

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

describe('query hooks (fetch is mocked)', () => {
  const fetchMock = vi.fn<typeof fetch>();
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const requested = () => fetchMock.mock.calls.map(([input]) => new URL(String(input)));
  const requestedPaths = () => requested().map((url) => url.pathname);

  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
    vi.stubGlobal('fetch', fetchMock);
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('useMediaList asks for on_the_air for series "now playing" and returns the results', async () => {
    fetchMock.mockResolvedValue(json({ page: 1, results: [item(1), item(2)] }));

    const { result } = renderHook(() => useMediaList('tv', 'now_playing'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.map((m) => m.id)).toEqual([1, 2]);
    expect(requestedPaths()).toEqual(['/3/tv/on_the_air']);
  });

  it('useMediaList keys the request by category, so a category change fetches exactly once more (B5)', async () => {
    fetchMock.mockImplementation(async (input) =>
      json({ results: [item(String(input).includes('top_rated') ? 20 : 10)] }),
    );

    const { result, rerender } = renderHook(
      ({ category }: { category: 'now_playing' | 'top_rated' }) => useMediaList('movie', category),
      { wrapper, initialProps: { category: 'now_playing' } },
    );
    await waitFor(() => expect(result.current.data?.[0]?.id).toBe(10));

    rerender({ category: 'top_rated' });
    await waitFor(() => expect(result.current.data?.[0]?.id).toBe(20));

    expect(requestedPaths()).toEqual(['/3/movie/now_playing', '/3/movie/top_rated']);
  });

  it('useMostPopular picks the most popular entry', async () => {
    fetchMock.mockResolvedValue(
      json({ results: [item(1, { popularity: 3 }), item(2, { popularity: 9 }), item(3, { popularity: 5 })] }),
    );

    const { result } = renderHook(() => useMostPopular('movie'), { wrapper });

    await waitFor(() => expect(result.current.data?.id).toBe(2));
  });

  it('useGenres reads the genre list of the media type', async () => {
    fetchMock.mockResolvedValue(json({ genres: [{ id: 1, name: 'Drama' }] }));

    const { result } = renderHook(() => useGenres('tv'), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual([{ id: 1, name: 'Drama' }]));
    expect(requestedPaths()).toEqual(['/3/genre/tv/list']);
  });

  it('useDetails does not fetch without an id and fetches once with one', async () => {
    fetchMock.mockResolvedValue(json({ id: 7, title: 'Seven' }));

    const { result, rerender } = renderHook(({ id }: { id?: string }) => useDetails('movie', id), {
      wrapper,
      initialProps: {} as { id?: string },
    });
    expect(fetchMock).not.toHaveBeenCalled();

    rerender({ id: '7' });
    await waitFor(() => expect(result.current.data?.title).toBe('Seven'));
    rerender({ id: '7' });

    expect(requestedPaths()).toEqual(['/3/movie/7']);
  });

  it('usePersonMovieCredits sorts by rating, drops titles without a poster and keeps 24', async () => {
    const cast = [
      item(1, { vote_average: 3 }),
      item(2, { vote_average: 9 }),
      item(3, { vote_average: 10, poster_path: null }),
      ...Array.from({ length: 30 }, (_, i) => item(100 + i, { vote_average: 4 })),
    ];
    fetchMock.mockResolvedValue(json({ cast }));

    const { result } = renderHook(() => usePersonMovieCredits('5'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(24);
    expect(result.current.data?.[0]?.id).toBe(2);
    expect(result.current.data?.some((m) => m.id === 3)).toBe(false);
  });

  it('usePersonMovieCredits sorts a copy, so the cached response keeps its order (B17)', async () => {
    const cast = [item(1, { vote_average: 1 }), item(2, { vote_average: 9 }), item(3, { vote_average: 5 })];
    fetchMock.mockResolvedValue(json({ cast }));

    const { result } = renderHook(() => usePersonMovieCredits('6'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.map((m) => m.id)).toEqual([2, 3, 1]);
    const cached = queryClient.getQueryData<{ cast: { id: number }[] }>(['tmdb', 'person-credits', '6']);
    expect(cached?.cast.map((m) => m.id)).toEqual([1, 2, 3]);
  });
  it('useSearch runs both searches in parallel, merges by popularity and gives unique keys (B7, B8)', async () => {
    fetchMock.mockImplementation(async (input) => {
      const url = new URL(String(input));
      return url.pathname.endsWith('/movie')
        ? json({ results: [item(1, { popularity: 5 }), item(2, { popularity: 50 })] })
        : json({ results: [item(1, { popularity: 20 })] });
    });

    const { result } = renderHook(() => useSearch('a & b'), { wrapper });

    // Both requests are in flight before either answer lands.
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data.map(searchResultKey)).toEqual(['movie-2', 'tv-1', 'movie-1']);
    expect(new Set(result.current.data.map(searchResultKey)).size).toBe(3);
    expect(requested().every((url) => url.searchParams.get('query') === 'a & b')).toBe(true);
  });

  it('useSearch does nothing for an empty query', () => {
    renderHook(() => useSearch(''), { wrapper });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('surfaces a non-ok response as ApiError instead of crashing on undefined data (B11)', async () => {
    fetchMock.mockResolvedValue(json({ status_message: 'nope' }, 401));

    const { result } = renderHook(() => useMediaList('movie', 'popular'), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(ApiError);
    expect((result.current.error as ApiError).status).toBe(401);
  });
});
