# ad-monetization-review behavior example

skill: ad-monetization-review

## Positive prompt

> Review our mobile game ad placements before we add interstitials and rewarded ads.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies ad formats and placements by user intent and natural breaks.
- Defines caps, suppression, consent, and kill-switch rules.
- Measures ad revenue together with retention, payer conversion, complaints, and fatigue.

It should also produce the artifact shape requested by `skills/ad-monetization-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan our Steam capsule art and wishlist campaign.

The skill should not load for this prompt unless the user adds an explicit ad-monetization-review context.

## Expected behavior

- Classifies ad formats and placements by user intent and natural breaks.
- Defines caps, suppression, consent, and kill-switch rules.
- Measures ad revenue together with retention, payer conversion, complaints, and fatigue.
