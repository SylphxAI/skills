# Rich Message format (required)

Open when choosing Telegram text wire format, writing digests/boards/progress
copy, or reviewing `parse_mode` / escape helpers.

## Law

**Product Telegram text is Rich Message only.**

| Do | Do not |
| --- | --- |
| `sendRichMessage` with `rich_message.markdown` | `parse_mode=MarkdownV2` |
| Ordinary **Markdown / GFM** as content | Hand-escaping MarkdownV2 entities |
| Edit via `editMessageText` + `rich_message` | `parse_mode=HTML` as the product success path |
| Tables, task lists, headings, code, links | Building boards as plain monospace because “HTML is safer” |

Bot API 10.1+ Rich Message is the current native path. MarkdownV2 and classic
HTML `parse_mode` are **legacy residual**, not the default craft.

## Wire shape

```json
{
  "chat_id": "<id>",
  "rich_message": { "markdown": "# Title\n\n| a | b |\n| --- | --- |\n| 1 | 2 |\n" },
  "reply_markup": { "inline_keyboard": [] },
  "message_thread_id": 123
}
```

- **Create:** `sendRichMessage`
- **Edit tree / progress:** `editMessageText` (or product edit helper) carrying
  the same `rich_message` object — not a MarkdownV2 string + `parse_mode`
- **Private streaming preview only:** `sendRichMessageDraft` (draft-only tags
  such as `tg-thinking` stay on the draft path; durable sends must not rely on
  them)

Optional rich input flags (when the API/client supports them): `is_rtl`,
`skip_entity_detection`. Prefer product defaults; do not invent flags per talent.

## Agent-facing content contract

Authors (humans or agents) write **ordinary Markdown/GFM**, not provider wire
escape soup:

- `#` / `##` headings
- `**bold**`, `*italic*`, `` `code` ``, fenced code
- pipe tables (primary board layout when columns matter)
- lists / task lists (`- [ ]` / `- [x]`)
- blockquotes, normal links
- hard structure for rows that must not collapse (see quirks)

Dynamic user/domain strings still need **GFM-safe escaping of markdown
punctuation** when interpolated into markup — that is ordinary MD hygiene, not
MarkdownV2 entity encoding.

## Quirks that break “looks fine in GitHub”

1. **Soft newlines can collapse.** A single `\n` may not force a visual row.
   Prefer: markdown list items, tables, blank lines, or explicit hard-break
   patterns the product already verified on Telegram.
2. **Tables render as real tables** under Rich Message — use them for boards.
   Falling back to HTML often **cannot** preserve tables; silent HTML floor
   under a table-capable contract is an anti-pattern.
3. **Unsupported raw HTML tags** can reject the whole message. Sanitize at one
   adapter chokepoint; allow only documented rich/official tags the product
   relies on. Never inject HTML entities into rich markdown (they display
   literally).
4. **Groups vs private.** Prefer the same rich path everywhere the bot speaks;
   legacy Markdown `parse_mode` often shows raw `*bold*` / `` `code` `` in groups.
5. **Topic continuity.** Pass `message_thread_id` on rich send/edit; on
   `message thread not found`, product policy may retry without thread — do not
   change format to HTML because of thread errors.

## Failure policy

| Failure class | Correct response |
| --- | --- |
| Transport / 5xx / timeout | Retry **same** rich payload |
| Content parse / “can't parse entities” | Bounded **ordinary GFM rewrite** (simplify markup); never “fix” by MarkdownV2 escaping |
| `rich_message is not supported` / capability off | Fail closed or operator-visible residual — do not celebrate lossy HTML as success when tables/checklists were promised |
| Thread missing | Topic fallback policy; keep rich format |

**Do not** teach agents: “if rich fails, always send HTML.” If a temporary
compat floor exists in a legacy codebase, label it residual, measure when it
fires, and hard-cut it when the Bot API path is available.

## Copy / layout patterns

- One digest/board per logical run when possible (anti-spam)
- Title heading + short context line + table or structured list + footer keyboard
- Product labels in the user language; storage enums stay off-wire
- Truncate long bodies with an honest “more” path (button or pagination), not a
  second formatting mode

## Verification

- Wire tests or logs show `sendRichMessage` / rich edit, **not**
  `parse_mode=MarkdownV2` or default HTML success
- Board with a pipe table renders as a table on a real client (or mocked body
  asserts `rich_message.markdown`)
- No agent-facing docs that prescribe MarkdownV2 escape tables for Telegram
- Progress/edit paths also rich-only when they show structured text

## Boundaries

- Captions on media may still be plain or a narrower residual — do not silently
  expand this into “HTML is fine for all text.”
- Non-Telegram channels keep their own format contracts (web HTML, Slack plain,
  etc.). This reference is **Telegram product text**.
