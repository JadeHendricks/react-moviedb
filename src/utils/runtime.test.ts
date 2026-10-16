import { describe, it, expect } from 'vitest';
import { runtimeLabel } from './runtime';

describe('runtimeLabel (B13)', () => {
  it('uses the movie runtime', () => {
    expect(runtimeLabel({ runtime: 118 })).toBe('118mins');
  });

  it('uses only the first episode runtime of a series', () => {
    expect(runtimeLabel({ episode_run_time: [45, 60] })).toBe('45mins');
  });

  it.each([{}, { runtime: null }, { runtime: 0 }, { episode_run_time: [] }])('is an em dash for %j', (details) => {
    expect(runtimeLabel(details)).toBe('\u2014');
  });
});