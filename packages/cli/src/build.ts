import fg from 'fast-glob';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { createHtmlPipeline, createHtmlRegistry } from '@rundocs/core';
import { wrapDocument } from '@rundocs/renderer-html';
import type { ResolvedInput } from './resolve-input.js';

export interface PageResult {
  source: string;
  output: string;
  errorCount: number;
}

export interface BuildResult {
  outDir: string;
  pages: PageResult[];
}

function countErrors(html: string): number {
  return (html.match(/state-block--error/g) ?? []).length;
}

function renderIndex(pages: PageResult[]): string {
  const items = pages
    .map((p) => `<li><a href="${p.output}">${p.source}</a>${p.errorCount ? ` — ⚠ ${p.errorCount}` : ''}</li>`)
    .join('\n');
  return wrapDocument(`<h1>Runbooks</h1>\n<ul>${items}</ul>`, 'Runbooks');
}

export async function build(resolved: ResolvedInput, outDirName = 'dist'): Promise<BuildResult> {
  const { workspaceRoot, config, watchGlob } = resolved;
  const files = await fg(watchGlob, { cwd: workspaceRoot, absolute: true, ignore: [`${outDirName}/**`] });

  const registry = createHtmlRegistry();
  for (const [name, renderer] of Object.entries(config?.plugin?.renderers?.html ?? {})) {
    registry.register(name, renderer);
  }

  const gameSchema = config?.plugin?.gameSchema ?? null;
  const pipeline = createHtmlPipeline(gameSchema, registry);

  const outDir = join(workspaceRoot, outDirName);
  const pages: PageResult[] = [];

  for (const file of files.sort()) {
    const raw = await readFile(file, 'utf8');
    const vfile = await pipeline.process({ value: raw, path: file } as never);
    const bodyHtml = String(vfile);
    const rel = relative(workspaceRoot, file).replace(/\\/g, '/');
    const outRel = rel.replace(/\.md$/, '.html');
    const outFile = join(outDir, outRel);

    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, wrapDocument(bodyHtml, rel), 'utf8');
    pages.push({ source: rel, output: outRel, errorCount: countErrors(bodyHtml) });
  }

  if (!pages.some((p) => p.output === 'index.html')) {
    await writeFile(join(outDir, 'index.html'), renderIndex(pages), 'utf8');
  }

  return { outDir, pages };
}
