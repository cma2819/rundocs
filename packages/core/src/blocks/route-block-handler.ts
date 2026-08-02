import { parseDocument } from 'yaml';
import type { Diagnostic, SemanticComponent } from '@rundocs/renderer-core';
import type { BlockHandler, ParsedBlockBody } from '../block-handler.js';

/**
 * A third example block kind, deliberately shaped unlike the other two:
 * "state" expects a YAML mapping, "note" ignores YAML entirely, "route" expects
 * a YAML *list* of waypoint strings. Proves BlockHandler doesn't constrain the
 * raw shape — each kind interprets its own body however makes sense for it.
 */
export const routeBlockHandler: BlockHandler = {
  kind: 'route',

  parse(raw: string): ParsedBlockBody {
    const doc = parseDocument(raw);
    const diagnostics: Diagnostic[] = doc.errors.map((e) => ({
      severity: 'error',
      message: e.message,
      line: e.linePos?.[0]?.line,
    }));

    const parsed = doc.toJS() ?? [];
    if (!Array.isArray(parsed)) {
      return {
        value: { steps: [] },
        diagnostics: [...diagnostics, { severity: 'error', message: 'Route block content must be a YAML list ("- step") of waypoints.' }],
      };
    }

    return { value: { steps: parsed }, diagnostics };
  },

  validate(): Diagnostic[] {
    return [];
  },

  toSemantic(value): SemanticComponent[] {
    const steps = Array.isArray(value.steps) ? value.steps : [];
    return [
      {
        name: 'route',
        schema: null,
        value,
        fields: steps.map((step, i) => ({ key: String(i), value: step, displayName: `#${i + 1}` })),
      },
    ];
  },
};
