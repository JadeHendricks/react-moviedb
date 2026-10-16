import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { MIN_LOADER_MS, useLoadingOverlay } from './useLoadingOverlay';

describe('useLoadingOverlay (B4, D2)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

  it('stays up for the minimum time even when the data is already there', () => {
    const { result } = renderHook(() => useLoadingOverlay(false, 'home'));
    expect(result.current).toBe(true);

    advance(MIN_LOADER_MS - 1);
    expect(result.current).toBe(true);

    advance(1);
    expect(result.current).toBe(false);
  });

  it('is about 400ms by default', () => {
    expect(MIN_LOADER_MS).toBe(400);
  });

  it('stays up past the minimum while queries are pending, and leaves when they finish', () => {
    const { result, rerender } = renderHook(({ pending }) => useLoadingOverlay(pending, 'home'), {
      initialProps: { pending: true },
    });

    advance(5_000);
    expect(result.current).toBe(true);

    rerender({ pending: false });
    expect(result.current).toBe(false);
  });

  it('comes back when the page changes to another title, which used to stay hidden', () => {
    const { result, rerender } = renderHook(({ id }) => useLoadingOverlay(false, id), {
      initialProps: { id: 'movie-1' },
    });
    advance(MIN_LOADER_MS);
    expect(result.current).toBe(false);

    rerender({ id: 'movie-2' });
    expect(result.current).toBe(true);

    advance(MIN_LOADER_MS);
    expect(result.current).toBe(false);
  });

  it('clears its timer on unmount and on a key change, so no timer outlives the page', () => {
    const { rerender, unmount } = renderHook(({ id }) => useLoadingOverlay(false, id), {
      initialProps: { id: 'a' },
    });
    expect(vi.getTimerCount()).toBe(1);

    rerender({ id: 'b' });
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});