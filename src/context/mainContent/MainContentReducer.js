import {
  FETCH_MOVIES_MAINCONTENT, 
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
    default: 
      return state;
  }
};