"""Regression checks for glossary integrity and contextual terminology scanning."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location(
    'terminology', Path(__file__).with_name('verify-terminology.py'))
terminology = importlib.util.module_from_spec(spec)
spec.loader.exec_module(terminology)


class TerminologyTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.glossary = self.root / terminology.GLOSSARY.relative_to(terminology.ROOT)
        self.glossary.parent.mkdir(parents=True)
        self.text = terminology.GLOSSARY.read_text()
        self.glossary.write_text(self.text)
        self.rows = terminology.glossary_rows(self.text)
        self.retired = self.rows[0][0]  # derive fixtures from the canonical mapping

    def write(self, text):
        (self.root / 'AGENTS.md').write_text(text)

    def test_repository(self):
        self.assertEqual([], terminology.verify())

    def test_sourced_glossary_alone_is_valid(self):
        self.assertEqual([], terminology.verify(self.root))

    def test_retired_word_and_case_are_rejected(self):
        for text in [self.retired, self.retired.upper(), f'`{self.retired}`']:
            with self.subTest(text=text):
                self.write(text)
                self.assertTrue(terminology.verify(self.root))

    def test_each_mapping_needs_a_source(self):
        for row in self.rows:
            with self.subTest(label=row[0]):
                self.glossary.write_text(self.text.replace(row[2], '', 1))
                self.assertTrue(terminology.verify(self.root))
        self.glossary.write_text(self.text)

    def test_named_relative_source_allowed(self):
        self.glossary.write_text(self.text.replace(
            self.rows[0][2], '[Owning method](../method/SKILL.md)', 1))
        self.assertEqual([], terminology.verify(self.root))

    def test_insecure_source_rejected(self):
        self.glossary.write_text(self.text.replace('https://', 'http://', 1))
        self.assertTrue(terminology.verify(self.root))

    def test_empty_glossary_rejected(self):
        self.glossary.write_text('# Empty\n')
        self.assertTrue(terminology.verify(self.root))

    def test_standard_and_domain_terms_allowed(self):
        self.write('Use accurate status and differential tests.\n'
                   'A landing page, per-seat pricing, ranked ladder, and Animal Crossing.\n'
                   'A differential test harness uses the multi-month denominator.\n')
        self.assertEqual([], terminology.verify(self.root))

    def test_word_boundaries(self):
        self.write('prefix' + self.retired + 'suffix')
        self.assertEqual([], terminology.verify(self.root))

    def test_only_canonical_glossary_is_exempt(self):
        (self.root / 'other.md').write_text(self.text)
        self.assertTrue(terminology.verify(self.root))


if __name__ == '__main__':
    unittest.main()
