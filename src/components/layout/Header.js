import React from 'react'
import svgAssets from "../../images/sprite.svg"

export default function Header() {
  return (
    <header className="movie-header">
      <div className="container-small">
          <svg className="movie-header__playicon">
              <use xlinkHref={`${svgAssets}#icon-play2`}></use>
          </svg>
          <h4 className="movie-header__slug">Most Popular</h4>
          <div className="category">
              <div className="category__wrapper">
                  <div className="category__pill category__pill--large category__pill--white">Drama</div>
                  <div className="category__pill category__pill--large category__pill--white">Sci-fi</div>
              </div>
          </div>
          <h1 className="movie-header__title">Made In America</h1>
          <span className="movie-header__date">12 August 2020 &nbsp; | &nbsp; 240 mins.&nbsp; &nbsp;|  &nbsp;Action</span>
          <p className="movie-header__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aspernatur aliquam vitae magni officiis, 
              ipsam at iste quis id praesentium iure, quibusdam adipisci quaerat fuga dolorum alias consequuntur, quam voluptatibus.
          </p>
          <button className="button button--green marginBottom20">Watch Trailer</button>

          <div className="movie-header-starring">
              <div className="movie-header-starring__title">Starring</div>
              <div className="movie-header-starring__wrapper">
                  {/* <img className="movie-header-starring__image" src="../../images/person.jpg" alt="person" />
                  <img className="movie-header-starring__image" src="../../images/person.jpg" alt="person" />
                  <img className="movie-header-starring__image" src="../../images/person.jpg" alt="person" />
                  <img className="movie-header-starring__image" src="../../images/person.jpg" alt="person" /> */}
              </div>
          </div>
      </div>
  </header>
  )
}
