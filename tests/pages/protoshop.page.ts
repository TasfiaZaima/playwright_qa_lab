import { expect } from '@playwright/test';
import { ModulePage } from './module.page';

export type ProtoShopUser = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
};

export class ProtoShopPage extends ModulePage {
  private readonly nameInput = this.page.getByRole('textbox', { name: 'Name', exact: true });
  private readonly emailInput = this.page.getByRole('textbox', { name: 'Email' });
  private readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  private readonly iceCreamCheckbox = this.page.getByRole('checkbox', { name: /ice cream/i });
  private readonly genderSelect = this.page.getByRole('combobox', { name: 'Gender' });
  private readonly employedRadio = this.page.getByRole('radio', { name: 'Employed' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  readonly boundNameInput = this.page.getByRole('textbox', { name: 'Two-way bound name' });

  async open(): Promise<void> {
    await super.open('/protoshop');
    await this.expectHeading(/form practice/i);
  }

  async addFirstProduct(): Promise<void> {
    await this.page.goto('/protoshop/shop');
    await this.acceptCookiesIfVisible();
    const addToCartButton = this.page.getByRole('button', { name: /add to cart/i }).first();
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();
  }

  async expectCartContainsProduct(): Promise<void> {
    await expect(this.page.getByRole('link', { name: /checkout/i })).toContainText(/1/);
  }

  async fillValidForm(user: ProtoShopUser): Promise<void> {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.iceCreamCheckbox.check();
    await this.genderSelect.selectOption({ label: 'Female' });
    await this.employedRadio.check();
    await this.page.getByRole('textbox', { name: 'Date of Birth' }).fill(user.dateOfBirth);
  }

  async expectFormSubmissionResult(): Promise<void> {
    await expect(this.page.locator('body')).toContainText(/success|submitted|welcome/i);
  }
}
