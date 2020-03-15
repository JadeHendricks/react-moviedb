import React from 'react'

function CastCard() {
  return (
    <div className="card castCard">
      <div className="castCard__imageholder">
          <img className="castCard__image" src="./assets/06_movie-profile-A_10.jpg" alt="Person" title="person" />
      </div>
      <div className="castCard__info">
          <h5 className="castCard__realname">Jamie Foxx</h5>
          <span className="castCard__as">Bats</span>
      </div>
    </div>
  )
}

export default CastCard;
