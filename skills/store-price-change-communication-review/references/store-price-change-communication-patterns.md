# Store Price Change Communication Review Patterns

## Store Price Change Communication Review state machine

```text
price_change_scoped -> cohorts_mapped -> channel_rules_checked -> messaging_scheduled -> change_launched -> impact_monitored
       |                     |                 |                        |                    |                 |
       v                     v                 v                        v                    v                 v
 scope_gap            cohort_confusion    consent_gap             copy_mismatch       support_spike    churn_blindspot
```

## Rule IDs

- `store-price-change-1` — Map every affected product ID, plan, entitlement, country, currency, platform, cohort, renewal date, and billing provider before writing copy.
- `store-price-change-2` — Check platform-specific consent, notification, review, timing, grace, cancellation, refund, and disclosure expectations for each channel.
- `store-price-change-3` — Separate price increases, decreases, FX/regional adjustments, intro-offer endings, trial conversions, grandfathering changes, and package migrations.
- `store-price-change-4` — Keep paywall copy, store metadata, screenshots, pricing pages, emails, in-app notices, help center, and support macros aligned with actual billing behavior.
- `store-price-change-5` — Explain user choices plainly: new price, effective date, value rationale, what happens if they do nothing, cancellation path, refund route, and support contact.
- `store-price-change-6` — Preserve trust with grandfathering or segmentation decisions documented by cohort, business reason, margin impact, and support risk.
- `store-price-change-7` — Instrument notice delivered, consent required, consent accepted, renewal succeeded, cancellation, refund, support contact, complaint, and churn events.
- `store-price-change-8` — Run post-change monitoring by channel, region, cohort, and plan so billing errors and communication failures are visible.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Price increase | Check consent and notice | Cohort timeline | Trust breach |
| Regional FX update | Segment by country | Currency matrix | Unexpected charge |
| Grandfathering sunset | Explain choice | Cohort copy | Churn spike |
| Store plus direct billing | Coordinate channels | Provider rule map | Inconsistent terms |
| Support spike | Activate macro path | Issue taxonomy | Refund confusion |

## Price-change communication checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `store_price_change_scoped`, `store_price_change_cohort_mapped`, `store_price_change_notice_scheduled`, `store_price_change_notice_delivered`, `store_price_change_consent_recorded`, `store_price_change_launched`, `store_price_change_support_contacted`, `store_price_change_impact_reviewed`.

Recommended properties: `product_id, store_channel, country, currency, old_price, new_price, price_change_type, cohort_id, renewal_date, consent_required, notice_surface, message_version, support_topic, refund_status, cancellation_status, churn_status, decision`.
