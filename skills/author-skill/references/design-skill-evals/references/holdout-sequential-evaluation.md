# Holdout and sequential evaluation

Repeatedly checking a fixed benchmark and editing toward its result turns the
benchmark into training data. Preserve promotion evidence with a protected
holdout and a declared sequential policy.

## Contract

1. Separate development cases, regression cases, and promotion holdouts.
2. Commit to the candidate, task-set digest, metrics, stopping rule, and maximum
   looks before revealing the protected run.
3. Track every exposure of a task or expected result to authors, answer models,
   judges, and optimization loops in a contamination ledger.
4. Use an anytime-valid confidence sequence or alpha-spending rule when a run
   may be inspected repeatedly; otherwise inspect only at the declared close.
5. Retire or quarantine leaked tasks and replenish holdouts from independent
   job shapes. Never relabel a seen task as hidden.

This controls evidence inflation; it does not replace realistic tasks,
deterministic safety oracles, or independent replication.

## Sources

- Howard et al., *Time-uniform, nonparametric, nonasymptotic confidence
  sequences*: <https://doi.org/10.1214/20-AOS1991>
- Dwork et al., *The Reusable Holdout*: <https://doi.org/10.1126/science.aaa9375>
