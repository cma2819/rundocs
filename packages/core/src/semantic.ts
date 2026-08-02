import type { GameSchema } from '@rundocs/schema';
import type { SemanticComponent, SemanticField } from '@rundocs/renderer-core';

export function toSemanticState(
  value: Record<string, unknown>,
  gameSchema: GameSchema | null,
): SemanticComponent[] {
  return Object.entries(value).map(([name, componentValue]) => {
    const schema = gameSchema?.components[name] ?? null;

    // A component's value must be a mapping ("key: value" pairs). If it's a scalar
    // or array (e.g. "memo: some text"), Object.entries would explode a string into
    // one field per character — treat it as a single synthetic field instead.
    if (componentValue === null || typeof componentValue !== 'object' || Array.isArray(componentValue)) {
      return {
        name,
        schema,
        value: { value: componentValue } as Record<string, unknown>,
        fields: [{ key: 'value', value: componentValue, displayName: schema?.['x-ui']?.displayName ?? name }],
      };
    }

    const raw = componentValue as Record<string, unknown>;
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
