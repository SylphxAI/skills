#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uninstallRuntimeHooks } from './hooks.mjs';
import {
  applyConstitutionPlan,
  inspectConstitution,
  planConstitutionInstall,
  planConstitutionRemoval,
  runtimeInstructionPath,
} from './constitution.mjs';
import { packageDigest } from './package-digest.mjs';
import {
  configureControlPlaneMcp,
  CONTROL_PLANE_MCP_ENV,
  discoverControlPlaneMcp,
} from './control-plane-mcp.mjs';
import { reconcile, withLifecycleLock, withReconcileLock } from './reconcile.mjs';
import { installScheduler, parseIntervalMinutes, removeScheduler } from './scheduler.mjs';
import {
  clearTargetGeneration,
  installTargetGeneration,
  managedCurrentGeneration,
  managedGenerationEstablished,
  managedGenerationSkills,
  managedOwnedPackagePath,
  managedPackagePath,
  managedTargetCurrent,
  recoverTargetGeneration,
  withTargetGenerationLock,
} from './target-generation.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceSkills = path.join(packageRoot, 'skills');
const catalogPath = path.join(packageRoot, 'catalog.json');
const packageJsonPath = path.join(packageRoot, 'package.json');
const home = path.resolve((process.env.SYLPHX_SKILLS_HOME || os.homedir()).replace(/^~(?=\/|$)/, os.homedir()));
const argv = process.argv.slice(2);
const quiet = argv.includes('--quiet');
const jsonOutput = argv.includes('--json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const catalogBytes = readFileSync(catalogPath);
const catalog = JSON.parse(catalogBytes);
const catalogDigest = createHash('sha256').update(catalogBytes).digest('hex');
const stateDirectory = path.join(home, '.sylphx-skills');
const schedulerPlatform = process.env.SYLPHX_SKILLS_TEST_PLATFORM || process.platform;
const reconcilerScript = path.join(stateDirectory, 'reconcile.mjs');
const reconcilerConfig = path.join(stateDirectory, 'config.json');
const managedRepository = path.join(stateDirectory, 'repository');
const legacyUpdaterScript = path.join(stateDirectory, 'sync.sh');
const transactionPrefix = '.sylphx-transaction-';
let sourceCommitResolved = false;
let sourceCommitCache = null;

function executableFromPath(name, pathEnv) {
  const executable = process.platform === 'win32' ? `${name}.exe` : name;
  for (const directory of String(pathEnv).split(path.delimiter)) {
    if (!directory) continue;
    const candidate = path.join(directory, executable);
    if (existsSync(candidate)) return candidate;
  }
  return process.execPath;
}

function log(message) {
  if (!quiet && !jsonOutput) console.log(message);
}

function expand(input) {
  return path.resolve(input.replace(/^~(?=\/|$)/, home));
}

function runtimeHomes() {
  const codexHome = process.env.CODEX_HOME ? expand(process.env.CODEX_HOME) : path.join(home, '.codex');
  const claudeHome = process.env.CLAUDE_CONFIG_DIR ? expand(process.env.CLAUDE_CONFIG_DIR) : path.join(home, '.claude');
  const grokHome = process.env.GROK_HOME ? expand(process.env.GROK_HOME) : path.join(home, '.grok');
  return { codexHome, claudeHome, grokHome };
}

function runtimeDefinitions() {
  const { codexHome, claudeHome, grokHome } = runtimeHomes();
  return {
    codex: path.join(codexHome, 'skills'),
    claude: path.join(claudeHome, 'skills'),
    grok: path.join(grokHome, 'skills'),
  };
}

export function resolveTargets({ args = argv, homedir = home } = {}) {
  const custom = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--dest' && args[index + 1]) {
      const input = args[index + 1].replace(/^~(?=\/|$)/, homedir);
      custom.push({ runtime: 'custom', path: path.resolve(input) });
      index += 1;
    }
  }
  if (custom.length) return custom;

  const definitions = runtimeDefinitions();
  const requested = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--agent' && args[index + 1]) {
      requested.push(...args[index + 1].split(',').map((item) => item.trim().toLowerCase()).filter(Boolean));
      index += 1;
    }
  }
  const expanded = requested.includes('all') ? ['codex', 'claude', 'grok'] : requested;
  const invalid = expanded.filter((name) => !Object.hasOwn(definitions, name));
  if (invalid.length) throw new Error(`Unsupported agent: ${invalid.join(', ')}. Supported: codex, claude, grok, all.`);

  const selected = expanded.length
    ? [...new Set(expanded)]
    : Object.entries(definitions)
      .filter(([, skillRoot]) => existsSync(path.dirname(skillRoot)))
      .map(([name]) => name);

  // A fresh machine should not require a destination decision. Creating both
  // roots is harmless and lets whichever runtime is installed next discover
  // the same packages immediately.
  const automatic = selected.length ? selected : ['codex', 'claude', 'grok'];
  return automatic.map((runtime) => ({ runtime, path: definitions[runtime] }));
}

