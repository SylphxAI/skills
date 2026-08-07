# Pre-v3 entry method (remediate-frontend-performance)

> Archived entry procedure from `1ba07c46dce3f448e84374ba2b52aafc65e861ce` so clean-break rewrite of `SKILL.md` does not destroy researched method text. Prefer the current `SKILL.md` for routing; use this file when the deeper pre-v3 procedure is needed.

---

# Remediate Frontend Performance

Repair a measured frontend runtime failure at its owning lifecycle, rendering,
or data-flow boundary. Produce one **Frontend Runtime Performance Remediation
Record** with comparable before-and-after evidence.

Read
[references/frontend-runtime-performance-method.md](frontend-runtime-performance-method.md)
before choosing instrumentation or a fix.

## Method
- When landing source: compose `source-authoring-standard` — **L1** batch admitted work, **L2** atomic valid commits, **L3** one revert-safe complete PR outcome per independent outcome.

1. Freeze the exact candidate, runtime, device and viewport class, route and
   state, input sequence, data fixture, performance budget or user-visible
   symptom, and non-goals.
2. Reproduce before editing. Record a repeatable baseline for the failing path
   and enough control paths to distinguish local cost from application-wide or
   environmental noise.
3. Inventory every plausible producer of work on the path: rendering and
   layout, CSS animation, `requestAnimationFrame`, timers, listeners,
   observers, async work, network and decoding, workers, canvas/WebGL, retained
   objects, and third-party code.
4. Isolate the mechanism with source inspection plus runtime evidence. Test
   competing hypotheses; a profiler hotspot without ownership or a code smell
   without measured impact is not yet a diagnosis.
5. Correct the owning mechanism. Prefer eliminating unnecessary work, bounding
   lifetime and frequency, moving computation out of the critical path, and
   making visibility, cancellation, cleanup, and reduced-motion behavior
   explicit over adding throttling patches around an unknown cause.
6. Exercise repeated mount/unmount, navigation, background/foreground,
   offscreen/onscreen, idle, reduced-motion, compact/wide, and representative
   input paths where applicable. Prove resources stop and detach when their
   owner is no longer active.
7. Re-run the same scenario and controls on the exact changed candidate. Report
   distributions or repeated samples where noise matters, along with functional
   and visual regression checks.
8. Remove temporary probes that expose data or distort production behavior;
   retain only intentional, privacy-safe operating signals owned by the
   product.

## Integrity rules

- Do not optimize before reproducing the claimed problem.
- Do not call a screenshot, Lighthouse score, bundle-size change, or isolated
  synthetic microbenchmark proof of a runtime fix by itself.
- Do not invent universal thresholds. Use the product's declared budget or
  report exact measured change and unresolved user impact.
- Do not hide a leak behind a longer timer, blanket debounce, disabled
  animation, route reload, or periodic cleanup when the owner can release the
  resource correctly.
- Keep source evidence and browser/runtime observations distinct, and bind both
  to the exact candidate and scenario.
- Preserve behavior, accessibility, reduced-motion meaning, visual intent, and
  input correctness unless an approved product decision changes them.

## Output contract

Produce one **Frontend Runtime Performance Remediation Record** containing:

- exact candidate and baseline, scenario matrix, environment, budget or
  symptom, control paths, assumptions, and non-goals;
- work-producer and lifecycle inventory with ownership and cleanup semantics;
- tested hypotheses, evidence, rejected explanations, and root-cause statement;
- changed files and mechanism-level correction;
- comparable before/after runtime evidence with sampling method and uncertainty;
- repeated-route, idle, visibility, cleanup, reduced-motion, responsive,
  functional, accessibility, and visual regression results as applicable; and
- remaining limits or unavailable evidence, without relabeling them as green.

## Routing boundaries

- `craft-product-interface` owns baseline performance while designing, building, or
  polishing one interface. Use this Skill when performance diagnosis and
  remediation is itself the requested artifact.
- `engineering-standard` supplies binding implementation and defect-repair
  invariants and composes into code-changing work without emitting a separate
  report.
- `review-operational-observability` owns product-wide logs, metrics, traces,
  SLOs, alerts, operator workflows, and recovery evidence.
- Backend latency, capacity, database, queue, and distributed load problems
  remain with their owning engineering or reliability work.
- Formal accessibility conformance remains with its specialist; this Skill
  must still preserve baseline accessible interaction and reduced-motion
  behavior.

Complete only when the original symptom is reproducible, the causal mechanism
is supported by source and runtime evidence, the owner-level correction is
landed in the candidate, and the same scenario demonstrates the improvement
without hiding functional, visual, lifecycle, or accessibility regressions.
