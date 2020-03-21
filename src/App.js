import React, { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SideNavigation from "./components/layout/SideNavigation";
import TopNavigation from "./components/layout/TopNavigation";
import Modal from "./components/modals/Modal";
import AccountSettings from "./components/informational/AccountSettings";
import MovieSummary from "./components/informational/MovieSummary";
import AccountSummary from "./components/informational/ActorSummary";
import MainContent from "./components/layout/MainContent";
import SearchResults from "./components/informational/SearchResults";

function App() {

  useEffect(() => {

  }, []);

  const [movieCards, setMovieCards] = useState([]);

  const handleClick = () => {
    alert("I'm working");
  }

  const getUpcoming = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
  }

  const getNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
  }

  const getTopRated = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
  }
  const getPopular = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
  }

  return (
    <Router>
      <Fragment>
        <SideNavigation handler={handleClick}/>
          <div className="main-content">
            <TopNavigation />
            <Switch>
              <Route path="/" component={MainContent} exact />
              <Route path="/accountSettings" component={AccountSettings} exact />
              <Route path="/searchResults/:id" component={SearchResults} exact />
              <Route path="/movieSummary/:id" component={MovieSummary} exact />
              <Route path="/actorSummary/:id" component={AccountSummary} exact />
            </Switch>
            <Modal />
          </div>
      </Fragment>
    </Router>
  );
}

export default App;
