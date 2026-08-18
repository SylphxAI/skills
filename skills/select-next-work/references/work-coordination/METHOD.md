# Work Coordination

Labor law is `SylphxAI/owner` `decisions/ADR-012-CONCISE-OWNER.md`.
This method cites that law. It does not invent a second ledger.

Use this depth when labor would wait on CI or the outcome crosses repos.

## Roles

```text
Chairman → Owner → Workers
```

Owner locks contracts, cuts nodes, dispatches, challenges, and keeps
`DASHBOARD.md`. Owner is the outcome owner. Owner does not implement
every repository on a cross-repo outcome.

## Homes

| Fact | Home |
| --- | --- |
| Destination | product `docs/vision.md` |
| Capability DAG | product `docs/prd.md` |
| Current execution nodes | Owner `DASHBOARD.md` |
| Schedule rules | Owner `DAG.md` |

## Contract-first

Lock the shared contract (schema, sole writer, errors, tests, exact
revision). Then one Worker per write-set in parallel. Then integration.

Workers do not coordinate by chat. Still serial: editing the contract
itself, the same write-set, cutover, or a wrong contract.

## Return

Default terminal: implement-to-PR. Then return.
CI, review, merge, deploy, and live are later nodes.

## Dispatch

Run every ready node that does not collide.
A Depends-on edge is a real prerequisite.
A write-set collision is not an edge.
