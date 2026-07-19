#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { catalogBytes, parseFrontmatter, repositoryRoot } from './build-catalog.mjs';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
];
const REMOVED_BOUNDARIES = ['admissions', 'benchmarks', 'catalog', 'evals', 'registry', 'retired'];
function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files.sort();
}

function validateLocalLinks(markdown, file, errors) {
  const pattern = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of markdown.matchAll(pattern)) {
    const target = match[1].trim().replace(/^<|>$/g, '');
    if (!target || /^(?:https?:|mailto:|#)/i.test(target)) continue;
    const withoutAnchor = target.split('#')[0];
    if (!withoutAnchor) continue;
    const absolute = path.resolve(path.dirname(file), decodeURIComponent(withoutAnchor));
    if (!existsSync(absolute)) errors.push(`${path.relative(repositoryRoot, file)}: broken link ${target}`);
  }
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sameMembers(actual, expected) {
  return Array.isArray(actual)
    && actual.length === expected.length
    && actual.every((value) => expected.includes(value))
    && new Set(actual).size === actual.length;
}

export function validateTechnologyStackProfile(document, errors, projectSchemaDocument = null) {
  const location = 'skills/technology-stack-profile/references/profile.json';
  if (document.profile?.lifecycle !== 'active'
      || document.profile?.authorityClass !== 'governance-constraint') {
    errors.push(`${location}: required technology profile must be active governance-constraint`);
  }
  const selectors = document.selector?.matchAll || [];
  const selectorByFact = new Map(selectors.map((selector) => [selector.fact, selector]));
  if (selectorByFact.size !== selectors.length) {
    errors.push(`${location}: selector facts must be unique`);
  }
  if (document.selector?.unknownFactPolicy !== 'fail-closed') {
    errors.push(`${location}: unknown selector facts must fail closed`);
  }

  const rules = document.assertions?.rules || [];
  const ruleById = new Map(rules.map((rule) => [rule.id, rule]));
  if (ruleById.size !== rules.length) {
    errors.push(`${location}: assertion ids must be unique`);
  }
  const selectorRules = rules.filter((rule) => rule.kind === 'selector-outcome');
  const effectClassificationRules = rules.filter((rule) => rule.kind === 'effect-classification');
  const roleRules = rules.filter((rule) => rule.kind === 'role-requirement');
  const completionRules = rules.filter((rule) => rule.kind === 'completion-denominator');
  if (selectorRules.length !== 1
      || effectClassificationRules.length !== 1
      || roleRules.length < 1
      || completionRules.length !== 1) {
    errors.push(`${location}: assertions require one selector outcome, one effect classification, one or more role requirements, and one completion denominator`);
  }
  const selectorRule = selectorRules[0] || {};
  const selectorOutcomes = selectorRule.outcomes;
  if (selectorOutcomes?.matched !== 'selected'
      || selectorOutcomes?.unmatched !== 'not-selected'
      || selectorOutcomes?.unknown !== 'blocked'
      || selectorOutcomes?.conflict !== 'blocked') {
    errors.push(`${location}: selector outcome assertion must fail closed`);
  }
  if (selectorRule.aggregation !== 'match-all'
      || !sameMembers(selectorRule.precedence, Object.keys(selectorOutcomes || {}))) {
    errors.push(`${location}: selector aggregation must declare total deterministic precedence`);
  }

  const effectClassification = effectClassificationRules[0] || {};
  const effectClasses = effectClassification.classes || [];
  const effectClassById = new Map(effectClasses.map((effectClass) => [effectClass.id, effectClass]));
  if (effectClassById.size !== effectClasses.length) {
    errors.push(`${location}: effect classification ids must be unique`);
  }
  const effectOwners = new Map();
  for (const effectClass of effectClasses) {
    for (const effect of effectClass.effects || []) {
      if (effectOwners.has(effect)) {
        errors.push(`${location}: effect ${effect} is claimed by more than one effect classification`);
      } else {
        effectOwners.set(effect, effectClass.id);
      }
    }
  }
  if (effectClassification.noMatchDisposition !== 'unknown'
      || effectClassification.multipleMatchDisposition !== 'ambiguous'
      || effectClassification.unknownOutcome !== 'blocked'
      || effectClassification.ambiguousOutcome !== 'blocked') {
    errors.push(`${location}: unknown or ambiguous effects must fail closed`);
  }

  const roleOwners = new Map();
  for (const rule of roleRules) {
    for (const role of rule.roles || []) {
      if (roleOwners.has(role)) {
        errors.push(`${location}: role ${role} is claimed by more than one role requirement`);
      } else {
        roleOwners.set(role, rule.id);
      }
    }
    const classifier = ruleById.get(rule.effectClassificationId);
    if (classifier?.kind !== 'effect-classification') {
      errors.push(`${location}: role requirement ${rule.id} references an unknown effect classification`);
    }
    const allowances = rule.effectClassAllowances || [];
    const allowanceClassIds = allowances.map((allowance) => allowance.effectClass);
    if (!sameMembers(allowanceClassIds, [...effectClassById.keys()])) {
      errors.push(`${location}: role requirement ${rule.id} must classify every effect class exactly once`);
    }
  }

  const defaultKeys = (document.defaults || []).map((item) => item.key);
  const defaultAssertionIds = (document.defaults || []).flatMap((item) => item.assertionIds || []);
  for (const assertionId of defaultAssertionIds) {
    if (!ruleById.has(assertionId)) {
      errors.push(`${location}: default references unknown assertion ${assertionId}`);
    }
  }
  const selectableRuleIds = [...roleRules, ...completionRules].map((rule) => rule.id);
  if (!sameMembers(defaultAssertionIds, selectableRuleIds)) {
    errors.push(`${location}: every role and completion assertion must be referenced exactly once by a default`);
  }
  if (!sameMembers(document.exceptionPolicy?.exceptableDefaults, [])
      || !sameMembers(document.exceptionPolicy?.forbiddenDefaults, defaultKeys)) {
    errors.push(`${location}: every technology default must be non-exceptable`);
  }

  const projectSchemaPath = path.join(
    repositoryRoot,
    'skills',
    'project-manifest-standard',
    'references',
    'project-manifest.schema.json',
  );
  let projectSchema = projectSchemaDocument;
  if (!projectSchema) {
    try {
      projectSchema = JSON.parse(readFileSync(projectSchemaPath, 'utf8'));
    } catch (error) {
      errors.push(`skills/project-manifest-standard/references/project-manifest.schema.json: ${error.message}`);
      return;
    }
  }
  const architecture = projectSchema.properties?.architecture;
  const components = architecture?.properties?.components;
  const profileBindings = architecture?.properties?.profileBindings;
  const componentFact = projectSchema.$defs?.componentFact;
  const profileBinding = projectSchema.$defs?.profileBinding;
  const factModel = document.assertions?.factModel || {};
  const requiredProfileFactFields = [
    factModel.roleField,
    factModel.implementationField,
    factModel.ownedEffectsField,
  ];
  if (components?.minProperties !== 1
      || components?.propertyNames?.$ref !== '#/$defs/id'
      || components?.additionalProperties?.$ref !== '#/$defs/componentFact'
      || profileBindings?.minProperties !== 1
      || profileBindings?.propertyNames?.$ref !== '#/$defs/id'
      || profileBindings?.additionalProperties?.$ref !== '#/$defs/profileBinding'
      || componentFact?.additionalProperties !== false
      || !requiredProfileFactFields.every((field) => componentFact?.required?.includes(field))) {
    errors.push(`${location}: canonical project component facts or exact profile bindings are missing or incomplete`);
  }
  if (factModel.componentCollectionPointer !== '/architecture/components'
      || componentFact?.properties?.[factModel.roleField]?.$ref !== '#/$defs/id'
      || componentFact?.properties?.[factModel.implementationField]?.$ref !== '#/$defs/id'
      || componentFact?.properties?.[factModel.ownedEffectsField]?.items?.$ref !== '#/$defs/id'
      || !sameMembers(profileBinding?.required, ['revision', 'contentDigest'])) {
    errors.push(`${location}: project facts must stay generic while exact profile identity stays bound`);
  }

  const manifestLifecycles = projectSchema.properties?.project?.properties?.lifecycle?.enum || [];
  const selectedLifecycles = selectorByFact.get('repository.lifecycle')?.values || [];
  if (!selectedLifecycles.every((lifecycle) => manifestLifecycles.includes(lifecycle))) {
    errors.push(`${location}: selector uses lifecycle values outside the canonical project manifest`);
  }
}

export function validateProfileLifecycleMetadata(document, folder, errors, today = new Date().toISOString().slice(0, 10)) {
  const lifecycle = document.profile?.lifecycle;
  if (!['governance-constraint', 'selection-default'].includes(document.profile?.authorityClass)) {
    errors.push(`skills/${folder}/references/profile.json: invalid authorityClass`);
  }
  if (lifecycle === 'active' && document.profile?.effectiveOn > today) {
    errors.push(`skills/${folder}/references/profile.json: active profile is not effective yet`);
  }
  if (['candidate', 'active', 'deprecated'].includes(lifecycle) && document.profile?.reviewBy < today) {
    errors.push(`skills/${folder}/references/profile.json: selectable profile review window expired`);
  }
  if (document.exceptionPolicy?.mode !== 'typed-expiring'
      || document.exceptionPolicy?.expiryAction !== 'fail-closed') {
    errors.push(`skills/${folder}/references/profile.json: exception lifecycle must fail closed`);
  }
  if (document.retirement?.retiredRevisionSelectable !== false) {
    errors.push(`skills/${folder}/references/profile.json: retired revisions must never be selectable`);
  }
  if (lifecycle === 'active' && document.retirement?.successor !== null) {
    errors.push(`skills/${folder}/references/profile.json: active profile cannot name an admitted successor`);
  }
  if (lifecycle === 'deprecated' && !document.retirement?.successor) {
    errors.push(`skills/${folder}/references/profile.json: deprecated profile must name its successor`);
  }
}

export function validateExceptionRequiredFields(document, schema, folder, errors) {
  const requiredFieldsSchema = schema.$defs?.exceptionPolicy?.properties?.requiredFields;
  const requiredFieldVocabulary = requiredFieldsSchema?.items?.enum || [];
  if (!requiredFieldVocabulary.length
      || requiredFieldsSchema?.minItems !== requiredFieldVocabulary.length
      || requiredFieldsSchema?.maxItems !== requiredFieldVocabulary.length
      || requiredFieldsSchema?.uniqueItems !== true
      || !sameMembers(document.exceptionPolicy?.requiredFields, requiredFieldVocabulary)) {
    errors.push(`skills/${folder}/references/profile.json: exception required-field vocabulary is incomplete`);
  }
}

function validateMachineProfile(folder, packageRoot, errors, profiles) {
  const profilePath = path.join(packageRoot, 'references', 'profile.json');
  if (!existsSync(profilePath)) return;
  let document;
  try {
    document = JSON.parse(readFileSync(profilePath, 'utf8'));
  } catch (error) {
    errors.push(`skills/${folder}/references/profile.json: ${error.message}`);
    return;
  }

  if (!Number.isSafeInteger(document.schemaVersion)
      || document.schemaVersion < 1
      || document.kind !== 'EnterpriseProfile') {
    errors.push(`skills/${folder}/references/profile.json: unsupported profile contract`);
    return;
  }
  if (document.profile?.id !== folder) errors.push(`skills/${folder}/references/profile.json: profile.id must match folder`);
  if (document.profile?.owner !== 'SylphxAI/skills') errors.push(`skills/${folder}/references/profile.json: owner must be SylphxAI/skills`);
  if (document.profile?.contentDigestScope !== 'canonical-json-excluding:/profile/contentDigest') {
    errors.push(`skills/${folder}/references/profile.json: unsupported digest scope`);
  }
  validateProfileLifecycleMetadata(document, folder, errors);

  const digestCandidate = structuredClone(document);
  delete digestCandidate.profile.contentDigest;
  const expectedDigest = `sha256:${createHash('sha256').update(stableJson(digestCandidate)).digest('hex')}`;
  if (document.profile?.contentDigest !== expectedDigest) {
    errors.push(`skills/${folder}/references/profile.json: contentDigest mismatch; expected ${expectedDigest}`);
  }

  const schemaPath = path.resolve(path.dirname(profilePath), document.$schema || '');
  if (!document.$schema?.startsWith('./') || !existsSync(schemaPath)) {
    errors.push(`skills/${folder}/references/profile.json: local $schema is missing`);
  } else {
    try {
      const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
      const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
      addFormats(ajv);
      const validate = ajv.compile(schema);
      if (!validate(document)) {
        for (const finding of validate.errors || []) {
          errors.push(`skills/${folder}/references/profile.json${finding.instancePath || '/'}: ${finding.message}`);
        }
      }
      validateExceptionRequiredFields(document, schema, folder, errors);
    } catch (error) {
      errors.push(`${path.relative(repositoryRoot, schemaPath)}: ${error.message}`);
    }
  }

  const decisionPath = path.resolve(packageRoot, document.profile?.decisionRef || '');
  if (!document.profile?.decisionRef?.startsWith('references/ADR-') || !existsSync(decisionPath)) {
    errors.push(`skills/${folder}/references/profile.json: local accepted decision is missing`);
  } else {
    const decision = readFileSync(decisionPath, 'utf8');
    if (!/^status:\s*accepted\s*$/m.test(decision) || !/^\s*- SylphxAI\/skills\s*$/m.test(decision)) {
      errors.push(`${path.relative(repositoryRoot, decisionPath)}: decision must be accepted and Skills-owned`);
    }
  }

  const defaults = document.defaults || [];
  const keys = defaults.map((item) => item.key);
  if (new Set(keys).size !== keys.length) errors.push(`skills/${folder}/references/profile.json: duplicate default key`);
  const exceptable = new Set(document.exceptionPolicy?.exceptableDefaults || []);
  const forbidden = new Set(document.exceptionPolicy?.forbiddenDefaults || []);
  for (const key of keys) {
    if (exceptable.has(key) === forbidden.has(key)) {
      errors.push(`skills/${folder}/references/profile.json: ${key} must be exactly one of exceptable or forbidden`);
    }
  }

  if (folder === 'technology-stack-profile') validateTechnologyStackProfile(document, errors);
  profiles.push({ folder, document });
}

function validateSkill(folder, names, errors, profiles) {
  const packageRoot = path.join(repositoryRoot, 'skills', folder);
  const skillFile = path.join(packageRoot, 'SKILL.md');
  if (!existsSync(skillFile)) {
    errors.push(`skills/${folder}: missing SKILL.md`);
    return;
  }
  const markdown = readFileSync(skillFile, 'utf8');
  let parsed;
  try {
    parsed = parseFrontmatter(markdown, `skills/${folder}/SKILL.md`);
  } catch (error) {
    errors.push(error.message);
    return;
  }
  const { values, keys } = parsed;
  const unexpected = keys.filter((key) => !['name', 'description'].includes(key));
  if (unexpected.length) errors.push(`skills/${folder}/SKILL.md: frontmatter only permits name and description`);
  if (!NAME.test(values.name || '')) errors.push(`skills/${folder}/SKILL.md: invalid name`);
  if (values.name !== folder) errors.push(`skills/${folder}/SKILL.md: name must match folder`);
  if (names.has(values.name)) errors.push(`skills/${folder}/SKILL.md: duplicate name ${values.name}`);
  names.add(values.name);
  if (!values.description || values.description.length > 1024) errors.push(`skills/${folder}/SKILL.md: invalid description`);
  if (!/\bUse (?:when|for)\b/i.test(values.description || '')) errors.push(`skills/${folder}/SKILL.md: description needs a Use when/for trigger`);

  for (const file of walk(packageRoot)) {
    const relative = path.relative(repositoryRoot, file);
    const text = readFileSync(file, 'utf8');
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(text)) errors.push(`${relative}: looks like a credential`);
    }
    if (/\b(?:TODO|PLACEHOLDER)\s*:/i.test(text)) errors.push(`${relative}: unresolved TODO/PLACEHOLDER marker`);
    if (/\.(?:md|markdown)$/i.test(file)) validateLocalLinks(text, file, errors);
  }

  validateMachineProfile(folder, packageRoot, errors, profiles);

  const openAiMetadata = path.join(packageRoot, 'agents', 'openai.yaml');
  if (existsSync(openAiMetadata)) {
    const yaml = readFileSync(openAiMetadata, 'utf8');
    if (!yaml.includes(`$${folder}`)) errors.push(`skills/${folder}/agents/openai.yaml: default prompt must reference $${folder}`);
  }
}

