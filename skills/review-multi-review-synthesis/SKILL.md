---
name: review-multi-review-synthesis
description: "Synthesize multiple reviews into ranked actions and residuals."
---

# Review Multi-Review Synthesis

Shared rhythm: [review-playbook-skeleton.md](references/review-playbook-skeleton.md).

Find material defects and reach a defensible terminal. Read
[references/convergent-review-method.md](references/convergent-review-method.md)
before running a formal review.

## Method

### Freeze the review contract

Record the objective, exact candidate, in-scope surfaces, non-goals, acceptance
predicates, risk floor, selected perspectives, checks, and stop condition.
Review evidence may reveal that a predicate was always necessary, but a new
preference cannot retroactively become a blocker.

### Review independently

Select perspectives with different failure models, such as semantic
correctness, boundary and dependency integrity, data and state, security,
operations, user behavior, and claim accuracy. Reviewers inspect the same
candidate independently before findings are consolidated.

### Verify orthogonally

Use the narrowest meaningful combination of type checks, tests, property or
differential checks, mutation tests, static analysis, replay, simulation, or
formal models. More reviewers repeating the same reasoning do not substitute
for an executable oracle.

### Classify and repair once

Apply the canonical finding and expansion classification from
`bound-request-scope`. Batch terminal blockers and material same-cause repairs;
include positive-net improvements only through its bounded value scan, and do
not let independent or speculative expansion extend this review.

### Close on the delta

After repair, review the changed delta, resolution of prior findings,
interactions with untouched behavior, same-cause surface, regression evidence,
exact candidate, and final claims. Do not restart an unbounded full review
unless the repair changed the architecture or invalidated the frozen review
contract.

## Stop condition

Close when all frozen predicates pass, category 1 and 2 findings are resolved,
the exact candidate passes the selected oracles, and reported claims do not
exceed evidence. Do not claim a percentage of all possible defects unless the
defect population and detection oracle are defined.

## Output

Produce a **Review Closure Record**:

- **Contract** — candidate, scope, predicates, perspectives, and stop rule.
- **Findings** — severity, category, evidence, owner, and resolution.
- **Verification** — checks and exact subject.
- **Closure verdict** — pass or named unresolved blocker.
- **Residual uncertainty** — bounded and non-blocking unless it violates the
  frozen risk floor.

## Boundaries

- This skill structures review; domain skills supply domain criteria.
- `bound-request-scope` owns value and expansion control.
- `evidence-and-claims-standard` owns the truthfulness of the closure claim.
- Independent reviewers increase coverage only when their perspectives or
  evidence channels differ.

## Routing examples

Use for “audit all of these skills and finish the repair,” “review this
migration without endless back-and-forth,” and “give a final accept/reject on
this exact candidate.” Do not route a casual request for one quick opinion.
