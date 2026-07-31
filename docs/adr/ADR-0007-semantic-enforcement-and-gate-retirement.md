---
id: ADR-0007-semantic-enforcement-and-gate-retirement
status: accepted
date: 2026-07-19
decision_owner: SylphxAI
contributors: []
decision_mode: complementary
typed_scope:
  repository:
    - SylphxAI/skills
  capability_id:
    - static-instruction-packages
  surface:
    - agent
    - cli
amends: []
supersedes: []
relates: []
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
   Lexical scanning remains valid when the bytes themselves are the controlled
   security, legal, or publication surface; it must not claim a non-lexical
   architecture or runtime property.
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
7. PR prose is intent, not admission authority. Risk and affected-surface
   classification come from the exact diff, contracts, dependency/ownership
   graph, and typed project facts. A PR-body keyword may improve presentation;
   it cannot grant, waive, or prove a control.
8. Structured configuration is parsed and exercised. Token presence in a
   Dockerfile, package manifest, or workflow does not prove the resolved
   dependency, built artifact, executed job, or stable required context.
9. Evidence is placed by expected decision value: fast deterministic material
   proof in presubmit; expensive backstops in postsubmit, release, or scheduled
   lanes; formatting, prose, and naming feedback in local/advisory tooling;
   duplicate, self-authored, retired, and no-action controls deleted.

## Consequences

- Architecture boundaries stay machine-enforced without coupling tests to
  source prose.
- Some current source-string tests become dependency rules, public-surface or
  behavior tests; others are deleted as duplicate or retired migration proof.
- CI becomes smaller and more stable while preserving migration safety,
  schema/API compatibility, security, artifact integrity, and real behavior.
- A green check can no longer be manufactured merely by mentioning the
  expected script, status, file, or term.

## Verification

- Skills catalog/schema and executable runtime behavior remain blocking.
- Prose-presence, repository-wide vocabulary, duplicated policy, and
  workflow-name meta tests are removed from the blocking Skills test suite.
- Any remaining source scanner either owns an actual lexical surface or records
  its exact migration-fence retirement predicate.
