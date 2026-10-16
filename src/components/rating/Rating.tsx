import React from 'react'
function Rating({rating}: {rating: number | undefined}) {
  // Below 5 is red, 5 up to (not including) 7 is orange, everything else keeps the default green (B18).
  const ratingTheme = (rating: number | undefined) => {
    if (rating === undefined) return "ratingholder";
    if (rating < 5) return "ratingholder ratingholder--red";
    if (rating < 7) return "ratingholder ratingholder--orange";
    return "ratingholder";
  }
  return (
    <div className={ratingTheme(rating)}>
      {/* `?.` instead of `&&`, so a rating of 0 shows "0.0" and not a bare "0". */}
      <span className="ratingholder__number">{rating?.toFixed(1)}</span>
    </div>
  )
}
export default Rating;