function selectorsMayOverlap(left, right) {
  const leftByFact = new Map((left || []).map((selector) => [selector.fact, selector.values || []]));
  const rightByFact = new Map((right || []).map((selector) => [selector.fact, selector.values || []]));
  for (const fact of new Set([...leftByFact.keys(), ...rightByFact.keys()])) {
    if (!leftByFact.has(fact) || !rightByFact.has(fact)) continue;
    if (!leftByFact.get(fact).some((value) => rightByFact.get(fact).includes(value))) return false;
  }
  return true;
}

export function validateActiveProfileCollisions(profiles, errors) {
  const active = profiles.filter(({ document }) => document.profile?.lifecycle === 'active');
  for (let leftIndex = 0; leftIndex < active.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < active.length; rightIndex += 1) {
      const left = active[leftIndex];
      const right = active[rightIndex];
      const rightKeys = new Set((right.document.defaults || []).map((item) => item.key));
      const sharedKeys = (left.document.defaults || []).map((item) => item.key).filter((key) => rightKeys.has(key));
      if (!sharedKeys.length) continue;
      if (selectorsMayOverlap(left.document.selector?.matchAll, right.document.selector?.matchAll)) {
        errors.push(`skills/${left.folder} and skills/${right.folder}: active profile selector collision on ${sharedKeys.join(', ')}`);
      }
    }
  }
}


