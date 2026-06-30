# Live Event Ops Systems

A live event is a temporary operating system: config, eligibility, rewards, messaging, monitoring, support, and shutdown must agree.

## Rule IDs

- `live-event-1` — Define one primary objective: activation, retention, revenue, reactivation, community, content discovery, or fairness repair.
- `live-event-2` — Eligibility needs segment, region, platform, app version, account state, payer state, abuse state, and timezone rules.
- `live-event-3` — Rewards/offers must have inventory, grant idempotency, expiration, refund/revoke semantics, and economy impact review.
- `live-event-4` — Event configuration should be versioned, reviewable, staged, and rollbackable.
- `live-event-5` — Communication should state who qualifies, what changes, when it starts/ends, and what happens after.
- `live-event-6` — Monitoring should include participation, conversion, reward grants, errors, support contacts, sentiment, and negative guardrails.
- `live-event-7` — Outages or misconfiguration need compensation rules before users are affected.
- `live-event-8` — Promotions inside live events must avoid fake urgency, hidden terms, and unfair payer treatment.
- `live-event-9` — Events should have a clean shutdown: reward settlement, leaderboard finalization, offer expiry, support window, and archival.
- `live-event-10` — Post-event review should decide repeat, modify, retire, or productize.

## Decision table

| Event type | Main risk | Required control | Metrics |
| --- | --- | --- | --- |
| Seasonal reward | economy inflation | reward budget and grant caps | participation, inflation, retention |
| Limited offer | discount training | eligibility/cooldown rules | conversion, refund, renewal |
| Tournament | fairness dispute | anti-cheat and tie rules | disputes, completion, leaderboard errors |
| Content drop | operational overload | staged rollout and support macros | crash, support, content engagement |
| Reactivation | low-quality return | segment and frequency caps | D7 return, opt-out, churn |
| Marketplace event | seller fairness | ranking and payout rules | seller distribution, disputes |

## State machine

```text
event_idea -> event_brief -> config_drafted -> risk_reviewed -> staged_rollout
deployed_staged -> metrics_ok -> full_launch
metrics_bad -> pause_or_rollback -> support_and_compensation
event_live -> event_ending -> rewards_settled -> support_window -> post_event_review
post_event_review -> repeat_or_modify_or_retire
```

## Event schema

Recommended events:

- `live_event_exposed`: event_id, segment, platform, version, timezone, placement.
- `live_event_joined`: event_id, eligibility_rule, entry_source, user_state.
- `live_event_reward_granted`: event_id, reward_id, amount, idempotency_key, grant_latency_ms.
- `live_event_offer_converted`: event_id, offer_id, price, discount, entitlement_id.
- `live_event_error`: event_id, error_type, affected_state, rollback_candidate.
- `live_event_support_contact`: event_id, issue_category, account_state, compensation_needed.
- `live_event_completed`: event_id, completion_state, reward_settled, post_event_segment.

## Review checklist

- Objective, audience, eligibility, calendar, timezone, reward/offer, and support owner are explicit.
- Config is versioned, reviewed, staged, and rollbackable.
- Economy, fairness, payer, and abuse risks have guardrails.
- Monitoring and support macros are ready before launch.
- Shutdown, settlement, compensation, and post-event learning are defined.
