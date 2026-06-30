# Referral Loop Systems

A referral loop should transfer trust from a happy user to a likely-fit user. It should not manufacture low-quality acquisition through pressure or spam.

## Rule IDs

- `referral-1` — Trigger referral after a real value moment, not before users understand the product.
- `referral-2` — Match reward to business model: credit, discount, feature, cosmetic item, cash-equivalent, affiliate commission, or team benefit.
- `referral-3` — Define qualification: signup, activation, purchase, retained use, first transaction, verified seller, or paid invoice.
- `referral-4` — Keep rewards pending until qualification and fraud checks pass.
- `referral-5` — Explain attribution window, last/first touch, self-referral rules, caps, expiration, reversal, and support route.
- `referral-6` — Contact import, messaging, and reminders should be user-controlled, transparent, and rate-limited.
- `referral-7` — Abuse controls should cover self-referral, fake accounts, coupon farming, device/payment reuse, marketplace collusion, and spam.
- `referral-8` — Referral experiments should measure retained value and fraud/support cost, not only invites sent.
- `referral-9` — Team invites and collaboration loops are not the same as reward referrals; avoid paying for required workspace setup unless intended.
- `referral-10` — Support should see referral chain, attribution, qualification state, reward state, and reversal reason.

## Incentive decision table

| Loop type | Good reward | Main risk | Guardrail |
| --- | --- | --- | --- |
| SaaS credit | account credit after paid invoice | coupon farming | paid qualification and caps |
| Mobile app | feature unlock or credit | low-quality installs | activation qualification |
| Game | cosmetic or bounded currency | economy abuse | reward budget and device checks |
| Marketplace | fee discount or seller boost | collusion/fake transactions | transaction quality checks |
| Developer tool | usage credits | bot/API abuse | verified account and usage cap |
| Affiliate | commission | misrepresentation | disclosure and clawback terms |

## State machine

```text
value_moment_reached -> referral_prompt_shown -> invite_sent -> invite_opened
invite_opened -> referred_user_started -> qualification_pending
qualification_pending -> qualified -> reward_pending -> reward_granted
qualification_pending -> expired_or_failed -> no_reward
reward_granted -> refund_or_abuse_detected -> reward_reversed_or_held
referral_dispute_opened -> evidence_reviewed -> resolved
```

## Event schema

Recommended events:

- `referral_prompt_shown`: trigger, user_state, placement, reward_offer_id.
- `referral_invite_sent`: inviter_id, channel, invite_id, message_variant, consent_state.
- `referral_invite_accepted`: invite_id, invitee_id, attribution_rule, elapsed_ms.
- `referral_qualified`: invite_id, qualification_event, revenue_or_value, fraud_score.
- `referral_reward_granted`: reward_id, inviter_or_invitee, amount, expiration, idempotency_key.
- `referral_reward_reversed`: reward_id, reason, linked_refund_or_abuse_case.
- `referral_abuse_flagged`: reason, account_cluster, device_or_payment_overlap.

## Review checklist

- Referral prompt follows a real value moment and fit signal.
- Rewards, qualification, caps, expiration, attribution, and reversal terms are visible.
- Fraud controls and support evidence exist before launch.
- Metrics include retained value, payback, support, abuse, spam complaints, and invitee quality.
- Team invites, affiliate programs, and consumer referral loops are not conflated.
