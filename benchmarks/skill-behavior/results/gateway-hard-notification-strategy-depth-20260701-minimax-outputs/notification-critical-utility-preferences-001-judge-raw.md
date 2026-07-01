{
  "winner": "b",
  "a": {
    "score": 3,
    "criterionScores": {
      "taxonomy-separation": 4,
      "preference-consent": 3,
      "emergency-override": 3,
      "suppression-dedupe": 2,
      "trust-metrics": 1
    },
    "criticalFailures": [
      "missing event schema",
      "missing trust metrics",
      "incomplete suppression and stop rules"
    ],
    "rationale": "Strong taxonomy and basic preferences, but lacks denied-permission fallback, regional consent evidence, unsubscribe scope, event schema, stale expiry, stop conditions, suppression reasons, and required trust metrics. Quiet-hours handling lets P1 bypass too broadly."
  },
  "b": {
    "score": 5,
    "criterionScores": {
      "taxonomy-separation": 5,
      "preference-consent": 5,
      "emergency-override": 5,
      "suppression-dedupe": 4,
      "trust-metrics": 5
    },
    "criticalFailures": [],
    "rationale": "Comprehensive policy with clear taxonomy, regional consent evidence, permission-denied recovery, unsubscribe scopes, override limits and reasons, quiet-hours rules, dedupe keys, stop conditions, suppression reasons, event properties, and trust metrics. Stale expiry is only partially explicit."
  }
}
