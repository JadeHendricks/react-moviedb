import React from 'react';
import '../../styles/molecules/movie-card.scss';
import '../../styles/atoms/button.scss';
import Rating from "../rating/Rating";
import { Link } from "react-router";
import MediaImage from "../media/MediaImage";
import { releaseDateOf } from "../../utils/formatDate";
import { useTrailer } from "../../hooks/useTrailer";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";
import { detailPath, mediaTypeOf } from "../../utils/routes";

// Browser hints for the card backdrops. The sizes mirror the flex-basis of .movie-card at each breakpoint
// (a little generous, so the browser never picks an image that is too small).
const CARD_WIDTHS = [300, 500, 780] as const;
const CARD_SIZES = '(max-width: 520px) 100vw, (max-width: 767px) 48vw, (max-width: 991px) 32vw, (max-width: 1200px) 22vw, 18vw';
const COMPACT_SIZES = '(max-width: 520px) 100vw, (max-width: 991px) 48vw, (max-width: 1200px) 30vw, 23vw';

const MovieCardItem = ({movie: {backdrop_path, title, name, release_date, first_air_date, vote_average, id, media_type}, compact = false}: {movie: MediaListItem, compact?: boolean}) => {

  // The row says what it is, so a series opens a series even from the Movies tab or an actor page (B9).


  const mediaType = mediaTypeOf({media_type});
  const trailer = useTrailer(mediaType, id);
  const shownTitle = title ? title : name;
  // Cards in the similar / popular roles strips are the compact variant: each part that differs adds its --compact modifier.
  const part = (name: string) => (compact ? `${name} ${name}--compact` : name);

  return (
    <div className={part("movie-card")}>
      <Link to={detailPath(mediaType, id)}>
        <div className={part("movie-card__media")}>
            <MediaImage path={backdrop_path} widths={CARD_WIDTHS} sizes={compact ? COMPACT_SIZES : CARD_SIZES} className="movie-card__image" alt={title ? title : name} />
        </div>
      </Link>
      <div className={part("movie-card__info")}>
          <h3 className={part("movie-card__title")}>{truncate(title ? title : name, 45)}</h3>
          <Rating rating={vote_average} className={part("movie-card__rating")} />
          <p className="movie-card__date">Release date: {releaseDateOf({release_date, first_air_date})}</p>
          <div className="movie-card__buttons">
            <button type="button" aria-label={`Watch Trailer: ${shownTitle}`} {...trailer} className={`button button--green ${part("movie-card__button")}${compact ? " movie-card__button--compact-trailer" : ""}`}>Watch Trailer</button>
            <Link to={detailPath(mediaType, id)} aria-label={`View More: ${shownTitle}`} className={`button button--skeleton ${part("movie-card__button")}`}>View More</Link>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;