import {
  FETCH_MOVIES_MAINCONTENT, 
  SET_APP_CONTENT,
  FETCH_WHATSSHOWING_MOVIESUMMARY} from "../types"; 
import type { MediaListItem } from "../../types/tmdb";

export interface MainContentState {
  movies: MediaListItem[];
  whatsShowing: string;
  appWideContent: string;
}

export type MainContentAction =
  | { type: typeof FETCH_MOVIES_MAINCONTENT; payload: MediaListItem[] }
  | { type: typeof FETCH_WHATSSHOWING_MOVIESUMMARY; payload: string }
  | { type: typeof SET_APP_CONTENT; payload: string };

export default ( state: MainContentState, action: MainContentAction ): MainContentState => {
  switch (action.type) {
    case FETCH_MOVIES_MAINCONTENT:
      return {
        ...state,
        movies: action.payload
      };
      case FETCH_WHATSSHOWING_MOVIESUMMARY:
      return {
        ...state,
        whatsShowing: action.payload
      };
      case SET_APP_CONTENT:
      return {
        ...state,
        appWideContent: action.payload
      };
    default: 
      return state;
  }
};
