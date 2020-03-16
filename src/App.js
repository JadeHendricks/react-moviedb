import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import Modal from "./components/modals/Modal";
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import AccountSettings from "./components/informational/AccountSettings";
import SearchResults from "./components/informational/SearchResults";
import MovieSummary from './components/informational/MovieSummary';
import AccountSummary from "./components/informational/ActorSummary";

function App() {
  return (
    <Router>
      <Fragment>
        <SideNavigation />
          <div className="main-content">
            <TopNavigation />
            <Header/>
            <Modal />
            <Switch>
              <Route path="/" component={MainContent} exact />
              <Route path="/accountSettings" component={AccountSettings} exact />
              <Route path="/searchResults/:id" component={SearchResults} exact />
              <Route path="/movieSummary/:id" component={MovieSummary} exact />
              <Route path="/actorSummary/:id" component={AccountSummary} exact />
            </Switch>
          </div>
      </Fragment>
    </Router>
  );
}

export default App;
