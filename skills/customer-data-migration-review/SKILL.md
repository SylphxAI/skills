---
name: customer-data-migration-review
description: "Design or audit one customer-facing data import, onboarding migration, tenant move, system replacement, or bulk cutover from source discovery through mapping, transformation, validation, rehearsal, execution, reconciliation, rollback/forward-fix, customer communication, and acceptance. Use when the primary artifact is a repeatable migration contract for customer data and service continuity. Use multi-repository-migration for a multi-repository code rewrite, product-recovery-contract-review for same-product backup and restore, and customer-success-operations-review for the ongoing post-migration value program."
---

# Customer Data Migration Review

Produce one **Customer Data Migration Contract** that preserves meaning, ownership, access, history, and customer trust across a verifiable source-to-target transition. “Rows copied” is never the acceptance condition.

## Atomic boundary

Own one repeatable customer-data migration or import program: discovery, authority, mapping, transformation, dependency ordering, dry runs, validation, cutover, coexistence, rollback/forward-fix, reconciliation, communication, support, and acceptance. Consume upstream product schemas, privacy/retention rules, identity/tenant authority, contracts, and target capability. Do not own general codebase migrations, backup disaster recovery, ongoing customer success, or the source/target product architecture.

## When not to use

- Use `multi-repository-migration` or the owning project under `engineering-standard`
  for a multi-repository code rewrite, infrastructure migration, or generic
  data-platform implementation.
- Use the product backup/restore investigation, `customer-success-operations-review`, `product-lifecycle-architect`, or `data-rights-operations-review` when the primary artifact is backup recovery, ongoing customer value, a whole-product program, or one rights request.

## Resource routing

- Read `references/migration-contract-and-mapping.md` for every task.
- Read `references/rehearsal-cutover-and-acceptance.md` when dry runs, dual-run, downtime, bulk cohorts, rollback, customer communications, or completion proof matter.

Retrieve current source/target schemas, APIs, quotas, export/import behavior, contractual permissions, privacy/residency requirements, and platform limits at execution. Never hardcode volatile provider facts or claim access that was not observed.

## Operating rules

1. Label material facts `given`, `observed`, `customer-confirmed`, `assumed`, `hypothesis`, `decision`, or `authority-pending`. Separate documented schema, sampled data, dry-run result, production cutover, and customer acceptance.
2. Define customer/tenant, source and target authorities, migration purpose, scope, populations/cohorts, time window, data classes, identities, ownership, region, encryption/access boundaries, downtime/change tolerance, success outcomes, and ruin conditions.
3. Inventory entities, fields, relationships, order, identifiers, versions, attachments, permissions, audit/history, derived values, deleted/tombstoned state, retention/holds, and product behavior. Include “nothing” states such as null, unknown, absent, redacted, unsupported, and intentionally dropped.
4. Give every mapping a stable rule ID with source semantics, target semantics, transformation, defaults, provenance, lossiness, conflict policy, owner, test fixture, and customer-visible effect. Never infer business meaning from matching column names alone.
5. Separate eligibility and authority from transformability. A technically importable record may be out of contract, out of region, another tenant's, past retention, under hold, malicious, duplicate, or unsafe to expose.
6. Design deterministic, idempotent, resumable stages with checkpoints, dedupe, dependency order, retry classes, rate/backpressure behavior, concurrency isolation, quarantine, replay, and immutable run provenance. Build for full scale now; do not rely on manual spreadsheet repair as the intended path.
7. Validate structure, counts, checksums where meaningful, relationships, permissions, financial/entitlement reconciliation, semantic invariants, representative workflows, search/indexing, files, localized content, accessibility metadata, and customer outcomes. Source-to-target count equality alone is weak proof.
8. Rehearse with synthetic edge cases plus permissioned representative samples. Measure throughput, resource use, quota behavior, failure distribution, recovery, peak load, support impact, and customer-visible downtime; redact and expire rehearsal data.
9. Choose coexistence and cutover explicitly: offline freeze, incremental sync, change-data capture, dual write/read, read-only source, phased cohort, or atomic switch. Define authoritative writer/readers at every phase and prevent split-brain.
10. Define rollback only where source authority and reverse transforms remain safe. Otherwise design forward-fix, quarantine, entitlement/access freeze, restoration from a proven point, and customer remediation. “We have backups” is not a rollback plan.
11. Communicate eligibility, preparation, freeze/downtime, excluded or transformed data, customer validation, status, errors, retry, support, irreversible effects, and final evidence truthfully. Never expose another tenant or promise perfect fidelity where mapping is lossy.
12. Close from observed reconciliation and acceptance for the exact run identity. Preserve minimum audit proof, unresolved exceptions, customer decision, cleanup/decommission conditions, and post-cutover monitoring; never claim completion from a successful job exit alone.

