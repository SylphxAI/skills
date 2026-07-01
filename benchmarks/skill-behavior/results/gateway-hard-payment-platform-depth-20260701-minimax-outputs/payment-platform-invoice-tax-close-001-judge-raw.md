{
  "winner": "b",
  "a": {
    "score": 3,
    "criterionScores": {
      "ledger-model": 3,
      "finance-close": 3,
      "entitlement-dunning": 2,
      "support-controls": 4,
      "launch-rollback": 4
    },
    "criticalFailures": [
      "Ledger omits explicit coupon_applied, settlement, fee, and manual_adjustment events.",
      "Entitlement contract is underdefined and risks coupling access to billing outcomes."
    ],
    "rationale": "Strong gates, audit logging, observability, and rollback. However ledger coverage is incomplete, finance close lacks clear owners and full fee/settlement/refund/credit-note detail, and entitlement/dunning separation is too shallow for the stated reconciliation risk."
  },
  "b": {
    "score": 5,
    "criterionScores": {
      "ledger-model": 5,
      "finance-close": 5,
      "entitlement-dunning": 5,
      "support-controls": 5,
      "launch-rollback": 4
    },
    "criticalFailures": [],
    "rationale": "Comprehensive ledger, reconciliation ownership, tolerances, close blockers, entitlement projection, dunning states, support controls, fixtures, dashboards, and kill switches. Minor gap: sandbox/live separation is noted as a blocker rather than fully operationalized."
  }
}
