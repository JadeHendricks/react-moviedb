import React from 'react';
import '../../styles/molecules/search-card.scss';
import Rating from "../rating/Rating";
import {Link} from "react-router";
import MediaImage from "../media/MediaImage";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";
import { detailPath, mediaTypeOf } from "../../utils/routes";

// Mirrors the flex-basis of .search-card at each breakpoint.
const POSTER_WIDTHS = [185, 342, 500] as const;
const POSTER_SIZES = '(max-width: 520px) 100vw, (max-width: 767px) 48vw, (max-width: 991px) 31vw, (max-width: 1200px) 23vw, 18vw';

function SearchCardItem({movie: {id, title, name, vote_average, overview, poster_path, media_type}}: {movie: MediaListItem}) {


  return (
    <div className="search-card">
       <Link to={detailPath(mediaTypeOf({media_type}), id)}>
        <div className="search-card__media">
          <MediaImage path={poster_path} widths={POSTER_WIDTHS} sizes={POSTER_SIZES} className="search-card__image" alt={title ? title : name} />
        </div>
      </Link>
      <div className="search-card__info">
        <Rating rating={vote_average} className="search-card__rating"/>
        <h2 className="search-card__title">{title ? title : name}</h2>
        <p className="search-card__description">
          {truncate(overview, 150)}
        </p>
      </div>
    </div>
  )
}

export default SearchCardItem;