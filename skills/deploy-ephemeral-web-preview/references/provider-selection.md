# Provider selection

Select the shortest-lived supported host that can run the candidate faithfully.
Use the provider's current official documentation for authentication, quotas,
retention, regions, content policy, and removal.

| Candidate | Suitable host |
| --- | --- |
| Static files | Existing repository preview service or temporary static hosting |
| Edge worker | Temporary worker environment for the selected edge provider |
| Framework application | The product's existing preview deployment path |
| Stateful or private service | An authorized isolated environment with explicit access and teardown |

Match the host to the existing account and deployment owner when one exists.
Public previews contain public-safe data and secrets stay in the provider's
managed secret interface. Record the expiry or removal command with the URL.
