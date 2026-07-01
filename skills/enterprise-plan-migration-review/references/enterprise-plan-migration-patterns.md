# Enterprise Plan Migration Patterns

## Enterprise Plan Migration Review state machine

```text
cohort_selected -> entitlement_mapped -> billing_rehearsed -> notice_sent -> migration_executed -> access_verified -> renewal_audited
       |                  |                    |                 |                 |                    |
       v                  v                    v                 v                 v                    v
 wrong_cohort      entitlement_gap       invoice_mismatch   notice_gap       rollback_needed      exception_drift
```

## Rule IDs

- `plan-migration-1` — Map every cohort to current plan, target plan, contract term, entitlement delta, billing object, discount, invoice behavior, and owner.
- `plan-migration-2` — Separate customer-facing packaging promises from internal feature flags, billing meters, support tiers, procurement terms, and renewal notes.
- `plan-migration-3` — Require rehearsal for invoice changes, seat counts, usage caps, add-ons, credits, taxes, discounts, and revenue-recognition implications.
- `plan-migration-4` — Create explicit grandfathering and exception records with owner, expiry, renewal trigger, and support visibility.
- `plan-migration-5` — Send segment-specific communication before access or price changes, with opt-out or escalation path where policy allows.
- `plan-migration-6` — Verify migrated access from customer-visible state, not only billing or admin database writes.
- `plan-migration-7` — Track migration outcomes across failed payments, downgrade risk, support contacts, churn, expansion, and invoice disputes.
- `plan-migration-8` — Feed repeated exceptions back into packaging, pricing, entitlement architecture, and sales qualification.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Grandfathered contract | Keep exception with expiry | Contract and ARR impact | Hidden perpetual plan debt |
| Feature removed in target plan | Map alternative or amend | Usage and customer notice | Silent value loss |
| Invoice amount changes | Rehearse and notify | Billing preview | Dispute or churn spike |
| Usage cap introduced | Define grace and alerting | Metering accuracy | Unexpected lockout |
| Migration fails | Rollback or support-assisted fix | Access and billing diff | Broken customer access |

## Plan migration checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `plan_migration_cohort_selected`, `plan_migration_entitlement_mapped`, `plan_migration_billing_rehearsed`, `plan_migration_notice_sent`, `plan_migration_executed`, `plan_migration_access_verified`, `plan_migration_exception_recorded`.

Recommended properties: `account_id, cohort_id, current_plan, target_plan, entitlement_delta, billing_delta, discount_status, contract_status, notice_status, migration_status, rollback_status, exception_expiry, renewal_date, decision`.
