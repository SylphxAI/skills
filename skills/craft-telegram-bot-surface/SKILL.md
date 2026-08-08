---
name: craft-telegram-bot-surface
description: "Craft or hard-cut a Telegram bot to the sole 2026 surface model: sparse slash menu, layered keyboards with edit trees, Rich Message only, public vs ephemeral visibility, and bot-to-bot loop guards when multi-bot. Use for any Telegram bot design, implementation, review, command menu, keyboard tree, digest/board, progress UI, group multi-bot, or format path—never MarkdownV2/HTML product text or CLI command sprawl."
---

# Craft Telegram Bot Surface

Deliver one **Telegram Bot Surface** that matches Bot API 10.x product reality.
There is **one** model. Do not leave dual paths, compatibility floors, or
"temporary" format/IA residuals.

## Sole model (non-negotiable)

1. **Sparse slash** — registered `setMyCommands` is a short list of entrypoints
   (product query bots ≤5; agent bots ≤8). Filters, panels, and CRUD are not
   slash entries.
2. **Keyboard trees + edit trees** — multi-step UI uses inline keyboards;
   navigation **edits the same message** (rich body + markup). Final shared
   work product may be a new public message.
3. **Rich Message only** — all product text uses `sendRichMessage` /
   `editMessageText`+`rich_message` with ordinary Markdown/GFM (or 10.2 blocks
   when implemented). **No** `parse_mode=MarkdownV2`. **No** `parse_mode=HTML`
   for product text, command panels, digests, progress, or agent replies.
   Captions are plain when media requires caption-only.
4. **Visibility policy** — each outbound chooses:
   - **Public** — shared work product, digests, agent answers for the room,
     bot-to-bot handoffs
   - **Ephemeral** (`receiver_user_id` / ephemeral commands) — personal system
     UI, settings, permission errors, personal help in groups
5. **Bot-to-bot** (when multiple bots share groups) — allowlist, max depth,
   dedupe, rate limit, public handoff line; no unguarded ping-pong.
6. **No dual paths** — one menu inventory, one text wire, one callback action
   router, one visibility rule table. Delete superseded formatters and menus.

## Modes

- **Direction** — surface contract only
- **Build / Polish** — implement and delete legacy paths
- **Review / Hard-cut** — inventory dual paths; remove them

## Method

1. **Jobs → channels** (see [interaction-primitives.md](references/interaction-primitives.md)).
2. **Slash budget** — write the final menu; move everything else to help/footer trees.
3. **Visibility matrix** — every command and reply class is public or ephemeral
   ([platform-2026.md](references/platform-2026.md)).
4. **Rich-only formatters** — GFM (or blocks); kill HTML/MarkdownV2 authors and
   send helpers ([rich-message-format.md](references/rich-message-format.md)).
5. **Edit trees** for system/settings UI; answer every callback.
6. **Bot-to-bot policy** if multi-bot groups exist.
7. **Register menu** for needed scopes; verify wire methods actually used.
8. **Delete** dual paths: old menus, HTML builders, fallbacks, unlisted dual IA.

## Agent bot slash budget (Spiron-class)

**Registered menu only (≤8):**

| Command | Role |
| --- | --- |
| `help` | Command center (edit tree to all panels) |
| `new` | Fresh conversation |
| `status` | Health (ephemeral in groups) |
| `model` | Model picker (ephemeral in groups; edit tree) |
| `effort` | Effort picker (ephemeral in groups; edit tree) |
| `progress` | Progress toggle |
| `mode` | Group response mode (groups) |
| `allow` | Access (admin; ephemeral where personal) |

All other former menu items (`contacts`, `sessions`, `goal`, `todo`,
`portfolio`, `credentials`, `computer`, `integrations`, `diagnostics`, `cron`,
`verify`, `managers`, `admins`, `recap`, `background`, …) are **not** in
`setMyCommands`. Reach via **help edit tree** (and admin section when
authorized). Typed unlisted aliases may still route to the **same** action
handler once, without a second menu.

## Product query bot slash budget (tip/board-class)

≤5: e.g. `board`, `soon`, `race`, `follow`, `help`. Lenses/modes/entities =
buttons.

## Visibility matrix (default)

| Class | Visibility |
| --- | --- |
| Agent final answer / shared tool result | Public |
| Digest / tip board / race card for the room | Public |
| Bot-to-bot handoff summary | Public |
| `/help` center, `/model`, `/effort`, personal settings | Ephemeral in groups; public ok in private DM |
| Permission / validation errors to one user | Ephemeral in groups |
| Progress card | Public or policy-owned progress surface (not personal-secret) |

Ephemeral is **per message**, not a bot-wide mode.

## Anti-patterns (reject / delete)

- Dual text paths (rich for agent + HTML for commands)
- HTML or MarkdownV2 "fallback success" for structured product text
- 9+ registered slash commands for filters/panels
- New message per keyboard step (no edit tree)
- Treating ephemeral as "hide all agent output"
- Bot-to-bot without loop guards
- Leaving legacy formatters "just in case"

## Output contract

1. Jobs and channel allocation  
2. Final slash menu (≤N) + help tree map  
3. Visibility matrix  
4. Rich-only wire proof (methods + no HTML/MarkdownV2 product send)  
5. Edit-tree flows  
6. Bot-to-bot policy if applicable  
7. **Deleted dual paths** (files/symbols removed)  
8. Tests + verification evidence  

## Progressive disclosure

- [references/telegram-surface-method.md](references/telegram-surface-method.md)
- [references/rich-message-format.md](references/rich-message-format.md)
- [references/platform-2026.md](references/platform-2026.md)
- [references/interaction-primitives.md](references/interaction-primitives.md)
- [references/callback-protocol.md](references/callback-protocol.md)

## Boundaries

- Owns Telegram interaction IA and product text wire model.
- Does not own token custody, webhook ownership cutover, or non-Telegram channels.
