# Social Inbox Quote/Share Pre-Flight Extraction, Web-UI Triple-Lock, and Checkout Operations

This reference accompanies [ambassador](../SKILL.md). It specifies the mandatory pre-flight extraction gate for quoted messages, shared post cards, and media attachments on social messaging channels (`shares`, `attachments`, `reply_to`), the active-bubble-bound Web-UI DOM fallback contract, and the 12-case positive/negative regression verification matrix.

## 1. Mandatory Quote, Share, Post-Card, and Attachment Pre-Flight Extraction

When polling or pre-flight reading a social messaging thread before drafting or dispatching any reply, never fetch only `messages{id,created_time,from,message,attachments}` and never collapse attachments or shared post cards to a bare count (`[att=1]`).

### 1.1 Graph API Field Contract and 4-Part Context Reconstruction

Every conversation/message read MUST request:

```text
shares{id,name,description,link},attachments{id,name,description,mime_type,render_as_sticker,sticker_id,image_data,file_url},reply_to
```

`extract_message_quote_and_media_context(msg, thread_messages=..., target_sender_id=..., message_fetcher=...)` reconstructs four mandatory components:

1. **Shared post cards (`shares`):** Extract `id`, `name`, `description`, and `link`, preserving the full post caption/question text with safe priority fallback when either `name` or `description` is omitted.
2. **Attachments and stickers (`attachments`):** Preserve every attachment item (never truncating to `len(attachments)`), distinguish stickers (`render_as_sticker` / `sticker_id`) from regular media/files, and resolve each media URL using the bidirectional fallback priority `image_data.url -> file_url -> image_data.preview_url`.
3. **Multi-hop `reply_to` chains and off-page single-message resolution (`message_fetcher`):**
   - Traverse `reply_to.mid` across multi-hop nested replies (`leaf -> mid -> root`).
   - **Off-page `reply_to` single-message resolution:** When a referenced `reply_to.mid` target is absent from the current `thread_messages` page (for example, an older prompt or post beyond the latest page window), `extract_message_quote_and_media_context(..., message_fetcher=...)` MUST resolve the target via a single-message Graph fetcher (`GET /{mid}?fields=id,created_time,from,message,shares{id,name,description,link},attachments{...},reply_to`) and tag the hop `resolved_via: "single_message_fetch"`.
4. **Same-sender split-bubble companion shares/attachments (`<= 120s`):**
   - When a user shares an interactive post card or image at `T` and sends a short follow-up bubble (such as a single-letter quiz choice `"A"` / `"B"` / `"C"` / `"D"`) at `T+1s`, bind the preceding companion share/attachment bubble only when it has the **exact same `sender_id`** (`target_sender_id`) and falls within a tight timestamp delta (`0 <= delta <= 120s`), preventing cross-sender contamination or stale-card binding.

### 1.2 Fail-Closed Unresolved Quote Preflight Gate (`assert_quote_context_resolved`)

Before any outbound reply is generated or sent, run `assert_quote_context_resolved(ctx_or_str)` as a fail-closed preflight gate:
- If `reply_to.mid` cannot be resolved from either `thread_messages` or `message_fetcher(mid)`, `extract_message_quote_and_media_context` sets `has_unresolved_quote = True` and emits an explicit `[REPLY_TO mid=<mid> unresolved]` marker in `rendered_context`.
- `assert_quote_context_resolved(ctx_str)` MUST fail closed (raising `RuntimeError` / `ValueError`) whenever `has_unresolved_quote` is true or any `[REPLY_TO ... unresolved]` marker remains, ensuring the responder never guesses or replies as if an unreadable quoted message were understood.

## 2. Active-Bubble-Bound Web-UI DOM Share Preview Selection

When an outside-24h messaging-window refusal (`#10`) routes through the platform's authenticated inbox Web-UI fallback:
1. **Triple-Lock Recipient Verification:** Hold a single-writer profile lock (`flock`), navigate directly by thread ID, and verify before send that the URL `thread_id` (`expectedSelectedId`), active pane header display name (`expectedHeader`), and target inbound message match the case.
2. **Active-Bubble-Bound DOM Share Preview Selection (`build_webui_triple_lock_js(expected_inbound_mid, expected_author)`):**
   - Never scrape the last `N` generic card nodes across the entire thread DOM, which leaks stale historical post cards or another user's shared cards into the current turn.
   - `build_webui_triple_lock_js(expected_inbound_mid, expected_author)` MUST locate the exact active reply target bubble (`expected_inbound_mid` and `expected_author`, or the last inbound bubble from `expected_author`) and extract `dom_share_previews` (`active_bubble_bound: true`, `bound_message_id`) **exclusively** from that active message row and its immediate preceding companion sibling row from the **same author** (`previousElementSibling` with matching `data-author`), strictly excluding older thread cards and other-author rows.

