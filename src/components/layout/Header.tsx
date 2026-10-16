import React, {useContext} from 'react'
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router";
import { releaseDateOf } from "../../utils/formatDate";
import { detailPath, mediaTypeOf } from "../../utils/routes";
import UiContext from "../../context/ui/UiContext";
import { useGenres, useMostPopular } from "../../api/queries";
import { useTrailer } from "../../hooks/useTrailer";
import { tmdbImage } from "../../api/tmdbClient";
import type { MediaListItem } from "../../types/tmdb";

const NO_MOST_POPULAR: Partial<MediaListItem> = {};

const Header = () => {

  const {mediaType} = useContext(UiContext);

  // The hero is keyed by media type, so switching Movies/Series refetches it (B2).
  const {data: mostPopularMovie = NO_MOST_POPULAR} = useMostPopular(mediaType);
  const {backdrop_path, title, name, overview, id, genre_ids, media_type} = mostPopularMovie;
  // The hero's own type, not the tab: while the other tab's hero is still loading the old one stays on screen (B9, B14).
  const heroType = media_type ? mediaTypeOf({media_type}) : mediaType;

  // Pills come from the genre list of the hero's own type, so series show series genres (B14).
  const {data: allGenres} = useGenres(heroType);
  const genres = genre_ids ? (allGenres ?? []).filter(element => genre_ids.includes(element.id)) : [];

  const trailer = useTrailer(heroType, id);

  const backgroundImage = {
    backgroundImage: backdrop_path ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${tmdbImage(backdrop_path, "original")})` : "",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover"
  }

  return (
    <header className="movie-header" style={backgroundImage}>
      <div className="container-small">
          <svg className="movie-header__playicon" {...trailer}>
              <use href={`${svgAssets}#icon-play2`}>
                <title>Play {title} trailer</title>
              </use>
          </svg>
          <h4 className="movie-header__slug">Most Popular</h4>
          <div className="category">
              <div className="category__wrapper">
                {genres.slice(0, 3).map(genre => <div key={genre.id} className="category__pill category__pill--large category__pill--white">{genre.name}</div>)}
              </div>
          </div>
          <h1 className="movie-header__title">{ title ? title : name }</h1>
          <span className="movie-header__date">Release date: { releaseDateOf(mostPopularMovie) }</span>
          <p className="movie-header__description">
            { overview }
          </p>
          <Link to={detailPath(heroType, id)}><button className="button button--green marginBottom20">View More</button></Link>
      </div>
    </header>
  )
}

export default Header;
