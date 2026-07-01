Release freeze context:  
Holiday freeze covering production customer-facing apps, APIs, mobile releases, shared infrastructure, data stores, CI/CD production deploy lanes, and customer-visible configuration changes. Includes security hotfix, customer-specific blackout, app-store deadline exception, and infrastructure change request.

Audience / source of truth / risk boundary:  
Audience: Engineering, SRE/Ops, Security, Product, Support, Customer Success, Release Management, Compliance, App Store owners.  
Source of truth: Freeze calendar, change-management system, incident tracker, release dashboard, exception register.  
Risk boundary: No production-impacting change during freeze unless approved, scoped, observable, reversible, and time-bound.

## Freeze change-control plan

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Freeze declaration | Holiday freeze active for defined systems, environments, customer segments, and dates | Freeze notice, calendar entry, protected-system list | Scope gaps, shadow changes | Release Manager |
| Security hotfix | Permitted if severity is Critical/High and approved by Security + Eng + SRE | CVE/advisory, exploitability, patch diff, tests, rollback, monitoring | Exposure persists or hotfix outage | Security Lead |
| Customer-specific blackout | No changes for named customers/accounts unless incident/security emergency | Customer blackout list, contract/SLA notes, CS approval | Contract breach, customer disruption | Customer Success |
| App-store deadline | Allow narrowly scoped mobile submission changes only if deadline miss creates material risk | Store deadline, review timeline, release notes, staged rollout plan | Review miss, broad freeze erosion | Product + Mobile Lead |
| Infrastructure change | Defer unless needed for incident recovery, security, capacity, or compliance | Runbook, canary, maintenance window, rollback, SRE approval | Outage, cascading dependency failure | SRE/Ops |
| Rollout | Use canary, feature flags, kill switches, region/customer scoping, and maintenance windows | Deployment plan, blast-radius estimate | Broad production regression | Change Owner |
| Rollback | Mandatory before approval; rollback owner must be available during window | Rollback steps, validation checks, data-reversal notes | Rollback gap, prolonged outage | Change Owner + SRE |
| Monitoring | Dedicated dashboard required before deploy | SLOs, error rate, latency, auth failures, crash rate, security signals | Blind deployment | SRE |
| Support comms | Support brief required for any customer-visible change | Known issues, customer impact, FAQ, escalation path | Ticket surge, inconsistent messaging | Support Lead |
| Approval authority | Approval matrix by class and severity; no self-approval | Recorded approvals in change system | Authority gap | Release Manager |
| Exception expiry | Every exception expires after verification or freeze end, whichever comes first | Exception record, expiry timestamp | Freeze debt | Release Manager |
| Post-freeze review | Review all approved/rejected exceptions and repeated causes | Exception register, metrics, incidents, support tickets | Process decay | Release Manager |

## Freeze scope, change severity, approvals, rollout/rollback, monitoring, communication, and exception retirement

- `freeze_declared` -> Policy: publish freeze ID, dates, protected systems, allowed change classes, approvers, comms channels. Metric: 100% protected systems tagged. Edge case: undocumented dependency requires SRE review. Support note: support receives freeze summary.
- `change_requested` -> Intake requires change class, severity, customer scope, deadline, affected systems, risk tier, reversibility, deployment owner, rollback owner, support impact. Metric: 0 untriaged requests older than 4 business hours.
- `severity_assessed` -> Severity ladder:
  - Sev0/Sev1: active incident, exploited security issue, compliance breach risk: emergency path.
  - Sev2: material customer impact or deadline risk: exception review.
  - Sev3/Sev4: feature/cosmetic/internal improvement: defer.
- `approval_routed` -> Approval matrix:
  - Security hotfix: Security Lead + Engineering Lead + SRE.
  - Customer blackout override: Exec Sponsor + Customer Success + SRE + Security if applicable.
  - App-store deadline: Product Lead + Mobile Lead + Release Manager.
  - Infrastructure change: SRE Lead + Engineering Lead; Security/Compliance if applicable.
  - Compliance override: Compliance Officer + Security + Engineering + Release Manager.
- `change_monitored` -> Any approved deploy must use dashboard with release markers and thresholds for rollback. Required signals: error rate, latency, saturation, crash-free sessions, auth/payment failures, security alerts, customer-specific telemetry.
- `exception_retired` -> Exception closes only after deploy verification, rollback status recorded, support readback, incident review, and debt items filed. Metric: 100% exceptions retired within 3 business days after freeze.

## Decision table

| Scenario | Primary decision | Required evidence | Approval | Failure mode |
| --- | --- | --- | --- | --- |
| Security hotfix | Allow controlled exception | Vulnerability severity, patch test, rollback, monitoring | Security + Eng + SRE | Exposure persists or outage |
| Customer blackout | Block change for scoped customer unless emergency | Blackout list, customer impact, CS note | CS + Exec if override | SLA/contract breach |
| App-store deadline | Allow narrow submission-only change | Store deadline, review risk, staged rollout | Product + Mobile + Release | Missed store window |
| Infrastructure request | Defer unless urgent | Runbook, canary, capacity/security need | SRE + Eng | Outage |
| Non-critical feature | Reject/defer | Business impact and next window | Release Manager | Freeze erosion |
| Repeated exception | Approve only with debt item | Exception history, root cause | Release Manager + Owner | Planning/process decay |

## Event schema

Track these events:

- `release_freeze_declared`
- `release_freeze_change_requested`
- `release_freeze_severity_assessed`
- `release_freeze_exception_approved`
- `release_freeze_exception_rejected`
- `release_freeze_change_deployed`
- `release_freeze_change_verified`
- `release_freeze_exception_retired`

Required properties:

```text
freeze_id
change_id
system_scope
change_class
severity
risk_tier
customer_scope
approver_role
rollout_scope
rollback_status
monitoring_signal
support_ready
communication_status
exception_expiry
decision
```

## Freeze checklist

- Freeze dates, systems, environments, and customer segments are explicit.
- Change intake form is mandatory for all production-impacting work.
- Severity, customer impact, security/compliance urgency, and reversibility are assessed.
- Approval authority is recorded; no self-approval.
- Rollout plan uses narrow scope where possible.
- Rollback plan is tested or explicitly validated.
- Monitoring dashboard exists before deployment.
- Support, Customer Success, and incident channels are briefed.
- Rejected changes include reason, next release window, and customer comms if needed.
- Exception has expiry, verification criteria, and retirement owner.

## Exception register

| Exception | Status | Expiry | Required closeout | Owner |
| --- | --- | --- | --- | --- |
| Security hotfix | Pending/Approved by severity | After verification or freeze end | Patch verified, no regression, rollback status, security signoff | Security Lead |
| Customer blackout override | Default rejected unless emergency | Immediate post-change | Customer confirmation, CS readback, incident check | Customer Success |
| App-store deadline | Conditional approval | Store submission complete + verification | Store status, staged rollout telemetry, support brief | Mobile Lead |
| Infrastructure change | Deferred unless urgent | Maintenance window close | Canary result, SLO readback, rollback confirmation | SRE Lead |

## Post-freeze exception review

Within 5 business days after freeze:

- Review all approved, rejected, and withdrawn requests.
- Compare incidents, support tickets, SLO breaches, rollback events, and customer escalations.
- Identify repeated exception causes: late planning, test gaps, store deadline misses, infra fragility, unclear ownership.
- Create backlog items for freeze debt and assign owners.
- Update approval matrix, intake fields, dashboards, and customer blackout handling.
- Publish summary: number of requests, approvals, rejections, incidents, rollbacks, unresolved risks, and policy changes.
