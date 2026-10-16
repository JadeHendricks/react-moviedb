import React from 'react';
import Rating from "../rating/Rating";
import { Link } from "react-router";
import MediaImage from "../media/MediaImage";
import { releaseDateOf } from "../../utils/formatDate";
import { useTrailer } from "../../hooks/useTrailer";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";
import { detailPath, mediaTypeOf } from "../../utils/routes";

const MovieCardItem = ({movie: {backdrop_path, title, name, release_date, first_air_date, vote_average, id, media_type}}: {movie: MediaListItem}) => {

  // The row says what it is, so a series opens a series even from the Movies tab or an actor page (B9).


  const mediaType = mediaTypeOf({media_type});
  const trailer = useTrailer(mediaType, id);

  return (
    <div className="card movieCard">
      <Link to={detailPath(mediaType, id)}>
        <div className="movieCard__image">
            <MediaImage path={backdrop_path} className="movieCard__imagesrc" alt={title ? title : name} />
        </div>
      </Link>
      <div className="movieCard__information">
          <h5 className="movieCard__title">{truncate(title ? title : name, 45)}</h5>
          <Rating rating={vote_average} />
          <p className="movieCard__date">Release date: {releaseDateOf({release_date, first_air_date})}</p>
          <div className="movieCard__buttons">
            <button {...trailer} className="button button--green">Watch Trailer</button>
            <Link to={detailPath(mediaType, id)} className="button button--green button--skeleton">View More</Link>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;