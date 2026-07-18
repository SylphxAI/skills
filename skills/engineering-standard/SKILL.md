---
name: engineering-standard
description: "Binding engineering standard for durable product code. Use when designing, reviewing, refactoring, or migrating code architecture, capabilities, features, DDD domain models, Clean/Hexagonal boundaries, functional cores, modules, contracts, storage, concurrency, security, tests, observability, or delivery-critical runtime paths."
---
# Engineering Standard

**Authority: binding** (`packageKind: standard`).

Canonical home: `skills/engineering-standard/` in `SylphxAI/skills`.  
Full progressive-disclosure body: [references/full-standard.md](references/full-standard.md).  
Rule IDs: [references/binding-predicates.md](references/binding-predicates.md).

For code structure or architecture migration, also read:

- [Capability-first architecture](references/capability-first-architecture.md)
- [Language mappings](references/capability-first-language-mappings.md)
- [Executable-shape examples](references/capability-first-examples.md)

The former source standard path is **alias-only** after cutover — author here only.

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
- Apply the canonical Capability-first architecture from the first durable
  product commit; project size and migration cost are not exemptions.
