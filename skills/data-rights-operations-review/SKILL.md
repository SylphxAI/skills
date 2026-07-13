---
name: data-rights-operations-review
description: "Design or audit an auditable operating system for individual or account data-rights requests: access, export/portability, correction, deletion/erasure, restriction, objection or opt-out, consent withdrawal, appeal, identity and authority checks, shared-account scope, legal/security exceptions, subprocessors, deadlines, communication, and proof. Use when the primary artifact is the end-to-end request case protocol. Use privacy-data-lifecycle-review for proactive product data design and retention policy; do not use this skill as jurisdiction-specific legal advice."
---

# Data Rights Operations Review

Produce one **Data Rights Operations Contract** that can accept, authorize, fulfill, prove, communicate, and safely recover each supported request without deleting the wrong person's data or making false promises.

## Atomic boundary

Own request intake through verified closure for access, export, correction, deletion, restriction, objection/opt-out, withdrawal, and appeal. Consume the product's data inventory, retention/hold rules, identity authority, contracts, and current jurisdiction-specific requirements. Do not author those upstream facts, give legal advice, or redesign the whole privacy lifecycle.

## When not to use

- Use `privacy-data-lifecycle-review` when the primary artifact is proactive purpose, collection, consent/preference, vendor, retention, region, or privacy-impact design.
- Use the qualified legal, support, analytics, security, or backup owner when the primary job is legal interpretation, support-organization design, event instrumentation, security engineering, or product backup implementation rather than a rights-request case.

## Resource routing

- Read `references/request-control-and-fulfillment.md` for every task.
- Read `references/rights-edge-cases-and-proof.md` for shared workspaces, minors/agents, holds, backups, derived data, portability, vendors, appeals, or high-risk deletion.

## Source verification

Retrieve current deadlines, identity limits, rights, exceptions, formats, and communication duties from applicable official authority and approved counsel/policy at use. Record scope and retrieval date; never hardcode one global deadline.

## Operating rules

1. Assign a request ID and label every input `given`, `observed`, `claimed`, `verified`, `authority-pending`, or `decision`. Preserve the original request and channel.
2. Determine subject, account/workspace, requester role, represented person, jurisdictions, right types, requested scope, systems, dates, format/accessibility needs, urgency, and language before fulfillment.
3. Use proportional identity and authority verification. Do not collect more identity evidence than the request risk warrants, expose whether an unrelated account exists, or reuse verification data for another purpose.
4. Separate acknowledgment, identity/authority, scoping, eligibility/exception, fulfillment, quality review, delivery, appeal, and proof. Every state needs an owner, clock source, allowed transitions, retry/recovery, and customer-safe status.
5. Build one system and processor coverage map from the canonical data inventory. Include raw and derived stores, exports, caches, indexes, logs, backups, support attachments, marketing tools, analytics/warehouse, model datasets, and subprocessors.
6. Treat access/export, correction, deletion, restriction, objection/opt-out, and withdrawal as different transformations. One request can compose them, but their validation, side effects, exceptions, and proof remain explicit.
7. Protect other people, shared workspaces, trade secrets, security/fraud signals, legal obligations, disputes, billing/tax records, and active holds. Redact or limit only with a current scoped reason and appeal path; do not use “security” as a blanket refusal.
8. Design idempotent jobs, per-destination receipts, retries, reconciliation, partial-failure states, tombstones, restoration filters, subprocessor dispatch, and stale-work detection. A queue accepted event is not fulfillment proof.
9. Deliver exports securely in an understandable, accessible, machine-usable format where required; include definitions, provenance/time bounds, missing categories, redactions, expiry, and integrity. Do not dump opaque database rows or secrets.
10. Communicate scope, expected process, verified delays, partial completion, retained exceptions, irreversible consequences, recovery limits, appeal, and final status truthfully. Never claim physical backup deletion or full completion without observed receipts.
11. Instrument volumes, ages, deadline risk, auth failures, coverage, job errors, processor latency, exception rates, reopens, appeals, complaints, deletion/restore drift, and sampled accuracy without leaking request contents.
12. Automate routine routing and fulfillment inside approved rules; route ambiguity, authority conflicts, high-risk shared scope, holds, safety, and novel exceptions to the named owner. Missing authority defaults to a safe pending state, not silent denial or destructive action.

## Workflow

### 1. Establish request truth

Normalize request types and scope while preserving the original. Resolve current authority, subject/requester relationship, clock, identity/authority level, duplicate or linked cases, accessibility/language needs, and exact decision owners.

### 2. Plan coverage and decisions

Map requested rights to systems and processors. For each category decide include, transform, restrict, redact, retain under exception, or authority-pending, with evidence, owner, expiry/review, and customer explanation.

### 3. Execute and reconcile

Run authorized export/correction/restriction/deletion/suppression jobs using idempotency keys and dependency order. Reconcile destination receipts against expected scope; handle partial failure, retry, backup/tombstone behavior, and subprocessor callbacks.

### 4. Quality-review and deliver

Check identity binding, completeness, redaction, format, malware/secrets, accessibility, recipient channel, expiry, irreversible effects, and exception wording. Use separation of duties for destructive or unusually sensitive cases.

### 5. Close, appeal, and learn

Close only from observed evidence. Preserve minimum audit proof, expire unnecessary verification/export data, expose appeal/reopen paths, and feed coverage or failure gaps to the privacy lifecycle and owning product systems.

## Hard gates

Reject or redesign an output that:

- uses universal deadlines, rights, identity requirements, or exceptions without current scoped authority;
- authenticates too weakly for destructive access or collects excessive identity evidence;
- ignores shared-account users, represented persons, minors, deceased users, tenant ownership, or other people's data;
- treats access, export, deletion, restriction, objection, and consent withdrawal as the same operation;
- omits derived data, processors, logs, backups, indexes, support data, model datasets, or restoration behavior;
- gives opaque exports, leaks secrets/other subjects, destroys evidence under a valid hold, or refuses with an unreviewable blanket reason;
- claims completion from dispatch, queue acceptance, static policy, or missing receipts;
- relies on spreadsheets and manual memory as the normal scaled workflow or delays scale-safe automation for human-cost reasons.

## Output contract

Produce one **Data Rights Operations Contract** containing:

1. artifact/request IDs, scope, evidence labels, requester/subject roles, jurisdictions, current-authority register, clock, owners, and risk tier;
2. supported-right taxonomy, intake channels, duplicate/linking rules, identity and authority matrix;
3. lifecycle state machine with clocks, transitions, owners, communications, retries, escalations, and safe pending states;
4. system/processor coverage and per-right transformation matrix;
5. exception/hold/redaction/appeal decision table with evidence, expiry/review, and customer explanation;
6. execution dependency graph, idempotency, receipts, reconciliation, partial failure, backup/tombstone/restore, and subprocessor behavior;
7. export/correction/deletion/restriction delivery QA and secure communication plan;
8. privacy-minimized audit proof, metrics, alerts, sampled assurance, incidents, recovery, and upstream improvement handoffs.

The contract is complete when an operator or agent can determine the next safe action for every state, prove what did and did not happen, and explain any limit without exposing another person or inventing legal authority.
