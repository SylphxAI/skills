#!/usr/bin/env python3
"""Falsify SKL-PACKAGE: installable entries are passive standard packages."""

from __future__ import annotations

import json
import re
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
    patch_text = patch_path.read_text(encoding="utf-8")
    if patch_text.count("id: sylphx-skills") != 1:
        errors.append("DSH patch must insert exactly one sylphx-skills row")

    main_field = package_json.get("main")
    if not isinstance(main_field, str):
        errors.append("DSH package main is missing")
        return errors
    main_path = (repo_root / main_field).resolve()
    if not main_path.is_file():
        errors.append(f"DSH module {main_field} is missing")
        return errors
    source = main_path.read_text(encoding="utf-8")
    if "includeDefaultRoots: false" not in source:
        errors.append("DSH module must not add host default skill roots")
    if "customSkillDirs: [catalogRoot]" not in source:
        errors.append("DSH module must mount only the catalog skills/ directory")
    if "export const inject = ['skills'];" not in source:
        errors.append("DSH module may depend on the host skills service only")
    if ", '..', '..', 'skills')" not in source and ', "..", "..", "skills")' not in source:
        errors.append("DSH module must point catalogRoot at skills/")
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


if __name__ == "__main__":
    unittest.main()
