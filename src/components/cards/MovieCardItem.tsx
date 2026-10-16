import React, {useContext} from 'react';
import Rating from "../rating/Rating";
import { Link } from "react-router";
import imageNotFound from "../../images/imageNotFound.jpg";
import moment from "moment";
import UiContext from "../../context/ui/UiContext";
import { usePlayTrailer } from "../../api/queries";
import { tmdbImage } from "../../api/tmdbClient";
import type { MediaListItem } from "../../types/tmdb";

const MovieCardItem = ({movie: {backdrop_path, title, name, release_date, vote_average, id}}: {movie: MediaListItem}) => {

  const {mediaType} = useContext(UiContext);

  const contentTrimmer = (content: string, number: number) => {
    return content.length > number ? content.slice(0, number) + "..." : content;
  }

  const playTrailer = usePlayTrailer(mediaType, id);

  return (
    <div className="card movieCard">
      <Link to={`/movieSummary/${id}`}>
        <div className="movieCard__image">
            {backdrop_path ? <img src={tmdbImage(backdrop_path, "w500")} className="movieCard__imagesrc" alt={title}/> : <img src={imageNotFound} className="movieCard__imagesrc" alt={title}/>}
        </div>
      </Link>
      <div className="movieCard__information">
          <h5 className="movieCard__title">{contentTrimmer(`${title ? title: name}`, 45)}</h5>
          <Rating rating={vote_average} />
          <p className="movieCard__date">Release date: {moment(release_date).format("DD MMM YYYY")}</p>
          <div className="movieCard__buttons">
            <button onClick={playTrailer} className="button button--green">Watch Trailer</button>
            <Link to={`/movieSummary/${id}`} className="button button--green button--skeleton">View More</Link>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;