# Game Experience Quality

## Contents

1. Feedback and game feel
2. Visual effects, animation, camera, audio, and music
3. Cross-platform capability design
4. Input and responsive interface adaptation
5. Startup and time-to-play
6. Low-end performance and quality tiers
7. Networking, save, cross-play, and offline behavior
8. Accessibility
9. Internationalization, localization, and culturalization
10. Experience-quality matrix

## 1. Feedback and game feel

“Modern” means fast, legible, intentional, resilient, and controllable—not simply high-fidelity art. Every material player action needs a feedback chain:

| Layer | Player question | Feedback job | Example channels |
| --- | --- | --- | --- |
| Input acknowledgement | Did the game receive me? | immediate response without lying about success | animation start, cursor/state change, click/transient sound, haptic tick |
| World/state result | What changed? | reveal authoritative consequence | hit reaction, movement, object state, damage/status, spatial audio |
| Tactical meaning | Was that good and what can I do next? | show cause, timing, opportunity, threat | telegraph resolution, combo state, cooldown, enemy response |
| Progress/economy meaning | Why does it matter beyond this moment? | connect action to goal and value | quest/progression delta, reward ceremony, collection update |
| Social meaning | Who saw, helped, or was affected? | clarify relationship and shared consequence | teammate cue, contribution, reaction, shared objective |

For each action specify expected response latency, authoritative state, predicted/local response, correction behavior, intensity tier, channel redundancy, accessibility alternatives, low-quality fallback, and failure/recovery state.

`feel-1` — Acknowledge input quickly, but never confirm an uncommitted purchase, reward, hit, or network action as final.

`feel-2` — Prioritize signals: player-critical state outranks spectacle, monetization, decoration, and social noise.

`feel-3` — Scale feedback by importance, rarity, mastery, and context. Constant maximum intensity destroys contrast and readability.

`feel-4` — Feedback must teach the game's causality. Decorative particles that obscure cause and effect reduce feel even when visually impressive.

## 2. Visual effects, animation, camera, audio, and music

Create an audiovisual grammar:

```text
event class -> intensity -> colour/shape/motion -> animation timing -> camera
-> sound family -> music response -> haptic -> UI -> reduced-effects alternative
```

### Visual and motion rules

- Telegraph before commitment; resolve with a distinct impact; preserve aftermath long enough to read.
- Reserve colour, silhouette, screen position, animation cadence, and effect density for stable meanings.
- Use anticipation, contact, follow-through, recovery, and cancel windows deliberately; measure gameplay latency separately from animation beauty.
- Keep screen shake, hit stop, zoom, blur, bloom, trails, damage numbers, and particles configurable and intensity-tiered.
- Define effect budgets by simultaneous actors and worst-case encounter, not a clean hero shot.
- Provide reduced motion, reduced shake, reduced flash, reduced particles, and high-clarity competitive modes where relevant.

### Audio and music rules

- Give critical events redundant visual and audio cues; never make audio alone the only path to essential state.
- Separate master, music, dialogue, effects, ambience, voice/chat, UI, and accessibility cue controls when the game needs them.
- Define mixing priority, ducking, dynamic range, voice limits, spatialization, device/speaker/headphone cases, and low-quality voice stealing.
- Caption dialogue and meaningful non-speech audio with speaker, content, timing, and direction where useful.
- Let music support anticipation, pace, location, threat, success, and identity without masking cues or repeating into fatigue.
- Treat haptics as optional reinforcement; provide intensity/off controls and non-haptic alternatives.

`feel-5` — A strong vibe is consistent sensory authorship across boot, menus, controls, play, failure, reward, social space, store, and share artifacts. Do not allow the monetization UI to feel like a different product.

## 3. Cross-platform capability design

Cross-platform readiness is shared game semantics plus complete adaptations for every selected platform. It is not one responsive canvas, and staged public exposure must not be misread as permission to postpone a requested adapter.

Keep game semantics and durable state shared where possible; adapt presentation, input, packaging, lifecycle, commerce, social services, privacy, and certification through explicit platform capabilities.

