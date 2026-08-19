---
name: model-product-abuse-risk
description: "Model product abuse and a least-harm control ladder. Use when attackers, fraud, or policy evasion can take money, access, or other users' work."
---

# Model Product Abuse Risk

Produce one **Product Abuse Control Contract** that makes abusive value extraction harder without making legitimate users prove innocence at every step. Treat abuse as an adaptive incentive and systems problem, not a static blocklist.

## Scope

Own the product-wide abuse model, protected resources, actor/action graph, loss
and user-harm model, signals, decision tiers, friction/control ladder,
enforcement/recovery, appeals, false-positive controls, adversarial evaluation,
operating economics, and learning loop. Consume identity, payment, refund,
support, marketplace, developer quota, privacy, security, and incident artifacts
through stable references to their owners.

## References

- Read [abuse model and control ladder](references/abuse-model-and-control-ladder.md) when actors, assets, attack paths, controls, recovery, or economics matter.
- Read [decision evidence and adaptive operations](references/decision-evidence-and-adaptive-operations.md) when scoring, automation, appeals, experimentation, economics, monitoring, or adversarial adaptation matter.

## Current sources

Retrieve current platform, payment/provider, consumer-protection, privacy,
identity, content, store, and contractual authority at execution where they
constrain a control. Current facts require current thresholds, provider signals,
and legal authority.

## Domain principles

1. Separate user-provided facts and observed behavior from inferences,
   hypotheses, pending owner decisions, and final outcomes. Keep suspected
   behavior, established events, model or rule output, and operator decisions
   distinct.
2. Define the legitimate value exchange first: actors, resources, actions, limits, promises, reversibility, and expected edge cases. A control that blocks intended high-value use is a product defect even if loss falls.
3. Model abuse by incentive and path: acquire or synthesize identity, obtain access, perform action, extract value, transfer/launder benefit, evade linkage, repeat. Include solo, coordinated, automated, insider/support-assisted, and compromised-account paths without publishing an exploitation recipe.
4. Build a protected-resource inventory for money or credits, inventory,
   compute, attention, ranking, reputation, access, data, support labor,
   community safety, and trust. Quantify direct loss, downstream cost,
   opportunity cost, user harm, false-positive harm, and recovery cost;
   preserve uncertainty and tail risk.
5. Use signals with provenance, availability time, quality, privacy purpose, spoofability, population bias, expiry, and failure behavior. Select attributes through authorized purpose and necessity, and keep detection logic in its protected owner rather than user messages.
6. Separate eligibility, risk assessment, decision, friction, fulfillment,
   settlement, enforcement, appeal, and reinstatement. Each action has scoped
   authority and explainable evidence beyond a single opaque score.
7. Prefer the least harmful effective control: education/clarity, velocity or resource shaping, proof of possession, step-up verification, delayed settlement, scoped hold, reduced privilege, challenge, manual/specialist review, suspension, then termination. Match scope and duration to the threatened resource.
8. Define fail-open, fail-closed, degrade, queue, or cap behavior per action and
   dependency. Missing signals and provider outages enter the declared bounded
   state for that action.
9. Make legitimate recovery first-class: reason category, safe explanation, evidence review, accessible/multilingual appeal, SLA class, independent authority for severe actions, restoration, compensation/correction, and protection from retaliation. Track false positives by cohort and impact, not appeal win rate alone.
10. Build each selected control to the complete target justified by the modeled
    resource, abuse path, exposure, reversibility, and operating envelope.
    Version decisions and preserve idempotency, audit, privacy, recovery, and
    safe disablement wherever applicable. Add real-time/batch dual paths,
    simulators, shadowing, canaries, drift monitoring, or dedicated incident
    machinery when they test or contain a material risk—not as a universal
    checklist. Historical human cost alone is not a reason for manual-first
    design; absent or immaterial abuse is not a reason to build unused control
    infrastructure.
