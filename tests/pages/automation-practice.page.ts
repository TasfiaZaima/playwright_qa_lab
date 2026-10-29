import { expect } from '@playwright/test';
import { ModulePage } from './module.page';

export class AutomationPracticePage extends ModulePage {
  async open(): Promise<void> {
    await super.open('/practice');
    await this.expectHeading(/practice page/i);
  }

  async selectRadio(label: string): Promise<void> {
    await this.page.getByLabel(label, { exact: false }).check();
  }

  async check(label: string): Promise<void> {
    await this.page.getByLabel(label, { exact: false }).check();
  }

  async expectSelected(label: string): Promise<void> {
    await expect(this.page.getByLabel(label, { exact: false })).toBeChecked();
  }

  async selectDropdown(label: string): Promise<void> {
    const dropdown = this.page.getByRole('combobox');
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toBeEnabled();
    await dropdown.selectOption({ label });
  }

  async typeCountry(value: string): Promise<void> {
    const countryInput = this.page.getByRole('textbox', { name: 'Type to Select Countries' });
    await expect(countryInput).toBeVisible();
    await countryInput.fill(value);
  }

  async hideExample(): Promise<void> {
    await this.page.getByRole('button', { name: 'Hide' }).click();
  }

  async showExample(): Promise<void> {
    await this.page.getByRole('button', { name: 'Show' }).click();
  }
}
