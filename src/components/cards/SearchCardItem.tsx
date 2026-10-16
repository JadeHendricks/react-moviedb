import React from 'react';
import Rating from "../rating/Rating";
import {Link} from "react-router";
import MediaImage from "../media/MediaImage";
import type { MediaListItem } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";
import { detailPath, mediaTypeOf } from "../../utils/routes";

function SearchCardItem({movie: {id, title, name, vote_average, overview, poster_path, media_type}}: {movie: MediaListItem}) {


  return (
    <div className="card cardSearch">
       <Link to={detailPath(mediaTypeOf({media_type}), id)}>
        <div className="cardSearch__imageholder">
          <MediaImage path={poster_path} className="cardSearch__image" alt={title ? title : name} />
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