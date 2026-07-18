import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  validateActiveProfileCollisions,
  validateTechnologyStackProfile,
  validateProfileLifecycleMetadata,
} from '../scripts/check.mjs';

const profile = JSON.parse(readFileSync(new URL('../skills/technology-stack-profile/references/profile.json', import.meta.url), 'utf8'));
const profileSchema = JSON.parse(readFileSync(new URL('../skills/technology-stack-profile/references/enterprise-profile.schema.json', import.meta.url), 'utf8'));
const projectSchema = JSON.parse(readFileSync(new URL('../skills/project-manifest-standard/references/project-manifest.schema.json', import.meta.url), 'utf8'));

const backendRoles = [
  'api', 'backend-service', 'background-job', 'controller', 'critical-path', 'gateway',
  'queue-consumer', 'queue-producer', 'runtime', 'storage', 'worker',
];
const webRoles = ['browser', 'product-web', 'server-rendered-web', 'ui-orchestration'];
const forbiddenEffects = [
  'backend-authorization-decision', 'backend-business-effect', 'backend-database-mutation',
  'durable-queue-consume', 'durable-queue-publish', 'typescript-backend-fallback',
];

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sorted(values) {
  return [...values].sort();
}

test('technology profile binds the canonical role and effect boundary', () => {
  assert.equal(profile.profile.revision, '2026-07-18.3');
  assert.equal(profile.profile.predecessor, undefined);
  assert.equal(profile.retirement.predecessor, 'technology-stack-profile@2026-07-18.2');
  const defaults = new Map(profile.defaults.map((item) => [item.key, item]));
  assert.equal(defaults.get('engineering.language.backend-required-technology').value, 'rust');
  assert.deepEqual(sorted(defaults.get('engineering.language.backend-required-technology').appliesToRoles), sorted(backendRoles));
  assert.equal(defaults.get('engineering.language.web-required-technology').value, 'typescript-bun-next');
  assert.deepEqual(sorted(defaults.get('engineering.language.web-required-technology').appliesToRoles), sorted(webRoles));
  assert.equal(defaults.get('engineering.language.completion-measure').value, 'service-role-and-effect-coverage');
  assert.deepEqual(sorted(defaults.get('engineering.language.completion-measure').appliesToRoles), sorted([...backendRoles, ...webRoles]));
  assert.deepEqual(sorted(profile.forbiddenEffectsForWeb), sorted(forbiddenEffects));
  assert.deepEqual(profile.exceptionPolicy.exceptableDefaults, []);
  assert.equal(profile.selector.unknownFactPolicy, 'fail-closed');
});

test('technology profile selector uses only canonical operational project lifecycles', () => {
  const selector = profile.selector.matchAll.find((item) => item.fact === 'repository.lifecycle');
  const canonical = projectSchema.properties.project.properties.lifecycle.enum;
  assert.deepEqual(sorted(selector.values), sorted(['active', 'commercial', 'incubating', 'maintenance', 'production']));
  assert.equal(selector.values.every((value) => canonical.includes(value)), true);
  assert.equal(selector.values.includes('archived'), false);
  assert.equal(selector.values.includes('deprecated'), false);
});

test('project component facts bind exact profile identity without copying policy vocabulary', () => {
  const architecture = projectSchema.properties.architecture;
  const components = architecture.properties.components;
  const bindings = architecture.properties.profileBindings;
  assert.equal(components.minProperties, 1);
  assert.equal(components.propertyNames.$ref, '#/$defs/id');
  assert.equal(components.additionalProperties.$ref, '#/$defs/componentFact');
  assert.equal(bindings.minProperties, 1);
  assert.equal(bindings.propertyNames.$ref, '#/$defs/id');
  assert.equal(bindings.additionalProperties.$ref, '#/$defs/profileBinding');
  assert.deepEqual(sorted(projectSchema.$defs.profileBinding.required), sorted(['revision', 'contentDigest']));
  const fact = projectSchema.$defs.componentFact;
  assert.equal(fact.additionalProperties, false);
  assert.deepEqual(fact.required, ['role', 'implementation', 'backendOwner', 'ownedEffects']);
  assert.equal(fact.properties.role.$ref, '#/$defs/id');
  assert.equal(fact.properties.implementation.$ref, '#/$defs/id');
  assert.equal(fact.properties.ownedEffects.items.$ref, '#/$defs/id');
  assert.equal('production' in fact.properties, false);
  assert.equal('componentId' in fact.properties, false);
  assert.equal('forbiddenEffectsForWeb' in fact.properties, false);
  assert.equal('authorityPolicy' in fact.properties, false);
});

