import { test, expect, fixture, gotoHome, snap, waitForLoaderGone } from './support';

test('search with mixed movie and series results', async ({ page }) => {
  await gotoHome(page);
  await page.locator('.input--search').fill('Matrix');
  await page.locator('.input--search').press('Enter');
  await expect(page).toHaveURL(/\/searchResults\/matrix$/);
  await waitForLoaderGone(page);
  const expected = fixture('search-movie').results.length + fixture('search-tv').results.length;
  await expect(page.locator('.search-card')).toHaveCount(expected);
  await expect(page.locator('.search__query')).toHaveText('matrix');
  await snap(page, 'search-results');
});

test('account settings', async ({ page }) => {
  await page.goto('/accountSettings');
  await expect(page.locator('.account__form')).toBeVisible();
  await expect(page.locator('.account__title')).toHaveText('Edit Profile');
  await snap(page, 'account-settings');
});

test.describe('login / sign-up modal', () => {
  test('open, switch tab, show password, close on overlay', async ({ page }) => {
    await gotoHome(page);

    await page.locator('.top-nav__buttons [data-auth="login"]').click();
    await expect(page.locator('.modal__dialog')).toBeVisible();
    await expect(page.locator('.modal__login')).toBeVisible();
    await snap(page, 'modal-login', { fullPage: false });

    await page.locator('.modal__tabs [data-auth="signup"]').click();
    await expect(page.locator('.modal__signup')).toBeVisible();
    await snap(page, 'modal-signup', { fullPage: false });

    const password = page.locator('input[name="signup_password"]');
    await expect(password).toHaveAttribute('type', 'password');
    await page.locator('.field__icon').first().click();
    await expect(password).toHaveAttribute('type', 'text');
    await snap(page, 'modal-signup-password-visible', { fullPage: false });
    await page.locator('.field__icon').first().click();
    await expect(password).toHaveAttribute('type', 'password');

    // Clicking the dimmed overlay (outside .modal__dialog) closes it.
    await page.locator('.modal').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.modal')).toHaveCount(0);
  });
});
