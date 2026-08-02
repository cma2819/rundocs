import { h } from 'hastscript';
import type { BlockRenderer } from '@rundocs/renderer-core';

/** Presentation for BlockHandler.kind === "route": an ordered list of waypoints. */
export const routeKindRenderer: BlockRenderer<any> = (block) => {
  const steps = block.semantic[0]?.fields ?? [];
  return h(
    'ol',
    { class: 'block block--route' },
    steps.map((f) => h('li', {}, String(f.value))),
  );
};
