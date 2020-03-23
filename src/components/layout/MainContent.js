import React, {Fragment, useContext, useEffect} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Pagination from "../informational/Pagination";
import Header from './Header';
import MainContentContext from "../../context/mainContent/MainContentContext";

function MainContent(props) {

  const mainContentContext = useContext(MainContentContext);
  const {movies, whatsShowing, InitialCardState} = mainContentContext;

  useEffect(() => {
    InitialCardState(); 
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Header />
      <section className="movieSection">
        <div className="container">
          <SwitchTabs />
          <h3 className="movieSection__title">{whatsShowing}</h3>
          <div className="movieSection__titles">
            { movies ? movies.map(movie => <MovieCardItem key={movie.id} movie={movie}  /> ) : "" }
          </div>
        </div>
        <Pagination />
      </section>
    </Fragment>
  )
}

export default MainContent;