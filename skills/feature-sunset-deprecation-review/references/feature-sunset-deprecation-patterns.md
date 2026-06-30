# Feature Sunset Deprecation Patterns

## Deprecation state machine

```text
sunset_proposed -> usage_analyzed -> alternative_defined -> notice_ready -> announced -> migration_open -> final_warning -> disabled -> cleaned_up -> closed
       |                  |                  |                |             |              |                |            |             |
       v                  v                  v                v             v              v                v            v             v
 rejected          impact_unknown      no_alternative    legal_blocked  paused      exception_granted  extended   rollback      cleanup_blocked
```

## Rule IDs

- `sunset-1` — Classify what is being removed: UI feature, API version, plan, integration, platform, data format, workflow, or event.
- `sunset-2` — Measure usage by account, user, revenue, contract, support volume, integration calls, and downstream dependency.
- `sunset-3` — Define the customer job and replacement path before announcing a removal.
- `sunset-4` — Notice timeline must match blast radius: silent cleanup, low-risk UI, admin workflow, paid feature, enterprise contract, or public API.
- `sunset-5` — Provide migration tooling, docs, exports, compatibility mode, or assisted support where customer effort is material.
- `sunset-6` — Use staged communication: owner notice, in-product banner, email, changelog, docs, API headers, dashboard, and support macros.
- `sunset-7` — Exceptions need expiry, owner, customer record, cost/risk note, and next review date.
- `sunset-8` — Kill date needs rollback/extension criteria and monitoring for surprise usage.
- `sunset-9` — Cleanup must remove code, flags, docs, metrics, support macros, billing references, and stale permissions.
- `sunset-10` — Post-sunset review should capture churn, support load, migration success, and trust impact.

## Decision table

| Sunset target | Minimum notice | Migration asset | Risk guardrail |
| --- | --- | --- | --- |
| Unused internal beta | Short notice or direct outreach | Removal note | Verify no active users |
| Public API version | Long dated notice | Version guide, headers, SDK update | Error monitoring and key account outreach |
| Paid plan feature | Contract-aware notice | Alternative or credit policy | Revenue/churn review and support escalation |
| Third-party integration | Partner/customer notice | Replacement connector or export | Dependency inventory and fallback path |
| Legacy game event | In-game calendar | Reward conversion or archive | Player trust and economy impact |

## Sunset checklist

- Usage and impacted account list are current.
- Reason, replacement, and customer benefit are truthful.
- Comms timeline covers in-product, email, docs, changelog, API, and support.
- Migration tooling and exception policy exist.
- Kill date, rollback/extension criteria, and monitoring are defined.
- Cleanup removes stale code, docs, analytics, billing, and permissions.

## Event schema

Track: `sunset_proposed`, `sunset_usage_measured`, `sunset_notice_sent`, `sunset_migration_started`, `sunset_exception_created`, `sunset_final_warning_sent`, `sunset_disabled`, `sunset_cleanup_completed`, `sunset_support_contacted`.

Recommended properties: `sunset_id`, `capability_type`, `feature_name`, `usage_accounts`, `usage_users`, `revenue_impact_bucket`, `contract_impact`, `notice_channel`, `days_until_disable`, `migration_asset`, `exception_expiry`, `support_volume`, `churn_observed`, `cleanup_complete`.
