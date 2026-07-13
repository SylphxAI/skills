# Ecosystem Certification Program

Use this module when the product is a platform-side certification system for
partners, integrations, apps, plugins, agencies, creators, listings, templates,
or developers. It does not replace Distribution Readiness for proving that one
product passed an external platform's certification.

## Program record

```text
actor and ecosystem object:
certification promise, scope, exclusions and customer trust risk:
eligibility and evidence requirements:
criteria/test-suite/reviewer/threshold versions:
badge meaning, display, date, expiry and directory effects:
renewal/audit cadence and drift signals:
notice, appeal, suspension, revocation, restoration and customer impact:
partner enablement, support and current authority:
```

Never merge paid tier, sponsorship, editorial featuring, marketplace ranking,
and quality certification into one unlabeled signal.

## State machine

```text
application_submitted -> eligibility_checked -> evidence_accepted
-> automated_tests -> independent_review -> certified -> badge_published
-> monitored -> renewed | expired

eligibility_checked -> ineligible_with_reason -> reapply_or_appeal
evidence_accepted -> evidence_missing -> correction_window
automated_tests | independent_review -> failed_with_findings
-> corrected_candidate | appeal
certified -> material_drift -> warning_or_suspension
-> restored | revoked_with_customer_plan
```

Each transition records criteria/test versions, evidence, actor/authority,
decision reason, effective time, communication, appeal availability and next
proof. Payment never changes a quality result.

## Criteria and evidence

- `cert-1` — Define exactly what the badge promises: compatibility, security,
  privacy, quality, support, expertise, performance, compliance, customer
  success, or a named combination.
- `cert-2` — Every criterion has evidence, test method, reviewer/authority,
  pass/fail threshold, exception rule, renewal cadence and stale-state behavior.
- `cert-3` — Technical suites cover applicable install, auth/authorization,
  data handling, failure/degraded behavior, version compatibility, upgrade,
  documentation/support and uninstall/revocation.
- `cert-4` — Manual review is reserved for meaning, UX, support, policy or risk
  that deterministic checks cannot decide; its rubric and appeal evidence stay
  versioned.
- `cert-5` — A badge exposes meaning, scope, criteria version, awarded date,
  expiry and material limitations on a public detail surface.
- `cert-6` — Renewal detects stale integrations, broken documentation, security
  or privacy drift, degraded support, compatibility changes and ownership loss.
- `cert-7` — Directory/ranking effects have exploration and freshness controls;
  certification cannot permanently entrench incumbents or imply paid priority.
- `cert-8` — Suspension/revocation requires evidence, proportional notice,
  appeal, customer-impact/continuity plan and a restoration path, except where
  immediate containment is required for active harm.
- `cert-9` — Partner enablement publishes how to qualify, test, remediate and
  renew without leaking security-sensitive or partner-confidential material.
- `cert-10` — Measure customer outcomes, not badge volume: install success,
  compatibility, incident/support burden, trust comprehension, appeal reversal,
  drift detection and renewal quality.

## Program decision table

| Program | Core evidence | Characteristic risk | Required governance |
| --- | --- | --- | --- |
| Integration/app/plugin | compatibility, auth/data/failure, support and uninstall | stale or unsafe integration retains trust signal | versioned tests and renewal |
| Agency/developer competency | verified delivery/training scope | paid tier mistaken for quality | separate commercial tier and evidence |
| Creator/listing quality | scoped output reliability and policy | bias and incumbent lock-in | appeals, exploration and expiry |
| Template/package | install/run/update proof | old dependency or broken instructions | exact-version replay and retirement |

## Operations and output

Track application, eligibility, evidence, test, review, award, badge publish,
monitoring, drift, warning, suspension, appeal, renewal, expiry, revocation and
restoration with program/object ID, criteria/test versions, decision, badge
scope, expiry, directory effect, customer impact and support incidents.

Return one certification-program section of the Product Program Manifest:

1. promise/scope and commercial/editorial/ranking separation;
2. eligibility, criteria, evidence, tests, reviewers and exceptions;
3. state machine, badge/display contract and directory effects;
4. renewal, audit, drift, appeal, suspension, revocation and restoration;
5. partner enablement, customer continuity and support handoffs;
6. metrics, event schema, version migration and unresolved authority.