11. Validate offline and online with known cases, synthetic variants, red-team
    scenarios, replay, shadow decisions, canaries, counterfactual samples,
    delayed outcomes, and holdouts where safe. Separate training and evaluation
    data through explicit adjudication-feedback leakage controls.
12. Optimize expected protected value subject to hard legal, rights, safety, privacy, platform, accessibility, and trust floors. A high loss estimate does not justify collective punishment, secret confiscation, inaccessible appeal, indefinite hold, or targeting vulnerable groups.

## Workflow

### 1. Frame value and ruin boundaries

Define product surface, legitimate actors and edge cases, protected resources, value flows, exposure, current incidents/evidence, hard floors, decision authority, and the exact action or launch being reviewed. Record acceptable friction and unacceptable customer harm.

### 2. Build abuse and loss models

Map actors, identities/accounts/devices/payment instruments, actions, resources, transfer paths, coordination, automation, evasion, repeat loops, and upstream/downstream dependencies. Rank scenarios by evidence-bounded likelihood, impact, speed, detectability, reversibility, and scale.

### 3. Design decisions and controls

Create signal contracts, eligibility, risk tiers, decision table, control ladder, settlement/hold logic, enforcement scope, fail behavior, customer messaging, appeal/reinstatement, and owner handoffs. Protect one resource without silently damaging unrelated earned or purchased value.

### 4. Validate adversarially and economically

Test bypass, spoofing, linkage error, cold-start, compromised accounts, coordinated rings, support abuse, provider outage, data drift, accessibility, and cohort fairness. Model prevented loss, control cost, conversion/value harm, support load, false positives, delayed settlement, and attacker adaptation with confidence bands.

### 5. Operate and evolve

Define shadow/canary/exposure, alerts, caps, halt/degrade, incident loop, evidence retention, sampled review, appeals feedback, drift, policy/model change approval, adversarial refresh, compensation/correction, and rule/model retirement. Keep detection evidence separate from user-facing conclusions.

## Complete when

Acceptance conditions:

- the model includes legitimate users, protected resources, abuse paths, loss,
  and false-positive cost;
- correlation, device, payment, network, geography, growth, and model signals are
  weighted as evidence with known uncertainty;
- each irreversible action has its own scoped decision authority and fresh evidence;
- controls preserve unrelated value, bound holds, provide account recovery, and support appeal;
- sensitive detection rules stay protected, identity/device collection is
  bounded, and protected or proxy attributes require validated necessity and authority;
- each control defines idempotency, failure behavior, bounds, audit, recovery,
  reinstatement, and incident routing appropriate to its risk;
- optimization covers prevented loss, conversion, customer value, support cost,
  false positives, cohort harm, and attacker displacement; and
- fraud prevention, fairness, scale, and causal claims use observed production
  evidence and labels with defined provenance.

## Output

Produce one **Product Abuse Control Contract** containing:

1. artifact name and revision, scope, evidence labels, legitimate value exchange, actors, protected resources, hard floors, authorities, acceptable friction, and ruin boundaries;
2. actor/identity/action/resource/value-transfer graph and ranked abuse scenarios with uncertainty;
3. direct/downstream/user/false-positive/recovery loss model and economics;
4. signal inventory with provenance, availability, quality, privacy, spoofability, bias, expiry, and outage behavior;
5. eligibility, risk, decision, control, hold, settlement, enforcement,
   messaging, appeal, reinstatement, and compensation lifecycles;
6. decision/control ladder with scope, duration, evidence, authority, fail mode, recovery, and customer impact;
7. adversarial, replay, shadow, canary, cohort, fairness, accessibility, and causal validation plan;
8. scale automation, audit, monitoring, caps, kill switches, incidents, drift/adaptation, source refresh, and specialist owner handoffs.

The contract is complete when every severe action has proportionate evidence and authority, every legitimate user has a safe recovery path, and every claim can be tested without teaching an attacker how to bypass it.
