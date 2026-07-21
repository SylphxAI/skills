---
name: promotion-campaign-review
description: Design or audit one promotion system—offer, discount, update benefit, cross-promotion, win-back, lifecycle push, app/game event, referral push, launch or seasonal campaign—across objective, audience, deterministic eligibility, user+offer cooldowns, placement, transparent message, economics, authoritative fulfillment, reversal, fraud, support, experiments, automation, and shutdown. Use for one campaign artifact; use Marketing Automation for the whole channel and spend operating system.
---

# Promotion Campaign Review

Produce a **Promotion Campaign Contract** that grows incremental retained value
without fake urgency, loyal-customer punishment, review manipulation, spam, or
unreconciled rewards.

## Atomic boundary

Own one campaign/offer's objective, audience, eligibility, placement, message,
economics, applicable benefit fulfillment/reversal, channel handoffs, fraud,
support, experiment, and shutdown. Do not own the whole marketing system, payment provider ledger,
referral program, store listing, or game/app design.

Use a draft artifact ID. Consume payment, refund, economy, referral,
notification, analytics, marketing, and product decisions by owner and explicit
contract. Let deterministic delivery tooling seal versions/digests later; never
invent them during design.

## Agent-first invariant

Construct every applicable campaign state, eligibility policy, channel asset,
provider authority, experiment, fraud/support path, telemetry, cap, expiry,
kill switch, and reconciliation before activation. Build ledger/grant/reversal
adapters only for a discount, reward, credit, entitlement, or other fulfilled
benefit; informational/lifecycle campaigns record that mode as non-applicable.
Low volume or unknown ROI never justifies manual fulfillment or later
hardening. Separate construction, exposure, qualification, spend, and any grant
authority; dormant campaigns perform zero sends, SDK work, grants, or data collection.

## Workflow

1. Define exact objective and incremental-value hypothesis, audience/cohorts,
   platforms/territories/age modes, baseline, budget/reward/margin caps, time
   horizon, owner, and ruin boundaries.
2. Read `references/promotion-campaign-patterns.md`. Select campaign/benefit
   mode (`informational`, `discount`, `reward`, `credit`, `entitlement`, or
   another explicit type), state the normal alternative, and mark
   fulfillment/reversal branches applicable or not applicable. Model
   loyal/active, new, lapsed, payer/non-payer,
   ownership, refund/dispute, consent, region, platform, and abuse states.
3. Define deterministic view and exposure eligibility, plus redeem/qualify/grant
   eligibility only when the selected benefit requires it, with reason codes,
   user+offer cooldowns, conflict/stacking, caps, expiry, ownership overlap,
   baseline path, and support explanation.
4. Place only at a value/intent transition. Specify cross-channel dedupe,
   dismissal/suppression, quiet hours, preference/consent, privacy/redaction,
   deep link, and notification/store/referral handoffs.
5. Write transparent benefit, condition, duration, renewal/normal state, limits,
   expiry, reversal, and support route. Localize meaning, not just strings.
6. Model exposure and, when applicable, authoritative fulfillment separately,
   including no-op,
   failure, duplicate/out-of-order, refund/chargeback, fraud, rollback,
   compensation, restore, migration, support correction, and live readback.
7. Compute incremental retained contribution after discount/reward, fees,
   cannibalization, refunds/chargebacks, fraud, fatigue, support, economy, and
   loyal-customer effects. Define randomized/causal cells where feasible.
8. Set exact scale/hold/pause/withdraw predicates, provider-side end times,
   upstream caps, emergency shutdown, reconciliation-only withdrawal state, and
   post-campaign closeout.

## Source verification

Retrieve current store/payment/promotion, advertising, notification, consent,
child/age, referral, review/rating, pricing, tax, territory, and channel policy
for the exact campaign. Explicit prohibitions and missing authority are hard
floors. Genuinely ambiguous but admissible behavior may use the bounded risk
contract below; known policy violations, deception, consent bypass, child harm,
or unlawful behavior are not “grey experiments.”

