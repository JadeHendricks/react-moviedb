import React, {useEffect, useState} from 'react'
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router-dom";
import moment from "moment";

const Header = ({ movie: { backdrop_path, title, overview, release_date, id, genre_ids } }) => {

  useEffect(() => {
    setGenresArray(genre_ids);
  }, [genre_ids]);

  const [genres, setGenres] = useState([]);

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


  const setGenresArray = async (genre_ids) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();
    if (genre_ids) {
      const genresArray = data.genres.filter(element => genre_ids.includes(element.id));
      setGenres(genresArray);
    }
  }

  return (
    <header className="movie-header" style={backgroundImage}>
      <div className="container-small">
          <svg className="movie-header__playicon" onClick={playTrailer}>
              <use xlinkHref={`${svgAssets}#icon-play2`}>
                <title>Play {title} trailer</title>
              </use>
          </svg>
          <h4 className="movie-header__slug">Most Popular</h4>
          <div className="category">
              <div className="category__wrapper">
                {genres.slice(0, 3).map(genre => <div key={genre.id} className="category__pill category__pill--large category__pill--white">{genre.name}</div>)}
              </div>
          </div>
          <h1 className="movie-header__title">{ title }</h1>
          <span className="movie-header__date">Release date: { moment(release_date).format("DD MMM YYYY") }</span>
          <p className="movie-header__description">
            { overview }
          </p>
          <Link to={`/movieSummary/${id}`}><button className="button button--green marginBottom20">View More</button></Link>
      </div>
    </header>
  )
}

export default Header;