---
name: continuous-product-quality
description: "Design or audit a durable cross-domain product-quality operating loop and produce a Product Quality Loop Contract covering quality surfaces and objectives, scout triggers, evidence-bearing observations, finding admission and deduplication, bounded Work handoff, delivery readback, coverage freshness, value/risk/WIP budgets, and idle/wake conditions. Use when a product should autonomously discover and close recurring defects or improvement opportunities across correctness, UI/UX, accessibility, SEO/discovery, performance, reliability, security/privacy, content, or live behavior. Do not use for one known bug, one release review, customer-feedback intake alone, service observability alone, agent-system learning, or generic Work scheduling."
---

# Continuous Product Quality

Produce one **Product Quality Loop Contract** that turns cross-domain product
signals into qualified, bounded, verifiably delivered improvements without an
immortal session, an unbounded backlog, or a universal CI gate.

Read
[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
before selecting dimensions, signals, admission policy, or stop conditions.

## Method

1. Resolve the exact product, current release, user journeys, capabilities,
   surfaces, owners, delivery boundary, hard floors, objectives, and excluded
   scope. Keep the versioned quality contract with the product source.
2. Build a surface-by-dimension matrix. Select only applicable dimensions, and
   give every selected cell a promise, oracle, freshness rule, evidence owner,
   and hard-floor or improvement-objective classification.
3. Define change-triggered, event-triggered, and scheduled scouts. A scout
   emits immutable observations; it does not silently create source changes or
   treat every warning as Work.
4. Normalize observations into findings with exact subject identity,
   consequence, reproduction or measurement, confidence, deduplication key,
   violated promise or opportunity, and a replayable acceptance oracle.
5. Admit a finding as Work only when it is novel, material, actionable, owned,
   and positive-net after agent-native lifecycle cost, risk, delay, and current
   integration capacity. Hard-floor violations bypass ordinary opportunity
   ranking but not authority or safe-effect boundaries.
6. Create narrowly worded Work in the real domain so native Skill discovery
   loads the relevant specialist. Do not inject the entire Skill catalog or
   maintain a parallel keyword router or Skill dependency graph.
7. Execute through the durable Work loop and the repository's delivery path.
   Re-run the original oracle against the exact delivered subject at the
   contract cell's declared source, Candidate, artifact, or live layer; task
   completion, CI success, deployment, and product outcome remain separate
   claims.
8. Update rebuildable quality coverage. Close the finding only on decisive
   readback; otherwise create or re-enter correction Work. Park the loop when
   no eligible positive-net work remains, and wake it only from a declared
   signal or freshness trigger.

## Authority and composition

- The product repository owns its versioned Quality Contract, code, tests,
  design decisions, and declared delivery path.
- Enact, when available, owns live observations, findings, Work, claims, Runs,
  checkpoints, subscriptions, and relations. A session is a disposable worker.
- The delivery platform owns candidate admission, artifacts, deployment,
  rollback, and live-delivery evidence. Quality coordination must not recreate
  those mechanisms.
- `self-feeding-agent-loop-standard` owns recurring Work selection and durable
  re-entry. This Skill owns what constitutes a product-quality signal, finding,
  admission decision, coverage state, and outcome readback.
- Specialist Skills own their domain methods. Examples include interface,
  accessibility, performance, observability, security/privacy, feedback,
  architecture, and release review.
- `agent-system-improvement` applies only when repeated evidence identifies a
  causal defect in prompts, Skills, context, tools, evaluators, or agent
  workflow rather than the product itself.

## Guardrails

- Do not represent quality as one global score or green light that can hide a
  failed hard floor. Preserve the surface-by-dimension matrix and residuals.
- Keep deterministic candidate-blocking checks small and relevant. Run broad,
  expensive, subjective, or exploratory scouts asynchronously unless their
  failure is a declared admission invariant.
- Do not create vague Work such as “make the website perfect.” Group one owning
  cause and split unrelated outcomes.
- Do not let findings grow source WIP beyond review, CI, deployment, or
  integration capacity. Fix the bottleneck before increasing parallelism.
- Do not equate continuous operation with an agent process that never exits.
  Use bounded ticks, durable state, event re-entry, and explicit budgets.
- Do not expose protected telemetry, internal topology, private reasoning,
  customer data, or control state through public quality readbacks.
- Do not change product direction, pricing, legal policy, public contracts,
  customer data, infrastructure, credentials, or irreversible effects without
  the owning authority.

## Output

Return one Product Quality Loop Contract containing:

- exact product/release scope, surfaces, journeys, owners, and non-goals;
- quality matrix with promises, floors/objectives, oracles, and freshness;
- signal sources, scout triggers, budgets, and protected evidence handling;
- observation, finding, deduplication, disposition, and coverage semantics;
- admission, expected-value, risk, WIP, and authority policy;
- Finding-to-Work mapping and specialist handoff contract;
- exact declared-subject readback, correction, idle, and wake transitions; and
- loop health metrics, blind spots, retained residuals, and recovery.

Complete the design only when every applicable selected quality cell has a
usable oracle, every non-applicable cell has a semantic reason, every admitted
finding has one bounded Work path and outcome readback, and the loop can become
idle without losing durable state. Retained uncertainty is a `residual` finding
or coverage state, not a replacement for the cell oracle.
