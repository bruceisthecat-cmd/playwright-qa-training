import { test, expect } from '../src/fixtures/base';

test.describe('Epic 2: Media, canvas & complex UI', () => {
  test('Req 2.1 audio actually plays after clicking the custom button',
    { tag: ['@media'] },
    async ({ dashboard }) => {
      await dashboard.goto();
      await dashboard.audio.play();

      await expect(dashboard.audio.playButton).toHaveAttribute('data-state', 'playing');
      // Properties on the media element are not DOM attributes, so we poll the JS value.
      await expect.poll(() => dashboard.audio.isPaused(), { timeout: 5_000 }).toBe(false);
      await expect.poll(() => dashboard.audio.currentTime()).toBeGreaterThan(0);
    });

  test('Req 2.2 clicking a node on the canvas opens its popover',
    { tag: ['@media', '@smoke'] },
    async ({ dashboard }) => {
      await dashboard.goto();
      await dashboard.map.clickNode('edge-2');

      await expect(dashboard.map.popover.root).toBeVisible();
      await expect(dashboard.map.popover.title).toHaveText('edge-2');
      await expect(dashboard.map.popover.status).toHaveText('degraded');
    });

  test('Req 2.2b clearing the selection closes the popover',
    { tag: ['@media'] },
    async ({ dashboard }) => {
      await dashboard.goto();
      await dashboard.map.clickNode('core-router');
      await expect(dashboard.map.popover.root).toBeVisible();

      await dashboard.map.controls.clearSelection();
      await expect(dashboard.map.popover.root).toBeHidden();
    });

  test('Req 2.2c clicking empty canvas space opens nothing',
    { tag: ['@media'] },
    async ({ dashboard }) => {
      await dashboard.goto();
      await dashboard.map.clickAtRelative(0.05, 0.05);
      // A negative check passes instantly, so prove the canvas is alive afterwards
      // by confirming a real node click still works.
      await expect(dashboard.map.popover.root).toBeHidden();
      await dashboard.map.clickNode('edge-1');
      await expect(dashboard.map.popover.root).toBeVisible();
    });

  test('Req 2.3 dark OS preference switches the theme',
    { tag: ['@media', '@smoke'] },
    async ({ page, dashboard }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await dashboard.goto();
      await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');

      // Flip the OS preference while the page is open: it should react live.
      await page.emulateMedia({ colorScheme: 'dark' });
      await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(11, 18, 32)');
      await expect.poll(() => dashboard.cssVar('--bg')).toBe('#0b1220');
    });
});
