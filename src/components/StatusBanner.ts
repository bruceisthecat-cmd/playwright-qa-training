import { Locator, Page } from '@playwright/test';

export class StatusBanner {
  readonly root: Locator;
  constructor(page: Page) {
    this.root = page.getByTestId('status-banner');
  }
}
