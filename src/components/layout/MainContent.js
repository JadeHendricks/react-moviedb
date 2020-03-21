import React, {Fragment, useState, useEffect} from 'react';
import MovieCardItem from "../cards/MovieCardItem";
import SwitchTabs from "../layout/SwitchTabs";
import Pagination from "../informational/Pagination";
import Header from './Header';

function MainContent(props) {
  
  const [mostPopularMovie, setMostPopularMovie] = useState({});
  
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getMostPopularMovie(); 
    }
    return () => { unmounted = true };
    // eslint-disable-next-line
  }, [])


  const getMostPopularMovie = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    const popularMovie = data.results.sort((a,b) => {
        return b.popularity - a.popularity;
    });

    data && setMostPopularMovie(popularMovie[0]);
  }

  return (
    <Fragment>
      <Header movie={mostPopularMovie} />
      <section className="movieSection">
        <div className="container">
          <SwitchTabs />
          <h3 className="movieSection__title">{props.whatsShowing}</h3>
          <div className="movieSection__titles">
            { props.movie ? props.movie.map(movie => <MovieCardItem key={movie.id} movie={movie}  /> ) : "" }
          </div>
        </div>
        <Pagination />
      </section>
    </Fragment>
  )
}

export default MainContent;