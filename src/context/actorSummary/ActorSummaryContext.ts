import { createContext } from "react";
import type { MediaListItem, Person } from "../../types/tmdb";

export interface ActorSummaryContextValue {
  getActor: (id: string | undefined) => Promise<void>;
  getCredits: (id: string | undefined) => Promise<void>;
  // Starts as `{}` until the first fetch lands.
  actor: Partial<Person>;
  credits: MediaListItem[];
}

// No default value on purpose (as before): every consumer sits under its provider in App.
const actorSummaryContext = createContext<ActorSummaryContextValue>(undefined as unknown as ActorSummaryContextValue);
export default actorSummaryContext;
