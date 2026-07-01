# board-metrics-operating-review behavior example

skill: board-metrics-operating-review

## Positive prompt

> Prepare a board metrics operating review for a SaaS company with ARR, MRR, NRR, GRR, churn cohorts, CAC, gross margin, pipeline, product usage, support load, incidents, burn, runway, forecast variance, owner signoff, board asks, and action follow-up.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines metric dictionary, source-of-truth map, reconciliation boundaries, owner signoff, cohort/segment cuts, variance narrative, forecast bridge, board asks, and action register.
- Separates accounting, billing, CRM, product analytics, support, incident, hiring, forecast, board narrative, and decision/action follow-up metrics.
- Flags spreadsheet theater, metric sprawl, reconciliation gaps, owner gaps, hidden missed-plan drivers, vanity narratives, action drift, and metric drift after system changes.
- Includes a current-period board snapshot with actual, plan, prior, variance, status, owner, signoff, confidence, and decision implication for board-critical metrics.
- Shows owner signoff as a release artifact and avoids inventing release-ready period values by using clearly prefixed illustrative_not_source_of_truth values plus data-request actions.
- When source values are absent, provides a clearly labeled illustrative_not_source_of_truth current-period snapshot and driver-based variance bridge while blocking release until real values and signoff are supplied.
- Covers ARR, MRR, NRR, GRR, churn cohorts, CAC/payback, gross margin, pipeline, product usage, support load, incidents, burn, runway, and forecast variance without dropping requested metrics.

It should also produce the artifact shape requested by `skills/board-metrics-operating-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review delegated admin boundaries.

The skill should not load for this prompt unless the user adds an explicit board-metrics-operating-review context.

## Expected behavior

- Defines metric dictionary, source-of-truth map, reconciliation boundaries, owner signoff, cohort/segment cuts, variance narrative, forecast bridge, board asks, and action register.
- Separates accounting, billing, CRM, product analytics, support, incident, hiring, forecast, board narrative, and decision/action follow-up metrics.
- Flags spreadsheet theater, metric sprawl, reconciliation gaps, owner gaps, hidden missed-plan drivers, vanity narratives, action drift, and metric drift after system changes.
- Includes a current-period board snapshot with actual, plan, prior, variance, status, owner, signoff, confidence, and decision implication for board-critical metrics.
- Shows owner signoff as a release artifact and avoids inventing release-ready period values by using clearly prefixed illustrative_not_source_of_truth values plus data-request actions.
- When source values are absent, provides a clearly labeled illustrative_not_source_of_truth current-period snapshot and driver-based variance bridge while blocking release until real values and signoff are supplied.
