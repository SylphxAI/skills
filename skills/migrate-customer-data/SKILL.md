---
name: migrate-customer-data
description: "Migrate customer data so meaning, ownership, access, and history survive. Use when acceptance is preserved semantics, not row-count equality. Do not use for the authority switch of a live writer."
---

# Migrate Customer Data

Row-count equality is weak proof. Meaning, access, and history have to survive. A migrated row the owner can no longer find, export, or delete is a failed migration.

Open [migration contract and mapping](references/migration-contract-and-mapping.md) and [rehearsal and cutover](references/rehearsal-cutover-and-acceptance.md) when the mapping or rehearsal needs depth.

Use `execute-hard-cutover` for the live writer switch.
