import { expect, test } from '@playwright/test';
import { AutomationPracticePage } from '../pages/automation-practice.page';

test.describe('Module 1 - Automation Practice', () => {
  test('page loads with the automation practice widgets', async ({ page }) => {
    const practicePage = new AutomationPracticePage(page);
    await practicePage.open();
    await practicePage.expectHeading(/practice page/i);
  });

  test('user can select a radio button', async ({ page }) => {
    const practicePage = new AutomationPracticePage(page);
    await practicePage.open();
    await practicePage.selectRadio('Radio1');
    await practicePage.expectSelected('Radio1');
  });

  test('user can select a checkbox', async ({ page }) => {
    const practicePage = new AutomationPracticePage(page);
    await practicePage.open();
    await practicePage.check('Option1');
    await practicePage.expectSelected('Option1');
  });

  test('user can select a dropdown option', async ({ page }) => {
    const practicePage = new AutomationPracticePage(page);
    await practicePage.open();
    await practicePage.selectDropdown('Option2');
    await expect(page.getByRole('combobox')).toHaveValue('option2');
  });

  test('user can enter a country suggestion', async ({ page }) => {
    const practicePage = new AutomationPracticePage(page);
    await practicePage.open();
    await practicePage.typeCountry('Bangladesh');
    await expect(page.getByRole('textbox', { name: 'Type to Select Countries' })).toHaveValue('Bangladesh');
  });

  test('user can hide and show the example field', async ({ page }) => {
    const practicePage = new AutomationPracticePage(page);
    await practicePage.open();
    const field = page.getByRole('textbox', { name: 'Hide/Show Example' });
    await practicePage.hideExample();
    await expect(field).toBeHidden();
    await practicePage.showExample();
    await expect(field).toBeVisible();
  });
});
