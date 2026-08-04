const CSS = `
:root { color-scheme: light dark; }
body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  max-width: 46rem;
  margin: 0 auto;
  padding: 2rem 1.25rem 6rem;
  line-height: 1.65;
}
h1, h2, h3 { line-height: 1.3; }
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
.component h3 { margin: 0 0 0.35rem; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.03em; opacity: 0.75; }
.component dl { display: grid; grid-template-columns: max-content 1fr; gap: 0.15rem 0.75rem; margin: 0; }
.component dt { opacity: 0.75; }
.component dd { margin: 0; font-weight: 600; }
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
.slot-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.03em; opacity: 0.75; }
.slot-value { font-weight: 700; }

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
.encounter-turn-title { margin: 0 0 0.3rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.03em; opacity: 0.7; }
.encounter-actions { margin: 0.25rem 0 0; padding-left: 1.1rem; }
.encounter-note { margin: 0.3rem 0 0; font-style: italic; opacity: 0.75; }
`;

export function wrapDocument(bodyHtml: string, title: string): string {
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${CSS}</style>
</head>
<body>
${bodyHtml}
</body>
</html>
`;
}
