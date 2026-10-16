import React, {useContext} from 'react';
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router";
import UiContext from "../../context/ui/UiContext";

function SideNavigation() {

  const {setCategory, appWideContent, category} = useContext(UiContext);

  // A click only sets the category; the list query is keyed by it and does the fetching (B5).
  return (
    <nav className="navigation">
        <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="navigation__logo">MDBv2</h3>
        </Link>
        <div className="navigation__wrapper">
            <Link className={category === "now_playing" ? "navigation__node active" : "navigation__node"} to="/" onClick={() => setCategory("now_playing")}>
                <svg className="navigation__icon">
                    <use href={`${svgAssets}#icon-video`}></use>
                </svg>
                <h5 className="navigation__nodename">Now Playing</h5>
            </Link>
            <Link className={category === "top_rated" ? "navigation__node active" : "navigation__node"} to="/" onClick={() => setCategory("top_rated")}>
                <svg className="navigation__icon">
                    <use href={`${svgAssets}#icon-desktop`}></use>
                </svg>
                <h5 className="navigation__nodename">Top Rated</h5>
            </Link>
            <Link className={category === "popular" ? "navigation__node active" : "navigation__node"} to="/" onClick={() => setCategory("popular")}>
                <svg className="navigation__icon">
                    <use href={`${svgAssets}#icon-presentation`}></use>
                </svg>
                <h5 className="navigation__nodename">Popular</h5>
            </Link>
            {appWideContent === "movies" ? 
            <Link className={category === "upcoming" ? "navigation__node active" : "navigation__node"} to="/" onClick={() => setCategory("upcoming")}>
                <svg className="navigation__icon">
                    <use href={`${svgAssets}#icon-clock`}></use>
                </svg>
                <h5 className="navigation__nodename">Upcoming</h5>
            </Link> : ""}
        </div>
    </nav>
  )
}

export default SideNavigation;
