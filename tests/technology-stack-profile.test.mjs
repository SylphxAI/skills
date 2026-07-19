import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  validateActiveProfileCollisions,
  validateExceptionRequiredFields,
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

function rulesByKind(kind, document = profile) {
  return document.assertions.rules.filter((rule) => rule.kind === kind);
}

function selectorOutcome(facts, document = profile) {
  const assertion = rulesByKind('selector-outcome', document)[0];
  const conditionStates = document.selector.matchAll.map((condition) => {
    if (!(condition.fact in facts)) return 'unknown';
    return condition.values.includes(facts[condition.fact]) ? 'matched' : 'unmatched';
  });
  const aggregate = assertion.precedence.find((state) => conditionStates.includes(state));
  return assertion.outcomes[aggregate];
}

function evaluateComponents(facts, components, document = profile) {
  const selected = selectorOutcome(facts, document);
  if (selected !== 'selected') return selected;
  const completion = rulesByKind('completion-denominator', document)[0];
  assert.deepEqual(sorted(completion.denominator), sorted([
    'declared-component-role',
    'declared-owned-effect',
  ]));
  if (Object.keys(components).length === 0) return completion.emptyComponentSetOutcome;
  for (const component of Object.values(components)) {
    if (!component.role || !component.implementation || !Array.isArray(component.ownedEffects)) {
      return completion.missingFactOutcome;
    }
    const matching = rulesByKind('role-requirement', document)
      .filter((rule) => rule.roles.includes(component.role));
    if (matching.length !== 1) return completion.ambiguousRuleOutcome;
    const rule = matching[0];
    if (component.implementation !== rule.requiredImplementation) return rule.implementationMismatchOutcome;
    const classifier = document.assertions.rules.find((candidate) => candidate.id === rule.effectClassificationId);
    for (const effect of component.ownedEffects) {
      const classifications = classifier.classes.filter((effectClass) => effectClass.effects.includes(effect));
      if (classifications.length === 0) return classifier.unknownOutcome;
      if (classifications.length > 1) return classifier.ambiguousOutcome;
      const allowances = rule.effectClassAllowances
        .filter((allowance) => allowance.effectClass === classifications[0].id);
      if (allowances.length !== 1) return rule.unmappedEffectClassOutcome;
      if (allowances[0].disposition === 'forbidden') return rule.forbiddenEffectOutcome;
    }
  }
  return completion.successOutcome;
}

function permutations(values) {
  if (values.length <= 1) return [values];
  return values.flatMap((value, index) => permutations([
    ...values.slice(0, index),
    ...values.slice(index + 1),
  ]).map((rest) => [value, ...rest]));
}

const matchingFacts = {
  organization: 'SylphxAI',
  'repository.lifecycle': 'production',
  'task.surface': 'product-code',
};

