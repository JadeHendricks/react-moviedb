import React, {useEffect, Fragment, useContext} from 'react';
import { useParams } from "react-router";
import Review from "../reviews/Review";
import Rating from "../rating/Rating";
import svgAsset from "../../images/sprite.svg";
import MovieCardItem from '../cards/MovieCardItem';
import CastCard from '../cards/CastCard';
import { releaseDateOf } from "../../utils/formatDate";
import { runtimeLabel } from "../../utils/runtime";
import MediaImage from "../media/MediaImage";
import UiContext from "../../context/ui/UiContext";
import { useCast, useDetails, useGenres, useReviews, useSimilar, useVideos } from "../../api/queries";
import { useTrailer } from "../../hooks/useTrailer";
import { tmdbImage } from "../../api/tmdbClient";
import { useTimedLoader } from "../../hooks/useTimedLoader";
import type { MediaDetails } from "../../types/tmdb";
import Loader from "../layout/Loader";

const NO_DETAILS: MediaDetails = {};
const NO_ITEMS: never[] = [];

function MovieSummary() {
  const params = useParams();

  const {appWideContent, mediaType} = useContext(UiContext);

  // Each section is its own query keyed by (type, id): changing the id refetches once, nothing loops (B1).
  const {data: movie = NO_DETAILS} = useDetails(mediaType, params.id);
  const {data: reviews = NO_ITEMS} = useReviews(mediaType, params.id);
  const {data: cast = NO_ITEMS} = useCast(mediaType, params.id);
  const {data: videos = NO_ITEMS} = useVideos(mediaType, params.id);
  const {data: similarMovies = NO_ITEMS} = useSimilar(mediaType, params.id);
  const {data: allGenres = NO_ITEMS} = useGenres(mediaType);
  // Same selection as before: the genre list entries that the title carries.
  const genres = movie.genres ? allGenres.filter(genreOne => movie.genres!.find(genreTwo => genreOne.id === genreTwo.id)) : NO_ITEMS;

  const loading = useTimedLoader(4000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  const trailer = useTrailer(mediaType, params.id);

  const backgroundImage = {
    backgroundImage: movie.backdrop_path ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${tmdbImage(movie.backdrop_path, "original")})` : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("")`,
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
                  <MediaImage path={movie.poster_path} className="movieDetailSummary__image" alt={movie.title ? movie.title : movie.name} />
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
                          <p className="misc__info">{ releaseDateOf(movie) }</p>
                      </div>

                      <div className="misc__box">
                          <div className="movieDetails__title movieDetails__title--smaller">Runtime</div>
                          <p className="misc__info">{runtimeLabel(movie)}</p>
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
                    <svg className="movieDetailHeader__playicon" {...trailer}>
                        <use href={`${svgAsset}#icon-play2`}></use>
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
                  <h2 className="movieMain__title">{movie.title ? movie.title : movie.name} <span>({ releaseDateOf(movie) })</span></h2>
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