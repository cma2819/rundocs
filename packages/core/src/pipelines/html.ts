import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { GameSchema } from '@rundocs/schema';
import { RendererRegistry, BlockRendererRegistry } from '@rundocs/renderer-core';
import {
  createBlockHandler,
  createStateKindRenderer,
  encounterKindRenderer,
  genericBlockRenderer,
  genericComponentRenderer,
  noteKindRenderer,
  routeKindRenderer,
} from '@rundocs/renderer-html';
import { remarkBlockDirective } from '../remark-block-directive.js';
import { remarkValidateBlock } from '../remark-validate-block.js';
import { remarkCollectHeadings } from '../remark-collect-headings.js';
import { BlockRegistry } from '../block-registry.js';
import { stateBlockHandler } from '../blocks/state-block-handler.js';
import { noteBlockHandler } from '../blocks/note-block-handler.js';
import { routeBlockHandler } from '../blocks/route-block-handler.js';
import { encounterBlockHandler } from '../blocks/encounter-block-handler.js';
import { createComponentBlockHandler } from '../blocks/component-block-handler.js';

export function createHtmlRegistry(): RendererRegistry<any> {
  return new RendererRegistry(genericComponentRenderer);
}

/**
 * Every GameSchema component is auto-registered under its own name (e.g. a
 * "equip" component gets a ":::equip" block, wrapping/delegating to the same
 * state semantics as writing it nested inside ":::state") — no Plugin-side
 * registration needed. Built-ins are registered after, so "state"/"note"/
 * "route" stay reserved even if some game happens to name a component the
 * same. "state" is also set as the BlockRegistry fallback — see
 * stateBlockHandler's doc comment for why.
 */
export function createBlockRegistry(gameSchema: GameSchema | null): BlockRegistry {
  const registry = new BlockRegistry();
  for (const name of Object.keys(gameSchema?.components ?? {})) {
    registry.register(name, createComponentBlockHandler(name));
  }
  registry.register('state', stateBlockHandler);
  registry.register('note', noteBlockHandler);
  registry.register('route', routeBlockHandler);
  registry.register('encounter', encounterBlockHandler);
  registry.setFallback(stateBlockHandler);
  return registry;
}

export function createHtmlPipeline(gameSchema: GameSchema | null, componentRegistry: RendererRegistry<any>) {
  const blockRegistry = createBlockRegistry(gameSchema);

  const blockRenderers = new BlockRendererRegistry<any>(genericBlockRenderer);
  blockRenderers.register('state', createStateKindRenderer(componentRegistry));
  blockRenderers.register('note', noteKindRenderer);
  blockRenderers.register('route', routeKindRenderer);
  blockRenderers.register('encounter', encounterKindRenderer);

  return unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkCollectHeadings)
    .use(remarkBlockDirective, { registry: blockRegistry })
    .use(remarkValidateBlock, { registry: blockRegistry, gameSchema })
    .use(remarkRehype, { handlers: { block: createBlockHandler(blockRenderers) }, allowDangerousHtml: false })
    .use(rehypeStringify);
}
