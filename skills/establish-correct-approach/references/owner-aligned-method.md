# Owner-aligned method selection

Use these signals to select the current supported path.

| Signal | Preferred path | Selection test |
| --- | --- | --- |
| Owner | The layer that owns the invariant | The owner can state and enforce the postcondition |
| Contract | The current public CLI, SDK, schema, or specification | The exact current interface supports the operation |
| Truth | One writer and one durable source | Reads and writes converge on the same authority |
| Cause | Repair on the layer that produces the behavior | The changed postcondition exercises the owning cause |
| Fit | First-principles fit to this product and contract | The method satisfies this system's actual constraints |
| Existing structure | Preserve or replace it according to current consumers | Every consumer has one supported destination |

When the required delivery window calls for an interim method, choose a
supported, reversible path with a named owner, expiry, replacement condition,
and removal action. The current consumer and recovery path determine whether it
is a valid product method.

The owner-aligned method is usually the path with the fewest concepts and the
clearest postcondition.
