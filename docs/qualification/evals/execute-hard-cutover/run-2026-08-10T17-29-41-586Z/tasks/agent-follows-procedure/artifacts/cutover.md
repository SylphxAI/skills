# Cutover: pay-legacy -> pay-v2 (sole writer)

Status: execution-ready plan. This document is the cutover contract and record.
Evidence entries below are defined verification steps; each must be executed
against the live system and its result recorded before the cut is declared done.
No step may be marked done on memory, green CI, or a merged PR alone.

## 1. Name the cut

- **Predecessor:** `pay-legacy` — payment API (charge, refund, webhook ingest) and its backing stores.
- **Destination:** `pay-v2` — replacement payment API (same contract surface) and its backing stores.
- **Traffic/data surface:** inbound payment HTTP surface (`/v1/payments/*` charge/refund/webhook, authn/authz), payment records (payments, refunds, ledger entries, idempotency keys, webhook deliveries), and all readers/jobs that consume those records.
- **Terminal:** `pay-v2` is the sole writer for the named surface; `pay-legacy` is retired (no route, no deploy, no write path) for that surface.
- **Start date / owner:** cut traffic at a declared low-volume window; owner: service owner named in the execution record. Hard cut is the default; no expand/contract phase unless a named safety need is recorded here with an end date.

## 2. Dependency inventory

Must migrate before/with the cut. Record the completed inventory as evidence (link the inventory artifact or paste it into the execution record):

| # | Dependency | Type | Migration action |
|---|------------|------|------------------|
| D1 | `payments`, `refunds`, `ledger_entries`, `idempotency_keys`, `webhook_deliveries` | Data | Backfill (step 4) |
| D2 | Internal callers (billing, checkout, subscriptions, admin) | Callers | Repoint to `pay-v2`; verify per-caller |
| D3 | Public/partner API consumers of `/v1/payments/*` | Callers | Contract-compat check; migration notice; verify per-consumer |
| D4 | Payment provider integrations (acquirer, PSP, wallet) | Callers | Repoint webhook/callback routes to `pay-v2` |
| D5 | Retry workers, settlement sweeps, webhook dispatch jobs | Jobs | Repoint job config/queues to `pay-v2` stores |
| D6 | API reference, onboarding docs, runbooks | Docs | Update; audit for lingering `pay-legacy` references |
| D7 | Service discovery / routes / env config / feature flags | Install paths | Switch routes; delete flags at terminal (no flag remains the system of record) |
| D8 | Read models / analytics / billing exports | Data consumers | Repoint readers to `pay-v2`; verify snapshot parity |

## 3. Prefer hard cut

- Default: **switch + retire** in one delivery unit.
- A short expand/contract window (dual write to both stores) is allowed only if a named safety need is recorded here; if used, it gets an explicit end date and owner, and the dual path is deleted at that date — a green dual path is not the end state.
- Feature flags used to stage `pay-v2` must be deleted at cutover, not left as the new system of record.

## 4. Backfill (with original oracles)

Move or rebuild required state at `pay-v2` **before** cutting traffic. Verification uses original oracles, not memory or green CI:

1. Run the migration/backfill job: copy payment, refund, ledger, idempotency, and webhook state to `pay-v2` stores with per-record source lineage (legacy record id, migrated-at, backfill run id).
2. Oracle O1 — provider settlement: compare `pay-v2` payment totals per day/currency against provider settlement statements for a defined window (>= 90 days or full history).
3. Oracle O2 — ledger trial balance: `pay-v2` ledger debit == credit totals and equals `pay-legacy` ledger totals at migration timestamp.
4. Oracle O3 — idempotency replay: replayed idempotency keys in `pay-v2` return the same stored results as `pay-legacy` for a sampled set (>= 1% with a floor of N=1000).
5. Oracle O4 — webhook delivery parity: outstanding + delivered webhook states match between systems; no event is dropped or duplicated in the cut.
6. Record each oracle result (command, digest, counts, mismatch list = 0) in the execution record.

Blockers: any oracle mismatch stops the cut; fix at root cause and re-run the oracle before proceeding.

## 5. Cut traffic (new writes blocked)

Ordered steps; each requires a live postcondition check:

1. Point readers (D8, D5) at `pay-v2` stores; verify they read only `pay-v2`.
2. Point internal callers (D2) and provider integrations (D4) at `pay-v2`.
3. Switch public/partner routing (D3, D7) to `pay-v2`.
4. **Block new `pay-legacy` writes:** revoke write credentials at the gateway and DB role, and stop legacy workers. Postcondition: an attempted write to `pay-legacy` returns auth/routing failure and no row is created (verify with a real probe, then remove the probe).
5. Delete cutover flags/env toggles; confirm no runtime config still routes to `pay-legacy`.

## 6. Retire predecessor

1. Delete `pay-legacy` route, deploy target, worker/job definitions, and write paths in the same delivery unit that switched traffic.
2. Remove/archive legacy read paths and docs references (D6); run a repo + docs search for `pay-legacy` and triage every hit (delete or explicit archived note — no "just in case" dual paths).
3. Quarantine (not keep-live) any archived artifacts with a read-only note; no production responsibility for the surface.
4. Update installers, manifests, and service discovery so nothing provisions `pay-legacy`.

## 7. Prove destination ownership

Live checks after retirement (record outputs, not assumptions):

- P1 — Real charge through `pay-v2` end to end: provider authorization, record write, ledger entry, webhook emitted. Postcondition verified.
- P2 — Real refund + idempotent retry through `pay-v2`: correct state transitions, no double effect.
- P3 — Webhook/callback from provider lands on `pay-v2` and dispatches once.
- P4 — Legacy write probe (from step 5) still rejected; no `pay-legacy` error/request metrics after cut; alerting/tracing confirms zero production traffic to the predecessor.
- P5 — All D2/D8 dependencies report healthy against `pay-v2` for >= one full settlement cycle (soak), with drift checks against the oracles re-run at soak end.

## Evidence

Evidence table to be completed during execution; each row needs the artifact (command/output/log ID/digest), date, and verifier. A green CI or merged PR is not evidence for live behavior.

| Step | Evidence artifact | Status |
|------|-------------------|--------|
| 2 | Dependency inventory (D1–D8) with per-item migration state | Pending |
| 4 | Backfill run id + oracle O1–O4 outputs (counts, mismatch = 0) | Pending |
| 5 | Routing switch records; legacy write probe (rejected) | Pending |
| 6 | Deploy/route removal record; `pay-legacy` grep triage = 0 live hits | Pending |
| 7 | P1–P5 live checks incl. soak report | Pending |

## Residuals

Open items are tracked here until closed; the cut is not done while any residual still routes or writes to `pay-legacy`.

| # | Residual | Owner | Closure criteria |
|---|----------|-------|------------------|
| R1 | (to be filled from execution) | | |
| R2 | (to be filled from execution) | | |

Default expected residuals (confirm or close): partner consumers on old SDK versions not yet re-verified; archived `pay-legacy` docs/tags in downstream repos; any safety window end-date if expand/contract was used.