| Capability | Mobile/tablet questions | PC/Steam/Deck questions | Console/TV questions | Web questions |
| --- | --- | --- | --- | --- |
| Input | touch, gesture, device orientation, controller, interruptions | keyboard/mouse, controller, glyph switching, window focus | controller, multiple users, safe area, suspend | pointer, touch, keyboard, browser capture |
| Display | aspect/safe area, density, orientation, small text | ultrawide, resizable/windowed, monitor/DPI | viewing distance, overscan/safe area, HDR | viewport, zoom, full screen, browser UI |
| Lifecycle | cold/warm launch, background, calls, battery | launcher, multiple windows, sleep, updates | suspend/resume, user switch, quick resume | tab suspension, refresh, storage eviction |
| Performance | device fragmentation, heat, memory, package/download | broad hardware, shader/driver variance, settings | fixed hardware/certification modes | download, compile, memory, browser/GPU variance |
| Platform services | store, privacy, notifications, sign-in | Steam services, overlays, storefront, mods/workshop | accounts, parties, achievements, certification | identity, payments, PWA/offline constraints |
| Commerce | IAP/ads/storefront rules | premium/DLC/MTX/market expectations | platform commerce and age controls | payment, tax, browser/store policy |
| Social | contacts/privacy, mobile networks | invites, presence, anti-cheat, chat | platform friends/parties/cross-network policy | link sharing, identity, moderation |

`platform-1` — Choose a lead platform as the experience and integration spine, then build every requested/selected platform adapter, lifecycle, input/UI mode, service boundary, performance tier, and test path completely now. Evaluate other platforms explicitly as shared-primitive reuse, contract-ready, not applicable, or authority-blocked. Define parity, acceptable divergence, readiness and safe exposure.

`platform-2` — Platform parity means the same promised value and fair durable state, not pixel-identical UI or identical business model.

`platform-3` — Record entitlement, currency, item, progress, DLC, age, refund, and account-linking authority across storefronts before promising cross-save or cross-buy.

## 4. Input and responsive interface adaptation

Define abstract game actions and context, then bind per input device. Do not let one device's gesture or button become the game-state contract.

### Input contract

```text
action_id:
meaning and contexts:
continuous/discrete and timing sensitivity:
touch binding:
keyboard/mouse binding:
controller binding:
remap/conflict rules:
hold/toggle/repeat alternatives:
glyph and tutorial source:
accessibility alternatives:
latency and network prediction:
```

Support device hot-swap, glyph changes, focus restoration, disconnect/reconnect, remapping, sensitivity/dead zone, simultaneous inputs, text entry, and one-handed/limited-mobility options where relevant.

### Interface adaptation

- Use layout constraints, breakpoints, safe areas, text scaling, content priority, and semantic focus order rather than raw coordinate scaling.
- Design touch targets, hover alternatives, controller focus, keyboard navigation, pointer precision, drag alternatives, and screen-reader semantics separately.
- Keep critical HUD information readable against worst-case gameplay, colour vision differences, text expansion, and TV viewing distance.
- Treat loading, empty, offline, stale, reconnecting, entitlement-pending, purchase-failed, and save-conflict states as first-class designs.
- Never make a control essential only through hover, colour, tiny text, fast timing, or a gesture with no alternative.

## 5. Startup and time-to-play

Measure this path on cold, warm, resumed, first-install, patched, offline, low-storage, and slow-network states:

```text
process start -> first frame -> responsive shell -> first interaction
-> local/guest playable -> authenticated/synced state -> core play
```

Set budgets per target device and stage for:

- package/install/update size and required versus optional download;
- first frame, first responsive UI, first meaningful input, first playable, and first fun;
- shader/pipeline compilation and cache miss;
- authentication, cloud save, config, analytics, consent, store, ads, social, and news initialization;
- resume and disconnect recovery.

`startup-1` — Keep analytics, ads, store catalog, social graph, news, remote content, and noncritical account work asynchronous and failure-tolerant where correctness and current platform rules permit.

`startup-2` — Prefer a small playable boot path, cached/local configuration, placeholder-safe UI, progressive download, lazy assets, and background warmup. Do not make a cinematic conceal a blocked main thread.

