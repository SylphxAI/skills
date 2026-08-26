---
name: craft-telegram-bot-surface
description: "Design or implement a Telegram bot on the current Bot API. Use when the user mentions Telegram, Bot API, slash commands, inline keyboards, callback queries, Web Apps, sendRichMessage, or rich messages. Do not use parse_mode HTML/MarkdownV2 as the product text path. Do not use for Slack, Discord, or generic product UI."
---

# Craft Telegram Bot Surface

Training still defaults to `sendMessage` plus `parse_mode`. Product text on Bot API 10.1+ uses `sendRichMessage` with ordinary Markdown/GFM in `rich_message.markdown`. Edit the same tree with `editMessageText` carrying that `rich_message` object. Stream a private preview with `sendRichMessageDraft`. Media captions keep their own object contract. A `parse_mode` path is a product defect, not a fallback.

Slash commands are sparse typeable entries (`setMyCommands`). Progressive jobs — filters, pickers, settings — are inline keyboard trees, not extra slash commands. Callback data stays compact, versioned, authorized, and idempotent (UTF-8, ≤64 bytes). Group-visible content is not user-specific; personal group replies use ephemeral messages (Bot API 10.2+) when only the invoking user should see them. Acknowledge callbacks, then edit or replace the message so bots do not loop.

Confirm method and field names in the current [Bot API](https://core.telegram.org/bots/api) and [changelog](https://core.telegram.org/bots/api-changelog) before adopting a new capability.

Open [Telegram platform](references/telegram-platform.md) for current capability selection. Open [interaction primitives](references/interaction-primitives.md) for commands vs keyboards. Open [callback protocol](references/callback-protocol.md) for `callback_data`. Open [rich message format](references/rich-message-format.md) for the `sendRichMessage` wire shape.
