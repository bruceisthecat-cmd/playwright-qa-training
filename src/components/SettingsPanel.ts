import { Locator, Page } from '@playwright/test';

export class SettingsPanel {
  readonly compactToggle: Locator;
  constructor(page: Page) {
    this.compactToggle = page.getByLabel('Compact mode');
  }
}
