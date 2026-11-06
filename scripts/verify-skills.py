#!/usr/bin/env python3
"""Deterministic verification suite for the SylphxAI/skills repository."""

import glob
import json
import os
import re
import sys
import subprocess
from pathlib import Path

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


class UniqueKeyLoader(yaml.SafeLoader):
    """Do not silently accept a second description or name."""


def unique_mapping(loader, node):
    result = {}
    for key_node, value_node in node.value:
        key = loader.construct_object(key_node)
        if not isinstance(key, str) or key in result:
            raise ValueError(f"invalid or duplicate YAML key: {key!r}")
        result[key] = loader.construct_object(value_node)
    return result


UniqueKeyLoader.add_constructor(
    yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, unique_mapping)

# Local authoring convention: positive task moments first, then exclusions or
# neighbouring routes. This checks text contracts, not a model's interpretation.
BOUNDARY = re.compile(
    r"\b(?:Do NOT use when|Use (?!when\b|ONLY when\b|the\b|this\b)[a-z][a-z0-9-]*\b)")


def verify_skills_frontmatter(errors: list[str], root=ROOT) -> dict[str, str]:
    skill_files = sorted(Path(root).glob("skills/*/SKILL.md"))
    if not skill_files:
        fail("No skills found", errors)
    descriptions = {}
    names = {p.parent.name for p in skill_files}
    for p in skill_files:
        rel = p.relative_to(root)
        text = p.read_text(encoding="utf-8")
        if len(text.splitlines()) >= 500:
            fail(f"{rel}: SKILL.md must stay under 500 lines; move detail to references", errors)
        match = re.match(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)", text, re.S)
        if not match:
            fail(f"{rel}: missing standalone YAML frontmatter delimiters", errors)
            continue
        try:
            fm = yaml.load(match.group(1), Loader=UniqueKeyLoader)
        except (yaml.YAMLError, ValueError, TypeError) as e:
            fail(f"{rel}: invalid YAML frontmatter: {e}", errors)
            continue
        if not isinstance(fm, dict):
            fail(f"{rel}: frontmatter is not a YAML mapping", errors)
            continue
        name, desc = fm.get("name"), fm.get("description")
        if name != p.parent.name:
            fail(f"{rel}: frontmatter name {name!r} != directory {p.parent.name!r}", errors)
        if (not isinstance(name, str) or len(name) > 64
                or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name)):
            fail(f"{rel}: invalid skill name {name!r}", errors)
        if not isinstance(desc, str) or not 1 <= len(desc.strip()) <= 1024 or len(desc) > 1024:
            fail(f"{rel}: description must be a nonempty string of at most 1024 characters", errors)
            continue
        descriptions[p.parent.name] = desc
        if not re.match(r"Use (?:ONLY )?when\b", desc):
            fail(f"{rel}: description must start with a 'Use when' task moment", errors)
        if not BOUNDARY.search(desc):
            fail(f"{rel}: missing explicit negative boundary or neighbouring skill route", errors)
        for route in re.findall(r"\b[Uu]se ([a-z][a-z0-9-]+) (?:for|to|when)\b", desc):
            if route not in names or route == p.parent.name:
                fail(f"{rel}: invalid neighbouring skill route {route!r}", errors)
        if not text[match.end():].strip():
            fail(f"{rel}: missing Markdown instructions after frontmatter", errors)
    return descriptions


