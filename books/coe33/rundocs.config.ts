import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { defineConfig } from '@rundocs/core';
import expedition33, {
  createFormationRenderer,
  createEquipRenderer,
  createStatusRenderer,
  createSkipRenderer,
  createMenuRenderer,
} from '@rundocs/plugin-expedition33';
import { CHARACTERS_JA } from './characters.ja.js';
import { STATUS_LABELS_JA } from './status-labels.ja.js';
import { SKIP_LABELS_JA } from './skip-labels.ja.js';
import { MENU_LABELS_JA } from './menu-labels.ja.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const loadDictionary = (file: string): Record<string, string> => parse(readFileSync(join(__dirname, file), 'utf8'));

export default defineConfig({
  i18n: {
    defaultLocale: 'ja',
    dictionaries: {
      ja: loadDictionary('dictionary.ja.yaml'),
      en: loadDictionary('dictionary.en.yaml'),
    },
  },
  plugin: {
    ...expedition33,
    renderers: {
      html: {
        ...expedition33.renderers?.html,
        formation: createFormationRenderer(CHARACTERS_JA),
        equip: createEquipRenderer(CHARACTERS_JA),
        status: createStatusRenderer(CHARACTERS_JA, STATUS_LABELS_JA),
        skip: createSkipRenderer(SKIP_LABELS_JA),
        menu: createMenuRenderer(CHARACTERS_JA, MENU_LABELS_JA),
      },
    },
  },
});
