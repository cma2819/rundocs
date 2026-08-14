export interface StatusLabels {
  lv: string;
  stats: { h: string; s: string; a: string; d: string; c: string };
  attributes: { v: string; m: string; a: string; d: string; l: string };
}

/**
 * Default (English) display labels for the `status` Component's short keys.
 * Books can supply their own via `createStatusRenderer`'s second argument —
 * same localization pattern as `CHARACTERS`/`CHARACTERS_JA`.
 */
export const STATUS_LABELS: StatusLabels = {
  lv: 'Lv',
  stats: { h: 'HP', s: 'Speed', a: 'Attack', d: 'Defense', c: 'Crit Rate' },
  attributes: { v: 'Vitality', m: 'Might', a: 'Agility', d: 'Defense', l: 'Luck' },
};
