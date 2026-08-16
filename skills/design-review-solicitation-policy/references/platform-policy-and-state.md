# Platform policy and request state

## Adapter fields

For each platform, record:

- storefront, territory, product, audience, and native request surface;
- current first-party policy URL, applicable section, retrieval time, and owner;
- meaningful-value events and context eligibility;
- native quota or suppression behavior and product cooldown;
- locale, accessibility, age, foreground, and presentation requirements;
- offline, error, policy-expiry, and recovery behavior.

Retrieve current rules from the platform's first-party sources at execution
time. Common starting points include [Google Play In-App Review](https://developer.android.com/guide/playcore/in-app-review),
[Google Play ratings policy](https://support.google.com/googleplay/android-developer/answer/9898684),
[Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/),
[Apple ratings and reviews](https://developer.apple.com/app-store/ratings-and-reviews/),
and [Steam User Reviews](https://partner.steampowered.com/doc/store/reviews).

## Request lifecycle

```text
context_observed
-> meaningful_value_verified
-> current_policy_eligible
-> request_scheduled
-> native_api_invoked
-> platform_presented_or_suppressed
-> cooldown
-> eligible_under_current_policy

request_scheduled -> context_changed -> canceled
current_policy_eligible -> policy_expired -> policy_refresh_required
```

Persist the policy revision, eligibility reason, value-event identifier,
audience decision, schedule and attempt times, native result when supplied, and
cooldown. Treat presentation and rating details as available only when the
platform supplies those values.

## Acceptance conditions

- Eligibility derives from verified value and current platform policy.
- Sentiment, predicted rating, spend, tier, vulnerability, complaint history,
  and private feedback have equal standing in the eligibility decision.
- Review state leaves compensation, money, access, remedies, support, rewards,
  accounts, entitlements, data rights, and product behavior unchanged.
- The native platform surface controls presentation.
- Private feedback and help remain reachable throughout the lifecycle.
- Expired or unknown policy pauses invitations while the platform adapter
  refreshes its first-party policy source.
- Cooldown, accessibility, audience, offline, incident, support, and recovery
  states produce deterministic lifecycle transitions.
