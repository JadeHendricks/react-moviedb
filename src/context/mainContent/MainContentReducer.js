import {
  FETCH_MOVIES_MAINCONTENT, 
  SET_APP_CONTENT,
  FETCH_WHATSSHOWING_MOVIESUMMARY} from "../types"; 

export default ( state, action ) => {
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