import React, {useState, useEffect, useContext, Fragment} from 'react';
import svgAsset from "../../images/sprite.svg";
import { withRouter } from "react-router-dom";
import ModalContext from "../../context/modal/ModalContext";
import Modal from "../layout/Modal";

function TopNavigation(props) {

  const modalContext = useContext(ModalContext);
  const {authSelection, modalShow} = modalContext;

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
    <Fragment>
    {modalShow ? <Modal /> : ""}
    <nav className="topnav">
      <form className="searchForm" onSubmit={initSearch}>
          <svg className="searchForm__icon">
              <use xlinkHref={`${svgAsset}#icon-magnifying-glass`}></use>
          </svg>
          <input className="searchForm__input" type="search" name="search" placeholder="Search for Movies or TV Series" value={search} onChange={updateSearch} />
      </form>
      <div clas="userAuth">
          <div className="topnav__buttons">
              <button className="button button--green button--skeleton" data-auth="login" onClick={authSelection}>Login</button>
              <button className="button button--green" data-auth="signup" onClick={authSelection}>Sign up</button>
          </div>
          <div className="topnav__account">
              <img src="./assets/x_03.jpg" alt="person" title="person" />
              <span>Kevin Adriana</span>
          </div>
      </div>
    </nav>
    </Fragment>
  )
}

export default withRouter(TopNavigation);
