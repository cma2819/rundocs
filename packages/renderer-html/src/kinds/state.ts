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
      // Every Component is wrapped so the "Filter blocks" UI (document.ts) can
      // target it by "data-block-category" regardless of whether it came from
      // ":::status" (block.name === component.name) or a mixed ":::state"
      // block nesting several. Reference-only Components (x-ui.reference, e.g.
      // status/equip) additionally get "data-reference" — hidden by default,
      // see the ".rd-ref-toggle" CSS rule in document.ts.
      const props: Record<string, string> = { 'data-block-category': component.name };
      if (component.schema?.['x-ui']?.reference) {
        props['data-reference'] = 'true';
      }
      return h('div', props, [rendered]);
    });
    return h('div', { class: `state-block state-block--${block.name}` }, children);
  };
}
