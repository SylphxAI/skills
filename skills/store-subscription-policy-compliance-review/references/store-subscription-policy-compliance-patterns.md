# Store Subscription Policy Compliance Patterns

## Store Subscription Policy Compliance Review state machine

```text
product_configured -> paywall_reviewed -> entitlement_tested -> metadata_matched -> reviewer_evidence_ready -> submitted -> monitored
       |                    |                 |                  |                  |                    |
       v                    v                 v                  v                  v                    v
 product_mismatch    disclosure_gap    entitlement_gap   metadata_gap       evidence_gap          rejected
```

## Rule IDs

- `store-subscription-1` — Map each subscription product to store product ID, price, period, trial/intro offer, entitlement, region, metadata, screenshots, and paywall copy.
- `store-subscription-2` — Separate policy needs for purchase, renewal, cancellation, restore, refund, grace period, price change, family sharing, and account deletion.
- `store-subscription-3` — Test entitlement state from receipts/server notifications across purchase, renewal, refund, expiration, upgrade, downgrade, grace, and billing retry.
- `store-subscription-4` — Ensure paywall and metadata disclose price, period, renewal, trial conversion, cancellation path, and included value clearly.
- `store-subscription-5` — Prepare reviewer evidence with screenshots, test account, product IDs, reproduction steps, server notification behavior, and support contact path.
- `store-subscription-6` — Coordinate support macros for subscription confusion, refunds, restore failures, billing retry, cancellation, and entitlement delay.
- `store-subscription-7` — Monitor post-launch purchase conversion, refund rate, billing errors, entitlement mismatch, review rejections, and support contacts.
- `store-subscription-8` — Review policy changes before launches, experiments, price changes, and new subscription tiers.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Intro offer | Verify eligibility and copy | Store config and paywall | Misleading trial |
| Restore failure | Block release or fix | Receipt test | Paid user locked out |
| Price change | Plan notice and metadata | Store policy/date | Customer surprise |
| Metadata mismatch | Update before submission | Screenshot/paywall diff | Review rejection |
| Server notification gap | Add backend proof | Notification test | Wrong entitlement |

## Store subscription compliance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `store_subscription_product_configured`, `store_subscription_paywall_reviewed`, `store_subscription_entitlement_tested`, `store_subscription_metadata_matched`, `store_subscription_reviewer_evidence_ready`, `store_subscription_submitted`, `store_subscription_issue_detected`.

Recommended properties: `store, app_id, product_id, subscription_tier, offer_type, price_period, entitlement_status, receipt_status, metadata_status, restore_status, cancellation_info_status, reviewer_evidence_status, decision`.
