---
name: provision-agent-workspace
description: "Provision an agent filesystem and shell workspace with isolation and free-boundary honesty."
---

# Provision Agent Workspace

Provide an agent with a filesystem and command-execution workspace whose
isolation, lifetime, network, capacity, and cost match the task.

## Method

1. Open [provider selection](references/provider-selection.md) and current official
   documentation for the selected provider.
2. Choose host workspace, in-process isolate, managed sandbox, or VM from the
   data sensitivity, untrusted-code risk, network needs, persistence, capacity,
   account, and cost requirements.
3. Create or attach the workspace and record its handle, owner, region,
   lifetime, disk, CPU/memory, concurrency, and network policy.
4. Confirm filesystem behavior with a temporary write/read and command behavior
   with a harmless runtime/version command.
5. Bind credentials through the selected secret owner and give the workspace
   the least network and filesystem access needed for the job.
6. Define termination, retention, export, and recovery. Terminate or return the
   workspace to provider-supported standby when the task finishes.

## References

- [Recipes](references/recipes.md)
- [Acceptance](references/acceptance.md)

## Output

Return the workspace handle, provider/account, isolation boundary, filesystem
and command result, limits, network and secret policy, lifetime, cost class,
termination behavior, and residual risk.
