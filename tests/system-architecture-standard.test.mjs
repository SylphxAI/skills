import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const skill = read('../skills/engineering-standard/SKILL.md');
const systemArchitecture = read('../skills/engineering-standard/references/system-architecture.md');
const predicates = read('../skills/engineering-standard/references/binding-predicates.md');
const applicability = read('../skills/engineering-standard/references/architecture-pattern-applicability.md');
const languageMappings = read('../skills/engineering-standard/references/capability-first-language-mappings.md');
const projectSchema = JSON.parse(read('../skills/project-manifest-standard/references/project-manifest.schema.json'));

test('engineering standard exposes one complete system architecture owner', () => {
  assert.match(skill, /\[Complete system architecture\]\(references\/system-architecture\.md\)/);
  for (const boundary of [
    'Capability / bounded context',
    'Module / package / crate',
    'Contract',
    'State authority',
    'Process',
    'Cell',
    'Service / deployment',
    'Trust boundary',
  ]) {
    assert.match(systemArchitecture, new RegExp(boundary.replaceAll('/', '\\/')));
  }
  for (const ruleId of [
    'eng-boundary-01',
    'eng-modulegraph-01',
    'eng-stateclass-01',
    'eng-stateless-01',
    'eng-staticstability-01',
    'eng-cell-01',
    'eng-interop-01',
    'eng-extension-01',
  ]) {
    assert.ok(predicates.includes(`\`${ruleId}\``), ruleId);
  }
});

test('heavy system patterns remain predicate-gated', () => {
  assert.match(applicability, /Cell-based Architecture \| Conditional/);
  assert.match(applicability, /Control\/Data-plane Static Stability \| Conditional/);
  assert.match(applicability, /WebAssembly Component Model \| Conditional/);
  assert.match(systemArchitecture, /Static module composition[\s\S]*\*\*Default\*\*/);
  assert.match(systemArchitecture, /Cell architecture is not the default for ordinary projects/);
  assert.match(systemArchitecture, /Do not pursue "everything stateless\."/);
});

test('language mappings use native semantic module-graph enforcement', () => {
  assert.match(languageMappings, /cargo metadata/);
  assert.match(languageMappings, /package `exports`, TypeScript project\/package boundaries/);
  assert.match(languageMappings, /resolved import[\s\S]*graph/);
  assert.match(languageMappings, /Dart library privacy/);
  assert.match(languageMappings, /do not grep `use` statements/);
});

test('project manifest accepts typed system architecture facts and rejects invented modes', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
  ajv.addSchema(projectSchema);
  const ref = (definition) => ajv.compile({
    $ref: `${projectSchema.$id}#/$defs/${definition}`,
  });

  const validateModuleGraph = ref('moduleGraphFact');
  assert.equal(validateModuleGraph({
    cyclePolicy: 'forbidden',
    internalAccessPolicy: 'public-api-only',
    allowedEdges: [{ from: 'interfaces', to: 'application' }],
    enforcementCommands: ['cargo test -p architecture-tests'],
  }), true, JSON.stringify(validateModuleGraph.errors));
  assert.equal(validateModuleGraph({
    cyclePolicy: 'allowed',
    internalAccessPolicy: 'public-api-only',
    allowedEdges: [],
    enforcementCommands: ['npm test'],
  }), false);

  const validateState = ref('stateAuthorityFact');
  const state = {
    class: 'authoritative-durable',
    owner: 'billing',
    writeAuthority: 'billing ledger transaction',
    consistency: 'serializable per account',
    partitionKey: 'account_id',
    recovery: 'point-in-time restore and ledger replay',
    freshness: 'transactional',
    retention: 'finance policy',
    trustBoundary: 'billing-service',
  };
  assert.equal(validateState(state), true, JSON.stringify(validateState.errors));
  assert.equal(validateState({ ...state, class: 'important-state' }), false);

  const validateAvailability = ref('availabilityFact');
  assert.equal(validateAvailability({
    mode: 'cell-based',
    partitionKey: 'tenant_id',
    controlDataPlane: 'statically-stable',
    decisionRef: 'docs/adr/cell-topology.md',
  }), true, JSON.stringify(validateAvailability.errors));
  assert.equal(validateAvailability({
    mode: 'cell-based',
    partitionKey: null,
    controlDataPlane: 'statically-stable',
    decisionRef: 'docs/adr/cell-topology.md',
  }), false);

  const validateExtension = ref('extensionBoundaryFact');
  assert.equal(validateExtension({
    id: 'customer-plugin',
    mode: 'wasm-component',
    contract: 'wit/customer-plugin.wit',
    trustClass: 'untrusted-customer-code',
    decisionRef: 'docs/adr/plugin-boundary.md',
  }), true, JSON.stringify(validateExtension.errors));
  assert.equal(validateExtension({
    id: 'customer-plugin',
    mode: 'dynamic-registry',
    contract: 'runtime reflection',
    trustClass: 'unknown',
    decisionRef: 'none',
  }), false);
});
