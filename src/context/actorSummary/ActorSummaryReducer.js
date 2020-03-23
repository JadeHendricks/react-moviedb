import { 
  FETCH_ACTOR_ACTORSUMMARY,
  FETCH_CREDITS_ACTORSUMMARY } from '../types';

export default ( state, action ) => {
  switch (action.type) {
    case FETCH_ACTOR_ACTORSUMMARY:
      return {
        ...state,
        actor: action.payload
      };
      case FETCH_CREDITS_ACTORSUMMARY:
      return {
        ...state,
        credits: action.payload
      };
    default: 
      return state;
  }
};