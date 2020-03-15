import React from 'react';
import Review from "../reviews/Review";
import Rating from "../rating/Rating";
import svgAsset from "../../images/sprite.svg";
import MovieCardItem from '../cards/MovieCardItem';
import CastCard from '../cards/CastCard';

function MovieSummary() {
  return (
    <section className="movieDetails">

      <div className="movieDetails__wrapper">

          <div className="movieDetailSummary">

              <div className="movieDetailSummary__imageContanier">
                  <img src="./assets/06_movie-profile-A_03.jpg" className="movieDetailSummary__image" alt="Movie Poster" title="Movie Poster" />
              </div>

              <div className="movieDetailSummary__wrapper">
                  <h3 className="movieDetails__title">Movie Details</h3>
                  <div className="category">
                      <div className="movieDetails__title movieDetails__title--smaller">Category</div>
                      <div className="category__wrapper">
                          <div className="category__pill">Drama</div>
                          <div className="category__pill">Sci-fi</div>
                      </div>
                  </div>
                  <div className="misc">
                    <div className="misc__box">
                        <div className="movieDetails__title movieDetails__title--smaller">Release Date</div>
                        <p className="misc__info">2 October, 2017 (USA)</p>
                    </div>

                    <div className="misc__box">
                        <div className="movieDetails__title movieDetails__title--smaller">Length</div>
                        <p className="misc__info">2 hr 43 min</p>
                    </div>

                    <div className="misc__box">
                        <div className="movieDetails__title movieDetails__title--smaller">Director</div>
                        <p className="misc__info">James Wan</p>
                    </div>

                    <div className="misc__box">
                        <div className="movieDetails__title movieDetails__title--smaller">Writers</div>
                        <p className="misc__info">Gary Scott Thompson (Producer), Chris Morgan (Book)</p>
                    </div>
                  </div>
                  <div className="reviews">
                      <h3 className="movieDetails__title">Recent Reviews</h3>
                      <Review />
                  </div>
              </div>

          </div>

          <div className="movieDetailsMaincontent">

              <header className="movieDetailHeader">
                  <svg className="movieDetailHeader__playicon">
                      <use xlinkHref={`${svgAsset}#icon-play2`}></use>
                  </svg>
                  <div className="movieDetailHeader__media">
                      <h3 className="movieDetailHeader__title">Media</h3>
                      <div className="movieDetailHeader__videos">
                          <img src="./assets/06_movie-profile-A_07.jpg" alt="Movie media" title="Movie media" />
                          <img src="./assets/06_movie-profile-A_07.jpg" alt="Movie media" title="Movie media" />
                          <img src="./assets/06_movie-profile-A_07.jpg" alt="Movie media" title="Movie media" />
                          <img src="./assets/06_movie-profile-A_07.jpg" alt="Movie media" title="Movie media" />
                      </div>
                  </div>
              </header>

              <main className="movieMain">
                <Rating />
                <h2 className="movieMain__title">Baby Driver <span>(2017)</span></h2>
                <div className="movieMain__storyline">
                    <h3 className="marginBottom10">Storyline</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi modi aliquam repellendus ipsam ducimus temporibus suscipit quos saepe 
                        delectus totam omnis autem libero, necessitatibus mollitia debitis animi vel tenetur molestiae et. Nam inventore reiciendis aperiam natus deleniti? 
                        Excepturi doloribus et ea vero, perferendis tenetur vel nostrum blanditiis nisi voluptas quasi ipsam ullam harum est corporis suscipit numquam eligendi 
                        expedita consequuntur quas ad ratione at? Vel incidunt omnis adipisci reprehenderit. Voluptates voluptate dolorum vitae minima omnis adipisci provident 
                        vero, in eius a molestias eveniet corporis quos illo praesentium aut magni eum voluptatem optio iste incidunt! Tempora quo repellat ullam asperiores et.
                    </p>
                </div>

                <div className="cast">
                  <h3 className="cast__title">The Cast</h3>
                  <div className="cast__wrapper">
                    <CastCard />
                  </div>
                </div>

                <section className="moreMovies">
                    <h3 className="moreMovies__title">Similar Movies</h3>
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

export default MovieSummary;