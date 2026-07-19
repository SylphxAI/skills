---
name: decision-quality-standard
description: "Select among materially distinct technical, product, commercial, or operating options and record the commitment, trade-offs, reversibility, and decision evidence. Use after credible options are formed and one durable choice is required. Do not use for unknown-cause diagnosis, exact-candidate pass/fail review, trivial reversible edits, or execution of an already selected option."
---
# Decision Quality Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

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
- Use `decision-optimization-modeling` when allocation, routing, scheduling,
  capacity, inventory, or resource policy requires an explicit constrained
  mathematical model rather than qualitative option selection.

## When not to use

- Product-specific live coordination operations → the matching adapter Skill
  and that product's current API or tool schema.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
