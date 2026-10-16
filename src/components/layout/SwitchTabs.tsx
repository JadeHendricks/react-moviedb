import React, { useContext} from "react";
import '../../styles/molecules/switch-tabs.scss';
import UiContext from "../../context/ui/UiContext";

function SwitchTabs() {

  const { setAppWideContent, appWideContent } = useContext(UiContext);

  return (
    <div className="switch-tabs">
      <div className={appWideContent === "movies" ? "switch-tabs__tab switch-tabs__tab--active" : "switch-tabs__tab"} data-content="movies" onClick={() => setAppWideContent("movies")}>Movies</div>
      <div className={appWideContent === "series" ? "switch-tabs__tab switch-tabs__tab--active" : "switch-tabs__tab"} data-content="series" onClick={() => setAppWideContent("series")}>Series</div>
    </div>
  )
}

export default SwitchTabs;
