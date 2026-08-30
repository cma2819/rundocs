import type { SemanticComponent } from '@rundocs/renderer-core';
import type { BlockHandler, ParsedBlockBody } from '../block-handler.js';

/**
 * Timing information for the operation that follows it (e.g. "before the boss
 * fight"). Plain prose, no YAML/Schema involved — same shape as noteBlockHandler.
 */
export const whenBlockHandler: BlockHandler = {
  kind: 'when',

  parse(raw: string): ParsedBlockBody {
    return { value: { text: raw.trim() }, diagnostics: [] };
  },

  validate(): [] {
    return [];
  },

  toSemantic(value): SemanticComponent[] {
    const text = typeof value.text === 'string' ? value.text : '';
    return [{ name: 'when', schema: null, value, fields: [{ key: 'text', value: text, displayName: 'when' }] }];
  },
};