## Workflow

### 1. Establish authority and semantic scope

Confirm who can authorize source access, target tenant, data movement, region, downtime, and acceptance. Capture source/target versions, exact cohort, product outcomes, privacy/retention constraints, excluded classes, dependencies, and evidence gaps.

### 2. Build inventory and mapping contract

Create entity/relationship/permission lineage, mapping rules, identifier strategy, transformation/default/loss policy, conflict and duplicate decisions, attachments/history behavior, eligibility checks, and fixtures. Route unresolved semantics to an accountable owner; do not guess.

### 3. Design the migration machine

Specify discovery, extract, stage, scan, transform, load, index, validate, reconcile, accept, and cleanup states; idempotency, checkpoints, isolation, quotas, retries, quarantine, audit, observability, and safe stop/resume. Include multi-tenant and partial-cohort behavior.

### 4. Rehearse and decide cutover

Run mapping fixtures, synthetic pathologies, representative dry runs, load/recovery tests, and workflow validation. Compare against explicit gates; choose freeze/sync/dual-run strategy, cohort sequencing, exposure, communication, support coverage, rollback/forward-fix, and no-go conditions.

### 5. Execute, reconcile, and close

Bind the run to exact source/target versions and approvals. Monitor, halt/quarantine on hard failures, reconcile every expected entity and invariant, obtain defined customer/owner acceptance, clean temporary data and credentials, monitor post-cutover behavior, and preserve the evidence ledger.

## Hard gates

Reject or redesign an output that:

- lacks observed source/target schemas, tenant and data authority, exact cohort, mapping rule IDs, or semantic owners;
- copies data based only on field names, row counts, happy-path samples, or invented provider behavior;
- loses permissions, ownership, relationships, history, deletes/tombstones, holds, retention, or customer-visible meaning silently;
- is non-idempotent, cannot resume/reconcile, has no isolation/backpressure/quarantine, or depends on routine manual repair;
- uses production customer data in tests without authority, minimization, protection, and expiry;
- permits split-brain writers, unsafe rollback, cross-tenant exposure, broken entitlements, or unbounded downtime;
- declares success from process exit, source/target counts, local tests, or customer silence rather than exact run reconciliation and acceptance;
- claims zero loss, current compatibility, scale, or live completion without observed evidence.

## Output contract

Produce one **Customer Data Migration Contract** containing:

1. artifact/run IDs, scope, evidence labels, customer/tenant, source/target authority and versions, cohort, outcomes, constraints, ruin conditions, and current-authority register;
2. entity, relationship, identity, permission, attachment, history, retention/hold, and lineage inventory;
3. versioned field/entity mapping rules with transformations, defaults, loss, conflicts, duplicates, provenance, owners, and fixtures;
4. eligibility/privacy/security/residency/access decision matrix;
5. migration state machine with idempotency, checkpoints, dependency order, isolation, quotas, retries, quarantine, stop/resume, and audit events;
6. rehearsal and scale evidence plan, validation invariants, workflow tests, and reconciliation contract;
7. coexistence/cutover, authority transition, cohort, downtime, rollback/forward-fix, support, and communication plan;
8. exact execution/acceptance evidence, unresolved exceptions, post-cutover monitoring, cleanup/decommission, and recovery ownership.

The contract is complete when another agent can execute an exact cohort without guessing semantics, prove each intended invariant, stop safely, recover honestly, and show the customer what changed.
