import React, {useContext} from 'react';
import '../../styles/atoms/icon.scss';
import '../../styles/organisms/side-nav.scss';
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router";
import UiContext from "../../context/ui/UiContext";

type Category = "now_playing" | "top_rated" | "popular" | "upcoming";

function SideNavigation() {
  const {setCategory, appWideContent, category} = useContext(UiContext);

  // The current category is the only active item; the rest keep the plain class.
  const itemClass = (name: Category) => (category === name ? "side-nav__item side-nav__item--active" : "side-nav__item");

  // A click only sets the category; the list query is keyed by it and does the fetching (B5).
  return (
    <nav className="side-nav">
        <Link to="/" className="side-nav__home">
            <h3 className="side-nav__logo">MDBv2</h3>
        </Link>
        <div className="side-nav__list">
            <Link className={itemClass("now_playing")} to="/" onClick={() => setCategory("now_playing")}>
                <svg className="icon side-nav__icon">
                    <use href={`${svgAssets}#icon-video`}></use>
                </svg>
                <h5 className="side-nav__label">Now Playing</h5>
            </Link>
            <Link className={itemClass("top_rated")} to="/" onClick={() => setCategory("top_rated")}>
                <svg className="icon side-nav__icon">
                    <use href={`${svgAssets}#icon-desktop`}></use>
                </svg>
                <h5 className="side-nav__label">Top Rated</h5>
            </Link>
            <Link className={itemClass("popular")} to="/" onClick={() => setCategory("popular")}>
                <svg className="icon side-nav__icon">
                    <use href={`${svgAssets}#icon-presentation`}></use>
                </svg>
                <h5 className="side-nav__label">Popular</h5>
            </Link>
            {appWideContent === "movies" ? 
            <Link className={itemClass("upcoming")} to="/" onClick={() => setCategory("upcoming")}>
                <svg className="icon side-nav__icon">
                    <use href={`${svgAssets}#icon-clock`}></use>
                </svg>
                <h5 className="side-nav__label">Upcoming</h5>
            </Link> : ""}
        </div>
    </nav>
  )
}

export default SideNavigation;
