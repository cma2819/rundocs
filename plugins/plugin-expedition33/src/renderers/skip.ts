import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { SKIP_LABELS, type SkipLabels } from '../labels.js';

interface Skip {
  count?: number;
  when?: string;
  loading?: boolean;
}

/**
 * `skip` marks a cutscene skip in the run's flow rather than persistent party
 * state (formation/equip/status) — it appears many times per page, so its
 * `.state-block--skip` wrapper stays borderless (spacing only) while the
 * component itself carries the visual weight as a left-accent card (see
 * `.skip-card` in document.ts for the matching CSS), so it stays legible
 * against surrounding prose without a fully boxed section+<dl>. Reads
 * top-to-bottom like a procedure step: heading (what + how many), optional
 * timing text, then — separated by a dashed rule — an optional loading tag.
 * `when`/`loading` are omitted entirely when absent, so the common
 * count-only case stays a single line.
 *
 * Factory-shaped (rather than a single constant) so a book can supply its own
 * localized labels while reusing this layout — same pattern as
 * createFormationRenderer/createEquipRenderer/createStatusRenderer.
 */
export function createSkipRenderer(labels: SkipLabels = SKIP_LABELS): ComponentRenderer<any> {
  return (component) => {
    const skip = component.value as Skip;
    const icon = component.schema?.['x-ui']?.icon;
    const loadingIcon = component.fields.find((f) => f.key === 'loading')?.icon;
    const count = typeof skip.count === 'number' ? skip.count : undefined;

    return h(
      'div',
      { class: 'component component--skip skip-card' },
      [
        h(
          'div',
          { class: 'skip-card-heading' },
          [
            icon ? h('span', { class: `icon icon--${icon}` }) : null,
            h('span', {}, count != null ? `${labels.title} ×${count}` : labels.title),
          ].filter(Boolean) as any,
        ),
        skip.when ? h('p', { class: 'skip-card-when' }, skip.when) : null,
        skip.loading
          ? h(
              'div',
              { class: 'skip-card-loading' },
              [loadingIcon ? h('span', { class: `icon icon--${loadingIcon}` }) : null, labels.loading].filter(Boolean) as any,
            )
          : null,
      ].filter(Boolean) as any,
    );
  };
}

export const skipRenderer = createSkipRenderer();
