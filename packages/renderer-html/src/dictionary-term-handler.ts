import { h } from 'hastscript';
import type { Handler } from 'mdast-util-to-hast';

/**
 * The mdast-to-hast Handler for the `dictionaryTerm` node type (produced by
 * core's remarkExpandDictionaryTerms). `data-key` is what the client-side
 * switcher script looks up when the user picks a different locale.
 */
export const dictionaryTermHandler: Handler = (_state, node: any) =>
  h('span', { class: 'rd-i18n-term', 'data-key': node.key }, node.value);

/**
 * The mdast-to-hast Handler for the `dictionaryCodeTerm` node type — a code
 * span (`` `${key}` ``) whose entire value was the placeholder. Keeps the
 * <code> styling, with the switchable span nested inside it.
 */
export const dictionaryCodeTermHandler: Handler = (_state, node: any) =>
  h('code', {}, h('span', { class: 'rd-i18n-term', 'data-key': node.key }, node.value));

const PLACEHOLDER = /\$\{([^}]+)\}/g;

/**
 * Same "${key}" detection/splitting as core's remarkExpandDictionaryTerms,
 * but for directive-block content (`:::equip`'s weapon/pictos/skills,
 * `:::encounter`'s action labels, etc.) which never passes through the
 * mdast/remark pipeline — those renderers call this directly on a plain
 * string and splice the result into their own hastscript-built tree.
 * Unresolved keys are left as literal "${key}" text, same fail-loud
 * behavior as the mdast path.
 */
export function expandDictionaryTermsToHast(text: string, dictionary: Record<string, string>): unknown[] {
  if (!text.includes('${')) return [{ type: 'text', value: text }];

  const parts: unknown[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(PLACEHOLDER)) {
    const key = match[1];
    const start = match.index ?? 0;
    if (start > lastIndex) parts.push({ type: 'text', value: text.slice(lastIndex, start) });

    const resolved = dictionary[key];
    if (resolved === undefined) {
      console.warn(`[rundocs] unresolved dictionary placeholder \${${key}}`);
      parts.push({ type: 'text', value: match[0] });
    } else {
      parts.push(h('span', { class: 'rd-i18n-term', 'data-key': key }, resolved));
    }
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: 'text', value: text.slice(lastIndex) });

  return parts;
}
