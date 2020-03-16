import React, { Fragment } from 'react';
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import Modal from "./components/modals/Modal";
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';

function App() {
  return (
    <Fragment>
      <SideNavigation />
        <div className="main-content">
          <TopNavigation />
          <Header/>
          <MainContent />
          <Modal />
        </div>
    </Fragment>
  );
}

export default App;
