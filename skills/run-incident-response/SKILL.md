---
name: run-incident-response
description: "Coordinate a production incident from declaration through mitigation, recovery, and learning. Use for live outages, elevated errors, security events, or material data-integrity risk."
---

# Run Incident Response

Stabilize first and do not wait for root cause to stop active harm. Updates carry observed facts, actions underway, and the next update time, with estimates labeled as estimates. Three rules for the record:

- **Timeline of observations, kept apart from inferences.** Each entry is a time and something seen or done (a deploy, an error rate reading, a rollback). Write suspected causes and "it seems fixed" in a separate inference list until a reading confirms them.
- **Sensitive data stays out of the timeline.** Never paste credentials, tokens, personal data, or customer records into it. If someone posts them in a public channel, remove them, move that handling to an authorized incident channel, and keep stabilizing meanwhile.
- **The timeline is the record at close.** Close once harm is stable and the readings confirm it; hand the remaining repair to `maintain-product`, and keep the timeline as what was observed, done, and learned. Do not hold the incident open for root cause.

Use `handoff-work` for the update text.
