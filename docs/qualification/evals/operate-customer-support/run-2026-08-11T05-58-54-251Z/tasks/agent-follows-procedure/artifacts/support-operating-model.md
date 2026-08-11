# Support Operating Model — B2B SaaS (12k users, 3 agents, email + chat)

| Field | Value |
| --- | --- |
| artifactVersion | 1.0.0 |
| artifactRevision | draft-1 |
| artifactState | draft |

Draft input references carry no digest. When input artifacts are sealed, this
document re-binds each reference with `artifactDigest` and
`digestRule: sha256-exact-bytes`. This draft never invents digests or copies
canonical facts from owning artifacts.

Consumed artifacts (draft input references, owner + scope only):

| Consumed artifact | Owner | Used for |
| --- | --- | --- |
| product-version catalog | product | version-scoped answers, reproduction |
| identity-and-access policy | identity owner | verification, recovery, SSO/SCIM |
| payment-refund-policy | payments owner | eligibility, bands, appeal, chargeback |
| money-ledger-and-entitlement | payments owner | billing truth, seat projection |
| sync-backup-protocol | data-sync owner | restore, conflict, blast radius |
| incident-playbooks | incident command | INC routes, comms cadence |
| safety-and-enforcement-policy | safety owner | SEC routes, appealable actions |
| review-and-feedback-policy | product feedback owner | FEED intake and closure |
| privacy-retention-policy | legal/privacy owner | PRIV, deletion, export |
| accessibility-standard | product | ACC routes, surface conformance |

---

## 1. Scope, assumptions, audiences, channels, objectives

### 1.1 Scope

Own: support channels (email, in-app chat), self-service and knowledge, reason
taxonomy, ticket state, routing, evidence intake, decision rights, response
policy, service objectives, automation, quality, escalation, metrics, and
product-feedback closure.

Do not own (consume and route to owners): provider payment truth, refund and
account-consequence policy, product roadmap priority, security or incident
command, data-recovery protocol, marketplace payouts, public-review
solicitation, legal commitments.

### 1.2 Assumptions (verify within 90 days of first measured telemetry)

| # | Assumption | Verify via |
| --- | --- | --- |
| A1 | 12,000 active users across ~2,500 customer workspaces, seat-based subscription | analytics artifact |
| A2 | 3 frontline support agents; 3 named specialist owners (payments/refund, identity, data-sync). Specialists may be dual-hatted seats but the *role* is named and never unowned | staffing plan |
| A3 | Contact rate ~5% of users/month: ~600 assisted contacts, ~1,400 self-service sessions | measured telemetry |
| A4 | Channel split ~70% chat / 30% email; chat is authenticated, in-app; email is async | telemetry |
| A5 | Coverage: chat Mon–Fri 06:00–22:00 UTC, Sat–Sun 09:00–17:00 UTC; email accepted 24/7; Sev1/Sev2 on-call 24/7 rotating among the 3 agents | schedule |
| A6 | Primary locale English (en-US, en-GB). Additional locales (de, fr, es, ja, pt-BR) answered async with translation-backed, review-before-send replies | locale telemetry |
| A7 | Accessibility baseline WCAG 2.2 AA: keyboard-navigable chat, screen-reader compatible, plain language, text-only fallback for rich messages | ACC route |
| A8 | No phone, no app-store, no marketplace channel in this envelope | channel inventory |

### 1.3 Audiences

- Workspace admins and billing contacts (authority for plans, seats, payment).
- End users (identity, access, data, feature help).
- Integrators (API/webhook, SSO/SCIM) — often partner engineers.
- Compliance/privacy contacts (DPA, export, deletion).

### 1.4 Service objectives

