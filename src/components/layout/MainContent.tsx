import React, {Fragment, useContext} from 'react';
import '../../styles/organisms/media-strip.scss';
import '../../styles/pages/home.scss';
import '../../styles/layout/container.scss';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Header from './Header';
import UiContext from "../../context/ui/UiContext";
import Loader from "../layout/Loader";
import { useMediaList, useMostPopular } from "../../api/queries";
import { useLoadingOverlay } from "../../hooks/useLoadingOverlay";

function MainContent() {

  const {mediaType, category, whatsShowing} = useContext(UiContext);

  // The cards follow the query key (type + category), so the heading and the cards cannot disagree (B5).
  const {data: movies, isPending: listPending} = useMediaList(mediaType, category);

  // The hero (Header) uses this same query, so it is only requested once. The loader follows both (D2).
  const {isPending: heroPending} = useMostPopular(mediaType);
  const loading = useLoadingOverlay(listPending || heroPending, "home");

  return (
    <Fragment>
      {loading ? <Loader /> : ""}
      <Header />
      <section className="home">
        <div className="container">
          <SwitchTabs />
          <h3 className="home__title">{whatsShowing}</h3>
          <div className="media-strip__items">
            { movies ? movies.map(movie => <MovieCardItem key={movie.id} movie={movie}  /> ) : "" }
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MainContent;
