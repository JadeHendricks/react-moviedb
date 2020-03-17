import React, {useEffect, useState} from 'react';
import Review from "../reviews/Review";
import Rating from "../rating/Rating";
import svgAsset from "../../images/sprite.svg";
import MovieCardItem from '../cards/MovieCardItem';
import CastCard from '../cards/CastCard';
import moment from "moment";
import imageNotFound from "../../images/imageNotFound.jpg";

function MovieSummary({match}) {

  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    getMovie(match.params.id);
    getReviews(match.params.id);
    getCast(match.params.id);
    getVideos(match.params.id);
    getSimilarMovies(match.params.id);
  }, []);

  const getMovie = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setMovie(data);
  }

  const getReviews = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setReviews(data.results);
  }

  const getCast = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setCast(data.cast);
  }

  const getVideos = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setVideos(data.results);
  }

  const getSimilarMovies = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setSimilarMovies(data.results);
  }

  const playTrailer = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    const videoKey = data.results[0].key;

    window.open(
      `https://www.youtube.com/watch?v=${videoKey}`,
      `_blank`
    );
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
                {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movieDetailSummary__image" alt={movie.title} /> : <img src={imageNotFound} className="movieDetailSummary__image" alt={movie.title} />}
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
                        <p className="misc__info">{ moment(movie.release_date).format("DD MMM YYYY") }</p>
                    </div>

                    <div className="misc__box">
                        <div className="movieDetails__title movieDetails__title--smaller">Runtime</div>
                        <p className="misc__info">{movie.runtime}mins</p>
                    </div>

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
                      <h3 className="movieDetailHeader__title">Media</h3>
                      <div className="movieDetailHeader__videos">
                      
                          {videos && videos.slice(0, 4).map(
                              video => 
                              <iframe 
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
                <h2 className="movieMain__title">{movie.title} <span>({ moment(movie.release_date).format("DD MMM YYYY") })</span></h2>
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
                    <h3 className="moreMovies__title">Similar Movies</h3>
                    <div className="moreMovies__titles">
                      {similarMovies && similarMovies.slice(0, 12).map(movie => <MovieCardItem key={movie.id} movie={movie} />)}
                    </div>
                </section>

              </main>
          </div>
      </div>
    </section>
  )
}

export default MovieSummary;