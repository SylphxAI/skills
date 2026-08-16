# Provider selection

Choose the workspace from the trust boundary and runtime needs, using current
official provider documentation for limits, pricing, persistence, and network
policy.

| Need | Workspace shape |
| --- | --- |
| Trusted repository work inside an existing agent host | Host-provided sandbox or shell |
| Untrusted code execution | Managed microVM or container sandbox with a narrow network policy |
| Lightweight language evaluation | In-process or WebAssembly runtime |
| Durable build cache or artifacts | Managed workspace with explicit storage lifetime |
| Multi-tenant product execution | Product-owned isolated runtime with tenant-scoped identity |

Select the smallest environment that provides the required isolation, operating
system surface, persistence, network access, and termination semantics. Verify
workspace creation, one filesystem operation, one command, and teardown through
the provider's native interface.
