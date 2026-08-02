import type { ComponentSchema } from '@rundocs/schema';
import type { Diagnostic } from './diagnostic.js';

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

/**
 * The renderer-facing view of a `:::name ... :::` block, regardless of which
 * BlockHandler interpreted it. `kind` is the BlockHandler's stable identifier
 * (picks the renderer); `name` is the literal directive name as written (may
 * differ from `kind` when an unregistered name fell back to a generic handler).
 */
export interface SemanticBlock {
  name: string;
  kind: string;
  raw: string;
  value: Record<string, unknown>;
  semantic: SemanticComponent[];
  diagnostics: Diagnostic[];
}

export type BlockRenderer<TOut> = (block: SemanticBlock, ctx: RenderContext) => TOut;
