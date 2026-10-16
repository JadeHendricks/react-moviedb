import { 
  FETCH_GENRES,
  FETCH_MOSTPOPULAR_MOVIE } from '../types';
import type { Genre, MediaListItem } from "../../types/tmdb";

export interface HeaderStateShape {
  genres: Genre[];
  mostPopularMovie: Partial<MediaListItem>;
}

export type HeaderAction =
  | { type: typeof FETCH_GENRES; payload: Genre[] }
  | { type: typeof FETCH_MOSTPOPULAR_MOVIE; payload: MediaListItem };

export default ( state: HeaderStateShape, action: HeaderAction ): HeaderStateShape => {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload
      };
      case FETCH_MOSTPOPULAR_MOVIE:
      return {
        ...state,
        mostPopularMovie: action.payload
      };
    default: 
      return state;
  }
};
