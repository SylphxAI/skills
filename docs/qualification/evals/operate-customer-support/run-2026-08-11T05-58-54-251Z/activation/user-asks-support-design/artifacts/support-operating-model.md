# Support Operating Model — B2B SaaS

artifactVersion: 1.0.0
artifactRevision: 1
artifactState: draft

**Status:** Draft for review. Numbers marked *assumption* must be confirmed
against real data before this model is adopted. This artifact is the single
source of truth for how support runs; it consumes (but does not copy facts
from) the product/version source, refund policy, identity/recovery policy,
incident plan, entitlement ledger, and product roadmap owned elsewhere.

---

## 1. Purpose, scope, and assumptions

This model defines how we run customer support for a B2B SaaS with
**~12,000 users**, **3 support agents**, and **email + in-app chat** channels.
It covers triage, routing, escalation, agent decision rights, verified
resolution, and the loop that turns recurring issues into product
improvement.

### 1.1 Scope

- All inbound contacts through email and chat (including in-app "Contact
  support" and "Talk to a human" escapes).
- Ticket lifecycle: intake, classification, evidence, resolution, verification,
  reopen, appeal, closure.
- Self-service (help center + status page) as the front of the same system,
  not a separate deflection silo.
- Product-feedback handoff: recurring issues must reach an owner and ship.

### 1.2 Out of scope (owned elsewhere — we route, we don't decide)

- Refund/repayment/restriction policy (finance/refund policy owner).
- Provider money and entitlement truth (billing ledger owner).
- Roadmap priority (product management).
- Security remediation and incident command (security/engineering on-call).
- Legal commitments, contracts, DPA/SOC2 attestation (counsel).
- Public review solicitation (marketing).

### 1.3 Assumptions (confirm before go-live)

| # | Assumption | Value used here |
| --- | --- | --- |
| A1 | 12k users ≈ 2,000–3,000 accounts (multi-seat) | ~2,500 accounts |
| A2 | Contact rate | ~300 tickets/month (~10–15/day) |
| A3 | Channel split | ~60% email, ~40% chat |
| A4 | Business hours | Mon–Fri, 09:00–18:00 (local, TZ to be set); chat live in-hours, email async 24/7 intake |
| A5 | S1 (critical) coverage | 24/7 rotating on-call among the 3 agents |
| A6 | Self-service baseline | Help center + status page exist; ~25–35% of contacts can be resolved there |
| A7 | Billing/identity systems expose read APIs to support tooling | Required; see §6.4 |

If volume lands above ~400 tickets/month for 3 consecutive months, add a
4th agent or an automation layer before quality degrades.

---

## 2. Service objectives

Targets are floors, not marketing promises. Never quote an SLA to a customer
that is not documented here and in our legal terms.

| Metric | S1 | S2 | S3 | S4 |
| --- | --- | --- | --- | --- |
| First response (business hours; S1 uses 24/7 clock) | 30 min | 4 h | 8 h | 24 h |
| Status update for open/waiting tickets | 2 h | 12 h | 24 h | 48 h |
| Mitigation target (not a commitment) | 4 h | 1 business day | 3 business days | 5 business days |
| Resolution verification | required | required | required | required |

Global targets (monthly): **CSAT ≥ 4.5/5**, **reopen rate ≤ 10%**,
**unconfirmed-close rate ≤ 15%**, **defect escape ≤ 5% of contacts**,
**misroute rate ≤ 5%**. Chat p95 time-to-first-response ≤ 90 s in-hours.

---

## 3. Severity model

Severity is set at classification by the triage agent and confirmed by the
assignee. Severity drives timers, escalation, and customer promises.

| Severity | Definition | Examples | Clock |
| --- | --- | --- | --- |
| **S1 — Critical** | Multi-account outage, security incident, or data-loss blast radius in progress | Login outage affecting many accounts, suspected breach, mass data loss | 24/7 on-call; incident plan activated |
| **S2 — High** | One account materially blocked, at financial risk, or experiencing data loss; or defect affecting many accounts with a workaround | Account locked, billing overcharge, missing data, SSO broken for one org | Business hours + on-call handoff if not mitigated at EOD |
| **S3 — Normal** | Functional problem with workaround; billing/entitlement question; feature confusion | Bug with a workaround, invoice question, role/permission confusion | Business hours |
| **S4 — Low** | How-to, documentation gap, enhancement request, cosmetic bug | "How do I export X?", "Please support Y" | Business hours |

**Ruin boundaries (escalate immediately, never guess):** money, identity
recovery, deletion, enforcement, legal commitments, security/incident state,
and destructive recovery. Any ticket touching these gets a specialist route
and an audit trail regardless of severity.

---

## 4. Reason-code taxonomy

Every ticket gets exactly one primary code at classification; optional
secondary code is allowed. Codes drive routing, macros, metrics, and product
clustering.

| Code | Name | Examples |
| --- | --- | --- |
| `ACCT` | Access & authentication | Login failure, MFA, SSO/SCIM, password reset, locked account |
| `BILL` | Billing, invoice, payment | Overcharge, invoice/PO, payment method, plan change, seats |
| `ENTL` | Entitlement, roles, permissions | License mismatch, seat allocation, role/permission request |
| `DATA` | Data missing/incorrect/sync | Missing records, stale sync, import/export failure, backup |
| `BUG` | Product defect | Crash, wrong behavior, performance regression, API bug |
| `INTG` | API/webhook/integration | Webhook not firing, API auth error, connector issue |
| `SEC` | Security, compliance, abuse | Suspicious activity, phishing, data-residency question, SOC2/DPA request |
| `ONB` | Onboarding & feature confusion | Setup help, how-to, missing feature awareness |
| `CANC` | Cancellation/downgrade (churn signal) | Cancel request, downgrade, unhappy with product |
| `INC` | Incident/outage awareness | "Is it down?", status-page confirmation |
| `FEED` | Feedback/enhancement request | Feature request, idea, roadmap question |
| `ADMIN` | Account administration | Add/remove users, org settings, notification prefs |

`INC` contacts are never created by a customer guess; the incident owner
declares incidents. Otherwise, `INC` tickets route to status-page verification.

---

## 5. Routing & decision-rights matrix

With three agents we run one shared **General queue** (all agents) with named
**specialty authorities** per rotation, not siloed sub-queues that would starve:

| Role | Rotation |
| --- | --- |
| Billing & Entitlements authority | 1 designated agent |
| Technical/Engineering liaison | 1 designated agent |
| Accounts/Identity + Product-feedback coordinator | 1 designated agent |
| S1 on-call | Weekly rotation among all 3 |

Everyone is a generalist first: triage, first response, and S3/S4 resolution
are shared. Specialties only gate decisions in their authority zone.

### 5.1 Routing table

| Reason | Primary route | Required evidence at intake | Priority | Timer owner | Escalate to | Customer promise |
| --- | --- | --- | --- | --- | --- | --- |
| `ACCT` | General → identity authority | Account/tenant, auth method, error, recovery attempts, security signals | S2 by default | Assigned agent | Identity owner (SSO/SCIM defect → eng; takeover suspicion → security) | Safe recovery step + next update time; no bypass promises |
| `BILL` | General → billing authority | Account, invoice/charge reference, provider event, ledger state, timeline | S2 if money or access mismatch | Billing authority | Finance/refund policy owner for policy questions | "Checking authority"; never invent refund eligibility |
| `ENTL` | General → billing authority | Account, plan, seat list, entitlement projection, requested change | S3 | Billing authority | Product/entitlement owner for defects | Change is reversible; confirmation before applying |
| `DATA` | General → tech liaison | Object/version IDs, sync/backup state, client version, restore attempts | S2 if data loss | Tech liaison | Engineering (destructive repair only via owning system) | Preserve state; no destructive retries |
| `BUG` | General → tech liaison | Reproduction, product version, environment, logs/trace/request ID, impact | S3 (S2 if many accounts) | Tech liaison | Engineering with reproduction packet | Workaround or bounded status; no fabricated ETA |
| `INTG` | General → tech liaison | Integration type, API/webhook IDs, error payload, last-success time | S3 | Tech liaison | Engineering if provider-side defect | Retry or diagnostic next step |
| `SEC` | General → security owner | Report type, account/content IDs, evidence, urgency | S1 if credible harm | On-call | Security/incident owner; legal for compliance docs | Acknowledgment without enforcement internals |
| `ONB` | General | Plan, feature/flow in question, what was tried | S4 | Assigned agent | Docs owner (content gap) | Article or guided step + human fallback |
| `CANC` | General → accounts lead | Plan, usage, reason, renewal date | S3 | Accounts lead | CSM/sales with handoff packet | Honest retention conversation; no invented discounts |
| `INC` | On-call | Service/region/version, start time, symptom, status-page state | S1 | Incident owner | Incident command | One incident source, update cadence |
| `FEED` | General → product-feedback coordinator | Feature area, current workaround, user impact | S4 | Feedback coordinator | Product owner (cluster, not single request) | Acknowledged and linked to a tracked item |
| `ADMIN` | General | Account, requested change, requester role | S4 | Assigned agent | Identity authority for sensitive changes | Confirmation before applying |

**Routing rules**

- Routing quality is measured by a confusion matrix (§9); rules retrain when
  misroute rate exceeds 5%.
- Every route names the authority, evidence contract, timer, escalation
  trigger, and customer promise — a queue name alone is not a decision.
- Ambiguous tickets default to General with a 24 h classification deadline;
  they are never parked unowned.

---

## 6. Case lifecycle, decision rights, and autonomous action

### 6.1 State machine

```text
new
  -> classified | evidence_pending
classified -> assigned
assigned -> waiting_customer | waiting_billing | waiting_engineering
          | waiting_identity | waiting_security | waiting_legal
          | mitigation_offered
mitigation_offered -> verification_pending
waiting_* -> mitigation_offered | verification_pending | resolved_by_authority
verification_pending -> resolved | reopened
resolved -> feedback_linked -> closed
closed -> reopened          (customer reply within 14 days)
closed_no_confirmation -> reopened (reply within 14 days)
```

**Waiting-state clocks** — every wait has a named dependency, owner, next-check
time, and customer update deadline. No waiting state exists without all four.

| State | Dependency | Owner | Next check | Customer update |
| --- | --- | --- | --- | --- |
| `waiting_customer` | Customer evidence/confirmation | Assigned agent | 3 business days | At 48 h |
| `waiting_billing` | Billing authority decision | Billing agent | 4 business hours | At 12 h |
| `waiting_engineering` | Reproduction packet / fix | Tech liaison | Daily 10:00 | At 24 h |
| `waiting_identity` | Identity owner decision | Accounts lead | 4 business hours | At 12 h |
| `waiting_security` | Security/incident owner | On-call | Per incident plan | Per incident plan |
| `waiting_legal` | Counsel | Accounts lead | 5 business days | At 3 business days |

### 6.2 What any agent may do autonomously

Pre-authorized, reversible, logged, and grounded in current sources:

1. **Read account context** — account, plan, users, roles, usage, invoices,
   entitlement state, webhook/API logs, last-sync state, product version.
   Never secrets, full payment data, or credentials.
2. **Classify and enrich** — set severity/reason, attach evidence, request
   bounded diagnostics (version, request ID, trace, steps tried).
3. **Send grounded answers** — macros/help-center answers bound to current
   source IDs (article version, policy version, product version).
4. **Run safe diagnostics and reversible fixes** — read-only API checks,
   re-send failed webhook deliveries, retry an idempotent sync, regenerate an
   API key at the verified admin's explicit request.
5. **Trigger the identity system's standard flows** — e.g., issue the
   system-generated password-reset email. Agents never set passwords, bypass
   MFA, or alter recovery controls.
6. **Apply reversible account changes on verified-admin request** — notification
   preferences, org settings, seat re-allocation within entitlement.
7. **Goodwill credit within band** — only the billing authority may approve a
   credit ≤ $100 per account per quarter, with the charge and reason logged;
   above band requires a second (peer) approver and finance sign-off per
   refund policy.
8. **Verify resolution** per §7, update state, link feedback, close with the
   customer informed.

### 6.3 Protected actions (never autonomous)

Require the owning authority, an audit trail, and (for irreversible actions) a
second-person check:

| Action | Owning authority | Guard |
| --- | --- | --- |
| Refund, credit > band, payment changes | Finance / refund policy | Billing authority proposes; policy owner approves; ledger is the record |
| Durable entitlement/license grants | Entitlement owner | Ticket comment is never the entitlement record |
| Password reset bypass, MFA bypass, recovery control changes | Identity owner | Only via owning system with audit; ticket never the access record |
| Role/permission grants beyond org settings | Identity owner | Verified admin + owning-system action |
| Account or data deletion | Data/retention owner | Verified admin, retention check, second-person review, owning-system audit |
| Destructive restore | Engineering/data owner | No destructive retries; preserve state first |
| Enforcement/ban, abuse actions | Trust & safety | Evidence-based, appealable (§7.3) |
| Legal commitments, contract/DPA changes | Counsel | Never promised in a ticket |
| Incident declaration, public status | Incident owner | Support relays, never declares |
| SLA/commitment promises | Sales/legal | Only documented SLAs (§2) |

### 6.4 Abstention, idempotency, compensation, audit

- **Abstain when uncertain:** if refund eligibility, entitlement, incident
  state, security posture, release dates, or provider truth is not verifiable
  from a current source, the agent says "checking with the right team" and
  routes — never invents.
- **Idempotency:** retries (webhooks, syncs, resends) are keyed by event/request
  ID so a duplicate action is a no-op.
- **Compensation:** when our process or product caused harm (wasted time,
  overcharge, outage), the agent may offer in-band goodwill or route to the
  billing authority; compensation is always documented on the ticket and in
  the ledger.
- **Audit:** every action (autonomous or protected) logs actor, authority,
  source version, timestamp, and downstream record. Money, access, deletion,
  incident, and enforcement records live in their owning systems; the ticket
  links to them.

---

## 7. Resolution verification, reopen, appeal

### 7.1 What counts as resolved

`resolved` requires **observable confirmation**, never merely a sent reply or
an internal status change. Acceptable verification signals:

1. **Customer confirmation** — customer replies confirming the fix or clicks a
   verification link/CSAT completion with confirmation.
2. **Authoritative downstream state** — the owning system shows the corrected
   state: entitlement matches in the ledger, invoice regenerated, webhook
   delivered, sync completed, job succeeded, monitor green.
3. **Both for money/identity/deletion** — these require customer confirmation
   *and* the owning-system record.

Tickets that reach a verified answer but receive no reply after the
`waiting_customer` clock expires close as **`closed_no_confirmation`** (not
`resolved`) with a closing message stating "reply to reopen", and are counted
in the unconfirmed-close metric. This state can never be used to hide
unresolved work.

### 7.2 Reopen

- Customer reply within 14 days reopens `closed`/`closed_no_confirmation`
  tickets and preserves classification, evidence, prior actions, and the
  **reason the resolution failed**.
- Reopen reason is mandatory and feeds QA sampling and the product loop (§8).

### 7.3 Appeal

- Customers may appeal decisions (denied credit, denied change, enforcement
  outcome) within 14 days.
- Appeals are reviewed by a **different agent** than the original handler;
  money appeals go to the billing authority + finance; enforcement appeals go
  to trust & safety.
- Every appeal records the outcome and the customer-facing explanation.

---

## 8. Recurring issues → product improvement

Support owns the **signal**, product owns the **fix** — but support owns the
loop until the customer is updated. One closed loop:

```text
signal -> cluster -> owner -> reproduce -> candidate -> validate
       -> ship -> live_readback -> customer_update
```

### 8.1 Weekly product-feedback triage (30 min, product-feedback coordinator)

1. **Signal** — pull tickets from the last 7 days grouped by reason code,
   reopen cluster, and defect-escape flag.
2. **Cluster** — merge tickets into root-cause clusters (same symptom +
   version/flow/account type). One cluster = one problem, regardless of ticket
   count.
3. **Owner** — every cluster gets a named owner (PM or eng lead) and a tracked
   item with status (`triaged → reproducing → fix candidate → shipped →
   verified`). No owner, no item: the cluster stays open on the board.
4. **Reproduce** — the tech liaison provides the reproduction packet from the
   worst/most-representative tickets (§9 escalation packet).
5. **Candidate → validate** — the fix candidate ships behind a canary/flag with
   the reproduction test as the gate.
6. **Ship** — release notes + known-issue list update.
7. **Live readback** — the monitoring/metrics check that the contact reason
   actually declines after ship; if it doesn't, the cluster reopens.
8. **Customer update** — every ticket linked to the cluster gets a closing
   update: what was wrong, what we changed, and how to confirm it's fixed for
   them. Then, and only then, the cluster closes and linked tickets can reach
   `resolved` via §7.

### 8.2 Rules that keep the loop honest

- **No duplicate-article trap:** a sustained spike in a contact reason creates
  owned product/onboarding/error-message work, not just another help article.
- **Defect escape** (a bug customers hit that internal testing should have
  caught) is reported to engineering with the reproduction packet; the escape
  is fixed at the test/CI level, not only the product level.
- **Known-issue page** is updated within 24 h of an S2+ defect being confirmed;
  affected customers are told before they contact us, when feasible.
- The coordinator publishes a **monthly "top contact reasons" one-pager** to
  product, showing trend, reopen rate, and cluster status — this is the
  canonical handoff artifact.

---

## 9. Specialist and engineering handoff packets

A handoff is complete only when the packet is reproducible, has an owner, an
SLA, and a feedback-close path. Incomplete packets are returned to intake.

| Packet | Contents | Acceptance test |
| --- | --- | --- |
| **Engineering (BUG/INTG/DATA)** | Product/version, plan, environment, reproduction steps, logs/trace/request IDs, impact (accounts, severity, revenue at risk), expected vs actual, workaround status, customer promise made | Engineer reproduces in ≤ 1 attempt from the packet alone |
| **Billing (BILL/ENTL)** | Account timeline, provider event, ledger state, entitlement projection, requested correction, refund-policy reference | Billing authority can decide without re-interviewing customer |
| **Identity (ACCT)** | Auth method, error, recovery attempts, security signals, tenant/SSO config | Identity owner can execute or approve without new evidence |
| **Security/incident (SEC/INC)** | Symptom, start time, affected scope, evidence preserved, urgency, declared status | On-call can start the incident plan; support relays only |
| **CSM/sales (CANC)** | Plan, usage trend, reason, renewal date, dissatisfaction evidence, suggested next step | CSM can run the retention conversation without re-asking |
| **Legal/compliance (SEC docs)** | Account context, contract/DPA/SOC2 request, deadline | Counsel can respond without chasing context |

---

## 10. Self-service and knowledge

Self-service is the front of the same system, not a deflection target.
Deflection rate is **not** a success metric; verified resolution is.

- **Help center:** every article declares audience, owner, product/version
  scope, prerequisites, safe steps, expected result, last-verification date,
  expiry, and the human/escalation route. Stale articles auto-withdraw at
  expiry (max 180 days).
- **In-product diagnostics:** read-only, bounded (version, request ID, state,
  steps tried), shown with consent, and preserved in context on handoff.
- **Zero-result recovery:** if search returns nothing useful, the user gets a
  chat handoff **with their query and context pre-attached** — never a dead end.
- **Visible escape:** "Talk to a human" is always one click/one reply away;
  high-stakes topics (money, access, deletion) always surface the human route.
- **No data requests:** we never ask for passwords, secrets, full payment
  data, or unnecessary personal information.
- **Content vs product defects:** help-content gaps and product gaps are
  tracked separately; both have owners (§8).

---

## 11. Metrics, dashboards, machine actions

All metrics are segmented by reason code, channel, severity, plan, product
version, and handler (human vs automation) where cardinality allows. Averages
never stand alone — p90/p95 tails are always shown.

| Metric | Definition | Machine action |
| --- | --- | --- |
| First response time | Intake → first human/verified answer, p50/p90/p95 | Alert at p95 breach; reassign to agent with capacity |
| Chat response latency | In-conversation p95 | Alert at > 90 s in-hours |
| Time to resolution | Intake → `resolved` | Alert if S2+ open > 24 h |
| Reopen rate | Reopened / resolved, monthly | > 15% → auto-QA replay of the cohort |
| Unconfirmed-close rate | `closed_no_confirmation` / closed | > 15% → review reply quality |
| CSAT / complaint rate | Post-resolution survey; complaint flag | < 4.0 or complaints ↑ → queue review |
| Misroute rate | Wrong primary route / classified | > 5% → retrain router; replay misroutes |
| Defect escape rate | Customer-reported bugs not caught internally | > 5% → engineering QA review |
| Contact-reason trend | Weekly by code | Spike ≥ 2× baseline → auto-create cluster for §8 |
| Source freshness | Verified articles/macros not expired | Expired → auto-withdraw from suggestions |
| Cost per contact | Team cost / contacts | Trend only; never optimized at quality's expense |
| Automation quality | AI-draft acceptance, abstention rate, hallucination | Any groundedness failure → disable that automation path |

**Guardrails:** no experiment or process change may be called successful if
apparent deflection/containment rises while resolution falls or reopens,
refunds, complaints, or abandonment increase.

---

## 12. Quality and learning

- **Monthly QA:** stratified 10% sample of tickets (by reason, channel,
  severity, automation/manual); scored on groundedness, tone, actionability,
  and verification. Reopen clusters and misroutes are always replayed.
- **Automation safety:** AI drafts and macros bind to current source IDs,
  abstain on protected actions, and are canaried (10% of traffic) with
  rollback on metric regression.
- **Macro/answer review:** every release or policy change re-verifies affected
  macros; stale ones are withdrawn, and any tickets already sent with a wrong
  macro are corrected and re-contacted.
- **Post-incident:** S1/S2 incidents get a blameless review within 5 business
  days; support's role, timers, and customer comms are scored.

---

## 13. Staffing, on-call, degrade/stop/recover

- **Coverage:** min 1 agent live in business hours; 2 preferred. All 3 share
  the General queue; specialty work is balanced by weekly rotation.
- **On-call:** weekly rotation, 24/7, for S1. On-call agent carries the
  incident phone/pager and the incident runbook; other two agents backfill.
- **Degrade:** if 2 of 3 agents are unavailable (sickness, vacation), chat
  switches to "email us and we'll reply today" mode with a status-page note,
  and non-urgent S3/S4 tickets get extended timers (announced, not silent).
- **Stop:** if a specialist route's owner is out, their authority zone
  delegates to the most senior remaining agent with the audit trail intact;
  protected actions still require the owning authority and are never
  improvised.
- **Recover:** every queue has a fallback (General catches all); if tooling
  (help center, chat) fails, email remains the canonical channel and status
  page communicates the tooling failure.

---

## 14. Non-goals (explicit)

- We do not run experiments that optimize ticket avoidance, handle time,
  containment, or deflection while resolution, reopen, churn/refund,
  complaint, accessibility, safety, or trust worsens.
- We never trap users in automation, hide escalation, ask for secrets, or
  mark work resolved without verification.
- A ticket comment is never the authoritative money, access, incident,
  enforcement, or legal record.
- Support does not set refund policy, pricing, roadmap priority, security
  remediation, or legal commitments.

---

## 15. Open questions to confirm before go-live

1. Is "12k users" seats or accounts? (Drives contact-rate assumptions.)
2. Timezone(s) of customers and team; any non-English locales in the first
   year?
3. Do support tools have read access to billing ledger, identity, and product
   logs? (Required for §6.2 autonomous actions.)
4. Does a refund policy and identity/recovery policy exist to bind to?
5. Which plan tiers get chat vs email? Any contracted support SLAs?
6. Who is the engineering liaison's backup when that agent is on vacation?
7. Does the product have an existing feedback-tracking board we should link
   clusters to?

Once confirmed, bump `artifactRevision`, mark `artifactState: sealed`, and
attach the referenced policy artifacts before go-live.
