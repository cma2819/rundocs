import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';
import { markdownToHast } from '@rundocs/renderer-html';
import { CHARACTERS, type CharacterMeta } from '../characters.js';
import { MENU_LABELS, type MenuLabels } from '../labels.js';

type MenuKind = 'weapon' | 'pictos' | 'lumina' | 'skill';

interface MenuActionNode {
  character?: string;
  kind?: MenuKind;
  note?: string;
  items?: MenuActionNode[];
}

/**
 * A record of a pause-menu session mid-run (weapon/pictos/lumina/skill
 * changes, etc.): an optional `when` timing line followed by the ordered
 * `actions` taken inside it. Each action's `character`/`kind` are validated
 * against `menu.schema.yaml`'s enums (the fixed roster / fixed menu
 * categories), so unlike `formation`/`equip`/`status` this renderer only
 * needs to translate already-valid ids to display labels, not guard against
 * arbitrary input.
 *
 * Either axis may be the "parent" for a given action, with the other axis
 * supplied per-child via `items` (e.g. "for Lune: weapon, then pictos" vs.
 * "for lumina: Maelle, then Verso") — `renderActionNode` recurses to handle
 * both directions with the same code.
 *
 * `character`/`kind` are metadata, not content, so they render as a small
 * heading-like label line (`.menu-action-heading`) — `note` is the actual
 * substance (what was done) and is parsed as Markdown (`markdownToHast`,
 * same helper `note`/`encounter`'s note fields use) so it reads as plain,
 * normal-weight prose rather than a dimmed inline aside.
 *
 * Styled as a compact left-accent card (`.state-block--menu` strips the
 * generic boxed wrapper, `.menu-card` carries the visual weight) — lighter
 * than `formation`/`equip`/`status`'s full boxed section, but unlike `skip`
 * it keeps the `<h3>` title (`.component h3`, same rule every other
 * Component uses) since a menu card has enough going on (when + a list of
 * actions) to benefit from a leading label.
 *
 * Factory-shaped so a book can supply its own id -> displayName character map
 * and/or localized kind labels while reusing this layout — same pattern as
 * `createFormationRenderer`/`createStatusRenderer`/`createSkipRenderer`.
 */
export function createMenuRenderer(
  characters: Record<string, CharacterMeta>,
  labels: MenuLabels = MENU_LABELS,
): ComponentRenderer<any> {
  const actionHeading = (node: MenuActionNode): any => {
    const characterLabel = node.character ? (characters[node.character]?.displayName ?? node.character) : undefined;
    const kindLabel = node.kind ? labels.kind[node.kind] : undefined;
    return h(
      'div',
      { class: 'menu-action-heading' },
      [
        characterLabel ? h('span', { class: 'menu-action-character' }, characterLabel) : null,
        characterLabel && kindLabel ? ' — ' : null,
        kindLabel ? h('span', { class: 'menu-action-kind' }, kindLabel) : null,
        !characterLabel && !kindLabel ? '?' : null,
      ].filter(Boolean) as any,
    );
  };

  const renderActionNode = (node: MenuActionNode): any => {
    const note = typeof node.note === 'string' ? node.note : undefined;
    const items = Array.isArray(node.items) ? node.items : [];

    return h(
      'li',
      { class: 'menu-action' },
      [
        actionHeading(node),
        note ? h('div', { class: 'menu-action-note' }, markdownToHast(note)) : null,
        items.length > 0 ? h('ul', { class: 'menu-action-items' }, items.map(renderActionNode)) : null,
      ].filter(Boolean) as any,
    );
  };

  return (component) => {
    const title = component.schema?.['x-ui']?.displayName ?? component.name;
    const when = typeof component.value.when === 'string' ? (component.value.when as string) : undefined;
    const actions = Array.isArray(component.value.actions) ? (component.value.actions as MenuActionNode[]) : [];

    return h(
      'div',
      { class: 'component component--menu menu-card' },
      [
        h('h3', {}, title),
        when ? h('div', { class: 'menu-when' }, when) : null,
        actions.length > 0 ? h('ol', { class: 'menu-actions' }, actions.map(renderActionNode)) : null,
      ].filter(Boolean) as any,
    );
  };
}

export const menuRenderer = createMenuRenderer(CHARACTERS);
