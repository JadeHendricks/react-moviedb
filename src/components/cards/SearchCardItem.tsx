import React from 'react';
import '../../styles/molecules/search-card.scss';
import Rating from "../rating/Rating";
import {Link} from "react-router";
import MediaImage from "../media/MediaImage";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";
import { detailPath, mediaTypeOf } from "../../utils/routes";

function SearchCardItem({movie: {id, title, name, vote_average, overview, poster_path, media_type}}: {movie: MediaListItem}) {


  return (
    <div className="search-card">
       <Link to={detailPath(mediaTypeOf({media_type}), id)}>
        <div className="search-card__media">
          <MediaImage path={poster_path} className="search-card__image" alt={title ? title : name} />
        </div>
      </Link>
      <div className="search-card__info">
        <Rating rating={vote_average} className="search-card__rating"/>
        <h5 className="search-card__title">{title ? title : name}</h5>
        <p className="search-card__description">
          {truncate(overview, 150)}
        </p>
      </div>
    </div>
  )
}

export default SearchCardItem;