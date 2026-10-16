import React from 'react';
import { Link } from "react-router";
import MediaImage from "../media/MediaImage";
import type { Credit } from "../../types/tmdb";

function CastCard({cast: {id, character, name, profile_path}}: {cast: Credit}) {
  return (
    <div className="card castCard">
      <div className="castCard__imageholder">
        <Link to={`/actorSummary/${id}`}>
          <MediaImage path={profile_path} className="castCard__image" alt={name} />
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
