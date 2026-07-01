{
  "A": {
    "metric-definitions": 5,
    "reconciliation": 5,
    "variance": 4,
    "decisions": 4,
    "data-quality": 4
  },
  "B": {
    "metric-definitions": 0,
    "reconciliation": 0,
    "variance": 3,
    "decisions": 4,
    "data-quality": 0
  },
  "rationale": {
    "A_metric-definitions": "Provides clear formulas, sources, owners, and caveats for all requested metrics, effectively establishing a robust metric dictionary.",
    "A_reconciliation": "Clearly maps sources of truth (billing, CRM, product DB, support DB, GL) and separates systems appropriately.",
    "A_variance": "Mandates a driver-tree bridge for variances over 5%, successfully preventing narrative spin or vanity metrics.",
    "A_decisions": "Includes board asks, requires owner signoff, and establishes an action register with specific owners and due dates.",
    "A_data-quality": "Identifies critical data quality caveats and edge cases like internal employee traffic, stale CRM stages, and GAAP differences.",
    "B_metric-definitions": "Fails to define metrics, relying on spreadsheet theater with raw numbers but missing required formulas, sources, and cadence.",
    "B_reconciliation": "Completely lacks a source-of-truth map and fails to separate accounting, billing, CRM, and product systems.",
    "B_variance": "Provides a basic reason for the ARR forecast variance, but lacks a structured, driver-based variance narrative.",
    "B_decisions": "Includes a clear owner signoff, specific board asks, and a well-structured action follow-up register.",
    "B_data-quality": "Ignores data quality entirely, failing to flag potential drift, stale definitions, or confidence gaps."
  }
}
