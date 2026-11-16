import { Locator, Page } from '@playwright/test';

export class TelemetryWidget {
  readonly root: Locator;
  readonly value: Locator;
  readonly skeleton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('telemetry-widget');
    this.value = this.root.getByTestId('telemetry-value');
    this.skeleton = this.root.getByTestId('telemetry-skeleton');
  }

  /** Monotonic counter the app bumps on every data point. */
  async sequence(): Promise<number> {
    return Number((await this.root.getAttribute('data-seq')) ?? 0);
  }
}
