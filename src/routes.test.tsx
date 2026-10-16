import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import { mockTmdb, renderApp } from './test/render';
import { emptyDetailRoutes, item, page } from './test/tmdbData';

const paths = (calls: string[]) => calls.map((url) => new URL(url).pathname);

describe('routes', () => {
  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('/movieSummary/:id still opens a movie (old links keep working, D1)', async () => {
    const { calls, fetchMock } = mockTmdb({
      ...emptyDetailRoutes,
      '/movie/101': item(101, { title: 'Old Link Movie', genres: [{ id: 1, name: 'Drama' }] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/movieSummary/101');

    expect(await screen.findByText('Movie Details')).toBeInTheDocument();
    expect(await screen.findByText('Old Link Movie', { exact: false })).toBeInTheDocument();
    expect(paths(calls)).toContain('/3/movie/101');
    expect(paths(calls).some((p) => p.startsWith('/3/tv/'))).toBe(false);
  });

  it('/seriesSummary/:id opens a series even though the Movies tab is selected (D1, B9)', async () => {
    const { calls, fetchMock } = mockTmdb({
      ...emptyDetailRoutes,
      '/tv/200': { id: 200, name: 'Series Link Show', first_air_date: '2024-10-02', episode_run_time: [45], genres: [], vote_average: 7 },
    });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/seriesSummary/200');

    expect(await screen.findByText('Series Details')).toBeInTheDocument();
    expect(await screen.findByText('Series Link Show', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Number of seasons')).toBeInTheDocument();
    expect(paths(calls)).toContain('/3/tv/200');
    expect(paths(calls).some((p) => p.startsWith('/3/movie/'))).toBe(false);
  });

  it('a series search result links to /seriesSummary and a movie to /movieSummary, in Movies mode (B9)', async () => {
    const { fetchMock } = mockTmdb({
      'search/movie': page(item(7, { title: 'Same Id Movie', popularity: 5 })),
      'search/tv': page(item(7, { title: undefined, name: 'Same Id Show', popularity: 9 })),
    });
    vi.stubGlobal('fetch', fetchMock);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    renderApp('/searchResults/same');

    const show = (await screen.findByText('Same Id Show')).closest('.search-card') as HTMLElement;
    const movie = screen.getByText('Same Id Movie').closest('.search-card') as HTMLElement;
    expect(within(show).getAllByRole('link')[0]).toHaveAttribute('href', '/seriesSummary/7');
    expect(within(movie).getAllByRole('link')[0]).toHaveAttribute('href', '/movieSummary/7');
    // A movie and a series with the same id are two rows with two keys, so React has nothing to warn about (B8).
    expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(/same key/);
  });

  it('an actor credit always opens a movie, whichever tab is selected (B9)', async () => {
    const { fetchMock } = mockTmdb({
      '/movie_credits': { cast: [item(33, { title: 'Credit Movie' })] },
      '/person/5': { id: 5, name: 'Some Actor', gender: 1, birthday: null },
    });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/actorSummary/5');

    const card = (await screen.findByText('Credit Movie')).closest('.movieCard') as HTMLElement;
    expect(within(card).getByRole('link', { name: 'View More' })).toHaveAttribute('href', '/movieSummary/33');
  });

  it('shows the router error boundary instead of a white screen when a page throws', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { fetchMock } = mockTmdb({
      ...emptyDetailRoutes,
      '/credits': { cast: 5 },
      '/movie/9': item(9),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/movieSummary/9');

    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
    // The navigation around the page survives the error.
    expect(screen.getByText('MDBv2')).toBeInTheDocument();
  });

  it('an unknown URL keeps the navigation and an empty page', async () => {
    const { fetchMock } = mockTmdb({});
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/nothing/here');

    expect(await screen.findByText('MDBv2')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});