import type { Position } from 'unist';
import type { SemanticComponent } from '@rundocs/renderer-core';

export interface Diagnostic {
  severity: 'error' | 'warning';
  message: string;
  line?: number;
}

export interface StateBlockNode {
  type: 'stateBlock';
  /** the directive identifier right after ":::" — selects which block kind this is */
  name: string;
  /** raw YAML source text, exactly as written (no re-serialization) */
  raw: string;
  /** yaml.parse() result, before schema validation */
  value: Record<string, unknown>;
  /** populated by remarkValidateState */
  semantic?: SemanticComponent[];
  diagnostics: Diagnostic[];
  position?: Position;
  data?: { hName?: string };
}

declare module 'mdast' {
  interface RootContentMap {
    stateBlock: StateBlockNode & import('mdast').Node;
  }
}
