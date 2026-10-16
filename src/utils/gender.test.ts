import { describe, it, expect } from 'vitest';
import { genderLabel } from './gender';

describe('genderLabel (B16)', () => {
  it.each([
    [1, 'Female'],
    [2, 'Male'],
    [3, 'Non-binary'],
    [0, 'Not specified'],
    [undefined, 'Not specified'],
    [null, 'Not specified'],
  ])('maps %s to %s', (code, label) => {
    expect(genderLabel(code)).toBe(label);
  });
});