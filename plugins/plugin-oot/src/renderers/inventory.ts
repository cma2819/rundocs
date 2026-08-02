import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';

/**
 * Overrides the generic key-value fallback with a slot-grid layout — proves that
 * RendererRegistry.register() lets a Plugin fully own a component's presentation
 * while the Document/Schema layers stay untouched.
 */
export const inventoryRenderer: ComponentRenderer<any> = (component) => {
  const title = component.schema?.['x-ui']?.displayName ?? component.name;

  return h('section', { class: 'component component--inventory-oot' }, [
    h('h3', {}, title),
    h(
      'div',
      { class: 'inventory-grid' },
      component.fields.map((f) =>
        h('div', { class: `slot${f.value ? ' slot--active' : ''}` }, [
          h('span', { class: 'slot-label' }, f.displayName),
          h('span', { class: 'slot-value' }, String(f.value)),
        ]),
      ),
    ),
  ]);
};
