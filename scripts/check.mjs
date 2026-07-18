#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
const TECHNOLOGY_PROFILE_ORGANIZATIONS = ['Cubeage', 'EpiowAI', 'OzyrixLtd', 'SylphxAI', 'TseFamily', 'shtse8'];
const TECHNOLOGY_PROFILE_LIFECYCLES = ['active', 'commercial', 'incubating', 'maintenance', 'production'];
const TECHNOLOGY_PROFILE_TASK_SURFACES = ['language-boundary-audit', 'migration-completion', 'product-code', 'runtime-implementation'];
const TECHNOLOGY_PROFILE_BACKEND_ROLES = [
  'api',
  'backend-service',
  'background-job',
  'controller',
  'critical-path',
  'gateway',
  'queue-consumer',
  'queue-producer',
  'runtime',
  'storage',
  'worker',
];
const TECHNOLOGY_PROFILE_WEB_ROLES = ['browser', 'product-web', 'server-rendered-web', 'ui-orchestration'];
const TECHNOLOGY_PROFILE_FORBIDDEN_WEB_EFFECTS = [
  'backend-authorization-decision',
  'backend-business-effect',
  'backend-database-mutation',
  'durable-queue-consume',
  'durable-queue-publish',
  'typescript-backend-fallback',
];
const TECHNOLOGY_PROFILE_EXCEPTION_FIELDS = [
  'id',
  'defaultKey',
  'selector',
  'rationale',
  'owner',
  'decisionRef',
  'evidence',
  'expiresOn',
  'recovery',
  'replacementCondition',
];

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

function validateTechnologyStackProfile(document, errors) {
  const location = 'skills/technology-stack-profile/references/profile.json';
  const selectors = document.selector?.matchAll || [];
  const selectorByFact = new Map(selectors.map((selector) => [selector.fact, selector]));
  if (selectorByFact.size !== 3 || selectors.length !== 3) {
    errors.push(`${location}: selector must contain exactly organization, repository.lifecycle, and task.surface`);
  }
  for (const [fact, expected] of [
    ['organization', TECHNOLOGY_PROFILE_ORGANIZATIONS],
    ['repository.lifecycle', TECHNOLOGY_PROFILE_LIFECYCLES],
    ['task.surface', TECHNOLOGY_PROFILE_TASK_SURFACES],
  ]) {
    const selector = selectorByFact.get(fact);
    if (selector?.operator !== 'one-of' || !sameMembers(selector?.values, expected)) {
      errors.push(`${location}: ${fact} selector vocabulary drift`);
    }
  }
  if (document.selector?.unknownFactPolicy !== 'fail-closed') {
    errors.push(`${location}: unknown selector facts must fail closed`);
  }

  const defaults = new Map((document.defaults || []).map((item) => [item.key, item]));
  const expectedDefaults = [
    ['engineering.language.backend-required-technology', 'rust', TECHNOLOGY_PROFILE_BACKEND_ROLES],
    ['engineering.language.web-required-technology', 'typescript-bun-next', TECHNOLOGY_PROFILE_WEB_ROLES],
    ['engineering.language.completion-measure', 'service-role-and-effect-coverage', ['language-boundary-audit', 'migration-completion']],
  ];
  if (defaults.size !== expectedDefaults.length || document.defaults?.length !== expectedDefaults.length) {
    errors.push(`${location}: default selection set drift`);
  }
  for (const [key, value, roles] of expectedDefaults) {
    const selection = defaults.get(key);
    if (selection?.value !== value || !sameMembers(selection?.appliesToRoles, roles)) {
      errors.push(`${location}: ${key} selection drift`);
    }
  }
  if (!sameMembers(document.forbiddenEffectsForWeb, TECHNOLOGY_PROFILE_FORBIDDEN_WEB_EFFECTS)) {
    errors.push(`${location}: forbidden web effect vocabulary drift`);
  }
  if (!sameMembers(document.exceptionPolicy?.exceptableDefaults, [])
      || !sameMembers(document.exceptionPolicy?.forbiddenDefaults, expectedDefaults.map(([key]) => key))
      || !sameMembers(document.exceptionPolicy?.requiredFields, TECHNOLOGY_PROFILE_EXCEPTION_FIELDS)) {
    errors.push(`${location}: exception contract drift`);
  }

  const projectSchemaPath = path.join(
    repositoryRoot,
    'skills',
    'project-manifest-standard',
    'references',
    'project-manifest.schema.json',
  );
  let projectSchema;
  try {
    projectSchema = JSON.parse(readFileSync(projectSchemaPath, 'utf8'));
  } catch (error) {
    errors.push(`skills/project-manifest-standard/references/project-manifest.schema.json: ${error.message}`);
    return;
  }
  const serviceFact = projectSchema.$defs?.serviceFact;
  const requiredFactFields = [
    'boundaryVersion',
    'componentId',
    'serviceRole',
    'implementation',
    'production',
    'backendOwner',
    'ownedEffects',
  ];
  if (projectSchema.properties?.serviceFacts?.items?.$ref !== '#/$defs/serviceFact'
      || serviceFact?.additionalProperties !== false
      || !sameMembers(serviceFact?.required, requiredFactFields)) {
    errors.push(`${location}: canonical project serviceFacts contract is missing or incomplete`);
  }
  if (!sameMembers(serviceFact?.properties?.serviceRole?.enum, [...TECHNOLOGY_PROFILE_BACKEND_ROLES, ...TECHNOLOGY_PROFILE_WEB_ROLES])
      || !sameMembers(serviceFact?.properties?.ownedEffects?.items?.enum, TECHNOLOGY_PROFILE_FORBIDDEN_WEB_EFFECTS)
      || !sameMembers(serviceFact?.properties?.implementation?.enum, ['other', 'rust', 'typescript-bun-next'])) {
    errors.push(`${location}: project serviceFacts vocabulary does not match the technology profile`);
  }

  const manifestLifecycles = projectSchema.properties?.project?.properties?.lifecycle?.enum || [];
  if (!TECHNOLOGY_PROFILE_LIFECYCLES.every((lifecycle) => manifestLifecycles.includes(lifecycle))) {
    errors.push(`${location}: selector uses lifecycle values outside the canonical project manifest`);
  }
}