| Objective | Target | Measured |
| --- | --- | --- |
| Chat first response (live hours) | p50 ≤ 2 min; p95 ≤ 10 min | telemetry |
| Email first response | p50 ≤ 4 business h; p95 ≤ 8 business h | telemetry |
| Mitigation/acknowledge Sev1 | ≤ 15 min of triage | telemetry |
| Resolution: Sev1 / Sev2 / Sev3 / Sev4 | ≤ 2 h / ≤ 24 h / ≤ 3 business days / ≤ 5 business days | telemetry |
| Waiting-state update cadence | every ≤ 24 h; Sev1/Sev2 every ≤ 4 h | state machine |
| Verified resolution | ≥ 90% of closed cases carry a verification signal | QA |
| Reopen rate | ≤ 8% (measured monthly cohort) | QA |
| CSAT | ≥ 4.5/5, never a success gate alone | survey |
| Trust countermetrics | complaint rate, refund-request rate, churn correlation tracked, no target-only gaming | analytics |
| Source freshness | 100% of referenced sources inside expiry window; expired sources auto-withdrawn | automation |
| Self-service zero-result rate | ≤ 15% of sessions | search telemetry |
| Automation accuracy (assisted drafts) | ≥ 95% on sampled cases before send | QA |
| Cost per resolved contact | by channel and severity, reviewed quarterly | finance |

### 1.5 High-risk (ruin) boundaries

Any case touching these is a protected route with owning authority and audit:

1. Money movement: refunds above policy band, chargebacks, payment reversals.
2. Durable entitlement: grants, revocations, seat and plan corrections.
3. Identity recovery: password/MFA reset, account unlock, email change.
4. Data deletion, destructive restore, overwrite on sync conflict.
5. Data-sync blast radius: multi-workspace corruption, conflict repair.
6. Security: suspected takeover, fraud, phishing, abuse, enforcement.
7. Legal: DPA changes, commitments, complaints, retention.
8. Incident: declaration, public communication, recovery decisions.

### 1.6 Non-goals

- No invented refund eligibility, provider truth, incident status, entitlement,
  enforcement outcome, or legal promise from a model or macro.
- No ticket-avoidance or handle-time optimization that worsens resolution,
  reopen, churn/refund, complaint, accessibility, safety, or trust.
- No generic macros across incompatible products, versions, providers,
  locales, severities, or account states.
- No marking resolved from a sent reply or internal mutation; resolution
  requires customer-visible or authoritative verification.
- No waiting state without owner and next-check; no high-risk action without
  audit/appeal; no stale knowledge without automatic withdrawal.
- No copying specialist facts into support; ticket comments are never the
  authoritative money, access, incident, or enforcement record.

---

## 2. Reason taxonomy, severity, routing, decision rights

### 2.1 Reason codes

| Code | Reason | Sub-codes |
| --- | --- | --- |
| ACCT | Access and identity | ACCT-LOGIN, ACCT-MFA, ACCT-SSO, ACCT-LOCKED, ACCT-TAKEOVER |
| BILL | Billing and payments | BILL-INVOICE, BILL-CHARGED, BILL-REFUND, BILL-SEATS, BILL-CANCEL |
| ENTL | Entitlement | ENTL-MISSING, ENTL-TRIAL, ENTL-DOWNGRADE |
| DATA | Data and sync | DATA-SYNC-STALLED, DATA-CONFLICT, DATA-LOST, DATA-RESTORE, DATA-DELETE |
| BUG | Product defect | BUG-REPRO, BUG-PERF |
| INTG | Integration | INTG-WEBHOOK, INTG-API, INTG-SSO-CFG |
| FEAT | Feature confusion | FEAT-HOWTO, FEAT-WORKFLOW |
| SEC | Safety and abuse | SEC-PHISHING, SEC-FRAUD, SEC-ABUSE |
| INC | Incident | INC-OUTAGE, INC-DEGRADED |
| PRIV | Privacy and data rights | PRIV-EXPORT, PRIV-DELETE, PRIV-CONSENT |
| LEGAL | Legal and policy | LEGAL-DPA, LEGAL-COMPLAINT |
| ACC | Accessibility | ACC-SURFACE |
| FEED | Feedback and requests | FEED-REQUEST, FEED-COMPLAINT |
| OTH | Unclassified | OTH (auto-routed to triage confirmation) |

### 2.2 Severity model

| Severity | Definition | Examples |
| --- | --- | --- |
| Sev1 | Service-down or security/financial/legal harm in progress | outage, suspected takeover, fraud, destructive data loss |
| Sev2 | Major capability broken or data at risk; no workaround | sync stalled across workspaces, SSO broken, account locked |
| Sev3 | Normal defect/question; workaround exists | bug with workaround, invoice question, feature confusion |
| Sev4 | Low/informational/feedback | request, suggestion, doc typo |

