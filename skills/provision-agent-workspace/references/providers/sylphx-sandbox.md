# Sylphx Platform Sandbox (BaaS)

## What it is

Maintained **Platform BaaS** primitive: ephemeral **Kata CLH VM** isolation, exec-server inside the VM, optional PVC, warm pool, JWT auth to exec path. Lifecycle via Platform; shell data path is direct to exec-server after create.

## Auth model

- Platform management: `SYLPHX_TOKEN` / management API (`https://api.sylphx.com/v1`).
- Runtime SDK keys for app-plane calls as documented for the tenant.
- **Not** a no-login public free sandbox.

## Free / commercial boundary

- Subject to **org quotas**, plans, and warm-pool capacity (catalog notes per-org active caps and idle reap, e.g. multi-hour max age class—verify current limits).
- Standby/resume may exist as opt-in, not default GA—do not assume free pause forever.
- Functions (V8/OCI paths) are a **different** service with separate GA gaps; do not conflate with Sandbox.

## Contract highlights

- Create → connect with JWT → single active shell model.
- Soft exec timeouts; backgrounding behavior per current docs.
- Network: public egress typically allowed for agent credentials to public APIs; cluster/internal API egress denied by default.
- No Docker-in-Docker expectation.

## Acceptance proof

1. Sandbox create returns id + connection material.
2. Exec canary (`echo` / `uname`) succeeds.
3. Optional: write under `/workspace` or `/data` and re-read per persistence mode.
4. Terminate (or document reap) so quota is not leaked.

## Prefer / avoid

- **Prefer** when you need **strong VM isolation** under Sylphx Platform and already dogfood the platform.
- **Avoid** when no Platform project/token exists and a host shell would do; avoid claiming “free unlimited Kata.”
