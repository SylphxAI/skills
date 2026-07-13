# Review Platform Policy And Request State

## Contents

1. Platform adapter record
2. Neutral eligibility
3. Request state machine
4. Current platform findings
5. Prohibited transitions
6. Request-policy tests

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
publisher URL/section, effective_at, retrieved_at, expires_at, digest:
```

Current first-party policy is execution-time authority. If policy is unknown or
stale, disable that adapter rather than guessing. API availability never
overrides solicitation policy.

## 2. Neutral eligibility

Admissible value-event candidates, where current platform policy permits:

- a core task completed with committed success;
- repeated voluntary use across a natural cadence;
- a creation, export, collaboration, or recovery outcome completed;
- a meaningful game or session milestone outside loss, purchase, reward, and
  time-pressure moments.

Ineligible states:

- cold launch or before meaningful experience;
- active error, crash recovery, outage, payment/refund/dispute, support
  escalation, or safety incident;
- inferred negative or positive emotion used as a routing gate;
- immediately after spend, high-value purchase, reward, ad, permission,
  referral, or coerced action;
- child/ineligible audience or territory/platform prohibition;
- over-frequency, opted-out/dismissed state, accessibility blocker, or stale
  authority.

Eligibility establishes enough context for an authentic opinion. It does not
maximize predicted stars.

## 3. Request state machine

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

Persist the authority revision, eligibility reason, value-event identifier,
audience decision, scheduled/attempted time, native invocation result if
available, and cooldown. Do not record an assumed sheet display or selected
star. Do not branch product behavior on review completion.

## 4. Current platform findings

The following findings were verified on 2026-07-11 and must be refreshed before
use.

### Google Play

[Google In-App Review](https://developer.android.com/guide/playcore/in-app-review)
says to trigger after enough experience for useful feedback, avoid excessive
prompting, and not ask questions before or while presenting the rating card,
including “Do you like the app?” or “Would you rate this app 5 stars?”. Google
controls quotas, so the request cannot be a critical product step.

[User Ratings, Reviews, and Installs policy](https://support.google.com/googleplay/android-developer/answer/9898684)
prohibits fraudulent or incentivized ratings, reviews, and install manipulation.

### Apple App Store

[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
direct developers to the provided review API, disallow custom review prompts,
and warn against manipulated, paid, incentivized, filtered, or fake feedback.
[Ratings and reviews](https://developer.apple.com/app-store/ratings-and-reviews/)
is the current API and operations route.

Treat Apple's standardized request as platform-controlled. Do not promise that
it displays, repeat custom pre-prompts, or substitute a five-star graphic.

### Steam

[Steam User Reviews](https://partner.steampowered.com/doc/store/reviews) says
not to ask customers to review from inside the application and not to solicit
reviews in exchange for rewards. Disable in-product solicitation for Steam.

### Other platforms and web

Retrieve current policy separately. A web product may neutrally ask for an
authentic review on a legitimate platform only when allowed. It cannot
fabricate ratings, hide material sponsorship, condition benefits on positivity,
or inherit Apple/Google assumptions.

## 5. Prohibited transitions

| Proposed transition | Result |
| --- | --- |
| “Do you love us?” yes -> public review; no -> private feedback | Reject: sentiment gating and filtering |
| likely-five-star model -> native prompt | Reject: predicted-positive targeting |
| update/referral/reward -> review required -> grant | Reject: incentivized review |
| show five-star image before native card | Reject: star steering/custom prompt risk |
| low rating -> feature or support restriction | Reject: retaliation and manipulation |
| review removed or edited -> reward restored | Reject: coercion |
| review state -> refund, warranty, appeal, dispute, entitlement, compensation, account, data, or support change | Reject: coercive coupling |
| Steam milestone -> in-game review ask | Reject while current platform policy forbids it |
| verified value event -> neutral native request where allowed | Admissible subject to current policy and cooldown |

Private feedback and help remain reachable independently in every public
eligibility state.

## 6. Request-policy tests

- Sentiment, star prediction, payer value, spend, tier, vulnerability, complaint
  history, and private-feedback state cannot affect public eligibility.
- Purchase, update benefit, referral grant, ad reward, and review state are
  unjoinable as reward conditions.
- Refund, warranty, appeal, chargeback/dispute, entitlement, compensation,
  account restriction, data access, and support eligibility/priority are
  unjoinable with review state in both directions.
- Native API no-op or failure leaves the product flow complete.
- The platform adapter disables on expired or unknown authority.
- Cooldown persists across devices/accounts where appropriate without covert
  identity linkage.
- Child/ineligible modes and support, safety, payment, or outage incidents
  suppress solicitation.
- Private feedback and help stay reachable in every request state.
- The Steam adapter never invokes in-product review solicitation while current
  policy forbids it.

Record `review_request_eligible`, `review_request_attempted`,
`review_request_cooldown_started`, and `review_request_adapter_disabled` with
the adapter authority revision and neutral eligibility reason. Measure request
fatigue, complaints, accessibility failures, API no-op/error, cooldown behavior,
and downstream product-quality outcomes. Do not optimize only prompt volume,
review count, or average stars.
