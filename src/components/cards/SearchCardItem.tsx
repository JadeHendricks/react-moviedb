import React from 'react';
import Rating from "../rating/Rating";
import {Link} from "react-router";
import imageNotFound from "../../images/imageNotFound.jpg";
import { tmdbImage } from "../../api/tmdbClient";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";

function SearchCardItem({movie: {id, title, name, vote_average, overview, poster_path}}: {movie: MediaListItem}) {


  return (
    <div className="card cardSearch">
       <Link to={`/movieSummary/${id}`}>
        <div className="cardSearch__imageholder">
          {poster_path ? <img src={tmdbImage(poster_path, "w500")} className="castCard__image" alt={title}/> : <img src={imageNotFound} className="castCard__image" alt={title}/>}
        </div>
      </Link>
      <div className="cardSearch__info">
        <Rating rating={vote_average}/>
        <h5 className="cardSearch__title">{title ? title : name}</h5>
        <p className="cardSearch__description">
          {truncate(overview, 150)}
        </p>
      </div>
    </div>
  )
}

export default SearchCardItem;