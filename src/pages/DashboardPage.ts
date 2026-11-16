import { expect, Locator, Page } from '@playwright/test';
import { AudioPlayer } from '../components/AudioPlayer';
import { NetworkMap } from '../components/map/NetworkMap';
import { SettingsPanel } from '../components/SettingsPanel';
import { StatusBanner } from '../components/StatusBanner';
import { TelemetryWidget } from '../components/TelemetryWidget';

export class DashboardPage {
  readonly root: Locator;
  readonly telemetry: TelemetryWidget;
  readonly statusBanner: StatusBanner;
  readonly audio: AudioPlayer;
  readonly map: NetworkMap;
  readonly settings: SettingsPanel;

  constructor(readonly page: Page) {
    this.root = page.getByTestId('dashboard');
    this.telemetry = new TelemetryWidget(page);
    this.statusBanner = new StatusBanner(page);
    this.audio = new AudioPlayer(page);
    this.map = new NetworkMap(page);
    this.settings = new SettingsPanel(page);
  }

  async goto(path = '/') {
    await this.page.goto(path);
    await expect(this.root).toBeVisible();
  }

  /** Computed value of a CSS custom property on <html>. */
  cssVar(name: string): Promise<string> {
    return this.page.evaluate(
      (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(),
      name,
    );
  }
}
