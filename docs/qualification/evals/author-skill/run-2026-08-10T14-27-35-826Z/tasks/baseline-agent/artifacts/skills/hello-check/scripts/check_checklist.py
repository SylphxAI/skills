#!/usr/bin/env python3
"""Validate a checklist JSON file against the gates it declares.

Exit codes:
  0 - all gates passed
  1 - one or more gates failed
  2 - the checklist file is unusable (missing, invalid JSON, malformed)
"""

import argparse
import json
import sys
from pathlib import Path

GATE_TYPES = ("exists", "equals", "truthy", "non-empty")


def resolve_path(data, path):
    """Resolve a dotted path (e.g. 'meta.version', 'items.0.name') within data.

    Returns (value, found). An empty path resolves to the root value.
    """
    if not path:
        return data, True
    current = data
    for part in path.split("."):
        if isinstance(current, dict) and part in current:
            current = current[part]
        elif isinstance(current, list) and part.isdigit() and int(part) < len(current):
            current = current[int(part)]
        else:
            return None, False
    return current, True


def evaluate_gate(gate, data):
    check = gate["check"]
    kind = check["type"]
    path = check.get("path", "")
    value, found = resolve_path(data, path)

    if kind == "exists":
        return found, f"path '{path}' found" if found else f"path '{path}' not found"

    if not found:
        return False, f"path '{path}' not found"

    if kind == "equals":
        expected = check.get("value")
        ok = value == expected
        detail = (
            f"path '{path}' == {expected!r}"
            if ok
            else f"path '{path}' == {value!r}, expected {expected!r}"
        )
        return ok, detail

    if kind == "truthy":
        ok = bool(value)
        detail = (
            f"path '{path}' is truthy"
            if ok
            else f"path '{path}' is falsy ({value!r})"
        )
        return ok, detail

    if kind == "non-empty":
        empty = value is None or (
            isinstance(value, (str, list, dict)) and len(value) == 0
        )
        ok = not empty
        detail = (
            f"path '{path}' is non-empty"
            if ok
            else f"path '{path}' is empty ({value!r})"
        )
        return ok, detail

    raise ValueError(f"unknown check type {kind!r}")


def load_checklist(path):
    """Return (data, gates) or raise ValueError with a structural problem."""
    raw = Path(path).read_text(encoding="utf-8")
    data = json.loads(raw)
    if not isinstance(data, dict):
        raise ValueError("checklist root must be a JSON object")
    gates = data.get("gates")
    if not isinstance(gates, list) or not gates:
        raise ValueError("checklist must declare a non-empty 'gates' array")
    for i, gate in enumerate(gates):
        if not isinstance(gate, dict):
            raise ValueError(f"gates[{i}] must be an object")
        if not isinstance(gate.get("id"), str) or not gate["id"]:
            raise ValueError(f"gates[{i}] must have a non-empty string 'id'")
        check = gate.get("check")
        if not isinstance(check, dict):
            raise ValueError(f"gate '{gate['id']}' must have a 'check' object")
        if check.get("type") not in GATE_TYPES:
            raise ValueError(
                f"gate '{gate['id']}' has unknown check type "
                f"{check.get('type')!r} (expected one of {', '.join(GATE_TYPES)})"
            )
    return data, gates


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Validate a checklist JSON file against its declared gates."
    )
    parser.add_argument("checklist", type=Path, help="path to the checklist JSON file")
    parser.add_argument(
        "--json",
        action="store_true",
        help="emit a machine-readable JSON report instead of plain text",
    )
    args = parser.parse_args(argv)

    try:
        data, gates = load_checklist(args.checklist)
    except FileNotFoundError:
        print(f"ERROR: checklist file not found: {args.checklist}", file=sys.stderr)
        return 2
    except json.JSONDecodeError as exc:
        print(f"ERROR: invalid JSON in {args.checklist}: {exc}", file=sys.stderr)
        return 2
    except ValueError as exc:
        print(f"ERROR: malformed checklist {args.checklist}: {exc}", file=sys.stderr)
        return 2

    results = []
    for gate in gates:
        passed, detail = evaluate_gate(gate, data)
        results.append(
            {
                "id": gate["id"],
                "description": gate.get("description", ""),
                "passed": passed,
                "detail": detail,
            }
        )

    passed_count = sum(1 for r in results if r["passed"])
    total = len(results)
    ok = passed_count == total

    if args.json:
        print(
            json.dumps(
                {
                    "checklist": str(args.checklist),
                    "ok": ok,
                    "passed": passed_count,
                    "failed": total - passed_count,
                    "gates": results,
                },
                indent=2,
            )
        )
    else:
        for r in results:
            status = "PASS" if r["passed"] else "FAIL"
            label = r["id"] + (f" ({r['description']})" if r["description"] else "")
            print(f"{status}  {label}: {r['detail']}")
        print(f"\nGates: {passed_count}/{total} passed")
        print("RESULT: PASS" if ok else "RESULT: FAIL")

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
