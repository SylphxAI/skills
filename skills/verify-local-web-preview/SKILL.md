---
name: verify-local-web-preview
description: "Verify local web/game preview: load, screenshot, console gate."
---

# Verify Local Web Preview

When a product has a **local web preview** (dev server, pack web host, title
preview) and you need agent-owned visual/load proof—not curl-only—run this job.

## When to use

- After wiring a web UI or canvas game preview
- Before claiming “it runs in browser” or handing a human a preview
- When capturing a PNG the agent can re-read for visual defects
- When you need a fail-closed console/pageerror gate on load

## Method

### 1. Locate the live preview

- Discover the actual listen URL/port from the product (Vite, pack host, custom).
- Prefer loopback addresses the agent can open. Do not invent a port.

### 2. Capture

Prefer host browser / computer-use tools when they can open the URL and
screenshot. Otherwise, if Playwright is available:

```bash
node skills/verify-local-web-preview/scripts/browser-smoke.mjs \
  http://127.0.0.1:<port>/ \
  ./screenshots/<name>.png
```

Read `--` argv: `[url] [out.png]`. Env: `BROWSER_SMOKE_TIMEOUT_MS`,
`BROWSER_SMOKE_URL`, `BROWSER_ALLOW_EXTERNAL_HOST=1` (rare),
`BROWSER_SMOKE_ALLOW_ROOT` (extra output roots, `:`/`;` separated).

Exit codes: `0` ok, `1` nav/HTTP fail, `2` console/page errors, `3` no Playwright.

### 3. Inspect

- Open the PNG (or host screenshot) and note layout, blank canvas, obvious bugs.
- For movement games, run player-visible control signs (A left / D right) per
  whole-game design controls self-test—not screenshot-only for steer.
- Production claim still needs product build/test oracles—not smoke alone.

### 4. Communicate (human-facing)

Follow [references/preview-honesty.md](references/preview-honesty.md): the human
sees **their** preview channel; do not send them agent-only localhost chores.

### 5. Record evidence

URL, status, screenshot path, console errors, what remains untested. Compose
atomic commits and a revert-safe PR outcome L1/L2/L3 only when this job mutates product source.

## Done for this run

- Preview URL known and load attempted with recorded result
- Screenshot or explicit tool-gap
- Console/page errors listed or clean
- Human-facing summary without false production claims
