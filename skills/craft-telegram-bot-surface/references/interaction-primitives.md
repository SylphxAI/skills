# Telegram interaction primitives

Open when choosing **which native control** carries a job.

## Registered slash commands

**API:** `setMyCommands` / `getMyCommands` / `deleteMyCommands`; optional BotCommandScope.

**Good for:**
- Global entry: help, home/board, start onboarding, open browse, open settings
- Rare system jobs that must be typeable without a message footer
- Discoverability when the user types `/`

**Bad for:**
- Filters (edge vs p, sort, date range)
- Entity selection (course, race, user, file)
- Multi-step wizards
- Everything “we might need someday”

**Limits / facts:**
- Menu shows **top-level** commands only — no nested autocomplete
- Keep the visible menu short; long menus are scrolled and ignored
- Command name: 1–32 chars, lowercase letters/digits/underscore
- Description: short user-facing job phrase
- Scope menus when private vs group vs admin differ

## Inline keyboard + callback_query

**Primary progressive-disclosure tool.** Buttons under a message; taps emit
`callback_query` with `data` (or open URL / Web App / switch-inline).

**Good for:**
- Navigation trees (category → item → detail)
- Mode pickers (lens, cadence, confirm/cancel)
- Footers on digests and results (secondary jobs one tap away)
- Pagination and “more”

**Rules:**
- Prefer **edit** of the same message for tree navigation
- Always `answerCallbackQuery` (empty ok; short toast for errors)
- Every non-terminal panel needs **Back** or **Home**
- Label buttons with outcomes users understand, not storage enums

## Reply keyboard (custom keyboard)

Replaces the user’s text keyboard with fixed labels; sends ordinary text
messages when tapped.

**Good for:** persistent private-chat chrome for a small set of frequent actions.

**Bad for:** group chats (noisy), deep trees, per-message contextual actions
(use inline), or anything that should not pollute chat history as plain text.

Prefer inline keyboards for product bots unless private-chat chrome is a
deliberate product choice. Always offer a way to remove the reply keyboard.

## ForceReply / free text

Use only when the user must supply unconstrained content (search string, note,
code). After capture, return to buttons. Do not design the main IA as “remember
twelve slash forms.”

## Deep links (`t.me/bot?start=payload`)

**Good for:** share links, install attribution, binding a resource once.

**Bad for:** everyday navigation that should be a button tree inside chat.

Payload is limited and public to the client path — never secrets.

## Web Apps / Login Widget

Use when the job exceeds chat density (tables, multi-field forms, OAuth,
checkout). Keep Telegram entry sparse: one slash or button opens the Web App.

## Message context as input

Before adding a parameter, check whether Telegram already provides it:

- `chat.id`, `from.id`
- `message_thread_id` for forum topics
- reply-to message for “act on this”
- callback-bearing message for “continue this tree”

Topic-scoped products should key subscriptions and defaults by
`(chat_id, message_thread_id)` when the user acts inside a topic.

## Choosing quickly

```text
Is it a rare global entry job?          → slash (budgeted)
Is it choose-from-known-options?       → inline keyboard tree
Is it persistent private chrome?       → reply keyboard (maybe)
Is it unconstrained text?              → ForceReply / plain text once
Is it heavy form or auth web?          → Web App
Is it share/install bind?              → deep link
Would CLI people add a flag/subcommand?→ almost always a button, not a slash
```


## Ephemeral replies (Bot API 10.2+)

**Good for:** group personal help, settings, errors, per-user status — only the
invoking user (and bot) should see them.

**Bad for:** shared digests, public tips, anything others must audit in-chat.

See [platform-2026.md](platform-2026.md) before implementing.

## Guest mode (Bot API 10.0+)

**Good for:** @summon helpers without adding the bot to the group.

**Bad for:** products that need history, membership, or continuous presence.

See [platform-2026.md](platform-2026.md).
