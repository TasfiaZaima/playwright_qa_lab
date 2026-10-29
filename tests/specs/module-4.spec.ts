import { expect, test } from '@playwright/test';
import { TicketTrailPage } from '../pages/tickettrail.page';
import { testData } from '../utils/test-data';

test.describe('Module 4 - TicketTrail', () => {
  test('page loads with the event booking application', async ({ page }) => {
    const ticketTrail = new TicketTrailPage(page);
    await ticketTrail.open();
    await ticketTrail.expectSignInPage();
  });

  test('sign-in form rejects invalid credentials', async ({ page }) => {
    const ticketTrail = new TicketTrailPage(page);
    await ticketTrail.open();
    await ticketTrail.signIn(testData.users.invalid.email, testData.users.invalid.password);
    await ticketTrail.expectLoginError();
  });

  test('TicketTrail exposes registration and API documentation links', async ({ page }) => {
    const ticketTrail = new TicketTrailPage(page);
    await ticketTrail.open();
    await expect(ticketTrail.registerLink).toBeVisible();
    await expect(ticketTrail.apiDocsLink).toBeVisible();
  });

  test('shared demo credentials are visible on the sign-in page', async ({ page }) => {
    const ticketTrail = new TicketTrailPage(page);
    await ticketTrail.open();
    await ticketTrail.expectText(new RegExp(testData.users.demo.email));
    await ticketTrail.expectText(new RegExp(testData.users.demo.password));
  });
});
