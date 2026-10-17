import React, { lazy, Suspense } from 'react';
import { Outlet, type RouteObject } from 'react-router';
import SideNavigation from './components/layout/SideNavigation';
import TopNavigation from './components/layout/TopNavigation';
import Loader from './components/layout/Loader';
import RouteError from './components/layout/RouteError';

// One chunk per page, so the first load only ships the shell and the page being opened.
const MainContent = lazy(() => import('./components/layout/MainContent'));
const MovieSummary = lazy(() => import('./components/informational/MovieSummary'));
const ActorSummary = lazy(() => import('./components/informational/ActorSummary'));
const SearchResults = lazy(() => import('./components/informational/SearchResults'));
const AccountSettings = lazy(() => import('./components/informational/AccountSettings'));

function Layout() {
  return (
    <>
      <SideNavigation />
      <div className="app__main">
        <TopNavigation />
        {/* While a page chunk loads the same full-screen loader the pages use is shown. */}
        {/* The one main landmark of every page. It adds no box styles of its own. */}
        <main>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        // A pathless route: an error in any page is caught here, so the side and top navigation stay usable.
        errorElement: <RouteError />,
        children: [
          { path: '/', element: <MainContent /> },
          { path: '/accountSettings', element: <AccountSettings /> },
          { path: '/searchResults/:id', element: <SearchResults /> },
          // Movies keep their old URL so existing links work; series have their own (D1).
          { path: '/movieSummary/:id', element: <MovieSummary type="movie" /> },
          { path: '/seriesSummary/:id', element: <MovieSummary type="tv" /> },
          { path: '/actorSummary/:id', element: <ActorSummary /> },
          // Unknown URLs keep showing the navigation with an empty page, as before.
          { path: '*', element: null },
        ],
      },
    ],
  },
];
