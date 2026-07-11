---
name: launch-readiness-review
description: Produce or audit one cross-domain launch admission verdict for an app, game, SaaS, desktop product, developer tool, marketplace, major release, beta, or campaign. Integrate exact product, quality, performance, security/privacy, payments, distribution, analytics, support, marketing, legal/authority, rollback, and post-launch evidence into go, conditional-go, hold, or no-go gates. Use when launch-day decision ownership is the artifact; use specialist skills to create missing domain evidence.
---

# Launch Readiness Review

Produce a **Launch Admission Record** that makes a release decision from exact
artifacts and machine-verifiable gates rather than a ceremonial checklist.

## Atomic boundary

Own the final cross-domain evidence graph, blocker classification, decision,
conditions, launch watch, authority, and recovery drill. Consume sibling facts
by ID/version/digest; do not recreate product design, store submission, payment,
marketing, security, or support artifacts.

Use the [shared product artifact envelope](references/product-artifact-envelope.schema.json).
Missing evidence becomes a typed handoff/blocker, never an invented pass.

## Agent-first invariant

Launch admission does not decide which production capabilities were worth
building. The complete declared target and automated operating plane should
already exist. Decide exposure of the exact candidate using current proof,
bounded canaries, and recovery. Do not defer scale, localization, accessibility,
low-end, support, observability, migrations, or rollback to “after launch.”

## Workflow

1. Identify exact commit/build/content/config/model/policy/migration digests,
   launch type, audiences/age modes, channels/territories, blast radius,
   decision owner, change window, and irreversible harm boundaries.
2. Read `references/launch-readiness-patterns.md`. Build a dependency DAG of
   required design, implementation, scale, security/privacy, accessibility,
   localization, performance, data/migration, payment/refund, distribution,
   analytics, support/incident, marketing, authority, and recovery evidence.
3. Classify each gate `pass`, `watch`, `blocked`, or `not-applicable-with-proof`.
   Separate construction, proof, exposure, and external authority. Do not turn
   an unknown into N/A.
4. Verify exact-candidate artifacts, provenance/signatures where applicable,
   canary/staged rollout, data/backward compatibility, migrations/replay,
   feature/config kill switches, rollback/forward-fix, derived-state/cache
   recovery, and restoration drills.
5. Define launch room automation: telemetry/SLOs, business/trust countermetrics,
   support/safety routing, alert ownership, decision leases, spend/exposure caps,
   pause/withdraw, communications, and live readback.
6. Issue `go`, `conditional-go`, `hold`, or `no-go`. Conditions are executable
   gates with owner, deadline, exact evidence, and automatic consequence—not a
   promise to fix later.

## Source verification

Retrieve current platform/store, privacy/consent, accessibility, security,
payment/refund, advertising/promotion, child/age, legal/regulated-category,
regional, certification, and partner authority. External approval remains an
explicit floor and may not be self-attested.

## When not to use

- Use `product-lifecycle-architect` to build the multi-domain program graph and
  produce the sibling artifacts, not merely decide one launch candidate.
- Use `app-store-distribution-readiness` for channel submission, reviewer,
  certification, rollout, and live-store evidence.
- Use `game-soft-launch-review` for a multi-cohort game learning/exposure
  program rather than final cross-domain admission.
- Use a domain specialist when only one missing artifact is being designed or
  audited and the overall launch decision is not reopened.

## Guardrails

- Marketing readiness never substitutes for product, authority, support,
  payment, migration, security, or recovery readiness.
- Do not call an open high-impact item “post-launch” without a bounded exposure,
  explicit risk acceptance authority, expiry, countermetric, and automatic stop.
- No launch of paid, personal-data, child, destructive, migration, or
  irreversible flows without authoritative state, support, compensation, and
  recovery.
- A green workflow exit is not live proof. Verify deployed/released identity and
  user-visible or telemetry readback.
- Do not let the launch optimizer change its own gates, spend caps, rollback,
  consent, entitlements, or evidence thresholds.

## Output contract

Return one typed Launch Admission Record with:

1. exact candidate/authority identities, scope, audiences/channels, decision
   owner, change window, and ruin boundaries;
2. dependency/evidence graph and pass/watch/blocked/N-A gate matrix;
3. blocker records with owner, exact proof, deadline, and automatic consequence;
4. canary/staged exposure, migration, rollback/forward-fix, cache/derived-state,
   and restoration drill evidence;
5. launch-room telemetry, business/trust/support/safety watch, leases, caps,
   pause/withdraw, and communication plan;
6. `go | conditional-go | hold | no-go` verdict with machine-readable reasons;
7. post-release live-readback and closeout evidence.

Complete only when the exact candidate—not a nearby build—can be admitted,
halted, recovered, and observed without a manual judgment gap.
