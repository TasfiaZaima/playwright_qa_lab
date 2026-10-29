import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly startPractisingLink = this.page.getByRole('link', { name: /start practising/i });
  private readonly moduleThreeLink = this.page.getByRole('link', { name: /module 3.*shopsphere/i });
  readonly challengeModeLink = this.page.getByRole('link', { name: /enable challenge mode/i });
  private readonly automationPracticeLink = this.page.locator('a[href="/practice"]');
  private readonly protoShopLink = this.page.locator('a[href="/protoshop"]');
  private readonly shopSphereLink = this.page.locator('a[href="/client"]');
  private readonly ticketTrailLink = this.page.locator('a[href="/tickets"]');

  async open(): Promise<void> {
    await super.open('/');
    await expect(this.page.getByRole('heading', { name: /qa practice lab/i })).toBeVisible();
  }

  async expectLandingPageIsVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /qa practice lab/i })).toBeVisible();
    await expect(this.startPractisingLink).toBeVisible();
  }

  async goToModuleThree(): Promise<void> {
    await this.moduleThreeLink.click();
  }

  async goToModule(module: keyof HomePage['moduleLinks']): Promise<void> {
    await this.moduleLinks[module].click();
  }

  private get moduleLinks() {
    return {
      automationPractice: this.automationPracticeLink,
      protoShop: this.protoShopLink,
      shopSphere: this.shopSphereLink,
      ticketTrail: this.ticketTrailLink,
    };
  }
}
