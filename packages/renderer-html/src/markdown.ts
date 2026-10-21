import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { h } from 'hastscript';
import { expandDictionaryTermsToHast } from './dictionary-term-handler.js';

const processor = unified().use(remarkParse).use(remarkRehype, { allowDangerousHtml: false });

const WHOLE_PLACEHOLDER = /^\$\{([^}]+)\}$/;

// Expands "${key}" inside this hast subtree's text nodes, same as the
// mdast-level remarkExpandDictionaryTerms, but walked post-parse since this
// module's mini pipeline has no remark stage of its own to hook a plugin
// into. A "code" element only expands when its ENTIRE content is one
// placeholder (`` `${key}` ``, mirroring remarkExpandDictionaryTerms'
// inlineCode handling) — a code span mixing a placeholder with other
// literal text is left untouched. "pre" (fenced code blocks) is always
// skipped entirely.
function expandDictionaryInHast(nodes: any[], dictionary: Record<string, string>): any[] {
  return nodes.flatMap((node) => {
    if (node.type === 'text') return expandDictionaryTermsToHast(node.value, dictionary);
    if (node.type === 'element' && node.tagName === 'pre') return [node];
    if (node.type === 'element' && node.tagName === 'code') {
      const only = node.children?.length === 1 ? node.children[0] : undefined;
      const match = only?.type === 'text' ? only.value.match(WHOLE_PLACEHOLDER) : null;
      if (match) {
        const resolved = dictionary[match[1]];
        if (resolved !== undefined) {
          return [h('code', {}, h('span', { class: 'rd-i18n-term', 'data-key': match[1] }, resolved))];
        }
        console.warn(`[rundocs] unresolved dictionary placeholder \${${match[1]}}`);
      }
      return [node];
    }
    if (node.children) return [{ ...node, children: expandDictionaryInHast(node.children, dictionary) }];
    return [node];
  });
}

/**
 * Parses `source` as Markdown and returns hast children, for embedding inside
 * hastscript `h(...)` calls that allow flow content (e.g. <aside>, <div>, <dd>).
 */
export function markdownToHast(source: string, dictionary: Record<string, string> = {}): any[] {
  const hast = processor.runSync(processor.parse(source)) as any;
  if (!source.includes('${')) return hast.children;
  return expandDictionaryInHast(hast.children, dictionary);
}

/**
 * Same as markdownToHast, but for phrasing-content-only contexts (e.g. <span>):
 * a lone top-level paragraph is unwrapped to its inline children instead of
 * being wrapped in a block-level <p>.
 */
export function markdownToInlineHast(source: string, dictionary: Record<string, string> = {}): any[] {
  const children = markdownToHast(source, dictionary);
  if (children.length === 1 && children[0].type === 'element' && children[0].tagName === 'p') {
    return children[0].children;
  }
  return children;
}
