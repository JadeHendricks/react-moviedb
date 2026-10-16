import React from 'react'
import '../../styles/atoms/rating.scss'
function Rating({rating, className}: {rating: number | undefined, className?: string}) {
  // Below 5 is red, 5 up to (not including) 7 is orange, everything else keeps the default green (B18).
  const ratingTheme = (rating: number | undefined) => {
    if (rating === undefined) return "rating";
    if (rating < 5) return "rating rating--red";
    if (rating < 7) return "rating rating--orange";
    return "rating";
  }
  return (
    <div className={className ? `${ratingTheme(rating)} ${className}` : ratingTheme(rating)}>
      {/* `?.` instead of `&&`, so a rating of 0 shows "0.0" and not a bare "0". */}
      <span className="rating__number">{rating?.toFixed(1)}</span>
    </div>
  )
}
export default Rating;