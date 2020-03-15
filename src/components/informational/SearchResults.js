import React from 'react';
import SearchCardItem from "../cards/SearchCardItem";

function SearchResults() {
  return (
    <section class="searchResults">
      <div class="container">
          <h2 class="searchResults__title">Search results for <span>Shrek</span></h2>
          <div class="searchResults__wrapper">
            <SearchCardItem />
          </div>
      </div>
    </section>

  )
}

export default SearchResults;