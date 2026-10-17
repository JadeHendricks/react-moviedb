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
  // Tells assistive tech which category is on. "true", not "page": the category stays selected on other pages too.
  const itemCurrent = (name: Category) => (category === name ? "true" : undefined);

  // A click only sets the category; the list query is keyed by it and does the fetching (B5).
  // The labels are not headings: the page's own outline starts below this menu.
  return (
    <nav className="side-nav" aria-label="Categories">
        <Link to="/" className="side-nav__home" aria-label="MDBv2 home">
            <div className="side-nav__logo">MDBv2</div>
        </Link>
        <div className="side-nav__list">
            <Link className={itemClass("now_playing")} aria-current={itemCurrent("now_playing")} to="/" onClick={() => setCategory("now_playing")}>
                <svg className="icon side-nav__icon" aria-hidden="true" focusable="false">
                    <use href={`${svgAssets}#icon-video`}></use>
                </svg>
                <div className="side-nav__label">Now Playing</div>
            </Link>
            <Link className={itemClass("top_rated")} aria-current={itemCurrent("top_rated")} to="/" onClick={() => setCategory("top_rated")}>
                <svg className="icon side-nav__icon" aria-hidden="true" focusable="false">
                    <use href={`${svgAssets}#icon-desktop`}></use>
                </svg>
                <div className="side-nav__label">Top Rated</div>
            </Link>
            <Link className={itemClass("popular")} aria-current={itemCurrent("popular")} to="/" onClick={() => setCategory("popular")}>
                <svg className="icon side-nav__icon" aria-hidden="true" focusable="false">
                    <use href={`${svgAssets}#icon-presentation`}></use>
                </svg>
                <div className="side-nav__label">Popular</div>
            </Link>
            {appWideContent === "movies" ? 
            <Link className={itemClass("upcoming")} aria-current={itemCurrent("upcoming")} to="/" onClick={() => setCategory("upcoming")}>
                <svg className="icon side-nav__icon" aria-hidden="true" focusable="false">
                    <use href={`${svgAssets}#icon-clock`}></use>
                </svg>
                <div className="side-nav__label">Upcoming</div>
            </Link> : ""}
        </div>
    </nav>
  )
}

export default SideNavigation;
