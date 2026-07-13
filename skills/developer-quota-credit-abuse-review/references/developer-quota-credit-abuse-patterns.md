# Developer Quota and Credit Abuse Patterns

## Contents

- [Current-authority-at-use protocol](#current-authority-at-use-protocol)
- [Separate control planes](#separate-control-planes)
- [Credit ledger model](#credit-ledger-model)
- [Trust and action state model](#trust-and-action-state-model)
- [Rule IDs](#rule-ids)
- [Signal registry](#signal-registry)
- [Action ladder](#action-ladder)
- [Balanced measurement matrix](#balanced-measurement-matrix)
- [Events](#events)

## Current-authority-at-use protocol

At task time retrieve the current product entitlement/price contract, public
quota documentation, credit terms, cost model, risk-policy version, typed
threshold configuration, privacy and account-linking rules, support/appeal
policy, and active incident overrides. Record owner, version, effective date,
audience, and canonical location.

Use named internal parameters without values in reusable or externally shareable
output. If the value or policy is unavailable, mark the affected action
`authority_blocked`; do not infer it from model memory or a previous incident.

## Separate control planes

| Control | Question | Canonical evidence |
| --- | --- | --- |
| Entitlement | what capability was purchased or contracted? | product/billing entitlement |
| Purchased/prepaid value | what monetary or contractual value remains? | payment/credit balance authority |
| Promotional grant | what free value, restrictions, and expiry apply? | immutable grant lot |
| Budget quota | how much may be consumed in a period? | account/org/app policy |
| Rate/concurrency | how quickly may work enter? | product limit policy |
| Capacity protection | what protects service health now? | engineering/incident authority |
| Abuse control | what additional friction follows risk evidence? | versioned trust/risk policy |

Never use an abuse score to rewrite a purchased balance. Emit a hold/review
referral to the authorized money or entitlement owner when needed.

## Credit ledger model

```text
grant_created -> available -> reserved -> consumed -> settled
available -> expired
reserved -> released
consumed -> reversed_or_adjusted
grant_created -> voided_before_use
```

Every movement records operation ID, developer/org/app, grant lot, source,
campaign/contract, asset type, units, restrictions, expiry, cost attribution,
reason, actor/system, policy version, and linked payment/support case as allowed.
Retries are idempotent; history is append-only even when the visible balance is
corrected.

## Trust and action state model

```text
anonymous -> contact_verified -> domain_or_payment_verified -> production_trusted -> contracted
usage_observed -> risk_band_assigned -> no_action_or_guidance
risk_band_assigned -> soft_limit_or_verification -> cleared_or_review
review -> restriction_or_restore -> appeal -> upheld_or_reversed
trusted_scaleup -> forecast_review -> temporary_lift -> graduated_or_expired
```

Trust is contextual and expiring. Verification reduces uncertainty; it does not
prove all future use is benign. A risk signal is evidence for a bounded action,
not an identity label.

## Rule IDs

- `quota-credit-1` — Separate entitlement, purchased value, promotion, budget,
  rate/concurrency, capacity protection, and abuse control authorities.
- `quota-credit-2` — Define quota units by real cost and scarcity drivers such
  as requests, tokens, model tier, GPU time, storage, bandwidth, builds, indexing,
  messages, payouts, and downstream vendor cost.
- `quota-credit-3` — Maintain an append-only, idempotent grant-lot ledger with
  reserve/consume/settle/expire/reverse states and cost attribution.
- `quota-credit-4` — Scope trust and controls to person/account, organization,
  app, credential, workload, endpoint, and campaign only as evidence permits.
- `quota-credit-5` — Govern signals by purpose, source/version, freshness,
  confidence, privacy, manipulation risk, permitted action, and disclosure class.
- `quota-credit-6` — Apply the least intrusive effective response and keep
  high-impact restrictions reviewable, reversible, and appealable.
- `quota-credit-7` — Protect trusted production workloads with current notices,
  safe degradation where feasible, status visibility, and fast escalation.
- `quota-credit-8` — Give legitimate scale-up a forecast-based temporary lift,
  expiry, monitoring, and clear route to verified or contracted capacity.
- `quota-credit-9` — Explain reason category, affected resource, next action,
  status, and appeal route without disclosing evasion-sensitive evidence.
- `quota-credit-10` — Distinguish promotion expiry/reversal from purchased-value
  refund or entitlement revocation; use the authorized money state.
- `quota-credit-11` — Pair each cost/abuse metric with activation, conversion,
  false-positive, appeal, support, and retention harm metrics.
- `quota-credit-12` — Measure displacement across new accounts, campaigns,
  credentials, endpoints, and resource types after a control changes.
- `quota-credit-13` — Expire exceptions and temporary lifts; record owner,
  forecast, reason, monitoring, end state, and renewal decision.
- `quota-credit-14` — Keep exact thresholds in current typed configuration and
  omit them from reusable artifacts and public explanations.
- `quota-credit-15` — Minimize and protect account-linking evidence; do not use
  sensitive or proxy attributes without authorized purpose and review.
- `quota-credit-16` — Treat appeal reversals and repeated legitimate blocks as
  control defects that require policy, signal, docs, or support correction.

## Signal registry

| Family | Examples | Risk and handling |
| --- | --- | --- |
| Usage economics | unit mix, expensive endpoint, retries, failures, vendor cost | distinguish inefficient integration from abuse |
| Grant behavior | promo cycling, expiry avoidance, repeated campaign use | require grant/source linkage |
| Identity/trust | verified contact/domain/payment/app/contract | minimize data; verification is not guilt/innocence |
| Account relationship | authorized shared org/payment/infrastructure signals | privacy, household/company NAT, false linkage |
| Workload quality | success ratio, repeated invalid jobs, automation pattern | bad SDK/docs can create same signal |
| Payment risk | chargeback/refund/payment state | consume payment authority; do not reinvent |
| Support/appeal | prior reversals, scale-up evidence, incident correlation | protect against both repeat harm and repeat false positives |

For each signal record internal-only/external-safe classification. Do not publish
exact cutoffs, feature weights, cluster linkage, velocity windows, or evasion
logic. Developer-facing reasons should be specific enough to recover safely but
not to optimize around detection.

## Action ladder

| Action | Use when | Required protection |
| --- | --- | --- |
| Guidance | likely integration inefficiency or approaching limit | docs, forecast, status visibility |
| Warning | mature evidence before material harm | affected resource and next safe action |
| Soft limit/queue | reversible cost containment | predictable behavior and recovery |
| Verification | additional trust resolves uncertainty | data minimization and accessible path |
| Cooldown | short-lived velocity/resource risk | clear end condition and status |
| Scoped restriction | one costly capability drives harm | preserve unrelated legitimate work |
| Review/suspension | high confidence or high blast radius | evidence freeze, owner, appeal, reversal |

## Balanced measurement matrix

| Family | Measures | Failure signal |
| --- | --- | --- |
| Activation | first successful value, time to value, verified production use | controls save cost but block first value |
| Conversion | trial-to-paid, verified/contract graduation, lift-to-contract | friction rises without healthy graduation |
| Cost | burn per activated/converted developer, costly-operation spend | generosity has no path to durable value |
| Abuse | confirmed loss, prevented grant cycling, repeat harm | abuse shifts to new source or resource |
| False positives | appeal reversal, trusted workload block, restored credit | legitimate use repeatedly classified as abuse |
| Support | contact rate, status latency, queue age, repeat contacts | controls externalize load to support |
| Retention | return after throttle/appeal, churn by trust tier | good developers leave after controls |
| Exceptions | active/expired lifts, forecast accuracy, graduation | permanent exception debt |

Compare before/after by trust state, developer maturity, product surface, and
campaign. Use a holdout or staged policy change when safe; pair every success
metric with a harm metric and wait for the relevant outcome window.

## Events

Track `credit_grant_created`, `credit_reserved`, `credit_consumed`,
`credit_reversed`, `quota_warning_shown`, `quota_action_applied`,
`verification_requested`, `scaleup_requested`, `temporary_lift_granted`,
`appeal_resolved`, and `developer_graduated`. Include policy/config version,
control family, trust state, reason category, action scope, ledger operation ID,
cost band, appeal state, and outcome. Exclude exact thresholds and raw sensitive
linkage evidence from general analytics.
