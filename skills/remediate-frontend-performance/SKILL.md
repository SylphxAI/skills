---
name: remediate-frontend-performance
description: "Remediate frontend performance with before/after path metrics."
---

# Remediate Frontend Performance

Improve one user-visible frontend path and remeasure the same behavior.

## Method

1. Define the user path, representative device/network, and metric such as LCP,
   INP, FPS, bundle bytes, long tasks, memory, or startup time.
2. Measure the current path with the repository's profiler, browser tooling,
   Lighthouse, or bundle analyzer.
3. Locate the owning cause: layout, JavaScript, images, rendering, main-thread
   work, network, caching, hydration, or third-party code.
4. Apply the smallest complete correction on that path.
5. Rerun the same path, conditions, and metric. Check correctness,
   accessibility, visual fidelity, and representative lower-end behavior.
6. Report local, candidate, or production measurements at their observed layer.

Open the [frontend runtime performance method](references/frontend-runtime-performance-method.md)
for technique depth.

## Output

Return the framed path, baseline, owning cause, correction, after result, and
material residuals.
