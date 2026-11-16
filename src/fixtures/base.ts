import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

type ConsoleAudit = {
  /** Whitelist an expected error, e.g. the 503 we inject on purpose. */
  allow(pattern: RegExp): void;
};

export const test = base.extend<{ consoleAudit: ConsoleAudit; dashboard: DashboardPage }>({
  // auto: true => runs for EVERY test without being requested.
  consoleAudit: [
    async ({ context }, use) => {
      const errors: string[] = [];
      const allowed: RegExp[] = [];

      // Context-level listeners also cover extra tabs opened during the test.
      // Playwright calls Chrome's "Severe" level `error`.
      context.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
      });
      context.on('weberror', (e) => errors.push(`[uncaught] ${e.error().message}`));

      await use({ allow: (p) => allowed.push(p) });

      // Teardown: fail the test if anything unexpected was logged.
      const unexpected = errors.filter((e) => !allowed.some((p) => p.test(e)));
      expect(unexpected, 'Unexpected browser console errors').toEqual([]);
    },
    { auto: true },
  ],

  dashboard: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect };
