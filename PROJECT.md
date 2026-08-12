# Sylphx Verified Capabilities (open foundation)

## Purpose

Open foundation of Sylphx Verified Capabilities: portable capability packages,
honest qualification records, outcome-receipt schema, and install/AutoSync for
Codex, Claude Code, and Grok Build.

## Product Vision

Agents get **one trusted method per real job**, with trust never exceeding
version-scoped evidence. The open foundation ships packages, contracts,
qualification honesty, and release-tag distribution—not a marketplace, agent
runtime, or Control Plane. Full narrative:
[docs/NORTH-STAR.md](docs/NORTH-STAR.md) (product identity and stage metrics).

## North Star Metric

> Right job → right method → trust capped by evidence.

| | |
| --- | --- |
| **Metric (Stage A, active)** | **Trustworthy Job Coverage (TJC)** — listed, discoverable, honestly qualified on current digest; zero false-qualified |
| **Metric (Stage B, when receipts exist)** | **Verified Capability Yield (VCY)** — external successes ÷ eligible attempts |
| **Anti-proxy** | Listing count, stars, CI green alone, self-graded `q-*`, fabricated receipts |

Detail: [docs/NORTH-STAR.md](docs/NORTH-STAR.md).

## Goals

Completable work is tracked as Work/PRs (OKR-style slices), not a second NSM.
Raise TJC by qualifying high-value jobs and removing false trust.

## Delivery

Default branch passes `npm test`; catalog rebuilt with qualification projection;
qualification requires version-scoped, expiring evidence; AutoSync only from
annotated release tags ([docs/PROMOTION.md](docs/PROMOTION.md)).

## Links

| Doc | Role |
| --- | --- |
| [docs/prd.md](docs/prd.md) | **PRD** — capabilities, tools/surfaces, contract pointers |
| [docs/NORTH-STAR.md](docs/NORTH-STAR.md) | Vision depth + NSM |
| [docs/MODEL.md](docs/MODEL.md) | Capability package model |
| [docs/adr/](docs/history/adr/) | Material decisions (history/adr) |
| [AGENTS.md](AGENTS.md) | Agent runtime entry |
