# Workspace acceptance

A ready workspace records:

- the provider and native workspace handle;
- the isolation and identity boundary;
- successful filesystem and command canaries required by the task;
- disk, CPU, memory, network, concurrency, and lifetime limits;
- the persistence model and secret interface;
- the final running, suspended, terminated, or provider-managed expiry state.

The workspace is usable when the requested operation succeeds inside the stated
boundary and its resource lifetime is explicit.
