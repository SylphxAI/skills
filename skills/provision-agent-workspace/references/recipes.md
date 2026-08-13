# Agent recipes — workspace / exec

## A. Host shell (L0 — default)

```bash
# Canaries on the agent host workspace
echo "canary-$(date -u +%Y%m%dT%H%M%SZ)" > ./.agent-workspace-canary
cat ./.agent-workspace-canary
uname -a
command -v node; node -v 2>/dev/null
command -v python3; python3 --version 2>/dev/null
```

Use host unless policy requires stronger isolation.

## B. `@cloudflare/computer` (L3 substrate, package OSS, **preview**)

**npm:** `@cloudflare/computer@0.1.1` (verify `npm view @cloudflare/computer version`).  
**Status:** official **PREVIEW ONLY** — not production.

### What you get

| Piece | Role |
|---|---|
| DO SQLite FS | Durable files across DO restarts (~10 GB class shared with DO) |
| `runtime.exec` | One entrypoint; pick backend |
| Container backend | Full Linux via `computerd` FUSE sync |
| Isolate shell | just-bash in Dynamic Worker |
| Isolate JS | ESM module in Dynamic Worker |
| Optional tools | AI SDK `read`/`write`/`edit`/`ls`/`exec` |

### Minimal FS-only DO

```ts
import { withWorkspace, getWorkspace } from "@cloudflare/computer";
import { DurableObject } from "cloudflare:workers";

export class Agent extends withWorkspace(
  class extends DurableObject<Env> {},
  (self) => ({ storage: self.ctx.storage }),
) {}

// fetch handler:
const id = env.Agent.idFromName("agent-session-1");
using ws = await getWorkspace(env.Agent.get(id));
await ws.fs.writeFile("/canary.txt", "ok\n");
const text = await ws.fs.readFile("/canary.txt", "utf8");
// optional: await ws.runtime.exec("uname -a", { backend: "..." })
```

**Wrangler needs:** `nodejs_compat`; backend-specific bindings (`experimental` + Worker Loader for isolate backends; container bindings for Linux). Deploy the Worker with a normal or **temporary** account (`deploy-ephemeral-web-preview`).

**Proof:** write/read canary; if exec configured, trivial `echo`/`uname`; state preview + isolation class.

## C. Sylphx Platform Sandbox (Kata VM, maintained BaaS)

**Not no-login.** Needs Platform project + token.

```bash
export SYLPHX_TOKEN=svc_...          # management
export SYLPHX_API_URL=https://api.sylphx.com/v1

sylphx whoami --json
# Create sandbox via Platform SDK/API for the project (see sylphx-sandbox.md)
# Then JWT → exec-server; run:
#   echo canary && uname -a
# Terminate when done to free org quota (idle reap also applies — multi-hour max-age class).
```

**Proof:** sandbox id + exec stdout + terminate/reap note.

## D. Decision table

| Need | Pick |
|---|---|
| Fastest edit/build on this machine | Host L0 |
| CF-native agent files across restarts | `@cloudflare/computer` preview |
| Strong VM isolation under Sylphx | Platform Sandbox |
| Untrusted code, third-party microVM | E2B class (L4) |
