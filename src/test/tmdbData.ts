// Small TMDB-shaped payloads for component tests.
export const item = (id: number, extra: Record<string, unknown> = {}) => ({
  id,
  title: `Movie ${id}`,
  backdrop_path: null,
  poster_path: '/p.jpg',
  overview: 'An overview',
  vote_average: 7,
  popularity: id,
  release_date: '2024-03-04',
  ...extra,
});

export const page = (...results: unknown[]) => ({ page: 1, results });

export const emptyDetailRoutes = {
  '/reviews': { results: [] },
  '/credits': { cast: [] },
  '/videos': { results: [] },
  '/similar': page(),
};