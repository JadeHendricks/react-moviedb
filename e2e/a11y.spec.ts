import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { test, expect, gotoHome, waitForLoaderGone, settleImages } from './support';

// Scans the page as it is. Serious and critical findings fail the test; every finding is printed so the
// lower ones (moderate, minor) stay visible in the report without blocking.
const scan = async (page: Page, flow: string) => {
  await settleImages(page);
  // Colour transitions (tab switch, hover) must have finished, or axe measures a half-way colour.
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))));
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
  for (const v of violations) {
    console.log(`[axe] ${flow}: ${v.impact} ${v.id} (${v.nodes.length} nodes) ${v.id === "color-contrast" ? "" : v.nodes.map((n) => n.target.join(" ") + " :: " + n.html.slice(0, 80)).join(" | ")}`);
    if (v.id === 'color-contrast') {
      // The distinct colour pairs behind the findings, e.g. "#ffffff on #3cb13e = 2.95 (needs 4.5)".
      const pairs = new Set(v.nodes.map((n) => {
        const target = n.target.join(" ");
        const d = n.any[0]?.data as { fgColor?: string; bgColor?: string; contrastRatio?: number; expectedContrastRatio?: string } | undefined;
        return `${d?.fgColor} on ${d?.bgColor} = ${d?.contrastRatio} (needs ${d?.expectedContrastRatio}) ${process.env.AXE_TARGETS ? target : ""}`;
      }));
      for (const pair of pairs) console.log(`[axe]   ${pair}`);
    }
  }
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(
    blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`),
    `${flow}: serious or critical accessibility issues`,
  ).toEqual([]);
};

test.describe('axe: no serious or critical issues', () => {
  test('home, movies', async ({ page }) => {
    await gotoHome(page);
    await scan(page, 'home-movies');
  });

  test('home, series', async ({ page }) => {
    await gotoHome(page);
    await page.locator('.switch-tabs__tab[data-content="series"]').click();
    await expect(page.locator('.switch-tabs__tab[data-content="series"]')).toHaveAttribute('aria-pressed', 'true');
    await scan(page, 'home-series');
  });

  test('movie detail', async ({ page }) => {
    await page.goto('/movieSummary/101');
    await waitForLoaderGone(page);
    await expect(page.locator('.cast-card')).toHaveCount(12);
    await scan(page, 'movie-detail');
  });

  test('series detail', async ({ page }) => {
    await page.goto('/seriesSummary/200');
    await waitForLoaderGone(page);
    await expect(page.locator('.cast-card')).toHaveCount(12);
    await scan(page, 'series-detail');
  });

  test('actor', async ({ page }) => {
    await page.goto('/actorSummary/501');
    await waitForLoaderGone(page);
    await expect(page.locator('.actor__name')).not.toHaveText('');
    await scan(page, 'actor');
  });

  test('search results', async ({ page }) => {
    await page.goto('/searchResults/matrix');
    await waitForLoaderGone(page);
    await expect(page.locator('.search-card').first()).toBeVisible();
    await scan(page, 'search-results');
  });

  test('empty search message', async ({ page }) => {
    await gotoHome(page);
    await page.getByRole('searchbox', { name: 'Search for Movies or TV Series' }).press('Enter');
    await expect(page.getByRole('alert')).toHaveText('Please insert a search term');
    await scan(page, 'empty-search');
  });

  test('account settings', async ({ page }) => {
    await page.goto('/accountSettings');
    await expect(page.locator('.account__form')).toBeVisible();
    await scan(page, 'account-settings');
  });

  test('login and sign-up dialog', async ({ page }) => {
    await gotoHome(page);
    await page.getByRole('button', { name: 'Login' }).first().click();
    await expect(page.getByRole('dialog', { name: 'Login' })).toBeVisible();
    await scan(page, 'modal-login');
    await page.getByRole('dialog').getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();
    await scan(page, 'modal-signup');
  });
});

test.describe('keyboard only', () => {
  test('search, switch tabs, dialog, show password, trailer and details with no mouse', async ({ page, context }) => {
    await gotoHome(page);
    // Nothing is focused yet; Tab walks the page in reading order, so these presses are the whole route.
    const focusedName = () =>
      page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el?.getAttribute('aria-label') ?? el?.textContent?.trim() ?? el?.tagName ?? '';
      });

    // 1. Every control on the home page can be reached, and each shows a focus ring.
    const reached = new Set<string>();
    for (let i = 0; i < 60; i += 1) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        const cs = getComputedStyle(el);
        return {
          name: el.getAttribute('aria-label') ?? el.textContent?.trim() ?? el.tagName,
          ring: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0,
          tag: el.tagName,
        };
      });
      // Past the last control Tab leaves the page for the browser's own UI, which shows up as BODY.
      if (info.tag === 'BODY') continue;
      reached.add(info.name);
      expect(info.ring, `${info.name} (${info.tag}) shows a focus ring`).toBe(true);
    }
    // The logo link and the big hero play button are hidden on narrower screens, so they are not in the tab order there.
    for (const expected of ['Now Playing', 'Top Rated', 'Popular', 'Upcoming', 'Login', 'Sign up', 'Movies', 'Series']) {
      expect([...reached].some((n) => n.startsWith(expected)), `${expected} is reachable by Tab`).toBe(true);
    }

    // 2. Search with the keyboard.
    const box = page.getByRole('searchbox', { name: 'Search for Movies or TV Series' });
    await box.focus();
    await page.keyboard.type('Matrix');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/searchResults\/matrix$/);
    await waitForLoaderGone(page);
    await expect(page.locator('.search-card').first()).toBeVisible();

    // 3. The dialog: opens from the keyboard, traps Tab, closes on Escape and returns focus.
    const login = page.getByRole('button', { name: 'Login' }).first();
    await login.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Login' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate((d) => d.contains(document.activeElement)), `Tab ${i + 1} stays in the dialog`).toBe(true);
    }
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Shift+Tab');
      expect(await dialog.evaluate((d) => d.contains(document.activeElement)), `Shift+Tab ${i + 1} stays in the dialog`).toBe(true);
    }
    // Switch to sign up with the keyboard and toggle a password.
    await dialog.getByRole('button', { name: 'Sign up' }).first().focus();
    await page.keyboard.press('Space');
    await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();
    const password = page.getByLabel('Password *', { exact: true });
    await expect(password).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: 'Show password' }).focus();
    await page.keyboard.press('Enter');
    await expect(password).toHaveAttribute('type', 'text');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(login).toBeFocused();
    expect(await focusedName()).toBe('Login');

    // 4. Home: switch to Series with Space, open a title with Enter on its link.
    await page.getByRole('link', { name: 'Now Playing' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.hero__title')).not.toHaveText('');
    await page.getByRole('button', { name: 'Series' }).focus();
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Series' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Movies' })).toHaveAttribute('aria-pressed', 'false');
    await page.locator('.movie-card').first().getByRole('link', { name: /^View More/ }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/seriesSummary\/\d+$/);
    await waitForLoaderGone(page);

    // 5. The trailer button works from the keyboard and opens a new tab.
    const popup = context.waitForEvent('page');
    await page.getByRole('button', { name: /^Play .* trailer$/ }).focus();
    await page.keyboard.press('Enter');
    const tab = await popup;
    expect(tab.url()).toContain('youtube.com/watch');
    await tab.close();
  });
});
