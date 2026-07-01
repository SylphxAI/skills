### System Architecture & Integrations
* **Payment Infrastructure:** Stripe Connect (Express accounts) to automate KYC, tax, and money movement.
* **Ledger:** Immutable, double-entry relational database (e.g., PostgreSQL). Every transaction writes a paired debit/credit record.
* **Compliance:** PCI-DSS handled via Stripe Elements (no raw PANs touching our servers).

### 1. Creator Onboarding & KYC/Tax
* **Onboarding Flow:** Creator requests payout → redirected to Stripe Connect Express.
* **KYC/AML:** Stripe handles ID verification, watchlist screening, and business verification.
* **Tax:** Creators submit W-9/W-8BEN via Stripe. Platform generates 1099-NEC forms automatically at year-end for US creators meeting the threshold.
* **Audit Rule:** If Stripe `requirements.past_due` != null, platform flags account `payouts_paused`. 

### 2. Revenue Share & Ledger Logic
* **Default Split:** 80% Creator / 20% Platform.
* **Transaction Event Flow (Immutable Ledger):**
  1. *Sale ($100):* Debit Clearing Account $100 / Credit Marketplace Revenue $20 / Credit Creator Wallet $80.
  2. *Processing Fee ($3):* Debit Marketplace Revenue $3 / Credit Clearing Account $3.
* **Creator Wallet:** Internal ledger tracking `available_balance`, `pending_balance`, and `in_reserve_balance`.

### 3. Payout Schedule & Holds
* **Clearing Period:** Funds remain in `pending_balance` for **7 days** post-transaction to clear bank networks and initial fraud screens.
* **Rolling Reserve:** 10% of creator revenue held in `in_reserve_balance` for **30 days** to cover refund/chargeback liabilities. Released to `available_balance` on day 31.
* **Payout Schedule:** Automatic weekly payouts via Stripe on Fridays. Minimum threshold: $10.
* **Audit Trail:** Every payout generates a unique `payout_id` linking ledger entries to the Stripe transfer ID.

### 4. Reversals: Refunds & Chargebacks
* **Refunds (Platform Initiated):**
  * Reverse the original ledger entries.
  * Deduct the exact refund amount from the creator’s `pending_balance` (or `in_reserve` if funds are insufficient).
* **Chargebacks (Dispute Flow):**
  * Stripe webhook `charge.dispute.created` fires.
  * Platform automatically extracts evidence (IP logs, template download logs, TOS acceptance) and submits via Stripe API.
  * If lost: Debit Creator Wallet for the dispute amount + $15 dispute fee. 
  * **Liability Rule:** If the creator's wallet goes negative, platform absorbs the loss, but the creator account is suspended until the balance is rectified.

### 5. Fraud Review & Risk Operations
* **Automated Triggers:** Velocity checks (> $500 sales in 1 hour for a new creator), VPN detection, and anomalous refund rates (> 5%).
* **Action:** System transitions account status to `under_review`. Funds freeze in `pending_balance`. 
* **Content Moderation:** Automated DMCA/plagiarism scanning on uploaded AI templates prior to listing. 
* **Manual Review:** Ops team investigates `under_review` accounts. Resolutions require a mandatory admin `reason_code` (e.g., `fraud_confirmation`, `false_positive`) written to the audit log.

### 6. Seller Dashboard
* **Financial Views:** 
  * Gross Sales, Net Earnings, Pending Balance, Next Payout Date.
  * Transaction Level Table: Date, Template ID, Buyer ID (hashed), Gross, Platform Fee, Net.
* **Dispute Center:** UI to view chargebacks, upload supplementary evidence, and track dispute status.

### 7. Support Operations
* **Support Tooling:** Admins access a read-only ledger view. 
* **Adjustments:** Any manual balance adjustments (e.g., operational credits, manual clawbacks) require dual-signoff (Maker-Checker approval).
* **Audit Rule:** All admin actions (refunds, manual holds, profile edits) are logged with `admin_id`, `timestamp`, and `action_payload`.
