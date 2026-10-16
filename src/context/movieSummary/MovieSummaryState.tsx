import React, {useContext, useReducer, type ReactNode} from "react";
import MovieSummaryContext from './MovieSummaryContext';
import MovieSummaryReducer, { type MovieSummaryStateShape } from './MovieSummaryReducer';
import MainContentContext from "../mainContent/MainContentContext";
import {
  FETCH_GENRES_MOVIESUMMARY, 
  FETCH_MOVIE_MOVIESUMMARY,
  FETCH_REVIEWS_MOVIESUMMARY,
  FETCH_CAST_MOVIESUMMARY,
  FETCH_VIDEOS_MOVIESUMMARY,
  FETCH_SIMILARMOVIES_MOVIESUMMARY} from "../types";
import type { Credit, Genre, MediaDetails, MediaListItem, Paged, Review, Video } from "../../types/tmdb"; 

const HeaderState = (props: { children?: ReactNode }) => {

  const mainContentContext = useContext(MainContentContext);
  const {appWideContent} = mainContentContext;

  const initialState: MovieSummaryStateShape = {
    movie: {},
    reviews: [],
    cast: [],
    videos: [],
    similarMovies: [],
    genres: []
  };

  const [state, dispatch] = useReducer(MovieSummaryReducer, initialState);

  const setGenresArray = async (genre_ids: Genre[] | undefined) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US`);
    }
      const data: { genres: Genre[] } = await response.json();
      if (genre_ids) {
        const genresArray = data.genres.filter(genreOne => genre_ids.find(genreTwo => genreOne.id === genreTwo.id));
  
        data && dispatch({  
          type: FETCH_GENRES_MOVIESUMMARY,
          payload: genresArray
        })
        
      }
  }

  const getMovie = async (id: string | undefined) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data: MediaDetails = await response.json();
      
      data && dispatch({  
        type: FETCH_MOVIE_MOVIESUMMARY,
        payload: data
      })
  }

  const getReviews = async (id: string | undefined) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data: { results: Review[] } = await response.json();
  
      data && dispatch({  
        type: FETCH_REVIEWS_MOVIESUMMARY,
        payload: data.results
      })
  }

  const getCast = async (id: string | undefined) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }

      const data: { cast: Credit[] } = await response.json();
  
      data && dispatch({  
        type: FETCH_CAST_MOVIESUMMARY,
        payload: data.cast
      })
  }

  const getVideos = async (id: string | undefined) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }

      const data: { results: Video[] } = await response.json();
  
      data && dispatch({  
        type: FETCH_VIDEOS_MOVIESUMMARY,
        payload: data.results
      })
  }

  const getSimilarMovies = async (id: string | undefined) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data: Paged<MediaListItem> = await response.json();
      
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