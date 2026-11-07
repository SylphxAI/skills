"""Deterministic billing disclosure contracts, not model-routing/output tests.

The skill's Markdown decision table is the declarative source under test.
Synthetic proposals annotate their disclosures explicitly; this suite does not
claim to detect those disclosures in arbitrary natural-language model output.
Trigger JSON remains a separate routing corpus.
"""
from dataclasses import dataclass
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
TOTAL = 'requested own total'
ORDERS = 'explicitly requested own order breakdown'
HEADER = ('Role', 'Identity verified', 'Payment receipt verified',
          'Proposed disclosure', 'Decision')


@dataclass(frozen=True)
class Proposal:
    role: str
    identity: bool
    receipt: bool
    disclosures: tuple[str, ...]


# Three forbidden scenario groups. Each disclosed field is checked separately
# so a refused rank cannot mask an independently allowed inventory disclosure.
FORBIDDEN = (
    ('ambassador quotes total/order reference',
     Proposal('ambassador', True, True, (TOTAL, ORDERS)),
     ('warm redirect', 'warm redirect')),
    ('official answers without both verification inputs',
     Proposal('official support', False, False, (TOTAL, ORDERS)),
     ('verify first', 'verify first')),
    ('official appends rank or unrequested account details',
     Proposal('official support', True, True,
              ('paid rank', 'paid percentile', 'top-N status', 'spend comparison',
               'unrequested inventory', 'unrequested recipes',
               'unrequested account details')),
     ('omit',) * 7),
)
ALLOWED = (
    ('verified official total only',
     Proposal('official support', True, True, (TOTAL,))),
    ('verified official explicitly requested order breakdown only',
     Proposal('official support', True, True, (ORDERS,))),
    ('verified official total and explicitly requested order breakdown',
     Proposal('official support', True, True, (TOTAL, ORDERS))),
)


def parse_billing_table(markdown):
    """Read one named Markdown table; reject missing/ambiguous/malformed data."""
    tables = []
    current = None
    for line in markdown.splitlines():
        if not line.startswith('|'):
            current = None
            continue
        cells = tuple(cell.strip() for cell in line.strip('|').split('|'))
        if cells == HEADER:
            current = []
            tables.append(current)
        elif current is not None:
            if all(re.fullmatch(r':?-+:?', cell) for cell in cells):
                continue
            if len(cells) != len(HEADER):
                raise ValueError('Malformed billing table row')
            role, identity, receipt, disclosures, decision = cells
            if role not in {'any', 'ambassador', 'official support'}:
                raise ValueError('Unknown billing role')
            if any(v not in {'any', 'yes', 'no'} for v in (identity, receipt)):
                raise ValueError('Unknown verification state')
            if decision not in {'warm redirect', 'verify first',
                                'answer requested fields', 'omit'}:
                raise ValueError('Unknown billing decision')
            current.append((role, identity, receipt,
                            tuple(disclosures.split('; ')), decision))
    if len(tables) != 1 or not tables[0]:
        raise ValueError('Expected exactly one billing response contract table')
    return tables[0]


def decisions(rows, proposal):
    """Evaluate table cells only; no billing policy is encoded in this reader."""
    context = (proposal.role, 'yes' if proposal.identity else 'no',
               'yes' if proposal.receipt else 'no')
    result = []
    for disclosure in proposal.disclosures:
        matched = {decision for role, identity, receipt, fields, decision in rows
                   if disclosure in fields
                   and all(rule == 'any' or rule == actual
                           for rule, actual in zip((role, identity, receipt), context))}
        if len(matched) != 1:
            raise ValueError(f'Missing or contradictory contract for {disclosure}')
        result.append(matched.pop())
    return tuple(result)


class PaidRankBoundaryTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.support = (ROOT / 'skills/customer-support/SKILL.md').read_text()
        cls.rows = parse_billing_table(cls.support)

    def test_three_forbidden_fixtures_have_specific_non_answer_decisions(self):
        for name, proposal, expected in FORBIDDEN:
            with self.subTest(fixture=name):
                actual = decisions(self.rows, proposal)
                self.assertEqual(expected, actual)
                self.assertNotIn('answer requested fields', actual)

    def test_ambassador_redirects_total_and_order_id_even_when_verified(self):
        for identity in (False, True):
            for receipt in (False, True):
                with self.subTest(identity=identity, receipt=receipt):
                    proposal = Proposal('ambassador', identity, receipt, (TOTAL, ORDERS))
                    self.assertEqual(('warm redirect',) * 2,
                                     decisions(self.rows, proposal))

    def test_official_needs_identity_and_payment_receipt_independently(self):
        for identity, receipt in ((False, False), (False, True), (True, False)):
            with self.subTest(identity=identity, receipt=receipt):
                proposal = Proposal('official support', identity, receipt, (TOTAL, ORDERS))
                self.assertEqual(('verify first',) * 2, decisions(self.rows, proposal))

    def test_official_total_does_not_authorize_rank_or_unrequested_extras(self):
        for extra in FORBIDDEN[2][1].disclosures:
            with self.subTest(extra=extra):
                proposal = Proposal('official support', True, True, (TOTAL, extra))
                self.assertEqual(('answer requested fields', 'omit'),
                                 decisions(self.rows, proposal))

    def test_verified_official_total_and_requested_order_breakdown_are_allowed(self):
        for name, proposal in ALLOWED:
            with self.subTest(fixture=name):
                self.assertEqual(('answer requested fields',) * len(proposal.disclosures),
                                 decisions(self.rows, proposal))

    def test_ambassador_has_no_total_character_ceiling(self):
        # This is a document lint, not a runtime reply-length validator.
        paths = (ROOT / 'skills/ambassador').rglob('*')
        for path in paths:
            if path.suffix in {'.md', '.json'}:
                with self.subTest(path=str(path.relative_to(ROOT))):
                    text = path.read_text()
                    self.assertNotRegex(text, r'(?i)\b90[ -]?(?:characters?|字)')
        ambassador = (ROOT / 'skills/ambassador/SKILL.md').read_text()
        self.assertIn('with no total character cap', ambassador)


if __name__ == '__main__':
    unittest.main()
