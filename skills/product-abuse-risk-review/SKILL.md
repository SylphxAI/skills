---
name: product-abuse-risk-review
description: "Design or audit a product-level abuse and fraud control system across identities, automation, promotions, referrals, trials, credits, purchases, refunds, content, inventory, scraping, collusion, account farming, evasion, and support exploitation. Use when the primary artifact is an adaptive abuse threat, decision, control, appeal, economics, and evidence contract spanning a product surface. Use account-recovery-review for legitimate recovery, developer-quota-credit-abuse-review for developer quota and credit policy, marketplace-trust-operations-review for marketplace participant policy/enforcement, and payment-platform-readiness for payment and ledger correctness."
---

# Product Abuse Risk Review

Produce one **Product Abuse Control Contract** that makes abusive value extraction harder without making legitimate users prove innocence at every step. Treat abuse as an adaptive incentive and systems problem, not a static blocklist.

## Atomic boundary

Own the product-wide abuse model, protected resources, actor/action graph, loss and user-harm model, signals, decision tiers, friction/control ladder, enforcement/recovery, appeals, false-positive controls, adversarial evaluation, operating economics, and learning loop. Consume identity, payment, refund, support, marketplace, developer quota, privacy, security, and incident artifacts from their owners; do not duplicate them.

## When not to use

- Use `account-recovery-review`, `marketplace-trust-operations-review`, or `payment-platform-readiness` when the primary artifact is rightful access recovery, marketplace participant enforcement, or payment/ledger correctness.
- Use the developer quota/credit specialist or Doctrine frontier/security procedures when the primary artifact is developer resource policy, AI red-team evaluation, DDoS/security engineering, or an incident response implementation.

## Resource routing

- Read `references/abuse-model-and-control-ladder.md` for every task.
- Read `references/decision-evidence-and-adaptive-operations.md` when scoring/rules, automation, appeals, experimentation, economics, monitoring, or adversarial adaptation matter.

## Source verification

Retrieve current platform, payment/provider, consumer-protection, privacy, identity, content, store, and contractual authority at execution where they constrain a control. Never present an old threshold, provider signal, or legal rule as current fact.

## Operating rules

1. Label facts `given`, `observed`, `inferred`, `hypothesis`, `decision`, or `authority-pending`. Separate suspected behavior, established event, model/rule output, operator decision, and final outcome.
2. Define the legitimate value exchange first: actors, resources, actions, limits, promises, reversibility, and expected edge cases. A control that blocks intended high-value use is a product defect even if loss falls.
3. Model abuse by incentive and path: acquire or synthesize identity, obtain access, perform action, extract value, transfer/launder benefit, evade linkage, repeat. Include solo, coordinated, automated, insider/support-assisted, and compromised-account paths without publishing an exploitation recipe.
4. Build a protected-resource ledger for money/credits, inventory, compute, attention, ranking, reputation, access, data, support labor, community safety, and trust. Quantify direct loss, downstream cost, opportunity cost, user harm, false-positive harm, and recovery cost; preserve uncertainty and tail risk.
5. Use signals with provenance, availability time, quality, privacy purpose, spoofability, population bias, expiry, and failure behavior. Do not use sensitive or proxy attributes merely because they correlate, and do not leak detection logic in user messages.
6. Separate eligibility, risk assessment, decision, friction, fulfillment, settlement, enforcement, appeal, and reinstatement. A single opaque score must not become unrestricted authority over all actions.
7. Prefer the least harmful effective control: education/clarity, velocity or resource shaping, proof of possession, step-up verification, delayed settlement, scoped hold, reduced privilege, challenge, manual/specialist review, suspension, then termination. Match scope and duration to the threatened resource.
8. Define fail-open, fail-closed, degrade, queue, or cap behavior per action and dependency. Missing signals or provider outage must not silently become universal approval, universal lockout, or irreversible punishment.
9. Make legitimate recovery first-class: reason category, safe explanation, evidence review, accessible/multilingual appeal, SLA class, independent authority for severe actions, restoration, compensation/correction, and protection from retaliation. Track false positives by cohort and impact, not appeal win rate alone.
10. Build complete scale-ready controls now: versioned policies/rules/models, real-time and batch paths, idempotent actions, ledgers, audit events, privacy/access boundaries, simulator/replay, shadow mode, canary, caps, kill switches, drift/adversary monitoring, incident routing, and rollback/reinstatement. Human-cost or absent abuse is not a reason for manual-first design.
11. Validate offline and online with known cases, synthetic variants, red-team scenarios, replay, shadow decisions, canaries, counterfactual samples, delayed outcomes, and holdouts where safe. Never train and evaluate on the same adjudication feedback without leakage controls.
12. Optimize expected protected value subject to hard legal, rights, safety, privacy, platform, accessibility, and trust floors. A high loss estimate does not justify collective punishment, secret confiscation, inaccessible appeal, indefinite hold, or targeting vulnerable groups.

