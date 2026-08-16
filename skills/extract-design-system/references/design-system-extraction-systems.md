# Design System Extraction Systems

## Compare sources

Choose sources according to what they can establish:

- the shipped product shows current user-visible behavior;
- component code shows supported anatomy, logic, properties, and states;
- token and style sources show declared values and aliases;
- the design library shows intended components and usage guidance;
- screenshots show rendered composition and content stress;
- product specifications explain rationale and intended direction.

When sources differ, name the source chosen for the target system and explain
the product reason. Preserve intentional platform, theme, density, locale, and
accessibility variants.

## Model the layers

```text
raw values
-> primitives such as color, type, spacing, radius, elevation, and motion
-> semantic tokens for surface, text, action, feedback, focus, and layout
-> component anatomy, variants, and interaction states
-> composition patterns such as forms, lists, navigation, and overlays
-> complete product workflows
```

Track aliases and consumers. Repeated raw values may reveal a semantic role;
unused tokens may reveal drift.

## Extract components and behavior

For each reusable component, capture:

- anatomy, content ownership, slots, hierarchy, and alignment;
- role, emphasis, size, density, platform, and theme variants;
- default, hover, focus, pressed, selected, disabled, loading, permission,
  progress, success, warning, error, retry, and confirmation behavior that the
  product supports;
- wrapping, truncation, numeric and date formats, translation expansion, RTL,
  and user-generated content;
- reflow, min/max constraints, priority, overflow, and intermediate widths;
- keyboard, touch, pointer, assistive technology, focus, contrast, target size,
  zoom, and reduced motion.

Derive semantic names from product role and state. Use frequency together with
shipped use, recency, source ownership, accessibility, and product rationale.

## Reconcile and migrate

- Several values serving one semantic role may become one token when context,
  contrast, and state support the merge.
- One name serving different behavior becomes separate component contracts.
- Different names serving the same contract may merge after consumer and state
  comparison.
- A common accessibility issue becomes an accessible replacement plus an
  explicit migration.
- A product state that lacks a reusable contract becomes a proposed addition.

Separate the extracted current system from proposed normalization. Estimate
migration impact through affected consumers, components, compositions, and
workflows.

## Validate representative flows

Choose flows that exercise the dimensions the product supports:

- primary success, loading, empty, error, permission, offline, and recovery;
- narrow, intermediate, and wide layouts;
- short, long, localized, RTL, numeric, and user-generated content;
- keyboard, touch, pointer, assistive technology, zoom, and reduced motion;
- light, dark, high-contrast, and platform-specific presentation.

Record observed behavior, reconstruction differences, and proposed changes in
the product's existing design documentation.
