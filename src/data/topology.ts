// Mirrors the node layout of the app under test, as fractions (0..1) of the canvas size.
export const TOPOLOGY = {
  'core-router': { x: 0.5, y: 0.2, status: 'healthy' },
  'edge-1': { x: 0.2, y: 0.7, status: 'healthy' },
  'edge-2': { x: 0.8, y: 0.7, status: 'degraded' },
} as const;

export type NodeId = keyof typeof TOPOLOGY;