def unique_json_mapping(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate JSON key: {key!r}")
        result[key] = value
    return result


def verify_trigger_cases(descriptions: dict[str, str], errors: list[str], root=ROOT) -> tuple[int, int]:
    paths = {p.parent.name: p for p in sorted(
        (Path(root) / "skills").glob("*/trigger-cases.json"))}
    for name in sorted(descriptions.keys() - paths.keys()):
        fail(f"{name}: missing trigger cases", errors)
    for name in sorted(paths.keys() - descriptions.keys()):
        fail(f"{name}: trigger cases have no valid skill description", errors)
    counts = {"positive": 0, "negative": 0}
    for name, path in paths.items():
        if name not in descriptions:
            continue
        try:
            cases = json.loads(path.read_text(encoding="utf-8"),
                               object_pairs_hook=unique_json_mapping)
        except (OSError, ValueError) as e:
            fail(f"{name}: cannot read trigger cases: {e}", errors)
            continue
        if (not isinstance(cases, dict) or set(cases) != {"version", *counts}
                or type(cases.get("version")) is not int or cases["version"] != 1):
            fail(f"{name}: trigger cases require version 1 and positive and negative lists", errors)
            continue
        desc = descriptions[name]
        boundary = BOUNDARY.search(desc)
        positive_text = desc[:boundary.start()] if boundary else desc
        negative_text = desc[boundary.start():] if boundary else ""
        prompts = set()
        for polarity in counts:
            rows = cases[polarity]
            if not isinstance(rows, list) or len(rows) < 3:
                fail(f"{name}: require at least 3 {polarity} trigger cases", errors)
                continue
            for index, case in enumerate(rows, 1):
                label = f"{name} {polarity}[{index}]"
                fields = {"prompt", "clause"} | ({"route_to"} if polarity == "negative" else set())
                if not isinstance(case, dict) or set(case) != fields:
                    fail(f"{label}: expected fields {sorted(fields)}", errors)
                    continue
                prompt, clause = case["prompt"], case["clause"]
                if not isinstance(prompt, str) or not prompt.strip():
                    fail(f"{label}: prompt must be a nonempty string", errors)
                    continue
                normalized = " ".join(prompt.casefold().split())
                if normalized in prompts:
                    fail(f"{label}: duplicate or conflicting prompt", errors)
                prompts.add(normalized)
                region = positive_text if polarity == "positive" else negative_text
                if not isinstance(clause, str) or not clause.strip() or clause not in region:
                    fail(f"{label}: clause must quote the description's {polarity} region", errors)
                    continue
                if polarity == "negative":
                    route = case["route_to"]
                    if route is None:
                        if not re.search(r"\b(?:no|not)\b|direct single-agent work", clause, re.I):
                            fail(f"{label}: null route requires an explicit no-skill/direct-work boundary", errors)
                    elif (not isinstance(route, str) or route not in descriptions or route == name
                          or not re.search(rf"(?<![\w-]){re.escape(route)}(?![\w-])", clause)):
                        fail(f"{label}: route_to must name a different existing skill in the quoted boundary", errors)
                counts[polarity] += 1
    return counts["positive"], counts["negative"]


def verify_links_and_references(errors: list[str], root=ROOT) -> None:
    md_files = sorted(glob.glob(os.path.join(root, "**", "*.md"), recursive=True))
    link_re = re.compile(r"(?<!`)\[([^\]]+)\]\(([^)]+)\)(?!`)")
    referenced_files = set()
    links_by_source = {}
    heading_cache: dict[str, set[str]] = {}

    for p in md_files:
        rel = os.path.relpath(p, root)
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
            links_by_source.setdefault(p, set()).add(resolved)
            if frag:
                if resolved not in heading_cache:
                    heading_cache[resolved] = headings_for_file(resolved)
                if frag not in heading_cache[resolved]:
                    fail(f"{rel}: missing anchor #{frag} in {os.path.relpath(resolved, root)}", errors)

    ref_files = sorted(glob.glob(os.path.join(root, "skills", "*", "references", "*.md")))
    for rf in ref_files:
        if rf not in referenced_files:
            fail(f"Orphan reference file not linked anywhere: {os.path.relpath(rf, root)}", errors)

    for rf in ref_files:
        entry = os.path.join(os.path.dirname(os.path.dirname(rf)), "SKILL.md")
        if rf not in links_by_source.get(entry, set()):
            fail(f"Reference not linked from its own SKILL.md: {os.path.relpath(rf, root)}", errors)


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


def verify_no_episodic_identifiers(errors: list[str], root=ROOT) -> None:
    """Reject known incident identities in skill text, including examples."""
    forbidden = re.compile(
        r"小亨|人愛|子璐|(?<![A-Za-z0-9_])"
        r"(?:Sima|Alan|Alex|15659296|10048291)(?![A-Za-z0-9_])",
        re.I,
    )
    for path in sorted((Path(root) / "skills").rglob("*")):
        if not path.is_file():
            continue
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except UnicodeDecodeError:
            continue  # Raster assets and other binary resources are not prose.
        for idx, line in enumerate(lines, 1):
            if forbidden.search(line):
                fail(f"{path.relative_to(root)}:{idx}: episodic persona/customer "
                     "identifier found; use a role or explicit placeholder", errors)


def main() -> int:
    errors: list[str] = []
    verify_manifests(errors)
    descriptions = verify_skills_frontmatter(errors)
    positive, negative = verify_trigger_cases(descriptions, errors)
    verify_links_and_references(errors)
    verify_no_private_leaks(errors)
    verify_no_episodic_identifiers(errors)
    # Keep all regression tests on the existing CI entry point.
    for args in (
        [sys.executable, "scripts/verify-terminology.py"],
        [sys.executable, "-B", "-m", "unittest", "discover", "-s", "scripts", "-p", "test_*.py"],
    ):
        result = subprocess.run(args, cwd=ROOT, check=False)
        if result.returncode:
            fail(f"Verification command failed: {' '.join(args[1:])}", errors)

    if errors:
        print(f"FAILED with {len(errors)} error(s):", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    skill_count = len(glob.glob(os.path.join(ROOT, "skills", "*", "SKILL.md")))
    ref_count = len(glob.glob(os.path.join(ROOT, "skills", "*", "references", "*.md")))
    print(f"PASS: {skill_count} skills (PyYAML verified), {positive} positive/{negative} negative trigger contracts (static, not model routing), {ref_count} reference files, 3 plugin manifests, 0 broken links/anchors, 0 private leaks.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
