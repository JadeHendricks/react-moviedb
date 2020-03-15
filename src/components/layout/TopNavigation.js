import React from 'react';
import svgAsset from "../../images/sprite.svg";

function TopNavigation() {
  return (
    <nav className="topnav">
      <form className="searchForm">
          <svg className="searchForm__icon">
              <use xlinkHref={`${svgAsset}#icon-magnifying-glass`}></use>
          </svg>
          <input className="searchForm__input" type="search" name="search" placeholder="Search for Movies or TV Series" />
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

export default TopNavigation;
