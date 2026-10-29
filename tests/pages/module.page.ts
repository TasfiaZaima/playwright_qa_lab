import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ModulePage extends BasePage {
  async expectHeading(name: RegExp | string): Promise<void> {
    await expect(this.page.getByRole('heading', { name, exact: false })).toBeVisible();
  }

  async expectText(text: RegExp | string): Promise<void> {
    await expect(this.page.locator('body')).toContainText(text);
  }
}
