import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { GameSchema } from '@rundocs/schema';
import type { BlockRegistry } from './block-registry.js';
import type { BlockNode } from './mdast-types.js';

export interface RemarkValidateBlockOptions {
  registry: BlockRegistry;
  gameSchema: GameSchema | null;
}

export function remarkValidateBlock({ registry, gameSchema }: RemarkValidateBlockOptions) {
  return (tree: Root) => {
    visit(tree, 'block', (node: unknown) => {
      const block = node as BlockNode;
      const handler = registry.resolve(block.name);

      const validationErrors = handler.validate(block.value, gameSchema).map((d) => ({
        ...d,
        line: d.line ?? block.position?.start.line,
      }));

      block.diagnostics = [...block.diagnostics, ...validationErrors];
      block.semantic = handler.toSemantic(block.value, gameSchema);
    });
  };
}
