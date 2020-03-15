import React, {Fragment} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Pagination from "../informational/Pagination";

function MainContent() {
  return (
    <Fragment>
      <section className="movieSection">
        <div className="container">
          <SwitchTabs />
            <h3 className="movieSection__title">Comedies</h3>
            <div className="movieSection__titles">
              <MovieCardItem />
            </div>
        </div>
        <Pagination />
      </section>
    </Fragment>
  )
}

export default MainContent;