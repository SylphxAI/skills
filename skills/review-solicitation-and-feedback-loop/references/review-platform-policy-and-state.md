# Review Platform Policy And State

## 1. Platform adapter record

```text
platform/storefront/territory/product/audience:
in-product solicitation allowed, forbidden, or authority-unknown:
required native API/surface and current version:
eligible meaningful-value events:
ineligible/suppressed states:
platform quota/cooldown and app-side cooldown:
wording/presentation constraints:
age, locale, accessibility and foreground requirements:
no-display, error and offline behavior:
review ingestion/response API and limits:
publisher URL/section, effective_at, retrieved_at, expires_at, digest:
```

Current policy is execution-time authority. If policy is unknown or stale, do not solicit on that adapter.

## 2. Neutral eligibility

Good value-event candidates, where platform policy permits:

- completed core task with committed success;
- repeated voluntary use across a natural cadence;
- creation/export/collaboration outcome completed;
- meaningful game/session milestone without a loss/purchase pressure moment.

Ineligible states:

- cold launch or before meaningful experience;
- active error, crash recovery, outage, payment/refund/dispute, support escalation or safety incident;
- inferred negative or positive emotion as a routing gate;
- immediately after spend, high-value purchase, reward, ad, permission, referral, or coerced action;
- child/ineligible audience or territory/platform prohibition;
- over-frequency, opted out/dismissed, accessibility blocker, or stale authority.

Eligibility is about enough context for an authentic opinion, not maximizing predicted stars.

## 3. State machine

```text
ineligible
-> meaningful_value_verified
-> policy_and_context_eligible
-> request_scheduled
-> native_api_invoked
-> platform_may_show_or_suppress
-> cooldown
-> eligible_again_if_current_policy_allows

request_scheduled -> state_changed_or_error -> canceled
policy_and_context_eligible -> authority_expired -> adapter_disabled
```

Do not observe whether the native sheet displayed or what star was selected unless the platform explicitly supplies an authorized aggregate/result. Do not branch product behavior on review completion.

## 4. Platform findings

Verified on 2026-07-11 and subject to refresh:

### Google Play

[Google In-App Review](https://developer.android.com/guide/playcore/in-app-review) says:

- trigger after enough experience to provide useful feedback;
- do not prompt excessively;
- do not ask questions before or while presenting the rating card, including “Do you like the app?” or “Would you rate this app 5 stars?”;
- quotas are controlled by Google and should not be relied upon for a critical flow.

[User Ratings, Reviews, and Installs policy](https://support.google.com/googleplay/android-developer/answer/9898684) prohibits fraudulent or incentivized ratings/reviews and install manipulation.

### Apple App Store

[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) direct developers to the provided review API, disallow custom review prompts, and warn against manipulated, paid, incentivized, filtered or fake feedback. [Ratings and reviews](https://developer.apple.com/app-store/ratings-and-reviews/) is the current API/operations route.

Treat Apple's standardized request as platform-controlled; do not promise display, repeat custom pre-prompts, or substitute a five-star graphic.

### Steam

[Steam User Reviews](https://partner.steamgames.com/doc/store/reviews) says not to ask customers to review from inside the application and not to solicit reviews in exchange for rewards. Therefore the in-product solicitation adapter is disabled; use authentic store/community discovery and product quality, not a custom prompt.

Steam also cautions that replying to every review can draw attention. Respond selectively and factually.

### Official ingestion and response routes

- [Apple App Store Connect Customer Reviews](https://developer.apple.com/documentation/appstoreconnectapi/customer-reviews) — retrieve current read/response endpoints, roles, scopes and limits.
- [Google Play Reply to Reviews](https://developers.google.com/android-publisher/reply-to-reviews) — retrieve current Publisher API authorization, quotas, fields and response semantics.
- [Steam GetReviews](https://partner.steamgames.com/doc/store/getreviews) — retrieve current public review-read interface and parameters; do not infer a write/reply API from read access.

For every adapter record separate read, reply/write, delete/correct, pagination/cursor, quota, moderation, role and live-response-readback authority. API availability never overrides solicitation or content policy.

### Other platforms/web

Retrieve current policy. A web product may ask for private feedback or a testimonial/review on a legitimate platform, but cannot fabricate ratings, hide material sponsorship, condition benefits on positivity, or import Apple/Google native assumptions.

## 5. Prohibited transition table

| Proposed transition | Result |
| --- | --- |
| “Do you love us?” yes -> public review; no -> private feedback | reject: sentiment gating/filtering |
| likely-five-star model -> native prompt | reject: predicted positivity targeting |
| update/referral/reward -> review required -> grant | reject: incentivized review |
| show five-star image before native card | reject: star steering/custom prompt risk |
| low rating -> feature/support restriction | reject: retaliation/manipulation |
| review removed/edited -> reward restored | reject: coercion |
| review posted/raised/deleted -> refund, warranty, appeal, dispute, entitlement, compensation or support outcome changes | reject: coercive bidirectional coupling |
| Steam session milestone -> in-game review ask | reject: platform-specific prohibition |
| verified value event -> neutral native request where allowed | admissible subject to current policy/cooldown |
| feedback/support link always available | required independent path |

## 6. Review ingestion and response

Normalize authorized review facts:

```text
review_id, platform, locale, rating_if_supplied, title/body,
created/updated time, app version/device if supplied,
developer response/status, source URL, ingestion cursor,
privacy/redaction, classification and linked evidence cluster
```

Response candidates must cite known release/support facts. Use a response when it can acknowledge, clarify, explain a verified fix/version, provide a safe support route, or correct a material misunderstanding respectfully. Never reveal account data, diagnose privately in public, argue, market, spam, ask for a higher rating, or promise an uncommitted feature/date.

## 7. Tests

- sentiment classifier output cannot affect public eligibility;
- purchase, update benefit, referral grant, ad reward and review state are unjoinable as reward conditions;
- refund, warranty, appeal, chargeback/dispute, entitlement, compensation, account restriction, data access, support eligibility/priority and review state are unjoinable in both directions;
- native API no-op/failure leaves the product flow complete;
- platform adapter disables on expired/unknown authority;
- cooldown persists across devices/accounts as appropriate without covert tracking;
- child/ineligible modes and support/safety/payment incidents suppress solicitation;
- private feedback/help remains reachable in every public eligibility state;
- response generator cannot publish unsupported claim, personal data or rating request;
- Steam adapter never invokes in-product review solicitation.
