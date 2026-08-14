import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { SKIP_LABELS, type SkipLabels } from '../labels.js';

interface Skip {
  count?: number;
  loading?: boolean;
}

/**
 * `skip` marks a cutscene skip in the run's flow rather than persistent party
 * state (formation/equip/status) — it shows up many times per page, so it
 * renders as a compact inline badge instead of the generic boxed
 * section+<dl>, which would dominate the page at this frequency (see
 * `.state-block--skip`/`.skip-badge` in document.ts for the matching CSS).
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
      { class: 'component component--skip skip-badge' },
      [
        icon ? h('span', { class: `icon icon--${icon}` }) : null,
        h('span', { class: 'skip-badge-count' }, count != null ? `${labels.title} ×${count}` : labels.title),
        skip.loading
          ? h(
              'span',
              { class: 'skip-badge-loading' },
              [loadingIcon ? h('span', { class: `icon icon--${loadingIcon}` }) : null, labels.loading].filter(Boolean) as any,
            )
          : null,
      ].filter(Boolean) as any,
    );
  };
}

export const skipRenderer = createSkipRenderer();
