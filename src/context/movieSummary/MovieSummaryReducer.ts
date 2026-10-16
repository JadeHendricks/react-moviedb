import {
  FETCH_GENRES_MOVIESUMMARY, 
  FETCH_MOVIE_MOVIESUMMARY,
  FETCH_REVIEWS_MOVIESUMMARY,
  FETCH_CAST_MOVIESUMMARY,
  FETCH_VIDEOS_MOVIESUMMARY,
  FETCH_SIMILARMOVIES_MOVIESUMMARY} from "../types"; 
import type { Credit, Genre, MediaDetails, MediaListItem, Review, Video } from "../../types/tmdb";

export interface MovieSummaryStateShape {
  movie: MediaDetails;
  reviews: Review[];
  cast: Credit[];
  videos: Video[];
  similarMovies: MediaListItem[];
  genres: Genre[];
}

export type MovieSummaryAction =
  | { type: typeof FETCH_GENRES_MOVIESUMMARY; payload: Genre[] }
  | { type: typeof FETCH_MOVIE_MOVIESUMMARY; payload: MediaDetails }
  | { type: typeof FETCH_REVIEWS_MOVIESUMMARY; payload: Review[] }
  | { type: typeof FETCH_CAST_MOVIESUMMARY; payload: Credit[] }
  | { type: typeof FETCH_VIDEOS_MOVIESUMMARY; payload: Video[] }
  | { type: typeof FETCH_SIMILARMOVIES_MOVIESUMMARY; payload: MediaListItem[] };

export default ( state: MovieSummaryStateShape, action: MovieSummaryAction ): MovieSummaryStateShape => {
  switch (action.type) {
    case FETCH_GENRES_MOVIESUMMARY:
      return {
        ...state,
        genres: action.payload
      };
      case FETCH_MOVIE_MOVIESUMMARY:
      return {
        ...state,
        movie: action.payload
      };
      case FETCH_REVIEWS_MOVIESUMMARY:
      return {
        ...state,
        reviews: action.payload
      };
      case FETCH_CAST_MOVIESUMMARY:
      return {
        ...state,
        cast: action.payload
      };
      case FETCH_VIDEOS_MOVIESUMMARY:
      return {
        ...state,
        videos: action.payload
      };
      case FETCH_SIMILARMOVIES_MOVIESUMMARY:
      return {
        ...state,
        similarMovies: action.payload
      };
    default: 
      return state;
  }
};
