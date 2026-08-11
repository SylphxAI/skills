# Support Operating Model

> **artifactVersion:** 1
> **artifactRevision:** draft-1
> **artifactState:** draft
> **owner:** Product Support
> **appliesTo:** SaaS product family (parameters in §16)

This document defines how customer support requests are triaged, routed,
escalated, resolved, and turned into owned product improvements. It is the
authority for support operations, not for money, access, enforcement, incident
command, or legal truth — those belong to their owning systems and are
consumed here by reference.

## 1. Purpose, scope, and non-goals

**Purpose.** Resolve customer jobs with trust intact: every request gets a
grounded answer or a safe handoff, every waiting state is owned and timed, no
case closes without verification, and recurring failure becomes owned product
improvement rather than repeated tickets.

**In scope (owned here).** Support channels and intake, reason taxonomy,
routing, case lifecycle, waiting-state clocks, decision rights, evidence
contracts, self-service and knowledge, grounded-response and automation
policy, specialist handoffs, escalation, quality assurance, metrics, and the
closed product-feedback loop.

**Out of scope (consumed by reference, routed to owners).**

| Topic | Owner |
| --- | --- |
| Payment processing, ledger, settlement, chargeback truth | Payment/billing engineering |
| Refund eligibility, repayment, entitlement consequence, restriction, appeal policy | Refund & entitlement policy owner |
| Account recovery authority, identity proofing, security incident command | Identity/security & incident command |
| Data deletion, destructive restore, data-recovery protocol | Data/platform engineering |
| Enforcement actions, bans, abuse verdicts | Trust & safety |
| Legal commitments, regulatory communication | Legal |
| Product roadmap priority | Product management |
| Public review solicitation and responses | Marketing/reviews (run-product-feedback-loop) |

**Ruin boundaries (never crossed, no exception).** Support never invents or
promises refunds, entitlement grants, recovery outcomes, incident status,
enforcement, or legal commitments; never requests passwords, secrets, full
payment data, or unnecessary personal information; never performs destructive
steps without consent and backup; never traps a user in automation; never
marks a case resolved without observable verification.

## 2. Assumptions and operating envelope

Defaults for this draft; confirm and update before adoption (§16).

- **Product:** multi-tenant SaaS, self-serve signup plus admin-managed teams,
  web + mobile surfaces, versioned releases.
- **Audiences:** individual users, team admins/billing admins, trial users.
  Accessibility and age-appropriate modes apply to all surfaces.
- **Channels:** in-app help/contact widget, email, chat (AI-assisted with
  visible human escalation), public status page for incidents.
- **Hours:** S1/S2 monitored 24/7; S3/S4 business hours in the primary locale,
  with localized coverage as volume justifies.
- **Volume tier:** low-to-moderate. Topology may change with volume; the
  invariants in this document (unversioned answers, unsafe protected actions,
  missing case state, unowned manual gaps) do not change with volume.

**Service objectives.**

| Objective | Target |
| --- | --- |
| First response, S1 | 15 min, 24/7 |
| First response, S2 | 1 hour |
| First response, S3 | 8 business hours |
| First response, S4 | 2 business days |
| Customer update cadence, S1/S2 | 30 min / 4 hours while open |
| Verified resolution, S1 | immediate mitigation; fix per incident |
| Verified resolution, S2 | 1 business day |
| Verified resolution, S3 | 3 business days |
| Verified resolution, S4 | 5 business days |
| Reopen rate | < 8% per category |
| Feedback-closure: customer notified of shipped fix | 5 business days after live readback |

## 3. Reason taxonomy

Every ticket gets exactly one reason code at classification. Codes drive
queue, evidence contract, timer, and promise.

| Code | Reason | Typical request | Primary queue |
| --- | --- | --- | --- |
| `ACC` | Account access & authentication | can't sign in, MFA, SSO, lockout, recovery | identity/access |
| `BILL` | Billing, subscription, invoice | unexpected charge, upgrade/downgrade, invoice | billing/entitlement |
| `ENT` | Entitlement & plan access | missing feature, seats, restore purchase | billing/entitlement |
| `DATA` | Data loss, sync, backup | missing data, restore, conflict | data/recovery |
| `BUG` | Product defect | crash, error, wrong behavior | product-support |
| `PERF` | Performance & limits | slow, latency, rate limits | product-support (perf) |
| `ABUSE` | Abuse, fraud, safety | report account/content, suspicious activity | trust-safety |
| `CONF` | Confusion / onboarding | how do I…, can I… | product-support (education) |
| `CANCEL` | Cancellation / close account | stop billing, close account | billing/entitlement |
| `INC` | Incident / outage | service down, status | incident-command liaison |
| `FEED` | Feedback / feature request | I want X, product feedback | product-feedback |

