import React from 'react';
import MovieCardItem from '../cards/MovieCardItem';

function ActorSummary() {
  return (
    <section className="movieDetails">
      <div className="movieDetails__wrapper">
      <div className="movieDetailSummary actorDetailSummary">
          <div className="actorDetailSummary__imageContanier">
              <img src="./assets/06_movie-profile-A_10.jpg" className="actorDetailSummary__image" alt="Movie Poster" title="Movie Poster" />
              <span className="actorDetailSummary__name">Suzie Smith</span>
          </div>
          <div className="movieDetailSummary__wrapper">
              <h3 className="movieDetails__title">Actor Details</h3>
              <div className="misc">
                  <div className="misc__box">
                    <div className="movieDetails__title movieDetails__title--smaller">Biography</div>
                    <p className="misc__info">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, enim quaerat a eos, 
                        similique aliquam sit eum rerum architecto id ea. Fuga quia assumenda, amet odio placeat totam consectetur 
                        fugiat nostrum explicabo ipsa obcaecati ea nisi expedita neque! Itaque, ut?
                    </p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Gender</div>
                      <p className="misc__info">Female</p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Date of birth</div>
                      <p className="misc__info">02/12/1991</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="movieDetailsMaincontent">
            <main className="movieMain">
              <section className="moreMovies">
                  <h3 className="moreMovies__title">Popular Roles</h3>
                  <div className="moreMovies__titles">
                    <MovieCardItem />
                  </div>
              </section>
            </main>
        </div>
    </div>
    </section>
  )
}

export default ActorSummary;