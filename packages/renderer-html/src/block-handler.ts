import type { Handler } from 'mdast-util-to-hast';
import type { BlockRendererRegistry } from '@rundocs/renderer-core';

/**
 * The single mdast-to-hast Handler registered for the `block` node type. Every
 * `:::name ... :::` directive produces this node type regardless of kind — the
 * actual presentation branch happens inside `registry`, keyed by `node.kind`.
 */
export function createBlockHandler(registry: BlockRendererRegistry<any>): Handler {
  return (_state, node: any) =>
    registry.render(
      {
        name: node.name,
        kind: node.kind,
        raw: node.raw,
        value: node.value,
        semantic: node.semantic ?? [],
        diagnostics: node.diagnostics ?? [],
      },
      { format: 'html' },
    );
}
