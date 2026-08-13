# CLI and planes

How operators and apps talk to Sylphx Platform.

## Install the operator CLI

Pick one channel and stay on it:

```bash
curl -fsSL https://sylphx.com/install/cli | bash
# or: npm install -g @sylphx/cli
```

Then:

```bash
sylphx --version
sylphx doctor
sylphx login                          # human device flow
# CI / agent:
export SYLPHX_TOKEN=svc_…
export SYLPHX_API_URL=https://api.sylphx.com/v1
sylphx whoami --json
sylphx projects list --json
```

Authoritative command list is `sylphx version-info --json` → `shippedCommands`.
A command exists only when that list (or current `--help`) shows it.

Day-1 loop:

```bash
sylphx context use --org-id org_… --slug my-org
sylphx projects create …              # when the project does not exist
sylphx link --project proj_…          # writes ./.sylphx/project.json
sylphx deploy proj_… --env production
sylphx status proj_…
sylphx logs --project proj_… --tail 100
sylphx wait …
```

`sylphx api METHOD PATH` reaches any Management route. Prefer first-class
commands when they exist.

## Two planes

| Plane | Who | Credential | Client |
| --- | --- | --- | --- |
| Management | human, CI, agent | `sylphx login` or `SYLPHX_TOKEN=svc_…` | CLI, `ManagementClient` |
| Runtime | the running app | `sk_…` / `SYLPHX_SECRET_KEY` | `@sylphx/sdk` `Client`, tenant URL |

Management creates projects, environments, bindings, and deploys. Runtime
performs sign-in, KV, objects, email, and other app effects.

```ts
import { Client, ManagementClient } from '@sylphx/sdk'

const mgmt = ManagementClient.create(process.env.SYLPHX_TOKEN!)
await mgmt.whoami()

const app = Client.create(process.env.SYLPHX_SECRET_KEY!, 'tenant-slug')
await app.kvSet('user:1', { name: 'Ada' }, 60)
```

Discover the current method names from the installed SDK. The shapes above are
the starting pattern.

## Bases

- Management: `https://api.sylphx.com/v1`
- Runtime: `https://<tenant-slug>.api.sylphx.com/v1`

The CLI normalizes a missing `/v1` on the management host.

## Update

Update the same way you installed (`sylphx update`, `npm i -g @sylphx/cli`,
or re-run the install script). Silent auto-update is off.
