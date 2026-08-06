# Revenue System and CRM Truth

## Fact classes

| Class | Example | Canonical behavior |
| --- | --- | --- |
| Observed event | form submitted, meeting held, product action | immutable source-linked event |
| Customer-stated fact | problem, timing, desired outcome | preserve source/date/context |
| Internal assertion | qualification, next step, amount | owner, confidence, expiry, challengeable |
| Prediction | win/date/amount probability | model/version/snapshot/calibration |
| Approval | discount or exception authorized | authority, scope, expiry |
| Commitment | approved customer-visible promise | typed owner/evidence, not free text |
| Contract/bookings | executed authoritative agreement | external contract owner |
| Billing/cash/revenue | invoice, settlement, recognition | finance/payment owner |
| Customer outcome | value achieved or disputed | customer-success/product evidence |

## Opportunity state example

```text
identified -> evidence_pending -> qualified -> solution_validating -> commercial_review
     |              |              |                 |                    |
     v              v              v                 v                    v
 duplicate      nurture_or_end  disqualified     proof_failed         approval_blocked
                                                                        |
             lost_or_dormant <- decision -> contract_process -> closed_won -> handoff_accepted
```

Stages must define entry evidence, exit evidence, required fields only when knowable, expiry/stale behavior, permitted reversal, terminal reason, next owner/action, and downstream effect. Do not encode buyer journey and seller task list into one ambiguous stage.

## Field contract

```text
field_id, business_definition, object, type, source_and_allowed_writers,
required_state, unknown_and_null_semantics, validation, sensitivity,
history, freshness_or_expiry, downstream_consumers, change_owner
```

## Dedupe and merge

Separate deterministic identifiers, normalized contact points, organization/domain evidence, fuzzy suggestions, and human/authority decisions. A merge must preserve provenance, relationships, activities, consent, ownership, opportunity links, conflicts, and reversible audit. Never auto-merge tenants or people from a shared domain alone.

## Data quality

Measure definition validity, required-at-state completeness, source provenance, freshness, duplicate/conflict rate, stage evidence, invalid transitions, owner/routing correctness, downstream reconciliation, and unused-field/report cost. A 100% populated field with invented defaults is lower quality than an explicit unknown.
