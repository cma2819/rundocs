import type { GameSchema } from '@rundocs/schema';
import type { SemanticComponent, SemanticField } from '@rundocs/renderer-core';

export function toSemanticState(
  value: Record<string, unknown>,
  gameSchema: GameSchema | null,
): SemanticComponent[] {
  return Object.entries(value).map(([name, componentValue]) => {
    const schema = gameSchema?.components[name] ?? null;
    const raw = (componentValue ?? {}) as Record<string, unknown>;

    const fields: SemanticField[] = Object.entries(raw).map(([key, v]) => {
      const propSchema = schema?.properties?.[key];
      return {
        key,
        value: v,
        displayName: propSchema?.['x-ui']?.displayName ?? key,
        icon: propSchema?.['x-ui']?.icon,
      };
    });

    return { name, schema, value: raw, fields };
  });
}
