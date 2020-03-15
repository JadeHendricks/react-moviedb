import React, {Fragment} from 'react';
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import Modal from "./components/modals/Modal";
import Header from './components/layout/Header';


function App() {
  return (
    <Fragment>
      <SideNavigation />
        <div className="main-content">
          <TopNavigation />
          <Header/>
          <Modal />
        </div>
    </Fragment>
  );
}

export default App;
