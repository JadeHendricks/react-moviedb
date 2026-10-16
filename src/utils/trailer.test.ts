import { describe, it, expect } from 'vitest';
import { pickTrailerKey, youtubeWatchUrl } from './trailer';

const video = (key: string, extra: Record<string, string> = {}) => ({ id: key, key, site: 'YouTube', type: 'Trailer', ...extra });

describe('pickTrailerKey (B10)', () => {
  it('is undefined when there are no videos, so nothing crashes on results[0]', () => {
    expect(pickTrailerKey([])).toBeUndefined();
    expect(pickTrailerKey(undefined)).toBeUndefined();
  });

  it('prefers a Trailer over an earlier Teaser', () => {
    expect(pickTrailerKey([video('teaser', { type: 'Teaser' }), video('trailer')])).toBe('trailer');
  });

  it('falls back to the first YouTube video when none is a Trailer', () => {
    expect(pickTrailerKey([video('clip', { type: 'Clip' }), video('teaser', { type: 'Teaser' })])).toBe('clip');
  });

  it('ignores videos that are not on YouTube', () => {
    expect(pickTrailerKey([video('v', { site: 'Vimeo' })])).toBeUndefined();
    expect(pickTrailerKey([video('v', { site: 'Vimeo' }), video('y')])).toBe('y');
  });
});

describe('youtubeWatchUrl', () => {
  it('builds a watch link and encodes the key', () => {
    expect(youtubeWatchUrl('abc')).toBe('https://www.youtube.com/watch?v=abc');
    expect(youtubeWatchUrl('a&b')).toBe('https://www.youtube.com/watch?v=a%26b');
  });
});