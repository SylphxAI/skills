# Account Recovery Identity Patterns

## Recovery state machine

```text
recovery_requested -> identity_hint_collected -> risk_scored -> proof_challenge_sent -> proof_verified -> recovery_granted -> sessions_reviewed -> complete
        |                         |                |                    |                  |                  |
        v                         v                v                    v                  v                  v
 enumeration_blocked        rate_limited     high_risk_review      proof_failed      cooldown_hold      account_locked
```

## Rule IDs

- `identity-recovery-1` — Separate login failure, factor loss, account ownership dispute, compromised account, and support-assisted recovery.
- `identity-recovery-2` — Recovery factor strength must match asset sensitivity: consumer free, paid user, admin, enterprise owner, financial account, or creator account.
- `identity-recovery-3` — Recovery copy and timing must avoid account enumeration.
- `identity-recovery-4` — MFA/passkey resets need step-up proof, cooldown, notification to old factors, and session review.
- `identity-recovery-5` — Email or phone change after recovery needs delayed effect or re-authentication when risk is high.
- `identity-recovery-6` — Support agents need a decision tree, evidence checklist, redaction rules, and escalation thresholds.
- `identity-recovery-7` — Successful recovery should invalidate risky sessions, rotate backup codes, and prompt security review.
- `identity-recovery-8` — Rate limits must be per account, IP, device, tenant, and recovery channel where practical.
- `identity-recovery-9` — Enterprise or team accounts need admin-mediated recovery and ownership transfer policy.
- `identity-recovery-10` — Track recovery outcomes to detect takeover campaigns, lockout friction, and support-policy gaps.

## Decision table

| Scenario | Risk class | Recovery path | Extra controls | User-facing promise |
| --- | --- | --- | --- | --- |
| Password forgotten | Low/medium | Email magic link or reset token | Anti-enumeration, token expiry, rate limit | Regain access without leaking account existence |
| Lost MFA device | Medium/high | Verified primary factor plus backup code or cooldown review | Notify old factors, invalidate sessions, audit | Restore access while protecting account owner |
| Passkey-only user lost device | Medium | Recovery contact, backup code, platform account proof | Cooldown and security review | Avoid permanent lockout without support bypass |
| Enterprise admin locked out | High | Verified org admin or contractual owner escalation | Dual approval, audit, temporary access | Restore business continuity safely |
| Suspected takeover | Critical | Lock account, verify owner, rotate factors | Fraud/support/security handoff | Protect account before convenience |

## Recovery checklist

- Recovery scenarios and asset sensitivity tiers are listed.
- Proof requirements and fallback channels are explicit.
- Rate limits and anti-enumeration behavior are defined.
- Support decision tree includes what agents may never ask for.
- Notifications, cooldowns, session invalidation, and audit logs exist.
- Recovery metrics distinguish saved users from takeover risk.

## Event schema

Track: `account_recovery_requested`, `account_recovery_rate_limited`, `recovery_challenge_sent`, `recovery_proof_failed`, `recovery_proof_verified`, `recovery_factor_reset`, `recovery_session_invalidated`, `recovery_support_escalated`, `account_takeover_suspected`.

Recommended properties: `recovery_id`, `account_risk_tier`, `lost_factor`, `channel`, `actor_type`, `tenant_id_present`, `risk_score_bucket`, `proof_method`, `rate_limit_bucket`, `cooldown_required`, `sessions_invalidated`, `support_case_id`, `outcome`.
