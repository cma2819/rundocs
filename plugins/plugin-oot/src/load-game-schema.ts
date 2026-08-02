import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from 'yaml';
import type { ComponentSchema, GameSchema } from '@rundocs/schema';

interface GameManifest {
  id: string;
  title: string;
  componentOrder?: string[];
  components: Record<string, string>;
}

/**
 * Reads the game manifest (id/title/component-name -> schema-file map) and resolves
 * each referenced Component Schema YAML file relative to the manifest's directory.
 * Keeping Schema authoring in YAML (rather than plain TS objects) is what lets
 * `x-ui`-aware JSON Schema tooling (ajv, VSCode yaml-language-server) work directly
 * on these files.
 */
export function loadGameSchema(manifestPath: string): GameSchema {
  const baseDir = dirname(manifestPath);
  const manifest = parse(readFileSync(manifestPath, 'utf8')) as GameManifest;

  const components: Record<string, ComponentSchema> = {};
  for (const [name, relativePath] of Object.entries(manifest.components)) {
    const schemaPath = join(baseDir, relativePath);
    components[name] = parse(readFileSync(schemaPath, 'utf8')) as ComponentSchema;
  }

  return {
    id: manifest.id,
    title: manifest.title,
    componentOrder: manifest.componentOrder,
    components,
  };
}
