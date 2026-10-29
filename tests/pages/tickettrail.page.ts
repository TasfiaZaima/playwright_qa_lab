import { expect } from '@playwright/test';
import { ModulePage } from './module.page';

export class TicketTrailPage extends ModulePage {
  readonly emailInput = this.page.getByTestId('login-email');
  readonly passwordInput = this.page.getByTestId('login-password');
  readonly signInButton = this.page.getByTestId('login-btn');
  readonly registerLink = this.page.getByRole('link', { name: 'Register' });
  readonly apiDocsLink = this.page.getByRole('link', { name: /api documentation/i });

  async open(): Promise<void> {
    await super.open('/tickets');
    await this.expectSignInPage();
  }

  async signIn(email: string, password: string): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeEnabled();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectSignInPage(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.page.getByText(/no account found for this email/i)).toBeVisible();
  }
}
