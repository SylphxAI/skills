# Onboarding Activation Patterns

## Activation model

Activation is the first moment a target user receives the promised product value, not the moment they finish setup.

## Rule IDs

- `activation-1` — Define one primary activation event tied to user value, not vanity completion.
- `activation-2` — Ask only for setup required before first value; defer the rest.
- `activation-3` — Permission prompts should follow a visible value moment or clear feature intent.
- `activation-4` — Tutorials should be contextual and dismissible; avoid blocking exploration with lecture screens.
- `activation-5` — Empty states should become onboarding surfaces with a first action.
- `activation-6` — SaaS onboarding should separate personal setup, workspace/team setup, data import, and billing prompts.
- `activation-7` — Developer tools need install, first command/API call, example success, and docs fallback.
- `activation-8` — Games need core loop teaching through play, not menus before fun.
- `activation-9` — Trial onboarding should bring users to paid-value evidence before paywall pressure.
- `activation-10` — Measure drop-off by step, friction reason, setup dependency, and first-value time.

## Flow state machine

```text
arrived -> understood_value -> started_setup -> first_action -> first_value -> return_prompted -> retained
            |                  |               |
            v                  v               v
        confused          setup_blocked     abandoned
```

## Decision table

| Friction | Ask | Better pattern |
| --- | --- | --- |
| Account creation | Is identity needed before value? | Guest/demo mode or delayed signup if safe |
| Permission | Is value visible yet? | Explain use case, then prompt at moment of use |
| Import | Can sample data show value? | Sample/demo, then import after user believes |
| Team invite | Is collaboration core? | Invite after first solo value unless team product |
| Payment | Does trial need card? | Match business model; disclose clearly if required |

## Event schema

Track: `onboarding_started`, `value_prop_seen`, `setup_step_started`, `setup_step_completed`, `permission_prompt_shown`, `first_action_completed`, `first_value_reached`, `onboarding_skipped`, `onboarding_abandoned`, `return_prompt_sent`, `activated_user_returned`.
