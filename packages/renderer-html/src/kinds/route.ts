import { h } from 'hastscript';
import type { BlockRenderer } from '@rundocs/renderer-core';
import { expandDictionaryTermsToHast } from '../dictionary-term-handler.js';

/** Presentation for BlockHandler.kind === "route": an ordered list of waypoints. */
export const routeKindRenderer: BlockRenderer<any> = (block, ctx) => {
  const steps = block.semantic[0]?.fields ?? [];
  return h(
    'ol',
    { class: 'block block--route', 'data-block-category': 'route' },
    steps.map((f) => h('li', {}, expandDictionaryTermsToHast(String(f.value), ctx.dictionary) as never)),
  );
};
