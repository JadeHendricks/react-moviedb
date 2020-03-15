import React, {Fragment} from 'react';
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import ActorSummary from './components/informational/ActorSummary';
import Modal from "./components/modals/Modal";


function App() {
  return (
    <Fragment>
      <SideNavigation />
        <div className="main-content">
          <TopNavigation />
          <Modal />
        </div>
    </Fragment>
  );
}

export default App;
