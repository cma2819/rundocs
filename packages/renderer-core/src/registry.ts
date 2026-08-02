import type { ComponentRenderer, RenderContext, SemanticComponent } from './types.js';

export class RendererRegistry<TOut> {
  private renderers = new Map<string, ComponentRenderer<TOut>>();

  constructor(private fallback: ComponentRenderer<TOut>) {}

  register(componentName: string, renderer: ComponentRenderer<TOut>): void {
    this.renderers.set(componentName, renderer);
  }

  render(component: SemanticComponent, ctx: RenderContext): TOut {
    return (this.renderers.get(component.name) ?? this.fallback)(component, ctx);
  }
}