test('technology profile binds the canonical role and effect boundary', () => {
  assert.equal(profile.schemaVersion, 2);
  assert.equal(profile.profile.revision, '2026-07-19.2');
  assert.equal(profile.profile.predecessor, undefined);
  assert.equal(profile.retirement.predecessor, 'technology-stack-profile@2026-07-18.3');
  const defaults = new Map(profile.defaults.map((item) => [item.key, item]));
  assert.deepEqual(defaults.get('engineering.language.backend-required-technology').assertionIds, ['backend-role-requirement']);
  assert.deepEqual(defaults.get('engineering.language.web-required-technology').assertionIds, ['web-role-requirement']);
  assert.deepEqual(defaults.get('engineering.language.completion-measure').assertionIds, ['role-effect-completion']);
  const [backendRule] = rulesByKind('role-requirement').filter((rule) => rule.requiredImplementation === 'rust');
  const [webRule] = rulesByKind('role-requirement').filter((rule) => rule.requiredImplementation === 'typescript-bun-next');
  const [effectClassification] = rulesByKind('effect-classification');
  const effectClasses = new Map(effectClassification.classes.map((effectClass) => [effectClass.id, effectClass.effects]));
  assert.deepEqual(sorted(backendRule.roles), sorted(backendRoles));
  assert.deepEqual(backendRule.effectClassAllowances, [
    { effectClass: 'backend-effect', disposition: 'allowed' },
    { effectClass: 'typescript-backend-fallback', disposition: 'forbidden' },
  ]);
  assert.deepEqual(sorted(webRule.roles), sorted(webRoles));
  assert.deepEqual(webRule.effectClassAllowances, [
    { effectClass: 'backend-effect', disposition: 'forbidden' },
    { effectClass: 'typescript-backend-fallback', disposition: 'forbidden' },
  ]);
  assert.deepEqual(sorted(effectClasses.get('backend-effect')), sorted(forbiddenEffects.filter((effect) => effect !== 'typescript-backend-fallback')));
  assert.deepEqual(effectClasses.get('typescript-backend-fallback'), ['typescript-backend-fallback']);
  assert.deepEqual(profile.exceptionPolicy.exceptableDefaults, []);
  assert.equal(profile.selector.unknownFactPolicy, 'fail-closed');
  assert.equal(profile.assertions.digestBinding, 'profile-content-digest');
  assert.deepEqual(profile.assertions.factModel, {
    componentCollectionPointer: '/architecture/components',
    roleField: 'role',
    implementationField: 'implementation',
    ownedEffectsField: 'ownedEffects',
  });
});

test('digest-bound assertions execute selector, role, effect, and completion policy without prose or key dispatch', () => {
  assert.equal(selectorOutcome(matchingFacts), 'selected');
  assert.equal(selectorOutcome({ ...matchingFacts, organization: 'unselected' }), 'not-selected');
  const missingOrganization = structuredClone(matchingFacts);
  delete missingOrganization.organization;
  assert.equal(selectorOutcome(missingOrganization), 'blocked');
  assert.equal(evaluateComponents(matchingFacts, {}), 'blocked');

  assert.equal(evaluateComponents(matchingFacts, {
    api: { role: 'api', implementation: 'rust', ownedEffects: ['backend-database-mutation'] },
    web: { role: 'product-web', implementation: 'typescript-bun-next', ownedEffects: [] },
  }), 'conforming');
  assert.equal(evaluateComponents(matchingFacts, {
    api: { role: 'api', implementation: 'typescript-bun-next', ownedEffects: [] },
  }), 'violation');
  assert.equal(evaluateComponents(matchingFacts, {
    web: {
      role: 'product-web',
      implementation: 'typescript-bun-next',
      ownedEffects: ['charge-customer'],
    },
  }), 'blocked');
  assert.equal(evaluateComponents(matchingFacts, {
    web: {
      role: 'server-rendered-web',
      implementation: 'typescript-bun-next',
      ownedEffects: ['backend-authorization-decision'],
    },
  }), 'violation');
  assert.equal(evaluateComponents(matchingFacts, {
    unknown: { role: 'unclassified-service', implementation: 'rust', ownedEffects: [] },
  }), 'blocked');

  const ambiguousEffect = structuredClone(profile);
  ambiguousEffect.assertions.rules
    .find((rule) => rule.kind === 'effect-classification')
    .classes.find((effectClass) => effectClass.id === 'typescript-backend-fallback')
    .effects.push('backend-business-effect');
  assert.equal(evaluateComponents(matchingFacts, {
    api: { role: 'api', implementation: 'rust', ownedEffects: ['backend-business-effect'] },
  }, ambiguousEffect), 'blocked');
});

