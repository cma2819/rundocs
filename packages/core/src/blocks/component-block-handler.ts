import { createValidator } from '@rundocs/schema';
import type { GameSchema } from '@rundocs/schema';
import type { Diagnostic, SemanticComponent } from '@rundocs/renderer-core';
import type { BlockHandler, ParsedBlockBody } from '../block-handler.js';
import { toSemanticState } from '../semantic.js';
import { parseYamlMapping } from './parse-yaml-mapping.js';

/**
 * Lets a single GameSchema component be authored as its own ":::name" block
 * (e.g. ":::equip ... :::") instead of always nesting it inside ":::state" as
 * a top-level key. Wraps the raw body as `{ [componentName]: value }` — the
 * exact shape stateBlockHandler already validates/interprets — so it reuses
 * createValidator/toSemanticState verbatim instead of duplicating logic.
 * `kind` stays "state" so the existing state-kind renderer (and whatever
 * per-component ComponentRenderer a Plugin registered) applies unchanged.
 */
export function createComponentBlockHandler(componentName: string): BlockHandler {
  return {
    kind: 'state',

    parse(raw: string): ParsedBlockBody {
      return parseYamlMapping(
        raw,
        `":::${componentName}" content must be a YAML mapping ("key: value"), not a scalar or list.`,
      );
    },

    validate(value, gameSchema: GameSchema | null): Diagnostic[] {
      const validate = createValidator(gameSchema);
      const results = validate({ [componentName]: value });
      return Object.entries(results)
        .filter(([, r]) => !r.valid)
        .flatMap(([, r]) =>
          (r.errors ?? []).map((message): Diagnostic => ({ severity: 'error', message: `[${componentName}] ${message}` })),
        );
    },

    toSemantic(value, gameSchema: GameSchema | null): SemanticComponent[] {
      return toSemanticState({ [componentName]: value }, gameSchema);
    },
  };
}
