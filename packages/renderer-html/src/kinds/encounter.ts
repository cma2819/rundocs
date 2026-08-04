import { h } from 'hastscript';
import type { BlockRenderer } from '@rundocs/renderer-core';

/**
 * Presentation for BlockHandler.kind === "encounter": a title/note followed by
 * one section per turn (headed "Turn N", not a numbered <ol> — a plain list
 * read poorly once each item has its own action sub-list and note). Reads
 * block.value directly (like note.ts) rather than block.semantic — the nested
 * turns/actions/note shape doesn't fit the flat SemanticField model. Unlike
 * note.ts/route.ts, checks diagnostics first (like state.ts) since this nested
 * shape is meaningfully more error-prone.
 */
export const encounterKindRenderer: BlockRenderer<any> = (block) => {
  const errors = block.diagnostics.filter((d) => d.severity === 'error');
  if (errors.length > 0) {
    return h('div', { class: 'state-block state-block--error' }, [
      h('p', {}, `⚠ ${block.name}: ${errors.length} error(s)`),
      h(
        'ul',
        {},
        errors.map((d) => h('li', {}, d.line ? `L${d.line}: ${d.message}` : d.message)),
      ),
    ]);
  }

  const title = typeof block.value.title === 'string' ? block.value.title : undefined;
  const note = typeof block.value.note === 'string' ? block.value.note : undefined;
  const turns = Array.isArray(block.value.turns) ? (block.value.turns as Record<string, unknown>[]) : [];

  return h(
    'div',
    { class: 'block block--encounter' },
    [
      title ? h('h3', { class: 'encounter-title' }, title) : null,
      note ? h('p', { class: 'encounter-note' }, note) : null,
      h(
        'div',
        { class: 'encounter-turns' },
        turns.map((turn, i) => {
          const actions = Array.isArray(turn.actions) ? (turn.actions as Record<string, unknown>[]) : [];
          const turnNote = typeof turn.note === 'string' ? turn.note : undefined;
          return h(
            'section',
            { class: 'encounter-turn' },
            [
              h('h4', { class: 'encounter-turn-title' }, `Turn ${i + 1}`),
              actions.length > 0
                ? h(
                    'ul',
                    { class: 'encounter-actions' },
                    actions.map((a) =>
                      h('li', {}, `${typeof a.character === 'string' ? a.character : '?'}: ${typeof a.action === 'string' ? a.action : '?'}`),
                    ),
                  )
                : null,
              turnNote ? h('p', { class: 'encounter-note' }, turnNote) : null,
            ].filter(Boolean) as any,
          );
        }),
      ),
    ].filter(Boolean) as any,
  );
};
