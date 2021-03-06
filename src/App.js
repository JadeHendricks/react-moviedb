import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import AccountSettings from "./components/informational/AccountSettings";
import MovieSummary from "./components/informational/MovieSummary";
import AccountSummary from "./components/informational/ActorSummary";
import MainContent from "./components/layout/MainContent";
import SearchResults from "./components/informational/SearchResults";
import MovieSummaryState from "./context/movieSummary/MovieSummaryState";
import ActorSummaryState from "./context/actorSummary/ActorSummaryState";
import HeaderState from "./context/header/HeaderState";
import MainContentState from "./context/mainContent/MainContentState";
import ModalState from "./context/modal/ModalState";

function App() {
  return (
    <MainContentState>
    <MovieSummaryState>
    <ActorSummaryState>
    <HeaderState>
    <ModalState>
      <Router>
        <Fragment>
          <SideNavigation />
            <div className="main-content">
              <TopNavigation />
              <Switch>
                <Route path="/accountSettings" component={AccountSettings} exact />
                <Route path="/searchResults/:id" component={SearchResults} exact />
                <Route path="/movieSummary/:id" component={MovieSummary} exact />
                <Route path="/actorSummary/:id" component={AccountSummary} exact />
                <Route path="/" component={MainContent} exact />
              </Switch>
            </div>
        </Fragment>
      </Router>
    </ModalState>
    </HeaderState>
    </ActorSummaryState>
    </MovieSummaryState>
    </MainContentState>
  );
}

export default App;
