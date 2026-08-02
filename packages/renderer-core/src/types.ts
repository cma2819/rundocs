import type { ComponentSchema } from '@rundocs/schema';

export interface SemanticField {
  key: string;
  value: unknown;
  displayName: string;
  icon?: string;
}

export interface SemanticComponent {
  /** Component name = the top-level YAML key inside the StateBlock (e.g. "inventory") */
  name: string;
  /** null when there is no GameSchema for this component (zero-config mode) */
  schema: ComponentSchema | null;
  value: Record<string, unknown>;
  fields: SemanticField[];
}

export interface RenderContext {
  format: 'html' | 'cli' | 'pdf';
}

export type ComponentRenderer<TOut> = (component: SemanticComponent, ctx: RenderContext) => TOut;
