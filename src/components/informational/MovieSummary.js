import React, {useEffect, useState} from 'react';
import Review from "../reviews/Review";
import Rating from "../rating/Rating";
import svgAsset from "../../images/sprite.svg";
import MovieCardItem from '../cards/MovieCardItem';
import CastCard from '../cards/CastCard';

function MovieSummary({match}) {

  const [movie, setMovie] = useState({})

  useEffect(() => {
    getMovie(match.params.id)
  }, []);

  const getMovie = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setMovie(data);
    console.log(data);
  }

  const backgroundImage = {
    backgroundImage: movie.backdrop_path ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : "",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover"
  }

  return (
    <section className="movieDetails">

      <div className="movieDetails__wrapper">

          <div className="movieDetailSummary">

              <div className="movieDetailSummary__imageContanier">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movieDetailSummary__image" alt={movie.title} />
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
                        <p className="misc__info">{movie.release_date}</p>
                    </div>

                    <div className="misc__box">
                        <div className="movieDetails__title movieDetails__title--smaller">Length</div>
                        <p className="misc__info">{movie.runtime}</p>
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
                      {/*<Review />*/}
                  </div>
              </div>

          </div>

          <div className="movieDetailsMaincontent">

              <header className="movieDetailHeader" style={backgroundImage}>
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
                <Rating rating={movie.vote_average} />
                <h2 className="movieMain__title">{movie.title} <span>({movie.release_date})</span></h2>
                <div className="movieMain__storyline">
                    <h3 className="marginBottom10">Storyline</h3>
                    <p>{movie.overview}</p>
                </div>

                <div className="cast">
                  <h3 className="cast__title">The Cast</h3>
                  <div className="cast__wrapper">
                    {/*<CastCard />*/}
                  </div>
                </div>

                <section className="moreMovies">
                    <h3 className="moreMovies__title">Similar Movies</h3>
                    <div className="moreMovies__titles">
                      {/*<MovieCardItem />*/}
                    </div>
                </section>

              </main>
          </div>
      </div>
    </section>
  )
}

export default MovieSummary;