// Shapes of the TMDB v3 responses this app reads. Only fields the UI touches are listed.
// Fields TMDB may omit or send as null are optional / nullable so strict mode shows every guard.

export interface Genre {
  id: number;
  name: string;
}

export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** One entry of a list endpoint (now playing, popular, search, similar, person credits). */
export interface MediaListItem {
  id: number;
  // Movies carry `title` + `release_date`; series carry `name` + `first_air_date`.
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  popularity: number;
  genre_ids?: number[];
  media_type?: string;
}

/** `movie/:id` */
export interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number | null;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  genres: Genre[];
}

/** `tv/:id` */
export interface Series {
  id: number;
  name: string;
  first_air_date: string;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  genres: Genre[];
}

/**
 * The movie summary page keeps movies and series in one state slot, which starts as `{}`
 * and is filled by whichever endpoint answered. Every field is therefore optional.
 */
export type MediaDetails = Partial<Movie> & Partial<Series>;

/** `person/:id` (starts as `{}` in state, so every field is optional on the page). */
export interface Person {
  id: number;
  name: string;
  biography: string;
  known_for_department: string;
  gender: number;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
}

/** A cast member from `movie|tv/:id/credits`. */
export interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

/** `movie|tv/:id/videos` */
export interface Video {
  id: string;
  key: string;
  // TMDB sends `name`; the page reads `title`, which is always undefined. Kept as-is for Phase 2.
  title?: string;
  name?: string;
  site?: string;
  type?: string;
}

/** `movie|tv/:id/reviews` */
export interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}
