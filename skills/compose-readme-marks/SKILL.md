---
name: compose-readme-marks
description: "Compose README and docs badges or banners from public mark APIs without a design tool."
---

# Compose README Marks

Produce **markdown image embeds** for README/docs: badges, banners, tech icon rows, simple stats cards—using public no-key image APIs when possible.

## When to use

- Polishing OSS/product README or docs headers
- Need consistent badges without checking binary assets into git
- Brand-colored banners for multiple repos

## When not to use

- Custom illustration/marketing site hero requiring design system ownership
- Offline-only docs that forbid hotlinked images
- Release proof (badges are presentation, not delivery evidence)

## Method

**Open [references/recipes.md](references/recipes.md) first** — copy-paste endpoints/commands; do not web-search for these defaults.

1. Choose mark types: badge / banner / icons / stats.
2. Open [references/providers/INDEX.md](references/providers/INDEX.md); prefer no-key public APIs.
3. Build URLs with required query params; URL-encode text.
4. Probe with `curl -sI` → expect `image/svg+xml` or image content-type **200**.
5. Paste markdown into README; keep params in source so agents can regenerate.

## Done for this run

- Markdown snippets ready to paste
- Live image URL(s) probed
- Theme/style choices recorded
- Residual: GitHub rate limits for stats endpoints if used without token

## Progressive disclosure

- [references/recipes.md](references/recipes.md) — **open first**: copy-paste endpoints/commands
- [references/providers/INDEX.md](references/providers/INDEX.md)
- [references/providers/mark-sylphx.md](references/providers/mark-sylphx.md)
- [references/providers/shields.md](references/providers/shields.md)
- [references/markdown-patterns.md](references/markdown-patterns.md)

## Boundaries

- Hotlink dependency: if the mark host is down, README images break
- Stats cards that call GitHub inherit GitHub rate limits
