import React, {Fragment, useEffect} from 'react';
import { useParams } from "react-router";
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
      <section className="searchResults">
        <div className="container">
            <h2 className="searchResults__title">Search results for <span>{`${query}`}</span></h2>
            <div className="searchResults__wrapper">
              {searchResults.map(result => <SearchCardItem key={searchResultKey(result)} movie={result}/>)}
            </div>
        </div>
      </section>
    </Fragment>

  )
}

export default SearchResults;
