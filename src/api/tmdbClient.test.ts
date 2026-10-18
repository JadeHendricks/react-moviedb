import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, tmdbGet, tmdbImage } from './tmdbClient';

const okResponse = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });

describe('tmdbGet', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubEnv('REACT_APP_API_KEY', 'test-key');
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const requestedUrl = () => new URL(String(fetchMock.mock.calls[0]?.[0]));

  it('adds api_key and language in one place and parses the body', async () => {
    fetchMock.mockResolvedValue(okResponse({ results: [1] }));

    const data = await tmdbGet<{ results: number[] }>('movie/popular', { page: 1 });

    expect(data).toEqual({ results: [1] });
    const url = requestedUrl();
    expect(url.origin + url.pathname).toBe('https://api.themoviedb.org/3/movie/popular');
    expect(url.searchParams.get('api_key')).toBe('test-key');
    expect(url.searchParams.get('language')).toBe('en-US');
    expect(url.searchParams.get('page')).toBe('1');
  });

  it('encodes query text so reserved characters survive (B6)', async () => {
    fetchMock.mockResolvedValue(okResponse({ results: [] }));
    const query = 'tom & jerry #1 / 100%';

    await tmdbGet('search/movie', { query });

    const url = requestedUrl();
    // Round-trips exactly, and nothing leaked into other params or the hash.
    expect(url.searchParams.get('query')).toBe(query);
    expect(url.hash).toBe('');
    expect(url.searchParams.get('1 / 100%')).toBeNull();
    expect(url.search).toContain('query=tom+%26+jerry+%231+%2F+100%25');
  });

  it('skips undefined params and forwards the abort signal', async () => {
    fetchMock.mockResolvedValue(okResponse({}));
    const controller = new AbortController();

    await tmdbGet('person/1', { page: undefined }, controller.signal);

    expect(requestedUrl().searchParams.has('page')).toBe(false);
    expect(fetchMock.mock.calls[0]?.[1]?.signal).toBe(controller.signal);
  });

  it('throws ApiError with the status on a non-ok response, without leaking the key (B11)', async () => {
    fetchMock.mockResolvedValue(new Response('{}', { status: 404 }));

    const error = await tmdbGet('movie/1').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(404);
    expect((error as ApiError).message).not.toContain('test-key');
  });
});

describe('tmdbImage', () => {
  it('builds the image url for a size', () => {
    expect(tmdbImage('/abc.jpg', 'w500')).toBe('https://image.tmdb.org/t/p/w500/abc.jpg');
    expect(tmdbImage('/abc.jpg', 'original')).toBe('https://image.tmdb.org/t/p/original/abc.jpg');
  });
});
