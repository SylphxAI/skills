---
name: risk-matched-verification-standard
description: "Select evaluation, replay, simulation, model, canary, and long-observation evidence in proportion to the actual failure model and residual uncertainty without blocking unrelated delivery. Use when deterministic unit and integration tests cannot fully verify AI, probabilistic, distributed, concurrent, time-dependent, soak, or runtime behavior. Use CI Admission for flaky-check attribution or quarantine; do not add expensive verification machinery to an ordinary deterministic code path."
---
# Risk-Matched Verification Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

Focused methods:

- [Verification coverage model](../engineering-standard/references/verification-coverage-model.md)
- [Oracle-free verification](../engineering-standard/references/oracle-free-verification.md)
- [Control-effectiveness verification](../engineering-standard/references/control-effectiveness.md)

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.


## Composition and output

Apply this standard as constraints on the artifact requested by the user or
owned by the primary procedure. Do not emit a separate per-standard compliance
report merely because this Skill was injected.

Integrate only material obligations, deviations, evidence, and gaps into the
primary artifact or final status. When conformance assessment is itself the
requested job, produce one standalone domain conformance record from this
standard.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.

## When not to use

- Product-specific live coordination operations → the matching adapter Skill
  and that product's current API or tool schema.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
