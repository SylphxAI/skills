---
name: engineering-standard
description: "Binding engineering standard for durable product code: safety, concurrency, observability, security, migrations, tests, and clean module boundaries. Use when designing, reviewing, refactoring, or migrating implementation, contracts, storage, or runtime paths. Do not use for pure commercial packaging decisions or live Work Graph operations."
---
# Engineering Standard

This is a **Standard Skill** (`packageKind: standard`). It states what must hold
for durable engineering work. It is not a single-job procedure checklist.

## Authority

- Binding for new development and material refactors when applicable.
- Canonical home: `skills/engineering-standard/` (author here; do not regenerate
  from a second prose SSOT).
- Supersedes temporary alias intent for legacy `doctrine-engineering` after
  consumer cutover (alias map lives in catalog tooling when admitted).

## Method

1. Load this package when changing architecture, contracts, storage, concurrency,
   security boundaries, or delivery-critical runtime paths.
2. Read [references/binding-predicates.md](references/binding-predicates.md) for
   the full predicate set.
3. Apply the strongest relevant subset; price and verify tradeoffs in code,
   tests, or an ADR as appropriate.
4. Prefer schema, test, and ADR homes for durable facts over copying this body
   into product repos.
5. Procedure Skills that depend on this standard should declare a catalog
   dependency on `engineering-standard` rather than restating predicates.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local technical ADRs.
- Does not auto-route as a stable “proven” procedure; it is binding policy text
  with separate conformance evidence.

## When not to use

- Commercial packaging, pricing, or entitlement decisions alone → commercial-decision class packages.
- Pure documentation wording with no engineering change → documentation standard (when admitted).
- Live Work Graph claim/lease/checkpoint operations → Control Plane MCP tools.
- One-off scripts with no durable product surface and no shared contract impact.

## Output format

When applying this standard, produce:

1. **Applicability** — what changed and why this standard applies.
2. **Predicates in scope** — which binding properties are relevant.
3. **Evidence** — tests, schemas, ADRs, or benchmarks that verify them.
4. **Gaps** — any residual risk with owner and follow-up.

## Guardrails

- Fail closed on secret material in source and logs.
- Never treat health/readiness probes as product capability proof.
- Prefer expand-contract migrations over big-bang cutovers for shared state.
