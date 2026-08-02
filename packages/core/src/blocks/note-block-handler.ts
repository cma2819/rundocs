import type { SemanticComponent } from '@rundocs/renderer-core';
import type { BlockHandler, ParsedBlockBody } from '../block-handler.js';

/**
 * Example of a genuinely different block kind: plain prose, no YAML/Schema
 * involved at all. Demonstrates that BlockHandler doesn't force every ":::name"
 * into the state/YAML mold — registered separately from stateBlockHandler.
 */
export const noteBlockHandler: BlockHandler = {
  kind: 'note',

  parse(raw: string): ParsedBlockBody {
    return { value: { text: raw.trim() }, diagnostics: [] };
  },

  validate(): [] {
    return [];
  },

  toSemantic(value): SemanticComponent[] {
    const text = typeof value.text === 'string' ? value.text : '';
    return [{ name: 'note', schema: null, value, fields: [{ key: 'text', value: text, displayName: 'Note' }] }];
  },
};
