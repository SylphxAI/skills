# In Product Education Patterns

## Education state machine

```text
user_reaches_moment -> education_eligible -> education_shown -> user_acts_or_dismisses -> learning_persisted -> education_suppressed_or_advanced
        |                    |                  |                         |
        v                    v                  v                         v
 no_help_needed        trigger_suppressed   repeated_ignore          help_center_handoff
```

## Rule IDs

- `edu-1` — Start with a real user confusion or value moment, not a desire to promote features.
- `edu-2` — Choose the lightest format that solves the job: label, example, empty state, tooltip, checklist, template, tour, or doc link.
- `edu-3` — Trigger education from behavior and state, not arbitrary page views alone.
- `edu-4` — Dismissal, completion, and snooze should persist.
- `edu-5` — Expert users need escape hatches and less repetition.
- `edu-6` — Education content must be accessible, localizable, and short enough for the surface.
- `edu-7` — Upsell education should be honest about unavailable features and alternatives.
- `edu-8` — If education explains the same thing repeatedly, fix IA, copy, defaults, or product flow.
- `edu-9` — Measure retained action, reduced support, feature success, and user confidence, not impressions alone.
- `edu-10` — Link in-product guidance to maintained help-center and support feedback loops.

## Decision table

| Moment | Best format | Avoid | Success metric |
| --- | --- | --- | --- |
| First setup | Checklist or template | Long tour before value | Activation milestone |
| Empty state | Example plus first action | Generic explanation | First useful object created |
| Complex field | Inline hint | Tooltip requiring hover only | Valid completion and fewer errors |
| New feature | Contextual badge/help | Global modal spam | Retained feature use |
| Error recovery | Actionable guidance | Blame or vague docs link | Successful recovery |
| Upgrade education | Comparison and proof | Fake limitation pressure | Qualified upgrade action |

## Education checklist

- Moment, audience, trigger, and desired action are specific.
- Copy is short, localized-ready, accessible, and removable.
- Repetition, dismissal, and completion states are handled.
- Help center/support handoff exists for deeper learning.
- Metrics distinguish learning, action, support deflection, and annoyance.

## Event schema

Track: `education_trigger_eligible`, `education_shown`, `education_dismissed`, `education_snoozed`, `education_cta_clicked`, `education_task_completed`, `education_help_opened`, `education_suppressed`, `education_experiment_assigned`, `education_quality_reviewed`.

Minimum properties: user stage, surface, format, trigger, message version, action target, dismissal reason, completion state, support deflection tag, accessibility/localization status, and metric window.
