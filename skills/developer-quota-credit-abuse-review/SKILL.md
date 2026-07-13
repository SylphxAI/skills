---
name: developer-quota-credit-abuse-review
description: Design or audit the reusable product policy for developer quotas, free or promotional credits, costly-operation access, trust-tier graduation, abuse-resistant ledgers, adaptive friction, throttling, review, appeals, cost controls, and legitimate production scale-up. Use when generosity, activation, and abuse economics must be balanced across a developer platform. Do not use for one account's 429 debugging or limit-increase ticket, low-level rate-limiter implementation, infrastructure capacity planning, DDoS response, package pricing, payment settlement, or a fraud investigation alone.
---

# Developer Quota Credit Abuse Review

Protect finite platform resources without making successful legitimate developers
look indistinguishable from abuse.

## Workflow

1. Define the developer journey, account/org/app units, quota and credit types,
   costly operations, resource cost model, public promise, production criticality,
   trust states, and decisions the system may take.
2. Read `references/developer-quota-credit-abuse-patterns.md`.
3. Verify current authority at use: entitlement and pricing contract, public
   quota docs, credit terms, cost model, risk-policy version, typed threshold
   configuration, privacy/identity rules, support/appeal policy, and incident state.
4. Separate entitlement, prepaid/purchased value, promotional grants, rate,
   concurrency, capacity protection, and abuse-risk controls. Give each its own
   ledger or policy authority instead of one ambiguous "quota".
5. Model the credit ledger from grant lot through reserve, consume, settle,
   expire, refund/reverse, and adjustment. Preserve idempotency, attribution,
   restrictions, and immutable audit history.
6. Build a signal registry and trust ladder. Use the least intrusive action that
   contains expected harm: guidance -> warning -> soft limit -> verification ->
   cooldown/queue -> scoped endpoint restriction -> review -> suspension.
7. Define a fast legitimate scale-up path with forecast, verification,
   temporary increase, production-safe notice, expiry, upgrade/contract route,
   and appeal. Prevent sudden controls from silently breaking trusted workloads.
8. Measure activation, conversion, platform cost, prevented abuse, false
   positives, appeals, support load, exception debt, and developer retention by
   trust tier and cohort. Test displacement into new accounts/campaigns.
9. Produce the quota/credit authority map, ledger contract, trust/action matrix,
   explanation policy, appeal and graduation model, and balanced metric plan.

## When not to use

- For token-bucket, distributed rate limiting, queueing, or capacity engineering,
  emit the product policy and hand implementation to the engineering owner.
- For package and price architecture, use `saas-subscription-pricing`.
- For payment authorization, settlement, refunds, or chargebacks, use
  `payment-platform-readiness`; consume its canonical money state.
- For DDoS or active security incidents, use the current Doctrine incident and
  security procedures.
- For a specific fraud case, preserve evidence and authorized review; this
  skill designs the reusable product controls, not the case verdict.
- For one developer account or app's diagnostics, support case, or bounded
  limit-increase request, use `developer-product-experience-review` and consume
  the current quota policy rather than redesigning it here.

## Source verification

- Resolve the current entitlement and price contract, public quota promise,
  credit terms, cost model, typed threshold configuration, risk-policy version,
  privacy basis, support/appeal rules, and incident state before recommending an
  action or claiming a limit.
- Prefer signed contracts, provider and product configuration, governed policy,
  canonical ledgers, and observed cost evidence. Documentation or model memory
  never overrides those authorities.
- Keep evasion-sensitive thresholds and linkage logic internal and access
  controlled. Unknown, stale, or conflicting authority blocks irreversible or
  high-impact actions; it does not invite an invented default.

## Guardrails

- Never reveal or invent risk cutoffs, account-linkage logic, velocity limits,
  cluster counts, spend caps, or other evasion-sensitive parameters.
- Never revoke purchased value or entitlements as if they were promotional
  credits without current contract, payment, and authorized policy evidence.
- Never let cost reduction be the only success metric; measure legitimate first
  value, conversion, scale-up, appeal reversal, and retention.
- Never make an irreversible high-impact decision from an opaque score alone.
- Never collect identity/device/network linkages without purpose, access,
  retention, and privacy controls.
- Never promise a limit, review SLA, or appeal outcome that is not present in a
  current authorized source.

## Output

```text
Product context and current authority:
- journey / quota-credit types / cost drivers / policy-config versions / audience

Ledger contract:
| Asset/grant | Authority | States | Restrictions | Expiry | Reversal/refund | Audit |
| --- | --- | --- | --- | --- | --- | --- |

Trust and action matrix:
| Trust state | Safe access | Evidence band | Action ladder | Production protection | Graduation/appeal |
| --- | --- | --- | --- | --- | --- |

Signal and disclosure policy:
- internal evidence / permitted use / privacy / safe developer explanation

Balanced readout:
- activation / conversion / cost / abuse / false positives / support / retention

Blocked facts and owner handoffs:
- current source required / affected decision / owner / implementation handoff
```
