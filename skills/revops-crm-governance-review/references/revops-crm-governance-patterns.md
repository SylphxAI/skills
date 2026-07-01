# RevOps CRM Governance Patterns

## RevOps CRM Governance Review state machine

```text
record_created -> routed -> stage_updated -> required_fields_checked -> forecasted -> reported
      |             |             |                         |             |
      v             v             v                         v             v
 duplicate     owner_missing  invalid_stage           hygiene_failed  report_blocked
```

## Rule IDs

- `revops-crm-1` — Define source of truth and owner for accounts, contacts, leads, opportunities, activities, products, contracts, and renewals.
- `revops-crm-2` — Document lifecycle stages, stage entry/exit criteria, required fields, allowed values, owner routing, SLA, and handoff expectations.
- `revops-crm-3` — Separate marketing attribution, sales activity, opportunity forecast, billing/order records, customer success health, and product usage data.
- `revops-crm-4` — Control CRM automations, enrichment, integrations, dedupe, merges, field changes, and permission changes through review and audit logs.
- `revops-crm-5` — Run data-quality checks for missing owners, stale stages, duplicate accounts, invalid close dates, inconsistent sources, and forecast risk.
- `revops-crm-6` — Align dashboards and compensation inputs with governed fields, not ad hoc spreadsheet overrides.
- `revops-crm-7` — Train users on why fields matter and remove fields that do not drive decisions, routing, compliance, or reporting.
- `revops-crm-8` — Review governance after pricing changes, new segments, new channels, acquisitions, and sales process changes.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New lifecycle stage | Define exit criteria and reports | Process owner and dashboard impact | Stage sprawl |
| Routing rule | Use clear ownership source | Territory/segment data | Lead lost or duplicated |
| Forecast field | Require evidence and cadence | Pipeline policy | Sandbag or inflated forecast |
| Integration change | Test downstream contracts | Field mapping and rollback | Broken reporting |
| Duplicate accounts | Merge with ownership review | Hierarchy and activity data | Lost history |

## CRM governance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `crm_record_created`, `crm_record_routed`, `crm_stage_changed`, `crm_required_field_failed`, `crm_duplicate_detected`, `crm_governance_change_approved`, `crm_report_certified`.

Recommended properties: `object_type, record_id, owner_team, lifecycle_stage, source_system, route_rule, field_name, data_quality_status, duplicate_status, forecast_category, integration_name, change_type, decision`.
