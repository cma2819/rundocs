import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { CHARACTERS, type CharacterMeta } from '../characters.js';

/**
 * `formation.members` is order-sensitive (turn order) with no front/back-row
 * concept, so an <ol> communicates that better than the generic key-value
 * <dl>, which would just print the array as a comma-joined string. Styled
 * (see document.ts) as a horizontal row of name chips rather than a numbered
 * vertical list.
 *
 * Factory-shaped (rather than a single constant) so a book can supply its own
 * id -> displayName map (e.g. localized names) while reusing this layout.
 */
export function createFormationRenderer(characters: Record<string, CharacterMeta>): ComponentRenderer<any> {
  return (component) => {
    const title = component.schema?.['x-ui']?.displayName ?? component.name;
    const members = Array.isArray(component.value.members) ? (component.value.members as string[]) : [];

    return h('section', { class: 'component component--formation' }, [
      h('h3', {}, title),
      h(
        'ol',
        { class: 'formation-order' },
        members.map((id) => h('li', { class: 'formation-member' }, characters[id]?.displayName ?? id)),
      ),
    ]);
  };
}

export const formationRenderer = createFormationRenderer(CHARACTERS);
