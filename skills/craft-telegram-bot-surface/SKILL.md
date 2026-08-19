---
name: craft-telegram-bot-surface
description: "Design or implement a Telegram bot using slash commands, reply vs inline keyboards, edited message trees, versioned callback data, and loop-safe multi-bot behavior. Use when the user mentions Telegram, Bot API, inline keyboards, callback queries, or Telegram Web Apps. Do not use for Slack or Discord bots or for generic product UI."
---

# Craft Telegram Bot Surface

Callback data stays compact, versioned, authorized, and idempotent. Group-visible content is not user-specific. Prevent bot loops: acknowledge callbacks, then edit or replace the message.

Open [Telegram platform](references/telegram-platform.md) for Bot API entities. Open [interaction primitives](references/interaction-primitives.md) for commands and keyboards. Open [callback protocol](references/callback-protocol.md) for callback contracts. Open [rich message format](references/rich-message-format.md) for media and markup.
