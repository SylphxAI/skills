# Store Listing Optimization Patterns

## Channel matrix

| Channel | High-leverage assets | Conversion signal |
| --- | --- | --- |
| App Store | title, subtitle, keywords, screenshots, preview video, reviews | product page view to install/subscription |
| Google Play | title, short description, feature graphic, screenshots, video, experiments | listing visitor to install and retained install |
| Steam | capsule art, tags, trailer, screenshots, demo, reviews, wishlist | page view to wishlist/demo/purchase |
| Microsoft Store | title, screenshots, package identity, ratings, certification | page view to acquire/install |
| Direct download | landing page, signed installer trust, changelog, screenshots | visitor to download/activate |

## Rule IDs

- `store-listing-1` — The first visual asset should show the core value or core loop, not a generic brand graphic.
- `store-listing-2` — Titles/subtitles should balance discoverability with clear positioning.
- `store-listing-3` — Screenshot sequences should tell a story: outcome, workflow, proof, trust, differentiator.
- `store-listing-4` — Games need trailer/capsule alignment with actual gameplay and genre expectations.
- `store-listing-5` — SaaS/utilities need trust markers: privacy, data control, compatibility, support, pricing path.
- `store-listing-6` — Reviews should feed product and support improvements; do not manipulate ratings.
- `store-listing-7` — Localization must adapt value proposition, screenshots, pricing, and policy language, not only translate text.
- `store-listing-8` — Store experiments need one major variable at a time and guardrails for retained users, not just installs.
- `store-listing-9` — Privacy and data claims must match actual collection and platform disclosure forms.
- `store-listing-10` — Release notes and update cadence can improve trust when they are specific and user-facing.

## Decision table

| Symptom | Likely issue | Fix |
| --- | --- | --- |
| High page views, low install | Value unclear or assets weak | Rework first screenshot/video and subtitle |
| Many installs, poor retention | Listing overpromises | Align claims with actual first-run value |
| Low wishlist | Genre/core loop unclear | Improve trailer, tags, capsule, demo positioning |
| Policy rejection | Metadata or privacy mismatch | Fix claims, disclosures, review notes |
| Low paid conversion | Pricing/trial unclear | Show premium value and cancellation/support clarity |

## Metrics

Track store page views, install/acquire, wishlist, demo install, trial start, retained install, first value reached, refund rate, review sentiment, and support contacts by channel/campaign.
