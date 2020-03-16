import React, {Fragment, useState, useEffect} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Pagination from "../informational/Pagination";

function MainContent() {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  
  useEffect(() => {
    getNowPlayingMovies();
    getTopRatedMovies();
    getPopularMovies();
    getComingSoonMovie();
  }, [])
  
  const getNowPlayingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    setNowPlaying(data.results);
  }
  
  const getTopRatedMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    setTopRated(data.results);
  }
  
  const getPopularMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    setPopular(data.results);
  }
  
  const getComingSoonMovie = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    setComingSoon(data.results);
  }

  return (
    <Fragment>
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