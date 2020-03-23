import { 
  FETCH_GENRES,
  FETCH_MOSTPOPULAR_MOVIE } from '../types';

export default ( state, action ) => {
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