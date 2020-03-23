import React, {useContext, useReducer} from "react";
import MovieSummaryContext from './MovieSummaryContext';
import MovieSummaryReducer from './MovieSummaryReducer';
import MainContentContext from "../mainContent/MainContentContext";
import {
  FETCH_GENRES_MOVIESUMMARY, 
  FETCH_MOVIE_MOVIESUMMARY,
  FETCH_REVIEWS_MOVIESUMMARY,
  FETCH_CAST_MOVIESUMMARY,
  FETCH_VIDEOS_MOVIESUMMARY,
  FETCH_SIMILARMOVIES_MOVIESUMMARY} from "../types.js"; 

const HeaderState = props => {

  const mainContentContext = useContext(MainContentContext);
  const {appWideContent} = mainContentContext;

  const initialState = {
    movie: {},
    reviews: [],
    cast: [],
    videos: [],
    similarMovies: [],
    genres: []
  };

  const [state, dispatch] = useReducer(MovieSummaryReducer, initialState);

  const setGenresArray = async (genre_ids) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    }
      const data = await response.json();
      if (genre_ids) {
        const genresArray = data.genres.filter(genreOne => genre_ids.find(genreTwo => genreOne.id === genreTwo.id));
  
        data && dispatch({  
          type: FETCH_GENRES_MOVIESUMMARY,
          payload: genresArray
        })
        
      }
  }

  const getMovie = async (id) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data = await response.json();
      
      data && dispatch({  
        type: FETCH_MOVIE_MOVIESUMMARY,
        payload: data
      })
  }

  const getReviews = async (id) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data = await response.json();
  
      data && dispatch({  
        type: FETCH_REVIEWS_MOVIESUMMARY,
        payload: data.results
      })
  }

  const getCast = async (id) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }

      const data = await response.json();
  
      data && dispatch({  
        type: FETCH_CAST_MOVIESUMMARY,
        payload: data.cast
      })
  }

  const getVideos = async (id) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }

      const data = await response.json();
  
      data && dispatch({  
        type: FETCH_VIDEOS_MOVIESUMMARY,
        payload: data.results
      })
  }

  const getSimilarMovies = async (id) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data = await response.json();
      
      data && dispatch({  
        type: FETCH_SIMILARMOVIES_MOVIESUMMARY,
        payload: data.results
      })
  }

  return (
    <MovieSummaryContext.Provider value={{
      setGenresArray,
      getMovie,
      getReviews,
      getCast,
      getVideos,
      getSimilarMovies,
      movie: state.movie,
      reviews: state.reviews,
      cast: state.cast,
      videos: state.videos,
      similarMovies: state.similarMovies,
      genres: state.genres
    }}>
      {props.children}
    </MovieSummaryContext.Provider>
  )
}

export default HeaderState;