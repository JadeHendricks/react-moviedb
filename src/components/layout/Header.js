import React from 'react'
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router-dom";

const Header = ({ movie: { backdrop_path, title, overview, release_date, id } }) => {

  const backgroundImage = {
    backgroundImage: backdrop_path ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${backdrop_path})` : "",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover"
  }

  const playTrailer = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    const videoKey = data.results[0].key;

    window.open(
      `https://www.youtube.com/watch?v=${videoKey}`,
      `_blank`
    );
  }

  return (
    <header className="movie-header" style={backgroundImage}>
      <div className="container-small">
          <svg className="movie-header__playicon" onClick={playTrailer}>
              <use xlinkHref={`${svgAssets}#icon-play2`}></use>
          </svg>
          <h4 className="movie-header__slug">Most Popular</h4>
          <div className="category">
              <div className="category__wrapper">
                  <div className="category__pill category__pill--large category__pill--white">Drama</div>
                  <div className="category__pill category__pill--large category__pill--white">Sci-fi</div>
              </div>
          </div>
          <h1 className="movie-header__title">{ title }</h1>
          <span className="movie-header__date">{ release_date } &nbsp; | &nbsp; 240 mins.&nbsp;</span>
          <p className="movie-header__description">
            { overview }
          </p>
          <Link to={`/movieSummary/${id}`}><button className="button button--green marginBottom20">View More</button></Link>
      </div>
    </header>
  )
}

export default Header;