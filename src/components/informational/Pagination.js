import React from 'react';
import svgAsset from "../../images/sprite.svg";

function Pagination() {
  return (
    <div className="pagination">
      <svg className="pagination__arrow pagination__arrowLeft">
          <use xlinkHref={`${svgAsset}#icon-chevron-left`}></use>
      </svg>

      <div className="pagination__pill active">1</div>
      <div className="pagination__pill">2</div>
      <div className="pagination__pill">3</div>
      <div className="pagination__pill">4</div>
      <div className="pagination__pill">5</div>
      <div className="pagination__pill">6</div>
      <div className="pagination__pill">7</div>

      <svg className="pagination__arrow pagination__arrowRight">
          <use xlinkHref={`${svgAsset}#icon-chevron-right`}></use>
      </svg>
    </div>
  )
}

export default Pagination;
