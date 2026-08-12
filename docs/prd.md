# PRD — Sylphx Verified Capabilities (open foundation)

**Industry type:** Product Requirements / product spec  
**Audience:** humans and agents packaging, installing, or qualifying capabilities  
**Authority:** per-package contracts under `skills/<id>/`; this file is the
**feature/capability inventory**. Field-level I/O lives in each package, not here.

## Problem / opportunity

Frontier agents can invent fluent procedures that fail at delivery or claim
trust from vanity signals. Buyers and agents need **portable, job-shaped methods**
with **honest, version-scoped evidence** and **fail-closed install**.

## Users / use cases

| User | Use case |
| --- | --- |
| Coding agent (Codex, Claude Code, Grok Build) | Discover and load one method for a real job |
| Skill author | Ship a capability with contract + qualification honesty |
| Installer / AutoSync | Apply exact release-tag revisions only |

## Features / capabilities

| ID | Job | Success looks like | Non-goals |
| --- | --- | --- | --- |
| `skill.package` | Provide one trusted method for a real job | Agent selects package, follows procedure, outcome checkable or honestly unqualified | Marketplace ranking; runtime execution engine |
| `skill.qualify` | Version-scope fitness evidence for a package | Qualification bound to package digest; false-qualified = 0 | Stars/CI green as proof; permanent promote without expiry |
| `skill.install` | Sync exact-revision packages into a host | Host sees only release-tag-promoted packages | Dual instruction SSOT; untrusted tip auto-install |
| `skill.compose` | Constraint packs deepen a job without forking identity | Applying job loads pack only when relevant | Listing every constraint as a product skill |

## Tools / surfaces

| Tool / surface | Capabilities | Audience | Entry | Contract |
| --- | --- | --- | --- | --- |
| `skills/<id>/SKILL.md` + `capability.json` | `skill.package` | Agents, authors | Progressive disclosure | Package `capability.json` + `references/` |
| `catalog.json` | `skill.package`, `skill.qualify` | Installers, humans | Projection | Generated; not a second authority |
| Install / AutoSync | `skill.install` | Hosts | Annotated release tags | [PROMOTION.md](PROMOTION.md) |
| Constraint packs under jobs | `skill.compose` | Authors, agents | Job `references/` | Owning job + [AUTHORITY-MAP.md](AUTHORITY-MAP.md) |

## Requirements (summary)

- Every listing carries `capability.json` and `qualification.json` (`unqualified` default).
- Qualification is version-scoped, expiring, evaluator-named; structural CI ≠ value.
- AutoSync applies only annotated `skills-v*` tags with promotion manifests.
- This repository never fabricates outcome receipts (external oracle).

## Non-goals

Marketplace, agent runtime/model host, Control Plane live state, policy encyclopedia
as top-level listings, hard cap on listing count for appearance.

## Specs / details

Per-package: `skills/<id>/capability.json`, `SKILL.md`, `references/`.  
Model: [MODEL.md](MODEL.md). Qualification: [QUALIFICATION.md](QUALIFICATION.md).  
North Star Metric: [NORTH-STAR.md](NORTH-STAR.md).
