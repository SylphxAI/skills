{
  "winner": "b",
  "a": {
    "score": 4,
    "criterionScores": {
      "recovery-objectives": 3,
      "restore-proof": 4,
      "corruption-deletion": 4,
      "security-privacy": 4,
      "operations": 2
    },
    "criticalFailures": [],
    "rationale": "Strong architecture, E2EE, WORM snapshots, deleted-item recovery, and restore testing. However RPO/RTO are not explicit, restore runbook is thin, evidence retention/monitoring are incomplete, and operations lacks roles, escalation, comms, and cost controls."
  },
  "b": {
    "score": 5,
    "criterionScores": {
      "recovery-objectives": 5,
      "restore-proof": 5,
      "corruption-deletion": 5,
      "security-privacy": 4,
      "operations": 4
    },
    "criticalFailures": [],
    "rationale": "Comprehensive scope, RPO/RTO, retention, runbook, checksums, drills, monitoring, deletion/corruption/device-loss handling, support tooling, and failure modes. Minor concerns: regional storage is muddied by multi-region replication, and customer communications/cost controls are limited."
  }
}
