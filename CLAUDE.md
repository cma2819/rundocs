# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](AGENTS.md) for commands, architecture, and repository conventions — it applies to
any coding agent working in this repo and is the primary source of truth. Read it first.

## Claude Code-specific notes

- Before implementing a design of non-trivial scale (e.g. a new game Plugin: GameSchema +
  Component Schemas + Renderers, a new Block kind, or anything that requires several interlocking
  modeling decisions), enter Plan mode first and get the shape confirmed before writing files —
  even when the architecture to mirror (e.g. `plugins/plugin-oot`) is already well understood.
  Small/local fixes don't need this.
