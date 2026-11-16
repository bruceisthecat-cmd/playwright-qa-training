import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  public readonly titleHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    // Captures the main operational header element of the storefront page
    this.titleHeader = page.locator('[data-test="title"]');
  }
}