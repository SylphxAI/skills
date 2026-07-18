---
name: engineering-standard
description: "Binding engineering standard for durable product code. Use when designing, reviewing, refactoring, or migrating implementation, contracts, storage, concurrency, security boundaries, or delivery-critical runtime paths. Use for architecture, testing, observability, and module boundaries. Do not use for pure commercial packaging or live Work Graph operations."
---
# Engineering Standard

**Authority: binding** (`packageKind: standard`).

Canonical home: `skills/engineering-standard/` in `SylphxAI/skills`.  
Full progressive-disclosure body: [references/full-standard.md](references/full-standard.md).  
Rule IDs: [references/binding-predicates.md](references/binding-predicates.md).

Doctrine `standards/engineering-standard.md` is an **alias** after cutover — author here only.

## Method

1. Load this package for durable engineering work on product code.
2. Read [references/full-standard.md](references/full-standard.md) for the complete standard.
3. Apply the strongest relevant subset; record tradeoffs in code, tests, or ADRs.
4. Prefer schema, test, and ADR homes for durable facts over copying this body into product repos.
5. Procedure Skills should declare a catalog dependency on `engineering-standard` rather than restating predicates.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local technical ADRs.
- Does not auto-route as a procedure; it is binding policy text with separate conformance evidence.

## When not to use

- Commercial packaging alone → commercial-decision class packages.
- Live Work Graph claim/lease/checkpoint → Control Plane MCP tools.
- One-off scripts with no durable product surface and no shared contract impact.

## Output format

1. **Applicability** — what changed and why this standard applies.
2. **Predicates in scope** — rule IDs or sections from the full body.
3. **Evidence** — tests, schemas, ADRs, benchmarks.
4. **Gaps** — residual risk with owner and follow-up.

## Guardrails

- Fail closed on secret material in source and logs.
- Never treat health/readiness probes as product capability proof.
- Prefer expand-contract migrations for shared state.
