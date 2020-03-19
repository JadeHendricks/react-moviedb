import React, {useState, useEffect} from 'react';
import svgAsset from "../../images/sprite.svg";
import { withRouter } from "react-router-dom";

function TopNavigation(props) {

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      props.history.push(`/searchResults/${query}`);
      setRedirect(false);
    }
  // eslint-disable-next-line
  }, [query]);

  const initSearch = e => {
    e.preventDefault();
    setQuery(search.toLowerCase());
    setSearch("");

    search === "" ?  alert("Please insert a search term") : setRedirect(true);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <nav className="topnav">
      <form className="searchForm" onSubmit={initSearch}>
          <svg className="searchForm__icon">
              <use xlinkHref={`${svgAsset}#icon-magnifying-glass`}></use>
          </svg>
          <input className="searchForm__input" type="search" name="search" placeholder="Search for Movies or TV Series" value={search} onChange={updateSearch} />
      </form>
      <div clas="userAuth">
          <div className="topnav__buttons">
              <button className="button button--green button--skeleton">Login</button>
              <button className="button button--green">Sign up</button>
          </div>
          <div className="topnav__account">
              <img src="./assets/x_03.jpg" alt="person" title="person" />
              <span>Kevin Adriana</span>
          </div>
      </div>
    </nav>
  )
}

export default withRouter(TopNavigation);