## Bounded risk-reward contract

Use arithmetic to compare admissible options without pretending fat-tail or
irreversible harm is an ordinary average cost:

```text
expected_net_value
= P(success) * incremental_retained_contribution
- sum(P(loss_i) * direct_and_secondary_loss_i)
- trust_and_reputation_cost
- recovery_and_opportunity_cost

constraints:
maximum_loss <= declared_ruin_budget
CVaR_at_selected_confidence <= declared_risk_budget
exposure <= blast_radius_cap
time_to_detect + time_to_contain <= recovery_window
```

Record probability ranges and sensitivity rather than false precision. Include
platform/account action, customer remedy, refunds, support, reputation,
cannibalization, reversibility, detection lag, rollback limits, and opportunity
cost. Unknown material facts widen the loss range; they do not become zero.

An experiment may proceed only when the behavior is not explicitly prohibited,
the customer proposition is truthful, consent and remedies remain intact,
exposure/spend are capped, stop signals are observable, and recovery has been
tested. A small company’s ability to correct quickly lowers some recovery cost;
it does not erase platform-account, legal, child-safety, privacy, or trust ruin.

## When not to use

- Use `marketing-automation-blueprint` for the full organic/lifecycle/paid,
  creative, attribution, spend, reputation, and shutdown operating system.
- Use `referral-loop-review` for persistent inviter/invitee qualification,
  attribution, pending grants, reversals, fraud, and support.
- Use `store-listing-optimization` when the artifact is one channel's metadata,
  screenshot/video/capsule sequence, proof, localization, and conversion test.
- Use `daily-reward-and-streak-review` for a durable recurring return-loop state
  machine, or `game-economy-review` for economy balance and inflation.

## Guardrails

- No fake scarcity/countdown, hidden renewal/normal price, shame, blocked exit,
  reset timer, or loss threat involving creations/history/identity/access.
- Never reward review/rating, permission, ad click, spend, forced referral, or
  mere update installation. Update benefit requires verified new-value use.
- A user cannot see an offer they cannot redeem; regional/platform differences
  and suppression are support-explainable.
- Never confirm reward before authority and idempotent grant commit. Ordinary
  refund/reversal cannot delete unrelated value or auto-ban an account.
- Optimize neither gross revenue nor clicks alone. Retention, renewal, margin,
  refunds, churn, loyal cohort, fatigue, support, fairness, economy, privacy,
  and fraud false positives are mandatory countermetrics.
- Autonomous optimizers cannot alter eligibility floors, prices/terms, consent,
  reward value, grant/reversal, spend caps, or their own promotion gates.

## Output contract

Return one typed Promotion Campaign Contract with:

1. objective, audience/cohort, baseline, exact offer, economics, authority,
   budgets/caps, horizon, assumptions, and ruin boundaries;
2. view/exposure and applicable redeem/qualify/grant eligibility, reason, conflict/stacking, user+offer
   cooldown, ownership, expiry, and support matrix;
3. placement/message/localization, channel dedupe/suppression, consent,
   preference, privacy, and deep-link contract;
4. exposure state machine plus applicable fulfillment/reversal/compensation
   state machines and ledger, or an explicit non-benefit disposition;
5. applicable fraud, refund/dispute, restore/migration, support, and reconciliation rules;
6. event schema, causal experiment, economics and trust countermetrics;
7. expected-value/CVaR record where uncertainty is material, plus
   scale/hold/pause/withdraw, provider end/cap, kill switch, live readback, and
   closeout evidence;
8. specialist handoffs with draft IDs, owners, required inputs/outputs,
   acceptance questions, and no fabricated proof.

Complete only when every eligible/ineligible impression, applicable
qualification/grant/reversal, and withdrawal is explainable, bounded,
replayable where applicable, and support-safe.
