# Feedback Learning Loop

## 1. Signal sources

Combine without flattening provenance:

- private in-product feedback, surveys and requested diagnostics;
- public store/platform reviews;
- support tickets/chat/call reasons and help-center searches;
- cancellation, downgrade, refund, chargeback and dispute reason codes;
- community/social reports where authorized;
- product behavior funnels, failed/abandoned tasks and feature adoption;
- crash, startup, latency, sync, offline, accessibility and device quality;
- experiments, interviews/usability research and explicit user goals;
- moderation, abuse, safety, privacy, complaint and appeal outcomes.

Absence of feedback is not satisfaction. Every source has selection, visibility and incentive bias.

## 2. Private feedback contract

```text
entry surface and context:
anonymous/account-linked choice where feasible:
type, product area, goal, expected/actual result and severity:
free text, screenshot/recording/log attachment:
explicit diagnostics content/consent/preview/redaction:
contact/follow-up permission and preferred channel:
offline/retry/dedupe and receipt:
privacy, retention, access and deletion:
status vocabulary and close-loop promise:
```

Do not require excessive fields or force a rating. Make feedback accessible from settings/help and contextual error/success surfaces without nagging.

## 3. Normalized signal schema

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
```

Preserve original wording/evidence securely. Derived summaries never replace raw lineage.

## 4. Taxonomy, dedupe, and evidence

Dedupe by underlying user problem and affected state, not requested solution or exact wording. Keep distinct cohorts when one fix may help one and harm another.

Evidence record:

```text
cluster and mechanism hypothesis:
source diversity and selection bias:
frequency/prevalence estimate with denominator:
severity, affected outcome and reversibility:
quality/safety/commercial/support impact:
strategic/product-promise relevance:
confidence and contradictory evidence:
instrumentation/research gap:
```

Do not create a universal priority formula that silently trades safety, law, accessibility, or trust for revenue. Hard-floor signals route immediately. Other prioritization remains a product decision artifact.

## 5. Routing table

| Signal | Primary route | Required response |
| --- | --- | --- |
| Security/privacy/safety or severe abuse | protected incident/safety owner | containment, evidence, support/appeal, authority |
| Crash/data loss/payment/entitlement outage | incident/engineering + support | reproduce, mitigate, status, correction/compensation |
| Refund/chargeback/access consequence | refund/payment specialist | ledger evidence, entitlement, support, reason feedback |
| Accessibility blocker | accessibility/product owner | affected flow proof and equivalent access |
| Repeated usability confusion | app/game/interface owner | observation, flow hypothesis, documentation/support fix |
| Capability request | product discovery/decision owner | problem cluster, alternatives, no false promise |
| Price/value objection | commercial owner | segment/context and retention/refund evidence |
| Praise/use story | research/marketing with permission | preserve authenticity; no automatic endorsement use |
| Review response needed | reputation response policy | verified, concise, private-safe response |

## 6. Autonomous improvement loop

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

The classifier/proposer cannot be its sole validator or promoter. Evaluation gates, source evidence and platform policy remain outside candidate mutation authority.

## 7. Events and metrics

Track:

```text
feedback_entry_viewed/submitted/received/redacted/classified/deduplicated
feedback_routed/support_case_linked/safety_escalated
evidence_cluster_updated/hypothesis_created/candidate_linked
candidate_validated/canary_started/promoted/rolled_back
customer_status_updated/loop_closed
public_review_ingested/response_candidate_created/response_published/corrected
review_request_eligible/attempted/cooldown_started/adapter_disabled
```

Metrics:

- feedback submission and abandonment with accessibility/privacy context;
- classification/dedupe/routing quality and lag;
- severe issue detection/containment/resolution;
- source/segment coverage and contradictory evidence;
- support resolution, appeal reversal and repeat contact;
- candidate reproduction/validation/live outcome;
- close-loop accuracy/timeliness;
- review prompt fatigue, complaint and product-quality outcomes;
- public review authenticity/issue mix, not only average stars/count.

## 8. Privacy and trust tests

- secrets, tokens, payment, health, child and private collaboration data are redacted/routed safely;
- diagnostics are previewed/consented and not silently expanded;
- anonymous feedback remains unlinkable beyond declared anti-abuse needs;
- feedback deletion/retention propagates to derived stores where required;
- praise is not reused as marketing endorsement without permission and disclosure;
- reviewers are not deanonymized or matched to account behavior for retaliation;
- model summaries preserve minority/contradictory signals and uncertainty;
- user updates never reveal another user's report or internal sensitive evidence.
