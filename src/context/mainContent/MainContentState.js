import React, {useReducer} from "react";
import MainContentContext from './MainContentContext';
import MainContentReducer from './MainContentReducer';
import {
  FETCH_MOVIES_MAINCONTENT, 
  FETCH_WHATSSHOWING_MOVIESUMMARY} from "../types.js"; 

const MainContentState = props => {

  const initialState = {
    movies: [],
    whatsShowing: "Now Playing"
  };

  const [state, dispatch] = useReducer(MainContentReducer, initialState);

  const InitialCardState = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    data && dispatch({
      type: FETCH_MOVIES_MAINCONTENT,
      payload: data.results
    })
  }
  

  const handleClick = async (e) => {
      const requestName = e.target.getAttribute("data-name");
      const response = await fetch(`https://api.themoviedb.org/3/movie/${requestName}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.json();

      const CardTitle = requestName && requestName.replace(/_/g, " ");
      const formattedTitle = CardTitle.charAt(0).toUpperCase() + CardTitle.substring(1);

      requestName && dispatch({
        type: FETCH_WHATSSHOWING_MOVIESUMMARY,
        payload: formattedTitle
      })

      data && dispatch({
        type: FETCH_MOVIES_MAINCONTENT,
        payload: data.results
      })
  }


  return (
    <MainContentContext.Provider value={{
      InitialCardState,
      handleClick,
      movies: state.movies,
      whatsShowing: state.whatsShowing
    }}>
      {props.children}
    </MainContentContext.Provider>
  )
}

export default MainContentState;