# Product Feedback Learning Loop

## Contents

1. Signal sources and private intake
2. Normalized signal and evidence schema
3. Taxonomy, dedupe, and decision evidence
4. Urgent and specialist routing
5. Authorized public-review ingestion and response
6. Product action and truthful close-loop
7. Events and metrics
8. Privacy and trust tests

## 1. Signal sources and private intake

Combine without flattening provenance:

- private in-product feedback, surveys, interviews, usability research, and
  requested diagnostics;
- public store or platform reviews;
- support tickets, chat/call reasons, and help-center searches;
- cancellation, downgrade, refund, chargeback, and dispute reason codes;
- authorized community and social reports;
- product funnels, failed or abandoned tasks, and feature adoption;
- crash, startup, latency, sync, offline, accessibility, and device quality;
- experiments, explicit user goals, and observed research outcomes;
- moderation, abuse, safety, privacy, complaint, and appeal outcomes.

Absence of feedback is not satisfaction. Every source has selection,
visibility, survivorship, and incentive bias.

Private feedback contract:

```text
entry surface and context:
anonymous/account-linked choice where feasible:
type, product area, goal, expected/actual result and severity:
optional free text and attachment:
explicit diagnostics content/consent/preview/redaction:
contact/follow-up permission and preferred channel:
offline/retry/dedupe and receipt:
privacy, retention, access and deletion:
status vocabulary and close-loop promise:
```

Do not require excessive fields or force a rating. Keep feedback accessible from
settings/help and relevant error or success surfaces without nagging.

## 2. Normalized signal and evidence schema

```text
signal_id, source and source_object_id:
received/occurred time and product release/version:
user job, product area and object/workflow:
type: bug | usability | capability | price | refund | quality
      | praise | safety_abuse | policy | research_lead | other
severity, urgency and reversibility:
platform/locale/device/accessibility/network context:
segment/lifecycle/entitlement only where allowed and necessary:
raw evidence reference, redaction and consent:
duplicate_cluster_id and evidence links:
owner, route, status and user follow-up permission:
external correction/deletion/response state where applicable:
```

Preserve original evidence securely. Derived summaries never replace raw
lineage.

Evidence cluster:

```text
cluster and mechanism hypothesis:
source diversity and selection bias:
frequency/prevalence estimate with denominator:
severity, affected outcome and reversibility:
quality/safety/commercial/support impact:
strategic and product-promise relevance:
confidence and contradictory evidence:
instrumentation/research gap:
linked decision and action candidates:
validation, rollout and live-outcome evidence:
```

## 3. Taxonomy, dedupe, and decision evidence

Dedupe by the underlying user problem and affected state, not requested
solution or exact wording. Keep cohorts distinct where one change may help one
and harm another.

Do not use one universal priority formula that silently trades safety, law,
accessibility, or trust for revenue. Route hard-floor signals immediately.
For other signals, make the product decision explicit: user outcome, reach,
severity, confidence, strategic fit, opportunity cost, reversibility, and next
falsifying evidence. Stars, loudness, payer value, or model confidence never
decide alone.

## 4. Urgent and specialist routing

| Signal | Primary route | Required response |
| --- | --- | --- |
| Security/privacy/safety or severe abuse | Protected incident/safety owner | Containment, evidence, support/appeal, authority |
| Crash/data loss/payment/entitlement outage | Incident/engineering plus support | Reproduce, mitigate, status, correction/compensation |
| Refund/chargeback/access consequence | Refund/payment specialist | Ledger evidence, entitlement, support, reason feedback |
| Accessibility blocker | Accessibility/product owner | Affected-flow proof and equivalent access |
| Repeated usability confusion | App/game/interface owner | Observation, flow hypothesis, documentation/support fix |
| Capability request | Product discovery/decision owner | Problem cluster, alternatives, no false promise |
| Price/value objection | Commercial owner | Segment/context and retention/refund evidence |
| Praise/use story | Research/marketing with permission | Preserve authenticity; no automatic endorsement use |
| Public review response needed | Authorized reputation response route | Verified, concise, private-safe response |

