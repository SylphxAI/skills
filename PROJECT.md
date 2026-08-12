# Sylphx Verified Capabilities (open foundation)

## Purpose

Own the public **open foundation** of Sylphx Verified Capabilities: portable
capability packages with machine-readable contracts, honest version-scoped
qualification records, an outcome-receipt recording contract, and static
install/sync adapters for Codex, Claude Code, and Grok Build.

## North Star

> Agents load one trusted method for a real job—and never grant more trust than
> version-scoped evidence allows.

| | |
| --- | --- |
| **Metric (Stage A, active)** | **Trustworthy Job Coverage (TJC)** — listed, discoverable, honestly qualified on current digest; zero false-qualified |
| **Metric (Stage B, when receipts exist)** | **Verified Capability Yield (VCY)** — external successes ÷ eligible attempts |
| **Anti-proxy** | Listing count, stars, CI green alone, self-graded Quality `q-*`, fabricated receipts |

Full product North Star: [docs/NORTH-STAR.md](docs/NORTH-STAR.md).

## End state

One open foundation product model:

- Requestable **capabilities** (Skill packages) with contracts and honest
  qualification defaults (`unqualified` until evidence).
- **Catalog** projection + install/AutoSync only from annotated release tags.
- **Outcome-receipt schema** for external oracles (this repo never fabricates
  receipts); Control Plane / user systems own live outcomes.
- Constraint packs live under applying jobs — not a policy encyclopedia of
  listing skills.

Boundaries: not a marketplace, agent runtime, or Control Plane.

## Goals

Completable work is tracked as Work/PRs toward the end state (no second North
Star). Raise TJC by qualifying high-value jobs and demoting false trust; do not
optimize vanity proxies.

## Capabilities / tools

| Surface | Role |
| --- | --- |
| `skills/<id>/` | One requestable job (capability) — procedure + `capability.json` + qualification |
| `catalog.json` | Projection of packages and qualification state |
| Install / AutoSync | Exact-revision sync to Codex, Claude Code, Grok Build |
| Constraint packs under jobs | Engineering/delivery/commercial depth (not separate listings) |

Inventory authority: catalog + each package contract. Model:
[docs/MODEL.md](docs/MODEL.md).

## Delivery

Default branch passes `npm test`; catalog rebuilt with qualification projection;
no package claims qualification without version-scoped, expiring evidence;
AutoSync only from annotated release tags with promotion manifests
([docs/PROMOTION.md](docs/PROMOTION.md)).

## Links

| Doc | Role |
| --- | --- |
| [docs/NORTH-STAR.md](docs/NORTH-STAR.md) | Product North Star |
| [docs/MODEL.md](docs/MODEL.md) | Capability package model |
| [docs/QUALIFICATION.md](docs/QUALIFICATION.md) | Qualification method |
| [docs/AUTHORITY-MAP.md](docs/AUTHORITY-MAP.md) | Constraint pack owners |
| Documentation altitude | `skills/drive-to-delivery/.../documentation-standard/` |
