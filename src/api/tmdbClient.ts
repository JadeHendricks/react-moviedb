const API_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type TmdbParams = Record<string, string | number | boolean | undefined>;

/** Thrown for any non-2xx TMDB answer, so callers (and Query) see a real error instead of `undefined` data (B11). */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * GET a TMDB v3 endpoint and parse the JSON body.
 * `api_key` and `language` are added here and nowhere else; `params` go through URLSearchParams
 * so a search like `a&b#c/d%` is encoded instead of breaking the URL (B6).
 */
export async function tmdbGet<T>(path: string, params: TmdbParams = {}, signal?: AbortSignal): Promise<T> {
  const url = new URL(`${API_BASE}/${path.replace(/^\//, '')}`);
  url.searchParams.set('api_key', import.meta.env.REACT_APP_API_KEY ?? '');
  url.searchParams.set('language', 'en-US');
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new ApiError(response.status, `TMDB request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

/** TMDB width-based image sizes ("w500") plus the untouched original. */
export type ImageSize = `w${number}` | 'original';

export const tmdbImage = (path: string, size: ImageSize = 'w500'): string => `${IMAGE_BASE}/${size}${path}`;
