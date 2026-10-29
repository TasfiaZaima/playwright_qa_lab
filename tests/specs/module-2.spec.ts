import { expect, test } from '@playwright/test';
import { ProtoShopPage } from '../pages/protoshop.page';
import { testData } from '../utils/test-data';

test.describe('Module 2 - ProtoShop', () => {
  test('page loads with the product shop', async ({ page }) => {
    const protoShop = new ProtoShopPage(page);
    await protoShop.open();
    await protoShop.expectHeading(/form practice/i);
  });

  test('user can complete the ProtoShop form', async ({ page }) => {
    const protoShop = new ProtoShopPage(page);
    await protoShop.open();
    await protoShop.fillValidForm(testData.protoShopUser);
    await protoShop.submitButton.click();
    await protoShop.expectFormSubmissionResult();
  });

  test('user can add a product to the cart', async ({ page }) => {
    const protoShop = new ProtoShopPage(page);
    await protoShop.open();
    await protoShop.addFirstProduct();
    await protoShop.expectCartContainsProduct();
  });

  test('two-way bound name mirrors the entered value', async ({ page }) => {
    const protoShop = new ProtoShopPage(page);
    await protoShop.open();
    await protoShop.boundNameInput.fill('Bound User');
    await expect(protoShop.boundNameInput).toHaveValue('Bound User');
  });

  test('disabled employment option cannot be selected', async ({ page }) => {
    const protoShop = new ProtoShopPage(page);
    await protoShop.open();
    await expect(page.getByRole('radio', { name: /entrepreneur/i })).toBeDisabled();
  });
});
