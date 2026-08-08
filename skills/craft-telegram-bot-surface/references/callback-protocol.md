# Callback protocol

Open when defining or reviewing `callback_data` and `callback_query` handlers.

## Hard limits

- `callback_data`: **1–64 bytes** (not characters — count UTF-8 bytes)
- Button text: keep short; Telegram truncates long labels poorly on mobile
- Inline keyboard: keep rows scannable (often 1–4 buttons per row)
- Answer `callback_query` quickly or the client shows a spinner/error

## Design rules

1. **Structured prefixes.** Use a stable grammar, e.g. `nav|soon`,
   `race|c|<course_key>`, `follow|on|<lens>|<mode>|<mins>`.
2. **Opaque small ids.** Prefer short server-side keys over full names/URLs.
   If a real id does not fit in 64 bytes, store a handle and resolve server-side.
3. **No secrets.** Tokens, signed session material, PII, or authz proofs do not
   belong in `callback_data`. Authorize on the server from chat/user context.
4. **Idempotent handlers.** Double-taps and replays must not double-subscribe,
   double-charge, or corrupt state. Prefer upserts and explicit disable paths.
5. **Stale UI.** If the probe/data epoch changed, edit with a clear “refresh”
   state or rebuild the keyboard; do not silently no-op.
6. **Fail closed on parse errors.** Unknown prefix → toast + optional home
   keyboard. Never crash the webhook.
7. **Thread continuity.** When editing or replying, preserve
   `message_thread_id` if the original interaction was in a topic.
8. **Answer policy.**
   - Navigation success: `answerCallbackQuery` with empty text
   - Validation error: short `text` (and `show_alert` only for hard blocks)
   - Long results: edit/send message body; do not stuff content into the toast

## Edit vs new message

| Situation | Prefer |
| --- | --- |
| Same tree step (picker → child picker) | `editMessageText` + new markup |
| Terminal rich result user may want to keep | New message, keep footer |
| Destructive confirm | Edit or new; require explicit confirm button |
| Broadcast/digest | New message with footer keyboard |

## Subscription / settings pattern

Canonical progressive pattern:

1. Entry slash or footer button → root settings keyboard  
2. Pick dimension (e.g. lens)  
3. Pick mode (realtime / interval / off)  
4. Confirm by executing + short success message  
5. “Manage” lists current state as buttons, not a new slash family  

Do **not** register `/subscribe_edge_30m`, `/unsubscribe_p`, etc.

## Security / tenancy

- Resolve authorization from bot membership, chat admin rules, and product ACL —
  not from the callback string alone.
- Group callbacks may be pressed by any member who sees the message; design for
  that or restrict via server checks.
- Rotate protocol version in the prefix (`v2|...`) only when old messages may
  still be tappable and semantics changed.

## Test matrix (minimum)

- Each prefix happy path
- Truncation / oversize data rejected at build time of keyboard
- Unknown prefix
- Double tap
- Missing permission
- Topic vs general chat
- Empty underlying data (no races, no subs)
