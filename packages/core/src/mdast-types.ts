import type { Position } from 'unist';
import type { Diagnostic, SemanticComponent } from '@rundocs/renderer-core';

export type { Diagnostic };

export interface BlockNode {
  type: 'block';
  /** the directive name exactly as written after ":::" */
  name: string;
  /** the BlockHandler.kind that interpreted this block (may differ from `name` when it fell back) */
  kind: string;
  /** raw directive body, exactly as written (no re-serialization) */
  raw: string;
  /** BlockHandler.parse() result, before validation */
  value: Record<string, unknown>;
  /** populated by remarkValidateBlock */
  semantic?: SemanticComponent[];
  diagnostics: Diagnostic[];
  position?: Position;
  data?: { hName?: string };
}

declare module 'mdast' {
  interface RootContentMap {
    block: BlockNode & import('mdast').Node;
  }
}
