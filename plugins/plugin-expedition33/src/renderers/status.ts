import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { CHARACTERS, type CharacterMeta } from '../characters.js';
import { STATUS_LABELS, type StatusLabels } from '../labels.js';

interface Status {
  lv?: number;
  stats?: Partial<Record<'h' | 's' | 'a' | 'd' | 'c', number>>;
  attributes?: Partial<Record<'v' | 'm' | 'a' | 'd' | 'l', number>>;
}

/**
 * One `.slot` per label-map key (not just the keys the book set) so the grid
 * always shows all 5 stats/attributes, dimming the ones with no data yet —
 * same fill-the-schema approach as `plugin-oot`'s inventory renderer.
 */
function statGrid(values: Record<string, number> | undefined, labels: Record<string, string>) {
  return h(
    'div',
    { class: 'inventory-grid' },
    Object.entries(labels).map(([key, label]) =>
      h('div', { class: `slot${values?.[key] != null ? ' slot--active' : ''}` }, [
        h('span', { class: 'slot-label' }, label),
        h('span', { class: 'slot-value' }, String(values?.[key] ?? '—')),
      ]),
    ),
  );
}

/**
 * Each field's value is a whole per-character status object (lv/stats/attributes),
 * which the generic <dl> renderer would stringify as "[object Object]" — this
 * renders one card per character instead, only for characters the document set.
 *
 * Factory-shaped (rather than a single constant) so a book can supply its own
 * id -> displayName character map AND its own stat/attribute label map (e.g.
 * localized labels) while reusing this layout.
 */
export function createStatusRenderer(
  characters: Record<string, CharacterMeta>,
  labels: StatusLabels = STATUS_LABELS,
): ComponentRenderer<any> {
  return (component) => {
    const title = component.schema?.['x-ui']?.displayName ?? component.name;
    const statsTitle = component.schema?.properties?.stats?.['x-ui']?.displayName ?? 'Stats';
    const attributesTitle = component.schema?.properties?.attributes?.['x-ui']?.displayName ?? 'Attributes';

    const cards = component.fields
      .filter((f) => f.value && typeof f.value === 'object' && !Array.isArray(f.value))
      .map((f) => {
        const status = f.value as Status;

        return h(
          'div',
          { class: 'status-card' },
          [
            h(
              'h4',
              {},
              [
                characters[f.key]?.displayName ?? f.displayName,
                status.lv != null ? h('span', { class: 'status-lv' }, `${labels.lv} ${status.lv}`) : null,
              ].filter(Boolean) as any,
            ),
            status.stats ? h('h5', { class: 'status-group-title' }, statsTitle) : null,
            status.stats ? statGrid(status.stats, labels.stats) : null,
            status.attributes ? h('h5', { class: 'status-group-title' }, attributesTitle) : null,
            status.attributes ? statGrid(status.attributes, labels.attributes) : null,
          ].filter(Boolean) as any,
        );
      });

    return h('section', { class: 'component component--status' }, [h('h3', {}, title), h('div', { class: 'status-grid' }, cards)]);
  };
}

export const statusRenderer = createStatusRenderer(CHARACTERS);
