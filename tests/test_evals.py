#!/usr/bin/env python3
"""Structural check: every docs/evals/<skill>.md names a real skill and has tasks with rubrics."""

from __future__ import annotations

import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
EVALS = REPO_ROOT / "docs" / "evals"
SKILLS = REPO_ROOT / "skills"


class EvalFilesTest(unittest.TestCase):
    def test_eval_files_have_tasks_and_rubrics(self) -> None:
        files = sorted(EVALS.glob("*.md"))
        self.assertTrue(files, "docs/evals has no eval files")
        for path in files:
            with self.subTest(eval=path.name):
                self.assertTrue((SKILLS / path.stem / "SKILL.md").is_file(), "no such skill")
                text = path.read_text(encoding="utf-8")
                tasks = re.split(r"^## Task \d+\s*$", text, flags=re.M)[1:]
                self.assertGreaterEqual(len(tasks), 5, "needs at least 5 tasks")
                for i, body in enumerate(tasks, 1):
                    self.assertIn("**Prompt:**", body, f"task {i} has no prompt")
                    self.assertIn("**Rubric:**", body, f"task {i} has no rubric")
                    items = re.findall(r"^\d+\. ", body.split("**Rubric:**", 1)[1], flags=re.M)
                    self.assertGreaterEqual(len(items), 3, f"task {i} rubric needs 3+ items")


if __name__ == "__main__":
    unittest.main()
