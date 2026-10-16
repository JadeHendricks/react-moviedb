import React, {useReducer, useContext, type ReactNode} from "react";
import HeaderContext from './HeaderContext';
import HeaderReducer, { type HeaderStateShape } from './HeaderReducer';
import MainContentContext from "../mainContent/MainContentContext";
import { 
  FETCH_GENRES,
  FETCH_MOSTPOPULAR_MOVIE } from '../types';
import type { Genre, MediaListItem, Paged } from "../../types/tmdb";

const HeaderState = (props: { children?: ReactNode }) => {
  const mainContentContext = useContext(MainContentContext);
  const {appWideContent} = mainContentContext;
  const initialState: HeaderStateShape = {
    genres: [],
    mostPopularMovie: {}
  };
  const [state, dispatch] = useReducer(HeaderReducer, initialState);

  const setGenresArray = async (genre_ids: number[] | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US`);
    const data: { genres: Genre[] } = await response.json();
    if (genre_ids) {
      const genresArray = data.genres.filter(element => genre_ids.includes(element.id));
      genresArray && dispatch({
        type: FETCH_GENRES,
        payload: genresArray
      });
    }
  }

  const getMostPopularMovie = async () => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
    const data: Paged<MediaListItem> = await response.json();
    const popularMovie = data.results.sort((a,b) => {
        return b.popularity - a.popularity;
    });
    popularMovie && dispatch({
      type: FETCH_MOSTPOPULAR_MOVIE,
      // An empty list stores undefined, exactly as before (fixed with B11 in Phase 4).
      payload: popularMovie[0] as MediaListItem
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
