# Design System Extraction Systems

Design-system extraction should preserve product intent while reducing drift. The output is a map of reusable decisions, not a mood board.

## Rule IDs

- `design-system-1` — Inventory existing surfaces before proposing new tokens.
- `design-system-2` — Separate primitives, semantic tokens, components, patterns, and product-specific compositions.
- `design-system-3` — Capture states: default, hover, focus, active, disabled, loading, selected, error, empty, success, offline.
- `design-system-4` — Name tokens by role when possible, not raw color or arbitrary style.
- `design-system-5` — Check responsive behavior, density, platform conventions, and content stress cases.
- `design-system-6` — Include accessibility: contrast, focus, target size, reduced motion, semantic labels, and keyboard behavior.
- `design-system-7` — Preserve intentional exceptions with rationale; do not flatten the product into sameness.
- `design-system-8` — Identify duplicate components and migration risk.
- `design-system-9` — Document usage examples and anti-patterns.
- `design-system-10` — Validate extraction by rebuilding or reviewing at least one representative flow.

## Extraction table

| Layer | Extract | Watch for |
| --- | --- | --- |
| Primitives | color, type, spacing, radius, shadows, motion | arbitrary one-off values |
| Semantic tokens | surface, text, border, status, action | raw values leaking into components |
| Components | buttons, inputs, cards, nav, modals, tables | variant explosion |
| Patterns | forms, empty states, pricing, checkout, settings | inconsistent flow behavior |
| Content | tone, labels, error copy, help text | jargon and drift |
| Accessibility | focus, contrast, semantics, motion | invisible blockers |

## State machine

```text
surfaces_collected -> inventory_created -> tokens_normalized -> components_mapped
components_mapped -> states_documented -> gaps_identified -> canonical_system_drafted
canonical_system_drafted -> representative_flow_tested -> migration_plan_created
```

## Event schema

Useful machine-readable fields:

- `design_token_extracted`: token_name, role, raw_value, source_count, confidence.
- `component_variant_found`: component, variant, state, source_surface, canonical_candidate.
- `design_inconsistency_logged`: category, surfaces, severity, recommended_pattern.
- `design_system_validation`: flow, components_used, gaps_found, pass_fail.

## Checklist

- Source surfaces and product context are explicit.
- Tokens, components, states, patterns, and accessibility are captured.
- Names are canonical and role-based where useful.
- Inconsistencies and duplicates are prioritized.
- Migration plan avoids breaking high-traffic flows.
