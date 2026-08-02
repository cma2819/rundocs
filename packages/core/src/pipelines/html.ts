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
  genericBlockRenderer,
  genericComponentRenderer,
  noteKindRenderer,
  routeKindRenderer,
} from '@rundocs/renderer-html';
import { remarkBlockDirective } from '../remark-block-directive.js';
import { remarkValidateBlock } from '../remark-validate-block.js';
import { BlockRegistry } from '../block-registry.js';
import { stateBlockHandler } from '../blocks/state-block-handler.js';
import { noteBlockHandler } from '../blocks/note-block-handler.js';
import { routeBlockHandler } from '../blocks/route-block-handler.js';

export function createHtmlRegistry(): RendererRegistry<any> {
  return new RendererRegistry(genericComponentRenderer);
}

/**
 * Built-in block kinds. "state" is registered both by name and as the
 * BlockRegistry fallback — see stateBlockHandler's doc comment for why.
 * Plugins that want to add their own block kinds pass a registry built on
 * top of this one (not implemented yet — see ARCHITECTURE.md §7/§8).
 */
export function createBlockRegistry(): BlockRegistry {
  const registry = new BlockRegistry();
  registry.register('state', stateBlockHandler);
  registry.register('note', noteBlockHandler);
  registry.register('route', routeBlockHandler);
  registry.setFallback(stateBlockHandler);
  return registry;
}

export function createHtmlPipeline(gameSchema: GameSchema | null, componentRegistry: RendererRegistry<any>) {
  const blockRegistry = createBlockRegistry();

  const blockRenderers = new BlockRendererRegistry<any>(genericBlockRenderer);
  blockRenderers.register('state', createStateKindRenderer(componentRegistry));
  blockRenderers.register('note', noteKindRenderer);
  blockRenderers.register('route', routeKindRenderer);

  return unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkBlockDirective, { registry: blockRegistry })
    .use(remarkValidateBlock, { registry: blockRegistry, gameSchema })
    .use(remarkRehype, { handlers: { block: createBlockHandler(blockRenderers) }, allowDangerousHtml: false })
    .use(rehypeStringify);
}
