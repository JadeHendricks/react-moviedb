import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MediaImage from './MediaImage';

describe('MediaImage', () => {
  it('builds the TMDB url for the requested size', () => {
    render(<MediaImage path="/abc.jpg" size="original" className="x" alt="Dune" />);
    const img = screen.getByAltText('Dune');
    expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/original/abc.jpg');
    expect(img).toHaveClass('x');
  });

  it('defaults to w500', () => {
    render(<MediaImage path="/abc.jpg" alt="Dune" />);
    expect(screen.getByAltText('Dune')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/abc.jpg');
  });

  it.each([null, undefined, ''])('falls back to the bundled image for path %j', (path) => {
    render(<MediaImage path={path} alt="Dune" />);
    expect(screen.getByAltText('Dune').getAttribute('src')).not.toContain('image.tmdb.org');
  });

  it('uses an empty alt when the title is missing (B23)', () => {
    const { container } = render(<MediaImage path={null} alt={undefined} />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});