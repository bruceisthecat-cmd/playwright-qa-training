import { Locator, Page } from '@playwright/test';

export class MapControls {
  readonly clearButton: Locator;
  constructor(page: Page) {
    this.clearButton = page.getByTestId('map-clear');
  }

  async clearSelection() {
    await this.clearButton.click();
  }
}
