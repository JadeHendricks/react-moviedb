import React, {useEffect, Fragment, useContext, useState} from 'react';
import Review from "../reviews/Review";
import Rating from "../rating/Rating";
import svgAsset from "../../images/sprite.svg";
import MovieCardItem from '../cards/MovieCardItem';
import CastCard from '../cards/CastCard';
import moment from "moment";
import imageNotFound from "../../images/imageNotFound.jpg";
import MovieSummaryContext from "../../context/movieSummary/MovieSummaryContext";
import MainContentContext from "../../context/mainContent/MainContentContext";
import Loader from "../layout/Loader";

function MovieSummary({match}) {

  const movieSummaryContext = useContext(MovieSummaryContext);
  const {
    setGenresArray, getMovie, getReviews, getCast, getVideos, 
    getSimilarMovies, movie, reviews, cast, videos, 
    similarMovies, genres} = movieSummaryContext;

  const mainContentContext = useContext(MainContentContext);
  const {appWideContent} = mainContentContext;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovie(match.params.id);
    getReviews(match.params.id);
    getCast(match.params.id);
    getVideos(match.params.id);
    getSimilarMovies(match.params.id);
    setGenresArray(movie.genres);
    // eslint-disable-next-line
  }, [movie]);

  useEffect(() => {
    addLoader();
    window.scrollTo(0, 0);

    return () => {
      clearTimeout(addLoader);
    }
    // eslint-disable-next-line
  }, [match.params.id]);

  const addLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }

  const playTrailer = async () => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
    const data = await response.json();
    const videoKey = data.results[0].key;

    window.open(
      `https://www.youtube.com/watch?v=${videoKey}`,
      `_blank`
    );
  }

  const backgroundImage = {
    backgroundImage: movie.backdrop_path ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover"
  }

  return (
    <Fragment>
      {loading ? <Loader /> : ""}
      <section className="movieDetails">

        <div className="movieDetails__wrapper">

            <div className="movieDetailSummary">

                <div className="movieDetailSummary__imageContanier">
                  {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movieDetailSummary__image" alt={movie.title ? movie.title : movie.name} /> : <img src={imageNotFound} className="movieDetailSummary__image" alt={movie.title ? movie.title : movie.name} />}
                </div>

                <div className="movieDetailSummary__wrapper">
                    <h3 className="movieDetails__title">{appWideContent === "movies" ? "Movie Details" : "Series Details"}</h3>
                    <div className="category">
                        <div className="movieDetails__title movieDetails__title--smaller">Category</div>
                        <div className="category__wrapper">
                        {genres.length !== 0 ? genres.slice(0, 2).map(genre => <div key={genre.id} className="category__pill">{genre.name}</div>) : ""}
                        </div>
                    </div>
                    <div className="misc">
                      <div className="misc__box">
                          <div className="movieDetails__title movieDetails__title--smaller">Initial release date</div>
                          <p className="misc__info">{ moment(movie.release_date ? movie.release_date : movie.first_air_date).format("DD MMM YYYY") }</p>
                      </div>

                      <div className="misc__box">
                          <div className="movieDetails__title movieDetails__title--smaller">Runtime</div>
                          <p className="misc__info">{movie.runtime ? movie.runtime : movie.episode_run_time}mins</p>
                      </div>
                      { appWideContent === "series" ? 
                      <Fragment>
                      <div className="misc__box">
                          <div className="movieDetails__title movieDetails__title--smaller">Number of seasons</div>
                          <p className="misc__info">{movie.number_of_seasons}</p>
                      </div>

                      <div className="misc__box">
                          <div className="movieDetails__title movieDetails__title--smaller">Number of episodes</div>
                          <p className="misc__info">{movie.number_of_episodes}</p>
                      </div></Fragment> : "" }

                    </div>
                    <div className="reviews">
                      {reviews.length !== 0 ? <h3 className="movieDetails__title">Recent Reviews</h3> : ""}
                      {reviews && reviews.map(review => <Review key={review.id} review={review}/>)}
                    </div>
                </div>

            </div>

            <div className="movieDetailsMaincontent">

                <header className="movieDetailHeader" style={backgroundImage}>
                    <svg className="movieDetailHeader__playicon" onClick={playTrailer}>
                        <use xlinkHref={`${svgAsset}#icon-play2`}></use>
                    </svg>
                    <div className="movieDetailHeader__media">
                      {videos.length !== 0 ? <h3 className="movieDetailHeader__title">Media</h3> : <h3 className="movieDetailHeader__title">No videos available</h3>}
                        <div className="movieDetailHeader__videos">
                        
                            {videos && videos.slice(0, 4).map(
                                video => 
                                <iframe 
                                  title={video.title}
                                  key={video.id}
                                  width="300" height="170" 
                                  src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" 
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            )}
                        </div>
                    </div>
                </header>

                <main className="movieMain">
                  <Rating rating={movie.vote_average} />
                  <h2 className="movieMain__title">{movie.title ? movie.title : movie.name} <span>({ moment(movie.release_date).format("DD MMM YYYY") })</span></h2>
                  <div className="movieMain__storyline">
                      <h3 className="marginBottom10">Storyline</h3>
                      <p>{movie.overview}</p>
                  </div>

                  <div className="cast">
                    <h3 className="cast__title">The Cast</h3>
                    <div className="cast__wrapper">
                      {cast && cast.slice(0, 12).map(castMember => <CastCard key={castMember.id} cast={castMember} />)}
                    </div>
                  </div>

                  <section className="moreMovies">
                      <h3 className="moreMovies__title">{appWideContent === "series" ? "Similar Series" : "Similar Movies"}</h3>
                      <div className="moreMovies__titles">
                        {similarMovies && similarMovies.slice(0, 12).map(movie => <MovieCardItem key={movie.id} movie={movie} />)}
                      </div>
                  </section>

                </main>
            </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MovieSummary;