## 3. 12/12 Positive and Negative Regression Verification Matrix

Implementations of the quote/share/attachment extractor and Web-UI fallback must pass all 12 deterministic positive and negative regression cases before deployment:

| Case | Scenario | Input Fixture | Expected Invariant / Verdict |
| --- | --- | --- | --- |
| **Case 1** | Graph field contract & Web-UI triple-lock JS builder | `GRAPH_MESSAGE_FIELDS` + `build_webui_triple_lock_js` | Includes `shares{id,name,description,link}`, `attachments{...,image_data,file_url}`, `reply_to`, `dom_share_previews`, `active_bubble_bound`, and `expectedInboundMid`. |
| **Case 2** | Plain-text message (`no_share`) | Plain text bubble with no `shares`, `attachments`, or `reply_to` | `has_quote_or_media = False`, `has_unresolved_quote = False`, `assert_quote_context_resolved` passes. |
| **Case 3** | Split-bubble companion share + short quiz answer (`"A"`) | User sends shared quiz post card at `T` and `"A"` at `T+1s` (same `sender_id`) | Legacy `[att=1]` preview loses the post; `extract_message_quote_and_media_context` binds `[SHARE id=...]` with full quiz title, options, and link. |
| **Case 4** | Multiple attachments preserved | Message with `2+` image attachments | Preserves all attachment entries and media URLs in order; never collapses to `[att=2]`. |
| **Case 5** | Missing `name` or `description` fallback on share card | Share card with `description` only, and share card with `name` only | Preserves whichever text field is present without dropping the share card or emitting `None`. |
| **Case 6** | Bidirectional media URL fallback (`image_data.url` vs. `file_url`) | Attachment with `image_data.url` only, and attachment with `file_url` only | Resolves `media_url` via `image_data.url -> file_url -> image_data.preview_url` for both entries. |
| **Case 7** | Non-share regular attachment vs. sticker classification | Sticker (`render_as_sticker = True`) + regular receipt image (`render_as_sticker = False`) | Emits `[STICKER id=...]` for stickers and `[ATTACHMENT id=... name=... desc=... url=...]` for regular files/images. |
| **Case 8** | Imageless share card | Shared post card with `name`, `description`, `link` and no `attachments` | Sets `has_quote_or_media = True` and renders full shared post text and link with `attachments = []`. |
| **Case 9** | Multi-hop nested `reply_to` chain + cross-sender isolation | 2-hop `leaf -> mid -> root` chain + an interleaved share from `p_OTHER_999` (`1s` earlier) | Reconstructs both `reply_to` hops in order while strictly excluding `p_OTHER_999`'s share card. |
| **Case 10** | Off-page `reply_to.mid` resolved via `message_fetcher` | Inbound reply quoting `m_older_offpage_parent` absent from `thread_messages` page | Invokes `message_fetcher(mid)` (`GET /{mid}?fields=...`), resolves parent message + embedded share (`resolved_via = "single_message_fetch"`), and passes `assert_quote_context_resolved`. |
| **Case 11** | Unresolved `reply_to.mid` blocked fail-closed by `assert_quote_context_resolved` | Inbound reply quoting missing `m_missing_parent_999` where `message_fetcher` returns `None` | Sets `has_unresolved_quote = True`, marks `[REPLY_TO mid=... unresolved]`, and `assert_quote_context_resolved` raises fail-closed error (`BLOCKED BY Unresolved Quote Gate`). |
| **Case 12** | Active-bubble-bound Web-UI DOM selection excluding older/other-user share cards | Synthetic DOM with stale older card (`m_old_stale_1`), other-user card (`m_other_user_2`), active companion share (`m_active_share_99`), and active text bubble (`m_active_100`) | Returns `TRIPLE_LOCK_PASSED`, `active_bubble_bound = True`, `bound_message_id = "m_active_100"`, extracts only the active companion share card, and excludes stale/other-user cards. |
