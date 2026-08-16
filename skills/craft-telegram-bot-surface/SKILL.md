---
name: craft-telegram-bot-surface
description: Design or implement a Telegram bot interface using concise commands, layered keyboards, edited message trees, rich content, clear visibility, and loop-safe bot interactions.
---

# Craft Telegram Bot Surface

Build a Telegram-native interaction that stays compact in chat and clear across private, group, and multi-bot contexts.

## Method

1. Define the user jobs, chat types, public and private visibility, bot permissions, and product state behind each interaction.
2. Keep the slash-command menu focused on entry points users may type directly.
3. Use reply keyboards for persistent high-level navigation and inline keyboards for contextual choices attached to a message.
4. Build deeper flows as an edited message tree with clear back, close, refresh, confirm, and recovery actions.
5. Use Telegram's current Bot API entities, media, reply markup, callback queries, web apps, topics, and business features only where they improve the user job.
6. Keep callback data compact, versioned, authorized, idempotent, and bound to the current user or chat state.
7. Acknowledge callbacks promptly, then edit or replace the message with the resulting state.
8. Separate group-visible updates from user-specific or sensitive responses.
9. Validate sender, chat, topic, membership, tenant, and product authorization at the action boundary.
10. Prevent bot loops by accepting bot-originated events only through an explicit trusted interaction contract.
11. Exercise the flow in each supported chat type, including stale callbacks, deleted messages, retries, permission changes, and concurrent users.

## References

- [Telegram platform](references/telegram-platform.md) for current Bot API capabilities.
- [Interaction primitives](references/interaction-primitives.md) for command and keyboard selection.
- [Callback protocol](references/callback-protocol.md) for compact authorized actions.
- [Rich message format](references/rich-message-format.md) for content rendering.

## Output

Return the command menu, keyboard tree, message states, callback design, visibility rules, authorization points, implementation changes, and exercised chat paths.
