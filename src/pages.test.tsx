import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockTmdb, renderApp } from './test/render';
import { emptyDetailRoutes, item, page } from './test/tmdbData';

const movieDetail = (extra: Record<string, unknown> = {}) =>
  item(1, { title: 'Detail Movie', genres: [{ id: 18, name: 'Drama' }], runtime: 118, ...extra });

describe('detail page', () => {
  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('shows the genres the title carries without asking for the genre list (B15)', async () => {
    const { calls, fetchMock } = mockTmdb({ ...emptyDetailRoutes, '/movie/1': movieDetail() });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/movieSummary/1');

    expect(await screen.findByText('Drama')).toHaveClass('category__pill');
    expect(calls.some((url) => url.includes('/genre/'))).toBe(false);
  });

  it('shows the first episode runtime of a series, not "45,60mins" (B13)', async () => {
    const series = { id: 2, name: 'Show', first_air_date: '2024-10-02', episode_run_time: [45, 60], genres: [] };
    const { fetchMock } = mockTmdb({ ...emptyDetailRoutes, '/tv/2': series });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/seriesSummary/2');

    expect(await screen.findByText('45mins')).toBeInTheDocument();
    expect(screen.queryByText(/45,60/)).not.toBeInTheDocument();
    // The release date comes from first_air_date instead of "Invalid date" (B12).
    expect(screen.getAllByText(/02 Oct 2024/).length).toBeGreaterThan(0);
  });

  it('shows an em dash when there is no runtime or date (B13, D5)', async () => {
    const { fetchMock } = mockTmdb({
      ...emptyDetailRoutes,
      '/movie/1': movieDetail({ runtime: null, release_date: '' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/movieSummary/1');

    const runtime = (await screen.findByText('Runtime')).parentElement as HTMLElement;
    expect(within(runtime).getByText('\u2014')).toBeInTheDocument();
    expect(screen.queryByText(/Invalid date/)).not.toBeInTheDocument();
    expect(screen.queryByText('mins')).not.toBeInTheDocument();
  });

  it('keeps the loader up for about 400ms, not 4s, and brings it back for another title (B4, D2)', async () => {
    const { fetchMock } = mockTmdb({
      ...emptyDetailRoutes,
      '/movie/1': movieDetail(),
      '/movie/2': movieDetail({ id: 2, title: 'Second Movie' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const loader = () => document.querySelector('.loader-container');

    const start = performance.now();
    const { router } = renderApp('/movieSummary/1');
    expect(loader()).not.toBeNull();

    await waitFor(() => expect(loader()).toBeNull(), { timeout: 3_000 });
    const shownFor = performance.now() - start;
    expect(shownFor).toBeGreaterThanOrEqual(380);
    expect(shownFor).toBeLessThan(2_500);

    await act(async () => {
      await router.navigate('/movieSummary/2');
    });
    expect(loader()).not.toBeNull();
    await waitFor(() => expect(loader()).toBeNull(), { timeout: 3_000 });
    expect(await screen.findByText('Second Movie', { exact: false })).toBeInTheDocument();
  });
});

describe('home hero', () => {
  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('shows series genres and the first_air_date on the Series tab (B14, B12)', async () => {
    const { fetchMock } = mockTmdb({
      'genre/movie/list': { genres: [{ id: 28, name: 'Action' }] },
      'genre/tv/list': { genres: [{ id: 10765, name: 'Sci-Fi & Fantasy' }] },
      'tv/popular': page(item(5, { title: undefined, name: 'Hero Show', release_date: undefined, first_air_date: '2024-10-02', genre_ids: [10765], popularity: 99 })),
      'tv/on_the_air': page(item(6, { title: undefined, name: 'Airing Show', release_date: undefined, first_air_date: '2025-01-09' })),
      'movie/popular': page(item(3, { title: 'Hero Movie', genre_ids: [28], popularity: 99 })),
      'movie/now_playing': page(item(4, { title: 'Playing Movie' })),
    });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    renderApp('/');
    expect(await screen.findByText('Hero Movie')).toBeInTheDocument();
    expect(await screen.findByText('Action')).toBeInTheDocument();

    await user.click(screen.getByText('Series'));

    const heroTitle = await screen.findByText('Hero Show');
    const hero = heroTitle.closest('header') as HTMLElement;
    expect(await within(hero).findByText('Sci-Fi & Fantasy')).toBeInTheDocument();
    expect(within(hero).getByText('Release date: 02 Oct 2024')).toBeInTheDocument();
    // The series card link goes to the series route even though it was reached from the home page.
    const card = (await screen.findByText('Airing Show')).closest('.movieCard') as HTMLElement;
    expect(within(card).getByRole('link', { name: 'View More' })).toHaveAttribute('href', '/seriesSummary/6');
    expect(within(hero).getByRole('link', { name: 'View More' })).toHaveAttribute('href', '/seriesSummary/5');
  });
});