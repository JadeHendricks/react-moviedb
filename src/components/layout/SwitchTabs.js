import React, { useContext} from "react";
import MainContentContext from "../../context/mainContent/MainContentContext";

function SwitchTabs() {

  const mainContentContext = useContext(MainContentContext);
  const { setSiteContent, appWideContent } = mainContentContext;

  return (
    <div className="switchTabs">
      <div className={appWideContent === "movies" ? "switchTabs__tab active" : "switchTabs__tab"} data-content="movies" onClick={setSiteContent}>Movies</div>
      <div className={appWideContent === "series" ? "switchTabs__tab active" : "switchTabs__tab"} data-content="series" onClick={setSiteContent}>Series</div>
    </div>
  )
}

export default SwitchTabs;
