import React, {useReducer} from "react";
import HeaderContext from './HeaderContext';
import HeaderReducer from './HeaderReducer';
import { 
  FETCH_GENRES,
  FETCH_MOSTPOPULAR_MOVIE } from '../types';

const HeaderState = props => {

  const initialState = {
    genres: [],
    mostPopularMovie: {}
  };

  const [state, dispatch] = useReducer(HeaderReducer, initialState);

  const setGenresArray = async (genre_ids) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();
    if (genre_ids) {
      const genresArray = data.genres.filter(element => genre_ids.includes(element.id));

      genresArray && dispatch({
        type: FETCH_GENRES,
        payload: genresArray
      });
    }
  }

  const getMostPopularMovie = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    const popularMovie = data.results.sort((a,b) => {
        return b.popularity - a.popularity;
    });

    popularMovie && dispatch({
      type: FETCH_MOSTPOPULAR_MOVIE,
      payload: popularMovie[0]
    });
  }

  return (
    <HeaderContext.Provider value={{
      setGenresArray, 
      getMostPopularMovie, 
      genres: state.genres, 
      mostPopularMovie: state.mostPopularMovie 
    }}>
      {props.children}
    </HeaderContext.Provider>
  )
}

export default HeaderState;