import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '@rundocs/core';
import { loadGameSchema } from './load-game-schema.js';
import { formationRenderer, createFormationRenderer } from './renderers/formation.js';
import { equipRenderer, createEquipRenderer } from './renderers/equip.js';
import { statusRenderer, createStatusRenderer } from './renderers/status.js';

export type { CharacterMeta } from './characters.js';
export type { StatusLabels } from './labels.js';
export { createFormationRenderer, createEquipRenderer, createStatusRenderer };

const srcDir = dirname(fileURLToPath(import.meta.url));
const gameSchema = loadGameSchema(join(srcDir, '..', 'game.schema.yaml'));

export default definePlugin({
  id: 'expedition33',
  gameSchema,
  renderers: {
    html: { formation: formationRenderer, equip: equipRenderer, status: statusRenderer },
  },
});
