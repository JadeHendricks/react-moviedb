import React from 'react';
import type { Review as ReviewData } from "../../types/tmdb";

function Review({review: {author, content, url}}: {review: ReviewData}) {

  const contentTrimmer = (content: string, number: number) => {
    return content.length > number ? content.slice(0, number) + "..." : content;
  }

  return (
    <div className="reviews__review">
      <div className="reviews__title">
          <strong>{author}</strong>
      </div>
      <div className="reviews__description">
          { contentTrimmer(content, 300) }
          <br />
          <a className="reviews__link" target="_blank" rel="noopener noreferrer" href={url}>See more &rarr;</a>
      </div>
    </div>
  )
}

export default Review;