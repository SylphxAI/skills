# Sandbox and Certification Operations

Use this reference when a developer must test safely, request risky capabilities,
or prove an integration before production access.

## Contents

- [Separate the authorities](#separate-the-authorities)
- [Environment contract](#environment-contract)
- [Capability and trust progression](#capability-and-trust-progression)
- [Certification evidence package](#certification-evidence-package)
- [Decision table](#decision-table)
- [Recertification triggers](#recertification-triggers)
- [Automated operating contract](#automated-operating-contract)
- [Outcome measures](#outcome-measures)

## Separate the authorities

Keep these decisions distinct:

| Authority | Decision owned | Evidence examples |
| --- | --- | --- |
| Sandbox eligibility | Who may create/use a test environment | Account/org state, accepted terms |
| Sandbox capability | Which test actions are available | Capability policy, trust state |
| Data authority | Which fixtures or approved data may appear | Data classification and tenant policy |
| Integration conformance | Whether behavior matches a contract | Versioned test results and traces |
| Security/privacy review | Whether declared controls meet current requirements | Current specialist evidence |
| Marketplace/listing review | Whether an integration may be discoverable | Listing/policy evidence |
| Production capability | Which live scopes/actions are enabled | Authorized evidence decision |
| Certification display | What public/private trust claim may be shown | Current certification state and expiry |

Passing one authority must not silently grant another. A sandbox credential is not
a production credential; a passing conformance suite is not a security approval;
a certification badge is not proof that the current version remains conformant.

## Environment contract

Specify per environment:

```text
environment_id / purpose / tenancy / identity namespace / credential namespace
data classes / synthetic-fixture source / reset behavior / persistence
money and payout behavior / message and webhook destinations / external effects
capabilities / limits and current authority / observability / support ownership
availability promise / known fidelity gaps / promotion relationship
```

Default to synthetic, clearly labeled, resettable data. If approved real data is
necessary, record purpose, minimization, isolation, consent or authority, access,
retention, deletion, and support implications. Never infer that production
behavior is safe merely because a lower-fidelity sandbox behaves correctly.

Prevent cross-environment confusion through distinct keys, hosts, visual labels,
resource identifiers, webhook destinations, logs, dashboards, and destructive
action confirmations. Define safe behavior when environment metadata is absent.

## Capability and trust progression

Model capability access independently from overall account status:

```text
unavailable -> sandbox_limited -> evidence_requested -> evidence_under_review
      |                |                  |                     |
      v                v                  v                     v
not_supported     safe_limit_hit      evidence_expired      changes_required

evidence_under_review -> approved_scoped -> production_enabled
          |                    |                    |
          v                    v                    v
       denied             expires_or_revoked   monitored

monitored -> recertification_due -> recertified
    |                |                    |
    v                v                    v
drift_detected  capability_restricted  production_continues
```

Define every state with allowed actions, blocked actions, evidence, owner,
developer explanation, appeal/correction, expiry, audit event, and next state.
Use the least broad capability required; do not grant an all-purpose “production
approved” state when scopes, data, money, or external effects differ.

Developer quota, free-credit, and abuse-economics decisions belong to
`developer-quota-credit-abuse-review`. Consume its trust or quota decision; do
not copy its hidden signals or thresholds into the experience contract.

## Certification evidence package

Bind every test to a contract version and an observed artifact:

| Evidence class | Required questions |
| --- | --- |
| Identity and ownership | Who owns the integration and production destination? |
| Artifact identity | Which app/package/configuration/version was tested? |
| Contract compatibility | Which API, SDK, webhook, and schema versions passed? |
| Happy and failure paths | Were errors, expiry, retries, timeout, pagination, idempotency, and async behavior exercised? |
| Credentials and scopes | Are secrets handled safely and scopes least-privilege for the declared job? |
| Webhooks/events | Are signature, replay, duplicates, ordering, loss, and endpoint rotation covered? |
| Data lifecycle | Are collection, tenancy, export, deletion, retention, and test-data boundaries evidenced? |
| Operational readiness | Are logs, safe correlation, status dependency, support, rollback, and ownership present? |
| Policy requirements | Which current specialist requirements apply, and what is still pending? |
| Known limitations | What was not tested or is not faithfully represented by the sandbox? |

Screenshots, self-attestation, a passing happy-path response, and a prior version's
badge are supporting inputs, not sufficient evidence by themselves.

## Decision table

| Situation | Product decision | Required evidence | Safe failure behavior |
| --- | --- | --- | --- |
| New self-serve integration | Allow low-impact isolated testing | Accepted terms and sandbox contract | Keep risky effects disabled |
| Broad OAuth/data scope | Request narrower map or specialist evidence | Job-to-scope and data-use map | Do not issue live scope |
| Webhook certification | Test verification, replay and idempotency | Versioned traces and failure fixtures | Keep endpoint in test mode |
| Material API/SDK change | Trigger scoped recertification | Impacted contract diff and tests | Preserve unaffected capability where safe |
| Ownership/redirect change | Revalidate control and destination | Current ownership evidence | Restrict affected capability |
| Security/privacy policy change | Re-evaluate impacted controls | Current specialist authority | Time-bound or restrict, never silently grandfather |
| Evidence service outage | Queue or preserve last bounded state by policy | Last decision, expiry, outage record | No automatic permanent grant/denial |
| Failed high-impact test | Return actionable category and retry path | Test result and safe diagnostic | No public badge or live capability |

## Recertification triggers

Trigger impact-scoped recertification from material changes to:

- integration artifact, owner, redirect/destination, credential model, or scopes;
- API/SDK/webhook/schema contract or supported runtime;
- data category, tenancy, retention, export, deletion, or external effects;
- money movement, listing visibility, messaging/deliverability, or other risky
  capability;
- policy, security, privacy, marketplace, or certification requirements;
- incident evidence, repeated reliability failure, abuse referral, or material
  support pattern;
- certification evidence age or explicit expiry.

Do not require full recertification when a typed impact analysis proves only a
bounded subset changed. Do not waive it because re-review is inconvenient.

## Automated operating contract

Build the complete system as versioned policy and evidence flows:

1. provision isolated environments and fixtures idempotently;
2. issue environment- and scope-bound credentials;
3. execute contract/failure suites against the submitted artifact;
4. collect signed or otherwise attributable results and correlation evidence;
5. evaluate current policy versions and route uncertainty to the correct owner;
6. grant or restrict only the authorized capability, with expiry and audit;
7. publish safe developer-visible state and required corrections;
8. monitor version, ownership, policy, behavior, and incident triggers;
9. enqueue scoped recertification and protect production during the window;
10. reverse mistaken decisions and restore downstream state consistently.

Keep operator actions typed, reasoned, time-bounded, and reviewable. Record when
automation is unavailable and define queue, cap, degrade, or preserve behavior;
never let a dependency outage become an unbounded production grant.

## Outcome measures

Measure eligible-to-sandbox activation, first useful success, certification
completion by lane, time and attempts, failure categories, evidence staleness,
recertification completion, production incidents attributable to certified
behavior, developer support effort, appeal/correction outcomes, and false grant
or false restriction. Keep denominators, windows, versions, and cohort effects.
