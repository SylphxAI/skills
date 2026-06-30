# Account Based Marketing Patterns

## Account Based Marketing Review state machine

```text
accounts_selected -> signals_prioritized -> plays_launched -> sales_engaged -> meeting_created -> pipeline_influenced
       |                   |               |               |                |
       v                   v               v               v                v
 poor_fit           privacy_blocked   no_personalization sales_no_capacity  attribution_review
```

## Rule IDs

- `abm-1` — Select accounts by ICP fit, strategic value, intent, trigger, expansion whitespace, technographic fit, and sales capacity.
- `abm-2` — Map buying committee roles, pains, objections, proof needs, and likely internal decision process before designing plays.
- `abm-3` — Match offer and message to account context without exposing sensitive surveillance or unverified assumptions.
- `abm-4` — Coordinate ads, email, SDR, events, executive outreach, partner plays, direct mail, content, and retargeting with one account owner.
- `abm-5` — Suppress existing active opportunities, customers in sensitive support states, unsubscribed users, competitors, and low-fit accounts.
- `abm-6` — Measure account engagement, meeting creation, opportunity progression, pipeline influence, win rate, sales activity, and learning by tier.
- `abm-7` — Separate sourced pipeline, influenced pipeline, expansion support, and brand lift; avoid double-counting.
- `abm-8` — Feed account learnings into positioning, references, content, sales enablement, and product packaging.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Strategic account | Use one-to-one plan | Account trigger and owner | Generic campaign misses buyer |
| Intent spike | Verify fit before outreach | Intent source and ICP data | Creepy irrelevant message |
| Open opportunity | Coordinate with AE | CRM stage and owner | Marketing conflicts with deal |
| Customer support risk | Suppress or align with CS | Health/support status | Tone-deaf expansion |
| Attribution claim | Separate source vs influence | Timeline and touches | False ROI |

## ABM checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `abm_account_selected`, `abm_signal_detected`, `abm_play_launched`, `abm_sales_action_created`, `abm_meeting_booked`, `abm_pipeline_influenced`, `abm_account_suppressed`.

Recommended properties: `account_id, tier, segment, intent_signal, trigger_type, buying_role, channel, owner_team, suppression_reason, sales_stage, engagement_score, pipeline_amount, attribution_type, decision`.
