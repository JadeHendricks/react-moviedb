import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rating from '../components/rating/Rating';

describe('Rating', () => {
  it('shows one decimal place', () => {
    render(<Rating rating={7.46} />);
    expect(screen.getByText('7.5')).toBeInTheDocument();
  });

  it.each([
    [0, 'rating rating--red'],
    [3.2, 'rating rating--red'],
    [4.9, 'rating rating--red'],
    [5, 'rating rating--orange'], // B18: exactly 5 used to render green
    [6.1, 'rating rating--orange'],
    [6.9, 'rating rating--orange'],
    [7, 'rating'],
    [8.4, 'rating'],
  ])('rating %s uses the class "%s"', (rating, className) => {
    const { container } = render(<Rating rating={rating} />);
    expect(container.firstChild).toHaveAttribute('class', className);
  });

  it('shows 0.0 for a rating of 0 instead of a bare 0 (B18)', () => {
    render(<Rating rating={0} />);
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('shows nothing and keeps the default class for a missing rating', () => {
    const { container } = render(<Rating rating={undefined} />);
    expect(container.firstChild).toHaveAttribute('class', 'rating');
    expect(container.querySelector('.rating__number')).toBeEmptyDOMElement();
  });
});