import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { GameSchema } from '@rundocs/schema';
import { createValidator } from '@rundocs/schema';
import { toSemanticState } from './semantic.js';
import type { Diagnostic, StateBlockNode } from './mdast-types.js';

export interface RemarkValidateStateOptions {
  gameSchema: GameSchema | null;
}

export function remarkValidateState(options: RemarkValidateStateOptions) {
  const validate = createValidator(options.gameSchema);

  return (tree: Root) => {
    visit(tree, 'stateBlock', (node: unknown) => {
      const block = node as StateBlockNode;
      const results = validate(block.value);

      const errors: Diagnostic[] = Object.entries(results)
        .filter(([, r]) => !r.valid)
        .flatMap(([componentName, r]) =>
          (r.errors ?? []).map((message) => ({
            severity: 'error' as const,
            message: `[${componentName}] ${message}`,
            line: block.position?.start.line,
          })),
        );

      block.diagnostics = [...block.diagnostics, ...errors];
      block.semantic = toSemanticState(block.value, options.gameSchema);
    });
  };
}
