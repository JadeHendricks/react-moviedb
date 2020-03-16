import React from 'react';
import Rating from "../rating/Rating";
import { Link } from "react-router-dom";

const MovieCardItem = ({movie: {backdrop_path, title, release_date, vote_average, id}}) => {

  const titleTrimmer = (title) => {
    return title.length > 45 ? title.slice(0, 45) + "..." : title;
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
    <div className="card movieCard">
      <div className="movieCard__image">
          <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} className="movieCard__imagesrc" alt={title}/>
      </div>
      <div className="movieCard__information">
          <h5 className="movieCard__title">{titleTrimmer(title)}</h5>
          <Rating rating={vote_average} />
          <p className="movieCard__date">{release_date}</p>
          <div className="movieCard__buttons">
            <button onClick={playTrailer} className="button button--green">Watch Trailer</button>
            <Link to={`/movie-summary/${id}`} className="button button--green button--skeleton">View More</Link>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;