Severity is set at classification by the agent; automation may propose, never
final. Sev1/Sev2 changes are reviewed at handoff and logged.

### 2.3 Routing table

Queue names: `Q-TRIAGE` (all intake), `Q-CHAT-LIVE`, `Q-EMAIL`, `Q-PAYMENTS`,
`Q-IDENTITY`, `Q-DATA`, `Q-ENG`, `Q-SAFETY`, `Q-INCIDENT`, `Q-POLICY`.
All queues are real: 3 agents rotate `Q-CHAT-LIVE`/`Q-EMAIL`; specialist
owners staff their queues; ENG/SAFETY/INCIDENT/POLICY are consuming owning
systems with named owners.

| Route | Evidence required at intake | Authority | Queue | Priority | Timer | Stop condition | Customer promise | Escalation packet | Fallback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACCT (access) | actor, tenant, auth method, recovery attempts, security signals; for SSO: IdP, SCIM status, error ID | identity specialist for recovery; agent for explain | Q-IDENTITY (recovery) / Q-TRIAGE (explain) | ACCT-TAKEOVER = Sev1; ACCT-LOCKED = Sev2; else Sev3 | Sev1 on-call ≤15 min; Sev2 first response ≤1 h; update ≤4 h/24 h | identity verified and recovery step delivered through authoritative flow, or handoff to security for takeover | safe recovery step + next update time; no invented unlock promise | §2.4 + auth method, recovery attempts, security signals, SSO config refs | evidence_pending → re-request bounded; owner offline → on-call; takeover → Q-SAFETY |
| BILL (billing) | provider event, internal ledger, entitlement projection, account timeline, invoice ID | payments specialist for money actions; agent for explain | Q-PAYMENTS | BILL-REFUND, BILL-CHARGED = Sev2 if money-at-risk, else Sev3 | first response ≤2 h chat / 4 business h email; update ≤24 h | refund executed and verified in ledger, or denial per policy with appeal path | authority being checked; no invented refund promise | §2.4 + ledger/provider refs, policy band check, idempotency key | ledger/provider mismatch → Q-PAYMENTS; policy absent → abstain + wait_policy |
| ENTL (entitlement) | entitlement projection, purchase/plan record, account state, version | payments specialist (durable change) | Q-PAYMENTS | Sev3 (Sev2 if paid-access blocked) | first response ≤2 h/4 h; update ≤24 h | entitlement corrected and verified in projection, or routed to policy | bounded correction status, no invented grant | §2.4 + projection ref, desired entitlement delta | projection missing → wait_payment; ambiguity → abstain |
| DATA (data/sync) | object/version IDs, backup/sync state, client version, restore attempts, conflict state | data-sync specialist for repair; agent for explain | Q-DATA | DATA-LOST, DATA-RESTORE, DATA-CONFLICT = Sev2; sync-stalled = Sev2 if multi-workspace | first response ≤1 h; update ≤4 h/24 h | state preserved; repair verified from snapshot/checksum + customer confirmation, or abort if destructive risk | preserve state; no retry of destructive actions | §2.4 + object IDs, backup/sync state, restore attempts, blast-radius scope | destructive repair → wait_data + consent; blast radius → Q-INCIDENT |
| BUG (defect) | reproduction, product/version, environment, logs/trace ID, impact | engineering owner (product defect), agent bridges | Q-ENG | Sev2 if major/blocking, else Sev3 | update ≤24 h; Sev2 bridge ≤4 h | workaround or bounded status delivered; defect accepted by eng with ticket ID | workaround or bounded status, never a fabricated ETA | §2.4 + repro, version, trace ID, impact, workaround used | reproduction missing → evidence_pending; mass repeat → cluster → Q-ENG defect |
| INTG (integration) | integration type, webhook/API IDs, error payload, tenant, version | agent + engineering for product-side; identity specialist for SSO-CFG | Q-ENG (product-side) / Q-IDENTITY (SSO-CFG) | Sev3 (Sev2 if production-blocking) | update ≤24 h | confirmed product-side cause or third-party handoff packet returned | accurate cause boundary, no blaming user | §2.4 + webhook/API IDs, error payload, cause boundary | third-party issue → provider route with evidence packet |
| FEAT (confusion) | account state, attempted steps, goal | agent (self-service first) | Q-CHAT-LIVE / Q-EMAIL | Sev4 | first response standard; resolution ≤3 business days | user confirms goal achieved, or article fixed | direct answer + article link | §2.4 + attempted steps, article refs tried | zero-result → article gap → FEED |
| SEC (safety) | report type, content/account IDs, evidence preservation, urgency | safety owner | Q-SAFETY | Sev1 (credible harm, takeover, fraud) else Sev2 | Sev1 on-call ≤15 min; update ≤4 h | enforcement decision recorded in owning system; customer gets bounded ack | acknowledgement without exposing enforcement internals | §2.4 + preserved evidence, urgency, enforcement boundary | evidence missing → preserve + re-request; legal boundary → Q-POLICY |
| INC (incident) | service/region/version, start time, symptom, trace/status evidence | incident commander | Q-INCIDENT | Sev1 | per incident comms cadence | declared incident closed in owning system | one incident source and update cadence | §2.4 + service/region/version, start time, trace refs | not declared → verify status via owning system before promise |
| PRIV (privacy) | identity proof, object scope, retention context, legal basis | privacy owner (legal) | Q-POLICY | Sev2 (deletion/export) else Sev3 | update ≤24 h | export delivered or deletion executed in owning system with audit record | bounded timeline, no invented retention promises | §2.4 + identity proof, object scope, legal basis | scope ambiguous → abstain + wait_policy |
| LEGAL | case facts, contract/DPA ID, complainant identity | legal owner | Q-POLICY | Sev1 (harm/legal risk) else Sev3 | Sev1 ≤15 min; update ≤24 h | legal owner accepts with record ID | routed to authority; no commitments from support | §2.4 + contract/DPA ID, complainant identity, facts | support abstains from any commitment |
| ACC | surface, product/version, assistive tech, impact | product (fix) + agent (workaround) | Q-TRIAGE → Q-ENG | Sev2 if blocking, else Sev3 | update ≤24 h | workaround delivered; defect accepted with ticket ID | workaround + owned fix path | §2.4 + assistive tech, surface, WCAG clause | WCAG gap → ACC article + Q-ENG |
| FEED | product area, version, desired outcome, evidence | product feedback owner | Q-TRIAGE → product-feedback | Sev4 | ack ≤24 h | feedback clustered, owned, customer updated on ship | we read and cluster it; update on shipped changes | §2.4 + product area, desired outcome, cluster candidate | duplicate cluster → merge + update original |
| OTH | none beyond text | agent (triage confirm) | Q-TRIAGE | Sev3 default | first response standard | reclassified to a real route or confirmed OTH with owner | we will route it correctly | §2.4 + best-guess route candidates | no auto-answer on OTH; human confirm |

