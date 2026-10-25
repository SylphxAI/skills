"""Guard the published procedure, not a substitute for live delivery tests."""
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
REFERENCE = 'skills/clear-writing/references/personal-follow-ups.md'


class PersonalFollowUpTests(unittest.TestCase):
    def setUp(self):
        self.text = (ROOT / REFERENCE).read_text()

    def test_discoverable_from_skill_and_voice(self):
        for source in ('skills/clear-writing/SKILL.md',
                       'skills/clear-writing/references/work-communication.md',
                       'skills/self-challenge/references/agent-voice.md'):
            with self.subTest(source=source):
                self.assertIn('personal-follow-ups.md', (ROOT / source).read_text())
        self.assertIn('tracking personal to-dos and pending asks',
                      (ROOT / 'skills/clear-writing/SKILL.md').read_text())

    def test_durable_scoped_records_and_reconciliation_are_required(self):
        for required in ('authenticated person', 'conversation/audience',
                         'source message', 'requested outcome', 'explicit due date',
                         'intended respondent', 'delivery status/receipt',
                         'source delivery ID', 'transition history',
                         'cancels future reminders', 'Completion needs outcome evidence',
                         'reload durable records', 'conditional updates',
                         'do not claim capture succeeded'):
            with self.subTest(required=required):
                self.assertIn(required, self.text)

    def test_ask_pruning_preserves_authority_and_underlying_work(self):
        for required in ('already answered', 'same open ask', 'superseded',
                         'available evidence', 'existing grant', 'missing grant',
                         'new unauthorized spend', 'ambiguity',
                         'unresolved safety requirement', 'durable wait',
                         'underlying to-do'):
            with self.subTest(required=required):
                self.assertIn(required, self.text)

    def test_live_negative_cases_are_not_replaced_by_static_checks(self):
        for required in ('including concurrently', 'after source capture',
                         'after state persistence', 'after provider acceptance',
                         'before receipt persistence',
                         'Same text from different people or conversations',
                         'Storage or delivery-status service unavailable',
                         'ambiguous send outcome is unknown', 'do not blindly resend',
                         'unrequested duplicate reply', 'serving skill revision',
                         'Static documentation checks do not prove runtime behavior'):
            with self.subTest(required=required):
                self.assertIn(required, self.text)
