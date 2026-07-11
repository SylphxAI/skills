---
name: review-solicitation-and-feedback-loop
description: "Design or audit the complete public review, rating, private feedback, support, telemetry, and product-learning loop for apps, games, web products, stores, and platforms. Use when deciding review eligibility/timing, native rating prompts, feedback intake, review ingestion/response, taxonomy, dedupe, privacy, support escalation, evidence linkage, close-the-loop communication, or autonomous product improvement. Do not use for platform submission/rejection readiness, one support reply, generic analytics instrumentation, or store-listing conversion alone."
---

# Review Solicitation And Feedback Loop

Design one truthful system in which authentic public reviews, private feedback, support, behavioral/quality evidence, and product improvement reinforce each other without filtering users, steering stars, rewarding ratings, or suppressing criticism.

## Atomic boundary

This skill owns one independently useful artifact: the **Review And Feedback Loop**, including platform-specific public solicitation policy, universal private feedback, review ingestion/response, feedback evidence processing, support/safety routing, and product close-loop.

It does not own platform app-review submission, store listing assets, generic event plumbing, whole-app/game design, one marketing campaign, or general support operations. It references those artifacts.

## Agent-first invariant

Build the full cross-platform review/feedback capability, ingestion adapters, taxonomy, privacy controls, evidence pipeline, support routing, product candidate loop, response automation, observability, and policy refresh now. Do not postpone automation or platform adapters because feedback volume is low.

Public solicitation is policy- and eligibility-controlled. A built adapter may be dormant or prohibited on a platform. Current policy, user agency, age, consent, accessibility, trust, cooldown, app state, and a neutral value event govern exposure. Review conversion does not override these floors.

Make prohibited manipulation unrepresentable: no sentiment gate, five-star steering, positive-user-only deep link, review/rating reward, fake review, review suppression, forced review, private-feedback detour imposed on unhappy users, or app-flow dependency on whether a native sheet appears.

## Composition contract

Begin with an envelope conforming to [`references/product-artifact-envelope.schema.json`](references/product-artifact-envelope.schema.json). Consume meaningful-value events and product/support/analytics contracts by ID/version/digest. Emit a platform review policy, private feedback contract, evidence clusters, product/support handoffs, and close-loop state without becoming the canonical product roadmap.

## Resource guide

- Read `references/review-platform-policy-and-state.md` for solicitation eligibility, Apple/Google/Steam differences, prompting, review ingestion, response, and prohibited patterns.
- Read `references/feedback-learning-loop.md` for feedback sources, taxonomy, privacy, evidence scoring, telemetry, support/safety routing, autonomous improvement, and close-loop behavior.

Read both for a complete loop.

## Independent state machines

Never merge these into one sentiment funnel:

```text
Public review eligibility:
ineligible -> neutral_value_event -> policy_eligible -> native_request_attempted
-> platform_may_show_or_suppress -> cooldown

Private feedback:
entry_available -> submitted -> classified -> deduplicated -> enriched
-> routed -> decision_linked -> user_updated -> archived

Support/safety:
issue_detected -> severity/urgency -> self_help | support_case | safety_escalation
-> resolved_or_appealed -> learning_linked

Product learning:
signal_cluster -> hypothesis -> candidate -> reproduce/validate
-> canary/holdout -> promote_or_rollback -> live_readback -> close_loop
```

Negative feedback may open support or safety escalation. It may not make an otherwise eligible user permanently unable to access the platform's authentic public review route.

## Operating rules

1. Identify platform/storefront, product type, audience/age modes, current review authority, meaningful-value events, support/safety needs, feedback sources, consent/privacy, and product decision owner.
2. Retrieve current platform policy/API behavior at execution. Record publisher, URL/section, effective/retrieval/expiry dates and digest. Do not infer Apple, Google, Steam, console, web, marketplace, or B2B review behavior from one another.
3. Define neutral eligibility from a completed meaningful-value event and stable product state—not inferred positivity, predicted stars, spend, subscription tier, vulnerability, child status, or absence of complaints.
4. Use only platform-sanctioned review surfaces and wording. Respect native quotas/cooldowns, “not now,” accessibility, locale, age/territory, foreground/state requirements, and the fact that the platform may show nothing.
5. Keep private feedback/help/support entry points continuously available and discoverable to everyone. Do not require a satisfaction question before public review or make feedback the negative branch of a rating funnel.
6. Never reward review, rating, star choice, review edit/removal, or positive sentiment with currency, discount, update gift, referral benefit, contest entry, access, progression, ad removal, or support priority.
7. Keep review state causally independent from refund, warranty, appeal, chargeback/dispute, entitlement, compensation, account restriction, and support eligibility/priority. Never condition money, access, remedy, data, or case outcome on a review action; never use a refund/compensation resolution as a disguised predicted-positive gate.
8. Ingest authorized public reviews and private signals with source, locale, version, platform, product area, privacy, identity confidence, and evidence lineage. Separate bugs, usability, capability, price, refund, quality, praise, abuse/safety, and research leads.
9. Dedupe by underlying problem, not wording. Enrich only with consented, necessary product/quality/commercial context. Redact secrets and sensitive personal data.
10. Do not make loudness, recency, star count, payer value, influencer status, or model confidence the sole priority. Link qualitative mechanisms to quantitative prevalence and operational severity.
11. Respond publicly only when verified clarification, recovery, acknowledgement, or support route is useful. Never argue, reveal personal information, ask for a higher rating, promise uncommitted work, or auto-reply to everything.
12. Close the loop truthfully: received, clarifying, investigating, fixed, shipped, not planned, policy-limited, support-resolved, or needs research. Do not claim a roadmap commitment from intake.
13. Automate normalization, clustering, candidate creation, reproduction, validation, canary, readback and status updates with separate proposer/validator/promoter/watchdog authority. Models may not rewrite platform policy, suppress criticism, or publish unsupported responses.

