import React, {useReducer, type ReactNode, type MouseEvent} from "react";
import MainContentContext from './MainContentContext';
import MainContentReducer, { type MainContentState as MainContentStateShape } from './MainContentReducer';
import {
  FETCH_MOVIES_MAINCONTENT, 
  SET_APP_CONTENT,
  FETCH_WHATSSHOWING_MOVIESUMMARY} from "../types"; 
import type { MediaListItem, Paged } from "../../types/tmdb";

const MainContentState = (props: { children?: ReactNode }) => {
  const initialState: MainContentStateShape = {
    movies: [],
    whatsShowing: "Now playing",
    appWideContent: "movies"
  };
  const [state, dispatch] = useReducer(MainContentReducer, initialState);

  const InitialCardState = async () => {
    let response;
    if (state.appWideContent === "movies") {
       response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
       response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data: Paged<MediaListItem> = await response.json();
      data && dispatch({
        type: FETCH_MOVIES_MAINCONTENT,
        payload: data.results
      })
    } 

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    const requestName = e.currentTarget.getAttribute("data-content");
    let response;
    if (state.appWideContent === "movies") {
       response = await fetch(`https://api.themoviedb.org/3/movie/${requestName}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
       response = await fetch(`https://api.themoviedb.org/3/tv/${requestName}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data: Paged<MediaListItem> = await response.json();
      // Every caller sets data-content, so requestName is never null here. The assertion keeps the old behaviour exactly.
      const cardTitle = (requestName && requestName.replace(/_/g, " "))!;
      let formattedTitle = cardTitle.charAt(0).toUpperCase() + cardTitle.substring(1);
      if (formattedTitle === "On the air") {
        formattedTitle = "Now playing"
      }
      requestName && dispatch({
        type: FETCH_WHATSSHOWING_MOVIESUMMARY,
        payload: formattedTitle
      })
      data && dispatch({
        type: FETCH_MOVIES_MAINCONTENT,
        payload: data.results
      })
  }

  const setSiteContent = (e: MouseEvent<HTMLElement>) => {
    const siteContent = (e.target as HTMLElement).getAttribute("data-content");
    siteContent && dispatch({
      type: SET_APP_CONTENT,
      payload: siteContent
    });
    siteContent && dispatch({
      type: FETCH_WHATSSHOWING_MOVIESUMMARY,
      payload: "Now playing"
    });
  }

  return (
    <MainContentContext.Provider value={{
      InitialCardState,
      setSiteContent,
      handleClick,
      movies: state.movies,
      whatsShowing: state.whatsShowing,
      appWideContent: state.appWideContent
    }}>
      {props.children}
    </MainContentContext.Provider>
  )
}

export default MainContentState;
