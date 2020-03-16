import React, {Fragment, useState, useEffect} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Pagination from "../informational/Pagination";
import Header from './Header';

function MainContent() {
  
  const [mostPopularMovie, setMostPopularMovie] = useState({});
  const [nowPlaying, setNowPlaying] = useState([]);
  
  useEffect(() => {
    getMostPopularMovie();
    getNowPlaying();
  }, [])


  const getMostPopularMovie = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    const popularMovie = data.results.sort((a,b) => {
        return b.popularity - a.popularity;
    });

    data && setMostPopularMovie(popularMovie[0]);
  }

  const getNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    data && setNowPlaying(data.results);
  }

  return (
    <Fragment>
      <Header movie={mostPopularMovie} />
      <section className="movieSection">
        <div className="container">
          <SwitchTabs />
          <h3 className="movieSection__title">Now Playing</h3>
          <div className="movieSection__titles">
            { nowPlaying.map(movie => <MovieCardItem key={movie.id} movie={movie}  /> ) }
          </div>
        </div>
        <Pagination />
      </section>
    </Fragment>
  )
}

export default MainContent;