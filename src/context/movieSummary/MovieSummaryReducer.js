import {
  FETCH_GENRES_MOVIESUMMARY, 
  FETCH_MOVIE_MOVIESUMMARY,
  FETCH_REVIEWS_MOVIESUMMARY,
  FETCH_CAST_MOVIESUMMARY,
  FETCH_VIDEOS_MOVIESUMMARY,
  FETCH_SIMILARMOVIES_MOVIESUMMARY} from "../types"; 

export default ( state, action ) => {
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