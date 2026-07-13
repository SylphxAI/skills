---
name: enterprise-contract-operations-review
description: "Design or audit an enterprise contract operating system across authoritative document intake, versions and precedence, clause and obligation extraction, redlines/deviations, approvals, commitments, amendments, notice windows, renewals, true-ups, cancellations, expiries, exceptions, evidence, and handoffs to pricing, billing, entitlements, security, privacy, support, product, finance, sales, and customer success. Use when the primary artifact is the executable contract and obligation lifecycle. This skill does not provide legal advice or approve terms."
---

# Enterprise Contract Operations Review

Produce one **Enterprise Contract Operations Contract** that converts executed commercial/legal sources into versioned obligations, dates, controls, system changes, evidence, and accountable decisions. Contract text remains authoritative; extracted data and summaries are governed operational views, never silent substitutes.

## Atomic boundary

Own authoritative-source intake, document family/version/precedence, structured clause and obligation records, deviation/redline workflow, approval and signature authority, commitments, amendments, renewals/notice/termination, exceptions/expiry, operational handoffs, evidence, reconciliation, and customer-safe status. Do not interpret law, negotiate or sign without authority, set product pricing, operate billing/payment ledgers, or own customer-success and revenue pipeline systems.

## When not to use

- Use qualified legal authority when the primary job is interpretation, negotiation advice, approval, signature, or a jurisdiction-specific legal conclusion.
- Use `revenue-operations-review`, `saas-subscription-pricing`, `payment-platform-readiness`, or `customer-success-operations-review` for pipeline/forecast, price/package choice, payment/ledger operation, or recurring customer value.

## Resource routing

- Read `references/contract-source-and-obligation-register.md` for every task.
- Read `references/changes-renewals-and-system-handoffs.md` when redlines, approvals, amendments, renewal, notice, price/usage changes, cancellation, exceptions, entitlements, billing, evidence, or automation matter.

## Source verification

Use the exact authoritative documents and current approved playbooks, signature/delegation policy, legal guidance, regional requirements, and system state at execution. Never claim legal meaning, enforceability, approval, signature, renewal, cancellation, or fulfillment from an LLM extraction alone.

## Operating rules

1. Label inputs `authoritative-source`, `observed-system-state`, `party-stated`, `extracted`, `assumed`, `decision`, or `authority-pending`. Every extraction links exact document/version/page/clause or structured source and confidence/review state.
2. Establish contract family and precedence: order form, master agreement, data/privacy terms, security addendum, SLA/support terms, statement of work, pricing/usage exhibit, amendment, side letter, renewal/notice, and incorporated policy as applicable. Do not assume newest file globally overrides every clause.
3. Define parties, entities, account/tenant, products/services, territories, currencies, effective/term dates, renewal/notice mechanics, signature status, governing owner, and document relationships. Resolve duplicates, unsigned drafts, redlines, missing exhibits, and conflicting dates before operationalizing.
4. Give every clause/obligation a stable ID with source, obligated/beneficiary party, trigger, action, due date/clock, recurrence, scope, owner, dependencies, evidence, customer visibility, remedy/exposure, exception, status, and supersession. Preserve original language beside normalized operations data.
5. Separate legal interpretation, commercial policy, pricing approval, security/privacy assurance, product capability, service/support delivery, billing/invoicing, entitlement/provisioning, finance/accounting, and customer communication. Route each to its owner and reconcile outcomes back to the obligation record.
6. Treat redlines and deviations as typed deltas against an approved baseline: requested language/business effect, risk, fallback, precedent/reuse scope, approver, expiry/review, downstream impact, and final source. Never accept generated language or a prior customer exception as approved policy.
7. Model lifecycle states for draft/review/approved/signature/executed/active/amended/renewal/notice/termination/expired/disputed and obligation pending/due/fulfilled/breached/waived/exception. Define allowed transitions, authority, clocks, evidence, and recovery.
8. Make notice windows, auto-renewal, price or usage changes, true-ups, co-terming, expansion/downgrade, cancellation, termination, service credits, and obligations calendar-driven but authority-bound. Automated reminders can prepare action; they cannot invent notice delivery, customer consent, or contractual right.
9. Bind commercial terms and exceptions to pricing/quote, billing/invoice, tax, entitlement/provisioning, usage meter, support/SLA, security/privacy evidence, implementation, and customer-success systems with exact effective/expiry semantics. CRM notes and PDFs in inboxes are not runtime configuration.
10. Build scale-ready automation now: controlled ingestion, OCR/parser with provenance, extraction confidence, comparison, obligation calendar, approval routing, signature/provider adapters, event-driven handoffs, reconciliation, evidence collection, expiry, access control, audit, stale-source detection, and safe fallback. Do not defer to spreadsheet/manual memory because volume is low.
11. Protect confidential and privileged content through least access, purpose, redaction, sharing controls, approved AI/vendor boundaries, retention, legal hold, export, and audit. Public trust materials and sales answers must never expose gated contract evidence or broaden a customer-specific promise.
12. Validate through source sampling, clause-to-record and record-to-system reconciliation, date/time-zone tests, precedence conflicts, amendments, partial signatures, renewal/notice edge cases, provider failure, permission tests, historical backfill, downstream rollback, and owner acceptance. Preserve uncertainty and escalate interpretation.