### 2.4 Escalation packet schema

Every escalation carries one packet: `case_id`, `reason_code`, `severity`,
`actor + tenant`, `product/version`, `evidence list (IDs)`, `attempted steps`,
`source IDs used`, `owning-system record refs`, `desired outcome`,
`customer promise already given`, `appeal path`. Missing packet fields return
the escalation to intake (`support` rule: incomplete packet is rejected, not
forwarded).

### 2.5 Decision rights

Safe autonomous (agent may execute; logged in ticket with source IDs):

- Classify/reclassify; propose severity (human confirms Sev1/Sev2).
- Retrieve read-only state: ledger view, entitlement view, sync status,
  identity status, traces — scoped to the case and role.
- Explain and educate using verified current sources only.
- Collect bounded diagnostic evidence with consent; run non-destructive,
  reversible, pre-authorized diagnostics and workarounds.
- Update case state, schedule follow-ups, link feedback, close (with
  verification or 72 h no-response + one nudge).
- Apply micro-credits only where the payment-refund policy artifact
  explicitly pre-authorizes a band (e.g., ≤ $25, once per 90 days, reversible,
  audited); otherwise abstain.

Protected (owning authority + audit trail in the owning system):

- Refunds above band, chargebacks, reversals, any payment consequence.
- Entitlement grant/revoke, seat and plan corrections.
- Identity recovery: password/MFA reset, unlock, email change (authoritative
  flow only).
- Data deletion, destructive restore, sync-conflict overwrite, export release.
- Suspension, blocking, enforcement, takedown.
- Legal commitments, DPA changes, public statements, incident declaration.

