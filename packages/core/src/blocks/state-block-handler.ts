import { parseDocument } from 'yaml';
import { createValidator } from '@rundocs/schema';
import type { GameSchema } from '@rundocs/schema';
import type { Diagnostic, SemanticComponent } from '@rundocs/renderer-core';
import type { BlockHandler, ParsedBlockBody } from '../block-handler.js';
import { toSemanticState } from '../semantic.js';

/**
 * The reference BlockHandler — declarative "key: value" state, YAML-parsed and
 * optionally validated against a GameSchema. Registered under the "state" name
 * AND set as the BlockRegistry fallback: it's the most generic interpretation
 * available (no Schema required, degrades to identity display-names), so an
 * unrecognized ":::whatever" still renders as structured state instead of being
 * silently dropped.
 */
export const stateBlockHandler: BlockHandler = {
  kind: 'state',

  parse(raw: string): ParsedBlockBody {
    const doc = parseDocument(raw);
    const diagnostics: Diagnostic[] = doc.errors.map((e) => ({
      severity: 'error',
      message: e.message,
      line: e.linePos?.[0]?.line,
    }));

    const parsed = doc.toJS() ?? {};
    if (typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        value: {},
        diagnostics: [
          ...diagnostics,
          { severity: 'error', message: 'Block content must be a YAML mapping ("key: value"), not a scalar or list.' },
        ],
      };
    }

    return { value: parsed as Record<string, unknown>, diagnostics };
  },

  validate(value, gameSchema: GameSchema | null): Diagnostic[] {
    const validate = createValidator(gameSchema);
    const results = validate(value);
    return Object.entries(results)
      .filter(([, r]) => !r.valid)
      .flatMap(([componentName, r]) =>
        (r.errors ?? []).map((message): Diagnostic => ({ severity: 'error', message: `[${componentName}] ${message}` })),
      );
  },

  toSemantic(value, gameSchema: GameSchema | null): SemanticComponent[] {
    return toSemanticState(value, gameSchema);
  },
};
