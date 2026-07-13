# Game Social Systems

## Contents

1. Social promise and relationship ladder
2. Identity, friends, presence, and invitations
3. Parties, co-op, and matchmaking
4. Guilds and persistent communities
5. Communication and safety
6. Sharing, UGC, creators, and virality
7. Population and exposure
8. Social output

## 1. Social promise and relationship ladder

Social features succeed when another person changes the meaning, choices, expression, story, learning, or achievement. They fail when people are parallel reward multipliers or retention obligations.

Define the relationship contexts the game serves:

- solo with social proof or shared world;
- known-friend synchronous play;
- known-friend asynchronous help, gifts or shared projects;
- matched stranger cooperation or competition;
- persistent team/guild/community;
- spectators, streamers, creators and audience;
- open discovery, chat, trading or UGC.

Expose increasing social risk only when player readiness, population/liquidity, age, locale, moderation, support and safety states permit:

```text
private/solo
-> known-friend invitation
-> asynchronous or preset interaction
-> managed party/group/creation
-> matched strangers
-> open discovery/chat/trading/UGC
```

Every layer needs a non-social or known-friend fallback where the game promise permits it. Do not make public contact the only route to core progression.

## 2. Identity, friends, presence, and invitations

Separate game identity, platform identity, account identity and public display identity. Define cross-platform linking, name changes, privacy, child modes, data deletion, impersonation and block propagation.

Friend relationship state:

```text
discoverable_or_code_known -> request_created -> delivered
-> accepted | declined | expired | blocked
accepted -> friends -> muted | favorite | removed | blocked
platform_friend_import -> consented_match -> suggested -> accepted_or_dismissed
```

Specify:

- who can discover whom and by which consented method;
- request/message caps, duplicate suppression and expiry;
- platform-friend, QR/code, deep-link and in-game search behavior;
- child/unknown-age, region and privacy defaults;
- display name, presence, activity, party and inventory visibility;
- cross-device/platform consistency;
- remove, mute, block, report and appeal effects;
- support-visible reason codes without exposing private evidence.

Never upload contacts by default, auto-send invitations, reveal private account state to a recipient, or make friendship contingent on a public share or reward.

## 3. Parties, co-op, and matchmaking

Co-op needs shared decisions, role complementarity, communication, mutual rescue, construction, trading, planning or authored stories—not merely parallel grinding.

Party state:

```text
created -> invite/join_request -> eligibility_check -> joined -> ready
-> matchmaking_or_activity -> in_session -> result/reward -> remain_or_leave

member -> disconnected -> grace/rejoin | bot_or_role_fill | removed
host -> migrates | service_authority_continues
party -> version/region/age/platform/content incompatibility -> explained recovery
```

Define:

- max/min party, roles, readiness and leadership transfer;
- join-in-progress, leave, kick, reconnect, host migration and abandonment;
- skill/progression disparity, sync/normalization and viable contribution;
- content/entitlement/platform/cross-play eligibility;
- voice/text/ping needs and communication alternatives;
- authoritative contribution/reward attribution, duplicate prevention and anti-carry abuse;
- griefing, friendly fire, AFK, sabotage, vote, report and false-positive recovery;
- offline member behavior for asynchronous teams.

Matchmaking balances latency, skill, party size, input, platform, behavior, region, wait time and population. Declare priorities, relaxation over time, transparency, opt-outs where fairness requires, rematch and backfill rules. Do not hide bots; disclose them appropriately and keep competitive integrity explicit.

## 4. Guilds and persistent communities

Guilds create durable belonging only when newcomers can contribute before endgame power.

Guild lifecycle:

```text
created -> configured -> discoverable/invite_only -> members_join
-> roles/contributions/goals -> healthy | inactive | disputed
inactive_leader -> recovery/succession
disputed -> evidence/appeal/governance action
guild -> merge/archive/disband with state and asset treatment
```

Define:

- purpose, size, discovery/recruitment and newcomer protection;
- roles, least privilege, treasury/assets and change history;
- contribution categories not reducible to spend or power;
- shared goals, events, mentorship and mixed-progression play;
- inactive leadership recovery and succession;
- kick/ban, ownership transfer, dispute, appeal and support;
- territory/resource anti-zerg and anti-monopoly rules;
- guild merge, archive, deletion, purchased/earned asset and history treatment.

Avoid attendance quotas, guilt language, permanent missed-day penalties, leader dictatorship, purchased rank and reward structures that turn players into unpaid labor.

