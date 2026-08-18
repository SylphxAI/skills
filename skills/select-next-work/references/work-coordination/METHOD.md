# Work Coordination

Portable claim and wait rules. Open when a worker would sit on CI
or when one outcome crosses repositories.

This is not a company operating system and not a scheduler.

## Authority

Use the current repository's live authority: its tracker, PR queue,
docs, and runtime. Do not invent a second ledger.

If this checkout **is** the Sylphx Owner notebook, stop and use that
repo's `.agents/skills/run-owner-tick` instead of this file.

## Contract-first

When two repositories must implement the same interface, lock the
shared contract (schema, sole writer, errors, tests, exact revision)
before parallel work. One worker per write-set. Integration is later.

Workers do not coordinate by chat. Still serial: editing the contract
itself, the same write-set, cutover, or a wrong contract.

## Return

Default terminal: implement-to-PR, then return.
CI, review, merge, deploy, and live are later events.

## Dispatch

Run ready work that does not collide and that fits real capacity.
A dependency is a real prerequisite. A write-set collision is not
a dependency edge.
