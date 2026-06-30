# Permission UX Patterns

## Permission state machine

```text
feature_interest -> value_explained -> permission_requested -> allowed -> feature_enabled -> settings_manageable
        |                  |                    |              |
        v                  v                    v              v
 feature_skipped      rationale_dismissed    denied      limited_access
```

Denied flows continue: `denied -> fallback_offered -> settings_education -> permission_changed_or_feature_skipped`.

## Rule IDs

- `perm-ux-1` — Request permission at the moment of value, not during cold start unless essential.
- `perm-ux-2` — Explain the user benefit and data use before irreversible OS prompts.
- `perm-ux-3` — Separate required permissions from optional enhancements.
- `perm-ux-4` — Provide useful fallback, limited mode, or skip paths when possible.
- `perm-ux-5` — Denial recovery should educate, not nag or shame.
- `perm-ux-6` — Background, tracking, contacts, health, finance, child, and precise-location permissions need higher scrutiny.
- `perm-ux-7` — Copy should match actual data handling, retention, sharing, and settings controls.
- `perm-ux-8` — Respect platform affordances: approximate location, limited photo library, notification channels, browser permission states, desktop privacy panels.
- `perm-ux-9` — Track permission funnel quality without fingerprinting or coercive re-prompting.
- `perm-ux-10` — Store reviewer notes should explain why sensitive permissions are needed and how to test them.

## Decision table

| Permission | Ask timing | Fallback | Trust risk | Review note |
| --- | --- | --- | --- | --- |
| Camera | When scanning/capturing | Manual upload or text entry | Medium | Show feature path needing capture |
| Photos/media | When selecting file | File picker or limited library | Medium | Explain limited access support |
| Location foreground | When nearby value appears | Manual city/address | Medium/high | Avoid background claims if not used |
| Location background | After repeated foreground value | Foreground-only mode | High | Explain persistent benefit and control |
| Notifications | After user subscribes to event/value | In-app inbox/email | Medium | Define channels and quiet controls |
| Contacts | When inviting/importing | Manual invite | High | Avoid bulk upload surprise |
| Tracking/ads ID | Before cross-app tracking | Contextual ads/no personalization | High | Use clear opt-in and data disclosure |

## UX checklist

- Permission inventory includes platform, purpose, data class, fallback, and owner.
- Prompt appears after user intent and before blocked action.
- Pre-prompt copy is short, factual, and value-specific.
- Denied and limited states remain understandable and reversible.
- Settings paths, privacy policy, support macros, and reviewer notes are ready.

## Event schema

Track: `permission_value_moment_reached`, `permission_rationale_shown`, `permission_requested`, `permission_allowed`, `permission_denied`, `permission_limited`, `permission_settings_opened`, `permission_changed`, `permission_fallback_used`, `permission_review_note_added`.

Minimum properties: platform, permission type, feature, prompt version, user intent, prior state, result, fallback, settings path, and reviewer-risk level.
