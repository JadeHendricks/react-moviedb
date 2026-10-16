import { test, expect, gotoHome, waitForLoaderGone } from './support';
import type { Page } from '@playwright/test';

// Proves the infinite fetch loops B1 (detail page) and B2 (home hero) are gone: after a page has loaded,
// the number of TMDB requests is small and does not keep growing while the page sits open.
// (Before Phase 3 the home page sent 2 requests per cycle and a detail page 6, forever.)
const SETTLE_MS = 4_000;

const trackTmdbRequests = (page: Page) => {
  const paths: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.hostname === 'api.themoviedb.org') paths.push(url.pathname.replace(/^\/3\//, ''));
  });
  return paths;
};

// Waits well past the old loop interval, then checks nothing more was requested.
const expectStableCount = async (page: Page, paths: string[], budget: number, label: string) => {
  await page.waitForTimeout(SETTLE_MS);
  const afterLoad = paths.length;
  await page.waitForTimeout(SETTLE_MS);
  const afterWait = paths.length;
  test.info().annotations.push({ type: 'tmdb-requests', description: `${label}: ${afterWait} (${paths.join(', ')})` });
  console.log(`TMDB requests, ${label}: ${afterWait} -> ${paths.join(', ')}`);
  expect(afterWait, `${label} must not keep requesting`).toBe(afterLoad);
  expect(afterWait, `${label} request budget`).toBeGreaterThan(0);
  expect(afterWait, `${label} request budget`).toBeLessThanOrEqual(budget);
};

test.describe('TMDB request count per page', () => {
  test('home (movies): list + hero + genres only', async ({ page }) => {
    const paths = trackTmdbRequests(page);
    await gotoHome(page);
    await expectStableCount(page, paths, 3, 'home movies');
  });

  test('home (series) after switching tab', async ({ page }) => {
    const paths = trackTmdbRequests(page);
    await gotoHome(page);
    await page.locator('.switchTabs__tab[data-content="series"]').click();
    await expect(page.locator('.movieCard').first()).toBeVisible();
    // 6: the series hero now loads the series genre list too (B14), which it used to skip.
    await expectStableCount(page, paths, 6, 'home series (after movies)');
  });

  test('a category click sends exactly one list request (B5)', async ({ page }) => {
    await gotoHome(page);
    await page.waitForTimeout(1_000);
    const paths = trackTmdbRequests(page);
    await page.locator('.navigation__node', { hasText: 'Top Rated' }).click();
    await expect(page.locator('.movieSection__title')).toHaveText('Top rated');
    await page.waitForTimeout(SETTLE_MS);
    expect(paths).toEqual(['movie/top_rated']);
  });

  test('movie detail', async ({ page }) => {
    const paths = trackTmdbRequests(page);
    await page.goto('/movieSummary/101');
    await waitForLoaderGone(page);
    await expectStableCount(page, paths, 5, 'movie detail');
  });

  test('actor page', async ({ page }) => {
    const paths = trackTmdbRequests(page);
    await page.goto('/actorSummary/501');
    await waitForLoaderGone(page);
    await expectStableCount(page, paths, 2, 'actor');
  });

  test('search results', async ({ page }) => {
    const paths = trackTmdbRequests(page);
    await page.goto('/searchResults/matrix');
    await waitForLoaderGone(page);
    await expectStableCount(page, paths, 2, 'search');
  });
});
