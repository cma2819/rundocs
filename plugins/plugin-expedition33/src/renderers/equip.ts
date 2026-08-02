import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { CHARACTERS } from '../characters.js';

interface Loadout {
  weapon?: string;
  pictos?: string[];
  skills?: string[];
}

/**
 * In-game, skills are equipped 3-per-page across 2 pages — split the flat
 * 6-slot list the same way instead of one long list.
 */
function chunkSkills(skills: string[]): [string[], string[]] {
  return [skills.slice(0, 3), skills.slice(3, 6)];
}

/**
 * Each field's value is a whole per-character loadout object (weapon/pictos/skills),
 * which the generic <dl> renderer would stringify as "[object Object]" — this
 * renders one card per character instead, only for characters the document set.
 */
export const equipRenderer: ComponentRenderer<any> = (component) => {
  const title = component.schema?.['x-ui']?.displayName ?? component.name;

  const cards = component.fields
    .filter((f) => f.value && typeof f.value === 'object' && !Array.isArray(f.value))
    .map((f) => {
      const loadout = f.value as Loadout;
      const [page1, page2] = chunkSkills(loadout.skills ?? []);

      return h('div', { class: 'equip-card' }, [
        h('h4', {}, CHARACTERS[f.key]?.displayName ?? f.displayName),
        h('div', { class: 'equip-weapon' }, loadout.weapon ?? '—'),
        h(
          'ul',
          { class: 'equip-pictos' },
          (loadout.pictos ?? []).map((p) => h('li', {}, p)),
        ),
        h('div', { class: 'equip-skills' }, [
          h(
            'ul',
            { class: 'equip-skills-page' },
            page1.map((s) => h('li', {}, s)),
          ),
          h(
            'ul',
            { class: 'equip-skills-page' },
            page2.map((s) => h('li', {}, s)),
          ),
        ]),
      ]);
    });

  return h('section', { class: 'component component--equip' }, [h('h3', {}, title), h('div', { class: 'equip-grid' }, cards)]);
};
