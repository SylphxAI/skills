---
id: ADR-0031-risk-and-contract-driven-test-coverage
status: accepted
date: 2026-07-31
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - engineering-methods
  - verification
---

# ADR-0031: Risk- and contract-driven test coverage

## Context

Agent-native development can change product behavior faster than manual UAT can
reliably inspect it. A single code-coverage percentage does not solve this
problem: it can show that code executed without showing that an assertion could
detect a wrong result, that a public contract remained compatible, that a state
machine preserved its invariants, or that a failed dependency recovered.

Mandating every available test method is the opposite error. It creates a slow,
duplicated verification estate whose cost is unrelated to the actual failure
model. Shared UAT and production observation are also moving environments, so
they cannot be the sole deterministic admission authority for an exact source
candidate.

## Decision

1. `engineering-standard` owns test-coverage design. No parallel
   `test-coverage` Skill or universal test workflow is created.
2. Coverage is a multidimensional claim-to-oracle model, not one scalar score.
   Its dimensions include material contracts and requirements, code decisions,
   oracle sensitivity, input space, state and sequence space, integration and
   compatibility boundaries, critical user journeys, failure and recovery, and
   relevant non-functional behavior.
3. Every material behavior, invariant, contract, expected failure, or selected
   failure mode has an automated semantic oracle capable of failing on a
   regression, or remains an explicit residual. The smallest capable test scope
   is preferred.
4. Structural coverage is diagnostic evidence. Line, branch, condition, or
   MC/DC coverage may reveal unexercised decisions, but no universal percentage
   proves correctness. Complexity, change frequency, exposure, criticality,
   statefulness, and recovery difficulty select where stronger evidence is
   valuable; they are not correctness verdicts themselves.
5. Advanced methods are activated by their failure model: property and
   model-based tests for invariant-rich state spaces; fuzzing and combinatorial
   testing for broad input or interaction spaces; mutation testing for oracle
   sensitivity; contract tests for independently evolving boundaries; critical
   journey E2E for assembled behavior; and simulation, fault injection, load,
   or security testing where those risks are material.
6. Tests bind to the exact candidate and use deterministic, isolated state where
   practical. Generated failures retain their seed, schedule, history, or
   minimized counterexample as a replayable regression. Live synthetic, canary,
   and bounded production observation complement rather than replace
   pre-production proof.
7. Test definitions, fixtures, contracts, and replay corpora live with their
   owning source. Execution results belong to CI, delivery evidence, or the live
   work/evidence owner; prose does not become a second test-result authority.
8. The suite is complete for a delivery claim when the selected material
   dimensions have decisive evidence or an explicit residual and the expected
   value of another test is lower than acting through a reversible delivery and
   recovery path. Completion never means exhaustive proof that no defect exists.

## Consequences

- Test design follows product promises and plausible failures rather than a
  universal pyramid, percentage, or tool checklist.
- Fast deterministic proof remains on the critical path; expensive exploration
  can run continuously without turning every candidate into a long soak.
- Agents can generate broad cases quickly, but independent contracts,
  invariants, models, differential implementations, or mutation remain
  necessary to avoid reproducing the same misconception in code and test.
- Coverage gaps become specific missing claims or failure classes instead of an
  ambiguous request to "add more tests."

## Verification

- `engineering-standard` links one progressive-disclosure coverage model and
  states the multidimensional rule in its canonical Testing section.
- `risk-matched-verification-standard` consumes that model when selecting
  expensive or runtime-dependent evidence.
- No new CI workflow or universal numeric coverage gate is introduced.
