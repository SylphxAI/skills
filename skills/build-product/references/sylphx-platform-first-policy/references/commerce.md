# Commerce

How an app charges, entitles, and refers on Sylphx Platform.

Money truth is the Platform Commerce ledger (Ledger): usage, price book,
entitlement, invoice, payment adapter, dispute, referral settlement.

## Do this

1. Model catalog and entitlements as Platform Commerce Resources.
2. Take card or IAP confirmation through the documented payment adapter
   (Stripe, Apple, Google are adapters—not a second ledger).
3. Grant access only after a ledger event exists. Client-only success is not
   value.
4. Refunds, disputes, and chargebacks append corrective ledger events and
   replay the entitlement projector.
5. Referrals (codes, redeem, rewards) settle through the same ledger when
   the referrals pack is in the current contract.

Open `build-payment-readiness` for the full payment/reconciliation artifact.
This recipe is the Platform owner map that skill applies.

## Done

A successful checkout produces a ledger row and an entitlement the app can
read back. A refund removes or reduces that entitlement through another
ledger event.
