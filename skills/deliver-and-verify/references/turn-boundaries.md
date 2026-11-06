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

## Persist results before yielding

A process or tool-session handle can disappear between turns. Before launching
work that can outlive the turn, create a unique run directory and record the
source revision, target environment, command and expected artifact paths. Send
stdout and stderr to a durable log and write the exit status when the command
ends. Preserve reports and captures on failure as well as success. Watch the
completion file or the executor's operation ID; a session handle alone is not a
recoverable receipt. Verify the child survives the launching call using the
[background-process guidance](dx.md#internal-development).

On wake, read that run's receipt and the executor's current status before
starting another attempt. Keep queue admission, dependency setup and inner test
results distinct: a queue timeout or browser-download failure establishes no
test verdict. Bind every artifact to the revision actually submitted, including
uncommitted fixture changes; a later branch head cannot inherit an older run's
result. Keep earlier failures in their original run directories.

When a supported executor limits Internet access by host, inspect dependency
download redirects and include the required destination hosts in its run
configuration. A reachable initial URL does not establish that its redirected
download can finish. Verify the correction by reaching the inner check before
attributing a setup failure to product code. Use the documented admission budget
and event watches so waiting for capacity does not occupy an agent turn.

## Temporary recovery for stalled timeout sessions

Until the runtime provides automatic recovery, a parent whose child reports
`turn_state: errored` with `turn timeout reached` should read that state before
sending more work: messages may remain undelivered. One supported parent `wake`
can restore the session. The wake may first re-emit the old error; perform one
bounded follow-up observation about 30 seconds later before treating it as a
new failure. Do not loop wakes or repair the runtime from the worker. Remove
this temporary method once verified automatic recovery replaces it.
