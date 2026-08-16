# Telegram Bot API platform map

Use the [official Bot API documentation](https://core.telegram.org/bots/api) and [changelog](https://core.telegram.org/bots/api-changelog) as the current source. Confirm SDK support and wire behavior before adopting a recently added capability.

## Capability selection

| Capability | Apply when |
| --- | --- |
| Rich messages and rich edits | Product text, boards, digests, progress, and agent replies need structured Markdown content |
| Rich drafts | A private-chat AI experience streams a useful in-progress response |
| Rich blocks | A board or document needs stable structure beyond a Markdown string and the target clients render it correctly |
| Sparse slash menu and keyboards | Product navigation benefits from a few typeable entry points and contextual choices |
| Button style and emoji | Primary, secondary, and destructive hierarchy benefits from visible distinction |
| Ephemeral messages | A group response contains personal help, settings, validation, or status for the invoking user |
| Guest mode | A read-limited helper is summoned across chats through the platform's guest contract |
| Bot-to-bot interaction | A product defines an explicit allowlist, depth, rate, deduplication, and user-visible handoff policy |
| Managed bots | The product intentionally provisions and governs per-user bots, tokens, lifecycle, and recovery |
| Business automation | The user has authorized a bot to act through the current Telegram Business contract |
| Communities and topics | The product owns a multi-chat or threaded information architecture |
| Web Apps | The job needs dense forms, authentication, checkout, or interaction beyond chat controls |

## Selection rules

- Adopt a capability for a named user job and supported chat type.
- Keep shared group content visible to the group and personal state scoped to the invoking user.
- Give audit and compliance records the durable visibility required by their owner.
- Treat guest context as summon-scoped and answer with self-contained content.
- Give bot-to-bot work an explicit allowlist, maximum depth, idempotency key, rate limit, loop detection, and dead-letter behavior.
- Give managed and business bots explicit token custody, authorization, revocation, and recovery ownership.
- Match Web App origin, domain, authentication, and data handling to the current platform contract.

## Product shapes

An assistant bot usually needs a short command menu, free-form conversation, rich progress, rich final responses, and private personal controls.

A product board or notification bot usually needs scheduled digests, a small browse menu, edited keyboard trees, topic-aware subscriptions, and concise recovery states.

## Verification

1. Confirm the method and field names in the current official API and selected SDK.
2. Exercise each selected method through a wire test or a real test bot.
3. Inspect `getMyCommands` for every supported scope.
4. Exercise private, group, topic, ephemeral, guest, and bot-to-bot behavior that the product declares.
5. Confirm authorization, stale callback handling, retry behavior, message edits, and fallback rendering.

Refresh this map whenever Telegram or the selected SDK releases a relevant version.
