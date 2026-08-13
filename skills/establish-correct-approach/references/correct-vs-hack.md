# Correct vs hack

Use this table to classify a candidate approach. Open when step 6 needs a
definition, not as a ban list to paste into the record.

| Signal | Correct method | Hack / patch / pollution |
| --- | --- | --- |
| Owner | The layer that already owns the invariant | Product repo papers over a platform/shared floor |
| Contract | Current public CLI, SDK, schema, or spec read this session | Remembered API, stale tutorial, or sibling-repo copy |
| Truth | One writer after the change | Flag, dual path, compatibility forever, "we'll clean later" |
| Symptom | Cause on the owning layer; oracle on the postcondition | Catch, retry, default, extra process, or health-200 theater |
| Analogy | First-principles fit to *this* contract | "Everyone uses X" / "we did this in the other app" |
| Fence | Existing structure explained, then kept or replaced on purpose | Deleted or bypassed because it looked unused |

A temporary bypass is allowed only when the owning fix cannot land in the
required window. It must name owner, reason, expiry, replacement, and
deletion terminal. It is never the default example.

Depth (thinking) is required. Depth is not an excuse to bloat the artifact.
The correct method is usually the simpler owning-layer path.
