{
  "winner": "a",
  "a": {
    "score": 5,
    "criterionScores": {
      "incident-readback": 4,
      "dedupe-stop-rules": 4,
      "frequency-quiet-hours": 5,
      "commercial-trust": 5,
      "measurement": 5
    },
    "criticalFailures": [],
    "rationale": "Comprehensive recovery and policy with cohort/channel/event readback, strong dedupe, stop rules, quiet hours, consent, trust guardrails, and measurement. Minor gaps: stale-event expiry and timezone/payment-state breakdown are not fully explicit in the readback."
  },
  "b": {
    "score": 3,
    "criterionScores": {
      "incident-readback": 2,
      "dedupe-stop-rules": 3,
      "frequency-quiet-hours": 3,
      "commercial-trust": 4,
      "measurement": 2
    },
    "criticalFailures": [
      "incomplete incident readback",
      "incomplete measurement plan"
    ],
    "rationale": "Good containment decision and rejects CTR-only optimization, but incident readback is not broken down by cohort/channel/event/state/timezone. Dedup key is too generic, stale expiry is absent, frequency policy lacks lifecycle/global detail, and measurement misses revenue/retention/churn."
  }
}
