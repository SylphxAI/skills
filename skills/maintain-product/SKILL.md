---
name: maintain-product
description: "Cut live/regression harm with a root-cause fix on the owning layer."
---

# Maintain Product

When users or operators are **hurt** by failures or regressions, run **one** maintain cycle.

## When to use

- Live/prod/dogfood breakage, flaky paths, security/privacy incidents
- Regressions, noisy errors, undiagnosable failure modes

## Method

**Symptom → blast radius → fix cause on owning layer → re-run the failing path.**  
Prefer a regression lock over silent cleanup. Do not invent a harm metric.

### 1. Frame
- Symptom, severity, audience (user/ops/data/security)
- Health signal that must improve this cycle
- Non-goals: feature expansion; visual redesign without harm link

### 2. Research
- Reproduce or gather evidence (logs, tests, live smoke, reports)
- Bisect likely change sets; map owning component
- Stop when root-cause hypotheses are actionable

### 3. Admit work
- **In:** fixes/guards that reduce the framed harm; instrumentation if diagnosis is blocked
- **Out:** unrelated refactors; “improve everything”; polish
- Multiple related fixes OK if they share one harm theme

### 4. Implement
- When landing source: apply constraints from `../drive-to-delivery/references/source-authoring-standard/` — **L1** batch this cycle's admitted work, **L2** atomic valid commits, **L3** one revert-safe complete PR outcome per independent outcome (queue/squash unit).
- Fix cause; add a regression oracle on the failing **product behavior**
  when automatable. Do not lock a heading, brand, or file path.
- Small blast radius
- Do not paper over shared floors in the wrong layer
- When the harm *is* a bloated or false-red pipeline, use
  `../implement-continuous-integration/`.

### 5. Deliver / verify
- Re-run the failing path
- Spot-check the touched path for a new regression
- Note structural follow-ups if a deeper build/expand is still required later

## Cycle done

1. Framed harm fixed or mitigated on the failing path  
2. Reproduction closed or residual owner named  
3. No obvious new regression on the touched path  
4. Scope stayed harm-linked  


## Progressive disclosure

- Related jobs when requested: `run-open-product-betterment`, `remediate-frontend-performance`, `remediate-agent-harness`, `implement-continuous-integration`
- Source landing: `../drive-to-delivery/references/source-authoring-standard/`


## Output

Harm · cause · fix · path re-run · residual risk

