# Telegram Bot API 9.3–10.2 platform map (agent-safe)

Open when deciding whether a **new** Telegram capability should be applied to a
product bot, or when reviewing a fleet against 2026 Bot API.

**Authority:** `core.telegram.org/bots/api-changelog` + Telegram blog. This
file is a **decision map**, not a substitute for live API docs. Re-check
changelog before claiming a method exists.

## Why this file exists

These APIs are new enough that coding agents often:

- invent wire fields that do not exist in the target SDK,
- apply Guest/Ephemeral/Managed to every bot because a blog post looks cool,
- or ignore them when they would remove real group spam / slash sprawl.

**Default:** only adopt a capability when a **user job** fails without it.

## Capability → when to apply

| Capability | Bot API | Apply when | Do **not** apply when |
| --- | --- | --- | --- |
| **Rich Message** (`sendRichMessage`, rich edit, GFM/`rich_message.markdown`) | 10.1+ | Any product text, boards, digests, progress, agent replies | Never as optional for structured product copy |
| **Rich draft** (`sendRichMessageDraft`) | 10.1 | Streaming AI replies / thinking preview in **private** chat | Group chat “progress spam”; durable finals |
| **Rich blocks** (`InputRichMessage.blocks`, media blocks) | 10.2 | Boards/docs that need stable structure beyond GFM strings | Simple confirmations; until wire tests exist in-repo |
| **Sparse slash + keyboards** | long-standing | Always for product IA | Never “one slash per internal function” |
| **Colored / emoji buttons** | 9.4 | Footers with danger/primary/secondary hierarchy | Decorative noise on every button |
| **Ephemeral messages/commands** | 10.2 | Group bots: personal follow/settings/errors/help that should not flood others | Public digests, shared tip boards, audit trails everyone must see |
| **Guest mode** | 10.0 | Cross-chat @summon helper **without** membership; read-only tool style | Bots that need history, full group membership, or continuous presence |
| **Bot-to-bot** | 10.0 | Explicit multi-agent handoff with loop guards | Casual “bots chat forever”; unguarded recursion |
| **Managed bots** | 9.6 | Product that **provisions** per-user bots under a manager | Ordinary single-token product bots (token custody nightmare) |
| **Secretary / Chat Automation** | business path | Bot acts **as the user** in allowed chats | Tips/alerts bots that post as themselves |
| **AI Guardians / join request queries** | ~10.x | Closed groups with join screening | Open tip channels |
| **Communities** graph | 10.2 | Multi-chat brand topology (tips+admin+alerts as one community) | Single group product |
| **Private topics for bots** | 9.3/9.4 | Per-topic agent workspaces in DM | Simple single-thread DM bots |
| **Mini App strict origin** | 10.2 ops | Any WebApp host (domain must match; 2026-07-20+) | N/A — security floor |

## Agent-bot vs product-query-bot

### Agent assistant (Spiron-class)

**Jobs:** free-form chat, tools, long-running work, system panels.

| Priority | Upgrade | Why |
| --- | --- | --- |
| P0 | Keep **Rich Message** finals + rich progress | Already product law |
| P0 | **Slash hard-cut** to ≤8 entrypoints; rest → `/help` button trees | 20+ menu commands is CLI sprawl |
| P1 | **Ephemeral** for group `/help`, `/status`, `/model`, errors | Stops multi-user chat pollution |
| P1 | **Rich draft** for private streaming if not fully wired end-to-end | Matches AI UX expectation |
| P2 | **Guest mode** as opt-in talent capability | @summon without add-bot friction |
| P2 | **Bot-to-bot** only with depth/rate/dedupe product policy | Multi-agent legal path |
| P3 | Rich **blocks** for structured progress/docs | After GFM path is proven stable |
| Later | Managed bots / secretary / communities | New product surfaces, not drop-in |

### Product tip / board bot (physical-win-model-class)

**Jobs:** push digests, on-demand boards, topic subscribe, race browse.

| Priority | Upgrade | Why |
| --- | --- | --- |
| P0 | Rich Message success path; **kill silent HTML path (delete)** for tables | HTML drops tables |
| P0 | Keep ≤5 slash + keyboard trees | Already correct IA |
| P1 | **Ephemeral** for `/follow`, manage subs, errors, personal help in groups | Shared tip topics stay clean |
| P1 | **editMessage** (+ rich) for race/follow trees | Less flood; native progressive UI |
| P2 | **Button styles/colors** on footer (primary browse vs danger off) | Scannability |
| P2 | Topic defaults already good — extend ephemeral + thread continuity | Forum tip groups |
| P3 | Guest mode only if product wants @summon outside membership | Usually **not** for paid/private tip channels |
| Later | Communities if multi-chat brand packaging is a product goal | Topology, not a patch |

### Legacy runtime (OpenClaw-class)

Treat as **migration residual**: do not invent Guest/Managed features there unless
ownership is explicitly reopened. Prefer Spiron-native path for new agent UX.

## Slash budget for agent bots (special case)

Agent products accumulate system panels. Still:

- **Registered menu:** prefer **≤8** true entrypoints (`help`, `new`, `status`,
  `model`, `effort`, `progress`, maybe `mode`, `allow`).
- **Everything else:** button tree under `/help` command center, or unlisted
  power aliases not in `setMyCommands`.
- Directory/admin (`verify`, `managers`, `admins`, `credentials`, …) → admin
  scope menu or help tree, not a 24-item global autocomplete.

## Ephemeral design notes (when adopting)

- Public shared content (tips, digests, race cards for the room) stays **normal**.
- Personal config, validation errors, “you are not allowed”, per-user status →
  **ephemeral** in groups.
- Mark only the right commands `is_ephemeral` in `setMyCommands` when using
  ephemeral slash; button trees can still send ephemeral replies.
- Do not use ephemeral for compliance records that operators must see in-chat.

## Guest design notes (when adopting)

- Context is **summon-only** (tagged message + related replies) — no history.
- Design short, self-contained answers; do not assume prior session in that group.
- Cap concurrent guest work; answer `answerGuestQuery` paths promptly.
- AuthZ: guest does not imply membership privileges.

## Bot-to-bot design notes (when adopting)

- Require explicit allowlists / product policy.
- Hard max depth, idempotency keys, rate limits, dead-letter on loop detection.
- Prefer human-visible handoff summaries over silent ping-pong.

## Rich blocks (10.2) adoption gate

Do not rewrite GFM formatters to blocks until:

1. Wire helpers exist and are tested against Bot API (or wiremock),
2. One board type (e.g. 價值 table) proves client render,
3. Fallback policy is defined (blocks fail → GFM rich markdown, **not** HTML).

## Verification when claiming “we use 10.x”

- Method names appear in outbound client (not only docs),
- Live or wiremock proof for each new method,
- Feature flag / capability residual documented if partially rolled out,
- No claim of Guest/Ephemeral/Managed from blog text alone.

## Authority

Prefer live source + this skill over stale MEMORY lines that mention MarkdownV2
or HTML product paths. Those labels are invalid for product Telegram text.
