import React from 'react'

function CastCard({cast: {id, character, name, profile_path}}) {
  return (
    <div className="card castCard">
      <div className="castCard__imageholder">
          <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} className="castCard__image" alt={name}/>
      </div>
      <div className="castCard__info">
          <h5 className="castCard__realname">{name}</h5>
          <span className="castCard__as">{character}</span>
      </div>
    </div>
  )
}

export default CastCard;
