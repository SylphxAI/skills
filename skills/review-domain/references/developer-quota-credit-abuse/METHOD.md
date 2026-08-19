# Developer Quota Credit Abuse
Protect finite platform resources without making successful legitimate developers
look indistinguishable from abuse.

## Workflow

1. Define the developer journey, account/org/app units, quota and credit types,
   costly operations, resource cost model, public promise, production criticality,
   trust states, and decisions the system may take.
2. Read `developer-quota-credit-abuse-patterns.md`.
3. Verify current sources at use: entitlement and pricing contract, public
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

## Source verification

- Resolve the current entitlement and price contract, public quota promise,
  credit terms, cost model, typed threshold configuration, risk-policy version,
  privacy basis, support/appeal rules, and incident state before recommending an
  action or claiming a limit.
- Prefer signed contracts, provider and product configuration, governed policy,
  canonical ledgers, and observed cost evidence. Those current sources override
  documentation and model memory.
- Keep evasion-sensitive thresholds and linkage logic internal and access
  controlled. Unknown, stale, or conflicting authority blocks irreversible or
  high-impact actions; it does not invite an invented default.

## Path

- Risk cutoffs, linkage logic, velocity limits, cluster counts, spend caps, and other evasion-sensitive parameters stay with the authorized operator source. The assessment names the source, not the numbers.
- Purchased value and entitlements move only with current contract, payment, and authorized policy evidence.
- Success is legitimate first value, conversion, scale-up, appeal reversal, and retention alongside cost.
- An irreversible high-impact decision carries its own policy, evidence, and review. A score is one input.
- Identity, device, and network linkages carry purpose, access, retention, and privacy controls.
- Limits, review SLAs, and appeal outcomes come from a current authorized source.

## Output

```text
Product context and current sources:
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
