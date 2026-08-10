# Bug Report Guide — This Repository

## 1. Purpose and audience

- Purpose: `execute` — produce a bug report that a maintainer or agent can act on without asking follow-up questions.
- Audience: `both` — human maintainers and AI agents that triage, deduplicate, assign, or search reports.
- Constraints: low token cost, machine-parseable output, factual accuracy over prose quality.

The rule: **one report, one contract**. The JSON object in Section 4 is the
source of truth. Markdown is only the human view of the same fields.

## 2. How to report (human path)

1. Reproduce the bug once. If you cannot reproduce it, say so in `steps_to_reproduce` instead of inventing steps.
2. Capture evidence first: log excerpt, error text, screenshot, or minimal repro script.
3. Fill the template below field by field. One idea per line.
4. Attach the evidence you captured. Do not paste long logs into prose.
5. Submit. Do not edit the JSON after submission; open a new report for changes.

## 3. Language and format rules

- Write in **English**. Technical terms stay in English inside any language.
- Use headings, lists, and code blocks. No paragraph walls.
- Short active sentences. One meaning per term.
- Thinking stays free-form. Only the final report is structured.

## 4. Output contract (agent path)

Agents must emit a JSON object that validates against this schema. Free-form
prose is not accepted for machine consumption.

### JSON Schema (Draft 2020-12)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://this-repo/schemas/bug-report.schema.json",
  "title": "BugReport",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schema_version",
    "title",
    "severity",
    "component",
    "environment",
    "steps_to_reproduce",
    "expected_behavior",
    "actual_behavior"
  ],
  "properties": {
    "schema_version": { "const": "1.0" },
    "title": {
      "type": "string",
      "minLength": 10,
      "maxLength": 120
    },
    "severity": {
      "enum": ["critical", "high", "medium", "low"]
    },
    "component": {
      "type": "string",
      "description": "Repository path or subsystem the bug is in."
    },
    "environment": {
      "type": "object",
      "required": ["os", "runtime", "revision"],
      "properties": {
        "os": { "type": "string" },
        "runtime": { "type": "string" },
        "revision": {
          "type": "string",
          "description": "Git revision or package version observed. Use 'unknown' only if truly unknown."
        }
      }
    },
    "steps_to_reproduce": {
      "type": "array",
      "minItems": 1,
      "items": { "type": "string" }
    },
    "expected_behavior": { "type": "string" },
    "actual_behavior": { "type": "string" },
    "evidence": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["kind", "ref"],
        "properties": {
          "kind": { "enum": ["log", "screenshot", "trace", "repro", "video"] },
          "ref": { "type": "string" }
        }
      }
    },
    "impact": { "type": "string" },
    "workaround": { "type": "string" }
  }
}
```

### Worked example

```json
{
  "schema_version": "1.0",
  "title": "Webhook delivery retries twice on 503 responses",
  "severity": "high",
  "component": "internal/webhook/dispatcher",
  "environment": {
    "os": "linux-amd64",
    "runtime": "node 22.12.0",
    "revision": "7f3a91c"
  },
  "steps_to_reproduce": [
    "Start the dispatcher with WEBHOOK_RETRIES=3.",
    "Point the target at a stub that returns 503.",
    "Send one webhook event.",
    "Count requests received by the stub."
  ],
  "expected_behavior": "The stub receives exactly 3 requests (1 attempt + 2 retries).",
  "actual_behavior": "The stub receives 6 requests: each retry fires twice.",
  "evidence": [
    { "kind": "log", "ref": "dispatcher.log:1042-1056" },
    { "kind": "repro", "ref": "repro/webhook-503.test.ts" }
  ],
  "impact": "Duplicate deliveries to downstream systems.",
  "workaround": "Set WEBHOOK_RETRIES=1."
}
```

### Validation

Validate before submitting:

```bash
ajv validate -s bug-report.schema.json -d your-report.json
```

Failures to fix first: missing required field, wrong `severity` value, empty
`steps_to_reproduce`, `environment.revision` left blank.

## 5. Verification gate (mandatory when the model family changes)

Run this gate before committing this guide's language or format choices after
any model family or tokenizer switch.

```text
benchmark = 5 tasks x {zh, en} x {prose, structured}
gate: new choice accuracy >= old choice accuracy
      AND new choice tokens <= old choice tokens
```

Record in this section:

| Field | Value |
| --- | --- |
| Date | YYYY-MM-DD |
| Model id | e.g. provider/model:version |
| Tokenizer version | e.g. tiktoken 0.9.0 |
| Ratio `r = N_zh / N_en` | number |
| Result | pass / fail |

### Contract conformance gate

Additionally, re-verify the boundary contract after any model family change:

1. Generate 5 bug reports from 5 fixed bug scenarios using the new model.
2. Validate all 5 against the schema in Section 4.
3. Require: 5/5 valid, all required fields present, all enum values respected.
4. Record date, model id, tokenizer version, and pass/fail in the table above.

## 6. Definition of done

- Purpose and audience are stated. — Section 1.
- Structure is headings, lists, and code. — Sections 2-5.
- The machine contract is schema/JSON, not prose. — Section 4.
- Gate result is recorded whenever the model family changed. — Section 5.

