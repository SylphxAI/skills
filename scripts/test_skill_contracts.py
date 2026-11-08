"""Positive controls and mutation tests for skill metadata, cases, and references."""
import copy
import contextlib
import io
import importlib.util
import json
import os
import subprocess
from pathlib import Path
import tempfile
import unittest
from unittest import mock

spec = importlib.util.spec_from_file_location(
    'skills_verifier', Path(__file__).with_name('verify-skills.py'))
verifier = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verifier)
ROOT = Path(__file__).resolve().parents[1]


class SkillContractTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.skill = self.root / 'skills/sample-skill/SKILL.md'
        self.skill.parent.mkdir(parents=True)
        self.description = ('Use when auditing a reusable document, checking its links, '
                            'or revising its trigger. Use other-skill for shipping a change.')
        self.descriptions = {
            'sample-skill': self.description,
            'other-skill': 'Use when shipping a change. Use sample-skill for auditing a document.'}
        self.write_skill()
        self.corpus = {'version': 1, 'skills': {}}
        for name, desc in self.descriptions.items():
            boundary = verifier.BOUNDARY.search(desc).start()
            route = next(n for n in self.descriptions if n != name)
            self.corpus['skills'][name] = {
                'positive': [{'prompt': f'Positive task {i} for {name}',
                              'clause': desc[:boundary].strip()} for i in range(3)],
                'negative': [{'prompt': f'Negative task {i} for {name}',
                              'clause': desc[boundary:], 'route_to': route} for i in range(3)]}
        self.corpus_path = self.skill.parent / 'trigger-cases.json'

    def write_skill(self, frontmatter=None, body='# Instructions\n'):
        if frontmatter is None:
            frontmatter = f'name: sample-skill\ndescription: {json.dumps(self.description)}'
        self.skill.write_text(f'---\n{frontmatter}\n---\n\n{body}', encoding='utf-8')

    def frontmatter_errors(self):
        errors = []
        verifier.verify_skills_frontmatter(errors, self.root)
        return errors

    def write_corpus(self, corpus=None):
        corpus = self.corpus if corpus is None else corpus
        for path in (self.root / 'skills').glob('*/trigger-cases.json'):
            path.unlink()
        for name, cases in corpus['skills'].items():
            path = self.root / 'skills' / name / 'trigger-cases.json'
            path.parent.mkdir(parents=True, exist_ok=True)
            payload = ({'version': corpus['version'], **cases}
                       if isinstance(cases, dict) else cases)
            path.write_text(json.dumps(payload, indent=2) + '\n')

    def corpus_errors(self, corpus=None, descriptions=None):
        self.write_corpus(corpus)
        errors = []
        verifier.verify_trigger_cases(
            self.descriptions if descriptions is None else descriptions, errors, self.root)
        return errors

    def link_errors(self):
        errors = []
        verifier.verify_links_and_references(errors, self.root)
        return errors

    def test_repository_contracts_and_complete_trigger_census(self):
        errors = []
        descriptions = verifier.verify_skills_frontmatter(errors)
        counts = verifier.verify_trigger_cases(descriptions, errors)
        verifier.verify_links_and_references(errors)
        verifier.verify_policy(errors)
        self.assertEqual([], errors)
        discovered = {p.parent.name for p in (ROOT / 'skills').glob('*/SKILL.md')}
        self.assertEqual(discovered, descriptions.keys())
        self.assertTrue(all(count >= 3 * len(discovered) for count in counts))

    def test_caller_policy_covers_all_textual_skill_resources(self):
        policy = self.root / 'policy.json'
        policy.write_text(json.dumps({'patterns': [r'ExamplePersona', r'account-98765']}))
        errors = []
        patterns = verifier.load_policy(str(policy), errors)
        self.assertEqual([], errors)
        for resource in ['SKILL.md', 'references/example.md', 'assets/profile.json']:
            path = self.skill.parent / resource
            path.parent.mkdir(parents=True, exist_ok=True)
            for token in ['ExamplePersona', 'EXAMPLEPERSONA', 'account-98765']:
                with self.subTest(resource=resource, token=token):
                    path.write_text(f'Example: {token}\n', encoding='utf-8')
                    errors = []
                    verifier.verify_policy(errors, patterns, self.root)
                    self.assertEqual(1, len(errors))
                    self.assertIn(str(path.relative_to(self.root)) + ':1:', errors[0])
                    self.assertNotIn(token, errors[0])
            path.unlink()

    def test_generic_verifier_has_no_implicit_identity_policy(self):
        self.write_skill(body='# Method\nExamplePersona, account-98765 and <account_id>.\n')
        errors = []
        verifier.verify_policy(errors, root=self.root)
        self.assertEqual([], errors)

    def test_general_examples_and_binary_resources_remain_valid(self):
        self.write_skill(body=(
            '# General method\nUse <ambassador_name>, <user_name> and <account_id>.\n'
            'Judea Pearl, Causality (2009); customer_id is a public API identifier.\n'))
        (self.root / 'incident.md').write_text('ExamplePersona, account-98765\n')
        (self.skill.parent / 'preview.png').write_bytes(b'\x89PNG\r\n\x1a\n\xff')
        errors = []
        verifier.verify_policy(errors, [verifier.re.compile('ExamplePersona')], self.root)
        self.assertEqual([], errors)

    def test_explicit_invalid_policy_is_a_failure(self):
        policy = self.root / 'policy.json'
        for content in [None, '{', '[]', '{"patterns": [1]}',
                        '{"patterns": [""]}', '{"patterns": ["["]}']:
            with self.subTest(content=content):
                if content is not None:
                    policy.write_text(content)
                errors = []
                verifier.load_policy(str(policy), errors)
                self.assertEqual(1, len(errors))
        errors = []
        self.assertEqual([], verifier.load_policy(None, errors))
        self.assertEqual([], errors)

    def test_cli_policy_selection_and_unavailable_input_fail_closed(self):
        policy = self.root / 'policy.json'
        policy.write_text('{"patterns": []}')
        missing = str(self.root / 'missing.json')
        for argv, env, selected, status in [
            ([], {}, None, 0),
            ([], {'SKILLS_POLICY_FILE': str(policy)}, str(policy), 0),
            (['--policy-file', str(policy)], {'SKILLS_POLICY_FILE': missing}, str(policy), 0),
            (['--policy-file', missing], {'SKILLS_POLICY_FILE': str(policy)}, missing, 1),
            ([], {'SKILLS_POLICY_FILE': missing}, missing, 1),
        ]:
            with self.subTest(argv=argv, env=env), \
                    mock.patch.dict(os.environ, env, clear=True), \
                    mock.patch.object(verifier, 'load_policy', wraps=verifier.load_policy) as load, \
                    mock.patch.object(verifier.subprocess, 'run', return_value=mock.Mock(returncode=0)), \
                    contextlib.redirect_stdout(io.StringIO()), \
                    contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(status, verifier.main(argv))
                self.assertEqual(selected, load.call_args.args[0])

    def test_every_skill_loses_coverage_when_its_cases_are_removed(self):
        descriptions = verifier.verify_skills_frontmatter([])
        original = {'version': 1, 'skills': {}}
        for path in (ROOT / 'skills').glob('*/trigger-cases.json'):
            cases = json.loads(path.read_text())
            del cases['version']
            original['skills'][path.parent.name] = cases
        for name in descriptions:
            with self.subTest(skill=name):
                corpus = copy.deepcopy(original)
                del corpus['skills'][name]
                self.assertIn(f'{name}: missing trigger cases',
                              self.corpus_errors(corpus, descriptions))

    def test_independent_skill_case_additions_compose_in_both_merge_orders(self):
        repo = self.root / 'merge-fixture'
        repo.mkdir()
        env = {k: v for k, v in os.environ.items() if not k.startswith('GIT_')}
        env.update(GIT_CONFIG_NOSYSTEM='1', GIT_CONFIG_GLOBAL=os.devnull,
                   GIT_AUTHOR_NAME='Test Author', GIT_AUTHOR_EMAIL='author@example.com',
                   GIT_COMMITTER_NAME='Test Author', GIT_COMMITTER_EMAIL='author@example.com')

        def git(*args):
            return subprocess.run(['git', *args], cwd=repo, env=env,
                                  check=True, capture_output=True).stdout

        def files(corpus):
            return {f'skills/{name}/trigger-cases.json':
                    (json.dumps({'version': 1, **cases}, indent=2) + '\n').encode()
                    for name, cases in corpus['skills'].items()}

        def commit(snapshot, parent=None):
            for name, content in snapshot.items():
                path = repo / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(content)
            git('add', '.')
            tree = git('write-tree').decode().strip()
            args = ['commit-tree', tree, '-m', 'trigger case fixture']
            if parent:
                args += ['-p', parent]
            return git(*args).decode().strip()

        base = files(self.corpus)
        combined = copy.deepcopy(self.corpus)
        branches = []
        git('init', '--quiet')
        parent = commit(base)
        for name in self.descriptions:
            corpus = copy.deepcopy(self.corpus)
            case = {'prompt': f'Additional positive task for {name}',
                    'clause': corpus['skills'][name]['positive'][0]['clause']}
            corpus['skills'][name]['positive'].append(case)
            combined['skills'][name]['positive'].append(case)
            branches.append(commit(files(corpus), parent))
        expected = files(combined)
        for left, right in [branches, branches[::-1]]:
            with self.subTest(left=left, right=right):
                tree = git('merge-tree', '--write-tree', left, right).decode().strip()
                paths = git('ls-tree', '-r', '--name-only', tree).decode().splitlines()
                self.assertEqual(sorted(expected), paths)
                for path in paths:
                    content = git('show', f'{tree}:{path}')
                    self.assertEqual(expected[path], content)
                    (repo / path).write_bytes(content)
                errors = []
                counts = verifier.verify_trigger_cases(self.descriptions, errors, repo)
                self.assertEqual([], errors)
                self.assertEqual((8, 6), counts)

    def test_valid_metadata_and_corpus(self):
        # Register the neighbouring skill as a real directory, not just a case label.
        other = self.root / 'skills/other-skill/SKILL.md'
        other.parent.mkdir()
        other.write_text('---\nname: other-skill\ndescription: '
                         + json.dumps(self.descriptions['other-skill']) + '\n---\n# Instructions\n')
        self.assertEqual([], self.frontmatter_errors())
        self.assertEqual([], self.corpus_errors())

    def test_yaml_folded_description_and_embedded_delimiter_are_valid(self):
        other = self.root / 'skills/other-skill/SKILL.md'
        other.parent.mkdir()
        other.write_text('---\nname: other-skill\n'
                         'description: Use when shipping. Use direct single-agent work for a clear task.\n'
                         '---\n# Instructions\n')
        self.write_skill('name: sample-skill\ndescription: >-\n'
                         '  Use when checking --- in a document.\n'
                         '  Use other-skill for shipping a change.')
        self.assertEqual([], self.frontmatter_errors())

    def test_missing_or_inline_delimiters_are_rejected(self):
        for text in ['# No metadata', '---\nname: sample-skill',
                     '---\nname: sample-skill\n---not-a-delimiter\n# Body']:
            with self.subTest(text=text):
                self.skill.write_text(text)
                self.assertTrue(self.frontmatter_errors())

    def test_invalid_yaml_mapping_and_duplicate_keys_are_rejected(self):
        for text in ['[unterminated', '- name\n- description', 'null',
                     'name: sample-skill\nname: another',
                     'name: sample-skill\ndescription: first\ndescription: second']:
            with self.subTest(frontmatter=text):
                self.write_skill(text)
                self.assertTrue(self.frontmatter_errors())

    def test_description_requires_a_string_and_nonempty_content(self):
        for value in ['null', 'true', '123', '[Use when checking]', '{}', '""', '"   "']:
            with self.subTest(description=value):
                self.write_skill('name: sample-skill\ndescription: ' + value)
                self.assertTrue(self.frontmatter_errors())

    def test_missing_description_is_rejected(self):
        self.write_skill('name: sample-skill')
        self.assertTrue(self.frontmatter_errors())

    def test_description_size_boundary_counts_characters(self):
        other = self.root / 'skills/other-skill/SKILL.md'
        other.parent.mkdir()
        other.write_text('---\nname: other-skill\n'
                         'description: Use when shipping. Use direct single-agent work for a clear task.\n'
                         '---\n# Instructions\n')
        for size, valid in [(1024, True), (1025, False)]:
            with self.subTest(size=size):
                desc = self.description + '\u754c' * (size - len(self.description))
                self.write_skill('name: sample-skill\ndescription: ' + json.dumps(desc))
                self.assertEqual(valid, not self.frontmatter_errors())

    def test_name_must_match_directory_and_specification(self):
        for name in ['other-name', '-sample-skill', 'sample-skill-', 'sample--skill',
                     'Sample-Skill', 'sample_skill', 'x' * 65, '', '123']:
            with self.subTest(name=name):
                # Unquoted numeric YAML must not be coerced to a valid string.
                self.write_skill(f'name: {name}\ndescription: {json.dumps(self.description)}')
                self.assertTrue(self.frontmatter_errors())

    def test_name_size_and_hyphen_boundaries(self):
        self.skill.unlink()
        for name, valid in [('a', True), ('a' * 64, True), ('a' * 65, False),
                            ('-a', False), ('a-', False), ('a--b', False)]:
            with self.subTest(name=name):
                path = self.root / 'skills' / name / 'SKILL.md'
                path.parent.mkdir()
                path.write_text(f'---\nname: {name}\n'
                                'description: Use when checking. Use direct single-agent work for a clear task.\n'
                                '---\n# Instructions\n')
                self.assertEqual(valid, not self.frontmatter_errors())
                path.unlink()

    def test_trigger_must_start_with_task_moment_and_have_boundary(self):
        for desc in ['A general helper. Use when checking documents.',
                     'Use when checking documents.']:
            with self.subTest(description=desc):
                self.write_skill('name: sample-skill\ndescription: ' + json.dumps(desc))
                self.assertTrue(self.frontmatter_errors())

    def test_unknown_or_self_routing_metadata_is_rejected(self):
        for route in ['missing-skill', 'sample-skill']:
            with self.subTest(route=route):
                desc = f'Use when checking a document. Use {route} for shipping.'
                self.write_skill('name: sample-skill\ndescription: ' + json.dumps(desc))
                self.assertTrue(self.frontmatter_errors())

    def test_missing_body_and_500_line_budget_are_rejected(self):
        self.write_skill(body='')
        self.assertTrue(self.frontmatter_errors())
        other = self.root / 'skills/other-skill/SKILL.md'
        other.parent.mkdir()
        other.write_text('---\nname: other-skill\n'
                         'description: Use when shipping. Use direct single-agent work for a clear task.\n'
                         '---\n# Instructions\n')
        for lines, valid in [(499, True), (500, False)]:
            with self.subTest(lines=lines):
                self.write_skill(body='text\n' * (lines - 5))
                self.assertEqual(lines, len(self.skill.read_text().splitlines()))
                self.assertEqual(valid, not self.frontmatter_errors())

    def test_empty_skill_population_is_rejected(self):
        self.skill.unlink()
        self.assertIn('No skills found', self.frontmatter_errors())

    def test_missing_and_malformed_corpus_are_rejected(self):
        for text in [None, '{', '[]', '{}',
                     '{"version": true, "positive": [], "negative": []}',
                     '{"version": 2, "positive": [], "negative": []}',
                     '{"version": 1, "positive": [], "negative": [], "extra": []}',
                     '{"version": 1, "positive": [], "positive": [], "negative": []}']:
            with self.subTest(corpus=text):
                self.write_corpus()
                if text is None:
                    self.corpus_path.unlink()
                else:
                    self.corpus_path.write_text(text)
                errors = []
                verifier.verify_trigger_cases(self.descriptions, errors, self.root)
                self.assertTrue(errors)

    def test_removed_or_unknown_skill_cases_are_rejected(self):
        for operation in ['remove', 'add']:
            with self.subTest(operation=operation):
                corpus = copy.deepcopy(self.corpus)
                if operation == 'remove':
                    del corpus['skills']['sample-skill']
                else:
                    corpus['skills']['missing-skill'] = corpus['skills']['sample-skill']
                self.assertTrue(self.corpus_errors(corpus))

    def test_both_polarities_and_minimum_examples_are_required(self):
        for polarity in ['positive', 'negative']:
            for value in [None, [], self.corpus['skills']['sample-skill'][polarity][:2]]:
                with self.subTest(polarity=polarity, value=value):
                    corpus = copy.deepcopy(self.corpus)
                    corpus['skills']['sample-skill'][polarity] = value
                    self.assertTrue(self.corpus_errors(corpus))
        self.corpus['skills']['sample-skill'] = []
        self.assertTrue(self.corpus_errors())

    def test_case_schema_and_prompt_types_are_checked(self):
        for case in [None, {}, {'prompt': 'Task', 'clause': 'Use when', 'unexpected': True},
                     {'prompt': '', 'clause': 'Use when'},
                     {'prompt': 42, 'clause': 'Use when'}]:
            with self.subTest(case=case):
                corpus = copy.deepcopy(self.corpus)
                corpus['skills']['sample-skill']['positive'][0] = case
                self.assertTrue(self.corpus_errors(corpus))

    def test_duplicate_and_cross_polarity_conflicting_prompts_are_rejected(self):
        for polarity in ['positive', 'negative']:
            with self.subTest(polarity=polarity):
                corpus = copy.deepcopy(self.corpus)
                prompt = corpus['skills']['sample-skill']['positive'][0]['prompt']
                corpus['skills']['sample-skill'][polarity][1]['prompt'] = '  ' + prompt.upper() + '  '
                self.assertTrue(self.corpus_errors(corpus))

    def test_stale_clauses_and_swapped_polarities_are_rejected(self):
        for polarity in ['positive', 'negative']:
            for clause in ['', None, 'Text removed from the description',
                           self.corpus['skills']['sample-skill'][
                               'negative' if polarity == 'positive' else 'positive'][0]['clause']]:
                with self.subTest(polarity=polarity, clause=clause):
                    corpus = copy.deepcopy(self.corpus)
                    corpus['skills']['sample-skill'][polarity][0]['clause'] = clause
                    self.assertTrue(self.corpus_errors(corpus))

    def test_negative_routes_must_exist_and_appear_in_the_boundary(self):
        for route in ['missing-skill', 'sample-skill', [], None]:
            with self.subTest(route=route):
                corpus = copy.deepcopy(self.corpus)
                corpus['skills']['sample-skill']['negative'][0]['route_to'] = route
                self.assertTrue(self.corpus_errors(corpus))
        desc = self.description + ' Use third-skill for pricing.'
        descriptions = dict(self.descriptions, **{'sample-skill': desc, 'third-skill': 'Use when pricing.'})
        corpus = copy.deepcopy(self.corpus)
        corpus['skills']['sample-skill']['negative'][0]['route_to'] = 'third-skill'
        self.assertTrue(any('route_to' in e for e in self.corpus_errors(corpus, descriptions)))

    def test_no_skill_control_requires_explicit_exclusion(self):
        self.descriptions['sample-skill'] += ' Routine arithmetic does not need this skill.'
        for case in self.corpus['skills']['sample-skill']['negative']:
            case.update(clause='Routine arithmetic does not need this skill.', route_to=None)
        self.assertEqual([], self.corpus_errors())

    def test_link_reference_and_anchor_positive_control(self):
        ref = self.skill.parent / 'references/guide.md'
        ref.parent.mkdir()
        ref.write_text('# Detailed guide\n')
        self.write_skill(body='# Instructions\nRead [guide](references/guide.md#detailed-guide).\n')
        self.assertEqual([], self.link_errors())

    def test_broken_reference_and_sibling_skill_links_are_rejected(self):
        for target in ['references/missing.md', '../missing-skill/SKILL.md']:
            with self.subTest(target=target):
                self.write_skill(body=f'# Instructions\nRead [guide]({target}).\n')
                self.assertTrue(any('broken link' in e for e in self.link_errors()))

    def test_missing_heading_anchor_is_rejected(self):
        self.write_skill(body='# Instructions\nSee [missing](#not-a-heading).\n')
        self.assertTrue(any('missing anchor' in e for e in self.link_errors()))

    def test_orphan_and_reference_not_linked_from_own_skill_are_rejected(self):
        ref = self.skill.parent / 'references/guide.md'
        ref.parent.mkdir()
        ref.write_text('# Guide\n')
        self.assertTrue(any('Orphan reference' in e for e in self.link_errors()))
        (self.root / 'README.md').write_text('[Guide](skills/sample-skill/references/guide.md)\n')
        errors = self.link_errors()
        self.assertFalse(any('Orphan reference' in e for e in errors))
        self.assertTrue(any('not linked from its own SKILL.md' in e for e in errors))


if __name__ == '__main__':
    unittest.main()
