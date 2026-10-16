import React, {useState, useContext, Fragment, type FormEvent, type ChangeEvent} from 'react';
import '../../styles/organisms/top-nav.scss';
import '../../styles/molecules/search-form.scss';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/icon.scss';
import '../../styles/atoms/button.scss';
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

  const initSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");

    // The term is encoded into the path segment; the results page reads it back with useParams (B6).
    search === "" ?  alert("Please insert a search term") : navigate(`/searchResults/${encodeURIComponent(search.toLowerCase())}`);
  }

  const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <Fragment>
    {modalShow ? <Modal /> : ""}
    <nav className="top-nav">
      <form className="search-form" onSubmit={initSearch}>
          <svg className="icon search-form__icon">
              <use href={`${svgAsset}#icon-magnifying-glass`}></use>
          </svg>
          <input className="input input--search" type="search" name="search" placeholder="Search for Movies or TV Series" value={search} onChange={updateSearch} />
      </form>
      <div className="top-nav__auth">
          <div className="top-nav__buttons">
              <button className="button button--skeleton top-nav__button" data-auth="login" onClick={authSelection}>Login</button>
              <button className="button button--green top-nav__button" data-auth="signup" onClick={authSelection}>Sign up</button>
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
