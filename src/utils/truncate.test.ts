import { describe, it, expect } from 'vitest';
import { truncate } from './truncate';

describe('truncate', () => {
  it('leaves short text alone, including text of exactly max length', () => {
    expect(truncate('abc', 3)).toBe('abc');
  });

  it('cuts longer text and appends three dots', () => {
    expect(truncate('abcdef', 3)).toBe('abc...');
  });

  it('does not crash on a missing overview (B23)', () => {
    expect(truncate(undefined, 150)).toBe('');
    expect(truncate(null, 150)).toBe('');
  });
});
