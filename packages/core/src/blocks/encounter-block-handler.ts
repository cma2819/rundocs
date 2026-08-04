import { parseDocument } from 'yaml';
import type { Diagnostic, SemanticComponent } from '@rundocs/renderer-core';
import type { BlockHandler, ParsedBlockBody } from '../block-handler.js';

function describeType(v: unknown): string {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

/**
 * A one-shot record of a turn-based encounter (e.g. a boss fight): who fought,
 * what happened turn by turn, and any notes — unlike "state", which is a
 * persistent snapshot. Deliberately genre-neutral (not "battle"), same
 * reasoning as why "route" isn't named after any one genre's movement mechanic.
 * No GameSchema involvement (character/action are always free strings). Both
 * the top-level "note" (whole encounter) and each turn's "note" are optional.
 */
export const encounterBlockHandler: BlockHandler = {
  kind: 'encounter',

  parse(raw: string): ParsedBlockBody {
    const doc = parseDocument(raw);
    const diagnostics: Diagnostic[] = doc.errors.map((e) => ({
      severity: 'error',
      message: e.message,
      line: e.linePos?.[0]?.line,
    }));

    const parsed = doc.toJS() ?? {};
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {
        value: { turns: [] },
        diagnostics: [
          ...diagnostics,
          { severity: 'error', message: 'Encounter block content must be a YAML mapping ("key: value"), not a scalar or list.' },
        ],
      };
    }

    const value = parsed as Record<string, unknown>;

    if ('title' in value && typeof value.title !== 'string') {
      diagnostics.push({ severity: 'warning', message: `"title" should be a string (got ${describeType(value.title)}).` });
    }

    if ('note' in value && typeof value.note !== 'string') {
      diagnostics.push({ severity: 'warning', message: `"note" should be a string (got ${describeType(value.note)}).` });
    }

    let turns: unknown[] = [];
    if ('turns' in value) {
      if (!Array.isArray(value.turns)) {
        diagnostics.push({ severity: 'error', message: '"turns" must be a YAML list of turns.' });
      } else {
        turns = value.turns;
      }
    }

    turns.forEach((rawTurn, i) => {
      if (typeof rawTurn !== 'object' || rawTurn === null || Array.isArray(rawTurn)) {
        diagnostics.push({ severity: 'error', message: `turns[${i}] must be a mapping (e.g. { actions: [...], note: "..." }).` });
        return;
      }
      const turn = rawTurn as Record<string, unknown>;

      if ('note' in turn && typeof turn.note !== 'string') {
        diagnostics.push({ severity: 'warning', message: `turns[${i}].note should be a string (got ${describeType(turn.note)}).` });
      }

      if ('actions' in turn && !Array.isArray(turn.actions)) {
        diagnostics.push({ severity: 'error', message: `turns[${i}].actions must be a YAML list of actions.` });
        return;
      }

      ((turn.actions as unknown[] | undefined) ?? []).forEach((rawAction, j) => {
        if (typeof rawAction !== 'object' || rawAction === null || Array.isArray(rawAction)) {
          diagnostics.push({ severity: 'error', message: `turns[${i}].actions[${j}] must be a mapping with "character" and "action" keys.` });
          return;
        }
        const action = rawAction as Record<string, unknown>;

        if (!('character' in action)) {
          diagnostics.push({ severity: 'error', message: `turns[${i}].actions[${j}] is missing required "character".` });
        } else if (typeof action.character !== 'string') {
          diagnostics.push({ severity: 'error', message: `turns[${i}].actions[${j}].character must be a string (got ${describeType(action.character)}).` });
        }

        if (!('action' in action)) {
          diagnostics.push({ severity: 'error', message: `turns[${i}].actions[${j}] is missing required "action".` });
        } else if (typeof action.action !== 'string') {
          diagnostics.push({ severity: 'error', message: `turns[${i}].actions[${j}].action must be a string (got ${describeType(action.action)}).` });
        }
      });
    });

    return { value: { ...value, turns }, diagnostics };
  },

  validate(): Diagnostic[] {
    return [];
  },

  toSemantic(value): SemanticComponent[] {
    const turns = Array.isArray(value.turns) ? (value.turns as Record<string, unknown>[]) : [];
    return [
      {
        name: 'encounter',
        schema: null,
        value,
        fields: turns.map((turn, i) => ({ key: String(i), value: turn, displayName: `Turn ${i + 1}` })),
      },
    ];
  },
};
