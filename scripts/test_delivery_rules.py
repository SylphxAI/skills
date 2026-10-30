"""Detect previously witnessed blocking instructions without prescribing prose."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]

# These are witnessed instructions, not a ban on legitimate domain fallbacks
# (for example sign-in recovery) or on independent production verification.
BLOCKING = (
    r'independent review pass.{0,50}before merge',
    r'one-way doors escalate to the accountable owner',
    r'changes to core governance rulings.{0,40}human authorization',
    r'never slap a dirty workaround',
    r'before the first proposal or the first agent starts editing',
    r'one consensus decision naming',
    r'if a real blocker stops progress for 30 minutes',
    r'urgent reversible mitigation.{0,30}to stop live harm',
    r'until the (?:entire|complete) outcome passes with zero defects',
    r'outer loop once',
)


def blocking_patterns(text):
    plain = re.sub(r'[`*_]', '', text)
    return [p for p in BLOCKING if re.search(p, plain, re.I | re.S)]


class DeliveryRulesTests(unittest.TestCase):
    def read(self, name):
        return (ROOT / 'skills' / name).read_text()

    def test_no_audited_blocking_instructions_in_skills_or_references(self):
        for path in (ROOT / 'skills').rglob('*.md'):
            with self.subTest(path=str(path.relative_to(ROOT))):
                self.assertEqual([], blocking_patterns(path.read_text()))

    def test_each_witnessed_pattern_is_detected(self):
        examples = (
            'Independent review pass (`prove-it`) before merge',
            'One-way doors escalate to the accountable owner',
            'Changes to core governance rulings requires explicit human authorization',
            'Never slap a dirty workaround',
            'before the first proposal or the first agent starts editing',
            'one consensus decision naming the single writer',
            'If a real blocker stops progress for 30 minutes',
            'Urgent reversible mitigation** to stop live harm',
            'until the entire outcome passes with zero defects',
            'Outer Loop once',
        )
        for example in examples:
            with self.subTest(example=example):
                self.assertTrue(blocking_patterns(example))

    def test_no_false_positives_for_review_recovery_or_local_checks(self):
        self.assertEqual([], blocking_patterns(
            'Required checks green, then merge queue. Independent review in parallel. '
            'Verify the live rollout independently. Use the email sign-in fallback. '
            'Run targeted local checks, then publish; CI verifies the rest. '
            '30 minutes is the latest re-check, not a wait.'))
