import React, { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router";
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import AccountSettings from "./components/informational/AccountSettings";
import MovieSummary from "./components/informational/MovieSummary";
import AccountSummary from "./components/informational/ActorSummary";
import MainContent from "./components/layout/MainContent";
import SearchResults from "./components/informational/SearchResults";
import ModalState from "./context/modal/ModalState";
import UiState from "./context/ui/UiState";

function App() {
  return (
    <UiState>
    <ModalState>
      <Router>
        <Fragment>
          <SideNavigation />
            <div className="main-content">
              <TopNavigation />
              <Routes>
                <Route path="/accountSettings" element={<AccountSettings />} />
                <Route path="/searchResults/:id" element={<SearchResults />} />
                <Route path="/movieSummary/:id" element={<MovieSummary />} />
                <Route path="/actorSummary/:id" element={<AccountSummary />} />
                <Route path="/" element={<MainContent />} />
              </Routes>
            </div>
        </Fragment>
      </Router>
    </ModalState>
    </UiState>
  );
}

export default App;
