import React from 'react';
import { Link } from "react-router-dom";
import imageNotFound from "../../images/imageNotFound.jpg";

function CastCard({cast: {id, character, name, profile_path}}) {
  return (
    <div className="card castCard">
      <div className="castCard__imageholder">
        <Link to={`/actorSummary/${id}`}>
          {profile_path ? <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} className="castCard__image" alt={name}/> : <img src={imageNotFound} className="castCard__image" alt={name}/>}
        </Link>
      </div>
      <div className="castCard__info">
          <h5 className="castCard__realname">{name}</h5>
          <span className="castCard__as">{character}</span>
      </div>
    </div>
  )
}

export default CastCard;
