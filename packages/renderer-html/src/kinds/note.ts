import { h } from 'hastscript';
import type { BlockRenderer } from '@rundocs/renderer-core';
import { markdownToHast } from '../markdown.js';

/** Presentation for BlockHandler.kind === "note": Markdown prose aside, no components involved. */
export const noteKindRenderer: BlockRenderer<any> = (block) => {
  const text = typeof block.value.text === 'string' ? block.value.text : '';
  return h('aside', { class: 'block block--note' }, markdownToHast(text));
};
