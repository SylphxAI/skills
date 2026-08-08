# Telegram surface method (depth)

Open when designing a full bot surface, migrating slash sprawl, or verifying IA.

## 1. Inventory

List every current or proposed user-visible action:

- slash commands (registered and unregistered aliases)
- inline/reply buttons
- free-text parsers
- deep links
- admin-only paths

Tag each: **entrypoint job**, **filter/lens**, **entity pick**, **settings**,
**admin/system**, **legacy alias**.

## 2. Compress to jobs

Rewrite the inventory as **user jobs**. Merge:

- synonyms (`/today` + `/board`)
- lens pairs that are the same board with a toggle (`/edge` + `/p` → one board
  entry + 機會/價值 buttons)
- CRUD command families (`/subscribe*`, `/unsubscribe*`, `/subscriptions` → one
  `/follow` + tree)

## 3. Allocate channels

Apply [interaction-primitives.md](interaction-primitives.md). Default allocation:

```text
Slash (≤5):     home/board | browse | follow/settings | help [| soon/urgent]
Buttons:        lenses, modes, entity drill-down, score, manage, confirm
Free text:      optional search after browse entry only
Deep link:      share/install only
```

**Worked shape (product bot, illustrative):**

| Slash | Role |
| --- | --- |
| `/board` | Today’s primary board for this chat/topic default |
| `/soon` | Time-urgent slice |
| `/race` | Opens course → time → card **tree** (args optional power-user) |
| `/follow` | Opens subscribe tree for **this** chat/topic |
| `/help` | How to use + root actions |

Unlisted but button-reachable: score, why/detail, manage subs, lens switch.

This matches the hard-cut pattern used by mature tip/query bots: **native menu
is tiny; power is in keyboards.**


## 3b. Rich Message (required format)

Before implementing copy or send helpers, lock format:

- Content = ordinary Markdown/GFM
- Wire = `sendRichMessage` / rich edit with `rich_message.markdown`
- **Not** MarkdownV2, **not** HTML `parse_mode` product path

See [rich-message-format.md](rich-message-format.md). Boards should prefer GFM
tables; list items when soft newlines would collapse. Migration must retire any
default MarkdownV2 escape path and any silent HTML success path for structured
text.

## 4. Draw trees

For each multi-step job, write the path:

```text
/race | footer 🏁
  → courses (inline)
    → offs for course
      → race card + footer (機會/價值/back)
/follow
  → pick lens
    → pick cadence | off
      → success + manage
```

Rules:

- Depth usually **2–4** taps; if deeper, add search or Web App
- Every level: **Back** to parent or **Home**
- Footer on results re-enters main jobs without retyping slash
- Single-job results: do not dual-dump two full boards “for completeness”

## 5. Context and defaults

Define:

- private vs group vs forum topic behavior
- default lens/mode from **this** topic’s subscriptions when present
- what happens when topic is missing/deleted (retry General vs error copy)
- who may change shared group settings

## 6. Registration

- Build the command list from the final slash table only
- Register default scope + group/private scopes the product uses
- Descriptions = user jobs in the product language
- Startup or deploy path must call registration; treat failure as ops signal
  (egress to `api.telegram.org`), not silent accept

## 7. Implementation checklist

- [ ] Product send/edit uses Rich Message only; HTML/MarkdownV2 product helpers removed
- [ ] Formatters emit GFM tables/lists (or rich blocks); no dual formatters
- [ ] Handlers for slash **and** callback share the same job functions
- [ ] `callback_data` ≤64 bytes; protocol documented
- [ ] Every callback answered
- [ ] Tree navigation prefers edit; terminals may send new messages
- [ ] Help lists buttons first, slash second
- [ ] Legacy slash either removed, redirected once with deprecation copy, or
      intentionally unlisted power aliases (not in `setMyCommands`)
- [ ] Tests: pure keyboard builders + handler routing + topic ids
- [ ] Empty/error copy is truthful and offers a recovery button

## 8. Migration from CLI sprawl

When an agent or legacy bot already has many commands:

1. Freeze new slash additions.
2. Map each command → job → channel (usually button).
3. Publish the new ≤5 menu.
4. Implement trees for the highest-traffic jobs first.
5. Hard-cut: remove old commands from `setMyCommands`; optional temporary
   unlisted alias handlers that reply with the new path (“用 🏁 場次 或 /race”).
6. Delete alias handlers after traffic dies — do not keep dual IA forever.

**No backward-compat menu bloat.** Compatibility is a temporary handler, not a
permanent second IA.

## 9. Agent-specific note

Coding agents default to CLI mental models: one function → one command. On
Telegram that yields unusable menus. Force the agent to produce the **Surface
Contract** (jobs → channels → trees) before writing `setMyCommands` lists.
Reject PRs that only grow the command enum.

For **agent chat bots** (free-form assistant): keep system slash commands few
(`/new`, `/help`, policy/status as needed). Do not expose every agent tool as a
slash command; tools stay behind the agent loop or explicit button confirmations.

## 10. Verification evidence

Minimum evidence before calling a surface done:

1. `getMyCommands` (or deploy logs) shows the intended short menu for each scope
2. Manual or automated walk: each slash entry and each tree depth
3. Callback double-tap and stale button behavior recorded
4. Topic-scoped action verified in a forum topic when relevant
5. Empty-data and error paths show recovery actions
6. Wire or client proof that messages used Rich Message (not MarkdownV2/HTML success)

“Unit tests for formatters” without menu/tree proof is incomplete for this job.

## 11. API limit pocket card

| Item | Limit / note |
| --- | --- |
| `callback_data` | ≤64 bytes |
| Command name | 1–32 chars, `[a-z0-9_]` |
| Commands in menu | Soft UX budget ≤5–8; platform allows more — do not use the max |
| Message text | Stay well under hard message limits; paginate or truncate with “more” |
| Answer callback | Required for good UX; toast ≤200 chars when used |
| Bot privacy (groups) | Privacy mode affects which messages the bot sees; design entry via commands, mentions, replies, or admin settings |

Confirm exact Bot API numbers against current Telegram Bot API docs when
implementing novel features (Web Apps, business accounts, etc.).
