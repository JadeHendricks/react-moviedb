import React, {useContext} from 'react';
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router-dom";
import MainContentContext from "../../context/mainContent/MainContentContext";

function SideNavigation() {

    const mainContentContext = useContext(MainContentContext);
    const {handleClick, appWideContent} = mainContentContext;

  return (
    <nav className="navigation">
        <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="navigation__logo">MDBv2</h3>
        </Link>
        <div className="navigation__wrapper">
            <Link className="navigation__node active"  data-content={appWideContent === "series" ? "on_the_air" : "now_playing"} to="/" onClick={handleClick}>
                <svg className="navigation__icon" data-content={appWideContent === "series" ? "on_the_air" : "now_playing"}>
                    <use xlinkHref={`${svgAssets}#icon-video`}></use>
                </svg>
                <h5 className="navigation__nodename" data-content={appWideContent === "series" ? "on_the_air" : "now_playing"}>Now Playing</h5>
            </Link>
            <Link className="navigation__node" data-content="top_rated" to="/" onClick={handleClick}>
                <svg className="navigation__icon" data-content="top_rated">
                    <use xlinkHref={`${svgAssets}#icon-desktop`}></use>
                </svg>
                <h5 className="navigation__nodename" data-content="top_rated">Top Rated</h5>
            </Link>
            <Link className="navigation__node" data-content="popular" to="/" onClick={handleClick}>
                <svg className="navigation__icon" data-content="popular">
                    <use xlinkHref={`${svgAssets}#icon-presentation`}></use>
                </svg>
                <h5 className="navigation__nodename" data-content="popular">Popular</h5>
            </Link>
            {appWideContent === "movies" ? 
            <Link className="navigation__node" data-content="upcoming" to="/" onClick={handleClick}>
                <svg className="navigation__icon"  data-content="upcoming">
                    <use xlinkHref={`${svgAssets}#icon-clock`}></use>
                </svg>
                <h5 className="navigation__nodename" data-content="upcoming">Coming Soon</h5>
            </Link> : ""}
        </div>
    </nav>
  )
}

export default SideNavigation;
