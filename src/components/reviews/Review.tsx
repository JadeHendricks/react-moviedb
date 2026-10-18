import React from 'react';
import '../../styles/molecules/review.scss';
import type { Review as ReviewData } from "../../types/tmdb";
import { truncate } from "../../utils/truncate";

function Review({review: {author, content, url}}: {review: ReviewData}) {


  return (
    <div className="review">
      <div className="review__title">
          <strong>{author}</strong>
      </div>
      <div className="review__description">
          { truncate(content, 300) }
          <br />
          <a className="review__link" target="_blank" rel="noopener noreferrer" href={url} aria-label={`See more of ${author}'s review`}>See more &rarr;</a>
      </div>
    </div>
  )
}

export default Review;