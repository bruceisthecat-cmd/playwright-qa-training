import { Locator, Page } from '@playwright/test';
import { NodeId, TOPOLOGY } from '../../data/topology';
import { MapControls } from './MapControls';
import { NodePopover } from './NodePopover';

/** A canvas has no DOM children, so we click by computed coordinates. */
export class NetworkMap {
  readonly canvas: Locator;
  readonly controls: MapControls;
  readonly popover: NodePopover;

  constructor(private readonly page: Page) {
    this.canvas = page.getByTestId('network-canvas');
    this.controls = new MapControls(page);
    this.popover = new NodePopover(page);
  }

  /** Click at a position given as a fraction (0..1) of the canvas size. */
  async clickAtRelative(rx: number, ry: number) {
    await this.canvas.scrollIntoViewIfNeeded();
    const box = await this.canvas.boundingBox();
    if (!box) throw new Error('Canvas has no bounding box; it is not rendered');
    await this.page.mouse.click(box.x + box.width * rx, box.y + box.height * ry);
  }

  async clickNode(id: NodeId) {
    const { x, y } = TOPOLOGY[id];
    await this.clickAtRelative(x, y);
  }
}