## Workflow

### 1. Establish authority and purpose

Record platform adapters, current policy, target audience, the purpose of public reviews versus private feedback, product value events, support/safety escalation, and success/countermetrics.

### 2. Define platform solicitation policy

For each platform decide whether in-product solicitation is allowed, which native API/surface is required, neutral eligibility, cooldown, suppression, age/territory/locale/accessibility, failure/no-display behavior, and evidence.

### 3. Design universal private feedback

Specify entry points, structured and free-text fields, attachments/diagnostics consent, anonymity/account link, contact permission, privacy redaction, offline/retry, acknowledgement, status and support handoff.

### 4. Build ingestion and evidence model

Normalize private feedback, store reviews, support, cancellation/refund reasons, surveys, community, product behavior, crash/performance, and experiments into source-preserving typed signals. Dedupe, enrich, cluster, quantify and preserve dissent.

### 5. Route support, safety, and product learning

Use severity/urgency and evidence, not sentiment, to route bugs/incidents, account/billing help, abuse/safety, policy/legal, usability, discovery, roadmap, documentation and praise. Define appeals and false-positive recovery.

### 6. Automate response and improvement

Generate source-grounded response candidates, product issues/hypotheses, instrumentation requests, support fixes and experiments. Independently validate, canary, read back, update the user when permitted, and learn.

## Hard gates

Reject or redesign a system that:

- asks “Do you like/love us?” then sends only yes-users to public rating/review;
- shows a five-star image, preselects/highlights five stars, predicts likely raters, filters by sentiment/spend, or suppresses dissatisfied users;
- rewards ratings/reviews or couples them to updates, referrals, currency, discounts, contests, access, progression, ad removal, or support;
- conditions a refund, warranty, appeal, chargeback/dispute, entitlement, compensation, account restriction, data access, or support eligibility/priority on posting, editing, deleting, or improving a review;
- uses a custom review prompt where the platform requires its native surface, asks inside a product where the platform forbids it, or claims current policy from memory;
- repeatedly nags, blocks navigation, interrupts payment/errors/safety, targets minors/vulnerable states, or depends on the prompt appearing;
- makes private feedback unavailable to satisfied users or mandatory for dissatisfied users before any public route;
- treats low stars as abuse, punishes reviewers, asks users to delete/edit criticism, or exposes personal/account data in public responses;
- auto-replies to every review, hallucinates fixes, argues, promises roadmap dates, or asks for a higher rating;
- lets anecdotes or star averages become the sole roadmap signal, or merges bugs, support, requests, price, praise and safety into one backlog;
- collects unnecessary diagnostics/PII without consent, fails to redact secrets, or joins feedback to sensitive data without purpose;
- allows one agent to classify, prioritize, approve, deploy and declare its own fix successful;
- measures only prompt conversion, review count or average rating without support, trust, complaint, prompt-fatigue, issue-resolution and product-outcome countermetrics.

## Output contract

Produce one **Review And Feedback Loop** containing:

1. artifact envelope, platforms/audiences, purpose, current authority records, evidence labels, success and guardrail metrics;
2. per-platform solicitation matrix with allowed surface, neutral value events, eligibility, cooldown, no-display/failure, age/territory/locale/accessibility, and proof;
3. separate public review, private feedback, support/safety, and product-learning state machines;
4. private feedback entry/field/privacy/diagnostic/contact/status contract;
5. source-preserving normalized signal schema, taxonomy, dedupe, enrichment, evidence scoring/clustering, and retention/access policy;
6. routing and severity table for incident, bug, support/billing/refund, safety/abuse, policy, usability, research, roadmap, docs and praise;
7. public review ingestion/response policy, source-grounded response templates, escalation, correction, and audit;
8. product candidate and close-loop workflow with independent agents, exact proof, canary/holdout, rollback and live readback;
9. event/metric/countermetric plan and platform/product/support handoffs;
10. dangerous tests, unresolved authority/measurement questions, and next proofs.

## Routing boundaries

- `review-solicitation-and-feedback-loop` owns customer public review plus private feedback/product-learning behavior.
- `app-store-distribution-readiness` owns platform submission/rejection risk, reviewer correspondence, appeal/resubmission evidence, and release readback; it does not own user rating prompts.
- Customer-rating/review replies remain here and never inherit submission-reviewer authority.
- `product-analytics-instrumentation-review` owns event/identity implementation; this skill declares decision and context needs.
- `customer-support-operations` owns whole support queues/SLAs/QA; `refund-and-support-flow-review` owns refund consequence/support state.
- `store-listing-optimization` owns listing conversion; `marketing-automation-blueprint` consumes reputation signals for multi-channel strategy.
- `app-design-blueprint`/`game-design-blueprint` own the in-product surface and meaningful-value semantics.

## Completion check

The loop is ready only when authentic public review eligibility is neutral and platform-specific, private feedback/help is universal, evidence preserves source/privacy/uncertainty, routing separates support/safety/product needs, responses cannot hallucinate or manipulate, and product improvement proceeds through independently validated candidates with live readback and truthful close-loop communication.
