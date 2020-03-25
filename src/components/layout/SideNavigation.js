import React, {useContext} from 'react';
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router-dom";
import MainContentContext from "../../context/mainContent/MainContentContext";

function SideNavigation() {

  const mainContentContext = useContext(MainContentContext);
  const {handleClick, appWideContent, whatsShowing} = mainContentContext;

  return (
    <nav className="navigation">
        <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="navigation__logo">MDBv2</h3>
        </Link>
        <div className="navigation__wrapper">
            <Link className={whatsShowing === "Now playing" ? "navigation__node active" : "navigation__node"}  data-content={appWideContent === "series" || appWideContent === null  ? "on_the_air" : "now_playing"} to="/" onClick={handleClick}>
                <svg className="navigation__icon">
                    <use xlinkHref={`${svgAssets}#icon-video`}></use>
                </svg>
                <h5 className="navigation__nodename">Now Playing</h5>
            </Link>
            <Link className={whatsShowing === "Top rated" ? "navigation__node active" : "navigation__node"} data-content="top_rated" to="/" onClick={handleClick}>
                <svg className="navigation__icon">
                    <use xlinkHref={`${svgAssets}#icon-desktop`}></use>
                </svg>
                <h5 className="navigation__nodename">Top Rated</h5>
            </Link>
            <Link className={whatsShowing === "Popular" ? "navigation__node active" : "navigation__node"} data-content="popular" to="/" onClick={handleClick}>
                <svg className="navigation__icon">
                    <use xlinkHref={`${svgAssets}#icon-presentation`}></use>
                </svg>
                <h5 className="navigation__nodename">Popular</h5>
            </Link>
            {appWideContent === "movies" ? 
            <Link className={whatsShowing === "Upcoming" ? "navigation__node active" : "navigation__node"} data-content="upcoming" to="/" onClick={handleClick}>
                <svg className="navigation__icon">
                    <use xlinkHref={`${svgAssets}#icon-clock`}></use>
                </svg>
                <h5 className="navigation__nodename">Upcoming</h5>
            </Link> : ""}
        </div>
    </nav>
  )
}

export default SideNavigation;
