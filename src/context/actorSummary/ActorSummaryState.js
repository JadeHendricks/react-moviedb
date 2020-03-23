import React, {useReducer} from "react";
import ActorSummaryContext from './ActorSummaryContext';
import ActorSummaryReducer from './ActorSummaryReducer';
import { 
  FETCH_ACTOR_ACTORSUMMARY,
  FETCH_CREDITS_ACTORSUMMARY } from '../types';

const HeaderState = props => {

  const initialState = {
    actor: {},
    credits: []
  };

  const [state, dispatch] = useReducer(ActorSummaryReducer, initialState);

  const getActor = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();
    data && dispatch({
      type: FETCH_ACTOR_ACTORSUMMARY,
      payload: data
    });
  }

  const getCredits = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();

    const sortByMostPopular = data.cast
    .sort((a, b) => b.vote_average - a.vote_average)
    .filter(movie =>  movie.poster_path !== null);
    
    sortByMostPopular && dispatch({
      type: FETCH_CREDITS_ACTORSUMMARY,
      payload: sortByMostPopular.slice(0, 24)
    });
  }


  return (
    <ActorSummaryContext.Provider value={{
      getActor,
      getCredits,
      actor: state.actor,
      credits: state.credits
    }}>
      {props.children}
    </ActorSummaryContext.Provider>
  )
}

export default HeaderState;