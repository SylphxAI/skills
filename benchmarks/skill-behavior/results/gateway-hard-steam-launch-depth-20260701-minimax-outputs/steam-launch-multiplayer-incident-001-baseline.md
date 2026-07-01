# Launch-Day Readiness Plan — Steam Co-op Title

## 1. Technical Gates (T-72h Go/No-Go)

| Gate | Pass Criterion | Owner |
|---|---|---|
| Matchmaking load test | p95 queue→match < 20s at 3× projected CCU | LiveOps |
| Anti-cheat sandbox | < 0.5% FP rate on 5k legit players; whitelist tool ready | Anti-Cheat Lead |
| Save migration dry-run | 0 corruption across 10k legacy saves; rollback path verified | Engine/QA |
| Build attestation | Steam depot signed, EAC/VAC manifests match ship build | Release Mgr |
| Telemetry pipeline | Dashboards live: CCU, error rates, refund velocity, hub activity | Data Eng |
| Hotfix branch | Clean branch cut, can ship patch within 90 min | Eng Lead |

**Rule:** any red gate = 24h delay; two reds = executive escalation.

## 2. Rollback / Hotfix Decision Thresholds

| Trigger | Action | SLA |
|---|---|---|
| Matchmaking p95 > 60s sustained 15 min | Throttle new logins + scale queue workers | ≤10 min |
| Anti-cheat FP blocks > 0.3% of actives/hour | Flip flag to whitelist tier, push detector patch | ≤60 min |
| Save corruption confirmed > 0.1% sessions | Pause matchmaking, ship migration hotfix, post advisory | ≤90 min |
| Refund rate > industry baseline + 20% in 2h | Roll back storefront promo, post Steam announcement | ≤30 min |
| Disconnect rate > 15% / region | Revert netcode config, consider rollback to last green build | ≤30 min |

**Authority:** LiveOps Lead can freeze; rollback requires Producer + Eng Lead sign-off.

## 3. Player Communications

**Pre-pinned (T-0):** Brief, factual — known issues, status, link to support.

**Templates by severity:**
- **P1 (data loss / bans):** Acknowledge within 1h, ETA, affected scope, manual remedy path, no marketing tone.
- **P2 (matchmaking/perf):** Update every 2h, current mitigation, workaround.
- **P3 (QoL):** Acknowledged, log link, no ETA.

**Channels:** Steam announcement (primary), in-game banner, dev socials. **Never** delete or hide complaints — remove only slurs/personal data.

## 4. Support & Community Triage

**Support tiers:**
- T1 (macro): refunds, install, controller — auto-responder in 15 min.
- T2 (gameplay): ban appeals → anti-cheat queue; crash/log attachers → engineering ticket.
- T3 (data integrity): save corruption → manual restore from telemetry snapshot, comped entitlement.

**Hub moderation rota:** 3 mods × 8h shifts, clear escalation tags: `[Tech-Conf]`, `[AntiCheat-Conf]`, `[Refund-Flag]`, `[Needs-Reply]`. Megathreads consolidate disconnect and ban complaints to prevent thread sprawl.

**FAQ ladder** updated hourly from top 10 ticket themes; published in-game.

## 5. Review-Review Response Posture

- Respond to **all** negative reviews within 24h, **zero** template copy.
- Tone: own the issue, state the fix in flight, never argue technical detail.
- Never request review edits; never offer in-game currency for revision.
- Flag coordinated review-bomb patterns to Steam, not publicly.
- Track per-patch review delta; treat > -0.5 stars vs. cohort as P2 incident.

## 6. First-Week Operating Metrics

**Hourly (T+0 to T+24):**
- CCU, DCCU (daily co-op pairs)
- Matchmaking p50/p95, abandon rate
- Disconnect rate (region + session length)
- Anti-cheat FP/TP ratio
- Save migration success %
- Crash-free sessions %
- Refund count & $/hr
- Hub volume, sentiment score, top 5 issue clusters

**Daily (D+2 to D+7):**
- Review volume + star distribution vs. genre baseline
- Ticket volume, TAT, reopen rate
- Cheat detection true-positive count
- Session length, return rate (D1, D3, D7)
- Funnel: launch → tutorial → first co-op match → first progression milestone

**Stop-the-line metric:** sustained refund-rate spike above threshold triggers exec review and external comms within 60 minutes.
