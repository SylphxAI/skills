# Form UX Systems

Forms are product conversations. Each field asks for trust, time, and accuracy; the system should justify and protect that ask.

## Rule IDs

- `form-ux-1` — Start with the user's goal and only ask fields needed for that stage.
- `form-ux-2` — Order fields from familiar/easy to sensitive/high-friction unless verification requires otherwise.
- `form-ux-3` — Explain why sensitive fields are needed and how they are used.
- `form-ux-4` — Validate at the right time: inline for formatting, submit for cross-field/server checks, async for availability/risk.
- `form-ux-5` — Error messages should identify the field, explain the fix, preserve input, and be accessible.
- `form-ux-6` — Provide save/resume, autosave, or draft behavior for long/high-stakes forms.
- `form-ux-7` — Use progressive disclosure for conditional complexity; do not hide required consequences.
- `form-ux-8` — Support keyboard, screen reader, mobile keyboards, autofill, password managers, and localization.
- `form-ux-9` — Track abandonment by field/step and reason, but respect privacy and data minimization.
- `form-ux-10` — High-risk forms need confirmation, audit trace, support route, and reversal path when possible.

## Decision table

| Form type | Key risk | Better pattern | Guardrail |
| --- | --- | --- | --- |
| Signup | early over-asking | defer nonessential fields | activation quality |
| Checkout | surprise terms | clear summary and recovery | refund/dispute rate |
| Support | missing context | guided issue taxonomy | privacy redaction |
| Creator submission | complex requirements | checklist and draft | review queue quality |
| Settings/admin | irreversible change | confirm and audit | undo/recovery |
| Cancellation | dark pattern risk | clear options and consequences | complaint/churn reason |

## State machine

```text
form_viewed -> field_started -> field_validated -> step_completed
field_validated -> validation_error -> recovery_hint_shown -> field_validated
step_completed -> draft_saved -> resumed -> submitted
submitted -> server_error -> retry_or_support
submitted -> success_confirmed -> next_action_shown
```

## Event schema

Recommended events:

- `form_viewed`: form_id, source, user_state, device_class.
- `form_field_started`: form_id, field_id, step_id, autofill_available.
- `form_validation_error`: field_id, error_type, timing, attempts.
- `form_step_completed`: form_id, step_id, elapsed_ms, error_count.
- `form_abandoned`: form_id, step_id, last_field, elapsed_ms.
- `form_submitted`: form_id, success, server_error_class, support_route_shown.

## Checklist

- Every field has a reason and appropriate timing.
- Errors, labels, help text, focus, keyboard, and screen reader behavior are accessible.
- Mobile keyboards, autofill, localization, and long content work.
- Long forms support draft/save/resume where needed.
- Metrics include completion quality, abandonment, errors, support, fraud, and downstream success.
