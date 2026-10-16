import React from 'react';
import '../../styles/atoms/button.scss';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import '../../styles/layout/container.scss';

/** Router error boundary: a page that throws, or a chunk that fails to load, ends up here instead of a white screen. */
function RouteError() {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';
  return (
    <section className="searchResults" role="alert">
      <div className="container">
        <h2 className="searchResults__title">Something went wrong</h2>
        <p>{detail}</p>
        <Link to="/" className="button button--green">Back to home</Link>
      </div>
    </section>
  );
}

export default RouteError;