Abstention rules (must abstain, hand off, never invent):

- Identity not verified; money/entitlement/incident/enforcement state
  uncertain; provider truth unknown; legal commitment requested; destructive
  action requested without consent or repeatedly; customer asked for secrets
  or full payment data.
- Automation abstains on all protected actions by default.

Idempotency: every protected action carries an idempotency key
(`case_id + action + target + params hash`); retries are safe and single-fire.
Compensation: each protected action has a defined compensation (refund
reversal, entitlement revert, restore rollback, unlock re-application) and a
named owner who can execute it.

Audit: owning-system audit log is authoritative; ticket comments reference
audit IDs but never replace them (`support-11`).

---

## 3. Case lifecycle, waiting states, escalation, appeal, reopen, close

### 3.1 State machine

```text
new
  -> classified
  -> evidence_pending | assigned
assigned
  -> waiting_customer | waiting_provider | waiting_payment
  | waiting_identity | waiting_data | waiting_engineering
  | waiting_policy | waiting_safety | waiting_incident
  -> mitigation_offered | correction_pending
mitigation_offered | correction_pending
  -> verification_pending
verification_pending
  -> resolved | reopened
resolved
  -> feedback_linked | closed | appeal_review
closed
  -> reopened (customer re-contact) | appeal_review
appeal_review
  -> resolved (upheld, record kept) | reopened (overturned)
```

Rules: `resolved` requires observable confirmation (customer confirmation,
owning-system record, or verified state readback) — never a sent reply
(`support-9`). Reopen preserves prior classification, evidence, actions, and
the reason resolution failed (`support-10`). Appeal preserves the original
decision record and is reviewed by a different named owner than the decider
(specialist or quality lead).

### 3.2 Waiting-state ownership (every state owned, timed, updated)

| Waiting state | Dependency | Owner | Next-check | Customer update deadline | Exit |
| --- | --- | --- | --- | --- | --- |
| waiting_customer | customer reply/consent | assigned agent | 24 h (4 h for Sev2) | at each check | reply, consent, or nudge #2 then resolution-with-verification note |
| waiting_provider | payment provider truth | payments specialist | 24 h | 24 h | provider event reconciled or abstain+escalate |
| waiting_payment | money action authority | payments specialist | 4 h Sev2 / 24 h | 24 h | ledger-verified outcome |
| waiting_identity | identity recovery authority | identity specialist | 4 h Sev2 / 24 h | 24 h | authoritative recovery executed |
| waiting_data | sync/restore authority | data-sync specialist | 4 h Sev2 / 24 h | 24 h | checksum/state verified repair |
| waiting_engineering | defect reproduction/fix | agent bridge + eng owner | 24 h | 24 h | eng ticket ID or workaround |
| waiting_policy | legal/policy decision | legal owner | 24 h (4 h Sev1) | 24 h | policy decision record |
| waiting_safety | enforcement review | safety owner | 4 h | 24 h (no internals) | enforcement record |
| waiting_incident | incident resolution | incident commander | per incident cadence | per incident comms | incident closed in owning system |

A waiting state older than its next-check time is a machine alert, not a
status — the owner is paged and the customer promise is re-confirmed.

### 3.3 Evidence contract

High-volume/high-risk categories require at intake: identity proof (for
ACCT/PRIV/LEGAL), money evidence (BILL: provider event + ledger ref), data
evidence (DATA: object IDs + sync/backup state + client version), defect
evidence (BUG: version + repro + trace ID), safety evidence (SEC: preserved
report). Missing evidence sends the case to `evidence_pending` with a bounded
single re-request; repeat destructive-step requests are a hard-gate violation.

---

## 4. Self-service and assisted support

### 4.1 Knowledge base contract

Every article declares: audience, owner, product/version scope, prerequisites,
safe steps, expected result, last verification, expiry, and human/escalation
route. Expired articles auto-withdraw from answers and search. Article
feedback routes to the article owner; repeated contact drivers create owned
product, onboarding, error-message, or policy work — not endless duplicate
articles.

### 4.2 Search and zero-result recovery

Search owns synonyms, failed-query cohorts, zero-result recovery, ranking QA,
locale/accessibility, and protection against stale popularity dominating a
current verified answer. Zero-result sessions offer: rephrase guidance,
related-verified topics, and a visible "talk to a human" path with captured
context (intent, query, attempted steps) — never a dead end.

