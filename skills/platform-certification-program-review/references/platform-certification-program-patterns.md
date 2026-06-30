# Platform Certification Program Patterns

## Certification state machine

```text
application_submitted -> eligibility_checked -> evidence_uploaded -> tests_run -> review_decided -> badge_published -> monitored -> renewed
       |                       |                  |             |                 |                  |           |
       v                       v                  v             v                 v                  v           v
 rejected_format        ineligible          evidence_missing test_failed      appeal_opened     suspended   expired
```

## Rule IDs

- `cert-program-1` — Define what certification promises: security, compatibility, quality, support, expertise, compliance, performance, or customer success.
- `cert-program-2` — Separate paid tier, editorial featuring, marketplace ranking, and quality certification.
- `cert-program-3` — Criteria need evidence, test method, reviewer, pass/fail threshold, renewal cadence, and exception rules.
- `cert-program-4` — Test suites should cover install, auth, data handling, failure behavior, version compatibility, support docs, and uninstall.
- `cert-program-5` — Badges need clear meaning, scope, date, expiry, and public detail page.
- `cert-program-6` — Directory effects should not permanently advantage incumbents without quality monitoring.
- `cert-program-7` — Audits and renewal should catch stale integrations, broken docs, security drift, and support failures.
- `cert-program-8` — Revocation needs evidence, notice, appeal, customer-impact plan, and restoration path.
- `cert-program-9` — Partner enablement should teach how to pass, not create arbitrary gatekeeping.
- `cert-program-10` — Track certification outcomes against customer trust, install success, support burden, and ecosystem quality.

## Decision table

| Program type | Criteria | Badge risk | Governance |
| --- | --- | --- | --- |
| Integration certification | API compatibility and support docs | Broken integrations keep badge | Renewal tests |
| Agency partner tier | Delivery references and training | Pay-to-win perception | Separate tier from quality |
| Plugin marketplace badge | Security and UX checks | User overtrusts plugin | Scope and warnings |
| Creator quality badge | Output quality and reliability | Bias toward incumbents | Appeals and exploration slots |
| Template certification | Install/run proof | Stale templates | Versioned tests |

## Certification checklist

- Certification promise and scope are understandable.
- Criteria, evidence, tests, reviewers, and thresholds are documented.
- Badge display includes date, expiry, and meaning.
- Renewal, audit, appeal, and revocation paths exist.
- Paid/featured/ranking effects are separated from quality.
- Metrics prove customer trust and ecosystem quality improved.

## Event schema

Track: `certification_application_submitted`, `certification_eligibility_checked`, `certification_test_run`, `certification_review_decided`, `certification_badge_published`, `certification_appeal_opened`, `certification_suspended`, `certification_renewed`, `certification_revoked`.

Recommended properties: `program_type`, `actor_type`, `listing_id`, `criteria_version`, `test_suite_version`, `reviewer_type`, `decision`, `badge_scope`, `expiry_days`, `appeal_outcome`, `directory_effect`, `support_incidents`, `renewal_status`.
