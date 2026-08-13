# CLI and planes

## Install

```bash
curl -fsSL https://sylphx.com/install/cli | bash
# or: npm install -g @sylphx/cli
sylphx doctor
sylphx login
# CI: export SYLPHX_TOKEN=svc_… and SYLPHX_API_URL=https://api.sylphx.com/v1
sylphx whoami --json
```

Authoritative verbs: `sylphx version-info --json` → `shippedCommands`.

## Planes

| Plane | Who | Credential | Client |
| --- | --- | --- | --- |
| Management | human, CI, agent | login or `svc_…` | `sylphx`, `ManagementClient` |
| Runtime | the running app | `sk_…` | `@sylphx/sdk` `Client` |

Management creates projects and deploys. Runtime does sign-in, KV, email.

```ts
import { Client, ManagementClient } from '@sylphx/sdk'
const mgmt = ManagementClient.create(process.env.SYLPHX_TOKEN!)
const app = Client.create(process.env.SYLPHX_SECRET_KEY!, 'tenant-slug')
```

Discover current method names from the installed SDK.
