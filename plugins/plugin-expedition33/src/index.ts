import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '@rundocs/core';
import { loadGameSchema } from './load-game-schema.js';
import { formationRenderer } from './renderers/formation.js';
import { equipRenderer } from './renderers/equip.js';

const srcDir = dirname(fileURLToPath(import.meta.url));
const gameSchema = loadGameSchema(join(srcDir, '..', 'game.schema.yaml'));

export default definePlugin({
  id: 'expedition33',
  gameSchema,
  renderers: {
    html: { formation: formationRenderer, equip: equipRenderer },
  },
});
