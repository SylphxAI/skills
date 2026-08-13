---
name: wire-managed-backend-services
description: "Wires leftover managed BaaS capabilities (flags, search, analytics, AI gateway, consent) with quota honesty. Use when attaching a shipped backend that is not sign-in, app data, cron, or message delivery."
---

# Wire Managed Backend Services

Attach a **remaining** managed backend capability (flags, search, analytics, AI gateway, consent, referrals) using a maintained BaaS—not ad-hoc free MCP gadgets. Sign-in, durable data, background work, and message delivery have their own listings.

**Default maintained candidate for this fleet:** Sylphx Platform BaaS (22 services, one SDK/CLI plane). Other BaaS products may appear in provider refs as peers.

## When to use

- App needs flags, search, analytics, AI gateway, consent, or a similar leftover service
- You want platform-owned ops (quotas, metering, isolation) instead of hand-rolled infra
- Agent should use machine tokens/SDK keys, not click-ops only

## When not to use

- Pure static demo with no backend (use `deploy-ephemeral-web-preview`)
- One-off local prototype with zero account (host FS/sqlite may be enough)
- Unmaintained free MCP “backend” plugins as production authority

## Method

Known management/runtime proof sketches live in [references/recipes.md](references/recipes.md). Open that file when wiring a named Sylphx (or peer) capability. It is not a search replacement: if an API path may have moved, use current official docs via the host's web search and fetch tools.

### 1. Name the jobs

List required leftover capabilities as jobs: e.g. `check-flag`, `index-search`, `track-event`, `route-model`, `export-consent`.

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

- [references/recipes.md](references/recipes.md) — known CLI/API proof sketches for a chosen service
- [references/providers/sylphx-baas.md](references/providers/sylphx-baas.md) — service matrix + planes
- [references/providers/peers.md](references/providers/peers.md) — other BaaS classes
- [references/proof-bar.md](references/proof-bar.md)
- [references/anti-patterns.md](references/anti-patterns.md)

## Boundaries

- BaaS is account-backed commercial infrastructure (free tiers if any are plan policy—not no-login internet free)
- Do not route production secrets through ephemeral paste hosts
- Do not substitute unmaintained MCP toolchains for Platform BaaS when Platform is the product authority
