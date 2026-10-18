import React, { useContext} from "react";
import '../../styles/molecules/switch-tabs.scss';
import UiContext from "../../context/ui/UiContext";

function SwitchTabs() {
  const { setAppWideContent, appWideContent } = useContext(UiContext);
  const tabClass = (name: "movies" | "series") => (appWideContent === name ? "switch-tabs__tab switch-tabs__tab--active" : "switch-tabs__tab");

  // Real buttons: they take focus and Enter/Space, and aria-pressed says which one is on.
  return (
    <div className="switch-tabs" role="group" aria-label="Show movies or series">
      <button type="button" className={tabClass("movies")} aria-pressed={appWideContent === "movies"} data-content="movies" onClick={() => setAppWideContent("movies")}>Movies</button>
      <button type="button" className={tabClass("series")} aria-pressed={appWideContent === "series"} data-content="series" onClick={() => setAppWideContent("series")}>Series</button>
    </div>
  )
}

export default SwitchTabs;