## 4. Severity model

Severity is assigned at classification and re-checked on every status change.

| Severity | Definition | Examples | First response | Update cadence | Target mitigation |
| --- | --- | --- | --- | --- | --- |
| **S1** | Service down or credible security/safety harm at scale; regulated exposure | outage, suspected breach, payment-data exposure | 15 min | 30 min | immediate; incident command |
| **S2** | Major function unavailable to a customer/team, data at risk, or risk of S1 | team cannot log in, sync broken, destructive action pending | 1 hour | 4 hours | 1 business day |
| **S3** | Workaround exists; single-user friction or standard request | bug with workaround, billing question, feature confusion | 8 business hours | daily | 3 business days |
| **S4** | Minor, cosmetic, or request/feedback | typo, small UX issue, idea | 2 business days | at close | 5 business days |

## 5. Routing table

A queue name is not a decision: every route names its authority, required
intake evidence, escalation trigger, and customer promise. (`support-7`)

| Signal | Primary queue | Authority | Required intake evidence | Escalate when | Customer promise |
| --- | --- | --- | --- | --- | --- |
| Cannot authenticate | identity/access | Identity/security | actor, tenant, auth method, recovery attempts, security signals | suspected takeover, SSO/SCIM defect, recovery control unavailable | safe recovery step and next update time |
| Charged or access mismatch | billing/entitlement | Billing & entitlement policy | provider event, internal ledger, entitlement projection, account timeline | provider/internal truth differs or money/access correction required | "authority being checked"; no invented refund promise |
| Data missing/conflicting | data/recovery | Data engineering | object/version IDs, backup/sync state, client version, restore attempts | destructive repair, multi-device conflict, data-loss blast radius | preserve state; no repeated destructive retries |
| Product defect | product-support | Product engineering | reproduction, version, environment, logs/trace, impact | severity threshold or repeat pattern met | workaround or bounded status; no fabricated ETA |
| Performance | product-support (perf) | Platform engineering | endpoint/feature, version, time window, latency evidence | multi-tenant impact or SLO breach | bounded status; incident handoff if declared |
| Abuse/safety report | trust-safety | Trust & safety | report type, content/account IDs, evidence preservation, urgency | credible harm, coordinated abuse, legal/safety boundary | acknowledgement; no enforcement internals |
| Active incident | incident-command liaison | Incident commander | service/region/version, start time, symptom, status-page evidence | declared-incident threshold met | one incident source and update cadence |
| Feature confusion | product-support (education) | Support (knowledge owner) | surface, version, attempted steps | repeated confusion cluster (>n/week) | answer plus knowledge/article fix |
| Cancellation | billing/entitlement | Billing & entitlement policy | account, plan, billing status, retention/consent rules | data-deletion or legal boundary | clear next step and consequence |
| Feedback/feature request | product-feedback | Product management | product area, job-to-be-done, impact | cluster threshold met | acknowledged; owned cluster with status |

**Fallback rule.** Unclassifiable or multi-reason tickets go to a general
support queue with a default evidence contract (product version, environment,
affected surface, attempted steps, impact) and are classified by a human
within one business day — never left in `new` without an owner and timer.

## 6. Decision rights

| Action | Autonomous (agent or support) | Requires owning authority | Notes |
| --- | --- | --- | --- |
| Retrieve account/plan/entitlement/log/backup state | Yes | — | read-only, bounded |
| Classify, draft, summarize, suggest answers | Yes | — | grounded in current sources |
| Pre-authorized reversible actions (resend verification email, refresh cache, re-trigger sync, revoke/rotate user-initiated session) | Yes, bounded | — | idempotent, reversible, audited |
| Refund, credit, or chargeback handling | No | Billing & entitlement | propose; never promise |
| Entitlement grant or restore purchase | No | Billing & entitlement | durable consequence |
| Account recovery / password reset | No (verified self-service flow excepted) | Identity/security | identity proof required |
| Data deletion or destructive restore | No | Data engineering + consent | backup first, explicit consent |
| Enforcement, ban, content removal | No | Trust & safety | evidence-based, appealable (`support-6`) |
| Legal commitments | No | Legal | — |
| Incident status and communications | No | Incident commander | support repeats official status only |

**Automation scope.** Automation may classify, retrieve, draft, summarize, and
suggest. It must abstain or hand off for any protected action above, and it
must say when it does not know rather than guessing.

## 7. Case lifecycle

