import Ajv2020 from 'ajv/dist/2020.js';
import type { ValidateFunction } from 'ajv';
import type { GameSchema } from './types.js';

export interface ComponentValidationResult {
  valid: boolean;
  /** true when there was no schema to check against (zero-config mode) */
  unchecked?: boolean;
  errors?: string[];
}

export type ValidateState = (value: Record<string, unknown>) => Record<string, ComponentValidationResult>;

/**
 * `gameSchema` is optional: without a Plugin (zero-config `./docs` workflow) there is
 * nothing to validate against, so every component is reported as `unchecked` rather
 * than invalid — StateBlocks still render via the generic fallback renderer.
 */
export function createValidator(gameSchema: GameSchema | null): ValidateState {
  if (!gameSchema) {
    return (value) =>
      Object.fromEntries(Object.keys(value).map((name) => [name, { valid: true, unchecked: true }]));
  }

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const compiled: Record<string, ValidateFunction> = Object.fromEntries(
    Object.entries(gameSchema.components).map(([name, schema]) => [name, ajv.compile(schema)]),
  );

  return (value) => {
    const results: Record<string, ComponentValidationResult> = {};
    for (const [componentName, componentValue] of Object.entries(value)) {
      const check = compiled[componentName];
      if (!check) {
        results[componentName] = {
          valid: false,
          errors: [`Unknown component "${componentName}" (not defined in game schema "${gameSchema.id}")`],
        };
        continue;
      }
      const valid = check(componentValue);
      results[componentName] = valid
        ? { valid: true }
        : { valid: false, errors: check.errors?.map((e) => `${e.instancePath || '/'} ${e.message}`) };
    }
    return results;
  };
}
