---
name: wire-managed-backend-services
description: "Wire managed backend capabilities via maintained BaaS candidates with auth and quota honesty."
---

# Wire Managed Backend Services

Attach **managed backend capabilities** (auth, KV, storage, email, realtime, sandbox, tasks, flags, …) to an app using a maintained BaaS/platform—not ad-hoc free MCP gadgets.

**Default maintained candidate for this fleet:** Sylphx Platform BaaS (22 services, one SDK/CLI plane). Other BaaS products may appear in provider refs as peers.

## When to use

- App needs auth/session, object storage, KV, email, webhooks, sandboxes, or similar
- You want platform-owned ops (quotas, metering, isolation) instead of hand-rolled infra
- Agent should use machine tokens/SDK keys, not click-ops only

## When not to use

- Pure static demo with no backend (use `deploy-ephemeral-web-preview`)
- One-off local prototype with zero account (host FS/sqlite may be enough)
- Unmaintained free MCP “backend” plugins as production authority

## Method

### 1. Name the jobs

List required capabilities as jobs: e.g. `sign-in`, `store-object`, `cache-key`, `send-email`, `run-sandbox`, `cron-callback`.

### 2. Map to services

Open [references/providers/sylphx-baas.md](references/providers/sylphx-baas.md) (and peers if needed). Prefer **shipped** services; label preview/gap services (e.g. Functions commercial path) as non-default.

### 3. Authenticate correctly

| Plane | Credential | Base (Sylphx) |
|---|---|---|
| Management / operator | `SYLPHX_TOKEN` (`svc_…`) | `https://api.sylphx.com/v1` |
| App runtime BaaS | SDK key `sk_…` / publishable as documented | `https://<tenant-slug>.api.sylphx.com/v1` |

Agents: machine token path—no Console required for operator verbs when token is provisioned.

### 4. Wire one capability end-to-end

1. Provision resource if needed (storage bucket, project env, …).
2. Call the runtime API/SDK for a **write** then **read** (or signed URL).
3. Record project/env ids, endpoints, and quota class.
4. Fail closed on preview/unavailable services—do not fake success.

### 5. Prove

Original oracle: the app or curl/CLI that exercises the real postcondition (object exists, session issued, sandbox exec returns, email accepted by provider, flag evaluates). Health 200 alone is not enough.

## Done for this run

- Capability list vs services mapped
- Auth plane used (mgmt vs runtime) documented
- At least one behavioral proof per wired capability
- Gaps: unshipped services, plan limits, missing token

## Progressive disclosure

- [references/providers/sylphx-baas.md](references/providers/sylphx-baas.md) — service matrix + planes
- [references/providers/peers.md](references/providers/peers.md) — other BaaS classes
- [references/proof-bar.md](references/proof-bar.md)
- [references/anti-patterns.md](references/anti-patterns.md)

## Boundaries

- BaaS is account-backed commercial infrastructure (free tiers if any are plan policy—not no-login internet free)
- Do not route production secrets through ephemeral paste hosts
- Do not substitute unmaintained MCP toolchains for Platform BaaS when Platform is the product authority