export function validateAdrLocators(errors) {
  const adrRoot = path.join(repositoryRoot, 'docs', 'adr');
  if (!existsSync(adrRoot)) {
    errors.push('docs/adr/: missing');
    return;
  }
  const files = readdirSync(adrRoot)
    .filter((name) => name.endsWith('.md'))
    .sort();
  const shortLocators = new Map();
  for (const name of files) {
    const match = name.match(/^(ADR-\d{4})(?:-|$)/);
    if (!match) continue;
    const locator = match[1];
    if (!shortLocators.has(locator)) shortLocators.set(locator, []);
    shortLocators.get(locator).push(name);
  }
  for (const [locator, names] of shortLocators.entries()) {
    if (names.length > 1) {
      errors.push(`docs/adr/: locator ${locator} is used by ${names.join(', ')}`);
    }
  }
}

export function checkRepository() {
  const errors = [];
  for (const removed of REMOVED_BOUNDARIES) {
    if (existsSync(path.join(repositoryRoot, removed))) errors.push(`${removed}/ is outside the Skills source boundary`);
  }

  const skillFolders = readdirSync(path.join(repositoryRoot, 'skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const names = new Set();
  const profiles = [];
  for (const folder of skillFolders) validateSkill(folder, names, errors, profiles);
  validateActiveProfileCollisions(profiles, errors);
  validateAdrLocators(errors);

  const rootSchema = path.join(repositoryRoot, 'schemas', 'product-artifact-envelope.schema.json');
  if (!existsSync(rootSchema)) errors.push('schemas/product-artifact-envelope.schema.json: missing');
  else {
    const canonical = readFileSync(rootSchema, 'utf8');
    for (const file of walk(path.join(repositoryRoot, 'skills')).filter((item) => item.endsWith('/product-artifact-envelope.schema.json'))) {
      if (readFileSync(file, 'utf8') !== canonical) errors.push(`${path.relative(repositoryRoot, file)}: shared product envelope drift`);
    }
  }

  const catalogPath = path.join(repositoryRoot, 'catalog.json');
  if (!existsSync(catalogPath) || readFileSync(catalogPath, 'utf8') !== catalogBytes(repositoryRoot)) {
    errors.push('catalog.json is stale; run npm run build:catalog');
  }

  for (const rootFile of [
    'README.md',
    'PROJECT.md',
    'project.manifest.json',
    'LICENSE',
    'runtime/hooks.mjs',
    'runtime/package-digest.mjs',
    'runtime/reconcile.mjs',
    'runtime/sylphx-skills.mjs',
    'runtime/target-generation.mjs',
  ]) {
    const absolute = path.join(repositoryRoot, rootFile);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) errors.push(`${rootFile}: missing`);
  }

  return { errors, skillFolders, profiles };
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const { errors, skillFolders } = checkRepository();
  if (errors.length) {
    console.error(`Skills integrity failed with ${errors.length} finding(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Skills integrity ok: ${skillFolders.length} canonical packages`);
}
