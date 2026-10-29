import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly emailInput = this.page.getByPlaceholder('email@example.com');
  private readonly passwordInput = this.page.getByPlaceholder('enter your password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly pageHeading = this.page.getByRole('heading', { name: 'Log in' });

  async open(): Promise<void> {
    await super.open('/client/auth/login');
    await expect(this.pageHeading).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginFormIsVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }
}
