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

    const children = block.semantic.map((component) => componentRegistry.render(component, { format: 'html' }));
    return h('div', { class: `state-block state-block--${block.name}` }, children);
  };
}
