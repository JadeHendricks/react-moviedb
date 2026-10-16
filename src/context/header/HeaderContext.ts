import { createContext } from "react";
import type { Genre, MediaListItem } from "../../types/tmdb";

export interface HeaderContextValue {
  setGenresArray: (genre_ids: number[] | undefined) => Promise<void>;
  getMostPopularMovie: () => Promise<void>;
  genres: Genre[];
  // Starts as `{}` until the first fetch lands.
  mostPopularMovie: Partial<MediaListItem>;
}

// No default value on purpose (as before): every consumer sits under its provider in App.
const headerContext = createContext<HeaderContextValue>(undefined as unknown as HeaderContextValue);
export default headerContext;
