import { test, expect, fixture, gotoHome, snap, waitForLoaderGone } from './support';

const firstTitle = (name: string) => {
  const first = fixture(name).results[0];
  return first.title ?? first.name;
};
const mostPopularTitle = (name: string) => {
  const results = [...fixture(name).results].sort((a, b) => b.popularity - a.popularity);
  return results[0].title ?? results[0].name;
};

// Clicks a side-nav entry and waits until the heading and first card show that category.
const openCategory = async (page: import('@playwright/test').Page, label: string, heading: string, fixtureName: string) => {
  await page.locator('.navigation__node', { hasText: label }).click();
  await expect(page.locator('.movieSection__title')).toHaveText(heading);
  await expect(page.locator('.movieCard__title').first()).toHaveText(firstTitle(fixtureName));
};

test.describe('movies', () => {
  test('home, every side-nav category', async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator('.movie-header__title')).toHaveText(mostPopularTitle('movie-popular'));
    await expect(page.locator('.movieCard__title').first()).toHaveText(firstTitle('movie-now_playing'));
    await expect(page.locator('.movie-header .pill').first()).toBeVisible();
    await snap(page, 'movies-now-playing');

    await openCategory(page, 'Top Rated', 'Top rated', 'movie-top_rated');
    await snap(page, 'movies-top-rated');

    await openCategory(page, 'Popular', 'Popular', 'movie-popular');
    await snap(page, 'movies-popular');

    await openCategory(page, 'Upcoming', 'Upcoming', 'movie-upcoming');
    await snap(page, 'movies-upcoming');
  });
});

test.describe('series', () => {
  test('switch to series, every side-nav category', async ({ page }) => {
    await gotoHome(page);
    await page.locator('.switch-tabs__tab[data-content="series"]').click();
    await expect(page.locator('.movieCard__title').first()).toHaveText(firstTitle('tv-on_the_air'));
    await expect(page.locator('.movie-header__title')).toHaveText(mostPopularTitle('tv-popular'));
    await expect(page.locator('.navigation__node', { hasText: 'Upcoming' })).toHaveCount(0);
    await snap(page, 'series-on-the-air');

    await openCategory(page, 'Top Rated', 'Top rated', 'tv-top_rated');
    await snap(page, 'series-top-rated');

    await openCategory(page, 'Popular', 'Popular', 'tv-popular');
    await snap(page, 'series-popular');
  });
});

test.describe('details', () => {
  test('movie detail', async ({ page }) => {
    await page.goto('/movieSummary/101');
    await waitForLoaderGone(page);
    await expect(page.locator('.movieMain__title')).toContainText(fixture('movie-detail').title);
    await expect(page.locator('.movieDetailSummary .pill').first()).toBeVisible();
    await expect(page.locator('.review')).toHaveCount(2);
    await expect(page.locator('.cast-card')).toHaveCount(12);
    await expect(page.locator('.moreMovies .movieCard')).toHaveCount(6);
    await expect(page.locator('.movieDetailHeader__videos iframe')).toHaveCount(3);
    await snap(page, 'movie-detail');
  });

  test('series detail, reached from the series list', async ({ page }) => {
    await gotoHome(page);
    await page.locator('.switch-tabs__tab[data-content="series"]').click();
    await expect(page.locator('.movieCard__title').first()).toHaveText(firstTitle('tv-on_the_air'));
    // A series card links to its own route, so the page picks the tv endpoints from the URL (D1, B9).
    await page.locator('.movieCard').first().getByRole('link', { name: 'View More' }).click();
    await expect(page).toHaveURL(/\/seriesSummary\/200$/);
    await waitForLoaderGone(page);
    await expect(page.locator('.movieMain__title')).toContainText(fixture('tv-detail').name);
    await expect(page.locator('.movieDetails__title', { hasText: 'Series Details' })).toBeVisible();
    await expect(page.locator('.movieDetailSummary .pill').first()).toBeVisible();
    await expect(page.locator('.cast-card')).toHaveCount(12);
    await snap(page, 'series-detail');
  });

  test('actor page', async ({ page }) => {
    await page.goto('/actorSummary/501');
    await waitForLoaderGone(page);
    await expect(page.locator('.actorDetailSummary__name')).toHaveText(fixture('person').name);
    await expect(page.locator('.moreMovies .movieCard')).toHaveCount(fixture('person-movie_credits').cast.length);
    await snap(page, 'actor');
  });
});
