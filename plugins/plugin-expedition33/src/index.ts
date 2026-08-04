import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '@rundocs/core';
import { loadGameSchema } from './load-game-schema.js';
import { formationRenderer, createFormationRenderer } from './renderers/formation.js';
import { equipRenderer, createEquipRenderer } from './renderers/equip.js';

export type { CharacterMeta } from './characters.js';
export { createFormationRenderer, createEquipRenderer };

const srcDir = dirname(fileURLToPath(import.meta.url));
const gameSchema = loadGameSchema(join(srcDir, '..', 'game.schema.yaml'));

export default definePlugin({
  id: 'expedition33',
  gameSchema,
  renderers: {
    html: { formation: formationRenderer, equip: equipRenderer },
  },
});
