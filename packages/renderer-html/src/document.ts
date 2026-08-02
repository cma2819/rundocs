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
