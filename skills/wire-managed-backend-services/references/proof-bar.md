# Proof bar

| Capability | Minimum behavioral proof |
|---|---|
| Auth | session or token issued for a test user; reuse fails after revoke/sign-out |
| KV | set then get same key; TTL expiry if claimed |
| Storage | upload bytes; download or signed URL returns same digest/size class |
| Email | provider accept (id); do not claim inbox delivery without readback |
| Realtime | publish then subscribe receive on channel |
| Sandbox | exec canary stdout |
| Tasks | job reaches succeeded/failed terminal with callback evidence |
| Flags | evaluate returns expected variant for fixture user |

Health endpoints and empty SDK constructs are **not** proofs.
