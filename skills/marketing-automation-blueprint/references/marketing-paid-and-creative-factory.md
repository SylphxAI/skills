# Marketing Paid Channels And Creative Factory

## 1. Paid adapter contract

Use one semantic interface with provider-specific capabilities:

```text
channel/account/campaign/ad-group/ad/creative IDs:
objective, audience, exclusions and consent basis:
claim, offer, landing/deep-link and release artifact IDs:
campaign type, placement, geo, schedule and inventory:
bid strategy and bounded parameters:
daily/lifetime/product/channel/geo/portfolio spend caps:
conversion schema, dedupe, attribution and experiment IDs:
brand-safety, fraud/IVT, frequency and complaint policy:
create/update/pause/archive/reconcile/readback operations:
API/version/scope/quota/current-policy authority record:
```

Target adapters for relevant product/audience combinations, including Google Search/YouTube, Apple Ads, Meta, TikTok, X, Reddit, programmatic/display/video, store-native promotion, and future channels through the same contract. Construction is complete; activation is evidence- and policy-controlled.

Do not encode vendor campaign types, bidding fields, API versions, quotas, scopes, attribution windows, or rate limits as durable universal facts.

## 2. Spend and bid envelopes

Independent controls:

- portfolio, product, legal entity, channel account, geography, campaign and experiment caps;
- daily/lifetime caps, maximum bid/CPA/value adjustment, maximum automatic step and cooldown;
- minimum telemetry freshness/completeness and conversion-volume confidence;
- marginal incremental retained value/contribution and payback envelope;
- saturation, frequency, overlap/self-competition and creative-fatigue limits;
- refund, chargeback, fraud, complaint, support, brand and quality stops;
- reserved holdout/learning budget that optimizers cannot consume;
- global pause identity independent from channel promoter.
- short provider-side campaign end-time/lease renewed only after healthy readback, so control-plane loss bounds blind delivery;
- upstream prepaid/funding/account caps where available, independent emergency credentials, and a credential/API-outage shutdown drill.

`spend-1` — Provider budget settings are not the only control. Reconcile actual cost from authoritative reports and independently enforce projected plus observed caps.

`spend-2` — Automatic scaling is monotonic and bounded. A model cannot raise its own cap, change its objective, widen sensitive audiences, or bypass the experiment/control allocation.

`spend-3` — An API pause request is not proof of shutdown. Provider-observed zero delivery/spend, lease expiry, upstream caps, and billing reconciliation bound loss when the normal mutation credential or API is unavailable.

## 3. Creative manifest

```text
creative_id and canonical concept/storyboard:
audience, job, message and claim-proof IDs:
product/release/price/offer compatibility:
Product Asset Production Pack request/output IDs:
marketing-owned concept, storyboard, source direction and variant hypotheses:
rights/license/talent/music/voice/UGC/AI requirements and accepted pack evidence refs:
locale, cultural/age suitability and disclosure:
format/aspect/duration/safe-zone/caption/transcript/alt text:
landing/deep-link/CTA and fallback:
channel policy checks and expiry:
variant family, experiment and fatigue lineage:
output digest, upload receipt and observed live ID:
```

Marketing owns the creative brief, concept/storyboard, message,
campaign-specific source direction and variant hypothesis.
`product-asset-production` owns deterministic product capture, exact rendered
files, localization/accessibility variants, rights/provenance and file QA. Store
Listing owns listing narrative, selection/order and channel metadata. Marketing
requests website, YouTube, X, short-video, social, display, creator, email and
in-product candidates through a stable handoff; it does not become the listing
or product-media SSOT.

## 4. Creative automation loop

```text
product/evidence/audience change
-> generate concepts inside truth/rights constraints
-> adversarial claim, policy, cultural and accessibility lint of the brief
-> issue stable Product Asset Production request
-> consume accepted exact rendered/localized pack with provenance
-> independently validate creative-to-link/landing/product consistency
-> independent campaign, economics, policy and exposure validation
-> signed candidate and bounded exposure
-> live creative/landing readback
-> measure attention quality, comprehension, incrementality and fatigue
-> promote, diversify, pause, correct or retire
```

Creative models cannot publish or spend. Validation must detect hallucinated features, altered prices, unsupported superlatives, fake UI, misleading before/after states, unsafe age targeting, missing sponsorship/AI disclosure, unlicensed material, inaccessible captions/contrast, PII/secrets and broken deep links.

## 5. Fatigue and portfolio coordination

Monitor by user/household where lawful, audience, channel, concept, claim, locale and time:

- frequency/reach, repeated exposure and marginal response;
- scroll/skip/hide/report/unsubscribe/complaint;
- creative-to-landing and landing-to-product expectation match;
- incremental activation/retention and refund/support quality;
- cross-campaign audience overlap and auction self-competition;
- concept diversity, novelty decay and cultural incidents.

Pause or rotate from marginal harm, not merely lower CTR. Do not increase urgency or deception to recover a fatigued concept.

## 6. Primary source routes

Verified on 2026-07-11; live-retrieve exact current details:

- [Google Ads API](https://developers.google.com/google-ads/api/docs/get-started/introduction), [bidding](https://developers.google.com/google-ads/api/docs/campaigns/bidding/overview), [budgets](https://developers.google.com/google-ads/api/docs/campaigns/budgets/overview), and [experiments](https://developers.google.com/google-ads/api/docs/experiments/overview)
- [Apple Ads](https://developer.apple.com/documentation/apple_ads)
- [Meta Marketing API](https://developers.facebook.com/documentation/ads-commerce/marketing-api) and [Conversions API](https://developers.facebook.com/documentation/ads-commerce/conversions-api)
- [TikTok Marketing API](https://ads.tiktok.com/help/article/marketing-api) and [Events API](https://ads.tiktok.com/help/article/events-api)
- [X Ads API](https://docs.x.com/x-ads-api/introduction)
- [Reddit Ads API](https://ads-api.reddit.com/docs/v3/)
- [Display & Video 360 API](https://developers.google.com/display-video/api/guides/quickstart/overview)

API capability does not prove advertising permission. Admission must also retrieve the exact current advertising-standard/restricted-category/targeting/disclosure/landing-page rule from the provider's official policy center, including [Google Ads policies](https://support.google.com/adspolicy/), [Apple Ads Terms and Policies](https://ads.apple.com/terms), [Meta Advertising Standards](https://transparency.meta.com/policies/ad-standards/), [TikTok Advertising Policies](https://ads.tiktok.com/help/article/tiktok-advertising-policies-industry-entry), [X Ads Policies](https://business.x.com/en/help/ads-policies), and [Reddit Advertising Policy](https://business.reddithelp.com/s/article/Reddit-Advertising-Policy-Overview). Store section ID and content digest; provider acceptance of an API mutation is not policy approval.
