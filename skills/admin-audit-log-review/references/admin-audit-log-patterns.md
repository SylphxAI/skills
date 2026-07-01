# Admin Audit Log Patterns

## Admin Audit Log Review state machine

```text
admin_action_requested -> authorization_checked -> action_completed -> audit_event_emitted -> event_retained -> reviewed
          |                     |                  |                    |                 |
          v                     v                  v                    v                 v
 denied                 policy_gap           emit_failed          retention_gap      alert_triggered
```

## Rule IDs

- `admin-audit-1` — Log privileged actions that change access, configuration, billing, security posture, integrations, data lifecycle, support access, and compliance evidence.
- `admin-audit-2` — Capture actor, actor type, target, action, result, timestamp, IP/device/source, workspace/account, correlation ID, before/after summary, and reason where appropriate.
- `admin-audit-3` — Redact secrets and sensitive payloads while retaining enough metadata for investigation and customer proof.
- `admin-audit-4` — Protect audit logs with append-only or tamper-evident storage, access controls, retention policy, and deletion/legal-hold behavior.
- `admin-audit-5` — Expose customer-facing search, filters, exports, API/SIEM streaming, and alerting for enterprise-relevant events.
- `admin-audit-6` — Define alert rules for risky admin actions such as SSO disablement, role escalation, token creation, mass export, deletion, and support impersonation.
- `admin-audit-7` — Test event coverage through fixtures and release gates whenever admin settings, permissions, billing, or integrations change.
- `admin-audit-8` — Document limitations and migration/backfill behavior when adding audit coverage to existing products.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Role change | Log actor, target, before/after | Permission model | Untraceable privilege escalation |
| Token created | Log metadata, not token value | Token event contract | Secret leakage |
| Data export | Alert and retain evidence | Export scope and requester | Undetected exfiltration |
| Support access | Log purpose and approver | Support case and account | Customer trust failure |
| Retention request | Apply policy/legal hold | Retention class | Missing audit evidence |

## Admin audit-log checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `admin_action_authorized`, `admin_role_changed`, `admin_token_created`, `admin_data_exported`, `admin_setting_changed`, `admin_support_accessed`, `admin_audit_log_exported`.

Recommended properties: `account_id, actor_id, actor_type, action, target_type, target_id, result, source_ip, correlation_id, risk_tier, before_after_summary, retention_class, alert_status, decision`.
