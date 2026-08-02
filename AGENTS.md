# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this is

`rundocs` is a Markdown-first documentation platform for speedrun runbooks. Human-readable
prose is the primary artifact; declarative game-state checkpoints (`:::state ... :::` blocks)
live inline in the same Markdown file, written in YAML. Machine-readability (Schema validation,
future AI/tooling use) is a byproduct of the Schema layer, never the primary design driver.

**Read `ARCHITECTURE.md` first** for the full design rationale — this file only covers what's
needed to navigate and modify the code quickly.

## Commands

This is an npm-workspaces monorepo (`packages/*`, `plugins/*`). There is no build step for
individual packages — each `package.json`'s `main`/`types` point directly at `./src/index.ts`,
and everything runs via `tsx` (esbuild-based TS loader), not compiled `dist/` output.

```bash
npm install                      # run after adding any new package under packages/* or plugins/*
                                  # (npm workspaces won't symlink it into node_modules until you do)

npm run build                    # rundocs build — resolves workspace per resolve-input.ts rules (see below)
npm run dev                      # rundocs dev   — same resolution, plus watch + local HTTP server

# target a specific example workspace explicitly (positional arg narrows the workspace):
npx tsx packages/cli/src/index.ts build docs
npx tsx packages/cli/src/index.ts build books/oot-sample
npx tsx packages/cli/src/index.ts dev books/oot-sample

npx tsc --noEmit                 # type-check everything under packages/*/src (tsconfig.json, no dedicated npm script)
```

There is no test suite / test runner configured in this repo yet. Verification is currently done
by building the two example workspaces (`docs/`, `books/oot-sample`) and inspecting the generated
HTML — both are useful regression fixtures since they exercise different code paths (see below).
Generated `dist/` output is gitignored; clean it up (`rm -rf docs/dist books/oot-sample/dist`)
before committing rather than leaving build artifacts around.

## Architecture

### Package dependency graph (bottom to top — respect this or you'll create a cycle)

```
schema  →  renderer-core  →  renderer-html  →  core  →  cli
                                                  ↑
                                          plugins/plugin-oot
```

- `@rundocs/schema` — `GameSchema`/`ComponentSchema` types, ajv validator. No deps.
- `@rundocs/renderer-core` — output-format-agnostic contracts: `SemanticComponent`,
  `RendererRegistry` (component-name → renderer), `SemanticBlock`, `BlockRendererRegistry`
  (block-kind → renderer), `Diagnostic`. Depends only on `schema`.
- `@rundocs/renderer-html` — the only implemented output target. Generic fallback renderers
  plus per-kind renderers (`kinds/state.ts`, `kinds/note.ts`, `kinds/route.ts`).
- `@rundocs/core` — remark/unified pipeline, `BlockHandler`/`BlockRegistry` (semantic
  interpretation), `RundocsPlugin`/`defineConfig`. Imports `renderer-html` directly to assemble
  the HTML pipeline (`pipelines/html.ts`), which is why `core` sits above it in the graph.
- `@rundocs/cli` — `resolveInput` (workspace resolution), `build`/`dev` commands.
- `plugins/plugin-oot` — an example game Plugin (Schema + custom renderer), not part of the
  dependency chain above `core`; it's a leaf that *uses* `core`/`renderer-core`/`schema`.
- `renderer-cli` / `renderer-pdf` are designed (see ARCHITECTURE.md §5) but not implemented.

### Two-tier registry: semantic interpretation vs. presentation

Every `:::name ... :::` directive becomes a single generic `block` mdast node type — there is
no per-directive-name node type. Two independent registries decide what happens to it:

1. **`BlockRegistry`** (`packages/core/src/block-registry.ts`) maps the literal directive name
   (`"state"`, `"note"`, `"route"`, ...) to a `BlockHandler` (`parse`/`validate`/`toSemantic`).
   This is the semantic layer — it turns raw text into a `SemanticComponent[]`.
2. **`BlockRendererRegistry`** (`packages/renderer-core/src/block-registry.ts`) maps a
   `BlockHandler`'s `kind` (not the directive name) to a presentation function. This is the
   output-format layer — `renderer-html` populates one per output target.

Both registries have a **fallback**: `BlockRegistry`'s fallback is `stateBlockHandler` itself
(registered under `"state"` and reused as the fallback) — an unrecognized `:::whatever` is
interpreted as generic declarative state rather than silently dropped, since "key: value" needs
no Schema to be meaningful. `BlockRendererRegistry`'s fallback (`genericBlockRenderer`) dumps raw
content in a `<pre>` for any `kind` without a dedicated renderer — nothing disappears silently.

