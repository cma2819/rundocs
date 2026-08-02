export interface CharacterMeta {
  displayName: string;
  icon: string;
}

/**
 * Shared id -> display metadata for the 6 playable Expedition members, so
 * `formation` and `equip` (which key/enum on the same lowercase ids) render
 * consistent names without duplicating the mapping per renderer.
 */
export const CHARACTERS: Record<string, CharacterMeta> = {
  gustave: { displayName: 'Gustave', icon: 'user' },
  maelle: { displayName: 'Maelle', icon: 'user' },
  lune: { displayName: 'Lune', icon: 'user' },
  verso: { displayName: 'Verso', icon: 'user' },
  sciel: { displayName: 'Sciel', icon: 'user' },
  monoco: { displayName: 'Monoco', icon: 'user' },
};
