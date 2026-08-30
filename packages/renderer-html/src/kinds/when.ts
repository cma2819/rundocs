import { h } from 'hastscript';
import type { BlockRenderer } from '@rundocs/renderer-core';

/** Presentation for BlockHandler.kind === "when": a "when" label next to its free-text value. */
export const whenKindRenderer: BlockRenderer<any> = (block) => {
  const text = typeof block.value.text === 'string' ? block.value.text : '';
  return h('div', { class: 'block block--when' }, [
    h('span', { class: 'slot-label' }, 'when'),
    h('span', { class: 'slot-value' }, text),
  ]);
};
