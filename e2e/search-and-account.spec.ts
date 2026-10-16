import { test, expect, fixture, gotoHome, snap, waitForLoaderGone } from './support';

test('search with mixed movie and series results', async ({ page }) => {
  await gotoHome(page);
  await page.locator('.input--search').fill('Matrix');
  await page.locator('.input--search').press('Enter');
  await expect(page).toHaveURL(/\/searchResults\/matrix$/);
  await waitForLoaderGone(page);
  const expected = fixture('search-movie').results.length + fixture('search-tv').results.length;
  await expect(page.locator('.cardSearch')).toHaveCount(expected);
  await expect(page.locator('.searchResults__title span')).toHaveText('matrix');
  await snap(page, 'search-results');
});

test('account settings', async ({ page }) => {
  await page.goto('/accountSettings');
  await expect(page.locator('.accountform')).toBeVisible();
  await expect(page.locator('.accountSettings__title')).toHaveText('Edit Profile');
  await snap(page, 'account-settings');
});

test.describe('login / sign-up modal', () => {
  test('open, switch tab, show password, close on overlay', async ({ page }) => {
    await gotoHome(page);

    await page.locator('.topnav__buttons [data-auth="login"]').click();
    await expect(page.locator('.modalAuth')).toBeVisible();
    await expect(page.locator('.modalForm__login')).toBeVisible();
    await snap(page, 'modal-login', { fullPage: false });

    await page.locator('.modalAuth__tabs [data-auth="signup"]').click();
    await expect(page.locator('.modalForm__signup')).toBeVisible();
    await snap(page, 'modal-signup', { fullPage: false });

    const password = page.locator('input[name="login_password"]');
    await expect(password).toHaveAttribute('type', 'password');
    await page.locator('.modalForm__icon').first().click();
    await expect(password).toHaveAttribute('type', 'text');
    await snap(page, 'modal-signup-password-visible', { fullPage: false });
    await page.locator('.modalForm__icon').first().click();
    await expect(password).toHaveAttribute('type', 'password');

    // Clicking the dimmed overlay (outside .modal) closes it.
    await page.locator('.overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.overlay')).toHaveCount(0);
  });
});
