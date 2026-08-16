---
name: extract-design-system
description: "Extract a reusable design system from an existing product corpus."
---

# Extract Design System

Recover the reusable visual and interaction system an existing product uses.
Keep observed behavior, interpretation, and proposed normalization clear.

## Method

1. Confirm source authorization, product versions, platforms, themes, locales,
   viewport classes, recency, and intended consumers.
2. Inspect shipped product surfaces alongside component code, tokens, design
   libraries, and product specifications available for the target version.
3. Capture raw values, semantic roles, component anatomy, variants, states,
   compositions, and complete workflows with direct source locators.
4. Trace dependencies from raw values through primitives, semantic tokens,
   components, patterns, and workflows.
5. Reconcile differences using shipped use, source ownership, recency,
   accessibility, and product intent. State observed facts, inferred patterns,
   intentional variants, and proposed changes in plain language.
6. Extract responsive constraints, content behavior, density, input modality,
   motion, localization, accessibility, and platform conventions across the
   product states that users encounter.
7. Identify duplicate values and components, semantic collisions, incomplete
   states, accessibility issues, and migration opportunities.
8. Reconstruct or audit representative flows with the extracted system. Include
   dense content, loading, empty, error, localized, keyboard, and narrow-screen
   cases where they apply.

Read [Design system extraction patterns](references/design-system-extraction-systems.md)
for source comparison, layer modeling, component details, and validation.

## Output

Return:

- scope, source order, versions, platforms, themes, locales, and viewports;
- primitive and semantic tokens with source locators and consumers;
- component anatomy, variants, states, responsive behavior, content limits,
  accessibility, input, and platform behavior;
- composition patterns and representative workflows;
- intentional variants, source conflicts, and proposed normalization;
- migration impact by affected token, component, composition, and workflow;
- representative-flow results.

Use authorized product material in the reusable output and preserve licensed
third-party work according to its terms.
