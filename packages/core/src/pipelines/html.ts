import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { GameSchema } from '@rundocs/schema';
import type { RendererRegistry } from '@rundocs/renderer-core';
import { createStateBlockHandler, genericComponentRenderer } from '@rundocs/renderer-html';
import { RendererRegistry as Registry } from '@rundocs/renderer-core';
import { remarkStateDirective } from '../remark-state-directive.js';
import { remarkValidateState } from '../remark-validate-state.js';

export function createHtmlRegistry(): RendererRegistry<any> {
  return new Registry(genericComponentRenderer);
}

export function createHtmlPipeline(gameSchema: GameSchema | null, registry: RendererRegistry<any>) {
  return unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkStateDirective, { names: ['state'] })
    .use(remarkValidateState, { gameSchema })
    .use(remarkRehype, { handlers: { stateBlock: createStateBlockHandler(registry) }, allowDangerousHtml: false })
    .use(rehypeStringify);
}
