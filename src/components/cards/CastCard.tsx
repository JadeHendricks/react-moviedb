import React from 'react';
import '../../styles/molecules/cast-card.scss';
import { Link } from "react-router";
import MediaImage from "../media/MediaImage";
import type { Credit } from "../../types/tmdb";

// Mirrors the flex-basis of .cast-card (23% / 48% below 991px / full width on the narrowest screens).
const CAST_WIDTHS = [185, 500] as const;
const CAST_SIZES = '(max-width: 520px) 100vw, (max-width: 991px) 48vw, 23vw';

function CastCard({cast: {id, character, name, profile_path}}: {cast: Credit}) {
  return (
    <div className="cast-card">
      <div className="cast-card__media">
        <Link to={`/actorSummary/${id}`}>
          <MediaImage path={profile_path} widths={CAST_WIDTHS} sizes={CAST_SIZES} className="cast-card__image" alt={name} />
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
