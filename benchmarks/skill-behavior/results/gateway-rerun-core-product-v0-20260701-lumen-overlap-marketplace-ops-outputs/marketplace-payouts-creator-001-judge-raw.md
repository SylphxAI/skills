{
  "Answer A": {
    "ledger-truth": {
      "score": 5,
      "rationale": "Strong source of truth definition. Includes formal state machine, specific ledger events, and strict audit invariants tying balances, reversals, and payouts together."
    },
    "risk-controls": {
      "score": 5,
      "rationale": "Comprehensively covers KYC/tax blocks, fraud/compliance holds, 14-day risk window, refunds, and chargeback handling via negative balances."
    },
    "seller-experience": {
      "score": 4,
      "rationale": "Includes dashboard reconciliation, support ticket integration, and dispute routes, but lacks detailed seller-side support workflows."
    },
    "schedule-policy": {
      "score": 4,
      "rationale": "Defines the 14-day risk window and monthly batches, but misses specific payout thresholds, supported currencies, and fee structures."
    },
    "marketplace-health": {
      "score": 5,
      "rationale": "Effectively addresses platform loss mitigation for negative balances and strategies for winning friendly fraud chargebacks."
    }
  },
  "Answer B": {
    "ledger-truth": {
      "score": 5,
      "rationale": "Clearly defines a double-entry ledger with explicit debit/credit flows for sales, fees, and reversals linked to provider IDs."
    },
    "risk-controls": {
      "score": 5,
      "rationale": "Covers KYC/tax via Stripe, 7-day clearing, 30-day rolling reserve, automated fraud triggers, and explicit refund/chargeback liability rules."
    },
    "seller-experience": {
      "score": 5,
      "rationale": "Details dashboard financial views, dedicated dispute UI, and support tooling with dual-signoff admin controls."
    },
    "schedule-policy": {
      "score": 5,
      "rationale": "Clearly specifies 7-day clearing, 30-day reserve, weekly Friday payouts, and a $10 minimum threshold."
    },
    "marketplace-health": {
      "score": 4,
      "rationale": "Addresses platform loss absorption and account suspension for negative balances, but lacks explicit creator trust or support load metrics."
    }
  }
}
