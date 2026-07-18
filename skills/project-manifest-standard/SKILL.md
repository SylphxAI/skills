---
name: project-manifest-standard
description: "Repository identity, lifecycle, capability and component ownership, public boundaries, delivery facts, and adoption gaps through PROJECT.md and the machine project manifest. Use when creating, changing, or validating a repository's durable identity and boundaries."
---
# Project Manifest Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

Schema: [references/project-manifest.schema.json](references/project-manifest.schema.json).

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.


## Output format

1. **Applicability** — why this standard applies to the change.
2. **Predicates in scope** — material obligations from the full body.
3. **Evidence** — tests, schemas, ADRs, or gates that verify them.
4. **Gaps** — residual risk with owner and follow-up.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.

## When not to use

- Live Work Graph claim/lease/checkpoint → Control Plane MCP tools.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
