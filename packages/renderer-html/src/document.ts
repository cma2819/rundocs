const CSS = `
/* ---- Typography style guide --------------------------------------------
   Every Block/Component's chrome text reuses one of two roles below instead
   of hand-rolling new font-size/font-weight pairs — this is what keeps
   different blocks reading as one system.

   Label    — a quiet, uppercase, letter-spaced tag that names something
              (a Component's title, a field group, a metadata line). Two
              sizes only: -lg for a block/Component's own title, -sm for a
              label nested inside a card. Always dimmed via opacity, never
              heavier than Emphasis.
   Emphasis — the standout fact/value next to a Label (a stat number, a
              badge, a value cell). Normal case, no dimming, heavier weight
              than Label so the two roles stay visually distinct.
   -------------------------------------------------------------------------- */
:root {
  color-scheme: light dark;
  --rd-label-weight: 600;
  --rd-label-tracking: 0.03em;
  --rd-label-opacity: 0.7;
  --rd-label-size-lg: 0.95rem;
  --rd-label-size-sm: 0.75rem;
  --rd-emphasis-weight: 700;
}
body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.65;
}
h1, h2, h3 { line-height: 1.3; }

/* Page shell: a sticky left-rail table of contents beside the reading
   column. ".toc:empty" collapses the rail (and its gap) for pages with no
   headings — e.g. the "Runbooks" index page — with no markup branching
   needed on the renderer-html side. No JS anywhere in this project, so
   narrow viewports hard-hide the rail rather than growing a JS drawer. */
.page {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1.25rem 6rem;
}
.page > main { flex: 1; min-width: 0; max-width: 46rem; }
.toc {
  position: sticky;
  top: 1.5rem;
  flex-shrink: 0;
  width: 13rem;
  font-size: 0.85rem;
}
.toc:empty { display: none; }
.toc ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
.toc a {
  display: block;
  padding: 0.15rem 0 0.15rem 0.7rem;
  color: inherit;
  text-decoration: none;
  opacity: 0.65;
  border-left: 2px solid color-mix(in srgb, currentColor 15%, transparent);
}
.toc a:hover { opacity: 1; border-left-color: currentColor; }
.toc-h2 a { padding-left: 1.4rem; }
.toc-h3 a { padding-left: 2.1rem; }
@media (max-width: 60rem) {
  .toc { display: none; }
}
.state-block {
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 1.25rem 0;
  background: color-mix(in srgb, currentColor 4%, transparent);
}
.state-block--error {
  border-color: #e5484d;
  background: color-mix(in srgb, #e5484d 12%, transparent);
}
.component { margin: 0.5rem 0; }
.component h3 {
  margin: 0 0 0.35rem;
  font-size: var(--rd-label-size-lg);
  font-weight: var(--rd-label-weight);
  text-transform: uppercase;
  letter-spacing: var(--rd-label-tracking);
  opacity: var(--rd-label-opacity);
}
.component dl { display: grid; grid-template-columns: max-content 1fr; gap: 0.15rem 0.75rem; margin: 0; }
.component dt { opacity: 0.75; }
.component dd { margin: 0; font-weight: var(--rd-emphasis-weight); }
.icon::before { content: attr(class); font-size: 0; }

/* Shared "slot grid" primitive — available to any Plugin renderer that wants a
   badge/grid layout instead of the generic key-value list (see plugin-oot's
   inventory renderer). Not component-specific: any Plugin can reuse these classes. */
.inventory-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.slot {
  display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
  min-width: 4.5rem; padding: 0.4rem 0.6rem; border-radius: 0.4rem;
  border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
  opacity: 0.55;
}
.slot--active { opacity: 1; border-color: color-mix(in srgb, currentColor 45%, transparent); }
.slot-label {
  font-size: var(--rd-label-size-sm);
  font-weight: var(--rd-label-weight);
  text-transform: uppercase;
  letter-spacing: var(--rd-label-tracking);
  opacity: var(--rd-label-opacity);
}
.slot-value { font-weight: var(--rd-emphasis-weight); }

/* Formation's <ol> stays semantic (turn order matters) but reads better as a
   left-to-right row of name chips than a numbered vertical list. */
.formation-order { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; margin: 0; padding: 0; }
.formation-member {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-weight: var(--rd-emphasis-weight);
}

/* Equip: weapon chip on its own row, then pictos (a vertical chip column)
   beside skills (a 2-column chip grid — page1/page2 land in their own
   column so index i of each page lines up on the same row), then luminas
   (an unbounded, wrapped chip row spanning both columns). */
.equip-grid { display: flex; flex-direction: column; }
.equip-card + .equip-card { border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent); margin-top: 0.75rem; padding-top: 0.75rem; }
.equip-card {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "name name" "weapon weapon" "pictos skills" "luminas luminas";
  column-gap: 1.5rem;
  row-gap: 0.5rem;
}
.equip-card h4 { grid-area: name; margin: 0; }
.equip-weapon,
.equip-pictos li,
.equip-skills-page li,
.equip-luminas li {
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
  background: color-mix(in srgb, currentColor 5%, transparent);
}
.equip-weapon { grid-area: weapon; width: fit-content; font-weight: var(--rd-emphasis-weight); }
.equip-pictos {
  grid-area: pictos;
  display: flex; flex-direction: column; gap: 0.35rem;
  list-style: none; margin: 0; padding: 0;
}
.equip-skills { grid-area: skills; display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem 0.5rem; align-content: start; }
.equip-skills-page { display: flex; flex-direction: column; gap: 0.35rem; list-style: none; margin: 0; padding: 0; }
.equip-luminas {
  grid-area: luminas;
  display: flex; flex-wrap: wrap; gap: 0.35rem;
  list-style: none; margin: 0; padding: 0;
}

/* Status: one card per character (lv badge + a Stats slot-grid + an Attributes
   slot-grid, reusing the shared .inventory-grid/.slot primitive above). */
.status-grid { display: flex; flex-direction: column; }
.status-card + .status-card { border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent); margin-top: 0.75rem; padding-top: 0.75rem; }
.status-card h4 { margin: 0 0 0.5rem; display: flex; align-items: baseline; gap: 0.5rem; }
.status-lv {
  font-size: 0.85rem;
  font-weight: var(--rd-emphasis-weight);
  padding: 0.15rem 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  background: color-mix(in srgb, currentColor 12%, transparent);
}
.status-group-title {
  margin: 0.5rem 0 0.35rem;
  font-size: var(--rd-label-size-sm);
  font-weight: var(--rd-label-weight);
  text-transform: uppercase;
  letter-spacing: var(--rd-label-tracking);
  opacity: var(--rd-label-opacity);
}

/* ":::encounter" block — a one-shot turn log (title/note + one section per
   turn, each headed "Turn N" with an actions sub-list and an optional note).
   Distinct from the persistent-state Component styling above: a lightweight
   sectioned layout, no icon/dl grid needed. */
.block--encounter {
  border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 1.25rem 0;
}
.encounter-title { margin: 0 0 0.5rem; font-size: 1rem; }
.encounter-turns { margin: 0.5rem 0 0; display: flex; flex-direction: column; gap: 0.75rem; }
.encounter-turn + .encounter-turn { border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent); padding-top: 0.75rem; }
.encounter-turn-title {
  margin: 0 0 0.3rem;
  font-size: var(--rd-label-size-sm);
  font-weight: var(--rd-label-weight);
  text-transform: uppercase;
  letter-spacing: var(--rd-label-tracking);
  opacity: var(--rd-label-opacity);
}
.encounter-actions { margin: 0.25rem 0 0; padding-left: 1.1rem; }
/* "note" text is the substance of what happened, not a dimmed aside — same
   full-color treatment as .menu-action-note, so a note reads the same
   whether it's attached to an encounter turn/action or a menu action. */
.encounter-action-note { font-style: italic; }
.encounter-note { margin: 0.3rem 0 0; font-style: italic; }

/* ":::note" is a supplementary aside/caution called out mid-procedure — an
   accent-bordered callout (Radix amber) sets it apart from surrounding prose
   without borrowing the error red used for state-block diagnostics. */
.block--note {
  border-left: 3px solid #ffb224;
  background: color-mix(in srgb, #ffb224 12%, transparent);
  border-radius: 0.35rem;
  padding: 0.6rem 1rem;
  margin: 1.25rem 0;
}

/* ":::when" states the timing of the operation that follows it — a
   label+value row (reusing .slot-label/.slot-value, the same pair used by
   inventory/status slots) inside the same left-accent card treatment as
   ".skip-card", since both are a single short fact rather than the
   supplementary prose ".block--note" calls out. */
.block--when {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  border-left: 3px solid color-mix(in srgb, currentColor 35%, transparent);
  background: color-mix(in srgb, currentColor 4%, transparent);
  border-radius: 0.35rem;
  padding: 0.5rem 0.75rem;
  margin: 1.25rem 0;
}

/* note/encounter-note/state-field "note" text is now parsed as Markdown, so a
   plain single-line note is wrapped in a <p> instead of being a bare text
   node — collapse its edge margins so these callouts don't gain extra
   whitespace beyond the container's own padding. */
.block--note > :first-child,
.encounter-note > :first-child,
.menu-action-note > :first-child,
.component dd > :first-child { margin-top: 0; }
.block--note > :last-child,
.encounter-note > :last-child,
.menu-action-note > :last-child,
.component dd > :last-child { margin-bottom: 0; }

/* ":::menu" records a pause-menu session (weapon/pictos/lumina/skill changes,
   etc.) — a Component (see plugin-expedition33/schema/menu.schema.yaml), not
   a core Block kind, since character/kind are enum-validated against the
   game's fixed roster/categories rather than free strings. Like ":::skip" it
   can appear many times per page, so its .state-block wrapper stays
   borderless (spacing only) while .menu-card carries the visual weight: the
   "Menu" title (.component h3, same rule every Component uses) leads, then
   the ordered list of actions (timing, if any, is a preceding ":::when"
   block rather than part of this card). Within each action, the character
   is the primary fact ("who"), so it renders Emphasis-weight at full
   opacity; kind (pictos/formation/etc.) is secondary metadata, so it stays
   a dimmer Label-role tag beside it — uppercase/letter-spacing are dropped
   here since this book's labels are Japanese, where those transforms are
   no-ops and only hurt legibility. "note" is the actual substance of what
   was done, so it renders as plain, normal-weight Markdown prose instead of
   a dimmed inline aside. */
.state-block--menu { border: none; background: none; padding: 0; margin: 0.75rem 0; }
.menu-card {
  border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}
.menu-action-heading {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}
.menu-action-character {
  font-size: var(--rd-label-size-lg);
  font-weight: var(--rd-emphasis-weight);
}
.menu-action-kind {
  font-size: var(--rd-label-size-lg);
  font-weight: var(--rd-label-weight);
  opacity: 0.85;
}
.menu-actions { margin: 0; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.menu-action-note { margin: 0.2rem 0 0; }
.menu-action-items { margin: 0.4rem 0 0; padding-left: 1.1rem; }

/* ":::skip" marks a cutscene skip in the run's flow rather than persistent
   party state — it appears many times per page, so its .state-block wrapper
   stays borderless (spacing only) while the component itself renders as a
   left-accent card: heading, and (separated by a dashed rule) an optional
   loading tag — enough visual weight to stay legible among prose without the
   full boxed section+<dl> treatment. Timing, if any, is a preceding
   ":::when" block rather than part of this card. */
.state-block--skip { border: none; background: none; padding: 0; margin: 0.75rem 0; }
.skip-card {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-left: 3px solid color-mix(in srgb, currentColor 35%, transparent);
  background: color-mix(in srgb, currentColor 4%, transparent);
  border-radius: 0.35rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}
.skip-card-heading { display: inline-flex; align-items: center; gap: 0.35rem; font-weight: var(--rd-emphasis-weight); }
.skip-card-loading {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding-top: 0.3rem;
  border-top: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
  opacity: 0.65;
  font-size: 0.8rem;
}
`;

export interface Heading {
  depth: number;
  id: string;
  text: string;
}

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (c) => HTML_ESCAPES[c]!);
}

function renderToc(headings: Heading[]): string {
  if (headings.length === 0) return '';
  const items = headings
    .map((h) => `<li class="toc-h${h.depth}"><a href="#${escapeHtml(h.id)}">${escapeHtml(h.text)}</a></li>`)
    .join('');
  return `<ul>${items}</ul>`;
}

export function wrapDocument(bodyHtml: string, title: string, headings: Heading[] = []): string {
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${CSS}</style>
</head>
<body>
<div class="page">
<nav class="toc">${renderToc(headings)}</nav>
<main>
${bodyHtml}
</main>
</div>
</body>
</html>
`;
}
