```json
{
  "AnswerA": {
    "ledger-truth": {
      "score": 3,
      "rationale": "Mentions an immutable event store and negative balances, but lacks formal ledger event schemas, strict invariants, and detailed reconciliation procedures."
    },
    "risk-controls": {
      "score": 5,
      "rationale": "Comprehensively covers KYC/tax via Stripe, 14-day payout holds, transaction fraud, IP validation, refunds, and chargeback liability."
    },
    "seller-experience": {
      "score": 5,
      "rationale": "Defines a robust seller dashboard, clear support tiers, and specific dispute resolution paths with response times."
    },
    "schedule-policy": {
      "score": 5,
      "rationale": "Clearly defines 80/20 revenue share, 14-day hold, monthly cadence, $50 threshold, and payout fees."
    },
    "marketplace-health": {
      "score": 3,
      "rationale": "Identifies fraud risks but lacks explicit metrics to measure creator trust, buyer trust, liquidity, or support load."
    }
  },
  "AnswerB": {
    "ledger-truth": {
      "score": 5,
      "rationale": "Excellent formal state machine with explicit ledger mutations, strict audit invariants, detailed event schemas, and reconciliation rules."
    },
    "risk-controls": {
      "score": 5,
      "rationale": "Covers KYC/tax blocks, sanctions screening, 14-day holds, fraud, refunds, and chargebacks via negative balance offsets."
    },
    "seller-experience": {
      "score": 5,
      "rationale": "Defines specific dashboard states, support workflows with SLAs, reason codes, and clear appeal routes for held funds."
    },
    "schedule-policy": {
      "score": 5,
      "rationale": "Clearly defines monthly cadence, 14-day clearing delay, $50 threshold, multi-currency settlement, and Stripe payout fees."
    },
    "marketplace-health": {
      "score": 5,
      "rationale": "Explicitly defines trust metrics including payout latency, reconciliation mismatches, dispute win rate, and negative balance recovery."
    }
  }
}
```
