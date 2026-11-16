import { test, expect } from '../src/fixtures/base';

test.describe('Epic 1: Network manipulation & real-time sync', () => {
  test('Req 1.1 telemetry updates at least twice in 5s without a reload',
    { tag: ['@network', '@smoke'] },
    async ({ page, dashboard }) => {
      await dashboard.goto();
      await expect(dashboard.telemetry.value).toBeVisible();

      let navigations = 0;
      page.on('framenavigated', (f) => { if (f === page.mainFrame()) navigations++; });

      const start = await dashboard.telemetry.sequence();
      await expect
        .poll(() => dashboard.telemetry.sequence(), { timeout: 5_000, message: 'data points should keep arriving' })
        .toBeGreaterThanOrEqual(start + 2);

      expect(navigations, 'page must not reload').toBe(0);
    });

  test('Req 1.2 503 from /system-status shows the Reconnecting banner',
    { tag: ['@network'] },
    async ({ page, dashboard, consoleAudit }) => {
      // The browser itself logs failed requests as console errors; this one is expected.
      consoleAudit.allow(/503|Service Unavailable/);

      const handler = (route: import('@playwright/test').Route) => {
        if (route.request().method() !== 'GET') return route.fallback();
        return route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Service Unavailable' }),
        });
      };
      await page.route('**/api/v1/system-status', handler);
      await dashboard.goto();

      const banner = dashboard.statusBanner.root;
      await expect(banner).toBeVisible();
      await expect(banner).toHaveText('Reconnecting...');
      await expect(banner).toHaveClass(/banner--degraded/);
      await expect(dashboard.telemetry.root).toBeVisible(); // degraded, not broken

      // Recovery: remove the fault and the banner should clear on the next poll.
      await page.unroute('**/api/v1/system-status', handler);
      await expect(banner).toBeHidden({ timeout: 6_000 });
    });

  test('Req 1.3 slow 3G shows skeletons and does not crash',
    { tag: ['@network', '@slow'] },
    async ({ page, context, browserName, dashboard }) => {
      test.skip(browserName !== 'chromium', 'CDPSession is Chromium-only');
      test.setTimeout(60_000);

      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 2_000, // ms round trip, Chrome's "Slow 3G" preset
        downloadThroughput: (400 * 1024) / 8,
        uploadThroughput: (400 * 1024) / 8,
      });

      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 45_000 });

      await expect(dashboard.telemetry.skeleton).toBeVisible();
      await expect(dashboard.telemetry.value).toBeHidden(); // no data yet
      // Eventually the real data replaces the skeleton, with no timeout crash.
      await expect(dashboard.telemetry.value).toBeVisible({ timeout: 30_000 });
      await expect(dashboard.telemetry.skeleton).toBeHidden();
    });
});
