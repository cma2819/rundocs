import { defineConfig } from '@rundocs/core';
import expedition33, { createFormationRenderer, createEquipRenderer, createStatusRenderer, createSkipRenderer } from '@rundocs/plugin-expedition33';
import { CHARACTERS_JA } from './characters.ja.js';
import { STATUS_LABELS_JA } from './status-labels.ja.js';
import { SKIP_LABELS_JA } from './skip-labels.ja.js';

export default defineConfig({
  plugin: {
    ...expedition33,
    renderers: {
      html: {
        ...expedition33.renderers?.html,
        formation: createFormationRenderer(CHARACTERS_JA),
        equip: createEquipRenderer(CHARACTERS_JA),
        status: createStatusRenderer(CHARACTERS_JA, STATUS_LABELS_JA),
        skip: createSkipRenderer(SKIP_LABELS_JA),
      },
    },
  },
});
