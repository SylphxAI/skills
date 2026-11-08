# Long-running work across turn and lease boundaries

Trigger: starting long work in a cloud agent session or leased environment.

Read the runtime's actual execution deadline and persistence semantics before
choosing where to run the work. Some runtimes impose a fixed 30-minute wall-clock
limit at turn start that never extends and save workspace state only at turn end.
Treat that as an execution boundary, not an inactivity timeout. Do one
self-contained step per turn and push source before ending it; a long active tool
call does not protect unpushed work from deadline loss. Do not assume the same
limit in a runtime with a different documented contract.

A launcher found on `PATH` can derive a different child executable from `HOME`
or a toolchain directory, so discovery or a version check does not prove the
build will start. When a failure names a missing child executable, read that
dispatch chain and use its supported path setting with admission controls intact;
verify the originally failing subcommand before resubmitting a long suite.

Run long builds and suites in CI. Record the submitted revision and run ID, set a
`github:check:<owner>/<repo>@<ref>` event watch and end the turn instead of waiting
inside it. On wake, read the actual run and continue from its receipt, without
resubmitting a run whose result is unknown.

If a build wrapper repeatedly times out before a compiler verdict, use the
[build wrapper recovery procedure](../../unblock/SKILL.md#build-wrapper-timeouts).

## Leased task lifetime

A lease's maximum lifetime is not its granted expiry, and neither overrides an
idle timeout; read the current grant, renewal rules and which activity resets
idleness, since status queries may not qualify. If the remaining grant is
insufficient, renew through the supported API once ready and verify the new
expiry before long work. For a permitted heartbeat serving an active task,
derive cadence from the idle timeout with scheduling margin, verify qualifying
activity after the launcher returns, and bound it to task completion or deadline;
refusal, lease end or generation change must stop it and emit a failure signal,
and heartbeats must not bypass lifetime or capacity limits.

A newly ready replacement can still inherit the original resource's old deadline;
compare `expiry - now` with remaining work plus evidence-export and cleanup time,
not with the advertised maximum lifetime or readiness timestamp. Logs saved outside
the lease do not preserve unique fixture or session state inside its writable
layer: verify that state's persistence or recovery before expiry, rather than
assuming a replacement can recreate it without changing the experiment.

## Persist results before yielding

A process or tool-session handle can disappear between turns. Before launching
work that can outlive the turn, create a unique run directory and record the
source revision, target environment, effective executor, its non-secret
configuration selectors, command and expected artifact paths. A clean checkout
after an environment or placement change may contain different work; bind every
handoff to a remotely readable commit or complete recovery receipt and verify
the destination tree against it. Resolve those selectors again through the
supported wrapper before resuming, keeping admission controls intact.
Send stdout and stderr to a durable log and write the exit status when the
command ends. Preserve reports and captures on failure as well as success. Watch the
completion file or the executor's operation ID; a session handle alone is not a
recoverable receipt. The observer needs its own access to that completion
signal: a writer-readable private temporary directory can still make watch
registration fail. Keep private payloads private; expose only a secret-free
completion marker through a supported observer-readable location, or use the
executor's operation identity. A terminal registration baseline needs immediate
receipt reconciliation, because no later transition may wake the worker. Verify
the child survives the launching call using the
[background-process guidance](dx.md#internal-development).

On wake, read that run's receipt and the executor's current status before
starting another attempt. Keep queue admission, source transfer, dependency setup
and inner check results distinct: a transport or authentication failure before
execution establishes no test verdict. An alternate supported executor must run
the same source and check, preserving required hooks and runtime boundaries.
Bind every artifact to the revision actually submitted, including
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
