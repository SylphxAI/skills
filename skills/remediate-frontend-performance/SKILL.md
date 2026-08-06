---
name: remediate-frontend-performance
description: "Remediate frontend runtime performance with measured…"
---

# Remediate Frontend Performance

## Workflow

1. **Frame the user path** and metric (LCP, INP, FPS, bundle KB, long task ms).
2. **Measure baseline** with the repo's real tooling (profiler, Lighthouse, browser perf, bundle analyzer).
3. **Find the owning cause** (layout thrash, huge JS, images, main-thread work, chatty network).
4. **Fix on the owning path** with the smallest complete change.
5. **Re-measure** the same path and report deltas.
6. **Stop** when the framed metric meets the target or only external blockers remain.

## Depth

For detailed technique notes open [references/frontend-runtime-performance-method.md](references/frontend-runtime-performance-method.md).

## Gotchas

- Micro-benchmarks that ignore the user path are not proof.
- Do not claim production improvement from local-only numbers without stating that limit.

## Output

Baseline · changes · after metrics · residuals

## Archived depth

If the thinner entry is insufficient, read [pre-v3-entry-method.md](references/pre-v3-entry-method.md).

