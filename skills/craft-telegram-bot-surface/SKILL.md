---
name: craft-telegram-bot-surface
description: "Craft a Telegram bot interaction surface with sparse slash menu, layered native keyboards, and Rich Message (sendRichMessage GFM) only—not CLI command sprawl, MarkdownV2, or HTML parse_mode. Use when designing, implementing, reviewing, or hard-cutting Telegram bot commands, keyboards, callback trees, digests/boards, progress text, setMyCommands, forum-topic UX, or message formatting."
---

# Craft Telegram Bot Surface

Build one **Telegram Bot Surface Contract** and (when asked) implement it: sparse
registered slash menu, progressive keyboard trees, **Rich Message** text,
callback protocol, chat/topic context, and verification. Telegram is a chat
surface with native controls — not a shell CLI and not a MarkdownV2 escape job.

## Core laws

1. **Slash commands are sparse entrypoints.** Selection, drill-down, and settings
   are buttons (and other native controls). Do not ship ten top-level slash
   commands because a product has ten query shapes. Telegram only autocompletes
   **top-level** commands (`setMyCommands`); there is no subcommand autocomplete.

2. **All product text is Rich Message.** Send/edit with Bot API Rich Message
   (`sendRichMessage` / `rich_message.markdown`, ordinary Markdown/GFM). Do **not**
   use `parse_mode=MarkdownV2` or classic `parse_mode=HTML` as the product path.
   Agents write GFM (headings, tables, lists, code) — they do not hand-escape
   MarkdownV2.

## Modes

- **Direction** — produce the surface contract only (IA, menu, trees, format, copy).
- **Build / Polish** — implement handlers, keyboards, rich send/edit, registration, tests.
- **Review / Hard-cut** — inventory slash + format sprawl; cut to sparse menu + rich-only.

Default for ambiguous “add Telegram commands” asks: **Direction first**, then
implement only if the user wants code.

## Method

1. **Jobs, not verbs.** List user jobs. Collapse aliases and internal ops.
   Target **≤5** registered slash commands for a focused product bot; ≤8 only
   with written justification. Prefer **3–5**.

2. **Classify every action** into one channel (see
   [references/interaction-primitives.md](references/interaction-primitives.md)):

   | Channel | Use for |
   | --- | --- |
   | Registered slash (`setMyCommands`) | Rare global entrypoints + help |
   | Inline keyboard + `callback_query` | Primary navigation, filters, pickers, confirm |
   | Reply keyboard | Persistent private-chat chrome (use sparingly) |
   | Deep link / start param | Install, share, one-shot bind |
   | Free text / ForceReply | True free-form input only |
   | Web App / login | Heavy forms, payments, authenticated web |

3. **Lock the text format to Rich Message** before writing formatters (see
   [references/rich-message-format.md](references/rich-message-format.md)):
   - Wire: `rich_message: { markdown: "<GFM>" }` via `sendRichMessage` (create)
     and rich `editMessageText` (tree/progress edits).
   - Content: ordinary GFM — tables for boards, list items for hard rows.
   - Forbidden product defaults: MarkdownV2, HTML `parse_mode`, “plain because
     escaping is hard.”
   - On parse failure: rewrite simpler GFM; never “fix” with MarkdownV2 escapes.
   - On capability missing: fail closed / operator-visible — do not celebrate
     lossy HTML success when tables were promised.

4. **Design progressive disclosure.** Every multi-step job is a short tree:
   entry → category → options → result, with **Back** and a stable home footer.
   Prefer **edit** of the same message (rich body + new markup) over flooding.
   Answer every `callback_query` promptly.

5. **Bind context.** Resolve `chat_id`, optional `message_thread_id` (forum
   topics), user, locale, and product defaults **from the message surface**.
   Group and topic bots must not require users to retype context the client has.

6. **Register the menu deliberately.** `setMyCommands` with default + needed
   scopes. Descriptions are user-facing job labels. Never invent nested slash
   syntax in the menu.

7. **Define the callback protocol** before code: stable prefixes, **≤64 bytes**
   `callback_data`, no secrets, server-side resolve of large ids, idempotent
   handlers, stale-button behavior
   ([references/callback-protocol.md](references/callback-protocol.md)).

8. **Write copy for thumbs + rich layout.** Short titles, single-job results,
   GFM tables/lists, footer actions. Product language over storage/API names.

9. **Verify.** Menu registration; each keyboard depth; **rich wire path** (not
   MarkdownV2/HTML success); stale callback; topic routing; empty/error states.
   “Commands registered” or “message sent as HTML fallback” is incomplete.

Full method depth:
[references/telegram-surface-method.md](references/telegram-surface-method.md).

## Slash budget (hard guidance)

| Count | Verdict |
| --- | --- |
| 1–5 | Default healthy product menu |
| 6–8 | Allowed only if each is a distinct **entrypoint job**, not a filter |
| 9+ | Almost always wrong — move filters/lenses/entities into keyboards |
| N commands for N CRUD nouns | CLI smell — redesign as trees |

**Filters, sorts, lenses, entity pickers, subscription modes, and detail views
are buttons or drill-downs, not new slash commands.**

## Anti-patterns (reject)

- Treating Bot API like `argparse` / subcommands as primary UX
- One slash per internal function or DB lens
- Registering every alias in `setMyCommands`
- **`parse_mode=MarkdownV2` or HTML as the product text path**
- Hand-built MarkdownV2 escape tables for agent/product copy
- Silent HTML floor that drops tables/checklists under a rich contract
- Unanswered callbacks, keyboards without Back/Home
- Secrets or huge payloads in `callback_data`
- Dual conflicting boards on one action “to be complete”
- Ignoring `message_thread_id` when the product is topic-scoped

## Output contract

Deliver a **Telegram Bot Surface Contract**:

1. **Jobs** — entry vs drill-down
2. **Slash menu** — final ≤N list, descriptions, scopes
3. **Trees** — keyboard flows with Back/Home
4. **Format** — rich-only GFM wire path; explicit non-use of MarkdownV2/HTML
5. **Callback map** — prefix scheme, payload rules, answer/edit policy
6. **Context rules** — private/group/topic, defaults, permissions
7. **Copy** — help + button labels + sample rich bodies (table/list)
8. **Cut list** — removed slash commands **and** retired format paths
9. **Verification** — menu + tree walk + rich send/edit evidence + topic cases
10. **Residuals** — limits or legacy floors still open (named, not silent)

For Build/Polish, also list files changed, registration path, send/edit helpers,
and test evidence.

## Boundaries

- Owns **Telegram-native interaction IA, Rich Message text craft, and keyboard
  implementation patterns**.
- Does not own channel runtime ownership, webhook cutover, or bot-token custody.
- Does not own generic web/mobile UI (`craft-product-interface`) or whole-product
  design (`design-product`).
- Does not invent product metrics or domain truth — only how they are reached and
  rendered on Telegram.
- Spiron/agent bots that accept free-form chat still keep a **sparse** system
  slash surface; free text is the agent path, still delivered as **Rich Message**.

## Progressive disclosure

- [references/telegram-surface-method.md](references/telegram-surface-method.md) — full method, limits, migration, verification
- [references/rich-message-format.md](references/rich-message-format.md) — Rich Message wire, GFM rules, failure policy
- [references/interaction-primitives.md](references/interaction-primitives.md) — when to use each Telegram control
- [references/callback-protocol.md](references/callback-protocol.md) — callback_data design and handler rules