test('profile binding and component maps reject empty or unbound projections', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
  const validateBindings = ajv.compile({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $defs: projectSchema.$defs,
    ...projectSchema.properties.architecture.properties.profileBindings,
  });
  const validBindings = {
    [profile.profile.id]: {
      revision: profile.profile.revision,
      contentDigest: profile.profile.contentDigest,
    },
  };
  assert.equal(validateBindings(validBindings), true, JSON.stringify(validateBindings.errors));
  assert.equal(validateBindings({}), false);
  const staleUnbound = structuredClone(validBindings);
  delete staleUnbound[profile.profile.id].contentDigest;
  assert.equal(validateBindings(staleUnbound), false);

  const validateComponents = ajv.compile({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $defs: projectSchema.$defs,
    ...projectSchema.properties.architecture.properties.components,
  });
  assert.equal(validateComponents({
    'product-web': {
      role: 'product-web',
      implementation: 'typescript-bun-next',
      backendOwner: { repository: 'SylphxAI/platform', componentId: 'api' },
      ownedEffects: [],
    },
  }), true, JSON.stringify(validateComponents.errors));
  assert.equal(validateComponents({}), false);
});

test('schema and active-profile admission reject authority-state mutations', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
  addFormats(ajv);
  const validate = ajv.compile(profileSchema);
  assert.equal(validate(profile), true, JSON.stringify(validate.errors));
  const missingEffects = structuredClone(profile);
  delete missingEffects.forbiddenEffectsForWeb;
  assert.equal(validate(missingEffects), false);
  const illegalAuthority = structuredClone(profile);
  illegalAuthority.profile.authorityClass = 'local-policy-fork';
  assert.equal(validate(illegalAuthority), false);
  const candidate = structuredClone(profile);
  candidate.profile.lifecycle = 'candidate';
  assert.equal(validate(candidate), true);
  const lifecycleErrors = [];
  validateProfileLifecycleMetadata(candidate, 'candidate-profile', lifecycleErrors, '2026-07-18');
  assert.deepEqual(lifecycleErrors, []);
  const bindingErrors = [];
  validateTechnologyStackProfile(candidate, bindingErrors, projectSchema);
  assert.equal(bindingErrors.some((finding) => finding.includes('must be active')), true);
});

test('technology profile structural gate and active-profile collision check fail closed', () => {
  const structuralErrors = [];
  validateTechnologyStackProfile(profile, structuralErrors, projectSchema);
  assert.deepEqual(structuralErrors, []);

  const overlap = structuredClone(profile);
  overlap.profile.id = 'overlapping-profile';
  const collisionErrors = [];
  validateActiveProfileCollisions([
    { folder: 'technology-stack-profile', document: profile },
    { folder: 'overlapping-profile', document: overlap },
  ], collisionErrors);
  assert.equal(collisionErrors.length, 1);

  overlap.selector.matchAll.find((item) => item.fact === 'organization').values = ['non-overlap'];
  const disjointErrors = [];
  validateActiveProfileCollisions([
    { folder: 'technology-stack-profile', document: profile },
    { folder: 'overlapping-profile', document: overlap },
  ], disjointErrors);
  assert.deepEqual(disjointErrors, []);
});

test('technology profile digest covers the canonical profile document', () => {
  const candidate = structuredClone(profile);
  delete candidate.profile.contentDigest;
  const digest = `sha256:${createHash('sha256').update(stableJson(candidate)).digest('hex')}`;
  assert.equal(profile.profile.contentDigest, digest);
});
