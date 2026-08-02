#!/usr/bin/env node
import { resolveInput } from './resolve-input.js';
import { build } from './build.js';
import { dev } from './dev.js';

const [, , command, positional] = process.argv;

const resolved = await resolveInput(process.cwd(), positional);

switch (command) {
  case 'build': {
    const result = await build(resolved);
    console.log(`[rundocs] built ${result.pages.length} page(s) from ${resolved.workspaceRoot} (${resolved.resolvedBy}) -> ${result.outDir}`);
    for (const p of result.pages) {
      console.log(`  ${p.source} -> ${p.output}${p.errorCount ? ` (⚠ ${p.errorCount} error(s))` : ''}`);
    }
    break;
  }
  case 'dev':
    await dev(resolved);
    break;
  default:
    console.error(`Unknown command "${command ?? ''}". Usage: rundocs <build|dev> [path]`);
    process.exit(1);
}
