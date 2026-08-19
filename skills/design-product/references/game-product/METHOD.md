# Game Product

Use when the primary promise is play, mastery, fantasy, or progression.

## Unique checks

- Core loop, meta loop, and session loop are named and independently fun.
- Baseline play remains viable without paid acceleration.
- Economy, gacha, and live-ops decisions hand off to
  [game economy](../../../review-domain/references/game-economy/METHOD.md) rather
  than being restated here.
- Controls, juice, and failure feedback are tested on the actual input device.
- Soft launch is a bounded learning exposure, not a hidden global launch. Use
  `review-domain` (game-soft-launch) when that is the decision. Use
  `design-product-experiment` when the job is a pre-registered causal protocol.

## Depth

Open only the files the current game needs:

- [Thesis and loops](game-thesis-and-loops.md)
- [Progression and quests](game-progression-and-quests.md)
- [Feel and juice](game-feel-juice.md)
- [Social systems](game-social-systems.md)
- [Evergreen world](game-evergreen-world.md)
- [Live operations](game-live-operations.md)
- [Experience quality](game-experience-quality.md)
- [System integration](game-system-integration.md)
- [Validation](game-validation-and-metrics.md)
- [Genre checks](genre-acceptance-checks.md)
- [Multiplayer trust](multiplayer-trust-boundary.md)
- [Controls self-test](player-controls-self-test.md)

Return a game blueprint another builder can implement.
