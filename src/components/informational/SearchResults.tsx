import React, {Fragment, useEffect} from 'react';
import '../../styles/pages/search.scss';
import { useParams } from "react-router";
import '../../styles/layout/container.scss';
import SearchCardItem from "../cards/SearchCardItem";
import Loader from "../layout/Loader";
import { searchResultKey, useSearch } from "../../api/queries";
import { useLoadingOverlay } from "../../hooks/useLoadingOverlay";

function SearchResults() {
  // The router has already decoded the segment, so `&`, `#`, `/` and `%` in a search are safe (B6).
  const query = useParams().id ?? "";

  // Both searches run in parallel and are aborted when the query changes (B7).
  const {data: searchResults, isLoading} = useSearch(query);

  const loading = useLoadingOverlay(isLoading, query);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <Fragment>
      {loading ? <Loader /> : ""}
      <section className="search">
        <div className="container">
            <h2 className="search__title">Search results for <span className="search__query">{`${query}`}</span></h2>
            <div className="search__results">
              {searchResults.map(result => <SearchCardItem key={searchResultKey(result)} movie={result}/>)}
            </div>
        </div>
      </section>
    </Fragment>

  )
}

export default SearchResults;
