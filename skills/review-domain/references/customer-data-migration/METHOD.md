# Customer Data Migration
Produce one **Customer Data Migration Contract** that preserves meaning, ownership, access, history, and customer trust across a verifiable source-to-target transition. Acceptance covers those preserved semantics and customer outcomes rather than row count alone.

## Atomic boundary

Own one repeatable customer-data migration or import program: discovery, authority, mapping, transformation, dependency ordering, dry runs, validation, cutover, coexistence, rollback/forward-fix, reconciliation, communication, support, and acceptance. Consume upstream product schemas, privacy/retention rules, identity/tenant authority, contracts, and target capability. General codebase migrations, backup disaster recovery, ongoing customer success, and source/target product architecture remain with their respective owners.

## Resource routing

- Read `migration-contract-and-mapping.md` when source mapping, identity, transformation, reconciliation, or data ownership matter.
- Read `rehearsal-cutover-and-acceptance.md` when dry runs, dual-run, downtime, bulk cohorts, rollback, customer communications, or completion proof matter.

Retrieve current source/target schemas, APIs, quotas, export/import behavior, contractual permissions, privacy/residency requirements, and platform limits at execution. Current provider authority and observed access determine every migration capability.

## Operating rules

1. Separate supplied facts, observed behavior, customer confirmations,
   assumptions, and decisions. Keep documented schema, sampled data, dry-run
   result, production cutover, and customer acceptance distinct.
2. Define customer/tenant, source and target authorities, migration purpose, scope, populations/cohorts, time window, data classes, identities, ownership, region, encryption/access boundaries, downtime/change tolerance, success outcomes, and ruin conditions.
3. Inventory entities, fields, relationships, order, identifiers, versions, attachments, permissions, audit/history, derived values, deleted/tombstoned state, retention/holds, and product behavior. Include “nothing” states such as null, unknown, absent, redacted, unsupported, and intentionally dropped.
4. Name every mapping by its source and target meaning. Record source semantics, target semantics, transformation, defaults, provenance, lossiness, conflict policy, owner, test fixture, and customer-visible effect. Business meaning comes from the owning schema and product behavior.
5. Separate eligibility and authority from transformability. A technically importable record may be out of contract, out of region, another tenant's, past retention, under hold, malicious, duplicate, or unsafe to expose.
6. Design deterministic, idempotent, resumable stages with checkpoints, dedupe, dependency order, retry classes, rate/backpressure behavior, concurrency isolation, quarantine, replay, and immutable run provenance. Build the automated path for full scale, with manual review reserved for explicit exceptions.
7. Validate structure, counts, checksums where meaningful, relationships, permissions, financial/entitlement reconciliation, semantic invariants, representative workflows, search/indexing, files, localized content, accessibility metadata, and customer outcomes. Source-to-target count equality alone is weak proof.
8. Rehearse with synthetic edge cases plus permissioned representative samples. Measure throughput, resource use, quota behavior, failure distribution, recovery, peak load, support impact, and customer-visible downtime; redact and expire rehearsal data.
9. Choose coexistence and cutover explicitly: offline freeze, incremental sync, change-data capture, dual write/read, read-only source, ordered cohorts, or atomic switch. Define authoritative writer/readers at every point and prevent split-brain.
10. Define rollback only where source authority and reverse transforms remain safe. Otherwise design forward-fix, quarantine, entitlement/access freeze, restoration from a proven point, and customer remediation. “We have backups” is not a rollback plan.
11. Communicate eligibility, preparation, freeze/downtime, excluded or transformed data, customer validation, status, errors, retry, support, irreversible effects, and final evidence truthfully. Tenant isolation governs every disclosure, and lossy mappings carry explicit fidelity limits.
12. Close from observed reconciliation and acceptance for the exact run identity. Preserve minimum audit proof, unresolved exceptions, customer decision, cleanup/decommission conditions, and post-cutover monitoring; completion requires observed reconciliation and acceptance beyond a successful job exit.

## Workflow

### 1. Establish authority and semantic scope

Confirm who can authorize source access, target tenant, data movement, region, downtime, and acceptance. Capture source/target versions, exact cohort, product outcomes, privacy/retention constraints, excluded classes, dependencies, and evidence gaps.

### 2. Build inventory and mapping contract

Create entity/relationship/permission lineage, mapping rules, identifier strategy, transformation/default/loss policy, conflict and duplicate decisions, attachments/history behavior, eligibility checks, and fixtures. Route unresolved semantics to an accountable owner for an explicit decision.

### 3. Design migration execution

Specify discovery, extract, stage, scan, transform, load, index, validate, reconcile, accept, and cleanup states; idempotency, checkpoints, isolation, quotas, retries, quarantine, audit, observability, and safe stop/resume. Include multi-tenant and partial-cohort behavior.

### 4. Rehearse and decide cutover

Run mapping fixtures, synthetic pathologies, representative dry runs, load and recovery tests, and workflow validation. Compare against explicit cutover conditions; choose a freeze, sync, or dual-run strategy, cohort sequencing, exposure, communication, support coverage, recovery, and hold conditions.

### 5. Execute, reconcile, and close

Bind the run to exact source and target versions and approvals. Monitor, halt or quarantine on hard failures, reconcile every expected entity and invariant, obtain defined customer or owner acceptance, clean temporary data and credentials, monitor post-cutover behavior, and preserve the reconciliation record.

## Acceptance conditions

Acceptance conditions:

- observed source/target schemas, tenant and data authority, exact cohort, named mappings, and semantic owners;
- mappings derive from observed semantics and provider behavior;
- permissions, ownership, relationships, history, deletes/tombstones, holds, retention, and customer-visible meaning are preserved;
- execution is idempotent, resumable, reconcilable, isolated, backpressured, quarantined, and free of routine manual repair;
- production customer data in tests has authority, minimization, protection, and expiry;
- one writer, safe rollback, tenant isolation, intact entitlements, and bounded downtime;
- success comes from exact run reconciliation and defined customer or owner acceptance; and
- zero-loss, compatibility, scale, and live claims carry observed evidence at that layer.

## Output contract

Produce one **Customer Data Migration Contract** containing:

1. migration name, revision, run identifier, scope, customer or tenant,
   source and target authority and versions, cohort, outcomes, constraints,
   ruin conditions, current sources, and unresolved decisions;
2. entity, relationship, identity, permission, attachment, history, retention/hold, and lineage inventory;
3. versioned field/entity mapping rules with transformations, defaults, loss, conflicts, duplicates, provenance, owners, and fixtures;
4. eligibility, privacy, security, residency, and access decisions;
5. migration processing flow with idempotency, checkpoints, dependency order,
   isolation, quotas, retries, quarantine, stop and resume, and audit events;
6. rehearsal and load-validation plan, invariants, workflow tests, and reconciliation contract;
7. coexistence/cutover, authority transition, cohort, downtime, rollback/forward-fix, support, and communication plan;
8. exact execution/acceptance evidence, unresolved exceptions, post-cutover monitoring, cleanup/decommission, and recovery ownership.

The contract is complete when another agent can execute an exact cohort without guessing semantics, prove each intended invariant, stop safely, recover honestly, and show the customer what changed.
