import React, { useContext} from "react";
import UiContext from "../../context/ui/UiContext";

function SwitchTabs() {

  const { setAppWideContent, appWideContent } = useContext(UiContext);

  return (
    <div className="switchTabs">
      <div className={appWideContent === "movies" ? "switchTabs__tab active" : "switchTabs__tab"} data-content="movies" onClick={() => setAppWideContent("movies")}>Movies</div>
      <div className={appWideContent === "series" ? "switchTabs__tab active" : "switchTabs__tab"} data-content="series" onClick={() => setAppWideContent("series")}>Series</div>
    </div>
  )
}

export default SwitchTabs;
