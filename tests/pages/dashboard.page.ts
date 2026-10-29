import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private readonly signOutButton = this.page.getByRole('button', { name: /sign out/i });
  private readonly clearFiltersButton = this.page.getByRole('button', { name: /clear filters/i });

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/\/client\/dashboard\/dash/);
    await expect(this.signOutButton).toBeVisible();
    await expect(this.page.locator('body')).toContainText('Login Successfully');
  }

  async searchProducts(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Search products' }).fill(value);
  }

  async selectCategory(category = 'electronics'): Promise<void> {
    await this.page.getByRole('checkbox', { name: category }).check();
  }

  async clearFilters(): Promise<void> {
    await this.clearFiltersButton.click();
  }
}
