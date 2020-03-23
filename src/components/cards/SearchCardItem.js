import React from 'react';
import Rating from "../rating/Rating";
import {Link} from "react-router-dom";
import imageNotFound from "../../images/imageNotFound.jpg";

function SearchCardItem({movie: {id, title, name, vote_average, overview, poster_path}}) {

  const contentTrimmer = (content, number) => {
    return content.length > number ? content.slice(0, number) + "..." : content;
  }

  return (
    <div className="card cardSearch">
       <Link to={`/movieSummary/${id}`}>
        <div className="cardSearch__imageholder">
          {poster_path ? <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className="castCard__image" alt={title}/> : <img src={imageNotFound} className="castCard__image" alt={title}/>}
        </div>
      </Link>
      <div className="cardSearch__info">
        <Rating rating={vote_average}/>
        <h5 className="cardSearch__title">{title ? title : name}</h5>
        <p className="cardSearch__description">
          {contentTrimmer(overview, 150)}
        </p>
      </div>
    </div>
  )
}

export default SearchCardItem;