### 4.3 Guided diagnostics and consent

Diagnostics collect only bounded safe context (product version, environment,
trace/request ID, state, attempted steps) after explicit consent; never
secrets, passwords, or full payment data. The user previews what will be
collected and why; consent is logged. Diagnostics preview results before any
action and offer non-destructive actions only.

### 4.4 Context-preserving handoff

Chat-to-agent and chat-to-email handoffs carry: captured context (query,
attempted steps, collected evidence), verified-intent classification, and any
pending consent — the customer never re-explains. Automation drafts answers
with source IDs; agents review before send in the first phase.

### 4.5 Visible escape from automation

Every automation step offers a visible "talk to a human" control; high-stakes
or repeatedly unresolved cases auto-offer specialist escalation. Trapping a
user to improve a deflection metric is a hard-gate violation.

---

## 5. Grounded response and autonomous-action policy

Every macro and AI answer binds to current source IDs (artifact, section,
version, last verification, expiry). Sources have owner, scope, version, last
verification, expiry, and fallback. Fallback when a source is stale: withdraw,
answer with the bounded known state, and offer the owning route. Abstention is
the default on any uncertainty in authority, identity, money, deletion,
safety, privacy, or incident state. Macros are version-scoped; never generic
across incompatible products/versions/providers/locales/severities/account
states. Customer promises are limited to grounded status and update times —
never invented refunds, ETAs, or commitments.

---

## 6. Specialist handoff packets

| Destination | Trigger | Packet contents | Acceptance test | Authority + audit record |
| --- | --- | --- | --- | --- |
| payments specialist | BILL money action, ENTL durable change | case id, ledger/provider refs, entitlement projection, policy band check, desired outcome, idempotency key | packet has ledger + projection refs and named policy section; returned with owning-system outcome ID | money ledger / payments system audit |
| identity specialist | ACCT recovery, SSO/SCIM, takeover-adjacent | actor/tenant, auth method, security signals, recovery attempts, SSO config refs | authoritative recovery flow executed; outcome ID returned; takeover → safety handoff | identity/access system audit |
| data-sync specialist | DATA repair, restore, conflict | object/version IDs, backup/sync state, client version, restore attempts, blast-radius scope | repair verified from snapshot/checksum + customer confirmation; destructive actions carry consent | sync/backup system audit |
| engineering | BUG, ACC, product-side INTG | repro, version, environment, trace ID, impact, workaround used | eng ticket ID + severity accepted; workaround or status delivered to customer | engineering tracker (support never states ETA) |
| safety owner | SEC, ACCT-TAKEOVER, fraud | report type, account/content IDs, preserved evidence, urgency | enforcement decision recorded; customer gets bounded ack | safety/enforcement audit |
| incident command | INC, blast-radius DATA | service/region/version, start time, symptom, trace/status evidence | incident closed in owning system; customer update per comms cadence | incident record (support posts only the one-source update) |
| legal/policy | LEGAL, PRIV, complaint | case facts, contract/DPA ID, complainant identity, retention context | legal owner accepts with record ID; support made no commitment | legal/DPA record |
| product feedback | FEED, repeat clusters, reopened systemic defects | cluster, owner, reproduce evidence, customer impact, desired outcome | cluster assigned, ship → live readback → customer update closed | product feedback tracker |

A ticket comment never becomes the authoritative money, access, incident, or
enforcement record; each handoff returns an owning-system outcome ID that the
case references.

---

## 7. Quality and learning

### 7.1 QA sampling and replay

Stratified weekly sampling by category, channel, locale, severity, handler
(automation/agent/specialist), with minimum n per stratum. Failed cases
(customer complaint, reopen, incorrect answer, misroute, bad promise) are
replayed to root cause; systemic patterns become QA fixtures and automation
corrections.

### 7.2 Hallucination and policy-drift tests

Weekly adversarial fixtures: refund eligibility with absent provider truth,
identity-recovery without verification, incident status before declaration,
legal commitment requests, destructive-action requests, cross-version macros.
Any fixture failure disables the affected automation path and re-trains the
answer before re-enable (canary below).

### 7.3 Routing confusion matrix

