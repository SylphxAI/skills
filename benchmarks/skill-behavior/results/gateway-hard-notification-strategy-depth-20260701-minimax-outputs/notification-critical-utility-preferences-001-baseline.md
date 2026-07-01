# Developer Utility Notification Policy

## 1. Notification Taxonomy

### 1.1 Severity Tier Definitions

| Tier | Definition | Default Routing | Quiet-Hours Behavior |
|------|------------|-----------------|----------------------|
| **P0 Critical** | Security, data loss risk, active outage | All channels | Bypass |
| **P1 High** | Failed operations threatening workflow | Desktop + in-app + email | Defer only on user hold |
| **P2 Medium** | Successful operations, status updates | Per user preference | Defer to next window |
| **P3 Low** | Marketing, education, promotions | Off by default | Defer always |

### 1.2 Category → Tier Mapping

| Category | Tier | Rationale |
|----------|------|-----------|
| Security login alert | P0 | Account compromise risk |
| Deployment failed | P1 | Pipeline regression, blocks release |
| Maintenance incident | P0 / P1 | Toggles to P0 when status page = `degraded` |
| Storage quota warning | P1 | Mitigatable failure |
| Build finished | P2 | High-volume; user signal-bearing |
| Backup complete | P2 | Confirmatory |
| Product education | P3 | Opt-in only |
| Upgrade promotion | P3 | Opt-in only |

### 1.3 Channel Capability Matrix

| Channel | Latency | Persistent | Steerable | Allowed Tiers |
|---------|---------|------------|-----------|---------------|
| Desktop (OS) | <1 s | Tray badge | Per-event center | P0–P2 |
| Browser push | 1–5 s | Until clicked | Site settings | P0–P2 |
| Email | 30–300 s | Mailbox | Per-address rules | P0–P3 (digest for ≤P2) |
| In-app | Real-time | Bell inbox | Per-channel toggle | P0–P3 |

---

## 2. Preference Model

### 2.1 Setting Schema (audit-friendly, flat)

```
user.notification_preferences:
  channels: { desktop, browser_push, email, in_app }          // boolean per channel
  tier_matrix:                                              // override default routing
    P0: { desktop: required, browser_push: required, email: required, in_app: required }
    P1: { desktop: opt,     browser_push: opt,     email: opt,     in_app: opt     }
    P2: { desktop: opt,     browser_push: opt,     email: digest,  in_app: opt     }
    P3: { desktop: off,     browser_push: off,     email: digest,  in_app: opt     }
  category_overrides:                                       // per-category exceptions
    build_finished:    { tier: P2, channels: [in_app] }
    backup_complete:   { tier: P2, channels: [in_app] }
    product_education: { tier: P3, channels: [in_app] }
    upgrade_promotion: { tier: P3, channels: [in_app] }
  quiet_hours:
    start: "22:00", end: "07:00", tz: user_tz
    bypass_tiers: [P0, P1]      // P2/P3 always defer or batch
  digest:
    enabled: true, cadence: "daily", time: "09:00", tz: user_tz
  suppression:
    rate_limit_per_hour: { P0: ∞, P1: 20, P2: 10, P3: 3 }
    coalesce_window_min: { P0: 0, P1: 1, P2: 5, P3: 60 }
    duplicate_suppression: true     // same event_id collapses
```

### 2.2 Default-On vs Default-Off Principle

- **Default ON**: P0 across all channels. P1 desktop + in-app.
- **Default OFF**: P3 on desktop, browser push, and email. Email is digest-only.
- **Build finished** defaults to in-app-only — the most-cited noise source.
- **Upgrade promotions** cannot be tier-promoted above user setting; bundle with `product_education` digest unless user separately opts in.

### 2.3 Preference Surface Requirements

A single consolidated settings page with three explicit sections:
1. **Critical (locked)** — visible but not disableable; explains why.
2. **Workflow (P1/P2)** — granular channel matrix.
3. **Promotions (P3)** — single master toggle plus per-category opt-in.

Each row shows: category, current channels, last 7-day delivery count. Clicking a row opens a 30-day history. This addresses the "unclear preferences" complaint.

---

## 3. Emergency Override Rules

Override triggers a critical message **bypasses** quiet hours, rate limits, and user channel disables when the following conditions hold.

### 3.1 Override Conditions (ALL required)

1. Event classifies as P0 via taxonomy §1.2.
2. User has not disabled notifications at the account level (`account.paused` = false — a separate, explicit "pause everything" control.
3. At least one of:
   - Confirmed security event (new device + new geo within 24 h, MFA lockout, API key exfiltration).
   - Live incident declared on status page.
   - Backup failure cascade affecting >1 repo/org.
   - Data-deletion lifecycle (pre-deletion, last warning).

### 3.2 Override Channel Guarantees

- **At least 2 channels** always fire (audit requirement). If a channel is technically broken, the system routes to the next available within 30 s.
- **Email is mandatory** during override — serves as legal/audit record.
- **In-app banner** is mandatory regardless of bell state.

### 3.3 Cannot Be Overridden

The following user actions are inviolable even during incidents:
- `account.paused` = true (full pause; only account-recovery flow lifts).
- `account.email_blocklist` — no email override to blocked addresses.
- Account deletion — no notifications post-deletion grace window.

### 3.4 Suppression Anti-Patterns (Forbidden)

- Cannot promote P3 (marketing) to P0 or P1 for revenue events.
- Cannot use override channels to bypass unsubscribe (CAN-SPAM/GDPR compliance).
- Cannot hold a P0 for "batching" — atomic delivery only.
- Tier reclassification requires a 7-day audit-trail entry + product owner sign-off.

### 3.5 Auditability

Every dispatch logs: `event_id`, `tier`, `channels_attempted`, `channels_delivered`, `override_applied (bool)`, `user_pref_snapshot_hash`, `preference_change_id_preceding`. Logs are retained 90 days for P0, 30 days for P3.

---

## 4. Summary of Trade-offs Audited

| Decision | User Benefit | Risk Mitigated |
|----------|--------------|----------------|
| P3 default-off on noisy channels | Less marketing | Revenue funnel impact A/B-tested separately |
| Build-finished defaults to in-app | Noise reduction | User can re-enable desktop per project |
| Override requires 2-channel minimum | Reliability | Forced redundancy cost bounded by fail-over logic |
| Digest + coalesce on P2/P3 | Volume control | Adds 5–60 min latency, acceptable per tier definition |
| Distinct "pause all" vs channel toggles | Prevents accidental mute of security | One-click lift via recovery flow |

This policy is reviewable quarterly; changes to tier mapping or override triggers require a public changelog entry with rationale.
