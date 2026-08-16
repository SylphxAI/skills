---
name: operate-data-rights
description: "Operate data-rights requests through authorized intake, fulfillment, verification, and closure."
---

# Operate Data Rights

Produce one **Data Rights Operations Contract** that can accept, authorize, fulfill, prove, communicate, and safely recover each supported request without deleting the wrong person's data or making false promises.

## Atomic boundary

Own request intake through verified closure for access, export, correction, deletion, restriction, objection/opt-out, withdrawal, and appeal. Consume the product's data inventory, retention/hold rules, identity authority, contracts, and current jurisdiction-specific requirements. Keep upstream policy, legal advice, and privacy-lifecycle design with their established owners.

## Resource routing

- Read `references/request-control-and-fulfillment.md` when intake, identity, scope, execution, delivery, or audit handling matter.
- Read `references/rights-edge-cases-and-proof.md` for shared workspaces, minors/agents, holds, backups, derived data, portability, vendors, appeals, or high-risk deletion.

## Source verification

Retrieve current deadlines, identity limits, rights, exceptions, formats, and communication duties from applicable official authority and approved counsel/policy at use. Record the applicable scope and retrieval date for every deadline.

## Operating rules

1. Assign a request ID, preserve the original request and channel, and separate
   requester claims, observed facts, current policy, and decisions.
2. Determine subject, account/workspace, requester role, represented person, jurisdictions, right types, requested scope, systems, dates, format/accessibility needs, urgency, and language before fulfillment.
3. Use proportional identity and authority verification. Limit identity evidence to the request risk, keep unrelated account existence private, and use verification data only for its stated purpose.
4. Separate acknowledgment, identity and authority, scoping, eligibility and
   exceptions, fulfillment, quality review, delivery, appeal, and completion.
   Every step has an owner, clock source, retry and recovery path, and
   customer-safe status.
5. Build one system and processor coverage map from the canonical data inventory. Include raw and derived stores, exports, caches, indexes, logs, backups, support attachments, marketing tools, analytics/warehouse, model datasets, and subprocessors.
6. Treat access/export, correction, deletion, restriction, objection/opt-out, and withdrawal as different transformations. One request can compose them, but their validation, side effects, exceptions, and proof remain explicit.
7. Protect other people, shared workspaces, trade secrets, security/fraud signals, legal obligations, disputes, billing/tax records, and active holds. Ground each redaction or limit in a current scoped reason and provide the applicable appeal path.
8. Design idempotent jobs, per-destination receipts, retries, reconciliation, partial-failure states, tombstones, restoration filters, subprocessor dispatch, and stale-work detection. A queue accepted event is not fulfillment proof.
9. Deliver exports securely in an understandable, accessible, machine-usable format where required; include definitions, provenance/time bounds, missing categories, redactions, expiry, and integrity. Present governed fields rather than opaque database rows, and keep secrets protected.
10. Communicate scope, expected process, verified delays, partial completion, retained exceptions, irreversible consequences, recovery limits, appeal, and final status truthfully. Claim physical backup deletion or full completion only from observed results.
11. Instrument volumes, ages, deadline risk, auth failures, coverage, job errors, processor latency, exception rates, reopens, appeals, complaints, deletion/restore drift, and sampled accuracy without leaking request contents.
12. Automate routine routing and fulfillment inside approved rules; route
    ambiguity, authority conflicts, high-risk shared scope, holds, safety, and
    novel exceptions to the named owner. Missing authority stays pending with a
    named owner and customer status.

## Workflow

### 1. Establish request truth

Normalize request types and scope while preserving the original. Resolve applicable law and policy, subject/requester relationship, clock, identity level, duplicate or linked cases, accessibility/language needs, and exact decision owners.

### 2. Plan coverage and decisions

Map requested rights to systems and processors. For each category decide whether
to include, transform, restrict, redact, or retain under an approved exception.
Route unresolved decisions to their owner and record the customer explanation.

### 3. Execute and reconcile

Run authorized export/correction/restriction/deletion/suppression jobs using idempotency keys and dependency order. Reconcile destination receipts against expected scope; handle partial failure, retry, backup/tombstone behavior, and subprocessor callbacks.

### 4. Quality-review and deliver

Check identity binding, completeness, redaction, format, malware/secrets, accessibility, recipient channel, expiry, irreversible effects, and exception wording. Use separation of duties for destructive or unusually sensitive cases.

### 5. Close, appeal, and learn

Close only from observed evidence. Preserve minimum audit proof, expire unnecessary verification/export data, expose appeal/reopen paths, and feed coverage or failure gaps to the privacy lifecycle and owning product systems.

## Acceptance conditions

Acceptance conditions:

- deadlines, rights, identity requirements, and exceptions come from current scoped authority;
- identity assurance matches the action impact and minimizes collected evidence;
- shared-account users, represented persons, minors, deceased users, tenant
  ownership, and other people's data have explicit handling;
- access, export, deletion, restriction, objection, and consent withdrawal use
  their distinct operations;
- coverage includes derived data, processors, logs, backups, indexes, support
  data, model datasets, and restoration behavior;
- exports are usable and redacted, valid holds preserve evidence, and limited
  outcomes carry reviewable reasons;
- completion requires receipts and reconciliation across the requested scope; and
- scaled operation uses durable workflows, automation, and owned exception paths.

## Output contract

Produce one **Data Rights Operations Contract** containing:

1. artifact and request IDs, scope, requester and subject roles, jurisdictions,
   current sources, owners, deadlines, and risk tier;
2. supported-right taxonomy, intake channels, duplicate/linking rules, and identity and authorization rules;
3. request flow with deadlines, owners, communications, retries, escalations,
   and pending cases;
4. system and processor coverage with the fulfillment action for each right;
5. exception/hold/redaction/appeal decision table with evidence, expiry/review, and customer explanation;
6. execution dependency graph, idempotency, receipts, reconciliation, partial failure, backup/tombstone/restore, and subprocessor behavior;
7. export/correction/deletion/restriction delivery QA and secure communication plan;
8. privacy-minimized audit proof, metrics, alerts, sampled assurance, incidents, recovery, and upstream improvement handoffs.

The contract is complete when an operator or agent can determine the next safe
action for every case, show the exact observed result, and explain each limit
while protecting other people and leaving legal authority with its owner.
