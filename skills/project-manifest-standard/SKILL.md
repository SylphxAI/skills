---
name: project-manifest-standard
description: "PROJECT.md and .doctrine/project.json identity, lifecycle, boundaries, and adoption gaps. Use when the task domain matches; use for durable method and predicates. Do not use as a one-off checklist procedure or live Work Graph operations."
---
# Project Manifest Standard

**Authority: binding** (`packageKind: standard`).

Canonical home: `skills/project-manifest-standard/` in `SylphxAI/skills`.  
Full body: [references/full-standard.md](references/full-standard.md).  
Cutover map: [references/doctrine-parity-delta.md](references/doctrine-parity-delta.md).

The former source standard path is **alias-only** after cutover — author here only.

## Method

1. Load this package when the task domain matches this standard.
2. Read [references/full-standard.md](references/full-standard.md) for binding method and predicates.
3. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
4. Prefer schema/test/ADR homes over copying this body into product repos.


## Output format

1. **Applicability** — why this standard applies to the change.
2. **Predicates in scope** — material obligations from the full body.
3. **Evidence** — tests, schemas, ADRs, or gates that verify them.
4. **Gaps** — residual risk with owner and follow-up.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.
- Control Plane owns live work/fleet/effects — not this static standard text.

## When not to use

- Live Work Graph claim/lease/checkpoint → Control Plane MCP tools.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
