import React, {useContext} from 'react';
import Rating from "../rating/Rating";
import { Link } from "react-router";
import imageNotFound from "../../images/imageNotFound.jpg";
import { releaseDateOf } from "../../utils/formatDate";
import UiContext from "../../context/ui/UiContext";
import { usePlayTrailer } from "../../api/queries";
import { tmdbImage } from "../../api/tmdbClient";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";

const MovieCardItem = ({movie: {backdrop_path, title, name, release_date, first_air_date, vote_average, id}}: {movie: MediaListItem}) => {

  const {mediaType} = useContext(UiContext);


  const playTrailer = usePlayTrailer(mediaType, id);

  return (
    <div className="card movieCard">
      <Link to={`/movieSummary/${id}`}>
        <div className="movieCard__image">
            {backdrop_path ? <img src={tmdbImage(backdrop_path, "w500")} className="movieCard__imagesrc" alt={title}/> : <img src={imageNotFound} className="movieCard__imagesrc" alt={title}/>}
        </div>
      </Link>
      <div className="movieCard__information">
          <h5 className="movieCard__title">{truncate(title ? title : name, 45)}</h5>
          <Rating rating={vote_average} />
          <p className="movieCard__date">Release date: {releaseDateOf({release_date, first_air_date})}</p>
          <div className="movieCard__buttons">
            <button onClick={playTrailer} className="button button--green">Watch Trailer</button>
            <Link to={`/movieSummary/${id}`} className="button button--green button--skeleton">View More</Link>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;