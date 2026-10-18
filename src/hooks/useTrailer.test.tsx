import React, { type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useTrailer } from './useTrailer';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const yt = (key: string, type = 'Trailer') => ({ id: key, key, site: 'YouTube', type });

describe('useTrailer (B10)', () => {
  const fetchMock = vi.fn<typeof fetch>();
  let open: ReturnType<typeof vi.spyOn>;
  let queryClient: QueryClient;
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
    vi.stubGlobal('fetch', fetchMock);
    open = vi.spyOn(window, 'open').mockReturnValue(null);
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  });

  afterEach(() => {
    fetchMock.mockReset();
    open.mockRestore();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('opens the trailer in a new tab with noopener', async () => {
    fetchMock.mockResolvedValue(json({ results: [yt('teaser', 'Teaser'), yt('real')] }));
    const { result } = renderHook(() => useTrailer('movie', 1), { wrapper });

    result.current.onClick();

    await waitFor(() => expect(open).toHaveBeenCalledTimes(1));
    expect(open).toHaveBeenCalledWith('https://www.youtube.com/watch?v=real', '_blank', 'noopener,noreferrer');
  });

  it('does not crash and opens nothing when a title has no videos', async () => {
    fetchMock.mockResolvedValue(json({ results: [] }));
    const { result } = renderHook(() => useTrailer('movie', 2), { wrapper });

    result.current.onClick();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(open).not.toHaveBeenCalled();
  });

  it('opens synchronously inside the click once the pointer has prefetched the videos', async () => {
    fetchMock.mockResolvedValue(json({ results: [yt('abc')] }));
    const { result } = renderHook(() => useTrailer('tv', 3), { wrapper });

    result.current.onPointerEnter();
    await waitFor(() => expect(queryClient.getQueryData(['tmdb', 'videos', 'tv', 3])).toBeDefined());

    result.current.onClick();
    // No await: a popup blocker only allows window.open in the same task as the click.
    expect(open).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('swallows a failed videos request instead of an unhandled rejection', async () => {
    fetchMock.mockResolvedValue(json({}, 500));
    const { result } = renderHook(() => useTrailer('movie', 4), { wrapper });

    result.current.onClick();

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(open).not.toHaveBeenCalled();
  });

  it('does nothing without an id', () => {
    const { result } = renderHook(() => useTrailer('movie', undefined), { wrapper });

    result.current.onPointerEnter();
    result.current.onClick();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(open).not.toHaveBeenCalled();
  });
});