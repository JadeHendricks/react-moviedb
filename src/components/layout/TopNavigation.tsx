import React, {useState, useContext, Fragment, type FormEvent, type ChangeEvent} from 'react';
import '../../styles/organisms/top-nav.scss';
import '../../styles/molecules/search-form.scss';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/icon.scss';
import '../../styles/atoms/button.scss';
import '../../styles/atoms/visually-hidden.scss';
import svgAsset from "../../images/sprite.svg";
import { useNavigate } from "react-router";
import ModalContext from "../../context/modal/ModalContext";
import Modal from "../layout/Modal";
import avatar from "../../images/x_03.jpg";

function TopNavigation() {
  const navigate = useNavigate();

  const modalContext = useContext(ModalContext);
  const {authSelection, modalShow} = modalContext;

  const [search, setSearch] = useState("");
  // An empty search shows a message under the bar instead of an alert box (a11y).
  const [searchError, setSearchError] = useState(false);

  const initSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");

    if (search === "") {
      setSearchError(true);
      return;
    }
    setSearchError(false);
    // The term is encoded into the path segment; the results page reads it back with useParams (B6).
    navigate(`/searchResults/${encodeURIComponent(search.toLowerCase())}`);
  }

  const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchError(false);
  }

  return (
    <Fragment>
    {modalShow ? <Modal /> : ""}
    <nav className="top-nav" aria-label="Search and account">
      <form className="search-form" role="search" onSubmit={initSearch}>
          <svg className="icon search-form__icon" aria-hidden="true" focusable="false">
              <use href={`${svgAsset}#icon-magnifying-glass`}></use>
          </svg>
          <label htmlFor="site-search" className="visually-hidden">Search for Movies or TV Series</label>
          <input id="site-search" className="input input--search" type="search" name="search" placeholder="Search for Movies or TV Series" value={search} onChange={updateSearch} aria-invalid={searchError} aria-describedby={searchError ? "site-search-error" : undefined} />
          {searchError ? <p id="site-search-error" className="search-form__error" role="alert">Please insert a search term</p> : ""}
      </form>
      <div className="top-nav__auth">
          <div className="top-nav__buttons">
              <button type="button" className="button button--skeleton top-nav__button" aria-haspopup="dialog" data-auth="login" onClick={authSelection}>Login</button>
              <button type="button" className="button button--green top-nav__button" aria-haspopup="dialog" data-auth="signup" onClick={authSelection}>Sign up</button>
          </div>
          <div className="top-nav__account">
              <img className="top-nav__avatar" src={avatar} alt="person" title="person" />
              <span className="top-nav__name">Kevin Adriana</span>
          </div>
      </div>
    </nav>
    </Fragment>
  )
}

export default TopNavigation;
