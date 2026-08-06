# Marketing Measurement, Risk, And Economics

## 1. Canonical ledgers

Keep append-only, reconcilable facts:

- exposure/delivery ledger: platform event, creative, placement, audience policy, time;
- cost ledger: provider/account/currency/time, accrued/final cost, fees and credits;
- product outcome ledger: qualified visit, activation, retained value, commerce, refund, fraud and support;
- consent/identity ledger: allowed joins, revocation, deletion and purpose;
- experiment ledger: eligibility, assignment, exposure, interference and analysis version;
- platform desired/observed state ledger: candidate, mutation, receipt, readback and drift.

Client pixels are not authoritative billing, entitlement, refund, spend or consent truth. Reconcile server and provider sources; dedupe retry, cross-device and repeated conversions under the declared privacy model.

## 2. Measurement ladder

```text
delivery verification
-> attribution correlation
-> controlled incrementality where feasible
-> quasi-experimental/geo evidence where appropriate
-> MMM/triangulation for portfolio effects
-> retained contribution and strategic option value
```

Attribution helps operations but does not establish causality. Experiments require unit, eligibility, randomization, exposure definition, power/sensitivity, novelty window, interference plan, primary metric, guardrails, stopping rule, multiple-testing policy and immutable analysis plan.

Reserve holdouts before optimizers allocate the full audience/budget. Do not let a model end a losing holdout early, reclassify conversions, or choose the metric after seeing results.

## 3. Economic objective

```text
incremental retained contribution =
incremental durable revenue/value
- media and platform fees
- fraud/invalid traffic/referral abuse
- refunds, chargebacks and credits
- variable infra/model/content/rights cost
- incremental support/moderation/operations
- tax and channel-specific variable costs
```

Track uncertainty, payback, cash-flow/currency effects, saturation, cohort retention, payer concentration and option value. Do not use traditional human production cost as a capability-construction veto; real external spend and variable runtime costs remain economic facts.

## 4. Constrained risk-adjusted value

First apply admission:

```text
admitted = current law/platform authority
AND safety/child/consent/privacy
AND truthful claims/non-deceptive treatment
AND rights/disclosure
AND bounded, observable, recoverable blast radius
```

Explicitly prohibited behavior is rejected. Genuine ambiguity may enter a narrow evidence lane only with a source/interpretation/expiry record, independent validation, signed cap, canary, auto-pause, correction plan and maximum loss.

For admitted candidates:

```text
RAV = E[incremental retained contribution + user value + option value]
    - E[remediation + reputation + platform/account + support losses]
    - lambda * CVaR_q(total correlated loss)
```

Require ruin probability below the declared boundary and model portfolio correlation. A developer account suspension can affect multiple products, channels and future releases; it is not equivalent to a reversible creative underperformance warning.

### Required numeric decision record

Every scale/hold/pause decision must state:

```text
currency, measurement unit and decision horizon:
candidate spend/exposure steps:
posterior/scenario source and timestamp:
scenario probability, incremental retained contribution, other loss,
correlation group, fixed-versus-scaling behavior and uncertainty:
expected net value and conservative bound:
ruin_limit and maximum P(loss > ruin_limit):
CVaR confidence q and maximum CVaR loss budget:
independent cash/spend cap, provider lease and maximum step:
derived admissible cap and exact scale | hold | pause action:
sensitivity result and next evidence trigger:
```

If quantities cannot be estimated honestly, preserve intervals/scenarios and choose the largest action that passes every bound under the declared conservative case. Do not hide missing units behind a qualitative score.

### Deterministic fixture

Assume an already-admitted seven-day paid canary. Let `s` be committed spend in $1,000 units, with candidate `s ∈ {0,1,2,3}`. Loss is positive and incremental retained contribution is included, so a negative loss is a gain.

