---
status: accepted
date: 2026-07-19
owners:
  - SylphxAI
---

# ADR-0008: Separate claim assurance, critical analysis, and review closure

## Context

Agents need reusable methods to prevent unsupported completion claims, examine
competing explanations, and review complex changes thoroughly without creating
an endless sequence of new blockers. These are related jobs but have different
artifacts and routing triggers. Combining them into one general rigor package
would make routing ambiguous and encourage every task to inherit the heaviest
process.

## Decision

Maintain three independent instruction packages:

1. `evidence-and-claims-standard` produces a Claim-Evidence Record and governs
   whether factual, status, causality, delivery, and completion claims are
   supportable.
2. `critical-analysis` produces a Critical Analysis Brief using competing
   hypotheses, disconfirming evidence, assumptions, and calibrated confidence.
3. `convergent-review` produces a Review Closure Record using frozen acceptance,
   distinct perspectives, executable oracles, batched repair, and fixed exit
   criteria.

The packages compose with existing domain instructions. They do not create a
new service, gate, benchmark platform, or operational authority. Agent agreement
is not evidence; independent methods and external observations provide value.

## Consequences

- Completion and status language has a dedicated evidence contract.
- Critical analysis is available without forcing a formal review cycle.
- Formal reviews may be high coverage while remaining finite.
- Existing packages continue to own decisions, scope, delivery, engineering,
  and nondeterministic verification.

## Locator note

This decision was originally drafted under a colliding `ADR-0005` filename.
The stable locator is `ADR-0008`. `ADR-0005` exclusively identifies package-digest
and whole-target synchronization integrity.
