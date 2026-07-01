```json
{
  "AnswerA": {
    "store-specificity": 4,
    "store-specificity_rationale": "Separates Apple and Google metadata, policies, and testing tracks well in the readiness matrix.",
    "monetization-compliance": 4,
    "monetization-compliance_rationale": "Covers IAP, restore paths, and refunds, but lacks server-side receipt validation details.",
    "privacy-permissions": 4,
    "privacy-permissions_rationale": "Mentions privacy labels, data safety form, and contextual push notification timing.",
    "launch-ops": 5,
    "launch-ops_rationale": "Includes staged rollout gates, monitoring windows, support contacts, and rollback criteria.",
    "evidence": 4,
    "evidence_rationale": "Provides a structured readiness checklist and blocker list with clear owners."
  },
  "AnswerB": {
    "store-specificity": 5,
    "store-specificity_rationale": "Clearly distinguishes Apple and Google requirements across IAP, privacy, testing, and rollout.",
    "monetization-compliance": 5,
    "monetization-compliance_rationale": "Excellent IAP compliance, detailing RTDN, StoreKit 2, and explicit refund links.",
    "privacy-permissions": 4,
    "privacy-permissions_rationale": "Thoroughly covers iOS privacy labels, Google Data Safety, and runtime push permissions.",
    "launch-ops": 3,
    "launch-ops_rationale": "Covers staged rollout and support links, but lacks explicit rollback criteria and release notes.",
    "evidence": 1,
    "evidence_rationale": "Generic instructional advice; entirely lacks the required readiness checklist, blockers, and owners."
  }
}
```
