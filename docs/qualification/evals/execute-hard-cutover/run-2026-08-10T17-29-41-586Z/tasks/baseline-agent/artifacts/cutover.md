# Payment API cutover plan: old API → new API

Status: plan (not yet executed) · Owner: `<owner>` · Target date: `<date>`

## 1. The cut

- **Predecessor (old):** `<old payment API>`, surface = `<endpoints / routes /
  client surfaces it owns>`.
- **Destination (new):** `<new payment API>`, same surface, sole writer after cut.
- **Terminal:** the new API is the *only* path for payment traffic and payment
  state; the old API is removed from source, deployment, and docs, and no
  production traffic reaches it.

This is a hard cut: switch + retire. Expand/contract is used only as a
temporary safety phase with an explicit end date and owner, never as the end
state.

## 2. What must move (inventory)

Before the switch, record the current reality for every row below (who calls,
where data lives, what is scheduled). Empty cells are an unresolved risk, not
"not applicable".

| # | Item | What must move | Move action | Owner | Done evidence |
|---|---|---|---|---|---|
| 1 | **API callers** | All consumers of the old API: first-party services, worker jobs, cron, SDKs, mobile/web clients, partner integrations | Each caller repointed to the new API; list audited from logs + code search, not assumptions | | Caller list checked off; zero old-API calls after cut |
| 2 | **Contract & behavior** | Request/response schemas, auth, error codes, idempotency semantics, rate limits, timeouts, retry behavior | New API implements the agreed contract; behavioral diff review done | | Contract matrix signed off; parity tests green |
| 3 | **Data & state** | Customers, payment methods/tokens, transactions, refunds, subscriptions, invoices, reconciliation ledger, idempotency keys | Backfilled/copied/regenerated at destination *before* cut | | Count + digest/oracle check: source == destination |
| 4 | **Config & secrets** | API keys, webhook signing secrets, merchant/PSP accounts, gateway config, env vars, feature flags | Provisioned at destination; old credentials revoked at retirement | | Secret inventory updated; old keys invalid |
| 5 | **Webhooks & events** | Event delivery URLs, signing, replay, retry queues, event consumers | Consumers re-pointed; delivery verified with real events | | Real event observed end-to-end |
| 6 | **Observability & ops** | Metrics, dashboards, alerts, log queries, SLOs, on-call runbooks | Rebuilt against the new API | | Dashboards/alerts fire on new API; old ones removed |
| 7 | **Docs & support** | API docs, SDK docs, billing/refund docs, support runbooks, internal wikis, install/config paths | Updated to new API only | | Search finds no live doc pointing at old API |
| 8 | **Compliance & accounting** | Ledger, tax, invoicing, audit references, provider agreements | Entries flow from new API; reconciliation parity proven | | Reconciliation matches across a full period |

## 3. Backfill (before cut)

1. Run the data move/rebuild to the destination using the **original source of
   truth** (provider ledger, database dumps, event history) — not memory.
2. Verify with an original oracle: record counts, digests, and a sample of
   real records (customer, payment method, transaction, refund) and confirm
   the destination matches.
3. Prove idempotency parity: replayed/retried requests behave identically on
   the new API.
4. Only proceed to the switch when backfill verification passes. Missing
   state is a blocker, not something the switch will fix.

## 4. How traffic switches

Default: **switch + retire in one step**. Choose one switch mechanism:

| Mechanism | Use when | Evidence of switch |
|---|---|---|
| Gateway/route flip (single flag or routing rule) | We control the entry point and all callers | Before/after routing logs; old route no longer matched |
| Client/SDK release | Callers are apps or partner fleet we update together | Deployed client versions reported; old versions blocked or EOL'd |
| DNS/endpoint cut | Single hostname boundary | DNS propagation check; live request shows new backend |
| Percentage/canary | Only when expand-contract is justified (gates below) | Per-share request counts + error parity per slice |

Expand-contract is allowed **only** with all of:

| Gate | Evidence |
|---|---|
| Scale | Named traffic share / cohort that justifies gradual flow |
| Live impact | Concrete failure mode if hard-cut now |
| EV | Dual-path cost < expected incident cost of hard cut |
| Exit | Date + owner + delete proof for the old path (contract, not hope) |

