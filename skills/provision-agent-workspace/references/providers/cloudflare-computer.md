# `@cloudflare/computer` (Cloudflare Computer)

**Package:** https://www.npmjs.com/package/@cloudflare/computer  
**Monorepo overview:** Cloudflare Computer README (backends: container / isolate shell / isolate JS).

## Status

**PREVIEW ONLY.** APIs unstable. Experiments and prototypes — **not** production.

## Install

```bash
npm install @cloudflare/computer
# version pin example after check:
# npm install @cloudflare/computer@0.1.1
```

Worker: `compatibility_flags = ["nodejs_compat"]` (plus backend-specific flags/bindings).

## Surfaces

```ts
import { withWorkspace, getWorkspace } from "@cloudflare/computer";
// workspace.fs ≈ node:fs/promises subset (readFile, writeFile, mkdir, readdir, rm, grep, …)
// workspace.runtime.exec(source, { backend })
```

| Backend | `source` meaning | Notes |
|---|---|---|
| Container | shell command | Full Linux userland; FUSE projection; heavier |
| Isolate shell | shell command | just-bash; Dynamic Worker; no second store |
| Isolate JS | ESM module | structured result; Workspace-backed fs |
| None | — | FS only |

Optional: `@cloudflare/computer/tools` with peer `ai` + `zod`.

## Limits (re-check)

- ~**10 GB** per workspace (DO SQLite share).  
- Container FS often memory-backed; heavy `node_modules` I/O slower than native disk.  
- Agent-scale workspaces, not full monorepos.

## Cost / auth honesty

| Layer | Reality |
|---|---|
| npm package | free/OSS |
| Running DO/Worker | Cloudflare account free tier or temporary deploy of **your** Worker |
| Containers | CF plan/limits — not unlimited $0 VPS |

## Acceptance

1. Deploy Worker/DO with workspace.  
2. FS canary write/read.  
3. Exec canary **or** explicit FS-only mode.  
4. Label **preview**.

## Prefer / avoid

- Prefer CF-native agent experiments.  
- Avoid silent production dependency; avoid “no account forever computer” claims.
