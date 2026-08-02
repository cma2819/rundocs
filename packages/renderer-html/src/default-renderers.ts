import { h } from 'hastscript';
import type { BlockRenderer, ComponentRenderer } from '@rundocs/renderer-core';

/**
 * Zero-configuration renderer: works for any component, whether or not a
 * ComponentSchema exists for it. Plugins can override per-component-name via
 * RendererRegistry.register() to produce a richer layout (grid, icons, etc).
 */
export const genericComponentRenderer: ComponentRenderer<any> = (component) => {
  const title = component.schema?.['x-ui']?.displayName ?? component.name;
  const icon = component.schema?.['x-ui']?.icon;

  return h('section', { class: `component component--${component.name}` }, [
    h('h3', {}, [icon ? h('span', { class: `icon icon--${icon}` }) : null, title].filter(Boolean) as any),
    h(
      'dl',
      {},
      component.fields.flatMap((f) => [
        h('dt', {}, [f.icon ? h('span', { class: `icon icon--${f.icon}` }) : null, f.displayName].filter(Boolean) as any),
        h('dd', {}, String(f.value)),
      ]),
    ),
  ]);
};

/**
 * BlockRendererRegistry fallback: presentation for any block `kind` that has no
 * dedicated renderer registered (e.g. a Plugin adds a new BlockHandler but the
 * HTML renderer package hasn't caught up yet). Never hides content — worst case
 * it dumps the raw directive body so nothing silently disappears.
 */
export const genericBlockRenderer: BlockRenderer<any> = (block) => {
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

  return h('div', { class: `block block--unknown block--${block.kind}` }, [
    h('p', {}, `":::${block.name}" (kind "${block.kind}") has no dedicated renderer — showing raw content.`),
    h('pre', {}, block.raw),
  ]);
};
