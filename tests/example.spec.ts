import { expect, test } from '@playwright/test';

test('QA Practice homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/QA Practice Lab/i);
  await expect(page.getByRole('heading', { name: /QA Practice Lab/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Start practising/i })).toBeVisible();
});
