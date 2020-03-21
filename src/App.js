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
    InitialCardState(); 
  }, []);
  

  const [movies, setMovies] = useState([]);
  const [whatsShowing, setWhatsShowing] = useState("Now Playing");

  const InitialCardState = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setMovies(data.results);
  }

  const handleClick = async (e) => {
      const requestName = e.target.getAttribute("data-name");
      const response = await fetch(`https://api.themoviedb.org/3/movie/${requestName}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
      const data = await response.json();

      const CardTitle = requestName && requestName.replace(/_/g, " ");
      const formattedTitle = CardTitle.charAt(0).toUpperCase() + CardTitle.substring(1);
      requestName && setWhatsShowing(formattedTitle)
      data && setMovies(data.results);
  }

  return (
    <Router>
      <Fragment>
        <SideNavigation handler={handleClick}/>
          <div className="main-content">
            <TopNavigation />
            <Switch>
              <Route path="/accountSettings" component={AccountSettings} exact />
              <Route path="/searchResults/:id" component={SearchResults} exact />
              <Route path="/movieSummary/:id" component={MovieSummary} exact />
              <Route path="/actorSummary/:id" component={AccountSummary} exact />
              <Route path="/" component={() => <MainContent movie={movies} whatsShowing={whatsShowing} exact/>} />
            </Switch>
            <Modal />
          </div>
      </Fragment>
    </Router>
  );
}

export default App;
