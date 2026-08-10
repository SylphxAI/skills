#!/usr/bin/env python3
"""Validate that a checklist JSON file passes its declared gates.

Exit codes:
  0  PASS - every declared gate has status "pass"
  1  FAIL - invalid JSON, schema violation, or any gate not passing
  2  usage error
"""
import argparse
import json
import sys

KNOWN_STATUSES = {"pass", "fail", "blocked", "pending", "skipped"}


def validate(data, errors):
    if not isinstance(data, dict):
        errors.append("top level must be a JSON object")
        return
    if "name" in data and not isinstance(data["name"], str):
        errors.append('"name" must be a string')
    gates = data.get("gates")
    if not isinstance(gates, list):
        errors.append('"gates" must be an array of gate objects')
        return
    if not gates:
        errors.append('"gates" must not be empty')
        return
    seen = set()
    for i, gate in enumerate(gates):
        where = f"gates[{i}]"
        if not isinstance(gate, dict):
            errors.append(f"{where} must be an object")
            continue
        gid = gate.get("id")
        if not isinstance(gid, str) or not gid.strip():
            errors.append(f'{where} requires a non-empty string "id"')
        elif gid in seen:
            errors.append(f'{where} duplicate gate id "{gid}"')
        else:
            seen.add(gid)
        if "description" in gate and not isinstance(gate["description"], str):
            errors.append(f'{where} "description" must be a string')
        status = gate.get("status")
        if not isinstance(status, str) or status not in KNOWN_STATUSES:
            errors.append(
                f'{where} "status" must be one of {sorted(KNOWN_STATUSES)}, got {status!r}'
            )


def main(argv):
    parser = argparse.ArgumentParser(
        description="Validate that a checklist JSON file passes its declared gates."
    )
    parser.add_argument("checklist", help="Path to the checklist JSON file")
    parser.add_argument("--quiet", action="store_true", help="Only print the verdict line")
    args = parser.parse_args(argv)

    try:
        with open(args.checklist, "r", encoding="utf-8") as fh:
            data = json.load(fh)
    except OSError as exc:
        print(f"FAIL: cannot read {args.checklist}: {exc}", file=sys.stderr)
        return 2
    except json.JSONDecodeError as exc:
        print(f"FAIL: invalid JSON in {args.checklist}: {exc}", file=sys.stderr)
        return 1

    errors = []
    validate(data, errors)
    gates = data.get("gates") if isinstance(data, dict) and isinstance(data.get("gates"), list) else []

    if errors:
        if not args.quiet:
            for err in errors:
                print(f"ERROR: {err}")
        print(f"FAIL: {args.checklist}: {len(errors)} structural error(s); see checklist schema")
        return 1

    failing = [g for g in gates if g.get("status") != "pass"]
    if failing:
        if not args.quiet:
            for g in failing:
                print(f'FAIL: gate "{g.get("id")}" status={g.get("status")}')
        print(f"FAIL: {args.checklist}: {len(failing)} of {len(gates)} gates not passing")
        return 1

    if not args.quiet:
        print(f'PASS: {len(gates)}/{len(gates)} gates passing')
    print(f"PASS: {args.checklist}: all declared gates pass")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
