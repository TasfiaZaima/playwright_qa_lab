import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('QA Practice Lab homepage', () => {
  test('landing page shows key sections', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.expectLandingPageIsVisible();

    await expect(page.getByRole('heading', { name: /qa practice lab/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /start practising/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /module 3.*shopsphere/i })).toBeVisible();
  });
});
