---
name: operate-marketplace-payouts
description: "Operate marketplace seller payouts so money, holds, tax status, and failed transfers stay reconcilable. Use for two-sided payouts, not for buyer checkout."
---

# Operate Marketplace Payouts

A risk score may delay a payout; it must not silently confiscate it. Failed transfers remain a liability until they succeed, retry under policy, or are paid another way with a ledger event.

Open [marketplace payout systems](references/marketplace-payout-systems.md) when holds, tax, or failed transfers need depth.

Use `build-payment-readiness` for buyer checkout.
