#!/usr/bin/env python3
"""Falsify SKL-PACKAGE: installable entries are passive standard packages."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
SKILLS_ROOT = REPO_ROOT / "skills"

ALLOWED_PACKAGE_CHILDREN = {"SKILL.md", "references", "scripts", "assets"}
FORBIDDEN_PACKAGE_FILENAMES = {
    "AGENTS.md",
    "CLAUDE.md",
    "GEMINI.md",
    "hooks.json",
    ".mcp.json",
    ".app.json",
    "constitution.md",
}
INJECTION_FRONTMATTER_KEYS = {"alwaysapply", "always-apply", "always"}
FORBIDDEN_PLUGIN_KEYS = {"hooks", "mcpServers", "apps", "lspServers"}
FORBIDDEN_ROOT_COMPONENTS = (
    "hooks.json",
    ".mcp.json",
    ".app.json",
    "hooks",
    "commands",
    "agents",
)
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|\Z)", re.S)
DSH_MOUNT_ORACLE = Path(__file__).resolve().parent / "dsh_mount_oracle.mjs"
DSH_LOOKALIKE_MODULE = """\
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { apply as applySkillFilesystem } from '@deepseek-ai/dsh-skill-filesystem';

const catalogRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'skills');

export const name = 'sylphx-skills';

export const inject = ['skills'];

/**
 * includeDefaultRoots: false
 * customSkillDirs: [catalogRoot]
 * export const inject = ['skills'];
 * , '..', '..', 'skills)
 */
