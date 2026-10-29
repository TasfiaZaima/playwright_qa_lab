import { expect, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
    await this.acceptCookiesIfVisible();
  }

  async acceptCookiesIfVisible(): Promise<void> {
    // WebKit detects the site's cookie-consent banner as an overlay and will
    // not click controls underneath it. Dismiss it centrally so every page
    // object remains focused on its own page behavior.
    const acceptButton = this.page.getByRole('button', { name: /^yes$/i });

    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click();
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
