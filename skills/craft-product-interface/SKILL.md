---
name: craft-product-interface
description: Design, review, build, or polish one product interface flow with clear hierarchy, complete states, responsive behavior, accessibility, and representative visual verification.
---

# Craft Product Interface

Create one coherent user flow that works across its important states, inputs, and viewport conditions.

## Method

1. Define the user, primary job, entry point, completion state, product truth, and target platforms.
2. Inspect the existing design system, components, routes, content, state ownership, and nearby flows.
3. Map the complete journey: initial, loading, empty, partial, success, validation, error, offline, permission, and recovery states that apply.
4. Establish information hierarchy, action priority, semantic roles, typography, spacing, color, and elevation before decorative detail.
5. Use existing tokens and components, adding the smallest new reusable role that the flow needs.
6. Adapt layout and interaction to compact, medium, and wide viewports plus touch, keyboard, pointer, controller, and assistive input where relevant.
7. Write interface text in user vocabulary with concrete actions and recovery guidance.
8. Implement accessibility through semantic structure, labels, focus, contrast, target size, text scaling, reduced motion, captions, sensory alternatives, and input alternatives.
9. Render the representative path and inspect real content, overflow, state transitions, focus behavior, responsive layouts, and console output.
10. For a review request, return prioritized findings with precise locations. For a build or polish request, return the implementation and changed-path checks.

## References

- [Interface craft rules](references/interface-craft-rules.md) for hierarchy and visual direction.
- [States, forms, and recovery](references/states-forms-and-recovery.md) for stateful flows.
- [Responsive mobile and input](references/responsive-mobile-and-input.md) for layout and control behavior.
- [Accessibility, motion, and performance](references/accessibility-motion-and-performance.md) for inclusive interaction.
- [Sensory feedback](references/sensory-feedback.md) when sound, music,
  haptics, camera, visual effects, or action-feedback hierarchy materially
  affect the flow.
- [Visual verification and delivery](references/visual-verification-and-delivery.md) for implementation review.

The Sylphx company [experience](https://github.com/SylphxAI/owner/blob/main/standards/experience.md)
and [feedback](https://github.com/SylphxAI/owner/blob/main/standards/feedback.md)
standards remain source authority; these references provide the applying
interface method.

## Output

Return the finished flow or review, the states and surfaces covered, the files changed when applicable, and the representative render or interaction checks performed.
