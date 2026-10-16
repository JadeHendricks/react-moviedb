import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopNavigation from './TopNavigation';
import { mockTmdb, renderApp, renderWithProviders } from '../../test/render';
import { item, page } from '../../test/tmdbData';

describe('top navigation', () => {
  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('fixes the clas typo and points the avatar at the bundled image (B21, D3)', () => {
    const { container } = renderWithProviders(<TopNavigation />);

    expect(container.querySelector('.top-nav__auth')).not.toBeNull();
    expect(container.querySelector('[clas]')).toBeNull();
    const avatar = screen.getByAltText('person');
    expect(avatar.getAttribute('src')).not.toContain('./assets/');
    expect(avatar.getAttribute('src')).toContain('x_03');
  });

  it('keeps & # / % in a search intact from the box to the TMDB request (B6)', async () => {
    const { calls, fetchMock } = mockTmdb({
      'search/movie': page(item(1, { title: 'Special' })),
      'search/tv': page(),
    });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    renderApp('/');

    await user.type(screen.getByPlaceholderText('Search for Movies or TV Series'), 'A&B#c/d%{Enter}');

    expect(await screen.findByText('Special')).toBeInTheDocument();
    expect(document.querySelector('.searchResults__title span')).toHaveTextContent('a&b#c/d%');
    const searched = calls.filter((url) => url.includes('/search/movie'));
    expect(new URL(searched[0]!).searchParams.get('query')).toBe('a&b#c/d%');
  });

  it('searches the same term again after leaving the results (B20)', async () => {
    const { calls, fetchMock } = mockTmdb({
      'search/movie': page(item(1, { title: 'Matrix Movie' })),
      'search/tv': page(),
    });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    const { router } = renderApp('/');
    const box = () => screen.getByPlaceholderText('Search for Movies or TV Series');

    await user.type(box(), 'matrix{Enter}');
    expect(await screen.findByText('Matrix Movie')).toBeInTheDocument();

    await user.click(screen.getByText('MDBv2'));
    await waitFor(() => expect(router.state.location.pathname).toBe('/'));
    expect(screen.queryByText('Matrix Movie')).not.toBeInTheDocument();

    await user.type(box(), 'matrix{Enter}');
    expect(await screen.findByText('Matrix Movie')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/searchResults/matrix');
    expect(calls.length).toBeGreaterThan(0);
  });

  it('still asks for a term when the box is empty and does not navigate (B20)', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    const { fetchMock } = mockTmdb({});
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    const { router } = renderApp('/');

    await user.type(screen.getByPlaceholderText('Search for Movies or TV Series'), '{Enter}');

    expect(alertMock).toHaveBeenCalledWith('Please insert a search term');
    expect(router.state.location.pathname).toBe('/');
  });
});