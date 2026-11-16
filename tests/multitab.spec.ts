import { test, expect } from '../src/fixtures/base';
import { DashboardPage } from '../src/pages/DashboardPage';

test.describe('Epic 3: Multi-tab session', () => {
  test('Req 3.1 a setting changed in Tab B appears in Tab A without reload',
    { tag: ['@multitab'] },
    async ({ context }) => {
      const tabA = new DashboardPage(await context.newPage());
      const tabB = new DashboardPage(await context.newPage());

      await tabA.goto('/?session=qa-1');
      await tabB.goto('/?session=qa-1');

      let reloadsInA = 0;
      tabA.page.on('framenavigated', (f) => { if (f === tabA.page.mainFrame()) reloadsInA++; });

      await expect(tabA.settings.compactToggle).not.toBeChecked();
      await tabB.settings.compactToggle.check();

      await expect(tabA.settings.compactToggle).toBeChecked();
      await expect(tabA.root).toHaveClass(/compact/);
      expect(reloadsInA, 'Tab A must not reload').toBe(0);
    });

  test('Req 3.1b a different session is NOT affected',
    { tag: ['@multitab'] },
    async ({ context }) => {
      const tabA = new DashboardPage(await context.newPage());
      const tabB = new DashboardPage(await context.newPage());
      const other = new DashboardPage(await context.newPage());

      await tabA.goto('/?session=qa-1');
      await tabB.goto('/?session=qa-1');
      await other.goto('/?session=someone-else');

      await tabB.settings.compactToggle.check();
      // Wait for real propagation first, so the negative check below is meaningful.
      await expect(tabA.settings.compactToggle).toBeChecked();
      await expect(other.settings.compactToggle).not.toBeChecked();
    });
});
