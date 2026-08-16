---
name: synthesize-domain-reviews
description: "Synthesize multiple domain reviews into one defensible closure decision."
---

# Synthesize Domain Reviews

# Review Multi-Review Synthesis

Find material defects and reach a defensible terminal. Read
[references/convergent-review-method.md](references/convergent-review-method.md)
before running a formal review.

## Method

### Freeze the review contract

Record the objective, exact candidate, in-scope surfaces, non-goals, acceptance
predicates, risk floor, selected perspectives, checks, and stop condition.
Review evidence may reveal that a predicate was always necessary; treat a newly
introduced preference as non-blocking adjacent work.

### Review independently

Select perspectives with different failure models, such as semantic
correctness, boundary and dependency integrity, data and state, security,
operations, user behavior, and claim accuracy. Reviewers inspect the same
candidate independently before findings are consolidated.

### Verify orthogonally

Use the narrowest meaningful combination of type checks, tests, property or
differential checks, mutation tests, static analysis, replay, simulation, or
formal models. Add reviewers only when they contribute a distinct perspective
or executable oracle.

### Classify and repair once

Apply the canonical finding and expansion classification from
`bound-request-scope`. Batch terminal blockers and material same-cause repairs;
include improvements whose expected product value exceeds their cost and risk, and keep
independent or speculative expansion outside this review.

### Close on the delta

After repair, review the changed delta, resolution of prior findings,
interactions with untouched behavior, same-cause surface, regression evidence,
exact candidate, and final claims. Restart the full review when the repair
changes the architecture or invalidates the frozen review contract; otherwise
review the affected delta.

## Stop condition

Close when all frozen predicates pass, category 1 and 2 findings are resolved,
the exact candidate passes the selected oracles, and reported claims stay within
the evidence. Quantify coverage of all possible defects only when the defect
population and detection oracle are defined.

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
- The exact owner results and current observations support the closure claim.
- Independent reviewers increase coverage only when their perspectives or
  evidence channels differ.

## Routing examples

Use for “audit all of these skills and finish the repair,” “review this
migration to one final disposition,” and “give a final disposition on this
exact candidate.” Route a casual request for one quick opinion directly to
the matching review skill.
