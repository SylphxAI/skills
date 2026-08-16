# Provider selection

Use the current official provider terms to match the artifact's sensitivity,
size, content type, audience, retention, and removal needs.

| Artifact | Sharing path |
| --- | --- |
| Repository build output | Existing CI or release artifact service |
| Private team material | Approved object storage with authenticated or signed access |
| Public-safe temporary file | Short-lived public file host with stated retention |
| Small text diagnostic | Existing issue, paste, or support surface with suitable visibility |

Prefer an already authorized product or repository service. A public host is an
explicit public disclosure boundary. Return the provider, expiry, and removal
path together with the URL.
