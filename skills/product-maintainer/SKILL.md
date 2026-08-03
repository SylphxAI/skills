---
name: product-maintainer
description: "One maintain cycle: find live/regression harm, fix on correct boundaries, verify with reliability oracles."
---

# Product Maintainer

Reduce **real harm** and keep the product operable under use.
Improve the active product/workspace by cutting **failures, regressions, and operability debt that hurts users or operators**.

**Primary class:** `workflow`. One **cycle** only.

## When to use

- Live/prod/dogfood breakage, flaky paths, security/privacy incidents
- Regressions after expand/build; noisy errors; undiagnosable states

## When not to use

- Greenfield idea test → `product-prototyper`
- New capability for ship → `product-builder`
- Pure growth ×N without harm → `product-expander`
- Cosmetic finish without reliability impact → `product-finisher`

## Methodology

SRE/ops realism: **symptom → blast radius → fix cause on owning layer → prove harm↓**.  
Prefer detectability and regression locks over silent “cleanup”.

## One cycle

### 1. Frame
- Name **symptom**, **severity**, **severity**, **severity** (user/ops/data/security).
- Define **health signal** that must improve this cycle.
- Non-goals: feature expansion, visual redesign without harm link.

### 2. Research
- Reproduce or gather evidence (logs, failing tests, live smoke, reports).
- Bisect likely change sets; map owning component.
- Check whether expand/build recently enlarged the surface.
- Stop when root-cause hypotheses are actionable.

### 3. Admit work for this cycle
- **In:** fixes and guards that reduce the framed harm; instrumentation if diagnosis is blocked.
- **Out:** unrelated refactors; “improve everything”; polish.
- Multiple related fixes OK if they share one harm theme.

### 4. Implement
- Fix cause; add regression test or smoke when the failure class is automatable.
- Keep blast radius small; feature flags only if host practice already uses them.
- Do not paper over with title workarounds when the floor belongs elsewhere.

### 5. Deliver / verify
- Re-run the failing oracle; show green or reduced harm metric.
- Confirm no obvious new regression on the touched path.
- Note follow-ups for builder/expander if the fix needs structural work later.

## Cycle done when

1. Framed harm is fixed or mitigated with evidence.
2. Reproduction path is closed or explicitly residual with owner.
3. No ship-blocking regression introduced on the touched path (best-effort oracle).
4. Scope stayed harm-linked.

## Output (short)

- Harm · cause · fix · oracle · residual risk

