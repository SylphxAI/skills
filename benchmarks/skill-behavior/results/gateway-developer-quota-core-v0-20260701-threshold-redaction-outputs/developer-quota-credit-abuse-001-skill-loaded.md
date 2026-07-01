```text
Developer quota/credit context:
API/AI platform offering free trial credits, promo codes, pay-as-you-go tokens, premium/expensive endpoints (long-context inference, image/video generation, fine-tune jobs, high-RPS webhooks), with anonymous signup, email and domain verification, payment verification, and an app-certification track for production workloads. Credits are issued from trial grants, partner promos, referral bonuses, support exceptions, and contract pilots.

Audience / source of truth: Trust & Risk Ops owns abuse policy; Billing owns ledger; Developer Experience owns messaging and upgrade paths. Source-of-truth records: credit ledger, quota ledger, usage event stream, trust-tier state, risk-scoring service, review queue, appeal records.

Risk boundary: free-tier generosity is a deliberate growth lever — controls must protect cost without killing activation, conversion, or graduation.

Threshold disclosure policy: public-safe bands and named internal parameters only. Exact risk-score cutoffs, linked-account cluster counts, velocity caps, spend caps, percentage alert triggers, review thresholds, and SLA-hour targets are redacted; stored in internal config with owner, version, and rollback path.
```

### Quota abuse control plan

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Credit sources | One ledger per developer; campaign, expiry, refund, attribution tracked | Ledger schema audit | Promo cycling, double-claim | Billing |
| Quota units | Map tokens, GPU-seconds, storage GB-days, expensive-endpoint calls to cost driver | Cost-tagging review | Mispriced generosity | FinOps + Trust Ops |
| Trust tiers | Anonymous → email → domain → payment → app-certified → contract | Verification signals | Over-trust of unverified | Identity |
| Expensive endpoints | Tier-gated; pre-flight cost preview; soft cap before hard block | Endpoint mix + cost bucket | Cost runaway | Platform |
| Multi-accounting | Risk-band review queue; cluster signals redacted | Evidence packet (internal) | False positive on shared infra | Trust Ops |
| Promo cycling | One active promo per identity band; expiry enforced | Ledger + identity graph | Repeated free credit | Growth + Trust Ops |
| Token churn / failed-job farming | Retry/queue anomaly scoring | Usage event stream | Compute drain | Platform |
| Throttles | Warn → soft cap → queue → cooldown → verify → manual review → suspend credits → block endpoint | Trust-tier policy band | Silent over-block | Trust Ops |
| Manual review | Second-reviewer for high-impact; quality metrics tracked | Queue age, overturn rate | Inconsistent decisions | Trust Ops |
| Appeals | Single appeal path with evidence upload; reversals feed models | Appeal ledger | Repeat harm | Support + Trust Ops |
| Scale-up request | Forecast intake; temporary lift with expiry; convert-to-contract path | Usage forecast | Developer churn | DX + Sales |
| Cost guardrails | Daily/weekly cost anomaly alerts by cohort | Cost dashboard | Runaway spend | FinOps |
| Developer messaging | Reason category + next safe action + appeal link; no threshold detail | Copy review | Confusion, evasion | DX |
| Graduation | Trial → paid, verification completion, app-cert, committed-use | Funnel metrics | Stalled conversion | Product |

### Controls — trigger → policy band

- **Credit issued** → ledger entry with source, expiry, cost attribution; reversal supported.
- **Quota applied** → tier-specific internal cap; soft cap warns before hard cap.
- **Expensive endpoint call** → pre-flight preview for unverified tiers; throttle by trust band.
- **Velocity / endpoint-mix anomaly** → risk-band throttle; reason category shown to developer.
- **Multi-accounting signal** → queue for evidence-based review; no auto-ban without second reviewer.
- **Promo cycling pattern** → suspend new promo eligibility for the identity band; one appeal.
- **Token / failed-job churn** → cooldown window; require verification to lift.
- **Failed payment or chargeback** → hold remaining credits pending review.
- **Legitimate scale-up** → forecast form → temporary lift with documented expiry → contract or paid upgrade.
- **Appeal approved** → restore state, refund credits, log reversal reason, retrain signal.
- **Appeal denied** → reason category, escalation to second review, no permanent ban without policy review.
- **Cost anomaly** → cohort-level throttle, not developer-level, unless confirmed abuse.

### Metrics and guardrails

| Metric family | What to measure | Guardrail / decision |
| --- | --- | --- |
| Activation | first successful call, first expensive endpoint after verification, time to first value | Tier-specific floor; alert on material drop after throttle change |
| Conversion | trial-to-paid, verification completion, app-cert rate, exception-to-contract | Pair with throttle rate; flat conversion + rising throttle = harm |
| Cost and abuse loss | credit burn by source, cost per activated developer, expensive-endpoint spend, confirmed abuse loss, blocked credit value | Cohort cost ceiling; MTTR on anomaly |
| False positives / appeals | appeal reversal rate, manual-review overturn rate, legitimate scale-up blocked, trusted-tier throttle rate | Reversal-rate ceiling per tier; second review if breached |
| Support load | quota-ticket rate, appeal status latency, time to first response, second-review queue age | Support load must not grow faster than review capacity |
| Developer retention | retention by tier and cohort, churn after throttle, churn after denied appeal, return after approved appeal | Track post-throttle cohort separately |
| Exception health | temporary lift expiry compliance, forecast accuracy, exception-to-paid conversion | Expire stale lifts; convert or close |

### Threshold/evasion safety

- Internal-only: risk-score cutoffs, cluster counts, velocity caps, spend caps, percentage triggers, unit multipliers, review thresholds, SLA-hour targets, ban/reversal limits — stored in authorized config with version and owner.
- Developer/support copy: states reason category, next safe action, appeal route, and status visibility only. No numeric thresholds, no linking logic, no detection signal names.
- Every throttle or credit-control change ships with a paired activation/conversion metric and a harm metric; rollout guardrail and rollback path required.
- Confirmed abuse and appeal reversals feed back into tiers, promos, risk models, docs, and support macros each cycle.
