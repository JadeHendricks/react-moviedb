import React, {useState, useContext, Fragment, type FormEvent, type ChangeEvent} from 'react';
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
    <nav className="topnav">
      <form className="searchForm" onSubmit={initSearch}>
          <svg className="searchForm__icon">
              <use href={`${svgAsset}#icon-magnifying-glass`}></use>
          </svg>
          <input className="searchForm__input" type="search" name="search" placeholder="Search for Movies or TV Series" value={search} onChange={updateSearch} />
      </form>
      <div className="userAuth">
          <div className="topnav__buttons">
              <button className="button button--green button--skeleton" data-auth="login" onClick={authSelection}>Login</button>
              <button className="button button--green" data-auth="signup" onClick={authSelection}>Sign up</button>
          </div>
          <div className="topnav__account">
              <img src={avatar} alt="person" title="person" />
              <span>Kevin Adriana</span>
          </div>
      </div>
    </nav>
    </Fragment>
  )
}

export default TopNavigation;
