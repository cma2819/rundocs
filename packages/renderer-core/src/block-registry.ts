import type { BlockRenderer, RenderContext, SemanticBlock } from './types.js';

/**
 * Presentation-layer registry: dispatches by BlockHandler `kind`, not by the
 * literal directive name. Mirrors RendererRegistry (component-name -> renderer)
 * one level up: this picks a renderer per *block kind* (e.g. "state", "note").
 */
export class BlockRendererRegistry<TOut> {
  private renderers = new Map<string, BlockRenderer<TOut>>();

  constructor(private fallback: BlockRenderer<TOut>) {}

  register(kind: string, renderer: BlockRenderer<TOut>): void {
    this.renderers.set(kind, renderer);
  }

  render(block: SemanticBlock, ctx: RenderContext): TOut {
    return (this.renderers.get(block.kind) ?? this.fallback)(block, ctx);
  }
}
