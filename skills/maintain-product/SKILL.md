---
name: maintain-product
description: "Repair a product defect or regression at its owning layer. Use for live or dogfood failures, flaky paths, and current user harm. Do not use to finish or polish an already integrated product."
---

# Maintain Product

Repair the owning layer. Stabilize active harm with a reversible mitigation when service impact requires it. For a measured frontend path, measure one user-visible behavior, correct the owning cause, and remeasure the same device and metric. A rewrite of an unrelated layer is not a repair.

Open [reproduction-driven repair](references/reproduction-driven-repair.md) when the cause, reproducer, or nondeterminism needs depth. Open [frontend performance](references/frontend-runtime-performance-method.md) when the defect is a measured frontend path.

Use `finish-product` for polish of an already integrated promise. Use `run-incident-response` when the defect is a live incident.