Inside the `"state"` kind specifically there's a **third**, nested registry: `RendererRegistry`
(component name, e.g. `inventory`/`location` → `ComponentRenderer`). This is what
`RundocsPlugin.renderers.html` entries populate — see `plugins/plugin-oot/src/renderers/inventory.ts`
for an example that overrides the generic key-value renderer with a custom layout.

To add a new block kind: write a `BlockHandler` (see `packages/core/src/blocks/*.ts` for three
examples with deliberately different raw shapes — `state` expects a YAML mapping, `note` ignores
YAML entirely, `route` expects a YAML list), register it in `createBlockRegistry()`
(`packages/core/src/pipelines/html.ts`), and give it a `BlockRenderer` in the same file's
`blockRenderers.register(...)` calls.

`createBlockRegistry(gameSchema)` also auto-registers one `:::componentName` block per component
the active GameSchema defines (via `createComponentBlockHandler`, `packages/core/src/blocks/
component-block-handler.ts`) — no Plugin-side registration needed. It wraps the block's raw body
as `{ [componentName]: value }` and delegates to the same `createValidator`/`toSemanticState` path
`stateBlockHandler` uses, so e.g. a `plugin-oot` document can write either
`:::state\ninventory:\n  bombs: 10\n:::` or the equivalent `:::inventory\nbombs: 10\n:::` — both
validate and render identically (`kind` stays `"state"`, so the existing state-kind renderer and
any Plugin-registered `ComponentRenderer` apply unchanged). Component-derived handlers are
registered before the built-ins, so `state`/`note`/`route` stay reserved even if a component
happens to share one of those names.

### StateBlock raw-body extraction

`remark-block-directive.ts` re-reads the directive's body from the **original source text** by
line offset (`lines.slice(node.position.start.line, node.position.end.line - 1)`), rather than
re-serializing the directive's parsed Markdown children. This is deliberate: YAML syntax like
`- item` sequences would otherwise be misinterpreted as Markdown list items by a round-trip
through mdast. `BlockHandler.parse()` diagnostics report line numbers *relative to the block
body*; the remark plugin adds `node.position.start.line` to get the absolute document line.

### GameSchema authoring

Component Schemas are plain JSON Schema (draft 2020-12) files written in YAML, with an `x-ui`
vendor extension (`displayName`/`icon`) that ajv ignores but renderers read. A Plugin's
`game.schema.yaml` is a manifest (`{ id, title, componentOrder, components: { name: path } }`);
`load-game-schema.ts` reads and resolves it at plugin load time via `fs` + the `yaml` package —
there's no custom module loader involved. See `plugins/plugin-oot/` for the full example.

### Workspace resolution (`packages/cli/src/resolve-input.ts`)

Both `build` and `dev` resolve which directory to treat as the workspace root via, in order:

1. Positional CLI arg, if given — narrows the workspace itself (a file arg's *directory* becomes
   the workspace; it doesn't just set the initial page).
2. `rundocs.config.ts` found by walking **upward** from cwd (never descends into
   subdirectories — a config nested three levels down is invisible unless you `cd` into it or
   pass it as the positional arg).
3. `./docs` if it exists (zero-config convention, same idea as mdBook/VitePress/Docusaurus).
4. cwd itself, with a printed warning — never silently scans an unbounded tree.

`RundocsConfig.source` (default `"**/*.md"`) is a glob **relative to the config file's own
directory** — not the repo root, not the cwd `rundocs` was invoked from.

This repo intentionally hosts the `rundocs` tool source (`packages/*`, `plugins/*`) *and*
multiple example workspaces side by side — it is not itself a single "rundocs project". That's
why `docs/` and `books/oot-sample/` are separate, and why `books/oot-sample/rundocs.config.ts` is
nested there rather than at the repo root: a root-level config would make `docs/`'s zero-config
path unreachable (step 2 outranks step 3) and can only ever bind one `RundocsPlugin`/`GameSchema`,
which doesn't scale once a second game's example is added. `docs/` and `books/oot-sample/` exist
specifically to exercise both resolution paths (no-config fallback vs. Plugin-backed) as
regression fixtures — check both still build cleanly after changes to the core pipeline.

### chokidar v4 gotcha

`packages/cli/src/dev.ts`'s watcher does **not** pass a glob string to `chokidar.watch()` —
chokidar v4 dropped glob-pattern support entirely, so a pattern like `"**/*.md"` is treated as a
literal (nonexistent) path and silently matches nothing. The watcher instead watches the resolved
workspace directory recursively (`recursive: true`) and filters by filename inside the `'all'`
event handler. It also sets `usePolling: true` because native fs-change notifications aren't
reliable in every dev/sandboxed environment.
