import { visit } from 'unist-util-visit';
import type { Root, RootContent } from 'mdast';
import type { VFile } from 'vfile';
import type { BlockCategory } from '@rundocs/renderer-html';
import type { BlockNode } from './mdast-types.js';

function capitalize(text: string): string {
  return text.length === 0 ? text : text[0]!.toUpperCase() + text.slice(1);
}

const MARKDOWN_CATEGORY: BlockCategory = { id: 'markdown', label: 'Markdown' };

/**
 * Stamps plain Markdown content (a top-level node that isn't a Block — a
 * heading, paragraph, list, etc.) with the same "data-block-category" hook
 * the Block renderers use, via `data.hProperties` (the same mechanism
 * remarkCollectHeadings already uses for heading ids) so remark-rehype
 * carries it through to the rendered element. Only top-level: a Block's own
 * nested Markdown (e.g. a ":::note" body, an encounter turn's note) is
 * already covered by that Block's own wrapper being hidden/shown as a whole
 * — it must not be re-tagged as "markdown" too.
 */
function tagAsMarkdown(node: RootContent): void {
  const data = (node as { data?: Record<string, unknown> }).data ?? {};
  (node as { data?: Record<string, unknown> }).data = {
    ...data,
    hProperties: { ...(data.hProperties as Record<string, unknown> | undefined), 'data-block-category': 'markdown' },
  };
}

/**
 * Collects one filter category per Block/Component/plain-Markdown-content into
 * `file.data.blockCategories`, for the "Filter blocks" UI (wrapDocument,
 * renderer-html) to render as a checklist. Deliberately mdast-level, not
 * hast-level, same reasoning as remarkCollectHeadings — this must run after
 * remarkValidateBlock (needs `node.semantic`/full `node.diagnostics`) and
 * before remark-rehype. Blocks with an error diagnostic are skipped entirely:
 * they are never tagged with "data-block-category" by the html renderers
 * either, so they always stay visible regardless of the reader's filter
 * selection — same precedent as the "Reference info" toggle never hiding
 * diagnostics.
 */
export function remarkCollectBlockCategories() {
  return (tree: Root, file: VFile) => {
    const categories = new Map<string, BlockCategory>();

    let hasMarkdownContent = false;
    for (const node of tree.children) {
      if (node.type === 'block') continue;
      tagAsMarkdown(node);
      hasMarkdownContent = true;
    }
    if (hasMarkdownContent) categories.set(MARKDOWN_CATEGORY.id, MARKDOWN_CATEGORY);

    visit(tree, 'block', (node: unknown) => {
      const block = node as BlockNode;
      if (block.diagnostics.some((d) => d.severity === 'error')) return;

      if (block.kind === 'state') {
        for (const component of block.semantic ?? []) {
          if (categories.has(component.name)) continue;
          const label = component.schema?.['x-ui']?.displayName ?? component.name;
          categories.set(component.name, { id: component.name, label });
        }
        return;
      }

      if (!categories.has(block.kind)) {
        categories.set(block.kind, { id: block.kind, label: capitalize(block.kind) });
      }
    });

    file.data.blockCategories = [...categories.values()];
  };
}
