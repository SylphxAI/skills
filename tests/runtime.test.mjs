import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { reconcile } from '../runtime/reconcile.mjs';
import { parseIntervalMinutes, schedulerDefinition } from '../runtime/scheduler.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const cli = path.join(root, 'runtime', 'sylphx-skills.mjs');
const catalog = JSON.parse(readFileSync(path.join(root, 'catalog.json'), 'utf8'));

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result;
}

function runFailure(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
  assert.notEqual(result.status, 0, result.stderr || result.stdout);
  return result;
}

function runWithEnvironment(args, environment) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...environment },
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result;
}

function git(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function commit(cwd, message) {
  git(cwd, ['add', '.']);
  git(cwd, ['-c', 'user.name=Sylphx Test', '-c', 'user.email=test@sylphx.invalid', 'commit', '-m', message]);
  return git(cwd, ['rev-parse', 'HEAD']);
}

test('sync, status, update, and clear own only the declared packages', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-skills-'));
  const destination = path.join(sandbox, 'skills');
  try {
    run(['sync', '--dest', destination, '--quiet']);
    const manifest = JSON.parse(readFileSync(path.join(destination, '.sylphx-skills.json'), 'utf8'));
    assert.equal(manifest.owner, 'SylphxAI/skills');
    assert.equal(manifest.skills.length, catalog.count);
    assert.deepEqual(manifest.profiles, catalog.skills.filter((skill) => skill.profile).map((skill) => skill.profile));
    assert.deepEqual(manifest.packageDigests, Object.fromEntries(catalog.skills.map((skill) => [skill.name, skill.packageDigest])));
    assert.equal(existsSync(path.join(destination, 'engineering-standard', 'SKILL.md')), true);
    assert.equal(existsSync(path.join(destination, 'sylphx-platform-first', 'SKILL.md')), true);

    const status = run(['status', '--dest', destination, '--json']);
    const parsed = JSON.parse(status.stdout);
    assert.equal(parsed.targets[0].current, true);

    const installedProfilePath = path.join(destination, 'fleet-engineering-profile', 'references', 'profile.json');
    const installedProfile = JSON.parse(readFileSync(installedProfilePath, 'utf8'));
    installedProfile.profile.lifecycle = 'candidate';
    writeFileSync(installedProfilePath, `${JSON.stringify(installedProfile, null, 2)}\n`);
    const driftedProfile = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedProfile.targets[0].current, false);
    assert.equal(driftedProfile.targets[0].packagesCurrent, false);

    run(['sync', '--dest', destination, '--quiet']);
    const installedSkillPath = path.join(destination, 'fleet-engineering-profile', 'SKILL.md');
    writeFileSync(installedSkillPath, `${readFileSync(installedSkillPath, 'utf8')}\nmutated\n`);
    const driftedSkill = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedSkill.targets[0].current, false);

    const interruptedPackage = 'engineering-standard';
    const interruptedDestination = path.join(destination, interruptedPackage);
    const interruptedTransaction = path.join(destination, '.sylphx-transaction-test-recovery');
    mkdirSync(interruptedTransaction);
    writeFileSync(path.join(interruptedTransaction, 'transaction.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      package: interruptedPackage,
    }, null, 2)}\n`);
    cpSync(interruptedDestination, path.join(interruptedTransaction, 'stage'), { recursive: true });
    renameSync(interruptedDestination, path.join(interruptedTransaction, 'backup'));

    run(['sync', '--dest', destination, '--quiet']);
    assert.equal(existsSync(interruptedDestination), true);
    assert.equal(existsSync(interruptedTransaction), false);
    assert.deepEqual(readdirSync(destination).filter((name) => name.startsWith('.sylphx-transaction-')), []);

    writeFileSync(path.join(destination, '.sylphx-skills.json'), '{"owner":"attacker","skills":["../unowned"]}\n');
    const invalidManifest = runFailure(['sync', '--dest', destination, '--quiet']);
    assert.match(invalidManifest.stderr, /Refusing to replace invalid ownership manifest/);
    assert.equal(existsSync(path.join(sandbox, 'unowned')), false);
    writeFileSync(path.join(destination, '.sylphx-skills.json'), `${JSON.stringify(manifest, null, 2)}\n`);

    run(['clear', '--dest', destination, '--quiet']);
    assert.equal(existsSync(path.join(destination, 'engineering-standard')), false);
    assert.equal(existsSync(path.join(destination, '.sylphx-skills.json')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent override targets Codex, Claude, and Grok without upstream tooling', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-targets-'));
  try {
    const script = `import { resolveTargets } from ${JSON.stringify(new URL('../runtime/sylphx-skills.mjs', import.meta.url).href)}; console.log(JSON.stringify(resolveTargets({args:['--agent','all'],homedir:${JSON.stringify(sandbox)}})));`;
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const targets = JSON.parse(result.stdout);
    assert.deepEqual(targets.map((target) => target.runtime), ['codex', 'claude', 'grok']);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('scheduler supports one configurable interval across macOS, Linux, and Windows', () => {
  assert.equal(parseIntervalMinutes([]), 10);
  assert.equal(parseIntervalMinutes(['--interval', '5m']), 5);
  assert.equal(parseIntervalMinutes(['--interval', '2h']), 120);
  assert.equal(parseIntervalMinutes(['--interval', '30']), 30);
  assert.throws(() => parseIntervalMinutes(['--interval', '10s']), /whole minutes/);

  const options = {
    home: '/home/sylphx',
    nodePath: '/runtime/node',
    reconcilerPath: '/home/sylphx/.sylphx-skills/reconcile.mjs',
    pathEnv: '/usr/local/bin:/usr/bin:/bin',
    intervalMinutes: 10,
  };
  const mac = schedulerDefinition({ ...options, platform: 'darwin' });
  const linux = schedulerDefinition({ ...options, platform: 'linux' });
  const windows = schedulerDefinition({ ...options, platform: 'win32' });
  assert.equal(mac.kind, 'launchd');
  assert.match(mac.files[0].contents, /<key>StartInterval<\/key><integer>600<\/integer>/);
  assert.equal(linux.kind, 'systemd-user');
  assert.match(linux.files[1].contents, /OnUnitActiveSec=10min/);
  assert.equal(windows.kind, 'windows-task-scheduler');
  assert.deepEqual(windows.activate[0][1].slice(-3), ['/MO', '10', '/F']);
});

test('reconciler fetches only changed commits, honors TTL, and single-flights active agents', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-reconcile-'));
  const remote = path.join(sandbox, 'source');
  const stateDirectory = path.join(sandbox, 'state');
  const codexHome = path.join(sandbox, 'codex');
  const claudeHome = path.join(sandbox, 'claude');
  const grokHome = path.join(sandbox, 'grok');
  try {
    mkdirSync(path.join(remote, 'runtime'), { recursive: true });
    git(remote, ['init', '--initial-branch=main']);
    const fixtureCli = `import { mkdirSync, writeFileSync } from 'node:fs';\nimport path from 'node:path';\nconst target = process.env.CODEX_HOME;\nmkdirSync(target, { recursive: true });\nwriteFileSync(path.join(target, 'applied-sha.txt'), process.env.SYLPHX_SKILLS_COMMIT_SHA + '\\n');\n`;
    writeFileSync(path.join(remote, 'runtime', 'sylphx-skills.mjs'), fixtureCli);
    cpSync(path.join(root, 'runtime', 'reconcile.mjs'), path.join(remote, 'runtime', 'reconcile.mjs'));
    writeFileSync(path.join(remote, 'content.txt'), 'one\n');
    const firstSha = commit(remote, 'first');

    mkdirSync(stateDirectory, { recursive: true });
    const config = {
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      enabled: true,
      remote,
      branch: 'main',
      repository: path.join(stateDirectory, 'repository'),
      reconcilerPath: path.join(stateDirectory, 'reconcile.mjs'),
      nodePath: process.execPath,
      pathEnv: process.env.PATH,
      agents: ['codex', 'claude', 'grok'],
      homes: { codexHome, claudeHome, grokHome },
    };
    writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
    cpSync(path.join(root, 'runtime', 'reconcile.mjs'), config.reconcilerPath);

    const first = reconcile({ stateDirectory, force: true, strict: true, now: 1_000 });
    assert.equal(first.status, 'updated');
    assert.equal(first.appliedSha, firstSha);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstSha);

    let commandCount = 0;
    const countingRun = (command, args, options) => {
      commandCount += 1;
      return spawnSync(command, args, { encoding: 'utf8', ...options });
    };
    const fresh = reconcile({ stateDirectory, maxAgeMs: 10_000, now: 5_000, run: countingRun });
    assert.equal(fresh.status, 'fresh');
    assert.equal(commandCount, 0);

    writeFileSync(path.join(remote, 'content.txt'), 'two\n');
    const secondSha = commit(remote, 'second');
    const second = reconcile({ stateDirectory, maxAgeMs: 10_000, strict: true, now: 12_000 });
    assert.equal(second.status, 'updated');
    assert.equal(second.appliedSha, secondSha);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), secondSha);

    mkdirSync(path.join(stateDirectory, 'reconcile.lock'));
    const busy = reconcile({ stateDirectory, force: true, now: 13_000, run: countingRun });
    assert.equal(busy.status, 'busy');
    rmSync(path.join(stateDirectory, 'reconcile.lock'), { recursive: true, force: true });

    let failedCommands = 0;
    const unavailable = reconcile({
      stateDirectory,
      maxAgeMs: 10_000,
      now: 23_000,
      run: () => {
        failedCommands += 1;
        return { status: 1, stdout: '', stderr: 'offline' };
      },
    });
    assert.equal(unavailable.status, 'unavailable');
    const backoff = reconcile({ stateDirectory, maxAgeMs: 10_000, now: 24_000, run: countingRun });
    assert.equal(backoff.status, 'backoff');
    assert.equal(failedCommands, 1);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('auto-sync enables a configurable scheduler, converges exactly, and removes legacy hooks', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-auto-sync-'));
  const source = path.join(sandbox, 'source');
  const managedHome = path.join(sandbox, 'home');
  const codexHome = path.join(managedHome, '.codex');
  const claudeHome = path.join(managedHome, '.claude');
  const grokHome = path.join(managedHome, '.grok');
  try {
    mkdirSync(source, { recursive: true });
    git(source, ['init', '--initial-branch=main']);
    for (const entry of ['runtime', 'skills']) cpSync(path.join(root, entry), path.join(source, entry), { recursive: true });
    for (const entry of ['catalog.json', 'package.json']) cpSync(path.join(root, entry), path.join(source, entry));
    const sourceSha = commit(source, 'fixture source');

    const legacyCommand = `'${process.execPath}' '${path.join(managedHome, '.sylphx-skills', 'reconcile.mjs')}' --quiet`;
    const legacyHooks = { UserPromptSubmit: [{ hooks: [{ type: 'command', command: legacyCommand }] }] };
    mkdirSync(claudeHome, { recursive: true });
    writeFileSync(path.join(claudeHome, 'settings.json'), `${JSON.stringify({ language: 'en', hooks: legacyHooks }, null, 2)}\n`);
    mkdirSync(path.join(grokHome, 'hooks'), { recursive: true });
    writeFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), `${JSON.stringify({ hooks: legacyHooks }, null, 2)}\n`);
    const staleGrokSkill = path.join(grokHome, 'skills', 'engineering-standard');
    mkdirSync(staleGrokSkill, { recursive: true });
    writeFileSync(path.join(staleGrokSkill, 'SKILL.md'), 'stale Grok copy\n');
    mkdirSync(path.join(managedHome, '.sylphx-skills'), { recursive: true });
    writeFileSync(path.join(managedHome, '.sylphx-skills', 'sync.sh'), 'legacy\n');
    const environment = {
      SYLPHX_SKILLS_HOME: managedHome,
      SYLPHX_SKILLS_REMOTE: pathToFileURL(source).href,
      CODEX_HOME: codexHome,
      CLAUDE_CONFIG_DIR: claudeHome,
      GROK_HOME: grokHome,
      SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION: '1',
      SYLPHX_SKILLS_TEST_PLATFORM: 'darwin',
    };

    runWithEnvironment(['auto-sync', 'enable', '--interval', '7m', '--quiet'], environment);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'sync.sh')), false);
    const installedManifest = path.join(codexHome, 'skills', '.sylphx-skills.json');
    assert.equal(existsSync(installedManifest), true, `installed paths: ${readdirSync(managedHome, { recursive: true }).join(', ')}`);
    assert.equal(readFileSync(installedManifest, 'utf8').includes(sourceSha), true);
    assert.equal(readFileSync(path.join(staleGrokSkill, 'SKILL.md'), 'utf8').includes('stale Grok copy'), false);
    assert.equal(JSON.parse(readFileSync(path.join(grokHome, 'skills', '.sylphx-skills.json'), 'utf8')).sourceCommit, sourceSha);
    const status = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(status.enabled, true);
    assert.equal(status.intervalMinutes, 7);
    assert.equal(status.mode, 'interval-scheduler');
    const plist = path.join(managedHome, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist');
    assert.match(readFileSync(plist, 'utf8'), /<key>StartInterval<\/key><integer>420<\/integer>/);
    assert.equal(Object.hasOwn(JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8')), 'hooks'), false);
    assert.equal(Object.hasOwn(JSON.parse(readFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), 'utf8')), 'hooks'), false);

    const unmanaged = path.join(codexHome, 'skills', 'third-party-skill');
    mkdirSync(unmanaged, { recursive: true });
    writeFileSync(path.join(unmanaged, 'SKILL.md'), 'third party\n');

    const removedSkill = 'voice-preserving-editor';
    const removedFile = path.join(
      codexHome,
      'skills',
      'engineering-standard',
      'references',
      'capability-first-examples.md',
    );
    rmSync(path.join(source, 'skills', removedSkill), { recursive: true, force: true });
    rmSync(path.join(
      source,
      'skills',
      'engineering-standard',
      'references',
      'capability-first-examples.md',
    ));
    const addedSkill = 'sync-fixture-added';
    mkdirSync(path.join(source, 'skills', addedSkill), { recursive: true });
    const addedDescription = 'Validate exact package-set synchronization. Use for this runtime fixture only.';
    writeFileSync(path.join(source, 'skills', addedSkill, 'SKILL.md'), `---\nname: ${addedSkill}\ndescription: ${addedDescription}\n---\n\n# Fixture\n`);
    const updatedCatalog = JSON.parse(readFileSync(path.join(source, 'catalog.json'), 'utf8'));
    updatedCatalog.skills = updatedCatalog.skills
      .filter((skill) => skill.name !== removedSkill)
      .concat([{ name: addedSkill, description: addedDescription, path: `skills/${addedSkill}/SKILL.md` }])
      .sort((left, right) => left.name.localeCompare(right.name));
    updatedCatalog.count = updatedCatalog.skills.length;
    writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify(updatedCatalog, null, 2)}\n`);

    const updatedSha = commit(source, 'change exact fixture package set');
    const scheduledRun = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict', '--quiet',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(scheduledRun.status, 0, scheduledRun.stderr || scheduledRun.stdout);
    const updatedManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    assert.equal(updatedManifest.sourceCommit, updatedSha);
    assert.deepEqual(updatedManifest.skills, updatedCatalog.skills.map((skill) => skill.name));
    assert.equal(existsSync(path.join(codexHome, 'skills', addedSkill, 'SKILL.md')), true);
    assert.equal(existsSync(path.join(grokHome, 'skills', addedSkill, 'SKILL.md')), true);
    assert.equal(existsSync(path.join(codexHome, 'skills', removedSkill)), false);
    assert.equal(existsSync(path.join(grokHome, 'skills', removedSkill)), false);
    assert.equal(existsSync(removedFile), false);
    assert.equal(existsSync(path.join(unmanaged, 'SKILL.md')), true);
    assert.deepEqual(
      readdirSync(path.join(codexHome, 'skills')).filter((name) => name.startsWith('.sylphx-transaction-')),
      [],
    );

    runWithEnvironment(['auto-sync', 'disable', '--quiet'], environment);
    const claude = JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8'));
    const grok = JSON.parse(readFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), 'utf8'));
    assert.equal(claude.language, 'en');
    assert.equal(Object.hasOwn(claude, 'hooks'), false);
    assert.equal(Object.hasOwn(grok, 'hooks'), false);
    assert.equal(existsSync(plist), false);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'repository')), true);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'config.json')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});
