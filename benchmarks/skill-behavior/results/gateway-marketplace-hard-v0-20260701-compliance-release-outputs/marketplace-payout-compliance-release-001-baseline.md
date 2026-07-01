# Payout Release Audit — High-Earner, Multi-Blocker Case

## 1. Safest State Model

Adopt an explicit **Release Readiness State** with hard blockers; no release permitted from `PARTIAL_HOLD` or `BLOCKED`.

| State | Definition | Permitted Action |
|---|---|---|
| `READY` | All 6 checks green | Release |
| `PARTIAL_HOLD` | 1+ soft blocker (chargeback, failed xfer, negative bal) | Net only after offsets |
| `BLOCKED` | Tax expired OR sanctions match unresolved OR negative balance | **No release** |
| `RELEASED_REVOCABLE` | Funds out ≤ T+5 days | Clawback window open |
| `RELEASED_IRREVOCABLE` | > T+5, no clawback trigger | Closed |

**Decision rule:** Expired W-8BEN + sanctions match + negative balance = `BLOCKED` regardless of support pressure. Month-end is not a control.

## 2. Evidence Requirements (Per Blocker)

| Blocker | Required Evidence | Owner |
|---|---|---|
| Expired W-8BEN | New signed W-8BEN (current FY) + TIN match against IRS records | Tax Ops |
| Sanctions match | Screening case ID, OFAC/UN/EU list reference, false-positive rationale with two-analyst sign-off, name+DOB+address disambiguation, geographic footprint review | Sanctions/FCC |
| Failed bank transfer | Updated bank validation (micro-deposit or instant verify), destination change audit trail with 2FA/IP evidence, original failure reason (R-code) | Payments Ops |
| Chargeback | Dispute ID, network reason code, evidence package submitted, recovery status, retro-clawback eligibility memo | Disputes |
| Negative balance | Ledger reconciliation, root-cause memo (clawback vs. refund vs. fee), repayment or netting plan | Finance |

## 3. Compliance Handoff

- **Primary owner:** Payments Risk Lead (single accountable approver).
- **Co-signers required:** Tax Ops (W-8BEN) + Compliance Officer (sanctions) + Finance Controller (balance).
- **SLA:** Blockers → decision in **5 business days**; sanctions cases escalate to MLRO if not cleared by **T+3**.
- **Documentation:** All decisions in the case file with timestamp, reviewer ID, rationale. No verbal approvals.
- **Segregation:** Support has **read-only** visibility; cannot modify state. Support pressure without compliance sign-off is logged as a control exception for SOX/audit trail.

## 4. Creator Messaging

- **Allowed:** Factual status ("Payout paused pending tax form renewal and verification of banking details"), timeline expectations, list of required actions, secure upload link.
- **Prohibited:** Promising release date, acknowledging sanctions review, discussing chargeback details with creator, suggesting workarounds.
- **Tone:** Empathetic but scripted; no individual accommodation.
- **Channel:** In-app + email only; no DMs. All replies logged.

## 5. Reconciliation

- **Pre-release:** Match internal ledger ↔ processor balance ↔ escrow account; tolerance $0.
- **Chargeback overlay:** Subtract open disputes from gross earnings; verify clawback ledger entries.
- **Negative balance:** Confirm balance is "owed to platform" not "pending to creator"; cannot be netted into a positive payout.
- **Bank xfer:** Re-validate destination against change-log; reject if changed within last 72h without full re-verification (fraud guardrail).
- **Post-release (T+5):** Confirm settlement cleared; close state to `IRREVOCABLE` only after processor confirmation.

## 6. Release / Rollback Gates

**Release gate (ALL must be true):**
1. W-8BEN current and validated.
2. Sanctions case cleared with documented false-positive disposition.
3. Bank destination re-verified post-change.
4. Chargebacks ≤ recoverable amount OR written off with Finance approval.
5. Balance ≥ $0 (after offsets).
6. Single accountable approver + 2 co-signers; SOX evidence complete.

**Rollback gate (trigger if):**
- Sanctions hits confirm after release → **immediate clawback** + legal hold.
- Bank fraud signal → recall within processor window (typically 24h).
- Chargeback retro-assigned to paid earnings → deduct from next payout or initiate recovery.
- Compliance veto at any point → freeze within 1 hour, no exceptions for SLA pressure.

**Hard rule:** Support SLA pressure and month-end timing **never** override blocker resolution. Document any override attempt as a reportable control exception.