## Workflow

### 1. Establish authoritative contract truth

Collect exact document family, signatures, versions, amendments, incorporated sources, parties, scope, dates, precedence, approvals, current system state, and decision requested. Quarantine drafts, duplicates, incomplete or conflicting sources until resolved by authority.

### 2. Build clauses, obligations, and deviations

Extract with provenance and confidence; classify commercial, billing, product, service, security, privacy/data, compliance, implementation, support, reporting, notice, renewal, termination, remedy, and other obligations. Compare deviations to approved baseline and route interpretation/approval to named owners.

### 3. Design lifecycle and calendar controls

Define contract/amendment/signature and obligation states; effective and supersession semantics; notice, renewal, expiry, review, true-up, cancellation, and termination clocks; alerts/escalations; proof of delivery; and safe behavior for missing authority or provider failure.

### 4. Bind operational systems

Create typed, versioned handoffs to quote/pricing, billing/tax, entitlement/provisioning, usage, implementation/migration, security/privacy, support/SLA, product commitments, finance, revenue ops, and customer success. Reconcile expected versus observed state and block unsupported promises/configuration.

### 5. Assure, renew, amend, or close

Produce obligation evidence, gap/remediation, customer-safe status, renewal/decision pack, amendment/cancellation path, exception cleanup, post-term data/access behavior, and final archive. Sample extraction, test clocks and handoffs, audit changes, expire exceptions/access, and preserve exact source links.

## Hard gates

Reject or redesign an output that:

- lacks exact authoritative sources, signatures/status, version/precedence, clause provenance, parties, scope, effective dates, or authority;
- treats OCR/LLM extraction, CRM notes, a quote, unsigned draft, playbook, or generated summary as legal truth;
- silently interprets ambiguous language, approves deviations, signs, sends notice, changes price, or cancels/renews without scoped authority;
- loses amendments, incorporated terms, side letters, customer-specific exceptions, expiry, notice proof, or supersession;
- records obligations without triggers, clocks, owners, evidence, remedies/exposure, operational handoffs, and observed reconciliation;
- lets contract exceptions drift indefinitely or lets billing/entitlement/product/support configuration contradict the executed source;
- exposes confidential/privileged evidence, broadens a customer-specific promise, or uses contract data beyond approved purpose;
- claims obligation fulfillment, renewal, cancellation, compliance, or system correctness from reminders, generated records, local tests, or invented evidence.

## Output contract

Produce one **Enterprise Contract Operations Contract** containing:

1. artifact ID, scope, evidence labels, parties/entities/account, decision, authorities, confidentiality, current-source register, signatures, versions, relationships, and precedence;
2. clause and obligation register with exact provenance, normalized meaning pending authority, triggers, clocks, owners, dependencies, evidence, exposure, status, and supersession;
3. baseline/deviation/redline, approval, fallback, precedent, signature, and amendment decision matrix;
4. contract and obligation lifecycle state machines plus notice/renewal/true-up/price-change/cancellation/termination/expiry calendar;
5. typed handoffs and expected/observed reconciliation for pricing/quote, billing/tax, entitlements, usage, implementation, security/privacy, support/SLA, product, finance, revenue ops, and customer success;
6. exception, waiver, service-credit, dispute, remedy, remediation, appeal/escalation, and cleanup rules;
7. automation, extraction-confidence review, access/privacy, audit, stale-source, evidence, provider-failure, rollback, archive, and current-authority controls;
8. validation and operating evidence with sampling, precedence/date cases, downstream tests, owner decisions, unresolved ambiguity, and customer-safe communications.

The contract is complete when every operational obligation traces to exact executed authority, every system effect is reconciled, and no automated summary can silently become a promise or legal decision.
