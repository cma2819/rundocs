import { parseDocument } from 'yaml';
import type { Diagnostic } from '@rundocs/renderer-core';
import type { ParsedBlockBody } from '../block-handler.js';

/**
 * Shared by any BlockHandler whose raw body must be a YAML mapping ("key: value")
 * — stateBlockHandler and createComponentBlockHandler both need exactly this.
 */
export function parseYamlMapping(raw: string, notAMappingMessage: string): ParsedBlockBody {
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
      diagnostics: [...diagnostics, { severity: 'error', message: notAMappingMessage }],
    };
  }

  return { value: parsed as Record<string, unknown>, diagnostics };
}
