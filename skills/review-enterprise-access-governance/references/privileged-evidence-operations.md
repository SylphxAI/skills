# Privileged Evidence and Operations

Use this reference to govern high-impact actions, support and emergency access,
customer audit evidence, access reviews, and access-specific exceptions.

## Contents

- [High-impact action matrix](#high-impact-action-matrix)
- [Privileged access states](#privileged-access-states)
- [Audit event contract](#audit-event-contract)
- [Access review contract](#access-review-contract)
- [Access exception contract](#access-exception-contract)
- [Automation and failure behavior](#automation-and-failure-behavior)
- [Decision-grade measures](#decision-grade-measures)

## High-impact action matrix

Build one row per action rather than one generic “admin” rule:

| Field | Question |
| --- | --- |
| Action/resource/scope | What exact effect and boundary are controlled? |
| Blast radius | Which tenants, users, data, money, security, or availability change? |
| Eligible authority | Who may request, approve, execute, and revoke? |
| Preconditions | Which current grants, ownership, source, or system states must hold? |
| Separation rule | Which combinations require another authority or are forbidden? |
| Step-up/elevation | Is stronger authentication or temporary elevation required by current policy? |
| Evidence | What proves request, approval, execution, and result? |
| Notification | Which affected customer/admin should know, and through which safe channel? |
| Failure/retry | How are timeout, duplicate, partial completion, or dependency outage handled? |
| Audit/alert | Which event, correlation, review, or alert must exist? |
| Reversal/recovery | What can be undone, repaired, transferred, or escalated? |

Do not invent requirements such as dual approval. Derive the control from current
authority, blast radius, reversibility, and separation needs; record the decision.

## Privileged access states

```text
request_created -> eligibility_checked -> approval_bound -> elevation_active
       |                   |                   |                  |
       v                   v                   v                  v
 invalid_or_duplicate  source_conflict     denied_or_expired  action_observed

action_observed -> elevation_ended -> post_use_reviewed -> closed
       |                  |                     |              |
       v                  v                     v              v
 unexpected_action   revoke_failed        investigation     remediation_proved
```

Bind access to the requested tenant/resource/action and time window. Where the
implementation permits, issue a distinct privileged session rather than mutating
a standing role. Define behavior if approval or audit dependencies are degraded.

### Support access

Require a legitimate support/implementation purpose, customer-consent policy,
case linkage, least scope, time bound, safe customer visibility, action audit,
data-handling rule, and immediate revocation. Separate “view diagnostic state,”
“impersonate experience,” and “change customer state.” Do not let a support tool
bypass the same underlying authorization contract.

### Break-glass

Define qualifying emergency, authorized actors, narrow capabilities, secure
credential/elevation mechanism, notification/alert, maximum duration, automatic
revoke, actions allowed/forbidden, evidence retention, post-use review, and
credential rotation or restoration. Test the path; do not leave a permanent
undocumented superuser as the emergency mechanism.

## Audit event contract

Emit a durable event for privileged grant decisions and consequential actions:

```text
event_id / occurred_at / recorded_at / tenant_id / environment
actor_id / actor_type / authority_path_or_grant_ids / action / target_type / target_id
scope / result / reason_category / approval_or_case_id / correlation_id
before_after_safe_summary / source / risk_class / schema_version
retention_class / customer_visibility / redaction_version
```

Never log token values, credentials, raw secrets, or unnecessary sensitive
payloads. Keep enough semantic context to investigate and explain the action.
Before/after summaries should identify meaningful changed fields without copying
full confidential objects.

Define:

- append-only or tamper-evident ownership and access control;
- event delivery/retry, duplicate and late-arrival behavior;
- retention, legal-hold, deletion, privacy, and customer-export authorities;
- customer search/filter/export/API/SIEM projection where applicable;
- redaction and visibility differences between customer and internal evidence;
- alert conditions for risky grants/actions without embedding unstable thresholds
  in this skill;
- coverage tests whenever privileged product actions change.

An emitted count is not audit completeness. Maintain a privileged-action registry
and prove each critical action produces a queryable, semantically correct event.

## Access review contract

Create a reproducible review snapshot:

```text
campaign_id / population rule and snapshot time / tenant and scope
principal / grant paths / role-permission version / source freshness
last authorized use or unavailable status / risk and ownership context
reviewer authority / decision (keep, change, revoke, investigate)
justification / remediation action / completion evidence / due and escalation
```

Separate campaign sent, response received, decision made, enforcement changed,
and reconciliation passed. Completion requires the governed action and evidence,
not a checkbox. Define nonresponse and departed-reviewer behavior.

Review on risk- and lifecycle-based triggers, including ownership change, mover or
leaver, stale support/elevation, source drift, privilege template change, tenant
restructure, dormant service account, expired exception, and incident evidence.
Use calendar cadence only as a backstop where current policy requires it.

## Access exception contract

Use access exceptions only for bounded deviations in grants, role lifecycle,
support/elevation, review timing, or action gating:

```text
exception_id / exact policy-control version / tenant/principal/resource/action scope
reason and evidence / risk and affected parties / approving authority / risk owner
compensating control / monitoring / effective_at / expires_at
renewal trigger / remediation target / current status / closure evidence
```

States:

```text
requested -> classified -> authority_reviewed -> active_temporary -> due
    |             |                |                    |             |
    v             v                v                    v             v
not_an_exception standard_path  rejected          control_failed  renewed_or_closed
```

Do not use an access exception to promise a security control that does not exist,
alter a customer contract, bypass law, or create cross-tenant risk. Route those
questions to security, legal/commercial, privacy, or engineering owners.

## Automation and failure behavior

Build policy and evidence as machine-queryable, versioned records. Automate:

- source ingestion with ordering, deduplication, and freshness state;
- grant/revoke/elevation workflows and notifications;
- desired-versus-effective reconciliation and source conflict queues;
- expiry, recertification, ownership/orphan, and access-review triggers;
- audit coverage checks and customer export projections;
- exception reminders, safe restriction, renewal, and closure;
- evidence packets for authorized reviewers;
- reversible action, retry, rollback, and incident routing.

Define per dependency whether to fail closed, fail open, cap, queue, preserve a
bounded last-known state, or degrade a capability. Base the choice on blast
radius, current authority, reversibility, and customer harm; never use one global
outage behavior for all access decisions.

## Decision-grade measures

Measure with defined population, window, version, and authoritative outcome:

- effective privileged grants by authority path and risk class;
- unexplained, conflicting, orphaned, expired, or stale grants;
- JML transition completion and actual reconciliation lag;
- source-to-enforcement mismatch and failed revocation;
- temporary/support/break-glass use, duration, unexpected actions, and closure;
- access review decisions, enforcement completion, nonresponse, and recurrence;
- exception age, renewals, control failures, and remediation closure;
- audit coverage by privileged action and queryable delivery quality;
- customer/support effort, false restriction, restoration, and affected cohorts.

Do not claim least privilege, complete deprovisioning, tamper evidence, or audit
readiness from policy prose. Report designed, implemented, observed, and verified
states separately.
