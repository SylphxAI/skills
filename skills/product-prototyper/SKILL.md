---
name: product-prototyper
description: "One prototype cycle: frame hypothesis, cheap research, build throwaway learning slice, decide go/kill/pivot."
---

# Product Prototyper

Turn uncertainty into a decision with the cheapest real slice.
Improve the active product/workspace by **learning**, not by shipping permanence.

**Primary class:** `workflow`. One **cycle** only (this Skill does not define multi-cycle orchestration).

## When to use

- New idea, new mechanic, new IA, unknown demand
- Need go / kill / pivot evidence before investing in build

## When not to use

- Known ship path → `product-builder`
- Live harm / regressions → `product-maintainer`
- Scale a validated core → `product-expander`
- Release-grade polish of integrated product → `product-finish`

## Methodology

Lean experiment: **hypothesis → cheapest probe → observe → decision**.  
Prefer throwaway fidelity. Correctness of the *learning* beats code beauty.

## One cycle

### 1. Frame
- State the **hypothesis** or open question in one sentence.
- Name **users/players**, **success signal** (what would change your mind), **non-goals**, **time box** for this cycle.
- Separate “must learn” from “nice to build”.

### 2. Research (thin, VoI-stopped)
- Scan closest analogs / prior art / in-repo history only until it changes the probe design.
- List 2–3 alternative probes; pick the **lowest-cost** that can falsify or support the hypothesis.
- Stop research when more reading will not change the experiment.

### 3. Admit work for this cycle
- **In:** only tasks that produce the probe and its observation path.
- **Out:** production hardening, multi-region, abstract platforms, pixel-perfect brand systems.
- Keep the admitted set small enough to finish inside the time box.

### 4. Implement
- Build the **minimum interactive or observable slice** in the real workspace when possible.
- Mark throwaway code and placeholders explicitly.
- No workarounds that fake a future production architecture unless the hypothesis is *about* that architecture.

### 5. Deliver / verify
- Run or show the slice; capture what a stranger would experience.
- Record: what was tried, what was observed, **decision** = go | kill | pivot | need-another-probe (with the new hypothesis).
- Evidence = observation + decision, not “code exists”.

## Cycle done when

All hold:

1. Hypothesis and success signal were explicit.
2. A real probe ran (or a blocked reason is concrete and external).
3. A written **go / kill / pivot / next-probe** decision exists with evidence pointers.
4. Non-learning production work was not smuggled in as “prototype”.


## Sibling roles

| Need | Skill |
| --- | --- |
| Learn / decide | `product-prototyper` |
| Ship capability | `product-builder` |
| Cut live harm | `product-maintainer` |
| Scale validated core | `product-expander` |
| Remove material burrs | `product-finish` |

Parallel product work: other agents may run other role Skills in the same
period. Keep this cycle inside **this** role’s admit rules and cycle-done.

## Output (short)

- Hypothesis · probe · evidence · decision · follow-on owner hint (build / expand / another prototype)

