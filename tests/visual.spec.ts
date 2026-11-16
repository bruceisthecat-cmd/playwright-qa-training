import { test, expect } from '../src/fixtures/base';

test('Visual: dashboard layout is stable',
  { tag: ['@visual'] },
  async ({ page, dashboard }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await dashboard.goto('/?freeze=1'); // deterministic telemetry data
    await expect(dashboard.telemetry.value).toBeVisible();

    await expect(page).toHaveScreenshot('dashboard.png', {
      maxDiffPixels: 100,
      animations: 'disabled',
    });
  });
