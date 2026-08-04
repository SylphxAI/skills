---
name: risk-matched-verification-standard
description: "Policy: verification depth matched to failure risk—evidence class, gates, residuals."
---
# Risk-Matched Verification Standard

Policy constraints—apply while doing another matching job; not a standalone product job cycle.

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

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.