export function apply(ctx, config = {}) {
  return applySkillFilesystem(ctx, {
    providerName: 'sylphx-catalog',
    includeDefaultRoots: true,
    customSkillDirs: [catalogRoot, join(catalogRoot, '..', 'other')],
    ...config
  });
}
"""


def parse_frontmatter_map(text: str) -> dict[str, str] | None:
    match = FRONTMATTER_RE.match(text)
    if match is None:
        return None
    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if not line or line[0] in " \t#" or ":" not in line:
            continue
        key, raw = line.split(":", 1)
        key = key.strip()
        value = raw.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        fields[key] = value
    return fields


def skill_package_errors(skills_root: Path) -> list[str]:
    errors: list[str] = []
    if not skills_root.is_dir():
        return [f"missing skills directory: {skills_root}"]

    for package in sorted(path for path in skills_root.iterdir() if path.is_dir()):
        skill_md = package / "SKILL.md"
        if not skill_md.is_file():
            errors.append(f"{package.name}: missing SKILL.md")
            continue

        text = skill_md.read_text(encoding="utf-8")
        fields = parse_frontmatter_map(text)
        if fields is None:
            errors.append(f"{package.name}: SKILL.md is missing YAML frontmatter")
            continue

        name = fields.get("name", "")
        description = fields.get("description", "")
        if name != package.name:
            errors.append(
                f"{package.name}: frontmatter name {name!r} does not match folder"
            )
        if not NAME_RE.fullmatch(name) or len(name) > 64:
            errors.append(f"{package.name}: invalid skill name {name!r}")
        if not description or len(description) > 1024:
            errors.append(f"{package.name}: description must be 1-1024 characters")

        for key in fields:
            if key.lower() in INJECTION_FRONTMATTER_KEYS:
                errors.append(
                    f"{package.name}: frontmatter {key} would inject instructions on install"
                )

        for child in sorted(package.iterdir(), key=lambda path: path.name):
            if child.name.startswith("."):
                continue
            if child.name not in ALLOWED_PACKAGE_CHILDREN:
                errors.append(
                    f"{package.name}: extra path {child.name} is outside SKILL.md, "
                    "references/, scripts/, or assets/"
                )

        for path in package.rglob("*"):
            if path.is_file() and path.name in FORBIDDEN_PACKAGE_FILENAMES:
                rel = path.relative_to(package)
                errors.append(
                    f"{package.name}: {rel} would inject global instructions or host components"
                )
            if path.is_file() and path.name == "SKILL.md" and path != skill_md:
                rel = path.relative_to(package)
                errors.append(f"{package.name}: nested installable entry {rel}")

    return errors


def catalog_metadata_errors(repo_root: Path) -> list[str]:
    errors: list[str] = []
    plugin_path = repo_root / ".codex-plugin" / "plugin.json"
    if not plugin_path.is_file():
        errors.append("missing .codex-plugin/plugin.json")
        return errors

    try:
        plugin = json.loads(plugin_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return ["`.codex-plugin/plugin.json` is not valid JSON"]
    if not isinstance(plugin, dict):
        return ["`.codex-plugin/plugin.json` must be an object"]

    for key in FORBIDDEN_PLUGIN_KEYS:
        if key in plugin:
            errors.append(f"plugin.json exposes {key}; catalog metadata must stay skill-only")

    skills_field = plugin.get("skills")
    if not isinstance(skills_field, str) or not skills_field.strip():
        errors.append("plugin.json must point `skills` at ./skills/")
    else:
        skills_dir = (plugin_path.parent.parent / skills_field).resolve()
        if skills_dir != (repo_root / "skills").resolve() or not skills_dir.is_dir():
            errors.append("plugin.json `skills` must resolve to the repository skills/ directory")

    for name in FORBIDDEN_ROOT_COMPONENTS:
        path = repo_root / name
        if path.exists():
            errors.append(f"root {name} would install a host component besides skills/")

    marketplace = repo_root / ".agents" / "plugins" / "marketplace.json"
    if marketplace.is_file():
        try:
            payload = json.loads(marketplace.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            errors.append("`.agents/plugins/marketplace.json` is not valid JSON")
        else:
            plugins = payload.get("plugins") if isinstance(payload, dict) else None
            if isinstance(plugins, list):
                for entry in plugins:
                    if not isinstance(entry, dict):
                        continue
                    installation = (entry.get("policy") or {}).get("installation")
                    if installation == "INSTALLED_BY_DEFAULT":
                        errors.append(
                            f"marketplace installs {entry.get('name')!r} by default; "
                            "packages must not install themselves"
                        )

    package_json_path = repo_root / "package.json"
    if package_json_path.is_file():
        try:
            package_json = json.loads(package_json_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            errors.append("`package.json` is not valid JSON")
            return errors
        dsh = package_json.get("dsh") if isinstance(package_json, dict) else None
        if isinstance(dsh, dict):
            errors.extend(_dsh_bundle_errors(repo_root, package_json, dsh))

    return errors


def _yaml_code_line(line: str) -> str:
    stripped = line.lstrip()
    if not stripped or stripped.startswith("#"):
        return ""
    in_single = False
    in_double = False
    chars: list[str] = []
    for index, char in enumerate(line):
        if char == "'" and not in_double:
            in_single = not in_single
            chars.append(char)
            continue
        if char == '"' and not in_single:
            in_double = not in_double
            chars.append(char)
            continue
        if char == "#" and not in_single and not in_double:
            if index == 0 or line[index - 1] in " \t":
                break
        chars.append(char)
    return "".join(chars).rstrip()


def _unquote_yaml_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def dsh_insert_ids(patch_text: str) -> list[str]:
    ids: list[str] = []
    in_insert = False
    current: dict[str, str] | None = None

    def flush() -> None:
        nonlocal current
        if current is not None and "id" in current:
            ids.append(current["id"])
        current = None

    for raw in patch_text.splitlines():
        line = _yaml_code_line(raw)
        if not line:
            continue
        item = re.match(r"^(\s*)-\s+(.*)$", line)
        if item:
            indent = len(item.group(1).replace("\t", "  "))
            rest = item.group(2)
            if indent == 0 and rest.startswith("insert:"):
                flush()
                in_insert = True
                continue
            if in_insert and indent > 0:
                flush()
                current = {}
                if ":" in rest:
                    key, raw_value = rest.split(":", 1)
                    current[key.strip()] = _unquote_yaml_scalar(raw_value)
                continue
            flush()
            in_insert = False
            continue
        if not in_insert or current is None or ":" not in line:
            continue
        key, raw_value = line.split(":", 1)
        current[key.strip()] = _unquote_yaml_scalar(raw_value)
    flush()
    return ids


def run_dsh_mount_oracle(module_path: Path, catalog_root: Path) -> subprocess.CompletedProcess[str]:
    node = shutil.which("node")
    if node is None:
        return subprocess.CompletedProcess(
            args=["node"],
            returncode=127,
            stdout="",
            stderr="node is required to exercise the DSH catalog mount",
        )
    return subprocess.run(
        [node, str(DSH_MOUNT_ORACLE), str(module_path), str(catalog_root)],
        check=False,
        capture_output=True,
        text=True,
        timeout=30,
    )


def _dsh_bundle_errors(repo_root: Path, package_json: dict, dsh: dict) -> list[str]:
    errors: list[str] = []
    patch_field = ((dsh.get("bundle") or {}) if isinstance(dsh.get("bundle"), dict) else {}).get(
        "patch"
    )
    if not isinstance(patch_field, str):
        errors.append("DSH bundle must declare a patch file")
        return errors
    patch_path = (repo_root / patch_field).resolve()
    if not patch_path.is_file():
        errors.append(f"DSH patch {patch_field} is missing")
        return errors
    ids = dsh_insert_ids(patch_path.read_text(encoding="utf-8"))
    if ids != ["sylphx-skills"]:
        errors.append("DSH patch must insert exactly one sylphx-skills row")

    main_field = package_json.get("main")
    if not isinstance(main_field, str):
        errors.append("DSH package main is missing")
        return errors
    main_path = (repo_root / main_field).resolve()
    if not main_path.is_file():
        errors.append(f"DSH module {main_field} is missing")
        return errors
    result = run_dsh_mount_oracle(main_path, repo_root / "skills")
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "DSH mount oracle failed").strip()
        errors.append(detail)
    return errors


def package_contract_errors(repo_root: Path) -> list[str]:
    return skill_package_errors(repo_root / "skills") + catalog_metadata_errors(repo_root)


def _write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


class PackageContractTest(unittest.TestCase):
    def test_oracle_detects_layout_and_injection_defects(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            _write(
                root / "skills" / "good" / "SKILL.md",
                "---\nname: good\ndescription: A requestable job.\n---\n\n# Good\n",
            )
            _write(
                root / "skills" / "wrong-name" / "SKILL.md",
                "---\nname: other\ndescription: A requestable job.\n---\n\n# Wrong\n",
            )
            _write(
                root / "skills" / "extra-file" / "SKILL.md",
                "---\nname: extra-file\ndescription: A requestable job.\n---\n\n# Extra\n",
            )
            _write(root / "skills" / "extra-file" / "SOURCE.md", "# leftover\n")
            _write(
                root / "skills" / "nested" / "SKILL.md",
                "---\nname: nested\ndescription: A requestable job.\n---\n\n# Nested\n",
            )
            _write(
                root / "skills" / "nested" / "child" / "SKILL.md",
                "---\nname: child\ndescription: Nested entry.\n---\n\n# Child\n",
            )
            _write(
                root / "skills" / "injector" / "SKILL.md",
                "---\nname: injector\ndescription: A requestable job.\nalwaysApply: true\n---\n\n# Inject\n",
            )
            _write(root / "skills" / "injector" / "AGENTS.md", "always on\n")
            _write(
                root / ".codex-plugin" / "plugin.json",
                json.dumps(
                    {
                        "name": "demo",
                        "skills": "./skills/",
                        "hooks": "./hooks.json",
                    }
                ),
            )
            _write(root / "hooks.json", "{}")
            _write(
                root / ".agents" / "plugins" / "marketplace.json",
                json.dumps(
                    {
                        "name": "demo",
                        "plugins": [
                            {
                                "name": "demo",
                                "policy": {"installation": "INSTALLED_BY_DEFAULT"},
                            }
                        ],
                    }
                ),
            )

            errors = package_contract_errors(root)
            blob = "\n".join(errors)
            self.assertTrue(any("does not match folder" in item for item in errors), blob)
            self.assertTrue(any("extra path SOURCE.md" in item for item in errors), blob)
            self.assertTrue(any("nested installable entry" in item for item in errors), blob)
            self.assertTrue(any("alwaysApply" in item for item in errors), blob)
            self.assertTrue(any("AGENTS.md" in item for item in errors), blob)
            self.assertTrue(any("exposes hooks" in item for item in errors), blob)
            self.assertTrue(any("installs 'demo' by default" in item for item in errors), blob)
            self.assertTrue(any("root hooks.json" in item for item in errors), blob)
            self.assertFalse(any(item.startswith("good:") for item in errors), blob)

    def test_catalog_satisfies_package_contract(self) -> None:
        errors = package_contract_errors(REPO_ROOT)
        self.assertEqual(errors, [])

    def test_dsh_patch_parser_ignores_comment_tokens(self) -> None:
        comment_and_real = (
            "# id: sylphx-skills\n"
            "- insert:\n"
            "    - id: sylphx-skills\n"
            "      name: 'sylphx-skills'\n"
        )
        comment_hides_wrong_id = (
            "# id: sylphx-skills\n"
            "- insert:\n"
            "    - id: other-plugin\n"
            "      name: 'sylphx-skills'\n"
        )
        self.assertEqual(dsh_insert_ids(comment_and_real), ["sylphx-skills"])
        self.assertEqual(dsh_insert_ids(comment_hides_wrong_id), ["other-plugin"])
        self.assertEqual(
            dsh_insert_ids((REPO_ROOT / "dsh" / "cordis.patch.yml").read_text(encoding="utf-8")),
            ["sylphx-skills"],
        )

    def test_dsh_oracle_rejects_source_tokens_without_mount_behavior(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            module_path = root / "lib" / "dsh" / "index.js"
            catalog = root / "skills"
            catalog.mkdir(parents=True)
            _write(module_path, DSH_LOOKALIKE_MODULE)

            result = run_dsh_mount_oracle(module_path, catalog)
            blob = (result.stderr or result.stdout).strip()
            self.assertNotEqual(result.returncode, 0, blob)
            self.assertTrue(
                "must not add host default skill roots" in blob
                or "must mount only the catalog skills/ directory" in blob,
                blob,
            )

    def test_dsh_oracle_accepts_published_catalog_module(self) -> None:
        result = run_dsh_mount_oracle(REPO_ROOT / "lib" / "dsh" / "index.js", REPO_ROOT / "skills")
        blob = (result.stderr or result.stdout).strip()
        self.assertEqual(result.returncode, 0, blob)


if __name__ == "__main__":
    unittest.main()
