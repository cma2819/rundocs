import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

const processor = unified().use(remarkParse).use(remarkRehype, { allowDangerousHtml: false });

/**
 * Parses `source` as Markdown and returns hast children, for embedding inside
 * hastscript `h(...)` calls that allow flow content (e.g. <aside>, <div>, <dd>).
 */
export function markdownToHast(source: string): any[] {
  const hast = processor.runSync(processor.parse(source)) as any;
  return hast.children;
}

/**
 * Same as markdownToHast, but for phrasing-content-only contexts (e.g. <span>):
 * a lone top-level paragraph is unwrapped to its inline children instead of
 * being wrapped in a block-level <p>.
 */
export function markdownToInlineHast(source: string): any[] {
  const children = markdownToHast(source);
  if (children.length === 1 && children[0].type === 'element' && children[0].tagName === 'p') {
    return children[0].children;
  }
  return children;
}
