import React from 'react';
import svgAssets from "../../images/sprite.svg";
import { Link } from "react-router-dom";

function SideNavigation(props) {
  return (
    <nav className="navigation">
        <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="navigation__logo">MDBv2</h3>
        </Link>
        <div className="navigation__wrapper">
            <Link className="navigation__node active" data-name="now_playing" to="/" onClick={props.handler}>
                <svg className="navigation__icon" data-name="now_playing">
                    <use xlinkHref={`${svgAssets}#icon-video`}></use>
                </svg>
                <h5 className="navigation__nodename" data-name="now_playing">Now Playing</h5>
            </Link>
            <Link className="navigation__node" data-name="top_rated" to="/" onClick={props.handler}>
                <svg className="navigation__icon" data-name="top_rated">
                    <use xlinkHref={`${svgAssets}#icon-desktop`}></use>
                </svg>
                <h5 className="navigation__nodename" data-name="top_rated">Top Rated</h5>
            </Link>
            <Link className="navigation__node" data-name="popular" to="/" onClick={props.handler}>
                <svg className="navigation__icon" data-name="popular">
                    <use xlinkHref={`${svgAssets}#icon-presentation`}></use>
                </svg>
                <h5 className="navigation__nodename" data-name="popular">Popular</h5>
            </Link>
            <Link className="navigation__node" data-name="upcoming" to="/" onClick={props.handler}>
                <svg className="navigation__icon" data-name="upcoming">

                    <use xlinkHref={`${svgAssets}#icon-clock`}></use>
                </svg>
                <h5 className="navigation__nodename" data-name="upcoming">Coming Soon</h5>
            </Link>
        </div>
    </nav>
  )
}

export default SideNavigation;
