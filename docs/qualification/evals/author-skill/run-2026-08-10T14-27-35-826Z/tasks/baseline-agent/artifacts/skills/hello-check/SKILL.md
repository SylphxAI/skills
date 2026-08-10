---
name: hello-check
description: Validate that a checklist JSON file passes its declared gates. Use when asked to verify a checklist JSON file, run or enforce its gates, report per-gate pass/fail results, or gate task completion on a checklist file. Triggers on checklist JSON files that declare their own gates.
---

# Hello Check

## Overview

hello-check validates a checklist JSON file against the gates it declares. It parses the
file, evaluates every gate, and reports each as PASS or FAIL. A non-zero exit code means the
checklist does not clear its own gates, so it is safe to run inside CI or a completion step.

## Checklist format

The file is a JSON object with a top-level `gates` array. Each gate has an `id`
(required), an optional `description`, and a `check` object:

```json
{
  "name": "release readiness",
  "version": "1.2.3",
  "gates": [
    {
      "id": "version-value",
      "description": "version matches the release candidate",
      "check": {"type": "equals", "path": "version", "value": "1.2.3"}
    }
  ]
}
```

`path` is dotted-path navigation into the checklist data: `meta.owner` reads a nested key,
`items.0.name` reads an array index. An empty or omitted `path` refers to the root value.
See `examples/checklist.json` for a complete template.

### Gate types

| type        | passes when                                                        |
|-------------|--------------------------------------------------------------------|
| `exists`    | the path resolves (key present / index in range)                    |
| `equals`    | the resolved value equals `check.value` (any JSON value, strict)    |
| `truthy`    | the resolved value is truthy (non-empty, non-zero, not false/null)  |
| `non-empty` | the resolved value is not null and not an empty string/list/object  |

## Workflow

1. Locate the checklist JSON file. If none is given, look for a file named
   `checklist.json` or ask the user for the path.
2. Run the validator:

   ```bash
   python3 scripts/check_checklist.py path/to/checklist.json
   ```

3. Interpret the result:
   - Exit `0` + `RESULT: PASS` — every declared gate passed.
   - Exit `1` + `RESULT: FAIL` — at least one gate failed; report the FAIL lines.
   - Exit `2` — the file is unusable (missing, invalid JSON, malformed checklist,
     unknown gate type); report the error and fix the file, do not declare a verdict.
4. For machine-readable output, add `--json`; the report includes `ok`, counts, and a
   per-gate `passed`/`detail` list.

## Rules

- Do not invent gates: only the gates declared in the file are evaluated.
- Do not report a checklist as passing if the script exits non-zero, or if the script
  could not run at all (exit 2).
- Report per-gate failures by id with the detail message, not just a summary.
