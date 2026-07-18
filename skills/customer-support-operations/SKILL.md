---
name: customer-support-operations
description: Design or audit one end-to-end customer-support operating system across self-service, intake, identity-safe diagnostics, taxonomy, queues, severity, routing, SLAs, grounded responses, autonomous resolution, specialist and incident handoffs, quality calibration, appeals, trust recovery, knowledge freshness, product feedback, metrics, and continuous improvement. Use when the whole support model is the independent artifact; use Refund And Support for one refund consequence state machine and do not invoke for one reply or a fixed QA rubric.
---

# Customer Support Operations

Produce one **Support Operating Model** that resolves customer jobs, preserves trust, and turns recurring failure into owned product improvement.

## Atomic boundary

Own support channels, self-service, taxonomy, ticket state, routing, evidence intake, decision rights, response policy, service objectives, automation, quality, escalation, knowledge, metrics, and product-feedback closure.

Do not own provider payment truth, refund/account consequence policy, product roadmap priority, security or incident command, data-recovery protocol, marketplace payouts, or public-review solicitation. Consume those artifacts and route to their owners.

## Agent-first invariant

Build the complete declared support plane for actual contact reasons, risk,
locales, service promises, and expected operating envelope. Use agents to avoid
manual-first design, but do not create unused queues, integrations, or recurring
operations merely because generation is cheap. Low volume may change topology;
it does not justify unversioned answers, unsafe protected actions, missing case
state, or an unowned manual gap.

Routine operation is autonomous. A support agent may retrieve, classify, explain, collect bounded evidence, execute pre-authorized reversible actions, update status, and verify resolution. Money, durable entitlement, identity recovery, deletion, enforcement, safety, legal commitments, and destructive recovery remain with their owning authority and audit trail.

## Composition contract

Use the shared envelope vocabulary: top-level artifacts carry `artifactVersion`, `artifactRevision`, and `artifactState` and never `artifactDigest`. Draft input references contain no digest; already sealed input references additionally require `artifactDigest` and `digestRule: sha256-exact-bytes`. Never invent either field. The Support Operating Model consumes product/version, identity, payment, refund, entitlement, sync/backup, incident, safety, review/feedback, analytics, and policy artifacts without copying their canonical facts. The downstream Product Program Manifest indexes the support artifact.

## Workflow

1. Read `references/support-ops-patterns.md`. Define products, audiences, locales, accessibility and age modes, support channels, operating hours, expected volume, high-risk boundaries, service objectives, and non-goals.
2. Build a reason-code taxonomy and routing table. For every route specify required evidence, authority, queue, priority/severity, timer, stop condition, customer promise, escalation packet, and fallback.
3. Model the case lifecycle from intake through identity/consent, classification, evidence, assignment, waiting dependencies, mitigation/correction, verification, resolution, reopen, appeal, feedback linkage, and closure. Every waiting state has an owner and next-check time.
4. Design self-service and assisted support together: verified knowledge, search, guided actions, diagnostics preview/consent, zero-result recovery, seamless context-preserving handoff, and a visible escape from automation.
5. Define decision rights. Bind every macro/answer/action to current source IDs and product/policy versions. Specify safe autonomous actions, protected actions, abstention, approval/authority handoff, idempotency, compensation, appeal, and audit.
6. Build specialist handoffs for payment/refund, identity/security, data/sync, safety/abuse, incident, marketplace, accessibility, legal/policy, and product defects. A ticket comment never becomes the authoritative money, access, incident, or enforcement record.
7. Define quality and learning: stratified QA/replay, hallucination and policy-drift tests, routing confusion matrix, resolution verification, reopen analysis, tail latency, complaint/trust countermetrics, source freshness, and false-positive correction.
8. Close `signal -> cluster -> owner -> reproduce -> candidate -> validate -> ship -> live_readback -> customer_update`. Do not call contact deflection or ticket closure success without verified resolution.

## Source verification

Retrieve current product/version behavior, support entitlement, identity and privacy rules, provider/store support routes, refund and chargeback authority, child/accessibility requirements, incident status, safety policy, retention, and regional communication requirements at use. Every answer source has owner, scope, version, last verification, expiry, and fallback.

## Hard gates

Reject or redesign a system that:

- optimizes ticket avoidance, handle time, containment, or CSAT while resolution, reopen, churn/refund, complaint, accessibility, safety, or trust worsens;
- traps users in automation, hides escalation, repeatedly requests destructive steps, or asks for passwords, secrets, full payment data, or unnecessary personal information;
- lets a model invent provider truth, refund eligibility, entitlement, incident status, enforcement, product commitments, or legal promises;
- uses generic macros across incompatible products, versions, providers, locales, severities, or account states;
- marks resolved from a sent reply or internal mutation without customer-visible or authoritative verification;
- has waiting states without owner/timer/update, high-risk actions without audit/appeal, or stale knowledge without automatic withdrawal;
- copies specialist facts into support, invents digests for drafts, or leaves routine triage, QA, escalation, knowledge refresh, and feedback closure manual.

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

- `customer-support-case-resolution` owns one specific customer's evidence, response, remedy recommendation, protected-action handoff, verification, appeal/reopen, and closure record; this skill owns the whole support system around it.
- `refund-and-support-flow-review` owns refund, repayment, entitlement consequence, restriction, appeal, and repurchase policy.
- `payment-platform-readiness` owns provider ingestion, money ledger, entitlement projection, settlement, and reconciliation truth.
- `review-solicitation-policy` owns platform-specific public review request eligibility and state.
- `product-feedback-learning-loop` owns private feedback, authorized review ingestion and responses, evidence clusters, and product learning; support consumes routed cases.
- App/Game Design owns product behavior; `product-analytics-instrumentation-review` owns event/identity implementation; incident and safety owners retain their authority.

## Completion check

Complete only when every material contact reason has a trustworthy source, evidence contract, route, authority, timer, response, safe action or handoff, verification, appeal/reopen behavior, metric, and product-feedback owner—and the whole system can degrade, stop, recover, and update customers without a routine manual operating gap.
