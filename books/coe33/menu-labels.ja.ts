import type { MenuLabels } from '@rundocs/plugin-expedition33';

/**
 * Display-only Japanese labels for the `menu` Component's `kind` enum,
 * matching `characters.ja.ts`/`status-labels.ja.ts`'s pattern and the
 * terminology already used in this book's prose (glitchless.md: 武器/
 * ピクトス/ルミナ/スキル).
 */
export const MENU_LABELS_JA: MenuLabels = {
  kind: { weapon: '武器', pictos: 'ピクトス', lumina: 'ルミナ', skill: 'スキル' },
};
