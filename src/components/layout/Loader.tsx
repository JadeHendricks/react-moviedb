import React, {} from 'react';
import '../../styles/atoms/loader.scss';

function Loader() {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <div className="loader__ring loader__ring--one"></div>
        <div className="loader__ring loader__ring--two"></div>
        <div className="loader__ring loader__ring--three"></div>
      </div>
    </div>
  )
}

export default Loader;
