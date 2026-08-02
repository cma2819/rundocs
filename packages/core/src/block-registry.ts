import type { BlockHandler } from './block-handler.js';

/**
 * Semantic-layer registry: maps a directive's literal name (":::name") to the
 * BlockHandler that interprets it. This is what makes new block kinds addable
 * without touching the remark plugins — register a handler, and any document
 * that writes ":::yourName" starts flowing through it.
 */
export class BlockRegistry {
  private handlers = new Map<string, BlockHandler>();
  private fallback: BlockHandler | null = null;

  register(name: string, handler: BlockHandler): void {
    this.handlers.set(name, handler);
  }

  /** The handler used for any directive name that isn't explicitly registered.
   *  Should be the most generic interpretation available — see stateBlockHandler. */
  setFallback(handler: BlockHandler): void {
    this.fallback = handler;
  }

  resolve(name: string): BlockHandler {
    const handler = this.handlers.get(name) ?? this.fallback;
    if (!handler) {
      throw new Error(`No BlockHandler registered for ":::${name}" and no fallback was set on this BlockRegistry`);
    }
    return handler;
  }
}
