import { visit } from 'unist-util-visit';
import type { Root, Text, InlineCode, Parent } from 'mdast';
import type { DictionaryTermNode, DictionaryCodeTermNode } from './mdast-types.js';

const PLACEHOLDER = /\$\{([^}]+)\}/g;
const WHOLE_PLACEHOLDER = /^\$\{([^}]+)\}$/;

export interface RemarkExpandDictionaryTermsOptions {
  /** default-locale key -> text; other locales are embedded client-side by wrapDocument */
  dictionary: Record<string, string>;
}

/**
 * Expands "${key}" placeholders written in Markdown prose into `dictionaryTerm`
 * nodes, resolved against the default-locale dictionary. Visits `text` nodes
 * (any match, mid-string) and `inlineCode` nodes (only a WHOLE-value match,
 * e.g. `` `${key}` `` — a code span mixing a placeholder with other literal
 * text is left untouched, since inlineCode is a Literal with no children to
 * split into). Link `url`s (a string property, not a node) stay untouched
 * either way. Unknown keys are left as literal "${key}" text plus a
 * console.warn, rather than silently dropped.
 *
 * `:::name ... :::` directive bodies are read straight from the original
 * source string by remarkBlockDirective, not from this tree, so running
 * before or after it makes no difference to directive content either way.
 */
export function remarkExpandDictionaryTerms({ dictionary }: RemarkExpandDictionaryTermsOptions) {
  return (tree: Root, file: { path?: string }) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (index === undefined || !parent || !node.value.includes('${')) return;

      const parts: Array<Text | DictionaryTermNode> = [];
      let lastIndex = 0;
      for (const match of node.value.matchAll(PLACEHOLDER)) {
        const key = match[1];
        const start = match.index ?? 0;
        if (start > lastIndex) parts.push({ type: 'text', value: node.value.slice(lastIndex, start) });

        const resolved = dictionary[key];
        if (resolved === undefined) {
          console.warn(`[rundocs] unresolved dictionary placeholder \${${key}} in ${file.path ?? '(unknown file)'}`);
          parts.push({ type: 'text', value: match[0] });
        } else {
          parts.push({ type: 'dictionaryTerm', key, value: resolved });
        }
        lastIndex = start + match[0].length;
      }
      if (parts.length === 0) return;
      if (lastIndex < node.value.length) parts.push({ type: 'text', value: node.value.slice(lastIndex) });

      (parent as Parent).children.splice(index, 1, ...(parts as never[]));
      // Resume traversal after the spliced-in nodes — otherwise visit() would
      // re-walk into the literal "${key}" text left behind for an unresolved
      // key (it still contains "${"), double-firing the warning above.
      return index + parts.length;
    });

    visit(tree, 'inlineCode', (node: InlineCode, index, parent) => {
      if (index === undefined || !parent) return;
      const match = node.value.match(WHOLE_PLACEHOLDER);
      if (!match) return;

      const key = match[1];
      const resolved = dictionary[key];
      if (resolved === undefined) {
        console.warn(`[rundocs] unresolved dictionary placeholder \${${key}} in ${file.path ?? '(unknown file)'}`);
        return;
      }
      const codeTerm: DictionaryCodeTermNode = { type: 'dictionaryCodeTerm', key, value: resolved };
      (parent as Parent).children.splice(index, 1, codeTerm as never);
    });
  };
}
