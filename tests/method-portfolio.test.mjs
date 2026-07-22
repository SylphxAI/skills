import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const INJECTION_CASES = JSON.parse(readFileSync(
  new URL('./fixtures/method-injection-cases.json', import.meta.url),
  'utf8',
));

const METHOD_PACKAGES = [
  'agent-context-engineering',
  'agent-planning-system-review',
  'agent-system-improvement',
  'causal-inference-analysis',
  'data-quality-observability-review',
  'decision-optimization-modeling',
  'dependency-version-selection',
  'design-space-exploration',
  'evidence-synthesis',
  'optimization-objective-review',
  'operational-observability-review',
  'probabilistic-forecasting',
  'provenance-system-design',
  'requirements-engineering',
  'security-threat-modeling',
  'semantic-taxonomy-design',
  'structured-deliberation',
  'system-dynamics-analysis',
  'user-research-and-discovery',
];

const COMPOSABLE_STANDARDS = [
  'agent-first-development-standard',
  'agent-native-standard',
  'autonomous-execution-standard',
  'ci-admission-standard',
  'ci-runner-capacity-standard',
  'commercial-decision-standard',
  'decision-quality-standard',
  'delivery-standard',
  'documentation-standard',
  'engineering-standard',
  'enterprise-control-plane-standard',
  'enterprise-profile-standard',
  'frontier-verification-standard',
  'incident-standard',
  'instruction-evolution-standard',
  'parallel-change-integration-standard',
  'project-manifest-standard',
  'prompt-architecture',
  'repo-adoption-standard',
  'self-feeding-agent-loop-standard',
  'source-authoring-standard',
  'specification-control-plane-standard',
  'work-coordination-standard',
];

function skill(name) {
  return readFileSync(new URL(`../skills/${name}/SKILL.md`, import.meta.url), 'utf8');
}

