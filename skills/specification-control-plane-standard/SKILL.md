---
name: specification-control-plane-standard
description: "Policy: executable specs lifecycle—packets, evals, telemetry."
---

# Specification Control Plane Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
   If stakeholder needs, operating scenarios, quality attributes, constraints,
   or acceptance boundaries are unresolved, use `engineer-testable-requirements`
   before freezing the executable implementation specification.
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

