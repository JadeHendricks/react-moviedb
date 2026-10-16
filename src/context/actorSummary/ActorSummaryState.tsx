import React, {useReducer, type ReactNode} from "react";
import ActorSummaryContext from './ActorSummaryContext';
import ActorSummaryReducer, { type ActorSummaryStateShape } from './ActorSummaryReducer';
import { 
  FETCH_ACTOR_ACTORSUMMARY,
  FETCH_CREDITS_ACTORSUMMARY } from '../types';
import type { MediaListItem, Person } from "../../types/tmdb";

const HeaderState = (props: { children?: ReactNode }) => {
  const initialState: ActorSummaryStateShape = {
    actor: {},
    credits: []
  };
  const [state, dispatch] = useReducer(ActorSummaryReducer, initialState);

  const getActor = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US`);
    const data: Person = await response.json();
    data && dispatch({
      type: FETCH_ACTOR_ACTORSUMMARY,
      payload: data
    });
  }

  const getCredits = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.REACT_APP_API_KEY}&language=en-US`);
    const data: { cast: MediaListItem[] } = await response.json();
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
