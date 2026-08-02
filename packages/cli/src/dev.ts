import { watch } from 'chokidar';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { build, type BuildResult } from './build.js';
import type { ResolvedInput } from './resolve-input.js';

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

export async function dev(resolved: ResolvedInput, port = 4173): Promise<void> {
  let result: BuildResult = await build(resolved);
  console.log(`[rundocs] built ${result.pages.length} page(s) from ${resolved.workspaceRoot} (${resolved.resolvedBy})`);

  const server = createServer(async (req, res) => {
    const urlPath = req.url === '/' || !req.url ? '/index.html' : decodeURIComponent(req.url);
    try {
      const body = await readFile(join(result.outDir, urlPath));
      res.writeHead(200, { 'Content-Type': MIME[extname(urlPath)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });

  server.listen(port, () => {
    const entry = resolved.initialFile ? resolved.initialFile.replace(/\.md$/, '.html') : '';
    console.log(`[rundocs] serving http://localhost:${port}/${entry}`);
  });

  // NOTE: rebuild-on-change only — no live browser reload (websocket) yet, see ARCHITECTURE.md roadmap.
  // chokidar v4 dropped glob-pattern support entirely, so we watch the workspace
  // directory recursively and filter by filename in the handler instead of passing
  // "**/*.md" as a pattern (that string is treated as a literal, non-existent path in v4).
  //
  // usePolling: native fs-change notifications aren't reliable in every dev environment
  // (network drives, some sandboxed/containerized filesystems) — polling is slower but
  // always works, and a docs-authoring tool doesn't need sub-100ms reaction time.
  const watcher = watch(resolved.workspaceRoot, {
    ignoreInitial: true,
    usePolling: true,
    interval: 300,
    recursive: true,
  });
  watcher.on('all', async (event, path) => {
    const isRelevant = path.endsWith('.md') || path.endsWith('rundocs.config.ts');
    if (!isRelevant || path.split(/[\\/]/).includes('dist')) return;

    console.log(`[rundocs] ${event}: ${path} -> rebuilding`);
    try {
      result = await build(resolved);
      console.log(`[rundocs] rebuilt ${result.pages.length} page(s)`);
    } catch (err) {
      console.error('[rundocs] build failed:', err);
    }
  });
}
