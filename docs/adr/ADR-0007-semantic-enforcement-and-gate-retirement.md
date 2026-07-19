---
status: accepted
date: 2026-07-19
owners:
  - SylphxAI
---

# ADR-0007: Prefer semantic enforcement and retire temporary gates

## Context

Agents can cheaply create tests, scripts, reports, and CI jobs. That advantage
became a liability when architecture rules were encoded as source-text
assertions and each defect or migration slice added another bespoke gate.
These checks often freeze implementation spelling, duplicate stronger proof,
survive beyond migration, and consume maintenance and CI capacity without
proportionate confidence.

Architecture enforcement remains valuable. The problem is mechanism selection
and lifecycle, not automation itself.

## Decision

1. Enforce each invariant at the lowest semantic layer that can decide it:
   compiler/type/schema/module visibility, then AST or dependency/build graph,
   then behavioral contract/property/differential proof, with CI as execution
   and aggregation rather than a separate semantic authority.
2. Durable tests must not read production source as text to require or forbid
   implementation tokens, names, call order, file placement, or import strings.
   Such change-detector tests are allowed only as an expiring migration fence
   when no semantic mechanism can yet express the temporary condition.
3. One material invariant has one proof owner. A new incident, reviewer
   finding, or migration slice does not automatically create a new lint, test,
   report, workflow, or required context.
4. A custom gate is admitted only when it detects a named material failure not
   already covered, is deterministic and low-noise, uses the strongest
   available semantic input, and has lower lifecycle cost than the risk it
   removes.
5. Temporary migration gates declare their active condition and retirement
   predicate. Cutover completion removes source-parity workflows, no-old-path
   checks, mutable ledgers, and rebind machinery that no longer protect a live
   compatibility boundary. Durable product tests remain.
6. No meta-service or meta-lint is introduced to police this rule. Standards,
   bounded review, and direct portfolio cleanup own convergence.

## Consequences

- Architecture boundaries stay machine-enforced without coupling tests to
  source prose.
- Some current source-string tests become dependency rules, public-surface or
  behavior tests; others are deleted as duplicate or retired migration proof.
- CI becomes smaller and more stable while preserving migration safety,
  schema/API compatibility, security, artifact integrity, and real behavior.

## Verification

- Skills validation and catalog freshness pass.
- Representative guidance routes compiler/graph/AST/behavioral mechanisms
  ahead of source-text scanning.
- Portfolio cleanup records any remaining temporary fence with its exact
  retirement predicate.
