# Mobile UI Rules

## Review model

Mobile quality is the result of a sequence, not a screen. Audit: arrival, comprehension, first action, input, confirmation, recovery, and return.

## Rule IDs

- `mobile-ui-1` — Put the primary action where it is reachable and visible when it matters; avoid hiding the next step behind scroll if the screen's job is singular.
- `mobile-ui-2` — Respect safe areas, notches, gesture bars, keyboards, bottom sheets, and platform navigation chrome.
- `mobile-ui-3` — Use touch targets large enough for imprecise input and keep destructive actions separated from routine actions.
- `mobile-ui-4` — Collapse cognitive load: one primary action, one clear hierarchy, one visible status at a time.
- `mobile-ui-5` — Design forms around mobile input: correct keyboard type, autofill, paste, scanning, validation after intent, and visible error recovery.
- `mobile-ui-6` — Ask permissions at the moment of value; show a pre-permission explanation only when it reduces surprise.
- `mobile-ui-7` — Loading should preserve layout, show progress when uncertain, and avoid blank white screens.
- `mobile-ui-8` — Empty and offline states need a next best action, not just a message.
- `mobile-ui-9` — Settings must expose notification, privacy, billing, restore, export, and account controls in predictable locations.
- `mobile-ui-10` — Mobile web must treat viewport, browser bars, virtual keyboard, orientation, and install prompts as first-class states.

## Decision table

| Surface | Common failure | Better pattern |
| --- | --- | --- |
| Onboarding | Too many slides before value | One value promise, one setup action, skip path where safe |
| Purchase | Price and renewal terms are separated | Show price, period, trial, cancellation, restore, and support together |
| Form | Keyboard covers submit or error | Sticky action, scroll-to-error, correct input mode |
| Permission | Prompt appears before user understands value | Explain the feature, then request permission on use |
| Feed/list | Skeletons do not match final layout | Stable skeleton, progressive content, pull-to-refresh if expected |
| Settings | Billing/support/export hidden | Account, billing, notifications, privacy, data, help sections |

## Mobile event checks

Track at least: `screen_viewed`, `primary_action_tapped`, `input_error_shown`, `permission_prompt_shown`, `permission_result`, `purchase_started`, `restore_started`, `offline_state_shown`, `support_opened`.