function validateMachineProfile(folder, packageRoot, errors) {
  const profilePath = path.join(packageRoot, 'references', 'profile.json');
  if (!existsSync(profilePath)) return;
  let document;
  try {
    document = JSON.parse(readFileSync(profilePath, 'utf8'));
  } catch (error) {
    errors.push(`skills/${folder}/references/profile.json: ${error.message}`);
    return;
  }

  if (document.schemaVersion !== 1 || document.kind !== 'EnterpriseProfile') {
    errors.push(`skills/${folder}/references/profile.json: unsupported profile contract`);
    return;
  }
  if (document.profile?.id !== folder) errors.push(`skills/${folder}/references/profile.json: profile.id must match folder`);
  if (document.profile?.owner !== 'SylphxAI/skills') errors.push(`skills/${folder}/references/profile.json: owner must be SylphxAI/skills`);
  if (document.profile?.contentDigestScope !== 'canonical-json-excluding:/profile/contentDigest') {
    errors.push(`skills/${folder}/references/profile.json: unsupported digest scope`);
  }

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
      JSON.parse(readFileSync(schemaPath, 'utf8'));
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
}

function validateSkill(folder, names, errors) {
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

  validateMachineProfile(folder, packageRoot, errors);

  const openAiMetadata = path.join(packageRoot, 'agents', 'openai.yaml');
  if (existsSync(openAiMetadata)) {
    const yaml = readFileSync(openAiMetadata, 'utf8');
    if (!yaml.includes(`$${folder}`)) errors.push(`skills/${folder}/agents/openai.yaml: default prompt must reference $${folder}`);
  }
}

const errors = [];
for (const removed of REMOVED_BOUNDARIES) {
  if (existsSync(path.join(repositoryRoot, removed))) errors.push(`${removed}/ is outside the Skills source boundary`);
}

const skillFolders = readdirSync(path.join(repositoryRoot, 'skills'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const names = new Set();
for (const folder of skillFolders) validateSkill(folder, names, errors);

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
  'runtime/reconcile.mjs',
  'runtime/sylphx-skills.mjs',
]) {
  const absolute = path.join(repositoryRoot, rootFile);
  if (!existsSync(absolute) || !statSync(absolute).isFile()) errors.push(`${rootFile}: missing`);
}

if (errors.length) {
  console.error(`Skills integrity failed with ${errors.length} finding(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Skills integrity ok: ${skillFolders.length} canonical packages`);