## 5. Authorized public-review ingestion and response

For every platform adapter, separately verify read, reply/write,
delete/correct, pagination/cursor, quota, moderation, role, and live-response
readback authority. Solicitation permission and ingestion permission are
different facts.

Current routes, verified on 2026-07-11 and subject to refresh:

- [Apple App Store Connect Customer Reviews](https://developer.apple.com/documentation/appstoreconnectapi/customer-reviews)
  for current read/response endpoints, roles, scopes, and limits.
- [Google Play Reply to Reviews](https://developers.google.com/android-publisher/reply-to-reviews)
  for current Publisher API authorization, quotas, fields, and response
  semantics.
- [Steam GetReviews](https://partner.steampowered.com/doc/store/getreviews) for
  the current public review-read interface and parameters. Do not infer a
  write/reply API from read access. Steam also cautions that replying to every
  review can draw attention; respond selectively and factually.

Normalize authorized review facts:

```text
review_id, platform, locale, rating_if_supplied, title/body:
created/updated time and app/product version/device if supplied:
developer response and state:
source URL, ingestion cursor and authority revision:
privacy/redaction, classification and linked evidence cluster:
correction/deletion and live-response readback:
```

Use a response only when it can acknowledge, clarify, explain a verified fix
and version, provide a safe support route, or respectfully correct a material
misunderstanding. Never reveal account data, diagnose private facts publicly,
argue, market, spam, ask for a higher rating, or promise an uncommitted feature
or date.

## 6. Product action and truthful close-loop

```text
ingest -> redact -> classify -> dedupe -> enrich -> cluster
-> route urgent support/safety
-> form falsifiable product hypothesis
-> reproduce with exact context
-> propose code/design/content/config/support/instrumentation candidate
-> independent validation and dangerous-interaction tests
-> canary/holdout -> live readback
-> promote, rollback, compensate or forward-fix
-> update source users/status where permitted
-> archive learning with version/evidence
```

The classifier or proposer cannot be its sole validator or promoter. Candidate
mutation authority cannot change evaluation gates, source evidence, platform
policy, or protected response rights.

Close-loop states must be truthful and evidence-linked: received, needs
clarification, routed to support/safety, investigating, reproduced, candidate
validated, rolling out, fixed in an exact version, shipped and read back, not
planned, policy-limited, duplicate, unable to reproduce, or support-resolved.
Never imply commitment from triage status.

## 7. Events and metrics

Track only fields required by the approved measurement contract:

```text
feedback_entry_viewed/submitted/received/redacted/classified/deduplicated
feedback_routed/support_case_linked/safety_escalated
evidence_cluster_updated/hypothesis_created/candidate_linked
candidate_validated/canary_started/promoted/rolled_back
customer_status_updated/loop_closed
public_review_ingested/response_candidate_created/response_published/corrected
```

Measure submission/abandonment with accessibility and privacy context;
classification, dedupe, routing quality and lag; severe-issue detection and
resolution; source and cohort coverage; contradictory evidence; support repeat
contact and appeal reversal; reproduction and validated live outcome; close-loop
accuracy; and public review issue mix. Do not optimize only average stars or
review count.

Hand event, identity, consent, delivery, warehouse, metric, and dashboard
implementation to Product Analytics.

## 8. Privacy and trust tests

- Redact and safely route secrets, tokens, payment, health, child, and private
  collaboration data.
- Preview and consent diagnostics; never silently expand their scope.
- Keep anonymous feedback unlinkable beyond declared anti-abuse needs.
- Propagate feedback deletion and retention requirements into derived stores.
- Do not reuse praise as a marketing endorsement without permission and
  disclosure.
- Never deanonymize reviewers or match them to account behavior for retaliation.
- Preserve minority and contradictory signals and uncertainty in model
  summaries.
- Never reveal another user's report or internal sensitive evidence in an
  update.
- Public review state cannot change refund, warranty, appeal, chargeback,
  entitlement, compensation, account, data, or support rights.
- Public solicitation is not implemented here and cannot be conditioned on
  feedback or inferred sentiment.
