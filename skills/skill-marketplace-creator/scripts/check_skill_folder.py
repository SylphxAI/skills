#!/usr/bin/env python3
"""Tiny standalone checker for one skill folder."""
from __future__ import annotations

import re
import sys
from pathlib import Path

NAME_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,63}$")


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        raise ValueError("missing YAML frontmatter")
    end = text.find("\n---", 4)
    if end == -1:
        raise ValueError("unterminated YAML frontmatter")
    data: dict[str, str] = {}
    for line in text[4:end].splitlines():
        if not line.strip():
            continue
        key, sep, value = line.partition(":")
        if not sep:
            raise ValueError(f"invalid frontmatter line: {line!r}")
        data[key.strip()] = value.strip().strip('"')
    return data


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: check_skill_folder.py <skill-folder>", file=sys.stderr)
        return 2
    folder = Path(sys.argv[1])
    skill = folder / "SKILL.md"
    if not skill.exists():
        print("missing SKILL.md", file=sys.stderr)
        return 1
    data = parse_frontmatter(skill.read_text())
    name = data.get("name", "")
    description = data.get("description", "")
    errors = []
    if not NAME_RE.match(name):
        errors.append("invalid name")
    if folder.name != name:
        errors.append(f"folder name {folder.name!r} does not match skill name {name!r}")
    if not description or len(description) > 1024:
        errors.append("description must be non-empty and <=1024 chars")
    if "TODO" in skill.read_text():
        errors.append("SKILL.md still contains TODO")
    for error in errors:
        print(error, file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
