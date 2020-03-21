import React, {useState, useEffect} from 'react';
import SearchCardItem from "../cards/SearchCardItem";
import Pagination from './Pagination';

function SearchResults() {
  const query = decodeURI(window.location.href.split("/").pop());

  useEffect(() => {
    fetchSearch(query);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [query]);

  const [searchResults, setSearchResults] = useState([]);

  const fetchSearch = async (query) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`);
    const data = await response.json();
    data && setSearchResults(data.results);
  }

  return (
    <section className="searchResults">
      <div className="container">
          <h2 className="searchResults__title">Search results for <span>{`${query}`}</span></h2>
          <div className="searchResults__wrapper">
            {searchResults.map(result => <SearchCardItem key={result.id} movie={result}/>)}
          </div>
      </div>
      <Pagination />
    </section>

  )
}

export default SearchResults;