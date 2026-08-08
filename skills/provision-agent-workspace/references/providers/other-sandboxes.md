# Other sandbox candidates

## E2B and microVM APIs

- **Auth**: API key; free credits sometimes, then paid.
- **Use**: strong isolation for untrusted code execution.
- **Proof**: sandbox create + command + destroy; cost meter noted.
- **Avoid** as default $0 path in skills.

## In-process / WASM (Pyodide, just-bash class)

- **Auth**: none beyond host.
- **Use**: light code eval, teaching demos.
- **Limit**: not general Linux, limited packages, weak isolation vs VM.

## Self-host open sandboxes

- **Auth**: your infra.
- **Cost**: ops, not vendor invoice.
- **Proof**: same canaries + network policy docs.
