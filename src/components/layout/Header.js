import React, { useState, useEffect } from 'react'
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router-dom";
import MovieSummary from "../informational/MovieSummary";

const Header = () => {

  const [mostPopularMovie, setMostPopularMovie] = useState({});

  useEffect(() => {
    getMostPopularMovie();
  }, [])

  const getMostPopularMovie = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    console.log(`${process.env.REACT_APP_API_KEY}`);

    const popularMovie = data.results.sort((a,b) => {
        return b.popularity - a.popularity;
    });

    setMostPopularMovie(popularMovie[0]);
  }

  const backgroundImage = {
    backgroundImage: mostPopularMovie.backdrop_path ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${mostPopularMovie.backdrop_path})` : false,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover"
  }

  return (
    <header className="movie-header" style={backgroundImage}>
      <div className="container-small">
          <svg className="movie-header__playicon">
              <use xlinkHref={`${svgAssets}#icon-play2`}></use>
          </svg>
          <h4 className="movie-header__slug">Most Popular</h4>
          <div className="category">
              <div className="category__wrapper">
                  <div className="category__pill category__pill--large category__pill--white">Drama</div>
                  <div className="category__pill category__pill--large category__pill--white">Sci-fi</div>
              </div>
          </div>
          <h1 className="movie-header__title">{ mostPopularMovie.title }</h1>
          <span className="movie-header__date">12 August 2020 &nbsp; | &nbsp; 240 mins.&nbsp; &nbsp;|  &nbsp;Action</span>
          <p className="movie-header__description">
            {mostPopularMovie.overview}
          </p>
          <Link to={`/movieSummary/${mostPopularMovie.id}`}><button className="button button--green marginBottom20">Watch Trailer</button></Link>
      </div>
    </header>
  )
}

export default Header;