```text
new
  -> classified
  -> evidence_pending | assigned
assigned
  -> waiting_customer | waiting_provider | waiting_engineering | waiting_policy
  -> mitigation_offered | correction_pending
mitigation_offered | correction_pending
  -> verification_pending
verification_pending
  -> resolved | reopened
resolved
  -> feedback_linked | closed
```

**State rules.**

- Every waiting state has a named dependency, owner, next-check time, and
  customer update deadline. (`support-8`)
- `resolved` requires observable confirmation — customer-visible or
  authoritative (e.g., login succeeds, charge corrected in the ledger, data
  restored and verified) — not merely a sent reply or internal status change.
  (`support-9`)
- Reopen preserves prior classification, evidence, actions, and the recorded
  reason the resolution failed. (`support-10`)
- Money, access, deletion, identity, and safety corrections use the owning
  system's audit trail; a ticket comment is never the authoritative record.
  (`support-11`)

**Waiting-state clocks.**

| State | Dependency | Owner | Next-check | Customer update deadline |
| --- | --- | --- | --- | --- |
| `evidence_pending` | customer evidence | assigned agent | 24 h | every 24 h |
| `waiting_customer` | customer action | assigned agent | 24 h | every 24 h |
| `waiting_provider` | payment/app-store provider | billing queue | 4 h | every 24 h |
| `waiting_engineering` | fix/root cause | engineering owner | daily | every 24 h |
| `waiting_policy` | policy/legal decision | policy owner | daily | every 48 h |

**Escalation ladder.** Self-service → support agent → specialist queue →
engineering → incident command / trust-safety / legal. Escalation is
triggered by severity, authority boundary, repeat pattern, or customer demand;
it is never hidden and never delayed by queue depth.

**Appeal.** A customer may appeal any resolution or enforcement outcome.
Appeals reopen with the original record intact, are decided by the owning
authority (never the same agent alone), and are timed per severity.

**Verification examples.**

| Resolution | Observable confirmation |
| --- | --- |
| Login restored | customer authenticates successfully (or verified recovery step) |
| Charge corrected | ledger shows correction; customer-visible receipt |
| Data restored | restore completes and checksum/version verification passes |
| Bug fixed | fix shipped in a release; customer confirms or telemetry shows error gone |
| Enforcement | owning authority's record updated; appeal path communicated |

## 8. Evidence contract and tooling

Support sees relevant state without asking for screenshots: account, platform,
app version, purchase IDs, entitlement state, device, logs, and last backup.
(`support-1`)

| Category | Required evidence (auto-attached where possible) |
| --- | --- |
| Billing | purchase/refund/entitlement ledger, provider event, account timeline — not only current plan (`support-2`) |
| Data | backup snapshots, restore attempts, device/app version, conflict state (`support-3`) |
| Defect | reproduction steps, version, environment, trace/request ID, logs, impact |
| Abuse | report type, content/account IDs, preserved evidence, urgency (`support-6`) |
| Incident | service/region/version, start time, symptom, trace/status evidence |

**Intake rules.** Collect only bounded, safe context. Never request passwords,
secrets, full payment data, or personal information beyond the minimum needed.
Never repeat destructive steps to gather evidence. Diagnostics run only with
preview and consent.

## 9. Self-service, knowledge, and handoff

```text
help_needed
  -> query_or_context_captured
  -> verified_answer_ranked
  -> guided_action
  -> resolution_verified | zero_results | unresolved | high_stakes_handoff
  -> feedback_linked
  -> article_or_product_fixed
```

**Rules.**

- Education, troubleshooting, billing/refund, account access, incident,
  policy, integration, bug, and safety intents have separate automation and
  escalation floors — one shared answer path cannot serve incompatible
  severities or authorities.
- Every article declares audience, owner, product/version scope,
  prerequisites, safe steps, expected result, last verification, expiry, and
  a human/escalation route. Expired articles are auto-withdrawn from answers.
- Search owns synonyms, failed-query cohorts, zero-result recovery, ranking
  QA, locale/accessibility, and protection against stale popularity dominating
  a current verified answer.
- A visible "talk to a human" escape is always available, including from
  mid-flow automation, and preserves all diagnostic context on handoff.
  Never trap a user to improve a deflection metric.
- Split content defects from product defects: repeated contact drivers create
  owned product, onboarding, error-message, or policy work rather than
  endless duplicate articles.
- Self-service counts as success only when the user's job is verified
  resolved; deflection alone is a harmful proxy.

**Accessibility & localization.** Every surface supports keyboard and screen
reader operation, plain-language content, and localized variants where
offered. Accessibility failure reports are their own reason code path with a
human owner, never only an automation answer.

