import type { GameSchema } from '@rundocs/schema';
import type { Diagnostic, SemanticComponent } from '@rundocs/renderer-core';

export interface ParsedBlockBody {
  value: Record<string, unknown>;
  /** `line`, if set, is relative to the first line of the block body (1-indexed);
   *  the caller offsets it by the block's position to get an absolute document line. */
  diagnostics: Diagnostic[];
}

/**
 * Interprets one `:::name ... :::` directive's raw body. A BlockHandler owns the
 * full semantic pipeline for its kind: parsing, Schema validation, and building
 * the SemanticComponent[] a Renderer consumes. Different kinds don't have to agree
 * on anything beyond this interface — a "note" handler can ignore YAML entirely.
 */
export interface BlockHandler {
  /** stable identifier a BlockRendererRegistry dispatches on (see @rundocs/renderer-core) */
  kind: string;
  /** raw directive body -> structured value. Must never throw — parse failures become diagnostics. */
  parse(raw: string): ParsedBlockBody;
  validate(value: Record<string, unknown>, gameSchema: GameSchema | null): Diagnostic[];
  toSemantic(value: Record<string, unknown>, gameSchema: GameSchema | null): SemanticComponent[];
}
