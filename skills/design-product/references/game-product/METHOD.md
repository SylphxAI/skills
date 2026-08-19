# Design Game Product

Create one Game Design Blueprint whose mechanics, progression, content,
economy, social systems, presentation, and operations reinforce a clear player
promise.

## Product direction

Choose one core fantasy and a small set of pillars. The moment-to-moment play
delivers the promise; progression, economy, social features, and live operations
deepen it. Commercial systems begin with understandable player-chosen value and
healthy play.

Design for:

- responsive, legible, satisfying interaction;
- learnable challenge with meaningful mastery;
- voluntary return through fresh value, goals, ownership, belonging, and
  continuity;
- fair late entry, recovery, and comeback paths;
- accessible, localized, performant play across selected platforms;
- transparent economy, safety, moderation, and support behavior.

## Method

1. Define the target player, play context, fantasy, genre, session shape,
   commercial model, age modes, geographies, lead platform and input,
   networking model, and scope boundary.
2. Write one falsifiable player promise and three to five pillars that guide
   tradeoffs.
3. Research relevant games by mechanism and downside. Translate useful
   mechanics into hypotheses for this audience and game.
4. Map player verbs to moment, encounter, session, meta, social, and live loops.
   Describe why the next action and next session remain worthwhile.
5. Design challenge, information, teach-practice-test-remix, failure, recovery,
   assists, mastery, and content grammar. Storyboard first launch through
   understood input, meaningful choice, payoff, and a clean stopping point.
6. Connect progression, quests, content, economy, monetization, retention, and
   social systems. Include pacing, unlocks, sources and sinks, catch-up,
   returning-player recovery, and seasonal behavior where applicable.
7. Select capabilities that serve the promise. For each one, define player
   value, owner, dependencies, state, access conditions, integration,
   accessibility, localization, performance, telemetry, failure recovery, and
   operating needs.
8. Design feel through a clear action-feedback hierarchy across animation,
   camera, visual effects, audio, haptics, and UI within readability, motion,
   latency, and device budgets.
9. Define each selected platform's input, startup, save, offline/reconnect,
   entitlement, accessibility, localization, quality tiers, support, and
   lifecycle behavior.
10. For persistent or seasonal games, design progression reachability,
    horizontal veteran value, bounded seasons, catch-up, population fallback,
    and economy controls that sustain fair participation.
11. Hand specialist work to its owning skill with the game decision, required
    behavior, integration boundary, acceptance checks, and repository owner.
12. Validate system rules, moment-to-moment play, progression, economy, social
    interaction, performance, and safety with the smallest useful combination
    of simulation, automated tests, representative devices, target-player
    observation, telemetry, and controlled experiments.
13. Retrieve current platform, ratings, advertising, payment, random-reward,
    privacy, child-safety, UGC, chat, and notification rules for each selected
    release surface.

## Capability availability

A selected capability may depend on progression, mode, audience, platform,
device, locale, territory, age, population, safety, service health, or player
choice. State and availability stay explicit. Dormant extension points perform
zero startup, SDK, permission, telemetry, asset, background, memory, network,
or public-endpoint work until selected for the product.

Designed, implemented, integrated, released, and observed behavior are separate
delivery facts. The blueprint owns product intent and system interaction;
runtime engineering and release owners establish later delivery facts.

## Resource guide

- [Game thesis and loops](./game-thesis-and-loops.md) covers player
  promise, pillars, loops, learning, and first-time experience.
- [Progression and quests](./game-progression-and-quests.md) covers
  progression, unlocks, quests, pacing, catch-up, and seasons.
- [System integration](./game-system-integration.md) covers capability
  selection, cross-system interaction, commercial hierarchy, and handoffs.
- [Social systems](./game-social-systems.md) covers friends, co-op,
  matchmaking, guilds, chat, sharing, UGC, creators, and community.
- [Live operations](./game-live-operations.md) covers seasons, events,
  passes, content cadence, remote configuration, compensation, and shutdown.
- [Evergreen worlds](./game-evergreen-world.md) covers persistent
  progression, late-entry fairness, population, and economic longevity.
- [Experience quality](./game-experience-quality.md) covers feel,
  audiovisual feedback, input, accessibility, platforms, performance,
  networking, and localization.
- Open [sensory feedback](../../../craft-product-interface/references/sensory-feedback.md)
  when the blueprint needs a concrete action-feedback, audio-bus, haptic, or
  reduced-effects contract.
- [Validation and metrics](./game-validation-and-metrics.md) covers
  measures, telemetry, playtests, simulations, experiments, and the blueprint
  outline.
- [Player controls](./player-controls-self-test.md), [game feel](./game-feel-juice.md),
  [genre checks](./genre-acceptance-checks.md), and [multiplayer trust](./multiplayer-trust-boundary.md)
  provide focused depth when those surfaces apply.

Open the references that match the selected game systems. Whole-game work uses
every relevant reference; bounded work names the systems assessed.

## Output

Return one **Game Design Blueprint** with:

1. player, context, promise, pillars, genre, commercial model, platforms,
   audience modes, and scope;
2. verbs, nested loops, session arc, first-time experience, challenge,
   learning, failure, recovery, mastery, and content grammar;
3. progression, quests, content, economy, monetization, retention, social, and
   live-operation decisions that apply;
4. selected capabilities with their reasons, owners, dependencies,
   availability, integration, lifecycle, and quality requirements;
5. game feel, input, platform, performance, accessibility, localization,
   network, save, safety, moderation, and support behavior;
6. measures and the smallest useful validation for material hypotheses;
7. specialist handoffs and implementation order.

Blueprint completion means another builder can implement the selected game and
trace each specialist decision to its owner. Implementation, release, and live
quality remain separate delivery results.

## Related owners

- `review-domain` (`game-economy`) owns economy and monetization depth.
- `review-domain` (`game-soft-launch`) owns bounded real-player launch learning.
- Domain review skills own rewards, advertising, notifications, referrals, and
  promotion depth.
- Payment, refund, analytics, distribution, listing, marketing, support, and
  engineering skills own their independent artifacts.
- `maintain-product` owns the integrated finish pass after game direction is
  established.
