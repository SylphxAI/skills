# Workspace recipes

## Host workspace

Use the agent host's native workspace or sandbox. Confirm the repository path,
write and read one temporary canary inside the workspace, run one harmless
runtime command, and remove the canary.

## Managed isolated workspace

Create the workspace with the provider's native SDK or CLI, scoped identity,
network policy, storage lifetime, and resource limits. Connect through the
returned handle, run one filesystem operation and one harmless command, then
terminate or suspend it through the same interface.

## Lightweight evaluation runtime

Use an in-process or WebAssembly runtime when its language, package, filesystem,
and isolation surface meet the task. Execute one representative operation and
return its structured result.
