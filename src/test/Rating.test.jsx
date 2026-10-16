import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rating from '../components/rating/Rating';

// Pins today's behaviour (including the rating === 5 quirk) so later phases change it on purpose.
describe('Rating', () => {
  it('shows one decimal place', () => {
    render(<Rating rating={7.46} />);
    expect(screen.getByText('7.5')).toBeInTheDocument();
  });

  it.each([
    [3.2, 'ratingholder ratingholder--red'],
    [6.1, 'ratingholder ratingholder--orange'],
    [8.4, 'ratingholder'],
  ])('rating %s uses the class "%s"', (rating, className) => {
    const { container } = render(<Rating rating={rating} />);
    expect(container.firstChild).toHaveAttribute('class', className);
  });
});