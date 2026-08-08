# `@cloudflare/computer` (Cloudflare Computer)

## What it is

Open-source **preview** package: SQLite-backed virtual filesystem for Durable Objects, with pluggable exec backends (worker shell, worker JS, Linux container) and optional AI SDK tools (`read`, `write`, `edit`, `ls`, `exec`).

## Auth / cost honesty

- Package install is free (npm).
- Running it requires a **Cloudflare Workers / Durable Objects** deployment (account free tier or temporary deploy of *your* Worker).
- Container backend performance and billing follow Cloudflare Containers/Workers limits—not “unlimited $0 VPS.”
- Official status: **preview only**, not production-suitable while labeled preview.

## Limits (document drift; re-check)

- On the order of **~10 GB** workspace storage shared with DO SQLite.
- Container-side FS often memory-backed; heavy `node_modules` I/O is slower than native disk.
- Agent-scale workspaces, not full monorepos.

## Minimal shape

```ts
import { withWorkspace, getWorkspace } from "@cloudflare/computer";
// withWorkspace on a Durable Object; getWorkspace(stub)
// await ws.fs.writeFile(...); await ws.runtime.exec(...)
```

Requires `nodejs_compat` (and backend-specific bindings/flags per current package docs).

## Acceptance proof

1. Worker/DO with workspace deploys.
2. Write/read canary file via `workspace.fs`.
3. `runtime.exec` returns expected stdout for a trivial command **if** an exec backend is configured (FS-only mode is valid—state that explicitly).

## Prefer / avoid

- **Prefer** for experiments on CF-native agents needing durable files across DO restarts.
- **Avoid** as silent production dependency while preview; avoid equating with no-login permanent computers.
