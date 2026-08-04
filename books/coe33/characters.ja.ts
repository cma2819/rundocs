import type { CharacterMeta } from '@rundocs/plugin-expedition33';

/**
 * Display-only Japanese names for `formation`/`equip`, matching the katakana
 * already used in this book's prose (glitchless.md). YAML ids stay English —
 * this only overrides how plugin-expedition33's renderers label them.
 */
export const CHARACTERS_JA: Record<string, CharacterMeta> = {
  gustave: { displayName: 'ギュスターヴ', icon: 'user' },
  maelle: { displayName: 'マエル', icon: 'user' },
  lune: { displayName: 'ルネ', icon: 'user' },
  verso: { displayName: 'ヴェルソ', icon: 'user' },
  sciel: { displayName: 'シエル', icon: 'user' },
  monoco: { displayName: 'モノコ', icon: 'user' },
};
