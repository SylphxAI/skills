# Rich Message format

Open when choosing Telegram text wire format, writing digests/boards/progress
copy, or reviewing `parse_mode` / escape helpers.

## Product contract

Send durable Telegram product text through Rich Message with ordinary
Markdown/GFM content.

| Need | Product path |
| --- | --- |
| Create text | `sendRichMessage` with `rich_message.markdown` |
| Author content | Ordinary Markdown/GFM |
| Edit text or progress | `editMessageText` with the same `rich_message` shape |
| Structured boards | Tables, task lists, headings, code, and links |

Bot API 10.1+ Rich Message is the product text path. Media captions and other
Telegram object types keep their documented format contract.

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
  the same `rich_message` object
- **Private streaming preview:** `sendRichMessageDraft`; draft tags such as
  `tg-thinking` stay on this preview path, while durable sends use ordinary GFM

Optional rich input flags (when the API/client supports them): `is_rtl`,
`skip_entity_detection`. Set these from the product's locale and content policy.

## Agent-facing content contract

Authors write **ordinary Markdown/GFM**:

- `#` / `##` headings
- `**bold**`, `*italic*`, `` `code` ``, fenced code
- pipe tables (primary board layout when columns matter)
- lists / task lists (`- [ ]` / `- [x]`)
- blockquotes, normal links
- hard structure for rows that need stable visual separation (see quirks)

Escape Markdown punctuation in dynamic user/domain strings before interpolating
them into GFM markup.

## Rendering behavior

1. **Soft newlines can collapse.** A single `\n` may leave text on one visual row.
   Prefer: markdown list items, tables, blank lines, or explicit hard-break
   patterns the product already verified on Telegram.
2. **Tables render as real tables** under Rich Message. Use them for boards
   whose columns matter.
3. **Raw tags follow the documented Rich Message set.** Sanitize at one adapter
   boundary and allow the documented tags the product relies on. Write ordinary
   Markdown characters in rich content.
4. **Groups and private chats.** Use the same rich path everywhere the bot
   speaks so formatting behavior stays consistent.
5. **Topic continuity.** Pass `message_thread_id` on rich send/edit. When the
   topic is missing, apply the product's topic fallback while preserving the
   rich payload.

## Failure policy

| Failure class | Correct response |
| --- | --- |
| Transport / 5xx / timeout | Retry **same** rich payload |
| Content or entity parse error | Bounded ordinary-GFM rewrite that simplifies the markup |
| `rich_message is not supported` / capability off | Return an operator-visible unsupported-capability result |
| Thread missing | Topic fallback policy; keep rich format |

The adapter returns a truthful delivery result. A successful structured-text
send means the Rich Message path accepted the requested structure.

## Copy / layout patterns

- One digest or board per logical run when possible
- Title heading + short context line + table or structured list + footer keyboard
- Product labels in the user language; translate storage enums into product copy
- Truncate long bodies with a clear “more” button or pagination path

## Verification

- Wire tests or logs show `sendRichMessage` or rich edit with
  `rich_message.markdown`
- Board with a pipe table renders as a table on a real client (or mocked body
  asserts `rich_message.markdown`)
- Progress and edit paths preserve the same rich structure

## Boundaries

- Media captions use their Telegram object contract.
- Other channels keep their own format contracts, such as web HTML or Slack
  text. This reference governs Telegram product text.
