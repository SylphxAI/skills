# Convergent Review Method

## Review contract template

```text
Objective:
Exact candidate:
In scope:
Non-goals:
Acceptance predicates:
Existing risk floor:
Perspectives:
Executable oracles:
Stop condition:
```

Freeze this before detailed inspection. Update it only when evidence proves the
contract internally contradictory or the owner changes the objective.

## Perspective selection

Choose perspectives based on distinct failure modes, not reviewer count.
Examples include:

- behavior and semantic correctness;
- architecture, dependency direction, and responsibility boundaries;
- state transitions, concurrency, data integrity, and recovery;
- security, privacy, abuse, and authority;
- operations, observability, delivery, and rollback;
- user journey, accessibility, and product contract;
- evidence, provenance, and completion-claim accuracy.

One reviewer may cover several low-risk perspectives. High-risk work benefits
from independent reviewers, but their findings must cite evidence and the lead
still adjudicates them.

## Coverage matrix

Track the finite obligations rather than claiming undefined completeness:

| Predicate or surface | Perspective | Evidence or oracle | Finding | Resolution |
| --- | --- | --- | --- | --- |

Coverage is complete when every frozen predicate and selected surface has an
observation or an explicitly justified non-applicability. `N/A` is a claim and
requires a reason.

## Finding contract

Every failing finding includes:

- exact affected subject and location;
- violated frozen predicate or same-cause relationship;
- reproducible evidence;
- consequence;
- smallest owning repair boundary; and
- regression proof expected after repair.

Do not fail a candidate for taste, an imagined future product, an undeclared
adversary, or optional hardening. Record high-value adjacent improvements under
the bounded value scan instead.

## Repair and closure

Consolidate duplicates by owning cause, repair category 1 and 2 findings as one
bounded batch, and preserve a finding ledger. Closure review verifies:

1. each finding's resolution;
2. the repair delta;
3. same-cause occurrences in the touched boundary;
4. interactions and regressions;
5. exact-candidate oracle results; and
6. the final claim-evidence record.

A broad redesign triggers a new review contract because it changes the subject.
A local correction does not justify restarting every perspective from zero.

## Using agents well

Parallelize perspectives or independent evidence acquisition. Do not ask many
agents to produce interchangeable general reviews. Diversity of prompt wording
alone does not establish independent failure behavior. Prefer different inputs,
methods, tools, hypotheses, and oracles.

## Research basis

This method synthesizes:

- Fagan inspection phases and explicit entry/exit discipline:
  <https://doi.org/10.1147/sj.153.0182>
- perspective-based reading, which assigns reviewers distinct stakeholder or
  artifact perspectives:
  <https://doi.org/10.1109/2.869376>
- mutation testing as a way to evaluate whether tests detect seeded faults:
  <https://doi.org/10.1109/TSE.2010.62>
- test-oracle and metamorphic-testing research for cases without simple known
  outputs:
  <https://doi.org/10.1109/TSE.2014.2372785>
- industrial use of TLA+ to expose design errors before implementation:
  <https://lamport.azurewebsites.net/tla/formal-methods-amazon.pdf>
- evidence that independently developed software versions can still fail in
  correlated ways:
  <https://doi.org/10.1109/TSE.1986.6312924>
- multi-agent debate as a useful reasoning technique, without treating
  consensus as proof:
  <https://arxiv.org/abs/2305.14325>
