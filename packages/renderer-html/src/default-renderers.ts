import { h } from 'hastscript';
import type { ComponentRenderer } from '@rundocs/renderer-core';

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