`startup-3` — Allow offline/local/guest play where the game promise supports it, then merge or bind state explicitly. Never risk silent progress loss merely to reduce login friction.

`startup-4` — Report percentiles and device/cohort distribution, not only a developer machine average.

`startup-5` — Disabled or contract-ready capabilities are non-reachable on the boot and play path. Do not download their assets, initialize their SDKs, request their permissions, start their jobs, reserve their memory, collect their telemetry, require their services, or expose their endpoints. Test representative bundles, startup, memory, network and permissions so dormant work remains dormant.

## 6. Low-end performance and quality tiers

Define a minimum supported device profile and sustained-play scenario before art/content production. Budget the whole frame and session:

| Budget | Measure | Representative stress |
| --- | --- | --- |
| Frame pacing | CPU/GPU frame-time distribution, missed frames, input-to-photon | dense encounter plus UI/effects/network |
| Memory | resident/peak, allocation churn, asset lifetime, OS kill | long session and scene/content transitions |
| Storage/download | install, patch, cache growth, free-space failure | first install and seasonal update |
| Thermal/battery | sustained frequency, heat, drain, adaptive response | representative long play, charging and non-charging |
| Network | bytes, latency, jitter, loss, reconnect, data-plan cost | poor mobile/Wi-Fi and background/resume |
| Startup/loading | stage timings, shader stalls, IO/decompression | cold first run and patched content |
| Stability | crash, ANR/hang, save corruption, OOM, driver/device clusters | real-device fleet and soak |

Create low, medium, high, and optional ultra tiers from one semantic game state. Scale resolution, shadows, lighting, post-processing, particles, decals, animation LOD, texture/mesh quality, audio voices, crowd/decorative simulation, draw distance, and background frequency. Preserve controls, telegraphs, collision, competitive information, quest state, reward clarity, and accessibility.

`performance-1` — Smooth frame pacing and responsive input outrank unstable peak FPS and decorative fidelity.

`performance-2` — Quality adaptation must be deterministic enough for QA and fair enough for competitive play. Never hide threats or reveal extra competitive information by tier.

Select and change tiers using device capability, measured frame time, memory pressure, battery/thermal state, accessibility needs, and competitive rules. Apply hysteresis and graceful degradation; record enough context for support and regression analysis.

`performance-3` — Profile and optimize continuously from the first slice; test real low/mid/high devices, long sessions, temperature, low battery, memory pressure, background/resume, network impairment, and localized worst-case text/assets. Do not plan a later optimization or low-end port phase.

`performance-4` — Establish budgets and automated regressions for representative scenes. Content additions must fit the budget rather than normalizing degradation.

`performance-5` — Treat effects, audio voices, store/ad/social SDKs, telemetry, and live-event content as part of the same performance envelope.

## 7. Networking, save, cross-play, and offline behavior

Specify authority and recovery for gameplay, inventory, economy, quests, matchmaking, social state, and settings.

| Surface | Authority | Local prediction/cache | Conflict/retry | Player recovery |
| --- | --- | --- | --- | --- |

Define latency/jitter/loss targets by genre, matchmaking region/skill/party policy, join-in-progress, disconnect/reconnect, host migration or server authority, anti-cheat, version compatibility, maintenance, rollback, and degraded/offline modes.

`network-1` — Never silently overwrite progress on cross-device conflict. Present deterministic merge/selection or support recovery appropriate to risk.

`network-2` — Separate responsive local feedback from authoritative resolution. Correct visibly and fairly when prediction disagrees.

`network-3` — Cross-play expands population and relationships but can expose input, performance, anti-cheat, communication, and platform-policy differences. Define pools and opt-out where fairness requires it.

`network-4` — Purchased value, scarce rewards, leaderboard outcomes, and competitive results need stronger authority, idempotency, audit, and abuse controls than cosmetic preferences.

## 8. Accessibility

Accessibility is part of the interaction model from concept, not a menu added after content lock. Use game-specific guidance and test with disabled players; use WCAG for applicable web/UI surfaces without treating it as a complete game standard.

