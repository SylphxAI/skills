---
name: provision-agent-workspace
description: "Provision an agent filesystem and shell workspace with isolation and free-boundary honesty."
---

# Provision Agent Workspace

Give the agent a **working directory + command execution** surface for multi-step file and shell work. Choose the isolation and cost class that matches risk—not the viral “$0 computer” claim alone.

## When to use

- Agent must read/write many files, run builds/tests, or keep state across turns
- Host-local tools are insufficient or policy requires stronger isolation
- Comparing sandbox candidates for a product or research prototype

## When not to use

- Single-shot local edits already available on the host agent (use host FS/shell)
- Production multi-tenant compute without account, quotas, and security review
- Pure public HTTP research (use `research-public-web`)

## Method

### 1. Pick isolation class

| Class | Typical surface | Free class |
|---|---|---|
| Host shell | Codex/CLI workspace | L0 (your machine) |
| In-worker isolate / virtual FS | e.g. `@cloudflare/computer` isolate backends | L3 on CF substrate (package OSS) |
| Managed VM sandbox | e.g. Sylphx Platform Sandbox (Kata), E2B | L3/L4 account + quotas |
| Full VPS | cloud VM | almost never “free agent default” |

Open [references/providers/INDEX.md](references/providers/INDEX.md).

### 2. Provision

1. Create or attach workspace identity (DO id, sandbox id, local path).
2. Confirm **filesystem** works: write a canary file, read it back.
3. Confirm **exec** works: run a trivial command (`echo`, `uname`, language version).
4. Record limits: TTL, disk, CPU, network egress policy, max concurrent sandboxes.

### 3. Use safely

- Prefer least privilege network egress.
- Do not put long-lived secrets into ephemeral workspace storage without a wipe plan.
- Treat preview sandboxes as hostile-multi-tenant until proven otherwise.

### 4. Tear down or standby

- Default: terminate when idle if the platform reaps (e.g. max age policies).
- Standby/resume only when the provider documents it as supported—not assumed free forever.

## Done for this run

- Workspace handle documented
- FS canary + exec canary proofs
- Provider free class + isolation boundary stated
- Reap/TTL and residual risk listed

## Progressive disclosure

- [references/providers/INDEX.md](references/providers/INDEX.md)
- [references/providers/cloudflare-computer.md](references/providers/cloudflare-computer.md)
- [references/providers/sylphx-sandbox.md](references/providers/sylphx-sandbox.md)
- [references/providers/other-sandboxes.md](references/providers/other-sandboxes.md)
- [references/acceptance.md](references/acceptance.md)

## Boundaries

- OSS package ≠ free hosted infinite Linux
- Temporary CF Workers deploys are not the same job as durable sandboxes
- Do not claim production readiness for preview-only packages