| Scenario | Probability | Seven-day loss |
| --- | ---: | ---: |
| strong retained lift | 0.50 | `-$1,000 * s` |
| weak response | 0.30 | `$100 * s` |
| poor response/refunds | 0.15 | `$700 * s` |
| correlated provider/brand incident | 0.05 | `$4,000 + $800 * s` |

Risk posture:

```text
ruin_limit = $10,000
maximum P(loss > ruin_limit) = 1%
CVaR_95 loss budget = $5,000
cash/spend cap = $3,000
maximum automatic step from current s=0 = 1 unit
```

For `s=1`:

```text
E[loss] = 0.50*(-1000) + 0.30*100 + 0.15*700 + 0.05*4800
        = -$125
expected incremental retained contribution after modeled loss = +$125
P(loss > $10,000) = 0%
CVaR_95(loss) = $4,800
```

`s=1` passes. `s=2` has `CVaR_95 = $5,600`, so it fails even though expected value is positive. The derived current cap is therefore `$1,000` for seven days and the action is **canary at s=1; hold further scale** until new evidence changes the scenario distribution or risk posture. If admission fails because the behavior is prohibited, `s=0` regardless of this arithmetic.

Forward tests must change one input at a time—scenario probability, fixed correlated loss, CVaR budget, ruin limit, or maximum step—and verify the derived action changes correctly.

## 5. Privacy, consent, and sensitive audiences

- purpose-limit first-party data and channel audience exports;
- record consent, jurisdiction, age mode, source, expiry and withdrawal propagation;
- minimize identifiers, retention and joins; isolate sensitive categories;
- do not infer or target vulnerability, health, finance, children or crises for exploitative persuasion;
- enforce ATT/consent/platform restrictions and current regional authority;
- make measurement degradation explicit when consent is absent; never fill it with covert fingerprinting;
- preserve deletion/access/appeal and audit evidence.

## 6. Fraud, brand safety, and reputation

Cover bots/invalid traffic, click injection, attribution theft, duplicate conversion, referral/coupon abuse, fake leads, creator/affiliate fraud, account takeover, counterfeit inventory, domain/app spoofing, unsafe placements, misinformation adjacency, comment spam and review manipulation.

Use allow/deny/suitability policy, ads.txt/app-ads.txt/sellers.json/supply-chain evidence where applicable, anomaly/model signals, independent provider reconciliation, bounded holds, investigation evidence and appeals. Automated enforcement has graduated response and false-positive reversal.

## 7. Decision table

| Signal | Default machine action |
| --- | --- |
| Product claim/release mismatch | pause affected creative/campaign; open correction candidate |
| Stale or incomplete conversion/cost data | freeze scale; hold or reduce spend inside safe floor |
| Cap/readback divergence | independent global/channel pause and reconcile |
| Incremental value positive, guardrails green, unsaturated | bounded step after cooldown |
| Platform ROAS positive but holdout lift absent/negative | hold; diagnose attribution/cannibalization |
| Refund/fraud/complaint/support spike | pause implicated audience/creative/offer; preserve evidence |
| Policy rejection or current authority unknown | fail closed for publication/spend on that surface |
| Creative fatigue | diversify/rotate or reduce frequency; do not intensify deception |
| Tracking outage but campaign still spends | pause unless an explicitly pre-authorized low-risk blind window exists |

## 8. Primary source routes

- [Google Ads conversions](https://developers.google.com/google-ads/api/docs/conversions/overview)
- [Google Meridian](https://developers.google.com/meridian) and [Meta Robyn](https://facebookexperimental.github.io/Robyn/) for MMM routes
- [Apple AdAttributionKit](https://developer.apple.com/documentation/adattributionkit) and [App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- [MRC standards](https://www.mediaratingcouncil.org/standards-and-guidelines)
- [IAB ads.txt](https://iabtechlab.com/ads-txt/), [sellers.json](https://iabtechlab.com/sellers-json/), and [OpenRTB](https://iabtechlab.com/standards/openrtb/)

These are routes, not frozen compliance or measurement verdicts.
