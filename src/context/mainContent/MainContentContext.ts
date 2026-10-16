import { createContext, type MouseEvent } from "react";
import type { MediaListItem } from "../../types/tmdb";

export interface MainContentContextValue {
  InitialCardState: () => Promise<void>;
  setSiteContent: (e: MouseEvent<HTMLElement>) => void;
  handleClick: (e: MouseEvent<HTMLElement>) => Promise<void>;
  movies: MediaListItem[];
  whatsShowing: string;
  appWideContent: string;
}

// No default value on purpose (as before): every consumer sits under its provider in App.
const mainContentContext = createContext<MainContentContextValue>(undefined as unknown as MainContentContextValue);
export default mainContentContext;
