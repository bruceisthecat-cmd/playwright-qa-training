import { Locator, Page } from '@playwright/test';

export class AudioPlayer {
  readonly playButton: Locator;
  readonly element: Locator;

  constructor(page: Page) {
    this.playButton = page.getByTestId('audio-play');
    this.element = page.locator('audio');
  }

  async play() {
    await this.playButton.click();
  }

  // Reads the real HTML5 media properties, not just what the UI claims.
  isPaused(): Promise<boolean> {
    return this.element.evaluate((el) => (el as HTMLAudioElement).paused);
  }

  currentTime(): Promise<number> {
    return this.element.evaluate((el) => (el as HTMLAudioElement).currentTime);
  }
}