Weekly matrix across categories × escalation destinations. Misroute rate >
3% or any systemic cell triggers rule change and replay of affected cases.
Queue-name fixes are not routing decisions (`support-7`).

### 7.4 Resolution verification

Closed cases carry one of: customer confirmation, owning-system record, or
observed-state readback. Missing verification on ≥ 10% of closures opens a
QA cohort and retrains the close gate.

### 7.5 Reopen analysis

Monthly cohort by category and cause (bad fix, incomplete scope, promise
overreach, product regression). Cause patterns open product-feedback clusters;
individual reopen preserves the original case record (`support-10`).

### 7.6 Product-feedback closure

Every material repeated contact reason runs:
`signal -> cluster -> owner -> reproduce -> candidate -> validate -> ship ->
live_readback -> customer_update`. Contact deflection and ticket closure are
never reported as success without verified resolution; complaint/trust
countermetrics gate experiments.

### 7.7 Metrics and machine actions

| Metric | Definition | Target | Threshold action |
| --- | --- | --- | --- |
| first_response chat | p50/p95/p99 live hours | 2/10/30 min | p95 breach 2 consecutive days → shift/queue review; p99 > 30 min → degrade to email-mode notice |
| first_response email | p50/p95 | 4/8 business h | p95 breach → queue review + staffing |
| time_to_resolution | by severity | 2 h/24 h/3 d/5 d | Sev1/2 breach → incident-adjacent review |
| verified_resolution_rate | closures with verification | ≥ 90% | < 90% → QA cohort + close-gate retrain |
| reopen_rate | monthly cohort | ≤ 8% | rising 2 weeks → reopen analysis + product cluster |
| routing_confusion | misroute rate | ≤ 3% | > 3% → rule change + replay |
| zero_result_rate | self-service sessions | ≤ 15% | > 15% → search/coverage work |
| source_freshness | expired sources referenced | 0% | any → auto-withdraw + block answers |
| automation_accuracy | sampled sent answers | ≥ 95% | < 95% → disable path, replay |
| abstention_rate | high-stakes cases auto-answered | < 2% | ≥ 2% → hallucination review + fixture |
| trust countermetrics | complaint, refund-request, churn correlation | tracked, gated | rising with automation → stop experiment |
| cost per resolved contact | by channel/severity | reviewed quarterly | topology decision gate |
| defect_escape | shipped defects from support clusters | reviewed weekly | eng queue + product feedback closure |

---

## 8. Degrade, stop, recover

### 8.1 Degrade

Triggers: chat p95 first response > 15 min for 60 min; chat queue > 40 open;
staffing gap; automation accuracy below threshold.

Actions: chat intake switches to queued acknowledgement with email fallback and
SLA-extension notice; automation restricted to read-only and verified
explanations; priority routing S1/S2 only; self-service banner states degraded
status; waiting-state timers extend by announced factor and are still owned.

### 8.2 Stop

Triggers: suspected auth/data compromise; mass incorrect automation with harm;
unsafe protected-action loop; payment/identity/data source unavailable; legal
hold.

Actions: disable all automation paths; freeze protected actions; hold queues;
publish status-page notice; S1 bridge takes over; evidence preserved; no
ticket-only authority is ever used for protected actions. Nothing is marked
resolved during stop.

### 8.3 Recover

Order: verify sources and authorities; restore read-only views; re-enable
automation by canary (small cohort, fixture tests, accuracy ≥ 95% before
scale); replay backlog (evidence, priority, promise re-confirmation, updated
timers); send customer updates; run incident review and convert root causes
into QA fixtures and product feedback. Exit criteria: verified resolution
rate back ≥ 90%, reopen ≤ 8%, freshness 100%, zero unresolved waiting states
past their next-check.

---

## Completion declaration

Every material contact reason (ACCT, BILL, ENTL, DATA, BUG, INTG, FEAT, SEC,
INC, PRIV, LEGAL, ACC, FEED, OTH) has a trustworthy source, evidence
contract, route, authority, timer, response, safe action or handoff,
verification, appeal/reopen behavior, metric, and product-feedback owner; and
the system can degrade, stop, recover, and update customers without a routine
manual operating gap. This draft is `artifactState: draft`; seal with digests
once input artifacts are sealed.
