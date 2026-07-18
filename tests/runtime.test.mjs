import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import {
  installRuntimeHooks,
  runtimeHookStatus,
  uninstallRuntimeHooks,
} from '../runtime/hooks.mjs';
import { reconcile } from '../runtime/reconcile.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const cli = path.join(root, 'runtime', 'sylphx-skills.mjs');
const catalog = JSON.parse(readFileSync(path.join(root, 'catalog.json'), 'utf8'));

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);
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
    assert.equal(existsSync(path.join(destination, 'engineering-standard', 'SKILL.md')), true);
    assert.equal(existsSync(path.join(destination, 'sylphx-platform-first', 'SKILL.md')), true);

    const status = run(['status', '--dest', destination, '--json']);
    const parsed = JSON.parse(status.stdout);
    assert.equal(parsed.targets[0].current, true);

    run(['sync', '--dest', destination, '--quiet']);
    run(['clear', '--dest', destination, '--quiet']);
    assert.equal(existsSync(path.join(destination, 'engineering-standard')), false);
    assert.equal(existsSync(path.join(destination, '.sylphx-skills.json')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent override targets Codex and Claude without upstream tooling', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-targets-'));
  try {
    const script = `import { resolveTargets } from ${JSON.stringify(new URL('../runtime/sylphx-skills.mjs', import.meta.url).href)}; console.log(JSON.stringify(resolveTargets({args:['--agent','all'],homedir:${JSON.stringify(sandbox)}})));`;
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const targets = JSON.parse(result.stdout);
    assert.deepEqual(targets.map((target) => target.runtime), ['codex', 'claude']);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('runtime hooks preserve user configuration and cover long turns without duplicates', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-hooks-'));
  const homes = {
    codexHome: path.join(sandbox, '.codex'),
    claudeHome: path.join(sandbox, '.claude'),
  };
  const reconcilerPath = path.join(sandbox, '.sylphx-skills', 'reconcile.mjs');
  try {
    mkdirSync(homes.codexHome, { recursive: true });
    mkdirSync(homes.claudeHome, { recursive: true });
    writeFileSync(path.join(homes.codexHome, 'hooks.json'), `${JSON.stringify({
      description: 'keep me',
      hooks: { PostToolUse: [{ matcher: 'Bash', hooks: [{ type: 'command', command: 'existing-check' }] }] },
    }, null, 2)}\n`);
    writeFileSync(path.join(homes.claudeHome, 'settings.json'), `${JSON.stringify({ language: 'en' }, null, 2)}\n`);

    const options = {
      agents: ['codex', 'claude'],
      homes,
      nodePath: process.execPath,
      reconcilerPath,
    };
    installRuntimeHooks(options);
    installRuntimeHooks(options);

    const codex = JSON.parse(readFileSync(path.join(homes.codexHome, 'hooks.json'), 'utf8'));
    const claude = JSON.parse(readFileSync(path.join(homes.claudeHome, 'settings.json'), 'utf8'));
    assert.equal(codex.description, 'keep me');
    assert.equal(codex.hooks.PostToolUse.length, 1);
    assert.equal(codex.hooks.PreToolUse.filter((group) => group.hooks.some((hook) => hook.command.includes(reconcilerPath))).length, 1);
    assert.equal(claude.language, 'en');
    assert.equal(Array.isArray(claude.hooks.PostToolBatch), true);
    assert.equal(Object.hasOwn(claude.hooks, 'PostToolUse'), false);
    assert.deepEqual(runtimeHookStatus(options).map((item) => item.installed), [true, true]);

    uninstallRuntimeHooks(options);
    const cleanedCodex = JSON.parse(readFileSync(path.join(homes.codexHome, 'hooks.json'), 'utf8'));
    const cleanedClaude = JSON.parse(readFileSync(path.join(homes.claudeHome, 'settings.json'), 'utf8'));
    assert.equal(cleanedCodex.description, 'keep me');
    assert.equal(cleanedCodex.hooks.PostToolUse.length, 1);
    assert.equal(cleanedClaude.language, 'en');
    assert.equal(Object.hasOwn(cleanedClaude, 'hooks'), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('reconciler fetches only changed commits, honors TTL, and single-flights active agents', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-reconcile-'));
  const remote = path.join(sandbox, 'source');
  const stateDirectory = path.join(sandbox, 'state');
  const codexHome = path.join(sandbox, 'codex');
  const claudeHome = path.join(sandbox, 'claude');
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
      agents: ['codex', 'claude'],
      homes: { codexHome, claudeHome },
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

test('auto-sync enable performs one exact-source install and disable removes only managed hooks', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-auto-sync-'));
  const source = path.join(sandbox, 'source');
  const managedHome = path.join(sandbox, 'home');
  const codexHome = path.join(managedHome, '.codex');
  const claudeHome = path.join(managedHome, '.claude');
  try {
    mkdirSync(source, { recursive: true });
    git(source, ['init', '--initial-branch=main']);
    for (const entry of ['runtime', 'skills']) cpSync(path.join(root, entry), path.join(source, entry), { recursive: true });
    for (const entry of ['catalog.json', 'package.json']) cpSync(path.join(root, entry), path.join(source, entry));
    const sourceSha = commit(source, 'fixture source');

    mkdirSync(claudeHome, { recursive: true });
    writeFileSync(path.join(claudeHome, 'settings.json'), `${JSON.stringify({ language: 'en' }, null, 2)}\n`);
    mkdirSync(path.join(managedHome, '.sylphx-skills'), { recursive: true });
    writeFileSync(path.join(managedHome, '.sylphx-skills', 'sync.sh'), 'legacy\n');
    const environment = {
      SYLPHX_SKILLS_HOME: managedHome,
      SYLPHX_SKILLS_REMOTE: source,
      CODEX_HOME: codexHome,
      CLAUDE_CONFIG_DIR: claudeHome,
    };

    runWithEnvironment(['auto-sync', 'enable', '--quiet'], environment);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'sync.sh')), false);
    const installedManifest = path.join(codexHome, 'skills', '.sylphx-skills.json');
    assert.equal(existsSync(installedManifest), true, `installed paths: ${readdirSync(managedHome, { recursive: true }).join(', ')}`);
    assert.equal(readFileSync(installedManifest, 'utf8').includes(sourceSha), true);
    const status = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(status.enabled, true);
    assert.equal(status.mode, 'consumption-boundary-reconciliation');
    assert.equal(status.hooks.every((hook) => hook.installed), true);

    writeFileSync(path.join(source, 'update-marker.txt'), 'changed\n');
    const updatedSha = commit(source, 'updated fixture source');
    const hookRun = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict', '--quiet',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(hookRun.status, 0, hookRun.stderr || hookRun.stdout);
    assert.equal(readFileSync(installedManifest, 'utf8').includes(updatedSha), true);

    runWithEnvironment(['auto-sync', 'disable', '--quiet'], environment);
    const claude = JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8'));
    assert.equal(claude.language, 'en');
    assert.equal(Object.hasOwn(claude, 'hooks'), false);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'repository')), true);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'config.json')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});
