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

  it('builds a srcset and sizes from the requested widths', () => {
    render(<MediaImage path="/abc.jpg" widths={[300, 780]} sizes="50vw" alt="Dune" />);
    const img = screen.getByAltText('Dune');
    expect(img).toHaveAttribute(
      'srcset',
      'https://image.tmdb.org/t/p/w300/abc.jpg 300w, https://image.tmdb.org/t/p/w780/abc.jpg 780w',
    );
    expect(img).toHaveAttribute('sizes', '50vw');
  });

  it('has no srcset without widths, or for the bundled fallback', () => {
    render(
      <>
        <MediaImage path="/abc.jpg" alt="plain" />
        <MediaImage path={null} widths={[300]} sizes="50vw" alt="fallback" />
      </>,
    );
    for (const alt of ['plain', 'fallback']) {
      expect(screen.getByAltText(alt)).not.toHaveAttribute('srcset');
      expect(screen.getByAltText(alt)).not.toHaveAttribute('sizes');
    }
  });

  it('loads lazily and decodes off the main thread', () => {
    render(<MediaImage path="/abc.jpg" alt="Dune" />);
    const img = screen.getByAltText('Dune');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
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