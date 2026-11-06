# Delivery across cloud turn boundaries

Trigger: starting a long build or test suite in a cloud agent session.

Read the runtime's actual execution deadline and persistence semantics before
choosing where to run the work. Some runtimes impose a fixed 30-minute wall-clock
limit at turn start that never extends and save workspace state only at turn end.
Treat that as an execution boundary, not an inactivity timeout. Do one
self-contained step per turn and push source before ending it; a long active tool
call does not protect unpushed work from deadline loss. Do not assume the same
limit in a runtime with a different documented contract.

Run long builds and suites in CI. Record the submitted revision and run ID, set a
`github:check:<owner>/<repo>@<ref>` event watch and end the turn instead of waiting
inside it. On wake, read the actual run and continue from its receipt, without
resubmitting a run whose result is unknown.

If a build wrapper repeatedly times out before a compiler verdict, use the
[build wrapper recovery procedure](../../unblock/SKILL.md#build-wrapper-timeouts).

## Temporary recovery for stalled timeout sessions

Until the runtime provides automatic recovery, a parent whose child reports
`turn_state: errored` with `turn timeout reached` should read that state before
sending more work: messages may remain undelivered. One supported parent `wake`
can restore the session. The wake may first re-emit the old error; perform one
bounded follow-up observation about 30 seconds later before treating it as a
new failure. Do not loop wakes or repair the runtime from the worker. Remove
this temporary method once verified automatic recovery replaces it.
