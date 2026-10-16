import React, {Fragment, useContext} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Header from './Header';
import UiContext from "../../context/ui/UiContext";
import Loader from "../layout/Loader";
import { useMediaList } from "../../api/queries";
import { useTimedLoader } from "../../hooks/useTimedLoader";

function MainContent() {

  const {mediaType, category, whatsShowing} = useContext(UiContext);

  // The cards follow the query key (type + category), so the heading and the cards cannot disagree (B5).
  const {data: movies} = useMediaList(mediaType, category);

  const loading = useTimedLoader(3000);

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
