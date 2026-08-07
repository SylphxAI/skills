# Design System Extraction Systems

## Contents

- [Evidence classes](#evidence-classes)
- [Source authority matrix](#source-authority-matrix)
- [Layer graph](#layer-graph)
- [Rule IDs](#rule-ids)
- [Component contract matrix](#component-contract-matrix)
- [Reconciliation decision table](#reconciliation-decision-table)
- [Validation matrix](#validation-matrix)
- [Machine-readable event shapes](#machine-readable-event-shapes)

## Evidence classes

| Status | Meaning | Permitted use |
| --- | --- | --- |
| `observed` | directly present in an authorized source | state the fact with locator |
| `inferred` | repeated evidence supports a hidden rule | state confidence and counterexample |
| `proposed` | normalization or missing contract is new | keep outside the as-is system |
| `intentional_exception` | divergence has owned product rationale | preserve with scope and review |
| `unresolved` | sources conflict or coverage is absent | request authority; do not guess |

Every observation gets a stable ID and source locator. For screenshots record
surface, state, viewport, scale, theme, platform, locale, and capture version if
known. For code/design sources record file/node/component/token path and revision.

## Source authority matrix

Authority is product-specific. Establish it at use rather than assuming:

| Source | Strong for | Weakness to record |
| --- | --- | --- |
| Shipped product | actual user-visible behavior | may contain drift, experiments, bugs |
| Component code | anatomy, logic, supported props/states | unused or bypassed variants |
| Token/style source | declared values and aliases | raw values may not reflect consumers |
| Design library | intended contracts and documentation | may lag production |
| Screenshots | rendered composition and content stress | hidden interaction/states absent |
| Product specs | rationale and future direction | not proof of shipped behavior |

Resolve conflicts by recording the chosen authority for the target artifact,
not by deleting the competing evidence.

## Layer graph

```text
raw values
-> primitives (palette, scale, duration, type families)
-> semantic tokens (surface, text, action, status, focus, spacing roles)
-> component anatomy + variants + states
-> composition patterns (forms, lists, navigation, overlays, feedback)
-> complete product workflows
```

Track aliases and consumers. A token with no consumer may be obsolete; a raw
value with many consumers may be missing a semantic role.

## Rule IDs

- `design-extract-1` — Freeze source scope, authority order, revision, and
  authorization before extraction.
- `design-extract-2` — Give every fact provenance and classify it as observed,
  inferred, proposed, intentional exception, or unresolved.
- `design-extract-3` — Build the full dependency graph; do not flatten raw
  values, semantic roles, components, patterns, and workflows into one list.
- `design-extract-4` — Derive semantic names from product role and state, not
  from one raw value or screenshot appearance.
- `design-extract-5` — Capture anatomy, content slots, variants, size/density,
  interaction states, validation, permissions, loading, empty, offline, and
  destructive states.
- `design-extract-6` — Express responsive behavior as constraints, reflow,
  priority, overflow, and breakpoint evidence—not isolated viewport pictures.
- `design-extract-7` — Include keyboard, pointer, touch, screen reader, focus,
  contrast, target size, reduced motion, zoom, and localization stress as
  applicable.
- `design-extract-8` — Use frequency only as one signal; weigh shipped use,
  recency, declared authority, accessibility, and product rationale.
- `design-extract-9` — Preserve intentional exceptions with owner and scope;
  treat unowned one-offs as migration candidates, not automatic deletions.
- `design-extract-10` — Separate an as-is extraction from a proposed canonical
  system and show the exact transformation between them.
- `design-extract-11` — Quantify migration blast radius through consumer and
  composition graphs, not token counts alone.
- `design-extract-12` — Validate the system against representative workflows
  and edge states; a component inventory alone is insufficient.
- `design-extract-13` — Exclude customer content, secrets, and unauthorized
  third-party assets from the reusable artifact.
- `design-extract-14` — Keep code/design/source revisions current at task time;
  if the live source cannot be inspected, label the extraction stale or blocked.

## Component contract matrix

| Dimension | Extract | Typical missed evidence |
| --- | --- | --- |
| Anatomy | slots, hierarchy, alignment, container behavior | content ownership |
| Variants | role, emphasis, size, density, platform | accidental boolean combinations |
| State | default, hover, focus, pressed, selected, disabled | async, permission, destructive confirmation |
| Feedback | loading, progress, success, warning, error, retry | latency and partial success |
| Content | min/max, wrapping, truncation, numbers, dates | translation expansion and RTL |
| Responsive | min/max, wrap, collapse, priority, overflow | intermediate widths |
| Input/a11y | keyboard, touch, pointer, AT, focus, motion | composed-flow semantics |
| Provenance | source IDs, confidence, exception | inferred rule presented as fact |

## Reconciliation decision table

| Conflict | Decision method | Bad shortcut |
| --- | --- | --- |
| Same semantic role, multiple raw values | inspect state, context, contrast, source authority, migration impact | majority value wins |
| Same name, different behavior | split contracts or identify deprecated fork | force one prop-heavy component |
| Different names, same contract | merge only after consumer and state comparison | string/name similarity |
| Design differs from production | record target authority and drift issue | silently choose preferred source |
| Inaccessible common pattern | propose replacement and migration; do not canonize | frequency equals correctness |
| Missing edge state | mark gap and propose separately | invent and label extracted |

## Validation matrix

Validate a representative flow across the dimensions the product supports:

- default and primary success path;
- loading, empty, error, permission, offline, and destructive recovery;
- narrow, intermediate, and wide layout;
- short, long, localized, RTL, numeric, and user-generated content;
- keyboard, touch, pointer, assistive technology, zoom, and reduced motion;
- light/dark/high-contrast or product themes;
- platform-specific navigation and system controls.

Record which combinations were observed, reconstructed, proposed, or not tested.

## Machine-readable event shapes

- `design_observation_recorded`: observation_id, source_locator, revision,
  platform, surface, state, evidence_class, confidence.
- `design_relation_mapped`: source_id, target_id, relation_type, consumer_count.
- `design_conflict_opened`: observations, conflict_type, authority_needed, owner.
- `design_exception_recorded`: scope, rationale, owner, review_at.
- `design_flow_validated`: flow, coverage_dimensions, mismatches, result.
