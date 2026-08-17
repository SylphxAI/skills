---
name: maintain-product
description: Repair a product defect or regression at its owning layer. Use for live or dogfood failures, flaky paths, noisy errors, security or privacy defects, and other current user or operator harm.
---

# Maintain Product

Restore the affected contract with a focused owning-cause repair.

## Method

1. Define the observed symptom, affected users or operators, severity, current product contract, and strongest observed lifecycle layer.
2. Stabilize active harm with a safe reversible mitigation when service impact requires immediate action.
3. Reproduce the defect at the lowest semantic boundary that faithfully represents the affected behavior.
4. Locate the owning cause through current logs, traces, tests, recent changes, comparisons, or reduced inputs.
5. Repair the semantic owner and keep one implementation path.
6. Add or refine a regression check at the product behavior or public contract when it provides durable defect detection.
7. Run the reproducer and relevant affected-path checks on the exact candidate.
8. Remove temporary diagnostics, superseded containment, exploratory edits, and obsolete compatibility code.
9. Advance through landing, deployment, or live recovery when those states are part of the request and authority is available.

### Verification budget

- Select the cheapest check that can change the mitigation, repair, rollback, or claim; scale evidence to consequence.
- Stop when another check cannot change action, rollback, or claim. Record residual Unknowns instead of accumulating decorative proof.
- Unknown does not automatically block reversible narrow work; pause only when the next action is unsafe, irreversible, or requires a claim the evidence cannot support.

Read [Reproduction-driven repair](references/reproduction-driven-repair.md) when the cause, reproducer, nondeterminism, or test boundary needs deeper treatment. Use `implement-continuous-integration` when the product defect is the pipeline itself.

## Output

Return the symptom, cause, repair, changed path run, strongest truthful delivery state, and remaining external dependency.
