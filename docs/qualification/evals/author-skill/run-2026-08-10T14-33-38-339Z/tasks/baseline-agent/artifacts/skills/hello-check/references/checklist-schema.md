# Checklist JSON Schema

A checklist is a single JSON object declaring a list of gates. Validation passes
only when every declared gate has status `pass`.

## Document shape

```json
{
  "name": "release-readiness",
  "gates": [
    {
      "id": "tests-green",
      "description": "CI test suite passes",
      "status": "pass",
      "note": "build 1234"
    },
    {
      "id": "no-critical-bugs",
      "description": "No open critical bugs",
      "status": "pending"
    }
  ]
}
```

## Fields

Top level:

- `name` (optional, string): human-readable checklist name.
- `gates` (required, non-empty array): the declared gates.

Each gate object:

- `id` (required, non-empty string): unique within the checklist.
- `status` (required, string): one of the status vocabulary below.
- `description` (optional, string): what the gate checks.
- `note` (optional, string): evidence or context (build ID, link, reason).

## Status vocabulary

| Status    | Meaning                                   | Satisfies the gate? |
|-----------|-------------------------------------------|---------------------|
| `pass`    | Gate verified as satisfied                | Yes                 |
| `fail`    | Gate verified as not satisfied            | No                  |
| `blocked` | Cannot be completed right now             | No                  |
| `pending` | Not yet done                              | No                  |
| `skipped` | Deliberately not run                      | No                  |

Only `pass` counts. `fail`, `blocked`, `pending`, and `skipped` are all
non-passing verdicts: the checklist does not pass its declared gates.

## Validation rules

1. The file must be valid JSON.
2. The top level must be an object with a non-empty `gates` array.
3. Every gate must be an object with a unique non-empty string `id` and a
   `status` from the vocabulary.
4. Verdict is `PASS` only when every gate status is `pass`.
5. Any structural error or non-passing gate yields `FAIL`.

## Exit codes

| Code | Meaning                    |
|------|----------------------------|
| 0    | PASS: all gates pass       |
| 1    | FAIL: invalid or not passing |
| 2    | Usage error (bad argument or unreadable file) |
