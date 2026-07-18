---
name: instruction-evolution-standard
description: "Evolution of Skills, runtime constitutions, required profiles, and architecture generations with one writable owner, migration, reconciliation, and retirement. Use for durable instruction or profile changes, not live Work Graph operations."
---
# Instruction Evolution Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

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
