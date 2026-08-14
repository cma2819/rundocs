import type { StatusLabels } from '@rundocs/plugin-expedition33';

/**
 * Display-only Japanese labels for the `status` Component's short keys,
 * matching `characters.ja.ts`'s pattern — YAML keys stay the short English
 * letters (lv/h/s/a/d/c/v/m/a/d/l); this only overrides how they're labeled.
 */
export const STATUS_LABELS_JA: StatusLabels = {
  lv: 'Lv',
  stats: { h: '体力', s: '速さ', a: '攻撃力', d: '防御力', c: 'クリティカル率' },
  attributes: { v: '生命力', m: '攻撃力', a: '素早さ', d: '防御力', l: '運' },
};
