# Outcomes, Health, and Account State

## Outcome hierarchy

```text
business outcome
  -> operational behavior or decision changed
    -> critical product workflow completed reliably
      -> capability configured and adopted by the right roles
        -> prerequisites, data, access, and skills ready
```

Track leading milestones without confusing them with the final outcome. A customer can have high activity and low realized value, or low frequency and high value for an infrequent critical job.

## Health dimensions

| Dimension | Example evidence | Do not conflate with |
| --- | --- | --- |
| Setup/readiness | integrations, roles, data, configuration validated | ongoing adoption |
| Workflow adoption | critical jobs completed by intended roles | raw sessions or seats |
| Value realization | time/cost/risk/revenue outcome with customer agreement | product clicks |
| Proficiency | successful self-service, low avoidable error, skill proof | tenure |
| Reliability/trust | incidents, data quality, security concerns, promise gaps | support ticket count alone |
| Relationship coverage | champion, admin, operator, economic owner alignment | number of contacts |
| Support friction | severity, repeat cause, time to durable resolution | all help-seeking as bad |
| Commercial state | term, payment, procurement, decision date | product success |
| Expansion readiness | new validated outcome and healthy foundation | seller interest |

Each signal records source, definition, cohort, direction, window, freshness, quality, missing behavior, sensitivity, and action. Preserve dimensions even if a summary score is later computed.

## Account-state machine

```text
contracted -> readiness -> activating -> adopting -> value_realized -> stable
     |           |             |            |              |          |
     v           v             v            v              v          v
 scope_gap   migration_block  stalled    shallow_use   value_disputed  risk_detected
                                                                    |
                           recovered <-> at_risk -> renewal_decision -> renewed_or_churned
                                                 |
                                                 v
                                       expansion_ready_or_not
```

States may be multi-dimensional; do not force one linear label when stakeholders or workflows differ. Every state transition cites the evidence delta and rule version.

## Confidence and freshness

Confidence depends on source coverage, measurement validity, recency relative to product cadence, consistency across signals, and customer confirmation. `unknown` is a first-class state. Stale data should decay confidence or route verification, never silently preserve a healthy label.
