import { describe, it, expect } from 'vitest';
import { detailPath, mediaTypeOf } from './routes';

describe('detailPath (D1, B9)', () => {
  it('keeps /movieSummary for movies so old links work', () => {
    expect(detailPath('movie', 101)).toBe('/movieSummary/101');
  });

  it('uses /seriesSummary for series', () => {
    expect(detailPath('tv', 200)).toBe('/seriesSummary/200');
  });
});

describe('mediaTypeOf', () => {
  it('reads the tag on the row and defaults to movie', () => {
    expect(mediaTypeOf({ media_type: 'tv' })).toBe('tv');
    expect(mediaTypeOf({ media_type: 'movie' })).toBe('movie');
    expect(mediaTypeOf({})).toBe('movie');
    expect(mediaTypeOf({ media_type: 'person' })).toBe('movie');
  });
});