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
3. **Server-side secrets.** Keep tokens, signed session material, personal data,
   and authorization material on the server. Authorize from chat and user context.
4. **Idempotent handlers.** Make double-taps and replays converge to one
   subscription, charge, or state transition through upserts and explicit disable paths.
5. **Stale UI.** If the probe/data epoch changed, edit with a clear “refresh”
   state or rebuild the keyboard with a visible refresh result.
6. **Handle parse errors.** Unknown prefix → toast + optional home keyboard,
   followed by a normal webhook response.
7. **Thread continuity.** When editing or replying, preserve
   `message_thread_id` if the original interaction was in a topic.
8. **Answer policy.**
   - Navigation success: `answerCallbackQuery` with empty text
   - Validation error: short `text` (and `show_alert` only for hard blocks)
   - Long results: edit or send the message body; reserve the toast for a short status

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
5. “Manage” lists current state as buttons under the existing settings entry

Register the user job once and express lens, cadence, and enabled state through the keyboard tree.

## Security / tenancy

- Resolve authorization from bot membership, chat admin rules, and the product ACL.
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
