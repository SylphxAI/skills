---
name: operate-marketplace-payouts
description: 'Operate marketplace seller payouts so money, holds, tax status, and failed transfers stay reconcilable. Use for two-sided payouts, not for buyer checkout.'
---

# Operate Marketplace Payouts

Make seller payouts traceable, fair, and resilient to refunds, holds, and provider failure.

## Method

1. Map buyer payment, platform fee, seller earnings, pending balance, holds, refunds, adjustments, payout, and reconciliation as separate facts.
2. Keep ledger truth, displayed balances, provider state, and policy decisions distinct.
3. Define reserve and hold governance: reason code, release criteria, SLA, owner, evidence, escalation, and appeal. A risk score may delay a payout; it must not silently confiscate it.
4. Cover tax-form states, withholding, country eligibility, failed transfers, negative balances, and outage behavior.
5. Open [marketplace payout systems](references/marketplace-payout-systems.md) for the hold/release and outage state machines.

Buyer checkout, provider ingestion, and entitlement projection stay with `build-payment-readiness`.

## Output

Payout map, hold policy, tax and failure paths, and the owner of each money fact.
