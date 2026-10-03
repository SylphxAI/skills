#!/usr/bin/env python3
"""Fail when skills/ changed but the Codex plugin version did not increase.

Codex caches installs by the version in .codex-plugin/plugin.json, so a skills
change without a bump never reaches Codex users.

Usage: check_codex_version_bump.py <base-sha> [head-ref]
The base is the PR base sha, or the merge-queue base sha (merge_group.base_sha).
"""
import json
import subprocess
import sys

MANIFEST = ".codex-plugin/plugin.json"


def git(*args):
    return subprocess.run(["git", *args], check=True, capture_output=True, text=True).stdout


def version_at(ref):
    return json.loads(git("show", f"{ref}:{MANIFEST}"))["version"]


def parse(v):
    return tuple(int(p) for p in v.split("."))


def main():
    base = sys.argv[1]
    head = sys.argv[2] if len(sys.argv) > 2 else "HEAD"
    changed = [f for f in git("diff", "--name-only", base, head).splitlines() if f.startswith("skills/")]
    if not changed:
        print("codex version gate: no skills/ change, nothing to bump")
        return 0
    old, new = version_at(base), version_at(head)
    if parse(new) > parse(old):
        print(f"codex version gate: ok ({old} -> {new}, {len(changed)} skills/ file(s) changed)")
        return 0
    print(f"codex version gate: skills/ changed ({len(changed)} file(s)) but {MANIFEST} is still {new} (base {old})")
    print("FIX: bump the patch version in .codex-plugin/plugin.json and package.json (change a skill, bump the patch version)")
    return 1


if __name__ == "__main__":
    sys.exit(main())
