import React from 'react'

function Rating({rating}) {

  const ratingTheme = (rating) => {
    return rating < 5 ? "ratingholder ratingholder--red" : rating > 5 && rating < 7 ? "ratingholder ratingholder--orange" : "ratingholder";
  }

  return (
    <div className={ratingTheme(rating)}>
      <span className="ratingholder__number">{rating.toFixed(1)}</span>
    </div>
  )
}

export default Rating;
