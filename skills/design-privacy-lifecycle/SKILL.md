---
name: design-privacy-lifecycle
description: "Design a privacy lifecycle across collection, purpose, consent, retention, access, and deletion. Use also when operating a specific data-rights request through intake, fulfillment, and closure."
---

# Design Privacy Lifecycle

Produce one **Privacy Data Lifecycle Contract** that makes every material personal-data flow purpose-bound, controllable, time-bounded, and change-safe. This is a product and operating design artifact, not legal advice or a claim of compliance.

## Atomic boundary

Own the proactive lifecycle from proposed purpose through collection, use, sharing, retention, suppression, deletion dependency, and material change. Adjacent owners retain:

- fulfillment of a particular access, export, correction, deletion, restriction, objection, or appeal request;
- the analytics event schema, security architecture, notification policy, interface polish, or legal interpretation owned elsewhere;
- a static copy of laws, platform rules, vendor terms, or regional requirements.

A combined brief composes those owners. Keep one canonical fact home and pass exact decisions by revision.

## Resource routing

- Read [data inventory, purpose, and controls](references/data-inventory-purpose-and-controls.md) when data categories, purposes, lineage, access, vendors, or control ownership matter.
- Read [consent, retention, and change](references/consent-retention-and-change.md) when choices, permissions, vendors, retention, regional controls, AI reuse, or material changes matter.
- Read [operate data rights](references/operate-data-rights/METHOD.md) when the job is fulfilling a specific access, export, correction, deletion, restriction, objection, or appeal request.

## Source verification

Retrieve current requirements from applicable regulators, statutes, contracts, platform owners, and approved company policy. Record publisher, jurisdiction/scope, effective or retrieval date, and uncertainty. Treat reference text as input to qualified legal analysis; current legal conclusions require the accountable legal owner.

## Operating rules

1. Separate product intent, implemented flow, published promise, observed behavior, assumptions, decisions, and items awaiting an accountable owner.
2. Start with people and purposes, not databases. Identify data subjects, expected value, decision or action enabled, foreseeable harm, audience/age mode, territory, and whether the purpose can be met with less data or local/on-device processing.
3. Give every field or derived signal a stable data-element ID and one row covering source, subject, sensitivity, purpose, authority, collection surface, processors, destinations, access, retention trigger, terminal action, and proof owner.
4. Separate necessary service processing, security/fraud, user-requested personalization, analytics, marketing, advertising, model improvement, automated decisions, and speculative future use. Give each purpose its own authorized data set; availability alone grants no reuse authority.
5. Design notice, choice, permission, preference, withdrawal, and downstream suppression as a versioned state machine. A user-facing toggle without enforceable propagation and proof is not a control.
6. Map first-party systems, SDKs, vendors, subprocessors, exports, logs, backups, caches, search indexes, support attachments, warehouses, and model datasets. Disabled or ineligible capabilities must create no undeclared collection, initialization, permission, network, or retention cost.
7. Define retention from an event or obligation, not an arbitrary forever bucket. Separate active retention, reversible grace, deletion/anonymization, legal or security hold, immutable records, backup expiry, and proof retention.
8. Treat region, residency, cross-border movement, children or vulnerable groups, sensitive data, profiling, precise location, biometrics, financial/health data, and consequential automation as elevated review dimensions. Apply the authority governing each jurisdiction and map every cross-border interaction explicitly.
9. Make privacy controls production-shaped on first build: data catalog hooks, policy versions, consent/preference ledger, processor registry, enforcement adapters, deletion dependencies, drift detection, audit events, incident routing, and safe defaults. Human staffing or speculative ROI is not a reason to defer an applicable reversible control.
10. Authorize exposure through applicable policy, age and territory eligibility, consent or another validated basis, dependency health, and observed results. Automation operates inside declared bounds using existing authorization and purpose.
11. For every material change, compare old and new purpose, data, audience, vendor, region, model, retention, notice, and user expectation. Define re-notice, renewed choice, migration, suppression, rollback, and deletion/backfill effects before exposure.
12. Use proportional risk-return analysis only above hard legal, contractual, platform, rights, safety, and trust floors. Those floors remain binding regardless of revenue or growth, and experiments stay within disclosed collection authority.

## Workflow

### 1. Frame the decision

Define product capability, people affected, promised value, data-sensitive decisions, jurisdictions/age modes, current state, intended change, risk appetite above floors, and exact acceptance decision.

### 2. Build the purpose and data map

Create purpose IDs, data-element IDs, source-to-destination lineage, processors, derived data, published claims, and unresolved authority. Challenge necessity and minimize at field, precision, frequency, audience, retention, and access levels.

### 3. Design controls and lifecycle states

Specify collection preconditions, notice, choice or other authority, permissions, preference propagation, access boundaries, retention clocks, holds, terminal actions, rights-operation handoffs, and proof events. Include denial, withdrawal, offline, retry, conflict, vendor failure, and account/workspace edge cases.

### 4. Evaluate elevated risk and changes

Run the risk record across sensitivity, scale, vulnerability, monitoring, profiling, combination, opacity, consequence, transfer, vendor, breach, and expectation mismatch. Record mitigation, residual risk, decision owner, authority needed, and exposure ceiling.

### 5. Define implementation and continuous assurance

Turn the contract into owner handoffs for product, interface, analytics, security, data rights, vendor management, support, and delivery. Define drift checks, sampling, request/complaint signals, processor changes, retention jobs, incident triggers, periodic review, and automatic safe fallback.

## Acceptance conditions

Acceptance conditions:

- every field has a purpose, lifecycle, processor, and owner map;
- runtime enforcement evidence accompanies privacy policy, choice UI, and SDK configuration;
- each purpose has a clear, unbundled choice and withdrawal is as easy as selection;
- consent and other authority are validated for the current jurisdiction and context;
- coverage includes derived stores, exports, logs, backups, support data,
  subprocessors, and model or analytics datasets;
- retention is bounded, deletion promises match physical capability, and lawful
  or security exceptions are transparent;
- sensitive, child, profiling, and consequential processing receive elevated
  review and exact controls before exposure;
- scale, localization, accessibility, vendor controls, suppression, drift
  detection, and deletion dependencies are part of the initial design; and
- compliance, legal basis, user understanding, and runtime-enforcement claims
  use evidence suited to that layer.

## Output contract

Produce one **Privacy Data Lifecycle Contract** containing:

1. revision, scope, evidence labels, decision requested, people/purposes, jurisdictions/age modes, published promises, and unresolved authority;
2. purpose register and field-level data map with sources, derivations, processors, destinations, access, sensitivity, retention, terminal action, and owners;
3. minimization decisions and alternatives rejected;
4. notice, choice/authority, permission, preference, withdrawal, propagation, and state machines;
5. retention, hold, deletion/anonymization, backup, and data-rights handoff matrix;
6. elevated-risk assessment, mitigations, residual-risk owner, exposure ceiling, and recovery;
7. material-change diff and migration/re-notice/re-choice/rollback plan;
8. specialist owner handoffs, implementation acceptance tests, telemetry, drift controls, incidents, review cadence, and current sources and owners.

The contract is complete when every material data use is necessary or explicitly rejected, enforceable across every destination, time-bounded, inspectable, change-safe, and linked to the owner that can prove it.