## Workflow

### 1. Frame value and ruin boundaries

Define product surface, legitimate actors and edge cases, protected resources, value flows, exposure, current incidents/evidence, hard floors, decision authority, and the exact action or launch being reviewed. Record acceptable friction and unacceptable customer harm.

### 2. Build abuse and loss models

Map actors, identities/accounts/devices/payment instruments, actions, resources, transfer paths, coordination, automation, evasion, repeat loops, and upstream/downstream dependencies. Rank scenarios by evidence-bounded likelihood, impact, speed, detectability, reversibility, and scale.

### 3. Design decisions and controls

Create signal contracts, eligibility, risk tiers, decision table, control ladder, settlement/hold logic, enforcement scope, fail behavior, customer messaging, appeal/reinstatement, and typed handoffs. Protect one resource without silently damaging unrelated earned or purchased value.

### 4. Validate adversarially and economically

Test bypass, spoofing, linkage error, cold-start, compromised accounts, coordinated rings, support abuse, provider outage, data drift, accessibility, and cohort fairness. Model prevented loss, control cost, conversion/value harm, support load, false positives, delayed settlement, and attacker adaptation with confidence bands.

### 5. Operate and evolve

Define shadow/canary/exposure, alerts, caps, halt/degrade, incident loop, evidence retention, sampled review, appeals feedback, drift, policy/model change approval, adversarial refresh, compensation/correction, and rule/model retirement. Keep detection evidence separate from user-facing conclusions.

## Hard gates

Reject or redesign an output that:

- has no legitimate-user model, protected-resource ledger, abuse paths, loss model, or false-positive cost;
- calls correlation, a device fingerprint, payment decline, VPN, geography, rapid growth, or model score proof of abuse;
- uses one score for unrelated irreversible actions or hides decision authority and evidence freshness;
- confiscates unrelated value, indefinitely holds assets, traps accounts, or blocks appeal to improve economics;
- leaks sensitive detection rules, collects unbounded identity/device data, or uses protected/proxy attributes without validated necessity and authority;
- lacks idempotency, fail behavior, shadow/canary, caps, kill switch, audit, recovery, reinstatement, or incident routing;
- optimizes gross prevented loss while ignoring conversion, customer value, support cost, false positives, cohort harm, and attacker displacement;
- claims fraud prevention, fairness, scale, or causality from invented labels, selected cases, static prose, or unobserved production behavior.

## Output contract

Produce one **Product Abuse Control Contract** containing:

1. artifact ID, scope, evidence labels, legitimate value exchange, actors, protected resources, hard floors, authorities, acceptable friction, and ruin boundaries;
2. actor/identity/action/resource/value-transfer graph and ranked abuse scenarios with uncertainty;
3. direct/downstream/user/false-positive/recovery loss model and economics;
4. signal inventory with provenance, availability, quality, privacy, spoofability, bias, expiry, and outage behavior;
5. eligibility, risk, decision, control, hold/settlement, enforcement, messaging, appeal, reinstatement, and compensation state machines;
6. decision/control ladder with scope, duration, evidence, authority, fail mode, recovery, and customer impact;
7. adversarial, replay, shadow, canary, cohort, fairness, accessibility, and causal validation plan;
8. scale automation, audit, monitoring, caps, kill switches, incidents, drift/adaptation, current-authority refresh, and typed specialist handoffs.

The contract is complete when every severe action has proportionate evidence and authority, every legitimate user has a safe recovery path, and every claim can be tested without teaching an attacker how to bypass it.
