---
name: ui-review
description: "Review one product UI flow on a real render — accessibility, responsive composition, motion, performance, and reachable states. Use when the user asks to review UX, check accessibility, verify a screen, or judge whether a flow is ready. Do not use to design or implement the flow, or to produce store screenshots."
---

# UI Review

Rendered evidence decides: source inspection, lint, types, and unit tests are necessary where relevant, but none proves the final pixels, composition, focus path, or reachable states. A description of the UI is not a review of the UI.

Discover the preview URL from the product's running server, not an agent-only loopback. Label the observed layer: local preview is not public preview, released, or live.

Open [visual verification](references/visual-verification-and-delivery.md) for the verification ladder. Open [local preview](references/local-preview.md) when checking a running surface. Open [accessibility, motion, and performance](references/accessibility-motion-and-performance.md) for the baseline floor.

Use `ui-flow` to implement. Use `accessibility-conformance` for a named conformance decision.
