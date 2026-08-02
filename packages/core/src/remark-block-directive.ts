import { visit } from 'unist-util-visit';
import type { Root, Parent } from 'mdast';
import type { VFile } from 'vfile';
import type { BlockRegistry } from './block-registry.js';
import type { BlockNode, Diagnostic } from './mdast-types.js';

export interface RemarkBlockDirectiveOptions {
  registry: BlockRegistry;
}

/**
 * Turns every `:::name ... :::` container directive into a `block` mdast node,
 * regardless of `name` — resolution (registered handler vs. fallback) is the
 * BlockRegistry's job, not this plugin's. No directive is left unconverted.
 *
 * The body is re-read from the original source by line offset rather than
 * re-serialized from the directive's parsed markdown children — YAML syntax
 * (e.g. `- item` sequences) would otherwise be misinterpreted as Markdown lists.
 */
export function remarkBlockDirective({ registry }: RemarkBlockDirectiveOptions) {
  return (tree: Root, file: VFile) => {
    const source = String(file.value);
    const lines = source.split('\n');

    visit(tree, 'containerDirective', (node: any, index, parent: Parent | undefined) => {
      if (!parent || index === undefined || !node.position) return;

      const handler = registry.resolve(node.name);
      const raw = lines.slice(node.position.start.line, node.position.end.line - 1).join('\n');
      const { value, diagnostics: parseDiagnostics } = handler.parse(raw);

      const startLine = node.position.start.line;
      const diagnostics: Diagnostic[] = parseDiagnostics.map((d) => ({
        ...d,
        line: startLine + (d.line ?? 1),
      }));

      const block: BlockNode = {
        type: 'block',
        name: node.name,
        kind: handler.kind,
        raw,
        value,
        diagnostics,
        position: node.position,
      };

      parent.children.splice(index, 1, block as never);
    });
  };
}
