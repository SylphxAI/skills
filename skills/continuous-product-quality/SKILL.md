---
name: continuous-product-quality
description: "Operate continuous product betterment loop engineering across any aspect (UI/UX, performance, business model, game design, art/3D, reliability, content, etc.): quality matrix, scout, admit, deliver, verify, then idle without claiming perfection. Not one bug, one finish pass, one release review, or vague unbounded 'make it perfect' work."
---

# Continuous Product Quality

Run **loop engineering for product betterment**: keep making a real product
better across any applicable aspect, without pretending a perfect end state
exists.

This is a **workflow Skill**. Agents may load it by native discovery; users may
trigger it explicitly. It composes **standards** (how execution, delivery, and
coordination must behave) and **specialist Skills** (how a domain improves).

Primary artifact: a versioned **Product Quality Loop Contract** plus the
operating loop that uses it.

Read before operating:

- [references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
  for contract structure, matrix, admission, idle/wake, and readback
- [references/multi-aspect-betterment-loop.md](references/multi-aspect-betterment-loop.md)
  for multi-aspect loop engineering, specialist composition, and
  standards-vs-workflow boundaries

## Non-negotiable loop laws

1. **No perfect terminal.** Absolute perfection is not falsifiable. Healthy
   loops reach **idle frontier** (floors fresh, no positive-net admitted work
   under budgets) and wake later on new evidence—not “done forever.”
2. **Matrix, not score.** Model `surface/capability × aspect`. Never hide a
   failed hard floor inside an average “quality score.”
3. **Evidence before claims.** Observations → findings → admitted Work →
   delivered subject → **original-oracle readback**. Local green, open PR, or
   deploy response is not product betterment proof.
4. **Bounded Work only.** One finding/opportunity → one independently terminal
   Work item with owner, non-goals, acceptance, and delivery terminal. Ban vague
   Work such as “make the app perfect.”
5. **Compose specialists; do not dump the catalog.** Word Work so native Skill
   discovery loads the right domain method. Do not invent a meta-router or paste
   every Skill into context.
6. **Bounded ticks.** Continuous betterment is durable state + re-entry, not an
   immortal chat session.

## Loop

```text
bind product + aspects in scope
  -> versioned Product Quality Loop Contract / matrix
  -> scout (change, event, schedule, owner request)
  -> immutable observations
  -> normalize + dedupe findings
  -> admit positive-net Work under authority + capacity
  -> execute via durable Work + repository delivery path
  -> re-run original oracle on exact delivered subject
  -> close, correct, or retain residual
  -> idle frontier when nothing positive-net remains
  -> wake on declared signal / freshness / objective change
```

## Method

1. **Bind the product.** Exact product/release, surfaces, journeys,
   capabilities, owners, delivery boundary, hard floors, improvement
   objectives, and explicit non-goals. Keep the versioned contract with product
   source authority.
2. **Select aspects.** Build the matrix only for applicable betterment aspects
   (examples: functional journeys, UI/UX, interaction craft, accessibility,
   performance, reliability, security/privacy, content/brand, SEO/discovery,
   architecture/maintainability, business model/pricing packaging,
   growth/retention loops, game design/economy/feel, art direction/3D/assets,
   support/ops quality, cost). Mark `not_applicable` with a semantic reason.
3. **Attach oracles.** Every applicable cell needs promise/objective, oracle,
   freshness, evidence owner, and hard-floor vs objective vs frontier class.
4. **Scout, do not thrash.** Change-triggered, event-triggered, and scheduled
   scouts emit immutable observations. Scouts do not silently mutate source or
   treat every warning as Work.
5. **Admit ruthlessly.** A finding becomes Work only when novel, material,
   actionable, owned, and positive-net after lifecycle cost, risk, delay, and
   integration capacity. Hard-floor violations outrank ordinary opportunity
   ranking but still obey authority and safe-effect boundaries.
6. **Hand off with native discovery.** Write Work in the real domain language so
   the host loads the specialist Skill (for example interface, performance,
   game economy, payments, security). Use standards for execution/delivery
   floors (`autonomous-execution-standard`, `delivery-standard`,
   `self-feeding-agent-loop-standard` when continuous re-entry is needed).
7. **Deliver and verify.** Follow the repository delivery path. Re-run the
   **original oracle** on the exact delivered subject at the declared layer
   (source, candidate, artifact, or live). Close only on decisive readback;
   otherwise open correction Work.
8. **Idle honestly.** When floors are fresh and no positive-net admitted work
   remains under budgets, park as idle frontier with durable wake triggers. Do
   not claim the product is perfect.

## Standards vs workflow vs specialists

| Kind | Examples | Role in this loop |
| --- | --- | --- |
| **This workflow** | `continuous-product-quality` | Owns product betterment matrix, scout/admission, coverage, idle/wake, outcome readback |
| **Loop standards** | `self-feeding-agent-loop-standard`, `autonomous-execution-standard`, `work-coordination-standard` / `enact-work-coordination` | How continuous selection or one admitted Work executes and coordinates |
| **Delivery/source standards** | `delivery-standard`, `source-authoring-standard`, `risk-matched-verification-standard` | What “landed/live/verified” means |
| **Specialist workflows** | `interface-craft`, `frontend-performance-remediation`, `product-finish`, `game-design-blueprint`, `game-economy-review`, `saas-subscription-pricing`, `security-threat-modeling`, … | Domain method for one admitted finding/opportunity |
| **One-shot finish** | `product-finish` | Bounded release-grade pass for an integrated product; not a substitute for the standing loop |
| **Agent-system learning** | `agent-system-improvement` | Only when the recurring failure is in agent/Skills/tools, not the product |

## User trigger vs agent discovery

- **User proactive:** “Keep improving this product,” “loop on UX and
  performance,” “run product betterment loop engineering,” or explicit
  `$continuous-product-quality` / Skill invoke.
- **Agent discovery:** load when the job is a standing/recurring multi-aspect
  betterment loop, quality operating contract, scout→Work→verify cycle, or idle
  frontier for a product—not when the user only wants one known bug fix, one
  finish pass, or one specialist redesign.

## Guardrails

- Do not invent a perfect score or hide failed floors.
- Do not create unbounded WIP; clear CI/review/deploy bottlenecks first.
- Do not recreate delivery platforms, credential systems, or meta-routers.
- Do not change pricing, legal policy, public contracts, customer data,
  infrastructure, or irreversible effects without owning authority.
- Do not keep a session alive forever; use bounded ticks + durable re-entry.

## Output

Return:

1. **Product Quality Loop Contract** (scope, matrix, oracles, signals,
   admission, Work handoff, readback, idle/wake, budgets, residuals)
2. **Current operating state** when executing: coverage freshness, open
   findings, admitted Work, verified outcomes, idle/wake status
3. **Next safe action** for the highest-value eligible cell or a durable idle
   checkpoint

Complete a **design** only when every applicable cell has a usable oracle,
non-applicable cells have reasons, and the loop can idle without losing state.
Complete an **operating tick** only when admitted work advanced with evidence,
or the loop is honestly idle/blocked with a wake condition.
