import { Locator, Page } from '@playwright/test';

export class NodePopover {
  readonly root: Locator;
  readonly title: Locator;
  readonly status: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('node-popover');
    this.title = this.root.getByTestId('node-title');
    this.status = this.root.getByTestId('node-status');
  }
}
