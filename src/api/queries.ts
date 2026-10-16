import { useCallback } from 'react';
import {
  keepPreviousData,
  queryOptions,
  useQueries,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import { tmdbGet } from './tmdbClient';
import type { Credit, Genre, MediaDetails, MediaListItem, Paged, Person, Review, Video } from '../types/tmdb';

/** The path segment TMDB uses. The UI calls these "movies" and "series" (see UiContext). */
export type MediaType = 'movie' | 'tv';
export type Category = 'now_playing' | 'top_rated' | 'popular' | 'upcoming';
type Id = string | number | undefined;

// Series have no "now playing" list; TMDB calls it "on the air".
const listPath = (type: MediaType, category: Category) =>
  `${type}/${type === 'tv' && category === 'now_playing' ? 'on_the_air' : category}`;

// Keys carry everything the request depends on, so a click only has to change state and the key does the fetching (B5).
export const tmdbKeys = {
  list: (type: MediaType, category: Category) => ['tmdb', 'list', type, category] as const,
  mostPopular: (type: MediaType) => ['tmdb', 'most-popular', type] as const,
  genres: (type: MediaType) => ['tmdb', 'genres', type] as const,
  details: (type: MediaType, id: Id) => ['tmdb', 'details', type, id] as const,
  reviews: (type: MediaType, id: Id) => ['tmdb', 'reviews', type, id] as const,
  cast: (type: MediaType, id: Id) => ['tmdb', 'cast', type, id] as const,
  videos: (type: MediaType, id: Id) => ['tmdb', 'videos', type, id] as const,
  similar: (type: MediaType, id: Id) => ['tmdb', 'similar', type, id] as const,
  person: (id: Id) => ['tmdb', 'person', id] as const,
  personCredits: (id: Id) => ['tmdb', 'person-credits', id] as const,
  search: (kind: MediaType, query: string) => ['tmdb', 'search', kind, query] as const,
};

export const useMediaList = (type: MediaType, category: Category) =>
  useQuery({
    queryKey: tmdbKeys.list(type, category),
    queryFn: ({ signal }) => tmdbGet<Paged<MediaListItem>>(listPath(type, category), { page: 1 }, signal),
    select: (data) => data.results,
    // Keep showing the old cards until the new category lands, as the old context did.
    placeholderData: keepPreviousData,
  });

/** The hero: the most popular title of the popular list. */
export const useMostPopular = (type: MediaType) =>
  useQuery({
    queryKey: tmdbKeys.mostPopular(type),
    queryFn: ({ signal }) => tmdbGet<Paged<MediaListItem>>(`${type}/popular`, { page: 1 }, signal),
    // Sort a copy: `select` must not mutate the cached response.
    select: (data) => [...data.results].sort((a, b) => b.popularity - a.popularity)[0],
    placeholderData: keepPreviousData,
  });

export const useGenres = (type: MediaType) =>
  useQuery({
    queryKey: tmdbKeys.genres(type),
    queryFn: ({ signal }) => tmdbGet<{ genres: Genre[] }>(`genre/${type}/list`, {}, signal),
    select: (data) => data.genres,
  });

export const useDetails = (type: MediaType, id: Id) =>
  useQuery({
    queryKey: tmdbKeys.details(type, id),
    queryFn: ({ signal }) => tmdbGet<MediaDetails>(`${type}/${id}`, { page: 1 }, signal),
    enabled: id !== undefined,
  });

export const useReviews = (type: MediaType, id: Id) =>
  useQuery({
    queryKey: tmdbKeys.reviews(type, id),
    queryFn: ({ signal }) => tmdbGet<{ results: Review[] }>(`${type}/${id}/reviews`, { page: 1 }, signal),
    select: (data) => data.results,
    enabled: id !== undefined,
  });

export const useCast = (type: MediaType, id: Id) =>
  useQuery({
    queryKey: tmdbKeys.cast(type, id),
    queryFn: ({ signal }) => tmdbGet<{ cast: Credit[] }>(`${type}/${id}/credits`, { page: 1 }, signal),
    select: (data) => data.cast,
    enabled: id !== undefined,
  });

const videosOptions = (type: MediaType, id: Id) =>
  queryOptions({
    queryKey: tmdbKeys.videos(type, id),
    queryFn: ({ signal }) => tmdbGet<{ results: Video[] }>(`${type}/${id}/videos`, { page: 1 }, signal),
  });

export const useVideos = (type: MediaType, id: Id) =>
  useQuery({
    ...videosOptions(type, id),
    select: (data) => data.results,
    enabled: id !== undefined,
  });

export const useSimilar = (type: MediaType, id: Id) =>
  useQuery({
    queryKey: tmdbKeys.similar(type, id),
    queryFn: ({ signal }) => tmdbGet<Paged<MediaListItem>>(`${type}/${id}/similar`, { page: 1 }, signal),
    select: (data) => data.results,
    enabled: id !== undefined,
  });

export const usePerson = (id: Id) =>
  useQuery({
    queryKey: tmdbKeys.person(id),
    queryFn: ({ signal }) => tmdbGet<Person>(`person/${id}`, {}, signal),
    enabled: id !== undefined,
  });

/** "Popular Roles": best rated first (B17 keeps this order for now), titles without a poster dropped, 24 max. */
export const usePersonMovieCredits = (id: Id) =>
  useQuery({
    queryKey: tmdbKeys.personCredits(id),
    queryFn: ({ signal }) => tmdbGet<{ cast: MediaListItem[] }>(`person/${id}/movie_credits`, {}, signal),
    select: (data) =>
      [...data.cast]
        .sort((a, b) => b.vote_average - a.vote_average)
        .filter((movie) => movie.poster_path !== null)
        .slice(0, 24),
    enabled: id !== undefined,
  });

const searchOptions = (kind: MediaType, query: string) =>
  queryOptions({
    queryKey: tmdbKeys.search(kind, query),
    queryFn: ({ signal }) =>
      tmdbGet<Paged<MediaListItem>>(`search/${kind}`, { query, page: 1, include_adult: false }, signal),
    // TMDB leaves media_type off the per-type search endpoints; set it so ids from both lists never collide (B8).
    select: (data): MediaListItem[] => data.results.map((result) => ({ ...result, media_type: kind })),
    enabled: query !== '',
  });

// Module-level so Query can reuse the combined result while the inputs are unchanged.
const combineSearch = (results: UseQueryResult<MediaListItem[]>[]) => ({
  data: results.flatMap((result) => result.data ?? []).sort((a, b) => b.popularity - a.popularity),
  isLoading: results.some((result) => result.isLoading),
  error: results.find((result) => result.error)?.error ?? null,
});

/** Movie and series searches run in parallel; the merged list is ordered by popularity. */
export const useSearch = (query: string) =>
  useQueries({
    queries: [searchOptions('movie', query), searchOptions('tv', query)],
    combine: combineSearch,
  });

/** Key for a search result row: movie and series ids can be equal (B8). */
export const searchResultKey = (result: MediaListItem) => `${result.media_type}-${result.id}`;

/**
 * Opens the first video of a title on YouTube. The click only reads the cached/fetched videos query;
 * there is no hand-rolled fetch in the handler.
 */
export const usePlayTrailer = (type: MediaType, id: Id) => {
  const queryClient = useQueryClient();
  return useCallback(async () => {
    const data = await queryClient.fetchQuery(videosOptions(type, id));
    const key = data.results[0]?.key;
    if (!key) return;
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }, [queryClient, type, id]);
};
