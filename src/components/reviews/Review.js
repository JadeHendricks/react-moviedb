import React from 'react';
import Rating from "../rating/Rating";

function Review() {
  return (
    <div className="reviews__review">
      <Rating />
      <div className="reviews__title">
          Dan Cederholm <br />
          <span className="reviews__date">October 22, 2017</span>
      </div>
      <div className="reviews__slug">This is how movies should be made!</div>
      <div className="reviews__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est obcaecati eos, 
          assumenda itaque fugiat tenetur eius similique perspiciatis quo a, 
          placeat excepturi ad officia pariatur?
          <br />
          <a className="reviews__link" href="#">See more &rarr;</a>
      </div>
    </div>
  )
}

export default Review;