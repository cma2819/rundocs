import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '@rundocs/core';
import { loadGameSchema } from './load-game-schema.js';
import { inventoryRenderer } from './renderers/inventory.js';

const srcDir = dirname(fileURLToPath(import.meta.url));
const gameSchema = loadGameSchema(join(srcDir, '..', 'game.schema.yaml'));

export default definePlugin({
  id: 'oot',
  gameSchema,
  renderers: {
    html: { inventory: inventoryRenderer },
  },
});
