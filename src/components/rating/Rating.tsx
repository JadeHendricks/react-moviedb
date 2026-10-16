import React from 'react'

function Rating({rating}: {rating: number | undefined}) {

  const ratingTheme = (rating: number | undefined) => {
    // A missing rating compares false both ways in JS, so the guards keep it on the default class.
    return rating !== undefined && rating < 5 ? "ratingholder ratingholder--red" : rating !== undefined && rating > 5 && rating < 7 ? "ratingholder ratingholder--orange" : "ratingholder";
  }

  return (
    <div className={ratingTheme(rating)}>
      <span className="ratingholder__number">{rating && rating.toFixed(1)}</span>
    </div>
  )
}

export default Rating;
