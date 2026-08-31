import { h } from 'hastscript';
import type { BlockRenderer, RendererRegistry } from '@rundocs/renderer-core';

/**
 * Presentation for BlockHandler.kind === "state": dispatches each top-level
 * Component to `componentRegistry` (name -> ComponentRenderer), the same
 * registry a Plugin's `renderers.html` entries populate.
 */
export function createStateKindRenderer(componentRegistry: RendererRegistry<any>): BlockRenderer<any> {
  return (block) => {
    const errors = block.diagnostics.filter((d) => d.severity === 'error');
    if (errors.length > 0) {
      return h('div', { class: 'state-block state-block--error' }, [
        h('p', {}, `⚠ ${block.name}: ${errors.length} error(s)`),
        h(
          'ul',
          {},
          errors.map((d) => h('li', {}, d.line ? `L${d.line}: ${d.message}` : d.message)),
        ),
      ]);
    }

    const children = block.semantic.map((component) => {
      const rendered = componentRegistry.render(component, { format: 'html' });
      // Reference-only Components (x-ui.reference, e.g. status/equip) are
      // hidden by default in HTML output — see the ".rd-ref-toggle" CSS rule
      // in document.ts. Wrapped rather than tagged in place so this applies
      // uniformly whether the Component came from ":::status" (block.name ===
      // component.name) or a mixed ":::state" block nesting several.
      if (component.schema?.['x-ui']?.reference) {
        return h('div', { 'data-reference': 'true' }, [rendered]);
      }
      return rendered;
    });
    return h('div', { class: `state-block state-block--${block.name}` }, children);
  };
}
