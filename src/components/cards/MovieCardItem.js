import React from 'react';
import Rating from "../rating/Rating"

function MovieCardItem() {
  return (
    <div className="card movieCard">
      <div className="movieCard__image">
          <img src="./assets/movie-poster.png" className="movieCard__imagesrc" alt=""/>
      </div>
      <div className="movieCard__information">
          <h5 className="movieCard__title">Where The Wild Things are headed this way</h5>
          <Rating />
          <p className="movieCard__date">12 August 2020</p>
          <div className="movieCard__buttons">
              <button className="button button--green">Watch Trailer</button>
              <button className="button button--green button--skeleton">View More</button>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;