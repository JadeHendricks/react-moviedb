import React, {useContext} from 'react';
import Rating from "../rating/Rating";
import { Link } from "react-router-dom";
import imageNotFound from "../../images/imageNotFound.jpg";
import moment from "moment";
import MainContentContext from "../../context/mainContent/MainContentContext";

const MovieCardItem = ({movie: {backdrop_path, title, name, release_date, vote_average, id}}) => {

  const mainContentContext = useContext(MainContentContext);
  const {appWideContent} = mainContentContext;

  const contentTrimmer = (content, number) => {
    return content.length > number ? content.slice(0, number) + "..." : content;
  }

  const playTrailer = async (e) => {
    let response;
    if (appWideContent === "movies") {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    }
    const data = await response.json();
    const videoKey = data.results[0].key;

    window.open(
      `https://www.youtube.com/watch?v=${videoKey}`,
      `_blank`
    );
  }

  return (
    <div className="card movieCard">
      <Link to={`/movieSummary/${id}`}>
        <div className="movieCard__image">
            {backdrop_path ? <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} className="movieCard__imagesrc" alt={title}/> : <img src={imageNotFound} className="movieCard__imagesrc" alt={title}/>}
        </div>
      </Link>
      <div className="movieCard__information">
          <h5 className="movieCard__title">{contentTrimmer(`${title ? title: name}`, 45)}</h5>
          <Rating rating={vote_average} />
          <p className="movieCard__date">Release date: {moment(release_date).format("DD MMM YYYY")}</p>
          <div className="movieCard__buttons">
            <button onClick={playTrailer} className="button button--green">Watch Trailer</button>
            <Link to={`/movieSummary/${id}`} className="button button--green button--skeleton">View More</Link>
          </div>
      </div>
    </div>
  )
}

export default MovieCardItem;