## 10. Grounded response and autonomous-action policy

**Grounded responses.** Every macro, article, and AI answer binds to current
source IDs and product/policy versions, with owner, last verification, and
expiry. Answers abstain when authority, identity, money, deletion, safety,
privacy, or incident state is uncertain — "I don't know, and here's who
decides" beats a confident guess. (`support-5` for macros: empathetic,
specific, action-oriented, account-aware.)

**Source freshness.** Sources carry owner, scope, version, last verification,
expiry, and fallback. Expired or superseded sources are automatically withdrawn
from answers and flagged for the knowledge owner.

**Protected actions.** The protected-action list in §6 is enforced by
automation (abstain/handoff) and by humans (owning authority). No amount of
customer pressure, queue pressure, or "just this once" bypasses it.

**Idempotency.** Any safe autonomous action is safe to repeat without
additional side effects (e.g., resending a verification email re-issues the
same flow; re-triggering a sync does not duplicate data). Destructive actions
are never autonomous.

**Compensation.** Support may propose remedies but never promise them.
Proposals go to the owning authority (billing/entitlement for refunds,
identity/security for recovery); the customer hears a bounded answer with a
decision deadline. Provider truth (what a store or payment provider did) is
read from provider records, never invented.

**Audit.** Every action, answer, abstention, and handoff is appended to the
case audit log and the owning system's audit trail where applicable. The case
record is immutable for classification, evidence, actions, and closure reason.

## 11. Specialist and engineering handoffs

| Destination | Packet contents | Authority | Acceptance test |
| --- | --- | --- | --- |
| Billing/entitlement | provider event, ledger, entitlement projection, account timeline, proposed remedy | Billing & entitlement policy | packet returns with decision and ledger/entitlement update, not a ticket comment |
| Identity/security | actor, auth method, recovery attempts, security signals, takeover evidence | Identity/security | recovery or rejection recorded in identity system; customer told next step |
| Data/recovery | object/version IDs, backup state, client version, restore attempts, consent | Data engineering | restore verified from authoritative backup state |
| Trust & safety | report type, content/account IDs, preserved evidence, urgency | Trust & safety | evidence-based verdict with appeal path; no internals to reporter |
| Incident command | service/region/version, start time, symptom, trace/status evidence | Incident commander | declared incident with one public update source; support liaison posts only official status |
| Engineering (defect) | reproduction, version, environment, trace, impact, customer count | Product engineering | issue owned in product tracker with severity and fix target |
| Accessibility | surface, version, assistive tech, reproduction, impact | Accessibility owner | owned defect or workaround with verification |
| Legal/policy | bounded facts, no personal data beyond minimum, context | Legal | decision returned to support for customer communication |
| Product feedback | product area, job-to-be-done, impact, customer count, cluster links | Product management | owned cluster with status and expiry |

A ticket comment never becomes the authoritative money, access, incident, or
enforcement record. (`support-11`) An incomplete packet is returned to
support with the missing fields, or intake tooling is fixed — it is not
forwarded.

## 12. Metrics and machine actions

Segment every metric by category, channel, locale, product/version, severity,
automation/manual handler, and escalation destination where cardinality is
bounded. Averages without the tail distribution hide broken queues.

**Service & resolution.**

| Metric | Definition | Machine action |
| --- | --- | --- |
| `first_response_time` | p50/p95/p99 by severity | breach p95 → alert, reroute, capacity plan |
| `time_to_resolution` | verified resolution by severity | breach → inspect category and queue, adjust staffing/routing |
| `tail_latency` | p99 first response/update | breach → queue health check, not average-based triage |
| `ticket_created` / `ticket_category_set` | volume and classification coverage | classify-all gate; unclassified > 24 h → alert |
| `reopen_rate` | by category | > 8% → QA replay cohort + cluster to product-feedback |
| `waiting_overdue` | waiting states past next-check | auto-escalate to queue owner |

**Trust & quality.**

| Metric | Definition | Machine action |
| --- | --- | --- |
| `csat_submitted` / complaints | satisfaction and complaint trend | decline + complaint rise → trust review, stop automation experiment |
| `refund_help_opened` / `restore_purchase_help_opened` | support-load proxies for billing friction | rise → billing/entitlement cluster to product |
| `backup_restore_help_opened` | data-loss contact rate | rise → data cluster to product |
| `product_defect_escape_rate` | defects reaching support vs caught earlier | threshold → engineering cluster with severity |
| `recontact_within_7d` | unresolved-job proxy | rise → resolution QA, reopen analysis |
| `abstention_rate` | automation declines on uncertain answers | too high → knowledge gaps; too low → hallucination risk |
| `source_freshness` | % answers from unexpired sources | expired → auto-withdraw; freshness < 95% → block AI answers |

