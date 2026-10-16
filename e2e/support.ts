import { test as base, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// package.json is "type": "module", so __dirname does not exist.
const fixturesDir = fileURLToPath(new URL('./fixtures/', import.meta.url));

export const DUMMY_API_KEY = 'e2e-dummy-key';
// Fixed "now" so moment(undefined) (TV cards have no release_date) renders the same date every run.
const FIXED_NOW = new Date('2026-01-15T12:00:00Z');

export const fixture = (name: string) =>
  JSON.parse(readFileSync(join(fixturesDir, `${name}.json`), 'utf8'));

// Maps a TMDB v3 path to a fixture file. Detail/review/credit/video/similar fixtures are shared
// across ids on purpose: the screenshots only need one fixed payload per endpoint.
const fixtureForPath = (pathname: string): string | null => {
  const p = pathname.replace(/^\/3\//, '');
  let m: RegExpMatchArray | null;
  if ((m = p.match(/^genre\/(movie|tv)\/list$/))) return `genre-${m[1]}`;
  if ((m = p.match(/^search\/(movie|tv)$/))) return `search-${m[1]}`;
  if ((m = p.match(/^person\/\d+\/movie_credits$/))) return 'person-movie_credits';
  if (/^person\/\d+$/.test(p)) return 'person';
  if ((m = p.match(/^(movie|tv)\/(now_playing|on_the_air|top_rated|popular|upcoming)$/))) return `${m[1]}-${m[2]}`;
  if ((m = p.match(/^(movie|tv)\/\d+\/(reviews|credits|videos|similar)$/))) return `${m[1]}-${m[2]}`;
  if ((m = p.match(/^(movie|tv)\/\d+$/))) return `${m[1]}-detail`;
  return null;
};

// Deterministic flat-colour placeholder per image path, so cards are distinguishable but stable.
const placeholderSvg = (path: string) => {
  let hash = 0;
  for (const ch of path) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="281"><rect width="500" height="281" fill="hsl(${hash % 360} 35% 55%)"/></svg>`;
};

export const test = base.extend<{ app: { unhandled: string[] } }>({
  app: [
    async ({ page }, use) => {
      const unhandled: string[] = [];

      // Lowest priority (registered first): nothing but the local dev server may be reached.
      await page.route(
        (url) => !['localhost', '127.0.0.1'].includes(url.hostname),
        (route) => {
          unhandled.push(`blocked ${route.request().url()}`);
          return route.abort();
        },
      );
      await page.route('https://image.tmdb.org/**', (route) =>
        route.fulfill({
          contentType: 'image/svg+xml',
          body: placeholderSvg(new URL(route.request().url()).pathname),
        }),
      );
      // index.css hot-links a banner image (account settings header) from a third-party CDN.
      await page.route('https://*.netdna-ssl.com/**', (route) =>
        route.fulfill({
          contentType: 'image/svg+xml',
          body: placeholderSvg(new URL(route.request().url()).pathname),
        }),
      );
      await page.route('https://www.youtube.com/**', (route) =>
        route.fulfill({ contentType: 'text/html', body: '<!doctype html><body style="margin:0;background:#222"></body>' }),
      );
      await page.route('https://api.themoviedb.org/**', (route) => {
        const url = new URL(route.request().url());
        if (url.searchParams.get('api_key') !== DUMMY_API_KEY) {
          unhandled.push(`unexpected api_key on ${url.pathname}`);
        }
        const name = fixtureForPath(url.pathname);
        if (!name) {
          unhandled.push(`no fixture for ${url.pathname}`);
          return route.fulfill({ status: 404, json: { status_message: 'not found' } });
        }
        return route.fulfill({ json: fixture(name) });
      });

      await page.clock.setFixedTime(FIXED_NOW);
      await use({ unhandled });
      expect(unhandled, 'every outbound request should be mocked').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

// The old app shows a fixed 3-4 s loader overlay. Wait for it to leave instead of faking timers,
// because the app's fetch loops (B1/B2) keep the network busy so `networkidle` never settles.
export const waitForLoaderGone = (page: Page) =>
  expect(page.locator('.loader')).toHaveCount(0, { timeout: 15_000 });

// Make sure <img> elements and inline CSS background images (hero/detail header) have loaded.
export const settleImages = (page: Page) =>
  page.evaluate(async () => {
    const urls = new Set<string>();
    document.querySelectorAll<HTMLElement>('[style*="background-image"]').forEach((el) => {
      const m = el.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (m && m[1]) urls.add(m[1]);
    });
    await Promise.all([
      ...Array.from(document.images).map((img) => img.decode().catch(() => undefined)),
      ...Array.from(urls).map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ]);
  });

export const snap = async (page: Page, name: string, options: { fullPage?: boolean } = {}) => {
  await settleImages(page);
  // Park the pointer so hover styles (e.g. .side-nav__item:hover) never leak into a baseline.
  await page.mouse.move(0, 0);
  await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: options.fullPage ?? true });
};

export const gotoHome = async (page: Page) => {
  await page.goto('/');
  await waitForLoaderGone(page);
  await expect(page.locator('.movie-header__title')).not.toHaveText('');
  await expect(page.locator('.movie-card').first()).toBeVisible();
};