function requestedAgents(args = argv) {
  const names = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--agent' && args[index + 1]) {
      names.push(...args[index + 1].split(',').map((item) => item.trim().toLowerCase()).filter(Boolean));
      index += 1;
    }
  }
  const expanded = names.includes('all') || !names.length ? ['codex', 'claude', 'grok'] : names;
  const invalid = expanded.filter((name) => !['codex', 'claude', 'grok'].includes(name));
  if (invalid.length) throw new Error(`Unsupported agent: ${invalid.join(', ')}. Supported: codex, claude, grok, all.`);
  return [...new Set(expanded)];
}

function manifestPath(target) {
  return path.join(target.path, '.sylphx-skills.json');
}

function readManifestFile(file) {
  if (!existsSync(file)) return null;
  try {
    const manifest = JSON.parse(readFileSync(file, 'utf8'));
    if (
      manifest?.schemaVersion !== 1
      || manifest?.owner !== 'SylphxAI/skills'
      || !Array.isArray(manifest.skills)
      || manifest.skills.some((name) => typeof name !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
    ) {
      throw new Error('invalid ownership manifest');
    }
    return manifest;
  } catch (error) {
    throw new Error(`Refusing to replace invalid ownership manifest ${file}: ${error.message}`);
  }
}

function readManifest(target) {
  return readManifestFile(manifestPath(target));
}

function readPreviousManifest(target) {
  if (managedGenerationEstablished(target.path)) {
    try {
      const internal = readManifestFile(managedOwnedPackagePath(target.path, '.sylphx-skills.json'));
      if (internal) return internal;
    } catch {
      // The owned package set remains the deletion boundary when its manifest
      // is locally corrupt; projected top-level files are not ownership proof.
    }
    return { skills: managedGenerationSkills(target.path) };
  }
  return readManifest(target);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON at ${file}: ${error.message}`);
  }
}

function resolvedSourceCommit() {
  if (sourceCommitResolved) return sourceCommitCache;
  const explicit = process.env.SYLPHX_SKILLS_COMMIT_SHA?.trim().toLowerCase();
  if (explicit) {
    if (!/^[0-9a-f]{7,64}$/.test(explicit)) {
      throw new Error('SYLPHX_SKILLS_COMMIT_SHA must be a hexadecimal Git object id');
    }
    sourceCommitResolved = true;
    sourceCommitCache = explicit;
    return sourceCommitCache;
  }
  const status = spawnSync('git', ['-C', packageRoot, 'status', '--porcelain', '--untracked-files=normal'], {
    encoding: 'utf8',
    timeout: 2_000,
  });
  if (status.status !== 0 || status.stdout.trim()) {
    sourceCommitResolved = true;
    return sourceCommitCache;
  }
  const revision = spawnSync('git', ['-C', packageRoot, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
    timeout: 2_000,
  });
  const commit = revision.status === 0 ? revision.stdout.trim().toLowerCase() : '';
  sourceCommitResolved = true;
  sourceCommitCache = /^[0-9a-f]{7,64}$/.test(commit) ? commit : null;
  return sourceCommitCache;
}

function expectedTargetState(target, manifest) {
  if (!manifest) return false;
  const expectedSkills = catalog.skills.map((skill) => skill.name);
  const expectedDigests = Object.fromEntries(catalog.skills.map((skill) => [skill.name, skill.packageDigest]));
  const expectedProfiles = catalog.skills.filter((skill) => skill.profile).map((skill) => skill.profile);
  const expectedSourceCommit = resolvedSourceCommit();
  const expectedShape = [
    'catalogDigest',
    'owner',
    'packageDigests',
    'packageVersion',
    'profiles',
    'runtime',
    'schemaVersion',
    'skills',
    'sourceCommit',
    'synchronizedAt',
  ];
  try {
    return manifest.schemaVersion === 1
      && manifest.owner === 'SylphxAI/skills'
      && manifest.catalogDigest === `sha256:${catalogDigest}`
      && manifest.packageVersion === packageJson.version
      && manifest.runtime === target.runtime
      && (expectedSourceCommit === null || manifest.sourceCommit === expectedSourceCommit)
      && JSON.stringify(manifest.skills) === JSON.stringify(expectedSkills)
      && JSON.stringify(manifest.packageDigests) === JSON.stringify(expectedDigests)
      && JSON.stringify(manifest.profiles) === JSON.stringify(expectedProfiles)
      && JSON.stringify(Object.keys(manifest).sort()) === JSON.stringify(expectedShape)
      && typeof manifest.synchronizedAt === 'string'
      && Number.isFinite(Date.parse(manifest.synchronizedAt))
      && new Date(manifest.synchronizedAt).toISOString() === manifest.synchronizedAt
      && managedTargetCurrent(target.path, expectedSkills)
      && catalog.skills.every((skill) => (
        packageDigest(managedPackagePath(target.path, skill.name)) === skill.packageDigest
      ));
  } catch {
    return false;
  }
}

function writeAtomic(file, bytes, mode) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(temp, bytes, mode ? { mode } : undefined);
  renameSync(temp, file);
}

function recoverInterruptedTransactions(skillRoot) {
  if (!existsSync(skillRoot)) return;
  for (const entry of readdirSync(skillRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith(transactionPrefix)) continue;
    const transactionRoot = path.join(skillRoot, entry.name);
    const metadataPath = path.join(transactionRoot, 'transaction.json');
    let metadata;
    try {
      metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
    } catch {
      throw new Error(`Refusing to remove an unrecognized transaction directory: ${transactionRoot}`);
    }
    if (
      metadata?.owner !== 'SylphxAI/skills'
      || typeof metadata.package !== 'string'
      || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.package)
    ) {
      throw new Error(`Refusing to recover an invalid transaction directory: ${transactionRoot}`);
    }
    const destination = path.join(skillRoot, metadata.package);
    const backup = path.join(transactionRoot, 'backup');
    if (!existsSync(destination) && existsSync(backup)) renameSync(backup, destination);
    rmSync(transactionRoot, { recursive: true, force: true });
  }
}

function syncTarget(target) {
  return withTargetGenerationLock(target.path, (lockToken) => {
    const instructionFile = runtimeInstructionPath(target);
    const constitutionPlan = instructionFile ? planConstitutionInstall(instructionFile) : null;
    recoverTargetGeneration(target.path, lockToken);
    mkdirSync(target.path, { recursive: true });
    recoverInterruptedTransactions(target.path);
    const previous = readPreviousManifest(target);
    const desired = catalog.skills.map((skill) => skill.name);
    if (expectedTargetState(target, previous)) {
      applyConstitutionPlan(constitutionPlan);
      log(`current ${desired.length} skills at ${target.runtime}: ${target.path}`);
      return previous;
    }
    const previousSkills = [...new Set([
      ...(Array.isArray(previous?.skills) ? previous.skills : []),
      ...managedGenerationSkills(target.path),
    ])].sort();

    const manifest = {
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      packageVersion: packageJson.version,
      catalogDigest: `sha256:${catalogDigest}`,
      sourceCommit: resolvedSourceCommit(),
      synchronizedAt: new Date().toISOString(),
      runtime: target.runtime,
      skills: desired,
      packageDigests: Object.fromEntries(catalog.skills.map((skill) => [skill.name, skill.packageDigest])),
      profiles: catalog.skills
        .filter((skill) => skill.profile)
        .map((skill) => skill.profile),
    };
    installTargetGeneration({
      targetPath: target.path,
      sourceSkills,
      catalog,
      manifest,
      previousSkills,
      previousManifest: previous,
      lockToken,
    });
    applyConstitutionPlan(constitutionPlan);
    log(`synced ${desired.length} skills to ${target.runtime}: ${target.path}`);
    return manifest;
  });
}

function refreshAutoSyncInstallation() {
  const config = readJson(reconcilerConfig);
  // Only the exact-commit reconciler may replace the persistent sync adapter.
  // A manual sync from an arbitrary working tree updates Skills content but
  // must not silently turn uncommitted runtime code into the auto-sync owner.
  if (!process.env.SYLPHX_SKILLS_COMMIT_SHA || !config?.enabled || config.owner !== 'SylphxAI/skills') return;
  const currentHomes = runtimeHomes();
  const agents = [...new Set(config.agents || [])];
  // Existing installations add newly detected runtimes without a second CLI.
  if (existsSync(currentHomes.grokHome) && !agents.includes('grok')) {
    syncTarget({ runtime: 'grok', path: path.join(currentHomes.grokHome, 'skills') });
    agents.push('grok');
  }
  config.agents = agents;
  config.homes = { ...config.homes, ...currentHomes };
  const needsSchedulerMigration = config.mode !== 'interval-scheduler';
  config.mode = 'interval-scheduler';
  config.intervalMinutes = Number(config.intervalMinutes) || 10;
  config.adapterVersion = packageJson.version;
  writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
  writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
  if (needsSchedulerMigration) {
    uninstallRuntimeHooks({ agents, homes: config.homes });
    installScheduler({
      platform: schedulerPlatform,
      home,
      nodePath: config.nodePath,
      reconcilerPath: reconcilerScript,
      pathEnv: config.pathEnv,
      intervalMinutes: config.intervalMinutes,
    });
  }
}

function sync() {
  const targets = resolveTargets();
  const result = targets.map((target) => ({ target, manifest: syncTarget(target) }));
  refreshAutoSyncInstallation();
  if (jsonOutput) console.log(JSON.stringify({ command: 'sync', catalogDigest: `sha256:${catalogDigest}`, targets: result }, null, 2));
}

function install() {
  if (argv.includes('--dest')) {
    throw new Error('install requires a native runtime; custom destinations support Skills sync only');
  }
  if (!argv.includes('--agent')) {
    throw new Error('install requires --agent codex, claude, or grok');
  }
  return sync();
}

function status() {
  const targets = resolveTargets();
  const result = targets.map((target) => withTargetGenerationLock(target.path, (lockToken) => {
    recoverTargetGeneration(target.path, lockToken);
    const manifest = readManifest(target);
    const packageStates = catalog.skills.map((skill) => ({
      name: skill.name,
      present: existsSync(path.join(managedPackagePath(target.path, skill.name), 'SKILL.md')),
      current: packageDigest(managedPackagePath(target.path, skill.name)) === skill.packageDigest,
    }));
    const present = packageStates.filter((skill) => skill.present).length;
    const expectedDigests = Object.fromEntries(catalog.skills.map((skill) => [skill.name, skill.packageDigest]));
    const expectedProfiles = catalog.skills.filter((skill) => skill.profile).map((skill) => skill.profile);
    const profilesCurrent = JSON.stringify(manifest?.profiles || []) === JSON.stringify(expectedProfiles);
    const skillsCurrent = JSON.stringify(manifest?.skills || []) === JSON.stringify(
      catalog.skills.map((skill) => skill.name),
    );
    const expectedSourceCommit = resolvedSourceCommit();
    const sourceCommitCurrent = expectedSourceCommit === null || manifest?.sourceCommit === expectedSourceCommit;
    const packageVersionCurrent = manifest?.packageVersion === packageJson.version;
    const runtimeCurrent = manifest?.runtime === target.runtime;
    const manifestShapeCurrent = JSON.stringify(Object.keys(manifest || {}).sort()) === JSON.stringify([
      'catalogDigest',
      'owner',
      'packageDigests',
      'packageVersion',
      'profiles',
      'runtime',
      'schemaVersion',
      'skills',
      'sourceCommit',
      'synchronizedAt',
    ]);
    const synchronizedAtCurrent = typeof manifest?.synchronizedAt === 'string'
      && Number.isFinite(Date.parse(manifest.synchronizedAt))
      && new Date(manifest.synchronizedAt).toISOString() === manifest.synchronizedAt;
    const packagesCurrent = packageStates.every((skill) => skill.current)
      && JSON.stringify(manifest?.packageDigests || {}) === JSON.stringify(expectedDigests);
    const driftedPackages = packageStates
      .filter((skill) => !skill.current)
      .map((skill) => skill.name);
    const instructionFile = runtimeInstructionPath(target);
    const constitution = instructionFile
      ? inspectConstitution(instructionFile)
      : { path: null, installed: null, current: true, contentDigest: null, error: null };
    return {
      runtime: target.runtime,
      path: target.path,
      installed: present,
      expected: catalog.count,
      current: manifest?.catalogDigest === `sha256:${catalogDigest}`
        && present === catalog.count
        && packagesCurrent
        && profilesCurrent
        && skillsCurrent
        && managedTargetCurrent(target.path, catalog.skills.map((skill) => skill.name))
        && sourceCommitCurrent
        && packageVersionCurrent
        && runtimeCurrent
        && manifestShapeCurrent
        && synchronizedAtCurrent
        && constitution.current,
      catalogDigest: manifest?.catalogDigest || null,
      sourceCommit: manifest?.sourceCommit ?? null,
      packageVersion: manifest?.packageVersion || null,
      synchronizedAt: manifest?.synchronizedAt || null,
      generation: managedCurrentGeneration(target.path),
      packagesCurrent,
      profilesCurrent,
      skillsCurrent,
      sourceCommitCurrent,
      packageVersionCurrent,
      runtimeCurrent,
      manifestShapeCurrent,
      synchronizedAtCurrent,
      driftedPackages,
      constitution,
    };
  }));
  if (jsonOutput) console.log(JSON.stringify({ command: 'status', targets: result }, null, 2));
  else for (const item of result) log(`${item.runtime}: ${item.current ? 'current' : 'outdated'} (${item.installed}/${item.expected}) ${item.path}`);
}

function clear() {
  const targets = resolveTargets();
  const result = [];
  for (const target of targets) {
    withTargetGenerationLock(target.path, (lockToken) => {
      const instructionFile = runtimeInstructionPath(target);
      const constitutionPlan = instructionFile ? planConstitutionRemoval(instructionFile) : null;
      recoverTargetGeneration(target.path, lockToken);
      const previous = readPreviousManifest(target);
      const names = new Set([
        ...(previous?.skills || []),
        ...managedGenerationSkills(target.path),
      ]);
      const removed = [...names].filter((name) => existsSync(path.join(target.path, name))).length;
      clearTargetGeneration(target.path, [...names], lockToken);
      applyConstitutionPlan(constitutionPlan);
      result.push({ runtime: target.runtime, path: target.path, removed });
      log(`cleared ${removed} Sylphx skills from ${target.runtime}: ${target.path}`);
    });
  }
  if (jsonOutput) console.log(JSON.stringify({ command: 'clear', targets: result }, null, 2));
}

function testHoldEnableAfterReconcile() {
  if (process.env.NODE_ENV !== 'test') return;
  const duration = process.env.SYLPHX_SKILLS_TEST_HOLD_ENABLE_AFTER_RECONCILE_MS;
  const release = process.env.SYLPHX_SKILLS_TEST_HOLD_ENABLE_AFTER_RECONCILE_RELEASE;
  if (!duration && !release) return;
  const marker = path.join(stateDirectory, '.test-enable-after-reconcile-ready');
  writeFileSync(marker, 'ready\n');
  try {
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    if (release) {
      const deadline = Date.now() + 60_000;
      while (!existsSync(release)) {
        if (Date.now() >= deadline) throw new Error('timed out waiting to release enable lifecycle test hold');
        Atomics.wait(waiter, 0, 0, 20);
      }
    } else {
      const milliseconds = Number(duration);
      if (!Number.isFinite(milliseconds) || milliseconds < 0 || milliseconds > 5_000) {
        throw new Error('invalid enable lifecycle test hold duration');
      }
      Atomics.wait(waiter, 0, 0, milliseconds);
    }
  } finally {
    rmSync(marker, { force: true });
    if (release) rmSync(release, { force: true });
  }
}

function enableAutoSync() {
  if (argv.includes('--dest')) throw new Error('auto-sync uses native runtime roots; --dest is not supported');
  const intervalMinutes = parseIntervalMinutes(argv);
  const agents = requestedAgents();
  const pathEnv = process.env.PATH || '/usr/local/bin:/usr/bin:/bin';
  const config = {
    schemaVersion: 1,
    owner: 'SylphxAI/skills',
    enabled: false,
    remote: process.env.SYLPHX_SKILLS_REMOTE || 'https://github.com/SylphxAI/skills.git',
    branch: 'main',
    repository: managedRepository,
    reconcilerPath: reconcilerScript,
    nodePath: executableFromPath('node', pathEnv),
    pathEnv,
    mode: 'interval-scheduler',
    intervalMinutes,
    agents,
    homes: runtimeHomes(),
    adapterVersion: packageJson.version,
  };
  const lifecycle = withLifecycleLock(stateDirectory, () => {
    removeScheduler({ platform: schedulerPlatform, home });
    mkdirSync(stateDirectory, { recursive: true });
    const prepared = withReconcileLock(stateDirectory, () => {
      writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
      writeAtomic(reconcilerScript, readFileSync(path.join(packageRoot, 'runtime', 'reconcile.mjs')), 0o755);
    });
    if (!prepared.acquired) throw new Error('automatic synchronization is busy; retry enable');

    const initial = reconcile({ stateDirectory, force: true, strict: true, bootstrap: true });
    if (!['current', 'updated'].includes(initial.status)) {
      throw new Error(`automatic synchronization did not converge: ${initial.status}`);
    }
    testHoldEnableAfterReconcile();

    const activated = withReconcileLock(stateDirectory, () => {
      // A pre-1.4 source may briefly refresh its old hooks during the first exact
      // sync. Remove them after convergence so this command's scheduler is the only
      // recurring owner.
      uninstallRuntimeHooks({ agents: ['codex', 'claude', 'grok'], homes: runtimeHomes() });
      installScheduler({
        platform: schedulerPlatform,
        home,
        nodePath: config.nodePath,
        reconcilerPath: reconcilerScript,
        pathEnv: config.pathEnv,
        intervalMinutes,
      });
      config.enabled = true;
      writeAtomic(reconcilerConfig, `${JSON.stringify(config, null, 2)}\n`, 0o600);
      rmSync(legacyUpdaterScript, { force: true });
    });
    if (!activated.acquired) throw new Error('automatic synchronization is busy; retry enable');
  });
  if (!lifecycle.acquired) throw new Error('automatic synchronization lifecycle is busy; retry enable');
  log(`enabled automatic sync every ${intervalMinutes} minute${intervalMinutes === 1 ? '' : 's'} for ${agents.join(', ')}`);
}

function disableAutoSync() {
  const lifecycle = withLifecycleLock(stateDirectory, () => {
    const config = readJson(reconcilerConfig);
    const agents = config?.agents || ['codex', 'claude', 'grok'];
    const homes = config?.homes || runtimeHomes();
    removeScheduler({ platform: schedulerPlatform, home });
    const disabled = withReconcileLock(stateDirectory, () => {
      uninstallRuntimeHooks({ agents, homes });
      rmSync(reconcilerScript, { force: true });
      rmSync(reconcilerConfig, { force: true });
    });
    if (!disabled.acquired) throw new Error('automatic synchronization is busy; retry disable');
  });
  if (!lifecycle.acquired) throw new Error('automatic synchronization lifecycle is busy; retry disable');
  log('disabled Sylphx Skills automatic sync');
}

function autoSyncStatus() {
  const config = readJson(reconcilerConfig);
  const result = {
    mode: config?.mode || null,
    enabled: Boolean(config?.enabled) && config?.mode === 'interval-scheduler',
    intervalMinutes: config?.intervalMinutes || null,
    remote: config?.remote || null,
    managedRepository: config?.repository || null,
  };
  if (jsonOutput) console.log(JSON.stringify(result, null, 2));
  else log(`auto-sync: ${result.enabled ? `every ${result.intervalMinutes} minutes` : 'disabled'}`);
}

function argumentValue(name) {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] : undefined;
}

async function integration() {
  const actionIndex = argv.indexOf('integration') + 1;
  const action = argv[actionIndex] || 'discover';
  const endpoint = argumentValue('--url') || process.env[CONTROL_PLANE_MCP_ENV];
  const discovery = await discoverControlPlaneMcp({ endpoint });
  let result = discovery;
  if (action === 'enroll') {
    const runtime = argumentValue('--agent');
    if (!runtime || runtime.includes(',') || runtime === 'all') {
      throw new Error('integration enroll requires one --agent codex, claude, or grok');
    }
    if (discovery.disposition === 'not_applicable') {
      throw new Error(`integration enroll requires --url or ${CONTROL_PLANE_MCP_ENV}`);
    }
    result = configureControlPlaneMcp(runtime, discovery);
  } else if (action !== 'discover') {
    throw new Error(`Unknown integration action: ${action}`);
  }
  if (jsonOutput) console.log(JSON.stringify(result, null, 2));
  else log(`${result.disposition}${result.endpoint ? ` ${result.endpoint}` : ''}`);
}

function help() {
  console.log(`Sylphx Skills ${packageJson.version}\n\nUsage:\n  sylphx-skills install --agent codex|claude|grok|all\n  sylphx-skills sync [--agent codex|claude|grok|all] [--dest PATH]\n  sylphx-skills status [--json]\n  sylphx-skills clear\n  sylphx-skills integration discover [--url HTTPS_URL] [--json]\n  sylphx-skills integration enroll --agent codex|claude|grok [--url HTTPS_URL] [--json]\n  sylphx-skills auto-sync enable [--interval 10m]\n  sylphx-skills auto-sync disable|status\n\nInstall is the agent-facing operation and requires an explicit native runtime;\nsync remains a compatible low-level operation. Native runtime targets receive\nboth the complete Skill catalog and compact constitution. Control Plane MCP\nenrollment is optional and requires an explicit non-secret deployment URL.`);
}

async function main() {
  if (argv.some((item) => ['help', '--help', '-h'].includes(item))) return help();
  const command = argv.find((item) => !item.startsWith('-')) || 'sync';
  if (command === 'install') return install();
  if (command === 'sync') return sync();
  if (command === 'status') return status();
  if (command === 'clear') return clear();
  if (command === 'integration') return integration();
  if (command === 'auto-sync') {
    const actionIndex = argv.indexOf('auto-sync') + 1;
    const action = argv[actionIndex] || 'status';
    if (action === 'enable') return enableAutoSync();
    if (action === 'disable') return disableAutoSync();
    if (action === 'status') return autoSyncStatus();
    throw new Error(`Unknown auto-sync action: ${action}`);
  }
  throw new Error(`Unknown command: ${command}`);
}

const invokedFile = process.argv[1] && existsSync(process.argv[1])
  ? realpathSync(process.argv[1])
  : path.resolve(process.argv[1] || '');

if (invokedFile === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`sylphx-skills: ${error.message}`);
    process.exit(1);
  });
}
