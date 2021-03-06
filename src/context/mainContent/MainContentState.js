import React, {useReducer} from "react";
import MainContentContext from './MainContentContext';
import MainContentReducer from './MainContentReducer';
import {
  FETCH_MOVIES_MAINCONTENT, 
  SET_APP_CONTENT,
  FETCH_WHATSSHOWING_MOVIESUMMARY} from "../types.js"; 

const MainContentState = props => {

  const initialState = {
    movies: [],
    whatsShowing: "Now playing",
    appWideContent: "movies"
  };

  const [state, dispatch] = useReducer(MainContentReducer, initialState);

  const InitialCardState = async () => {
    let response;
    if (state.appWideContent === "movies") {
       response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
       response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
      const data = await response.json();
  
      data && dispatch({
        type: FETCH_MOVIES_MAINCONTENT,
        payload: data.results
      })
    } 

  const handleClick = async (e) => {
    let requestName = e.currentTarget.getAttribute("data-content");
    let response;
    if (state.appWideContent === "movies") {
       response = await fetch(`https://api.themoviedb.org/3/movie/${requestName}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
       response = await fetch(`https://api.themoviedb.org/3/tv/${requestName}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
    
      const data = await response.json();

      const cardTitle = requestName && requestName.replace(/_/g, " ");
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

  const setSiteContent = (e) => {
    const siteContent = e.target.getAttribute("data-content");

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