import React from 'react';
import '../../styles/molecules/cast-card.scss';
import { Link } from "react-router";
import MediaImage from "../media/MediaImage";
import type { Credit } from "../../types/tmdb";

function CastCard({cast: {id, character, name, profile_path}}: {cast: Credit}) {
  return (
    <div className="cast-card">
      <div className="cast-card__media">
        <Link to={`/actorSummary/${id}`}>
          <MediaImage path={profile_path} className="cast-card__image" alt={name} />
        </Link>
      </div>
      <div className="cast-card__info">
          <h3 className="cast-card__name">{name}</h3>
          <span className="cast-card__role">{character}</span>
      </div>
    </div>
  )
}

export default CastCard;
