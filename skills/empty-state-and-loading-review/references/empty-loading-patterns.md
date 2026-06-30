# Empty State And Loading Patterns

## State taxonomy

| State | User question | Product answer |
| --- | --- | --- |
| First-use empty | What is this for? | Explain value and first action |
| Zero-result | Did my filter/search fail? | Show criteria, alternatives, reset path |
| Permission-blocked | Why is this unavailable? | Explain permission value and recovery path |
| Loading | Is something happening? | Preserve layout and show truthful progress |
| Partial loading | Can I use what is ready? | Render available content and isolate pending areas |
| Offline | Can I continue? | Show cached/queued behavior and retry path |
| Error | What broke and what now? | Explain recovery and support route |
| Completed | What happens next? | Confirm completion and next best action |

## Rule IDs

- `empty-loading-1` — Every empty state needs a cause, value reminder, and next best action.
- `empty-loading-2` — First-use empty states should teach the core loop without becoming onboarding bloat.
- `empty-loading-3` — Zero-result states should preserve user intent by showing the query/filter and offering edits or reset.
- `empty-loading-4` — Loading states should maintain layout stability and avoid blank pages for known structures.
- `empty-loading-5` — Skeletons must approximate final content shape; mismatched skeletons reduce trust.
- `empty-loading-6` — Long operations need progress, cancellation, backgrounding, or status recovery.
- `empty-loading-7` — Offline states should distinguish read-only cache, queued writes, unavailable actions, and retry.
- `empty-loading-8` — Error states should include a recovery path, support/debug ID when useful, and no blameful copy.
- `empty-loading-9` — Empty states in monetization/support contexts must disclose consequences, not distract.
- `empty-loading-10` — Instrument state exposure and recovery, not just success paths.

## Event schema

Track: `state_shown`, `empty_primary_action_clicked`, `empty_secondary_action_clicked`, `loading_started`, `loading_completed`, `loading_timeout`, `offline_state_shown`, `retry_clicked`, `error_state_shown`, `support_from_error_opened`.

Important properties: `surface`, `state_type`, `cause`, `query_or_filter_present`, `duration_bucket`, `retry_count`, `network_state`, `error_code_family`, `recovery_available`.

## Copy pattern

Use: plain diagnosis, user impact, next action.

```text
No invoices match "June".
Try a different month or clear filters to see all invoices.
```

Avoid: jokes, vague apologies, fake certainty, or dead-end messages.
