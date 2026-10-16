import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import MovieCardItem from './MovieCardItem';
import SearchCardItem from './SearchCardItem';
import type { MediaListItem } from '../../types/tmdb';
import { renderWithProviders } from '../../test/render';

const base: MediaListItem = {
  id: 1,
  backdrop_path: null,
  poster_path: null,
  overview: '',
  vote_average: 7,
  popularity: 1,
};

describe('MovieCardItem dates (B12, D5)', () => {
  it('shows a series first_air_date instead of "Invalid date"', () => {
    renderWithProviders(<MovieCardItem movie={{ ...base, name: 'The Night Shift', first_air_date: '2024-10-02' }} />);
    expect(screen.getByText('Release date: 02 Oct 2024')).toBeInTheDocument();
    expect(screen.queryByText(/Invalid date/)).not.toBeInTheDocument();
  });

  it('shows an em dash when the title has no date at all', () => {
    renderWithProviders(<MovieCardItem movie={{ ...base, title: 'Undated', release_date: '' }} />);
    expect(screen.getByText('Release date: \u2014')).toBeInTheDocument();
  });
});

describe('card images and text for series (B23)', () => {
  const series: MediaListItem = { ...base, name: 'The Night Shift', poster_path: '/p.jpg', backdrop_path: '/b.jpg' };

  it('MovieCardItem alt falls back to the series name', () => {
    renderWithProviders(<MovieCardItem movie={series} />);
    expect(screen.getByAltText('The Night Shift')).toHaveClass('movieCard__imagesrc');
  });

  it('SearchCardItem alt falls back to the name and uses its own image class', () => {
    renderWithProviders(<SearchCardItem movie={series} />);
    const img = screen.getByAltText('The Night Shift');
    expect(img).toHaveClass('cardSearch__image');
    expect(img).not.toHaveClass('cast-card__image');
  });

  it('SearchCardItem does not crash without an overview', () => {
    const noOverview = { ...series, overview: undefined } as unknown as MediaListItem;
    renderWithProviders(<SearchCardItem movie={noOverview} />);
    expect(screen.getByText('The Night Shift')).toBeInTheDocument();
  });
});