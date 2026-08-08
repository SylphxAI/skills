---
name: craft-telegram-bot-surface
description: "Craft a Telegram bot interaction surface with sparse slash menu and layered native keyboards (not CLI command sprawl). Use when designing, implementing, reviewing, or hard-cutting Telegram bot commands, BotFather/setMyCommands menus, inline/reply keyboards, callback trees, forum-topic UX, or when an agent is about to add many slash commands for one product job."
---

# Craft Telegram Bot Surface

Build one **Telegram Bot Surface Contract** and (when asked) implement it: sparse
registered slash menu, progressive keyboard trees, callback protocol, chat/topic
context, and verification. Telegram is a chat surface with native controls — not
a shell CLI.

## Core law

**Slash commands are sparse entrypoints. Selection, drill-down, and settings are
buttons (and other native controls).** Do not ship ten top-level slash commands
because a product has ten query shapes.

Telegram only autocompletes **top-level** commands (`setMyCommands`). There is
no subcommand autocomplete. A long slash list is a bad IA, not a flexible API.

## Modes

- **Direction** — produce the surface contract only (IA, menu, trees, copy).
- **Build / Polish** — implement handlers, keyboards, registration, tests in the
  target repo.
- **Review / Hard-cut** — inventory current slash surface; cut sprawl; prove the
  new tree.

Default for ambiguous “add Telegram commands” asks: **Direction first**, then
implement only if the user wants code.

## Method

1. **Jobs, not verbs.** List user jobs (e.g. “see today’s board”, “open one
   race”, “subscribe this topic”). Collapse aliases and internal ops into jobs.
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

3. **Design progressive disclosure.** Every multi-step job is a short tree:
   entry → category → options → result, with **Back** and a stable home footer.
   Prefer **editMessageText** + new markup over flooding new messages for the
   same navigation episode. Answer every `callback_query` promptly.

4. **Bind context.** Resolve `chat_id`, optional `message_thread_id` (forum
   topics), user, locale, and product defaults **from the message surface**, not
   from extra slash flags when a button tree can carry the choice. Group and
   topic bots must not require users to retype context the client already has.

5. **Register the menu deliberately.** `setMyCommands` with default + needed
   scopes (`all_private_chats`, `all_group_chats`, chat-specific). Descriptions
   are user-facing job labels, not internal flag names. Never invent fake
   nested slash syntax in the menu.

6. **Define the callback protocol** before code: stable prefixes, versioning if
   long-lived, **≤64 bytes** `callback_data`, no secrets, server-side resolve of
   large ids, idempotent handlers, stale-button behavior.

7. **Write copy for thumbs.** Short titles, explicit single-lens or single-job
   results, footer actions. Prefer product language over storage/API names.
   Put long reference text behind a button, not ten slash entries.

8. **Verify.** Register menu; exercise slash, each keyboard depth, stale
   callback, topic routing, permission failures, empty/loading states. Treat
   “commands registered” as incomplete without a walk of the button tree.

Full decision tables, limits, anti-patterns, and a worked shape:
[references/telegram-surface-method.md](references/telegram-surface-method.md).

## Slash budget (hard guidance)

| Count | Verdict |
| --- | --- |
| 1–5 | Default healthy product menu |
| 6–8 | Allowed only if each is a distinct **entrypoint job**, not a filter |
| 9+ | Almost always wrong — move filters/lenses/entities into keyboards |
| N commands for N CRUD nouns | CLI smell — redesign as trees |

**Filters, sorts, lenses, entity pickers, subscription modes, and “why/detail”
views are buttons or drill-downs, not new slash commands.**

## Anti-patterns (reject)

- Treating Bot API like `argparse` / subcommands (`/foo bar baz` as primary UX)
- One slash per internal function or DB lens
- Registering every alias in `setMyCommands`
- Deep links or long typed IDs when a 2–3 tap tree exists
- Unanswered callbacks, silent no-ops, or keyboards without Back/Home
- Putting secrets or huge payloads in `callback_data`
- Dual conflicting boards/results on one action “to be complete”
- Group bots that ignore `message_thread_id` when the product is topic-scoped

## Output contract

Deliver a **Telegram Bot Surface Contract**:

1. **Jobs** — user jobs and which are entry vs drill-down
2. **Slash menu** — final ≤N list with descriptions and scopes
3. **Trees** — keyboard flows (entry → steps → terminal), including Back/Home
4. **Callback map** — prefix scheme, payload rules, answer/edit policy
5. **Context rules** — private/group/topic, defaults, permissions
6. **Copy** — help text and button labels in product language
7. **Cut list** — removed/merged slash commands and why
8. **Verification** — registration + tree walk + empty/error/topic cases
9. **Residuals** — platform limits or product rules still open

For Build/Polish, also list files changed, registration path, and test evidence.

## Boundaries

- Owns **Telegram-native interaction IA and implementation patterns**.
- Does not own channel runtime ownership, webhook cutover, or bot-token custody
  (product/infra repos and ops skills).
- Does not own generic web/mobile UI (`craft-product-interface`) or whole-product
  design (`design-product`).
- Does not invent product metrics, pricing, or domain truth — only how they are
  reached on Telegram.
- Spiron/agent bots that must accept free-form chat still keep a **sparse**
  system slash surface for true system jobs; free text is the agent path, not an
  excuse for slash sprawl.

## Progressive disclosure

- [references/telegram-surface-method.md](references/telegram-surface-method.md) — full method, limits, migration, verification
- [references/interaction-primitives.md](references/interaction-primitives.md) — when to use each Telegram control
- [references/callback-protocol.md](references/callback-protocol.md) — callback_data design and handler rules
