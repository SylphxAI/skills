---
name: operate-customer-support
description: "Operate customer support: triage, resolution, escalation, quality loops."
---

# Operate Customer Support

Produce one **Support Operating Model** that resolves customer jobs, preserves trust, and turns recurring failure into owned product improvement.


## When to use
- Support operations need triage, resolution, escalation, and quality-loop design or review
- Recurring customer failure should feed owned product improvement
- One customer case: `references/resolve-one-case/`. Payment and refund policy: `build-payment-readiness`.

## Atomic boundary

Own support channels, self-service, taxonomy, ticket state, routing, evidence intake, decision rights, response policy, service objectives, automation, quality, escalation, knowledge, metrics, and product-feedback closure.

Payment truth, refund policy, roadmap priority, incident command, data recovery, marketplace payouts, and public-review solicitation live with those owners. This skill consumes their artifacts and routes to them.

## Agent-first invariant

Build the complete declared support plane for actual contact reasons, risk,
locales, service promises, and expected operating envelope. Use agents to avoid
manual-first design, but do not create unused queues, integrations, or recurring
operations merely because generation is cheap. Low volume may change topology;
it does not justify unversioned answers, unsafe protected actions, missing case
state, or an unowned manual gap.

Routine operation is autonomous. A support agent may retrieve, classify, explain, collect bounded evidence, execute pre-authorized reversible actions, update status, and verify resolution. Money, durable entitlement, identity recovery, deletion, enforcement, safety, legal commitments, and destructive recovery remain with their owning authority and audit trail.

## Composition contract

Write the operating model in markdown. Name owners and sources in prose. Do not add a parallel JSON envelope. Consume product/version, identity, payment, refund, entitlement, sync/backup, incident, safety, review/feedback, analytics, and policy artifacts without copying their canonical facts.

## Workflow

1. Read `references/support-ops-patterns.md`. Define products, audiences, locales, accessibility and age modes, support channels, operating hours, expected volume, high-risk boundaries, service objectives, and non-goals.
2. Build a reason-code taxonomy and routing table. For every route specify required evidence, authority, queue, priority/severity, timer, stop condition, customer promise, escalation packet, and fallback.
3. Model the case lifecycle from intake through identity/consent, classification, evidence, assignment, waiting dependencies, mitigation/correction, verification, resolution, reopen, appeal, feedback linkage, and closure. Every waiting state has an owner and next-check time.
4. Design self-service and assisted support together: verified knowledge, search, guided actions, diagnostics preview/consent, zero-result recovery, seamless context-preserving handoff, and a visible escape from automation.
5. Define decision rights. Bind every macro/answer/action to current source IDs and product/policy versions. Specify safe autonomous actions, protected actions, abstention, approval/authority handoff, idempotency, compensation, appeal, and audit.
6. Build specialist handoffs for payment/refund, identity/security, data/sync, safety/abuse, incident, marketplace, accessibility, legal/policy, and product defects. A ticket comment never becomes the authoritative money, access, incident, or enforcement record.
7. Define quality and learning: stratified QA/replay, hallucination and policy-drift tests, routing confusion matrix, resolution verification, reopen analysis, tail latency, complaint/trust countermetrics, source freshness, and false-positive correction.
8. Close `signal -> cluster -> owner -> reproduce -> candidate -> validate -> ship -> observe the shipped path -> customer_update`. Closure is a verified resolution.

## Source verification

Retrieve current product/version behavior, support entitlement, identity and privacy rules, provider/store support routes, refund and chargeback authority, child/accessibility requirements, incident status, safety policy, retention, and regional communication requirements at use. Every answer source has owner, scope, version, last verification, expiry, and fallback.

## Holds when

- Resolution, reopen, refund, complaint, accessibility, safety, and trust stay level or improve while handle time and deflection move.
- Users can leave automation. Escalation is visible. Destructive steps and secrets stay with the owning authority.
- Provider truth, refund eligibility, entitlement, incident status, enforcement, and legal promises come from their owners.
- Macros bind to product, version, provider, locale, severity, and account state.
- Resolved means the customer-visible or owning authority verified the outcome.
- Every waiting state has an owner, timer, and next update. High-risk actions have audit and appeal. Stale knowledge withdraws itself.
- Specialist facts stay with specialists. Drafts carry no digest. Routine triage, QA, escalation, knowledge refresh, and feedback closure run without a standing manual gap.

## Output contract

Return one Support Operating Model containing:

1. draft identity or sealed reference, scope, assumptions, audiences, channels, service objectives, ruin boundaries, and non-goals;
2. issue/reason taxonomy, severity model, routing and decision-rights matrix;
3. complete case, waiting, escalation, appeal, reopen, and close-loop state machines;
4. self-service/search/knowledge, diagnostics, consent, accessibility/localization, and context-preserving handoff contract;
5. grounded response and autonomous-action policy with source freshness, abstention, protected actions, idempotency, compensation, and audit;
6. specialist, engineering, safety, incident, and product-feedback handoff packets with acceptance tests;
7. service, resolution, tail-latency, trust, quality, automation, cost, and product-defect metrics with machine actions;
8. QA sampling/replay, adversarial fixtures, canary, rollback/disable, observed-state readback, and continuous-improvement loop.

## Routing boundaries

- `references/resolve-one-case/` owns one specific customer's evidence, response, remedy recommendation, protected-action handoff, verification, appeal/reopen, and closure record; this skill owns the whole support system around it.
- `../review-domain/references/refund-and-support-flow/` owns refund, repayment, entitlement consequence, restriction, appeal, and repurchase policy.
- `../build-payment-readiness/` owns provider ingestion, money ledger, entitlement projection, settlement, and reconciliation truth.
- `../run-product-feedback-loop/references/review-solicitation-policy/` owns platform-specific public review request eligibility and state.
- `run-product-feedback-loop` owns private feedback, authorized review ingestion and responses, evidence clusters, and product learning; support consumes routed cases.
- App/Game Design owns product behavior; `../review-domain/references/product-analytics-instrumentation/` owns event/identity implementation; incident and safety owners retain their authority.

## Completion check

Complete only when every material contact reason has a trustworthy source, evidence contract, route, authority, timer, response, safe action or handoff, verification, appeal/reopen behavior, metric, and product-feedback owner—and the whole system can degrade, stop, recover, and update customers without a routine manual operating gap.

## Single-case depth

For closing **one** support case with authority and proof, open
[references/resolve-one-case/METHOD.md](references/resolve-one-case/METHOD.md).
The listing skill remains **operate support** as the user job.

## Progressive disclosure

- [references/resolve-one-case/](references/resolve-one-case/) — single case depth
- [references/support-ops-patterns.md](references/support-ops-patterns.md)
- Related job: `run-product-feedback-loop`
