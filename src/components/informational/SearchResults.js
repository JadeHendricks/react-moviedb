import React, {Fragment, useState, useEffect} from 'react';
import SearchCardItem from "../cards/SearchCardItem";
import Loader from "../layout/Loader";

function SearchResults() {
  const query = decodeURI(window.location.href.split("/").pop());

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    fetchMoviesAndSeries(query);
    window.scrollTo(0, 0);
    addLoader();

    return () => {
      clearTimeout(addLoader);
    }
    // eslint-disable-next-line
  }, [query]);

  const addLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  const fetchMoviesAndSeries = async (query) => {
    const responseMovies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`);
    const responseSeries = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`);

    const dataMovies = await responseMovies.json();
    const dataSeries = await responseSeries.json();

    const resultsArray = [...dataMovies.results, ...dataSeries.results];
    const mostPopluarOrder =  resultsArray.sort((a, b) => b.popularity - a.popularity);

    setSearchResults(mostPopluarOrder);
  }

  return (
    <Fragment>
      {loading ? <Loader /> : ""}
      <section className="searchResults">
        <div className="container">
            <h2 className="searchResults__title">Search results for <span>{`${query}`}</span></h2>
            <div className="searchResults__wrapper">
              {searchResults.map(result => <SearchCardItem key={result.id} movie={result}/>)}
            </div>
        </div>
      </section>
    </Fragment>

  )
}

export default SearchResults;