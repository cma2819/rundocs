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

export interface DictionaryTermNode {
  type: 'dictionaryTerm';
  /** the "${key}" placeholder's key */
  key: string;
  /** default-locale text resolved at build time; other locales are embedded client-side */
  value: string;
  position?: Position;
}

/** Same as DictionaryTermNode, but for a `` `${key}` `` whose entire inline-code span is the placeholder — keeps the <code> styling while still being switchable. */
export interface DictionaryCodeTermNode {
  type: 'dictionaryCodeTerm';
  key: string;
  value: string;
  position?: Position;
}

declare module 'mdast' {
  interface RootContentMap {
    block: BlockNode & import('mdast').Node;
    dictionaryTerm: DictionaryTermNode & import('mdast').Node;
    dictionaryCodeTerm: DictionaryCodeTermNode & import('mdast').Node;
  }
}