## 5. Communication and safety

Choose the least risky communication surface that supports the play:

- contextual pings/emotes/presets;
- asynchronous comments or reactions;
- party/guild text;
- voice;
- direct messages;
- open/local/global channels;
- creator/UGC comments.

For each define age mode, consent, identity exposure, rate limits, spam, personal-information prevention, filters, proactive/reactive moderation, evidence retention, block/mute/report, severity, response, appeal, repeat-offender policy and trusted-contact/support routes.

Critical controls must exist in the interaction surface, not only settings. Blocking must stop applicable messages, invites, discovery and matchmaking contact consistently across devices. Reports need receipt and status without exposing another person's private case.

For minors or likely-child audiences, default profiles/discovery to private, stranger communication off, behavioral ads off and social expansion behind current-authority guardian/age controls.

Models may assist detection and triage but cannot be sole judge for severe irreversible sanctions. Use evidence, bounded actions, independent validation and appeal/correction.

## 6. Sharing, UGC, creators, and virality

Virality is recipient value and retained co-value, not the count of invites or posts.

Design shareable sources:

- skill/performance: replay, challenge, speedrun, build or surprising solution;
- expression: avatar, loadout, home, collection, photo or creation;
- story: emergent event, humor, rare encounter or relationship moment;
- collaboration: invite to useful co-play, shared project or team need;
- creation: level, mod, world, item, guide or remix;
- cultural/topic moment: event or community language authentic to the game's promise.

Share state:

```text
valuable_moment -> artifact_generated -> previewed/edited -> user_selected_channel
-> sent/published -> opened -> compatible landing/deep link
-> recipient reaches value or co-play -> retained relationship/value
```

Shares are user-initiated, previewable, editable, localized, accessible, privacy-safe and removable where applicable. Provide web/store fallback and explain unavailable content/version/platform states. Never auto-post, require contact upload or misrepresent the sender.

UGC requires creation tools, ownership/license terms, provenance, moderation, age/privacy, discovery/ranking, attribution, remix rules, accessibility, localization, performance budgets, reporting, takedown/appeal, creator support and shutdown/export treatment.

Referral incentives are a separate specialist contract: bounded, single-level, fraud-resistant and tied to genuine recipient activation. Friendship and co-play must work without a reward.

Instrument:

```text
artifact/invite created -> previewed -> sent -> opened -> accepted
-> recipient activated -> co-value reached -> both-side retention
```

Countermetrics include cancellation, spam complaint, block/report, failed join, recipient mismatch, fraud, sender fatigue, harassment and retention of both sides.

## 7. Population and exposure

Social systems require enough compatible people, not raw global CCU. Measure eligible concurrency by mode, region/latency, version, platform/cross-play, age/communication mode, skill/progression and party size.

Fallback ladder:

```text
widen compatible pools within fairness/latency bounds
-> asynchronous cooperation/competition
-> scheduled aggregation
-> ghosts/replays or disclosed bots/agent fill
-> dynamic encounter scaling
-> known-friend/private play
-> rotate or degrade the mode transparently
```

Do not open fresh permanent progression/economy servers to manufacture social density.

Exposure predicates include:

- player comprehension and progression readiness;
- known-friend versus stranger mode;
- eligible population and predicted wait/match quality;
- moderation/support coverage by language and age mode;
- service health, latency and abuse rate;
- platform/cross-network authority;
- missing-signal safe state, hysteresis and cooldown.

Closing a surface must preserve friendships, groups, creations, earned/purchased state and in-flight party/match recovery. Stranger/open expansion fails closed; known-friend or preset interaction may remain if independently safe.

## 8. Social output

Return:

1. social promise, relationship modes and exposure ladder;
2. identity/friend/presence/privacy/block state contract;
3. party/co-op/matchmaking/reconnect/reward contract;
4. guild governance, contribution, succession and asset/history treatment;
5. communication, child safety, moderation, reporting and appeal matrix;
6. sharing/UGC/creator artifact and recipient-value funnel;
7. population/liquidity model, fallback ladder and exposure predicates;
8. telemetry, countermetrics, abuse tests, recovery and referral/promotion handoffs.

Complete only when social play changes meaningful decisions or relationships, mixed-progression friends can contribute, recipients receive real value, safety controls exist with the interaction, low population has a truthful fallback, and no core progression depends on spam, public contact or coercive obligation.
