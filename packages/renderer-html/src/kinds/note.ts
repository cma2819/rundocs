import { h } from 'hastscript';
import type { BlockRenderer } from '@rundocs/renderer-core';

/** Presentation for BlockHandler.kind === "note": plain prose aside, no components involved. */
export const noteKindRenderer: BlockRenderer<any> = (block) => {
  const text = typeof block.value.text === 'string' ? block.value.text : '';
  return h('aside', { class: 'block block--note' }, text);
};
