import React from 'react';
import Rating from "../rating/Rating"

export default function SearchCardItem() {
  return (
    <div class="card cardSearch">
      <div class="cardSearch__imageholder">
        <img class="cardSearch__image" src="./assets/06_movie-profile-A_10.jpg" alt="" />
      </div>
      <div class="cardSearch__info">
        <Rating />
        <h5 class="cardSearch__title">Shrek Two</h5>
        <p class="cardSearch__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim ipsam laborum, 
        </p>
      </div>
    </div>
  )
}