| Access need | Design dimensions | Examples to consider |
| --- | --- | --- |
| Vision | text, contrast, scale, colour independence, narration, magnification, clutter | scalable UI, high contrast, colour labels, screen narration, effect reduction |
| Hearing | dialogue, non-speech cues, voice/chat | captions, speaker/direction, visual/haptic alternatives, text chat |
| Motor | input count, precision, hold/repeat, timing, remap, one hand | remapping, toggle/hold choice, sensitivity, assist, pause, alternative device |
| Cognitive/learning | language, memory, complexity, navigation, time pressure | plain language, replayable tutorial, objective history, consistent icons, assists |
| Photosensitivity/motion | flashing, patterns, camera, shake, parallax | flash limits, reduced motion/shake, camera controls, warnings where needed |
| Speech/communication | voice requirement, pace, social cues | preset communication, text, ping, speech-to-text/text-to-speech where feasible |

`access-1` — Essential information uses redundant channels. Colour, sound, haptic, motion, or tiny text alone cannot carry required state.

`access-2` — Provide difficulty and assistance dimensions instead of one opaque easy/normal/hard choice when the game benefits: timing, damage, information, aim, navigation, checkpoints, speed, puzzle hints, resource pressure, and input burden.

`access-3` — Accessibility options must work in tutorials, gameplay, store/purchase, odds disclosure, parental controls, social safety, error/recovery, and live events.

`access-4` — Validate setup without assistance and core task completion across input modes, screen sizes, locales, quality tiers, and representative access needs.

## 9. Internationalization, localization, and culturalization

Internationalize in the initial contracts so no later content or platform branch requires structural rework:

- externalize strings with stable IDs and context; do not concatenate sentences;
- support plural, gender, case, number, date, time, unit, and currency rules through locale data;
- handle text expansion/contraction, CJK fonts and line breaks, bidirectionality/RTL, glyph fallback, diacritics, IME and player names;
- separate language, region, server, price, legal, and content decisions;
- localize subtitles, captions, voice, tutorial glyphs, images containing text, store metadata, notifications, events, support, safety, and purchase disclosures;
- provide pseudo-localization, layout stress, font/glyph coverage, truncation/overlap, voice timing, input method, and native-language functional QA;
- culturally review symbols, gestures, humour, historical/political/religious material, violence, chance mechanics, monetization, and age/rating expectations;
- version live content and keep locale fallback explicit; do not silently show stale terms or price/odds copy.

`locale-1` — Multilingual support is a product and operating commitment. Build the requested locale/platform pipeline, fonts, input, fallback, safety, support, and test coverage now; coverage, authority, quality, device, and moderation readiness may control public exposure.

`locale-2` — A single machine-translation pass is not sufficient for purchase, odds, consent, safety, parental, legal, support, or culturally sensitive text. Require independent agent critique, terminology/authority retrieval, semantic and layout tests, adversarial cases, provenance, and safe fallback; target-user signals may add evidence without becoming a routine development gate.

`locale-3` — Design share artifacts, player names, chat, filters, reports, and moderation for every requested language/script now. Keep a locale's affected public surfaces off until authority, safety, quality, font/input, support, and moderation readiness pass.

## 10. Experience-quality matrix

Deliver one matrix per target platform and minimum device:

```text
Platform/storefront:
Target player/context:
Input modes and hot-swap:
Screen/aspect/safe-area/text-distance:
Lifecycle and first-playable path:
Startup/frame/memory/storage/network/battery/thermal budgets:
Low/medium/high quality differences:
Offline/reconnect/save/cross-play behavior:
Accessibility baseline and tested modes:
Locales, fonts, input methods, subtitles/voice, cultural review:
Commerce/social/platform-service adapters:
Real-device and regression evidence:
Declared platform workload/failure assumptions and representative evidence:
Dormant-state bundle/startup/memory/network/permission evidence:
Current exposure, readiness predicates, degradation, and recovery:
```

Hard fail when the design promises a platform or locale without an input, UI, lifecycle, performance, accessibility, state, support, and validation plan appropriate to it.
