import { visit } from 'unist-util-visit';
import { parseDocument as parseYamlDocument } from 'yaml';
import type { Root, Parent } from 'mdast';
import type { VFile } from 'vfile';
import type { Diagnostic, StateBlockNode } from './mdast-types.js';

export interface RemarkStateDirectiveOptions {
  /** restrict extraction to these directive names; default: all containerDirective nodes */
  names?: string[];
}

/**
 * Turns `:::name ... :::` container directives into `stateBlock` mdast nodes.
 *
 * The body is intentionally re-read from the original source by line offset rather
 * than re-serialized from the directive's parsed markdown children — YAML syntax
 * (e.g. `- item` sequences) would otherwise be misinterpreted as Markdown lists.
 */
export function remarkStateDirective(options: RemarkStateDirectiveOptions = {}) {
  return (tree: Root, file: VFile) => {
    const source = String(file.value);
    const lines = source.split('\n');

    visit(tree, 'containerDirective', (node: any, index, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (options.names && !options.names.includes(node.name)) return;
      if (!node.position) return;

      const raw = lines.slice(node.position.start.line, node.position.end.line - 1).join('\n');
      const yamlDoc = parseYamlDocument(raw);

      const diagnostics: Diagnostic[] = yamlDoc.errors.map((e) => ({
        severity: 'error',
        message: e.message,
        line: node.position!.start.line + (e.linePos?.[0]?.line ?? 1),
      }));

      const stateBlock: StateBlockNode = {
        type: 'stateBlock',
        name: node.name,
        raw,
        value: (yamlDoc.toJS() ?? {}) as Record<string, unknown>,
        diagnostics,
        position: node.position,
      };

      parent.children.splice(index, 1, stateBlock as never);
    });
  };
}
