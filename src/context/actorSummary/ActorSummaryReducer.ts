import { 
  FETCH_ACTOR_ACTORSUMMARY,
  FETCH_CREDITS_ACTORSUMMARY } from '../types';
import type { MediaListItem, Person } from "../../types/tmdb";

export interface ActorSummaryStateShape {
  actor: Partial<Person>;
  credits: MediaListItem[];
}

export type ActorSummaryAction =
  | { type: typeof FETCH_ACTOR_ACTORSUMMARY; payload: Person }
  | { type: typeof FETCH_CREDITS_ACTORSUMMARY; payload: MediaListItem[] };

export default ( state: ActorSummaryStateShape, action: ActorSummaryAction ): ActorSummaryStateShape => {
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
