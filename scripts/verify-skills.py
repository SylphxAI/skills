#!/usr/bin/env python3
"""Deterministic verification suite for the SylphxAI/skills repository."""

import glob
import json
import os
import re
import sys
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fail(msg: str, errors: list[str]) -> None:
    errors.append(msg)


def slugify_heading(title: str) -> str:
    s = title.strip().lower()
    s = re.sub(r"[`*_~]", "", s)
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s]+", "-", s)
    return s


def headings_for_file(path: str) -> set[str]:
    slugs = set()
    with open(path) as f:
        for line in f:
            m = re.match(r"^#{1,6}\s+(.+)$", line.strip())
            if m:
                slugs.add(slugify_heading(m.group(1)))
    return slugs


def verify_manifests(errors: list[str]) -> None:
    manifests = [
        ".claude-plugin/marketplace.json",
        ".claude-plugin/plugin.json",
        ".codex-plugin/plugin.json",
    ]
    for rel in manifests:
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p):
            fail(f"Missing manifest: {rel}", errors)
            continue
        try:
            with open(p) as f:
                data = json.load(f)
        except Exception as e:
            fail(f"Invalid JSON in {rel}: {e}", errors)
            continue
        if "skills" in data:
            skills_rel = data["skills"]
            resolved = os.path.normpath(os.path.join(ROOT, skills_rel))
            if not os.path.isdir(resolved):
                fail(f"{rel} skills path does not exist: {skills_rel}", errors)


def verify_skills_frontmatter(errors: list[str]) -> set[str]:
    skill_files = sorted(glob.glob(os.path.join(ROOT, "skills", "*", "SKILL.md")))
    if len(skill_files) != 10:
        fail(f"Expected 10 skills, found {len(skill_files)}", errors)

    for p in skill_files:
        rel = os.path.relpath(p, ROOT)
        dir_name = os.path.basename(os.path.dirname(p))
        with open(p) as f:
            text = f.read()
        lines = text.splitlines()
        if len(lines) > 500:
            fail(f"{rel}: {len(lines)} lines exceeds 500-line limit", errors)
        if not text.startswith("---\n"):
            fail(f"{rel}: missing opening YAML frontmatter delimiter", errors)
            continue
        parts = text.split("---", 2)
        if len(parts) < 3:
            fail(f"{rel}: missing closing YAML frontmatter delimiter", errors)
            continue

        try:
            fm = yaml.safe_load(parts[1])
        except Exception as e:
            fail(f"{rel}: yaml.safe_load failed: {e}", errors)
            continue

        if not isinstance(fm, dict):
            fail(f"{rel}: frontmatter is not a YAML mapping", errors)
            continue

        name = str(fm.get("name", ""))
        desc = str(fm.get("description", ""))
        if name != dir_name:
            fail(f"{rel}: frontmatter name {name!r} != directory {dir_name!r}", errors)
        if not re.fullmatch(r"[a-z0-9-]{1,64}", name):
            fail(f"{rel}: invalid skill name {name!r}", errors)
        if not desc or len(desc) > 1024:
            fail(f"{rel}: invalid description length ({len(desc)})", errors)
        if "<" in desc or ">" in desc:
            fail(f"{rel}: XML angle brackets found in description", errors)
        if "Use when" not in desc:
            fail(f"{rel}: description missing 'Use when' trigger clause", errors)

    return set(skill_files)


def verify_links_and_references(errors: list[str]) -> None:
    md_files = sorted(glob.glob(os.path.join(ROOT, "**", "*.md"), recursive=True))
    link_re = re.compile(r"(?<!`)\[([^\]]+)\]\(([^)]+)\)(?!`)")
    referenced_files = set()
    heading_cache: dict[str, set[str]] = {}

    for p in md_files:
        rel = os.path.relpath(p, ROOT)
        with open(p) as f:
            text = f.read()
        for m in link_re.finditer(text):
            label, target = m.group(1), m.group(2)
            if target.startswith(("http://", "https://", "mailto:")):
                continue
            if target == "[a-z0-9-]{0,38}[a-z0-9]":
                continue
            path_part, sep, frag = target.partition("#")
            if path_part:
                resolved = os.path.normpath(os.path.join(os.path.dirname(p), path_part))
            else:
                resolved = p
            if not os.path.exists(resolved):
                fail(f"{rel}: broken link [{label}]({target})", errors)
                continue
            referenced_files.add(resolved)
            if frag:
                if resolved not in heading_cache:
                    heading_cache[resolved] = headings_for_file(resolved)
                if frag not in heading_cache[resolved]:
                    fail(f"{rel}: missing anchor #{frag} in {os.path.relpath(resolved, ROOT)}", errors)

    ref_files = sorted(glob.glob(os.path.join(ROOT, "skills", "*", "references", "*.md")))
    for rf in ref_files:
        if rf not in referenced_files:
            fail(f"Orphan reference file not linked anywhere: {os.path.relpath(rf, ROOT)}", errors)


def verify_no_private_leaks(errors: list[str]) -> None:
    md_files = sorted(glob.glob(os.path.join(ROOT, "skills", "**", "*.md"), recursive=True))
    forbidden = re.compile(
        r"(use-the-room|\bKyle\b|\bSylphx\b|\bCubeage\b|\bSpiron\b|\bTachyn\b|\bEpiow\b|\bCalmora\b|\bKeep H\b|\bBig2\b|\bMahjong\b|\bHexa\b|\bBGCA\b|pg-shared-core|SylphxAI/|Ozyrix|OpenClaw|Hetzner|p:\d+|g\d{4}|owner,\s*2026|mark\.sylphx\.com|api\.sylphx\.com|1Password|keelengine\.dev|ADR-862|ADR-01M|owner-pool|scripts/absence-check|118979196997|oaep_kwp_round_trip|14868|ai_model_pricing|desk_ro)",
        re.I,
    )
    for p in md_files:
        rel = os.path.relpath(p, ROOT)
        with open(p) as f:
            for idx, line in enumerate(f, 1):
                if forbidden.search(line):
                    fail(f"{rel}:{idx}: internal/private reference found: {line.strip()}", errors)


def main() -> int:
    errors: list[str] = []
    verify_manifests(errors)
    verify_skills_frontmatter(errors)
    verify_links_and_references(errors)
    verify_no_private_leaks(errors)

    if errors:
        print(f"FAILED with {len(errors)} error(s):", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    skill_count = len(glob.glob(os.path.join(ROOT, "skills", "*", "SKILL.md")))
    ref_count = len(glob.glob(os.path.join(ROOT, "skills", "*", "references", "*.md")))
    print(f"PASS: {skill_count} skills (PyYAML verified), {ref_count} reference files, 3 plugin manifests, 0 broken links/anchors, 0 private leaks.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
