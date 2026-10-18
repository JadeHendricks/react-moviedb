import { createContext } from "react";
import type { Category, MediaType } from "../../api/queries";

export type AppWideContent = "movies" | "series";

export interface UiContextValue {
  /** Which tab is selected. Only UI state: the data lives in Query, keyed by this. */
  appWideContent: AppWideContent;
  /** The same choice as the TMDB path segment, for the query hooks. */
  mediaType: MediaType;
  category: Category;
  /** Heading above the cards ("Now playing", "Top rated", ...). */
  whatsShowing: string;
  setAppWideContent: (content: AppWideContent) => void;
  setCategory: (category: Category) => void;
}

// No default value on purpose: every consumer sits under its provider in main.
const uiContext = createContext<UiContextValue>(undefined as unknown as UiContextValue);

export default uiContext;
