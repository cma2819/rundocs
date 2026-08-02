import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { CHARACTERS } from '../characters.js';

/**
 * `formation.members` is order-sensitive (turn order) with no front/back-row
 * concept, so a numbered <ol> communicates that better than the generic
 * key-value <dl>, which would just print the array as a comma-joined string.
 */
export const formationRenderer: ComponentRenderer<any> = (component) => {
  const title = component.schema?.['x-ui']?.displayName ?? component.name;
  const members = Array.isArray(component.value.members) ? (component.value.members as string[]) : [];

  return h('section', { class: 'component component--formation' }, [
    h('h3', {}, title),
    h(
      'ol',
      { class: 'formation-order' },
      members.map((id) => h('li', { class: 'formation-member' }, CHARACTERS[id]?.displayName ?? id)),
    ),
  ]);
};
