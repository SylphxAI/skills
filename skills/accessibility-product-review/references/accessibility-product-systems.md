# Accessibility Product Systems

Accessibility is product resilience: users must be able to understand, navigate, act, recover, and trust the system across ability, device, context, and assistive technology.

## Rule IDs

- `a11y-product-1` — Start from critical user tasks: signup, checkout, purchase, cancel, restore, support, data export, settings, and core value flow.
- `a11y-product-2` — Every interactive element needs accessible name, role, state, focus order, keyboard operation, and visible focus.
- `a11y-product-3` — Form errors should identify the field, explain the problem, preserve input, and provide recovery without color alone.
- `a11y-product-4` — Motion should be purposeful, interruptible where relevant, and respectful of reduced-motion preferences.
- `a11y-product-5` — Color, contrast, typography, spacing, and touch targets should support low vision, mobile use, and motor accessibility.
- `a11y-product-6` — Dynamic content, loading, toasts, modals, drawers, tabs, menus, and route changes need focus and announcement behavior.
- `a11y-product-7` — Charts, dashboards, games, maps, media, and AI outputs need non-visual summaries or alternate task paths.
- `a11y-product-8` — Captions, transcripts, language, localization, plain copy, and cognitive load matter for accessibility and conversion.
- `a11y-product-9` — Design systems should encode accessible defaults so every product team does not rediscover the same fixes.
- `a11y-product-10` — Validate with automated checks, keyboard walkthroughs, screen reader smoke tests, device checks, and user feedback for critical flows.

## Severity decision table

| Issue | Severity | Why | Fix pattern |
| --- | --- | --- | --- |
| Cannot complete checkout by keyboard | P0 | blocks revenue and users | focus order, controls, modal trap fix |
| Unlabeled purchase button | P0 | assistive tech cannot act safely | accessible name and context |
| Error only shown in red | P1 | recovery unclear | text, association, summary |
| Motion causes discomfort | P1 | harmful or unusable | reduced motion and simpler transition |
| Low-contrast secondary text | P2 | usability degradation | token adjustment |
| Chart has no summary | P1/P2 | decision inaccessible | data table or text summary |

## State machine

```text
flow_selected -> critical_tasks_mapped -> accessibility_risks_identified
accessibility_risks_identified -> blocker_fixed -> validation_run
validation_run -> keyboard_passed -> screen_reader_smoke -> mobile_touch_check -> regression_added
validation_run -> failed -> issue_reopened -> blocker_fixed
component_issue_found -> design_system_fix -> downstream_surfaces_updated
```

## Event/schema suggestions

Accessibility is not only telemetry, but product signals can reveal barriers:

- `a11y_preference_detected`: reduced_motion, high_contrast, text_scale, platform.
- `form_error_repeated`: field, error_type, attempts, assistive_hint_shown.
- `keyboard_navigation_escape`: component, trapped_focus, route, user_action.
- `checkout_accessibility_support_contact`: flow_step, device, assistive_tech_if_shared, issue_category.
- `a11y_validation_result`: flow, check_type, result, issue_count, blocker_count.

## Review checklist

- Critical tasks work with keyboard, touch, screen reader smoke, zoom/text scaling, and reduced motion.
- Components have accessible names, roles, states, focus order, and visible focus.
- Forms, errors, loading, dynamic content, modals, navigation, and notifications have recovery and announcement behavior.
- Visual design supports contrast, text size, spacing, touch targets, and non-color cues.
- Product-specific surfaces such as checkout, games, dashboards, media, AI output, and developer docs have alternate representations.
- Design-system fixes and regression checks prevent repeated one-off patches.