Order of operations:

1. Deploy the new API; verify it handles the full surface under real checks
   (real charge, real refund, real webhook, reconciliation run) in staging.
2. Freeze new writes to the old API at the data boundary (block old-path
   creation of payment methods, transactions, idempotency records).
3. Flip readers/writers at the chosen switch point.
4. Verify postconditions on the *live* path — not just 2xx or a green deploy:
   a real transaction completes, its record lands in the destination ledger,
   its webhook delivers and is acknowledged.
5. **Rollback escape hatch (time-boxed):** define the trigger (e.g., error rate
   above X, reconciliation mismatch, webhook loss) and procedure to flip back.
   Rolling back is recovery, not the terminal state: the plan must re-run to
   completion afterward.

## 5. Retire the old path

Do not leave "just in case" dual paths. After the switch is proven:

- Delete old API routes/controllers; old routes return **410 Gone** (or 404
  once fully removed) and are covered by a test.
- Delete the old client/SDK path and its install/docs references.
- Delete the flag that switched traffic — a permanent flag becomes the new
  system of record.
- Revoke old credentials, webhook secrets, and merchant/PSP keys.
- Remove old dashboards, alerts, log queries, and runbooks.
- Remove old data consumers/schedulers; stop old-event replay queues.
- Confirm no code path, installer, doc, or dashboard references the old API
  (grep + live log check, not memory).

## 6. How you know it is done

Done means delivered at the live boundary, proven per layer:

| Layer | Check | Evidence |
|---|---|---|
| Source | Old API code, routes, flags, docs removed | Merge/commit SHA; grep shows no old-path references |
| CI | Parity + removal tests green on the exact commit | CI run linked to the shipped SHA |
| Artifact/deploy | The exact SHA containing the cut is what is deployed | Deployed image/SHA matches the cut commit |
| Live traffic | New API handles all payment traffic; old API receives zero production requests for the full soak window | Live request logs, routing telemetry, 410/404 on old route |
| Data | Ledger/reconciliation matches across the soak window | Reconciliation report, no orphaned old-path records |
| Behavior | Real actions (charge, refund, webhook, retry) succeed with correct postconditions | Action receipts + postcondition checks |
| Residuals | Every leftover is listed with owner and date; no silent dual path remains | Residual list reviewed and signed |

Soak window: `<duration>`, owner `<owner>`, ends `<date>`. The cut is complete
only after the soak window passes with no old-path traffic, reconciliation
parity, and the old path removed — a green CI run, merged PR, or healthy new
API alone is not completion.

## 7. Forbidden residuals

- A forever feature flag toggling old behavior.
- Undated compatibility shim or "support both" wrapper.
- Silent dual writers (old path still accepting writes after destination is
  ready).
- Old API kept alive "just in case" after the switch is proven.
- Docs/installers still pointing at the old API after code cutover.

## 8. Risks

- **Half-cutover:** traffic flipped at one layer (e.g., callers) but not
  another (e.g., webhook consumers, scheduled jobs). Mitigation: inventory in
  §2 checked off against logs and code, not assumptions.
- **Data drift during switch:** new records created on the old path while
  traffic is mid-flip. Mitigation: block new old-path writes before the flip.
- **Reconciliation gap:** webhook/ledger rows diverge. Mitigation: real-event
  verification and a full-period reconciliation before retirement.
- **Rollback becomes permanent:** escape hatch left in place forever.
  Mitigation: explicit end date; the plan re-runs to completion.

## 9. Exit gate checklist (sign-off)

- [ ] Inventory (§2) complete and checked off, owners assigned
- [ ] Backfill verified against original oracle (§3)
- [ ] Staging proof: real charge, refund, webhook, retry, reconciliation (§4.1)
- [ ] Traffic switched; live postconditions verified (§4.4)
- [ ] Soak passed with zero old-path production traffic (§6)
- [ ] Old API removed from source, deploy, flags, credentials, docs, dashboards (§5)
- [ ] Residuals listed, dated, owned (§6)

Signed off by: `<owner>` on completion of each gate.