**Automation & cost.**

| Metric | Definition | Machine action |
| --- | --- | --- |
| Verified resolution by automation | job done, not just contained | decline while deflection rises → stop experiment |
| `macro_used` | macro coverage | coverage without verification → QA sample expansion |
| `escalation_created` | handoff volume and correctness | incomplete packets → fix intake tooling |
| Cost per verified resolution | by category/channel | outlier → reroute or automation change |

**Product-defect closure.**

| Metric | Definition | Machine action |
| --- | --- | --- |
| `product_feedback_created` | clusters with owner | unowned or expired cluster → alert PM |
| Cluster → fix → live readback | shipped, verified live, customer updated | missing any hop → reopen cluster |

## 13. Quality assurance and learning loop

**QA sampling.** Weekly stratified sample across category, channel, locale,
severity, automation/manual handler, and escalation destination; replay each
sampled case against current sources. Correct the macro/answer and find
affected sent cases (backfill), not just the sampled one.

**Controls.**

| Control | Minimum evidence | Failure action |
| --- | --- | --- |
| Macro quality | sampled cases, policy/version, factual accuracy, actionability, tone | correct macro; identify affected sent cases |
| Routing quality | confusion matrix across categories and escalation destinations | change rule; replay misroutes |
| AI answer safety | grounded source IDs, confidence/abstention, protected-action list | disable affected automation path |
| Resolution quality | verification signal, reopen reason, downstream correction | reopen; route systemic defect to product |
| Escalation quality | reproducible packet, severity, owner, SLA, feedback closure | return packet or fix intake tooling |

**Adversarial fixtures.** Maintain a fixture set of hard cases: authority
boundaries (refund/entitlement/recovery questions), stale-source traps, secret
harvesting attempts, cross-product/version/locale mismatches, and destructive
repetition prompts. Every release of automation runs the fixtures.

**Canary, rollback, disable.** New macros, automation paths, and knowledge
changes ship to a canary cohort with observed-state readback (resolution,
reopen, recontact, complaints) before full rollout. Any control failure
auto-disables the path and rolls back to the prior verified version.

**Observed-state readback.** Success is read from product state (entitlement
correct, data restored, error rate down), not from ticket status. Where
readback is unavailable, the gap is reported rather than assumed.

## 14. Turning support into product improvements

```text
signal -> cluster -> owner -> reproduce -> candidate -> validate -> ship -> live_readback -> customer_update
```

1. **Signal** — every contact, macro miss, zero-result query, and reopening is a signal.
2. **Cluster** — signals with the same root cause form a cluster with count and impact; the cluster is owned by product management.
3. **Owner** — each cluster gets one named owner and an expiry; unowned/expired clusters alert.
4. **Reproduce** — engineering reproduces against current version; the reproduction evidence returns to the cluster.
5. **Candidate** — the candidate fix, onboarding, error-message, or policy change is scoped.
6. **Validate** — validate with the affected cohort and countermetrics (reopen, refund, complaint) before ship.
7. **Ship** — release through the normal product release boundary with version.
8. **Live readback** — confirm the fix in the live product: telemetry, error rate, or observed state; source merge is not live proof.
9. **Customer update** — customers who contacted are told the fix shipped, in their channel, within 5 business days of live readback.

Rules: repeated contact drivers create owned product work, never endless
duplicate articles; a fix is not closed on merge, only on live readback plus
customer update; ticket closure is not product closure.

## 15. Trust recovery

When the product fails a customer: acknowledge what happened, explain what
state is known, give the next action, avoid blaming the user, preserve support
traceability, and create a product fix when the same issue repeats. Incident
communication follows the incident commander's single public source; support
never invents status.

## 16. Parameters to confirm before adoption

The following are open decisions for this draft and are not asserted as
current fact:

- Exact product names, surfaces, and current versions.
- Live channels and tooling (ticketing system, chat vendor, knowledge base,
  status page) — none is assumed to exist yet.
- Operating hours and locale coverage per region.
- Billing/refund policy document and its owner; provider routes.
- Identity/recovery procedures and their authority.
- Incident command and safety/abuse owners and thresholds.
- SLO targets above (defaults) and alerting destinations.
- QA cadence and the adversarial fixture set.

Adopting this model requires each row of the routing table, evidence contract,
and handoff packet to name a real owner and real tool; until then the
supported state is `draft`, not `live`.
