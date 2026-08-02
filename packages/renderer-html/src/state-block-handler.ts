import { h } from 'hastscript';
import type { RendererRegistry } from '@rundocs/renderer-core';

/**
 * mdast-util-to-hast `Handler` for the `stateBlock` node type produced by
 * @rundocs/core's remarkStateDirective + remarkValidateState.
 */
export function createStateBlockHandler(registry: RendererRegistry<any>) {
  return (_state: unknown, node: any) => {
    const errors = node.diagnostics?.filter((d: any) => d.severity === 'error') ?? [];
    if (errors.length > 0) {
      return h('div', { class: 'state-block state-block--error' }, [
        h('p', {}, `⚠ ${node.name}: ${errors.length} error(s)`),
        h(
          'ul',
          {},
          errors.map((d: any) => h('li', {}, d.line ? `L${d.line}: ${d.message}` : d.message)),
        ),
      ]);
    }

    const children = (node.semantic ?? []).map((component: any) => registry.render(component, { format: 'html' }));
    return h('div', { class: `state-block state-block--${node.name}` }, children);
  };
}
