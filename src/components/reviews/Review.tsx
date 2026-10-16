import React from 'react';
import type { Review as ReviewData } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";

function Review({review: {author, content, url}}: {review: ReviewData}) {


  return (
    <div className="reviews__review">
      <div className="reviews__title">
          <strong>{author}</strong>
      </div>
      <div className="reviews__description">
          { truncate(content, 300) }
          <br />
          <a className="reviews__link" target="_blank" rel="noopener noreferrer" href={url}>See more &rarr;</a>
      </div>
    </div>
  )
}

export default Review;