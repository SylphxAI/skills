{
  "winner": "a",
  "a": {
    "score": 4.5,
    "criterionScores": {
      "recovery-objectives": 4.5,
      "restore-proof": 4.5,
      "corruption-deletion": 5,
      "security-privacy": 4.5,
      "operations": 3.5
    },
    "criticalFailures": [],
    "rationale": "Comprehensive scope, retention, RPO/RTO, restore paths, immutable backups, point-in-time recovery, E2EE, regional storage, export, and restore drills. Minor gaps: restore runbook is scenario-based not procedural, evidence retention and ops roles/cost controls are thin."
  },
  "b": {
    "score": 4.1,
    "criterionScores": {
      "recovery-objectives": 4.5,
      "restore-proof": 4,
      "corruption-deletion": 4.5,
      "security-privacy": 3.5,
      "operations": 4
    },
    "criticalFailures": [],
    "rationale": "Strong objectives, retention, snapshots, ransomware handling, user restore, drills, and support tooling. Security is weakened by unclear org/HSM recovery-key access under E2EE, export is under-specified, and restore evidence retention/checksum detail is lighter."
  }
}
