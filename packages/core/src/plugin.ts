import type { GameSchema } from '@rundocs/schema';
import type { ComponentRenderer } from '@rundocs/renderer-core';

export interface RundocsPlugin {
  id: string;
  gameSchema: GameSchema;
  renderers?: {
    html?: Record<string, ComponentRenderer<any>>;
  };
}

export function definePlugin(plugin: RundocsPlugin): RundocsPlugin {
  return plugin;
}

export interface RundocsConfig {
  plugin?: RundocsPlugin;
  /** glob relative to the config file's directory. Default: "**\/*.md" */
  source?: string;
}

export function defineConfig(config: RundocsConfig): RundocsConfig {
  return { source: '**/*.md', ...config };
}
