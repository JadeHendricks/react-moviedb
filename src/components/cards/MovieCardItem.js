import React from 'react';
import Rating from "../rating/Rating"

const MovieCardItem = ({movie: {backdrop_path, title, release_date, vote_average, id}}) => {

  const titleTrimmer = (title) => {
    return title.length > 45 ? title.slice(0, 45) + "..." : title;
  }

  return (
    <div className="card movieCard">
      <div className="movieCard__image">
          <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} className="movieCard__imagesrc" alt={title}/>
      </div>
      <div className="movieCard__information">
          <h5 className="movieCard__title">{titleTrimmer(title)}</h5>
          <Rating rating={vote_average} />
          <p className="movieCard__date">{release_date}</p>
          <div className="movieCard__buttons">
              <button className="button button--green">Watch Trailer</button>
              <button className="button button--green button--skeleton">View More</button>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;