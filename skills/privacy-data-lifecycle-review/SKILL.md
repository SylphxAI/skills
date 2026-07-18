---
name: privacy-data-lifecycle-review
description: "Design or audit a product's proactive personal-data lifecycle: purposes, data inventory, minimization, notice and choice, consent or other authority, permissions, vendors and subprocessors, regional handling, retention, deletion dependencies, AI or analytics reuse, and change governance. Use for privacy-by-design reviews, privacy impact assessments, consent or preference-center architecture, data retention design, vendor data-flow review, or a material feature change involving personal data. Use data-rights-operations-review for one request workflow; use product-analytics-instrumentation-review for event and metric implementation after the privacy contract is decided."
---

# Privacy Data Lifecycle Review

Produce one **Privacy Data Lifecycle Contract** that makes every material personal-data flow purpose-bound, controllable, time-bounded, and change-safe. This is a product and operating design artifact, not legal advice or a claim of compliance.

## Atomic boundary

Own the proactive lifecycle from proposed purpose through collection, use, sharing, retention, suppression, deletion dependency, and material change. Do not own:

- fulfillment of a particular access, export, correction, deletion, restriction, objection, or appeal request;
- the analytics event schema, security architecture, notification policy, interface polish, or legal interpretation owned elsewhere;
- a static copy of laws, platform rules, vendor terms, or regional requirements.

A combined brief composes those owners. Keep one canonical fact home and pass exact decisions by artifact ID.

## When not to use

- Use `data-rights-operations-review` when the primary artifact is fulfillment of an individual access, export, correction, deletion, restriction, objection, or appeal request.
- Use `product-analytics-instrumentation-review`, `interface-craft`, or the owning
  security engineering boundary under `engineering-standard` when the primary
  job is event implementation, permission-surface craft, or security architecture
  rather than the proactive privacy lifecycle.

## Resource routing

- Read `references/data-inventory-purpose-and-controls.md` for every task.
- Read `references/consent-retention-and-change.md` when choices, permissions, vendors, retention, regional controls, AI reuse, or material changes matter.

## Source verification

Retrieve current authority at use from applicable regulators, statutes, contracts, platform owners, and approved company policy. Record publisher, jurisdiction/scope, effective or retrieval date, and uncertainty. Never turn reference text into a current legal conclusion.

## Operating rules

1. Label inputs `given`, `observed`, `assumed`, `hypothesis`, `decision`, or `authority-pending`. Separate product intent, implemented flow, published promise, and live evidence.
2. Start with people and purposes, not databases. Identify data subjects, expected value, decision or action enabled, foreseeable harm, audience/age mode, territory, and whether the purpose can be met with less data or local/on-device processing.
3. Give every field or derived signal a stable data-element ID and one row covering source, subject, sensitivity, purpose, authority, collection surface, processors, destinations, access, retention trigger, terminal action, and proof owner.
4. Separate necessary service processing, security/fraud, user-requested personalization, analytics, marketing, advertising, model improvement, automated decisions, and speculative future use. Do not reuse one purpose's data merely because it is available.
5. Design notice, choice, permission, preference, withdrawal, and downstream suppression as a versioned state machine. A user-facing toggle without enforceable propagation and proof is not a control.
6. Map first-party systems, SDKs, vendors, subprocessors, exports, logs, backups, caches, search indexes, support attachments, warehouses, and model datasets. Disabled or ineligible capabilities must create no undeclared collection, initialization, permission, network, or retention cost.
7. Define retention from an event or obligation, not an arbitrary forever bucket. Separate active retention, reversible grace, deletion/anonymization, legal or security hold, immutable records, backup expiry, and proof retention.
8. Treat region, residency, cross-border movement, children or vulnerable groups, sensitive data, profiling, precise location, biometrics, financial/health data, and consequential automation as elevated review dimensions. Do not assume one jurisdiction's rule applies globally.
9. Make privacy controls production-shaped on first build: data catalog hooks, policy versions, consent/preference ledger, processor registry, enforcement adapters, deletion dependencies, drift detection, audit events, incident routing, and safe defaults. Human staffing or speculative ROI is not a reason to defer an applicable reversible control.
10. Gate exposure by current authority, age/territory eligibility, consent or other validated basis, dependency health, and proof. Automation may operate inside declared bounds; it may not invent authority or silently broaden purpose.
11. For every material change, compare old and new purpose, data, audience, vendor, region, model, retention, notice, and user expectation. Define re-notice, renewed choice, migration, suppression, rollback, and deletion/backfill effects before exposure.
12. Use proportional risk-return analysis only above hard legal, contractual, platform, rights, safety, and trust floors. Revenue or growth never cancels a floor or turns hidden collection into an acceptable experiment.

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

Turn the contract into typed handoffs for product, interface, analytics, security, data rights, vendor management, support, and delivery. Define drift checks, sampling, request/complaint signals, processor changes, retention jobs, incident triggers, periodic review, and automatic safe fallback.

## Hard gates

Reject or redesign an output that:

- lacks a field-level purpose, lifecycle, processor, and owner map;
- treats a privacy policy, checkbox, cookie banner, or SDK setting as proof of enforcement;
- bundles unrelated purposes, uses preselected or obstructive choices, or makes withdrawal harder than the original action;
- uses consent or another authority without current jurisdiction and context validation;
- forgets derived stores, exports, logs, backups, support data, subprocessors, or model/analytics datasets;
- retains data indefinitely, promises impossible physical deletion, or hides lawful/security exceptions;
- exposes sensitive, child, profiling, or consequential processing before elevated review and exact controls;
- defers scale, localization, accessibility, vendor controls, suppression, drift detection, or deletion dependencies to a later manual phase;
- claims compliance, legal basis, user understanding, or runtime enforcement from prose, configuration intent, or invented evidence.

## Output contract

Produce one **Privacy Data Lifecycle Contract** containing:

1. artifact ID, scope, evidence labels, decision requested, people/purposes, jurisdictions/age modes, published promises, and unresolved authority;
2. purpose register and field-level data map with sources, derivations, processors, destinations, access, sensitivity, retention, terminal action, and owners;
3. minimization decisions and alternatives rejected;
4. notice, choice/authority, permission, preference, withdrawal, propagation, and proof state machines;
5. retention, hold, deletion/anonymization, backup, and data-rights handoff matrix;
6. elevated-risk assessment, mitigations, residual-risk owner, exposure ceiling, and recovery;
7. material-change diff and migration/re-notice/re-choice/rollback plan;
8. typed specialist handoffs, implementation acceptance tests, telemetry, drift controls, incidents, review cadence, and current-authority register.

The contract is complete when every material data use is necessary or explicitly rejected, enforceable across every destination, time-bounded, inspectable, change-safe, and linked to the owner that can prove it.
