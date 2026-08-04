import { defineConfig } from '@rundocs/core';
import expedition33, { createFormationRenderer, createEquipRenderer } from '@rundocs/plugin-expedition33';
import { CHARACTERS_JA } from './characters.ja.js';

export default defineConfig({
  plugin: {
    ...expedition33,
    renderers: {
      html: {
        ...expedition33.renderers?.html,
        formation: createFormationRenderer(CHARACTERS_JA),
        equip: createEquipRenderer(CHARACTERS_JA),
      },
    },
  },
});
