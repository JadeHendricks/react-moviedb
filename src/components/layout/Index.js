import React, {Fragment} from 'react';
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import Header from "./Header";
import MainContent from "./MainContent";

function Index() {
  return (
    <Fragment>
      <SideNavigation />
      <div className="main-content">
        <TopNavigation />
        <Header />
        <MainContent />
      </div>
    </Fragment>
  )
}

export default Index;