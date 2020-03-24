import React, {Fragment, useContext, useEffect, useState} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Header from './Header';
import MainContentContext from "../../context/mainContent/MainContentContext";
import Loader from "../layout/Loader";

function MainContent() {

  const mainContentContext = useContext(MainContentContext);
  const {movies, whatsShowing, InitialCardState, appWideContent} = mainContentContext;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    InitialCardState(); 
    addLoader();

    return () => {
      clearTimeout(addLoader);
    }
    // eslint-disable-next-line
  }, [appWideContent])

  const addLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <Fragment>
      {loading ? <Loader /> : ""}
      <Header />
      <section className="movieSection">
        <div className="container">
          <SwitchTabs />
          <h3 className="movieSection__title">{whatsShowing}</h3>
          <div className="movieSection__titles">
            { movies ? movies.map(movie => <MovieCardItem key={movie.id} movie={movie}  /> ) : "" }
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MainContent;