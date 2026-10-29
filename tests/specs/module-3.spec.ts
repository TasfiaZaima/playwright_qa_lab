import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { testData } from '../utils/test-data';

test.describe('Module 3 - ShopSphere', () => {
  test('user can log in with the demo account', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await homePage.open();
    await homePage.goToModuleThree();
    await loginPage.expectLoginFormIsVisible();
    await loginPage.login(testData.users.demo.email, testData.users.demo.password);
    await dashboardPage.expectLoggedIn();
  });

  test('login form is visible when opening ShopSphere authentication', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.open();
    await homePage.goToModuleThree();
    await loginPage.expectLoginFormIsVisible();
  });

  test('invalid credentials keep the user on the login page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.open();
    await homePage.goToModuleThree();
    await loginPage.login(testData.users.invalid.email, testData.users.invalid.password);
    await loginPage.expectLoginFormIsVisible();
  });

  test('authenticated user can search products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.open();
    await loginPage.login(testData.users.demo.email, testData.users.demo.password);
    await dashboardPage.searchProducts('phone');
    await expect(page.getByRole('textbox', { name: 'Search products' })).toHaveValue('phone');
  });

  test('authenticated user can select and clear a category filter', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.open();
    await loginPage.login(testData.users.demo.email, testData.users.demo.password);
    await dashboardPage.selectCategory();
    await expect(page.getByRole('checkbox', { name: 'electronics' })).toBeChecked();
    await dashboardPage.clearFilters();
    await expect(page.getByRole('checkbox', { name: 'electronics' })).not.toBeChecked();
  });
});