test('match-all selector aggregation is order-independent for mixed unknown and unmatched facts', () => {
  const mixedFacts = {
    'repository.lifecycle': 'archived',
    'task.surface': 'product-code',
  };
  for (const orderedConditions of permutations(profile.selector.matchAll)) {
    const permuted = structuredClone(profile);
    permuted.selector.matchAll = orderedConditions;
    assert.equal(selectorOutcome(mixedFacts, permuted), 'not-selected');
  }
  const assertion = rulesByKind('selector-outcome')[0];
  assert.equal(assertion.aggregation, 'match-all');
  assert.deepEqual(assertion.precedence, ['conflict', 'unmatched', 'unknown', 'matched']);
});

test('technology profile selector uses only canonical operational project lifecycles', () => {
  const selectors = new Map(profile.selector.matchAll.map((item) => [item.fact, item]));
  assert.deepEqual(sorted([...selectors.keys()]), sorted([
    'organization',
    'repository.lifecycle',
    'task.surface',
  ]));
  assert.deepEqual(sorted(selectors.get('organization').values), sorted([
    'Cubeage', 'EpiowAI', 'OzyrixLtd', 'SylphxAI', 'TseFamily', 'shtse8',
  ]));
  assert.deepEqual(sorted(selectors.get('task.surface').values), sorted([
    'language-boundary-audit', 'migration-completion', 'product-code', 'runtime-implementation',
  ]));
  const selector = selectors.get('repository.lifecycle');
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
  const missingAssertions = structuredClone(profile);
  delete missingAssertions.assertions;
  assert.equal(validate(missingAssertions), false);
  const permissiveUnknown = structuredClone(profile);
  permissiveUnknown.assertions.rules.find((rule) => rule.kind === 'selector-outcome').outcomes.unknown = 'selected';
  assert.equal(validate(permissiveUnknown), false);
  const incompleteExceptionVocabulary = structuredClone(profile);
  incompleteExceptionVocabulary.exceptionPolicy.requiredFields = incompleteExceptionVocabulary.exceptionPolicy.requiredFields
    .filter((field) => field !== 'owner');
  assert.equal(validate(incompleteExceptionVocabulary), false);
  const exceptionVocabularyErrors = [];
  validateExceptionRequiredFields(
    incompleteExceptionVocabulary,
    profileSchema,
    'technology-stack-profile',
    exceptionVocabularyErrors,
  );
  assert.equal(exceptionVocabularyErrors.length, 1);
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

  const overlappingRole = structuredClone(profile);
  overlappingRole.assertions.rules.find((rule) => rule.id === 'web-role-requirement').roles.push('api');
  const overlappingRoleErrors = [];
  validateTechnologyStackProfile(overlappingRole, overlappingRoleErrors, projectSchema);
  assert.equal(overlappingRoleErrors.some((finding) => finding.includes('more than one role requirement')), true);

  const overlappingEffect = structuredClone(profile);
  overlappingEffect.assertions.rules
    .find((rule) => rule.kind === 'effect-classification')
    .classes.find((effectClass) => effectClass.id === 'typescript-backend-fallback')
    .effects.push('backend-business-effect');
  const overlappingEffectErrors = [];
  validateTechnologyStackProfile(overlappingEffect, overlappingEffectErrors, projectSchema);
  assert.equal(overlappingEffectErrors.some((finding) => finding.includes('more than one effect classification')), true);

  const missingEffectAllowance = structuredClone(profile);
  missingEffectAllowance.assertions.rules
    .find((rule) => rule.id === 'web-role-requirement')
    .effectClassAllowances.pop();
  const missingEffectAllowanceErrors = [];
  validateTechnologyStackProfile(missingEffectAllowance, missingEffectAllowanceErrors, projectSchema);
  assert.equal(missingEffectAllowanceErrors.some((finding) => finding.includes('every effect class exactly once')), true);

  const missingReference = structuredClone(profile);
  missingReference.defaults[0].assertionIds = ['missing-rule'];
  const missingReferenceErrors = [];
  validateTechnologyStackProfile(missingReference, missingReferenceErrors, projectSchema);
  assert.equal(missingReferenceErrors.some((finding) => finding.includes('unknown assertion')), true);

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
