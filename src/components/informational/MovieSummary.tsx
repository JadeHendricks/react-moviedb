import React, {useEffect, Fragment} from 'react';
import '../../styles/organisms/details-hero.scss';
import '../../styles/atoms/icon.scss';
import '../../styles/organisms/media-strip.scss';
import '../../styles/organisms/cast-list.scss';
import '../../styles/organisms/movie-main.scss';
import '../../styles/molecules/review.scss';
import '../../styles/molecules/category.scss';
import '../../styles/atoms/pill.scss';
import { useParams } from "react-router";
import Review from "../reviews/Review";
import Rating from "../rating/Rating";
import svgAsset from "../../images/sprite.svg";
import MovieCardItem from '../cards/MovieCardItem';
import CastCard from '../cards/CastCard';
import { releaseDateOf } from "../../utils/formatDate";
import { runtimeLabel } from "../../utils/runtime";
import MediaImage from "../media/MediaImage";
import type { MediaType } from "../../api/queries";
import { useCast, useDetails, useReviews, useSimilar, useVideos } from "../../api/queries";
import { useTrailer } from "../../hooks/useTrailer";
import { tmdbImage } from "../../api/tmdbClient";
import { useLoadingOverlay } from "../../hooks/useLoadingOverlay";
import type { MediaDetails } from "../../types/tmdb";
import Loader from "../layout/Loader";

const NO_DETAILS: MediaDetails = {};
const NO_ITEMS: never[] = [];

function MovieSummary({type}: {type: MediaType}) {
  const params = useParams();


  // Each section is its own query keyed by (type, id): changing the id refetches once, nothing loops (B1).
  const {data: movie = NO_DETAILS, isPending: detailsPending} = useDetails(type, params.id);
  const {data: reviews = NO_ITEMS, isPending: reviewsPending} = useReviews(type, params.id);
  const {data: cast = NO_ITEMS, isPending: castPending} = useCast(type, params.id);
  const {data: videos = NO_ITEMS, isPending: videosPending} = useVideos(type, params.id);
  const {data: similarMovies = NO_ITEMS, isPending: similarPending} = useSimilar(type, params.id);
  // The title already carries its genre names, so no genre-list request and no stale genres from the previous title (B15).
  const genres = movie.genres ?? NO_ITEMS;

  // Keyed by type and id, so opening another title (e.g. a similar one) shows the loader again (B4, D2).
  const loading = useLoadingOverlay(detailsPending || reviewsPending || castPending || videosPending || similarPending, `${type}-${params.id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  const trailer = useTrailer(type, params.id);

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
                    <h3 className="movieDetails__title">{type === "movie" ? "Movie Details" : "Series Details"}</h3>
                    <div className="category">
                        <div className="movieDetails__title movieDetails__title--smaller">Category</div>
                        <div className="category__wrapper category__wrapper--start">
                        {genres.length !== 0 ? genres.slice(0, 2).map(genre => <div key={genre.id} className="pill">{genre.name}</div>) : ""}
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
                      { type === "tv" ? 
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
                    <div className="review-list">
                      {reviews.length !== 0 ? <h3 className="movieDetails__title">Recent Reviews</h3> : ""}
                      {reviews && reviews.map(review => <Review key={review.id} review={review}/>)}
                    </div>
                </div>

            </div>

            <div className="movieDetailsMaincontent">

                <header className="details-hero" style={backgroundImage}>
                    <svg className="icon icon--play details-hero__play" {...trailer}>
                        <use href={`${svgAsset}#icon-play2`}></use>
                    </svg>
                    <div className="details-hero__media">
                      {videos.length !== 0 ? <h3 className="details-hero__title">Media</h3> : <h3 className="details-hero__title">No videos available</h3>}
                        <div className="details-hero__videos">
                        
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
                  <Rating rating={movie.vote_average} className="movie-main__rating" />
                  <h2 className="movieMain__title">{movie.title ? movie.title : movie.name} <span>({ releaseDateOf(movie) })</span></h2>
                  <div className="movieMain__storyline">
                      <h3 className="marginBottom10">Storyline</h3>
                      <p>{movie.overview}</p>
                  </div>

                  <div className="cast-list">
                    <h3 className="cast-list__title">The Cast</h3>
                    <div className="cast-list__items">
                      {cast && cast.slice(0, 12).map(castMember => <CastCard key={castMember.id} cast={castMember} />)}
                    </div>
                  </div>

                  <section className="media-strip">
                      <h3 className="media-strip__title">{type === "tv" ? "Similar Series" : "Similar Movies"}</h3>
                      <div className="media-strip__items">
                        {similarMovies && similarMovies.slice(0, 12).map(movie => <MovieCardItem key={movie.id} movie={movie} compact />)}
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