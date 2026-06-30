# Abuse Fraud Risk Patterns

## Risk model

```text
incentive -> vector -> signal -> control -> user impact -> review -> recovery
```

## Rule IDs

- `abuse-1` — Start with attacker incentive and asset value, not generic fraud fear.
- `abuse-2` — Design controls as a ladder: friction, rate limit, hold, review, limit, suspend.
- `abuse-3` — High-confidence automated action still needs logging, support visibility, and appeal route for high-impact cases.
- `abuse-4` — Payment/refund abuse should limit commerce first before full account suspension unless safety/fraud is clear.
- `abuse-5` — Promotions and referrals need eligibility, device/account/IP/payment risk, cooldowns, and clawback rules.
- `abuse-6` — Game economy protection needs immutable ledgers, anomaly detection, and reversible holds for suspicious grants.
- `abuse-7` — Marketplace abuse needs buyer/seller separation, payout holds, disputes, reputation, and moderation.
- `abuse-8` — Account takeover controls need login alerts, session/device management, step-up auth, and recovery safety.
- `abuse-9` — Do not create privacy-invasive telemetry without a clear purpose and retention limit.
- `abuse-10` — Track false positives, support appeals, and user harm as first-class metrics.

## Decision table

| Abuse pattern | First control | Escalation |
| --- | --- | --- |
| Coupon farming | Eligibility, rate limit, payment/account uniqueness | Hold reward, review, clawback |
| Refund cycling | Revoke refunded value, commerce risk score | Commerce limit, manual review |
| ATO | Step-up auth, login alert | Session revoke, account recovery |
| Spam/community abuse | Rate limits, content filters | Moderation review, posting limits |
| Marketplace fraud | Payout hold, dispute evidence | Seller restriction, buyer protection |
| Game exploit | Ledger anomaly hold | Rollback/adjust, exploit patch, support macro |

## Event schema

Track: `risk_signal_observed`, `rate_limit_applied`, `commerce_hold_created`, `manual_review_opened`, `manual_review_resolved`, `account_limited`, `appeal_opened`, `appeal_resolved`, `false_positive_confirmed`, `control_tuned`.
