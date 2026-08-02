import { existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RundocsConfig } from '@rundocs/core';

export interface ResolvedInput {
  workspaceRoot: string;
  config: RundocsConfig | null;
  watchGlob: string;
  /** set only when the positional argument pointed at a single file */
  initialFile: string | null;
  resolvedBy: 'arg' | 'config' | 'docs-convention' | 'cwd-fallback';
}

const CONFIG_FILENAME = 'rundocs.config.ts';

function findConfigDir(startDir: string): string | null {
  let dir = resolve(startDir);
  while (true) {
    if (existsSync(join(dir, CONFIG_FILENAME))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

async function loadConfig(dir: string): Promise<RundocsConfig> {
  const mod = await import(pathToFileURL(join(dir, CONFIG_FILENAME)).href);
  return mod.default as RundocsConfig;
}

export async function resolveInput(cwd: string, positional?: string): Promise<ResolvedInput> {
  // 1. positional argument narrows the workspace itself (not just the initial page)
  if (positional) {
    const abs = resolve(cwd, positional);
    const isDir = existsSync(abs) && statSync(abs).isDirectory();
    const workspaceRoot = isDir ? abs : dirname(abs);
    const config = existsSync(join(workspaceRoot, CONFIG_FILENAME)) ? await loadConfig(workspaceRoot) : null;
    return {
      workspaceRoot,
      config,
      watchGlob: config?.source ?? '**/*.md',
      initialFile: isDir ? null : abs,
      resolvedBy: 'arg',
    };
  }

  // 2. rundocs.config.ts found by ancestor search
  const configDir = findConfigDir(cwd);
  if (configDir) {
    const config = await loadConfig(configDir);
    return { workspaceRoot: configDir, config, watchGlob: config.source ?? '**/*.md', initialFile: null, resolvedBy: 'config' };
  }

  // 3. ./docs convention (mdBook / VitePress / Docusaurus style zero-config default)
  const docsDir = join(cwd, 'docs');
  if (existsSync(docsDir) && statSync(docsDir).isDirectory()) {
    return { workspaceRoot: docsDir, config: null, watchGlob: '**/*.md', initialFile: null, resolvedBy: 'docs-convention' };
  }

  // 4. last-resort fallback — always warn, never silently scan the whole cwd
  console.warn(`[rundocs] No rundocs.config.ts or ./docs found — watching entire ${cwd}`);
  return { workspaceRoot: cwd, config: null, watchGlob: '**/*.md', initialFile: null, resolvedBy: 'cwd-fallback' };
}
