import { createContext } from "react";
import type { Credit, Genre, MediaDetails, MediaListItem, Review, Video } from "../../types/tmdb";

export interface MovieSummaryContextValue {
  setGenresArray: (genre_ids: Genre[] | undefined) => Promise<void>;
  getMovie: (id: string | undefined) => Promise<void>;
  getReviews: (id: string | undefined) => Promise<void>;
  getCast: (id: string | undefined) => Promise<void>;
  getVideos: (id: string | undefined) => Promise<void>;
  getSimilarMovies: (id: string | undefined) => Promise<void>;
  // Starts as `{}` until the first fetch lands.
  movie: MediaDetails;
  reviews: Review[];
  cast: Credit[];
  videos: Video[];
  similarMovies: MediaListItem[];
  genres: Genre[];
}

// No default value on purpose (as before): every consumer sits under its provider in App.
const movieSummaryContext = createContext<MovieSummaryContextValue>(undefined as unknown as MovieSummaryContextValue);
export default movieSummaryContext;
