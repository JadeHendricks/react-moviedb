import React, { useContext} from "react";
import MainContentContext from "../../context/mainContent/MainContentContext";

function SwitchTabs() {

  const mainContentContext = useContext(MainContentContext);
  const { setSiteContent } = mainContentContext;

  return (
    <div className="switchTabs">
      <div className="switchTabs__tab active" data-content="movies" onClick={setSiteContent}>Movies</div>
      <div className="switchTabs__tab" data-content="series" onClick={setSiteContent}>Series</div>
    </div>
  )
}

export default SwitchTabs;
