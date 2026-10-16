import { describe, it, expect } from 'vitest';
import { formatDate, releaseDateOf, NO_DATE } from './formatDate';

describe('formatDate', () => {
  it('formats like moment "DD MMM YYYY"', () => {
    expect(formatDate('2024-10-02')).toBe('02 Oct 2024');
    expect(formatDate('1984-06-21')).toBe('21 Jun 1984');
  });

  it('prints Sep, not the Intl "Sept"', () => {
    expect(formatDate('2023-09-05')).toBe('05 Sep 2023');
  });

  it('covers all twelve months', () => {
    const names = Array.from({ length: 12 }, (_, i) => formatDate(`2020-${String(i + 1).padStart(2, '0')}-15`).slice(3, 6));
    expect(names).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });

  it('accepts a leap day only in a leap year', () => {
    expect(formatDate('2024-02-29')).toBe('29 Feb 2024');
    expect(formatDate('2023-02-29')).toBe(NO_DATE);
  });

  it.each([undefined, null, '', 'not a date', '2024-13-01', '2024-00-10', '2024-04-31'])(
    'shows an em dash for %s (D5)',
    (value) => {
      expect(formatDate(value)).toBe('\u2014');
    },
  );
});

describe('releaseDateOf (B12)', () => {
  it('uses first_air_date for series, which have no release_date', () => {
    expect(releaseDateOf({ first_air_date: '2024-10-02' })).toBe('02 Oct 2024');
  });

  it('prefers release_date and skips an empty one', () => {
    expect(releaseDateOf({ release_date: '2021-03-04', first_air_date: '2024-10-02' })).toBe('04 Mar 2021');
    expect(releaseDateOf({ release_date: '', first_air_date: '2024-10-02' })).toBe('02 Oct 2024');
  });

  it('is an em dash when neither is set', () => {
    expect(releaseDateOf({})).toBe(NO_DATE);
  });
});
