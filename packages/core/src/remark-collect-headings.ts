import { visit } from 'unist-util-visit';
import type { Root, Heading as MdastHeading } from 'mdast';
import type { VFile } from 'vfile';
import type { Heading } from '@rundocs/renderer-html';

function headingText(node: MdastHeading): string {
  let text = '';
  visit(node, (n: any) => {
    if (n.type === 'text' || n.type === 'inlineCode') text += n.value;
  });
  return text;
}

function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * Collects every real Markdown "# " heading (mdast `heading` node) into
 * `file.data.headings`, stamping each with a unique `id` via `data.hProperties`
 * so remark-rehype carries it through to the rendered `<hN id="...">`.
 * Deliberately mdast-level, not hast-level: block renderers (e.g. encounter's
 * turn titles) emit their own internal h3/h4 elements directly as hast, which
 * must not be mistaken for document structure — collecting before
 * remark-rehype runs sidesteps that entirely. wrapDocument (renderer-html)
 * turns the collected list into the sidebar TOC.
 */
export function remarkCollectHeadings() {
  return (tree: Root, file: VFile) => {
    const headings: Heading[] = [];
    const seen = new Map<string, number>();

    visit(tree, 'heading', (node: MdastHeading) => {
      const text = headingText(node);
      if (!text) return;

      const base = slugify(text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;

      node.data = { ...node.data, hProperties: { ...(node.data as any)?.hProperties, id } };
      headings.push({ depth: node.depth, id, text });
    });

    file.data.headings = headings;
  };
}
