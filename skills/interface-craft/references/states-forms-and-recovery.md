# States, Forms, and Recovery

Good interface quality is state quality. Model the states that the system can actually enter, the transition that caused each one, what truth is known, what the user retains, and how they continue.

## State taxonomy

| State | Must communicate | Useful action |
| --- | --- | --- |
| First use | what belongs here and why it is valuable | create, import, connect, or view an example |
| Empty | the collection has no items | add the first valid item |
| Zero result | filters/query produced no match | preserve query; adjust or clear filters |
| Loading | what is pending; stable expected shape | wait, cancel, or leave safely as duration warrants |
| Partial | what loaded and what did not | continue with available data or retry failed region |
| Offline | cached truth, queued work, unavailable actions | retry, edit safely, or inspect sync status |
| Permission blocked | required access, reason, and fallback | grant contextually, choose alternate path, or continue with limits |
| Error | what failed and known cause | correct, retry, recover, or contact support with useful context |
| Success | durable result and destination | continue, view, undo, or close |
| Destructive | exact scope and consequence | cancel, confirm, export, undo, or restore where feasible |

Do not collapse “no data,” “no result,” permission denial, offline, and server failure into one generic blank state.

## Transition model

Use the smallest truthful state machine for each submitted or saved action:

```text
idle -> editing -> validating -> submitting -> succeeded
                    |              |
                    v              v
              correctable     retryable | terminal

succeeded -> undoing -> restored        (when reversal is supported)
offline editing -> queued -> syncing -> synced | conflict | failed
```

Optimistic UI may show intent early, but it must distinguish pending from durable success and reconcile rejection. Disable or idempotently guard duplicate expensive actions. Never erase valid input because a network, permission, validation, or authentication transition failed.

## Form rules

- `ic-form-1` — Ask only for data needed for the user’s current goal; explain sensitive or surprising fields before collection.
- `ic-form-2` — Programmatically associate labels, controls, descriptions, and errors. Placeholder text is not a label.
- `ic-form-3` — Validate at the least disruptive truthful time: format guidance during entry only when stable, field errors on blur or submit, and server truth after submission.
- `ic-form-4` — Focus or summarize the first actionable error, retain every valid value, and state how to correct the problem without relying on color.
- `ic-form-5` — Preserve IME composition, paste, autocomplete, password managers, mobile keyboards, scanning, and long localized input.
- `ic-form-6` — Make Enter context-aware: submit a single-line form, insert a newline in multiline input, or choose the active combobox option.
- `ic-form-7` — Provide save/resume or draft recovery when the flow is long, interruption-prone, high-value, or cross-device.
- `ic-form-8` — Confirm high-risk actions using the exact object and consequence; add audit, reversal, or support paths proportional to risk.
- `ic-form-9` — Keep long values editable: preserve caret visibility, selection, scrolling, wrapping, and access to meaningful starts and ends instead of clipping input into an unrecoverable region.
- `ic-form-10` — Offer paste or scan helpers only where pasting is a frequent valid path, such as invite codes, URLs, tokens, addresses, or recovery codes; never block ordinary paste.
- `ic-form-11` — A disabled control explains the unmet requirement in nearby accessible text; use validation or progressive disclosure instead when disabling would create a silent dead end.

## Permission and education rules

- Ask for permission at the value moment, not at launch merely because the platform permits it.
- Separate required from optional access and show the real fallback before asking.
- After denial, explain how to restore access without repeated nagging or a dead end.
- Use the lightest education that solves observed confusion: inline cue, example, contextual tip, walkthrough, or retained help.
- Persist dismissal, completion, and snooze state. Expert users must be able to skip and later recover guidance.
- Do not disguise upsells as education or use onboarding to compensate for broken information architecture.

## Recovery checklist

- Loading geometry matches final content closely enough to prevent layout shift.
- Noticeable waits state what is happening; long operations expose progress, cancel/background behavior, status recovery, and safe re-entry where possible.
- Background status uses ambient updates rather than blocking modal interruptions.
- Incremental or live content never steals focus. Preserve the user's reading position; auto-follow only while the user explicitly enabled it or remains at the live edge, and pause after manual navigation. When arrivals are buffered or hidden, indicate them without repetitive announcements. Preserve the item being inspected and reconcile late or reordered updates against system truth.
- Error copy distinguishes user-correctable, retryable, permission, conflict, authentication, capacity, and terminal failure.
- Retry is idempotent or duplicate-safe. Offline queues show pending, syncing, conflict, failed, and synced truth.
- Success confirms the durable outcome rather than simply disappearing.
- Destructive work has consequence clarity and recovery proportional to irreversibility.
- Support/debug context is useful but contains no secrets, personal data, raw stack traces, or internal identifiers unsafe for the user.

Instrument state exposure, recovery action, completion, abandonment, and repeated failure only with approved privacy-safe analytics. Never infer product satisfaction merely from the absence of an error.
