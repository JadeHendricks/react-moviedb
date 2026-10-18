import React, { useCallback, useMemo, useState, type ReactNode } from "react";
import UiContext, { type AppWideContent, type UiContextValue } from "./UiContext";
import type { Category } from "../../api/queries";

const TITLES: Record<Category, string> = {
  now_playing: "Now playing",
  top_rated: "Top rated",
  popular: "Popular",
  upcoming: "Upcoming",
};

const UiState = (props: { children?: ReactNode }) => {
  const [appWideContent, setContent] = useState<AppWideContent>("movies");
  const [category, setCategory] = useState<Category>("now_playing");

  // Switching tab always goes back to the first list, as before.
  const setAppWideContent = useCallback((content: AppWideContent) => {
    setContent(content);
    setCategory("now_playing");
  }, []);

  // Memoized so consumers only re-render when something they read actually changed (B25).
  const value = useMemo<UiContextValue>(
    () => ({
      appWideContent,
      mediaType: appWideContent === "movies" ? "movie" : "tv",
      category,
      whatsShowing: TITLES[category],
      setAppWideContent,
      setCategory,
    }),
    [appWideContent, category, setAppWideContent],
  );

  return <UiContext.Provider value={value}>{props.children}</UiContext.Provider>;
};

export default UiState;