test('independently requested method artifacts remain first-class native Skills', () => {
  for (const name of METHOD_PACKAGES) {
    const markdown = skill(name);
    assert.match(markdown, /^description: .*\bUse (?:when|for)\b/im, name);
    assert.match(markdown, /\bDo not use\b/i, name);
    assert.match(markdown, /## (?:Output(?: contract)?|Artifact)\b/i, name);
  }
});

test('standards compose into the primary artifact instead of emitting reports per injection', () => {
  for (const name of COMPOSABLE_STANDARDS) {
    const markdown = skill(name);
    assert.match(markdown, /## Composition and output\b/, name);
    assert.match(markdown, /Do not emit a separate per-standard compliance\s+report/i, name);
  }
});

test('evaluation contract exercises native compound injection without inventing a router', () => {
  const markdown = skill('skill-eval-designer');
  assert.match(markdown, /runtime auto-injection/i);
  assert.match(markdown, /do not build\s+a\s+meta-router/i);
  assert.match(markdown, /one semantic\s+owner per artifact/i);
});

test('authored injection boundary cases name valid Skills and one owner per artifact', () => {
  assert.ok(INJECTION_CASES.length >= 10);
  assert.equal(new Set(INJECTION_CASES.map(({ id }) => id)).size, INJECTION_CASES.length);
  const allowedKinds = new Set(['positive', 'near-neighbour', 'abstention', 'compound']);
  const seenKinds = new Set();

  for (const fixture of INJECTION_CASES) {
    assert.ok(allowedKinds.has(fixture.kind), fixture.id);
    seenKinds.add(fixture.kind);
    assert.ok(fixture.prompt.length > 10, fixture.id);
    assert.equal(new Set(fixture.expectedSkills).size, fixture.expectedSkills.length, fixture.id);
    for (const name of fixture.expectedSkills) skill(name);
    for (const name of fixture.expectedSkills) {
      assert.ok(!fixture.prompt.toLowerCase().includes(name.toLowerCase()), `${fixture.id}: leaked Skill ID ${name}`);
    }
    const owners = fixture.artifacts.map(({ owner }) => owner);
    const artifacts = fixture.artifacts.map(({ artifact }) => artifact);
    assert.equal(new Set(artifacts).size, artifacts.length, `${fixture.id}: duplicate artifact`);
    for (const owner of owners) assert.ok(fixture.expectedSkills.includes(owner), `${fixture.id}: ${owner}`);
    if (fixture.nearNeighbourOf) {
      skill(fixture.nearNeighbourOf);
      assert.equal(fixture.kind, 'near-neighbour', fixture.id);
      assert.ok(!fixture.expectedSkills.includes(fixture.nearNeighbourOf), `${fixture.id}: neighbour selected target`);
    }
    if (fixture.tags) assert.equal(new Set(fixture.tags).size, fixture.tags.length, `${fixture.id}: tags`);
    if (fixture.forbidden) assert.ok(fixture.forbidden.length > 0, `${fixture.id}: forbidden`);
    if (fixture.coverageFor) {
      assert.equal(new Set(fixture.coverageFor).size, fixture.coverageFor.length, `${fixture.id}: coverageFor`);
      for (const name of fixture.coverageFor) skill(name);
    }
  }

  assert.deepEqual([...seenKinds].sort(), [...allowedKinds].sort());
});

test('new observability routes have varied positive and near-neighbour contracts', () => {
  for (const target of ['operational-observability-review', 'data-quality-observability-review']) {
    const positives = INJECTION_CASES.filter(({ expectedSkills, kind }) =>
      expectedSkills.includes(target) && ['positive', 'compound'].includes(kind));
    const negatives = INJECTION_CASES.filter(({ nearNeighbourOf }) => nearNeighbourOf === target);
    const relevant = INJECTION_CASES.filter(({ expectedSkills, nearNeighbourOf, coverageFor = [] }) =>
      expectedSkills.includes(target) || nearNeighbourOf === target || coverageFor.includes(target));
    assert.ok(positives.length >= 5, `${target}: insufficient positives`);
    assert.ok(negatives.length >= 5, `${target}: insufficient near-neighbours`);
    for (const tag of ['multilingual', 'ambiguous', 'correction', 'adversarial', 'misleading-keyword']) {
      assert.ok(relevant.some(({ tags = [] }) => tags.includes(tag)), `${target}: missing ${tag}`);
    }
    assert.ok(relevant.some(({ kind, expectedSkills }) => kind === 'compound' && expectedSkills.includes(target)),
      `${target}: missing compound`);
    assert.ok(relevant.some(({ kind, coverageFor = [] }) => kind === 'abstention' && coverageFor.includes(target)),
      `${target}: missing abstention`);
  }
});

test('observability floor separates protected evidence from intentional external projections', () => {
  const constitution = readFileSync(new URL('../runtime/constitution.md', import.meta.url), 'utf8');
  const engineering = readFileSync(
    new URL('../skills/engineering-standard/references/binding-predicates.md', import.meta.url),
    'utf8',
  );
  const operational = skill('operational-observability-review');

  assert.match(constitution, /Material runtime, data, and effect paths emit/i);
  assert.match(constitution, /distinguish unknown from healthy/i);
  assert.match(constitution, /raw internal\/operator telemetry/i);
  assert.match(constitution, /protected evidence/i);
  assert.match(constitution, /audience-scoped, allowlisted\s+minimum/i);
  assert.match(constitution, /Customer-owned telemetry[\s\S]*tenant-authorized product data/i);
  assert.match(constitution, /observability never authorizes unrelated disclosure/i);
  assert.match(engineering, /eng-observe-03/);
  assert.match(engineering, /eng-observe-04/);
  assert.match(operational, /Legitimate customer-visible operational facts/i);
  assert.match(operational, /negative leakage tests/i);
});

test('portable work semantics and the Enact adapter stay separate', () => {
  const portable = readFileSync(
    new URL('../skills/work-coordination-standard/references/full-standard.md', import.meta.url),
    'utf8',
  );
  const adapter = skill('enact-work-coordination');
  assert.doesNotMatch(portable, /Enact|Sylphx|work\.start|fleet\.activity/);
  assert.match(adapter, /Enact/);
  assert.match(adapter, /work-coordination-standard/);
});

test('dependency-selection routing cases use natural requests and a bounded neighbour', () => {
  const cases = INJECTION_CASES.filter(({ id }) => id.startsWith('dependency-version-selection-'));
  assert.ok(cases.length >= 3);
  assert.ok(cases.some(({ expectedSkills }) => expectedSkills.includes('dependency-version-selection')));
  assert.ok(cases.some(({ expectedSkills }) => !expectedSkills.includes('dependency-version-selection')));
  for (const fixture of cases) {
    assert.doesNotMatch(fixture.prompt, /model memory|live npm registry|dependency-version-selection/i);
  }
});

test('architecture routing cases keep one owner and reject docs-only terminals', () => {
  const cases = INJECTION_CASES.filter(({ id }) => id.startsWith('architecture-'));
  assert.ok(cases.length >= 3);
  const positive = cases.find(({ id }) => id === 'architecture-migration-positive');
  assert.deepEqual(positive.expectedSkills, ['engineering-standard']);
  const multi = cases.find(({ id }) => id === 'architecture-migration-multi-repo');
  assert.ok(multi.expectedSkills.includes('multi-repository-migration'));
  assert.ok(multi.expectedSkills.includes('engineering-standard'));
  const docsOnly = cases.find(({ id }) => id === 'architecture-neighbour-docs-only');
  assert.ok(!docsOnly.expectedSkills.includes('engineering-standard'));
  assert.ok(!docsOnly.expectedSkills.includes('multi-repository-migration'));
  for (const fixture of cases) {
    assert.doesNotMatch(fixture.prompt, /engineering-standard|multi-repository-migration/i);
  }
  const architecture = readFileSync(
    new URL('../skills/engineering-standard/references/capability-first-architecture.md', import.meta.url),
    'utf8',
  );
  assert.match(architecture, /Migration terminal/i);
  assert.match(architecture, /docs-only|Metadata-only/i);
});

test('engineering defect repair requires faithful red-to-green causal evidence without universal unit-test ceremony', () => {
  const skillEntry = skill('engineering-standard');
  const method = readFileSync(
    new URL('../skills/engineering-standard/references/reproduction-driven-engineering.md', import.meta.url),
    'utf8',
  );
  const predicates = readFileSync(
    new URL('../skills/engineering-standard/references/binding-predicates.md', import.meta.url),
    'utf8',
  );

  assert.match(skillEntry, /Reproduction-driven engineering/);
  assert.match(method, /exact unmodified baseline/i);
  assert.match(method, /same\s+oracle MUST pass/i);
  assert.match(method, /Discriminate causes/i);
  assert.match(method, /containment is not called a fix/i);
  assert.match(method, /do not invent a unit test for ceremony/i);
  assert.match(method, /oracle execution bundle/i);
  assert.match(method, /two linked proofs/i);
  assert.match(method, /counterfactual candidate/i);
  assert.match(method, /Never retry until one convenient green sample/i);
  assert.match(method, /authorized isolated\s+environment/i);
  assert.match(method, /Unacceptable green results/i);
  assert.match(predicates, /eng-debug-01/);
  assert.match(predicates, /eng-regress-01/);

  const routineFix = INJECTION_CASES.find(({ id }) => id === 'defect-repair-positive');
  assert.deepEqual(routineFix.expectedSkills, ['engineering-standard']);
  const activeIncident = INJECTION_CASES.find(({ id }) => id === 'defect-repair-active-incident-compound');
  assert.deepEqual(activeIncident.expectedSkills, ['incident-standard', 'engineering-standard']);
  const analysisOnly = INJECTION_CASES.find(({ id }) => id === 'defect-repair-neighbour-analysis-only');
  assert.deepEqual(analysisOnly.expectedSkills, ['critical-analysis']);
  assert.equal(analysisOnly.nearNeighbourOf, 'engineering-standard');
});
