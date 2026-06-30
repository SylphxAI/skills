# Launch Narrative Systems

A launch narrative connects user pain, product truth, proof, and action. It should make the product easier to understand without inflating claims.

## Rule IDs

- `launch-narrative-1` — Choose one primary audience; secondary audiences get adaptations, not a diluted core story.
- `launch-narrative-2` — State the old way, why it fails now, and the new way the product enables.
- `launch-narrative-3` — Anchor claims in proof: demo, metric, customer quote, before/after, technical capability, or clear limitation.
- `launch-narrative-4` — Make the CTA match readiness: try, install, join waitlist, buy, read docs, watch demo, or give feedback.
- `launch-narrative-5` — Address objections: price, trust, migration, setup, switching, privacy, support, compatibility.
- `launch-narrative-6` — Adapt by channel: README, launch post, App Store notes, Steam update, email, social, community, press.
- `launch-narrative-7` — Keep roadmap promises separate from shipped facts.
- `launch-narrative-8` — Claims about AI, security, privacy, performance, earnings, health, or compliance need elevated evidence.
- `launch-narrative-9` — The best launch assets show the product working, not just describe it.
- `launch-narrative-10` — Measure narrative by qualified action and retained use, not just impressions.

## Narrative decision table

| Launch type | Strong hook | Main risk | Required proof |
| --- | --- | --- | --- |
| New product | new way to solve painful job | vague category | demo or before/after |
| Feature | unlocked workflow | feature dump | use case and user outcome |
| Pricing | clearer value | backlash | rationale and migration terms |
| Developer tool | first success faster | unclear setup | command/output proof |
| Game update | new fun/content | overpromising | gameplay footage and patch notes |
| Open repo | useful artifact | prompt-list skepticism | install/demo/evals |

## State machine

```text
launch_goal_defined -> audience_selected -> claim_inventory_created -> proof_attached
proof_attached -> narrative_drafted -> claim_risk_reviewed -> channel_adapted
channel_adapted -> assets_ready -> launch_published -> metrics_readout
claim_risk_reviewed -> unsupported_claim_found -> claim_removed_or_proof_added
```

## Event schema

Recommended metrics:

- `launch_asset_viewed`: channel, asset_type, audience, campaign_id.
- `launch_cta_clicked`: channel, cta_type, audience, message_variant.
- `launch_conversion`: action_type, source, qualified, activation_result.
- `launch_objection_logged`: objection_type, channel, support_or_comment_url.
- `launch_readout`: metric, expected, actual, learning, next_message_change.

## Checklist

- Audience, category, old way, new way, proof, CTA, and objections are explicit.
- Shipped facts and future roadmap are separated.
- Claims are evidence-backed and channel-safe.
- Assets demonstrate the product.
- Metrics track qualified action and retained value.
