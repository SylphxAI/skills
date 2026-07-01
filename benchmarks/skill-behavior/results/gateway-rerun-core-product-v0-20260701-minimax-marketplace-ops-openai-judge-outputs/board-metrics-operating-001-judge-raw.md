{
  "winner": "b",
  "a": {
    "score": 3,
    "criterionScores": {
      "metric-definitions": 2,
      "reconciliation": 2,
      "variance": 3,
      "decisions": 5,
      "data-quality": 1
    },
    "criticalFailures": [
      "undefined metrics",
      "incomplete source-of-truth map",
      "weak data-quality controls"
    ],
    "rationale": "Strong board-style tables, owner signoff, asks, and action follow-up. However, it lacks a real metric dictionary with formulas/cadence/caveats, has only minimal reconciliation, and barely addresses definition drift, schema changes, or confidence gaps."
  },
  "b": {
    "score": 4,
    "criterionScores": {
      "metric-definitions": 4,
      "reconciliation": 5,
      "variance": 4,
      "decisions": 3,
      "data-quality": 5
    },
    "criticalFailures": [
      "missing owner signoff",
      "limited actual period metrics"
    ],
    "rationale": "Provides strong definitions, source-of-truth separation, driver-based variance framework, and data-quality risks. It is more operating-system than board review, with generic asks, no explicit owner signoff artifact, and few actual metric results."
  }
}
