import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  closeSync,
  openSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { packageDigest } from '../runtime/package-digest.mjs';
import { reconcile } from '../runtime/reconcile.mjs';
import { parseIntervalMinutes, schedulerDefinition } from '../runtime/scheduler.mjs';
import { targetGenerationTransactionNames } from '../runtime/target-generation.mjs';

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
    assert.deepEqual(manifest.packageDigests, Object.fromEntries(catalog.skills.map((skill) => [skill.name, skill.packageDigest])));
    assert.deepEqual(manifest.profiles, catalog.skills.filter((skill) => skill.profile).map((skill) => skill.profile));
    assert.equal(existsSync(path.join(destination, 'engineering-standard', 'SKILL.md')), true);
    assert.equal(existsSync(path.join(destination, 'sylphx-platform-first', 'SKILL.md')), true);

    const status = run(['status', '--dest', destination, '--json']);
    const parsed = JSON.parse(status.stdout);
    assert.equal(parsed.targets[0].current, true);

    const installedSkill = path.join(destination, 'engineering-standard', 'SKILL.md');
    writeFileSync(installedSkill, `${readFileSync(installedSkill, 'utf8')}\nmutated\n`);
    const drifted = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(drifted.targets[0].current, false);
    assert.equal(drifted.targets[0].packagesCurrent, false);
    run(['sync', '--dest', destination, '--quiet']);

    writeFileSync(path.join(destination, '.sylphx-skills.json'), `${JSON.stringify({ ...manifest, skills: [] }, null, 2)}\n`);
    const driftedSkills = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedSkills.targets[0].current, false);
    assert.equal(driftedSkills.targets[0].skillsCurrent, false);
    run(['sync', '--dest', destination, '--quiet']);

    const installedProfilePath = path.join(destination, 'technology-stack-profile', 'references', 'profile.json');
    const installedProfile = JSON.parse(readFileSync(installedProfilePath, 'utf8'));
    installedProfile.profile.lifecycle = 'candidate';
    writeFileSync(installedProfilePath, `${JSON.stringify(installedProfile, null, 2)}\n`);
    const driftedProfile = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedProfile.targets[0].current, false);
    assert.equal(driftedProfile.targets[0].packagesCurrent, false);

    run(['sync', '--dest', destination, '--quiet']);
    const installedSkillPath = path.join(destination, 'technology-stack-profile', 'SKILL.md');
    writeFileSync(installedSkillPath, `${readFileSync(installedSkillPath, 'utf8')}\nmutated\n`);
    const driftedSkill = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(driftedSkill.targets[0].current, false);

    run(['sync', '--dest', destination, '--quiet']);
    const installedLink = path.join(destination, 'technology-stack-profile', 'linked.md');
    symlinkSync('SKILL.md', installedLink);
    const linkedStatus = spawnSync(process.execPath, [cli, 'status', '--dest', destination, '--json'], {
      cwd: root,
      encoding: 'utf8',
    });
    assert.equal(linkedStatus.status, 1);
    assert.match(linkedStatus.stderr, /unsupported symbolic link: linked\.md/);

    run(['sync', '--dest', destination, '--quiet']);
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
    run(['sync', '--dest', destination, '--quiet']);
    assert.equal(existsSync(path.join(sandbox, 'unowned')), false);
    assert.equal(JSON.parse(readFileSync(path.join(destination, '.sylphx-skills.json'), 'utf8')).owner, 'SylphxAI/skills');

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

test('sync rejects symbolic links before replacing the affected installed package', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-sync-symlink-'));
  const source = path.join(sandbox, 'source');
  const destination = path.join(sandbox, 'destination');
  const installedPackage = path.join(destination, 'technology-stack-profile');
  try {
    for (const entry of ['runtime', 'skills']) cpSync(path.join(root, entry), path.join(source, entry), { recursive: true });
    for (const entry of ['catalog.json', 'package.json']) cpSync(path.join(root, entry), path.join(source, entry));
    const initial = spawnSync(
      process.execPath,
      [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination, '--quiet'],
      { cwd: source, encoding: 'utf8' },
    );
    assert.equal(initial.status, 0, initial.stderr || initial.stdout);
    symlinkSync(
      'SKILL.md',
      path.join(source, 'skills', 'technology-stack-profile', 'linked.md'),
    );
    writeFileSync(path.join(installedPackage, 'preserved.txt'), 'existing installation\n');

    const result = spawnSync(
      process.execPath,
      [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination, '--quiet'],
      { cwd: source, encoding: 'utf8' },
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /unsupported symbolic link: linked\.md/);
    assert.equal(readFileSync(path.join(installedPackage, 'preserved.txt'), 'utf8'), 'existing installation\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

function writeFixtureCatalog(source, names) {
  const skills = [...names].sort().map((name) => ({
    name,
    description: `Use for the ${name} transaction fixture.`,
    path: `skills/${name}/SKILL.md`,
    packageDigest: packageDigest(path.join(source, 'skills', name)),
  }));
  writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify({
    schemaVersion: 1,
    source: 'skills/*/SKILL.md',
    count: skills.length,
    skills,
  }, null, 2)}\n`);
}

function writeFixtureSkill(source, name, generation) {
  const packageRoot = path.join(source, 'skills', name);
  mkdirSync(packageRoot, { recursive: true });
  writeFileSync(
    path.join(packageRoot, 'SKILL.md'),
    `---\nname: ${name}\ndescription: Use for the ${name} transaction fixture.\n---\n\n${generation}\n`,
  );
}

function createGenerationFixture(sandbox) {
  const source = path.join(sandbox, 'source');
  const destination = path.join(sandbox, 'installed', 'skills');
  cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
  cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
  writeFixtureSkill(source, 'alpha', 'generation-one');
  writeFixtureSkill(source, 'beta', 'generation-one');
  writeFixtureCatalog(source, ['alpha', 'beta']);
  const fixtureCli = path.join(source, 'runtime', 'sylphx-skills.mjs');
  const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
    cwd: source,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return { source, destination, fixtureCli };
}

for (const scenario of [
  { boundary: 'after-package:alpha', beforeStatus: 'old', statusCurrent: false },
  { boundary: 'after-removal:beta', beforeStatus: 'old', statusCurrent: false },
  { boundary: 'after-manifest', beforeStatus: 'old', statusCurrent: false },
  { boundary: 'after-backup', beforeStatus: 'old', statusCurrent: true },
  { boundary: 'after-target', beforeStatus: 'new', statusCurrent: true },
]) {
  test(`whole-target generation recovers a crash at ${scenario.boundary}`, () => {
    const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-crash-'));
    const source = path.join(sandbox, 'source');
    const destination = path.join(sandbox, 'installed', 'skills');
    const fixtureCli = path.join(source, 'runtime', 'sylphx-skills.mjs');
    try {
      cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
      cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
      writeFixtureSkill(source, 'alpha', 'generation-one');
      writeFixtureSkill(source, 'beta', 'generation-one');
      writeFixtureCatalog(source, ['alpha', 'beta']);
      let result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr || result.stdout);
      mkdirSync(path.join(destination, 'third-party'), { recursive: true });
      writeFileSync(path.join(destination, 'third-party', 'KEEP'), 'user-owned\n');

      writeFixtureSkill(source, 'alpha', 'generation-two');
      rmSync(path.join(source, 'skills', 'beta'), { recursive: true, force: true });
      writeFixtureSkill(source, 'gamma', 'generation-two');
      writeFixtureCatalog(source, ['alpha', 'gamma']);

      result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        encoding: 'utf8',
        env: {
          ...process.env,
          NODE_ENV: 'test',
          SYLPHX_SKILLS_TEST_CRASH_AT: scenario.boundary,
        },
      });
      assert.equal(result.status, 86, result.stderr || result.stdout);

      if (scenario.beforeStatus === 'old') {
        assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
        assert.equal(existsSync(path.join(destination, 'beta', 'SKILL.md')), true);
        assert.equal(existsSync(path.join(destination, 'gamma')), false);
      } else if (scenario.beforeStatus === 'missing') {
        assert.equal(existsSync(destination), false);
      } else {
        assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
        assert.equal(existsSync(path.join(destination, 'beta')), false);
        assert.equal(existsSync(path.join(destination, 'gamma', 'SKILL.md')), true);
      }

      const status = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
        cwd: source,
        encoding: 'utf8',
      });
      assert.equal(status.status, 0, status.stderr || status.stdout);
      assert.equal(JSON.parse(status.stdout).targets[0].current, scenario.statusCurrent);

      result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr || result.stdout);
      assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
      assert.equal(existsSync(path.join(destination, 'beta')), false);
      assert.equal(existsSync(path.join(destination, 'gamma', 'SKILL.md')), true);
      assert.equal(readFileSync(path.join(destination, 'third-party', 'KEEP'), 'utf8'), 'user-owned\n');
      assert.deepEqual(targetGenerationTransactionNames(destination), []);
      assert.equal(existsSync(path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`)), false);
      const finalStatus = JSON.parse(spawnSync(
        process.execPath,
        [fixtureCli, 'status', '--dest', destination, '--json'],
        { cwd: source, encoding: 'utf8' },
      ).stdout);
      assert.equal(finalStatus.targets[0].current, true);
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  });
}

test('target generation preserves unproven lookalikes and fails closed on an unowned exact journal', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-ownership-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const lookalike = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-user-owned`);
    mkdirSync(path.join(lookalike, 'stage'), { recursive: true });
    writeFileSync(path.join(lookalike, 'stage', 'KEEP'), 'user-owned\n');
    let result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(path.join(lookalike, 'stage', 'KEEP'), 'utf8'), 'user-owned\n');

    const exact = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation`);
    mkdirSync(path.join(exact, 'stage'), { recursive: true });
    writeFileSync(path.join(exact, 'stage', 'KEEP'), 'unproven\n');
    result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(path.join(exact, 'stage', 'KEEP'), 'utf8'), 'unproven\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation refuses to adopt or delete an unproven internal store', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-unowned-store-'));
  const destination = path.join(sandbox, 'installed', 'skills');
  try {
    const source = path.join(sandbox, 'source');
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
    writeFixtureSkill(source, 'alpha', 'generation-one');
    writeFixtureCatalog(source, ['alpha']);
    const unproven = path.join(destination, '.sylphx-managed-generations', 'generation-aaaaaaaaaaaaaaaa');
    mkdirSync(unproven, { recursive: true });
    writeFileSync(path.join(unproven, 'KEEP'), 'unproven user data\n');
    const result = spawnSync(process.execPath, [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(path.join(unproven, 'KEEP'), 'utf8'), 'unproven user data\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation refuses a fresh desired-name collision without deleting it', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-name-collision-'));
  const destination = path.join(sandbox, 'installed', 'skills');
  try {
    const source = path.join(sandbox, 'source');
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    cpSync(path.join(root, 'package.json'), path.join(source, 'package.json'));
    writeFixtureSkill(source, 'alpha', 'generation-one');
    writeFixtureCatalog(source, ['alpha']);
    const collision = path.join(destination, 'alpha');
    mkdirSync(collision, { recursive: true });
    writeFileSync(path.join(collision, 'KEEP'), 'unowned desired-name collision\n');

    const result = spawnSync(process.execPath, [path.join(source, 'runtime', 'sylphx-skills.mjs'), 'sync', '--dest', destination], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stderr, /refusing to adopt unrelated target entry/);
    assert.equal(readFileSync(path.join(collision, 'KEEP'), 'utf8'), 'unowned desired-name collision\n');
    assert.equal(existsSync(path.join(destination, '.sylphx-managed-generations')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync repairs an owned managed-current control path replaced by a regular file', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-current-drift-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });
    writeFileSync(pointer, 'managed pointer drift\n');

    const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(lstatSync(pointer).isSymbolicLink(), true);
    assert.match(readlinkSync(pointer), /^\.sylphx-managed-generations\/generation-[0-9a-f]{16}$/);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync restores a missing managed-current pointer from exactly one owned generation', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-current-missing-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });

    const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(lstatSync(pointer).isSymbolicLink(), true);
    assert.match(readlinkSync(pointer), /^\.sylphx-managed-generations\/generation-[0-9a-f]{16}$/);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync repairs a valid-shaped managed-current pointer to a nonexistent generation', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-current-dangling-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });
    symlinkSync('.sylphx-managed-generations/generation-0000000000000000', pointer, 'dir');

    const result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(lstatSync(pointer).isSymbolicLink(), true);
    assert.notEqual(readlinkSync(pointer), '.sylphx-managed-generations/generation-0000000000000000');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('clear uses the owned internal generation after projected-manifest loss', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-clear-fallback-'));
  try {
    const { destination, fixtureCli } = createGenerationFixture(sandbox);
    const unrelated = path.join(destination, 'third-party', 'KEEP');
    mkdirSync(path.dirname(unrelated), { recursive: true });
    writeFileSync(unrelated, 'user-owned\n');
    rmSync(path.join(destination, '.sylphx-skills.json'), { force: true });
    rmSync(path.join(destination, '.sylphx-managed-current'), { force: true });

    const result = spawnSync(process.execPath, [fixtureCli, 'clear', '--dest', destination, '--quiet'], {
      cwd: path.dirname(path.dirname(fixtureCli)),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    for (const name of ['alpha', 'beta', '.sylphx-skills.json', '.sylphx-managed-current', '.sylphx-managed-generations']) {
      assert.equal(existsSync(path.join(destination, name)), false, `${name} should be cleared`);
    }
    assert.equal(readFileSync(unrelated, 'utf8'), 'user-owned\n');
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('clear removes owned links after a valid-shaped managed-current pointer becomes dangling', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-clear-dangling-'));
  try {
    const { destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    rmSync(pointer, { force: true });
    symlinkSync('.sylphx-managed-generations/generation-0000000000000000', pointer, 'dir');

    const result = spawnSync(process.execPath, [fixtureCli, 'clear', '--dest', destination, '--quiet'], {
      cwd: path.dirname(path.dirname(fixtureCli)),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    for (const name of ['alpha', 'beta', '.sylphx-skills.json', '.sylphx-managed-current', '.sylphx-managed-generations']) {
      assert.equal(existsSync(path.join(destination, name)), false, `${name} should be cleared`);
    }
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('clear ignores a spoofed projected manifest when an owned generation proves the deletion boundary', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-clear-spoof-'));
  try {
    const { destination, fixtureCli } = createGenerationFixture(sandbox);
    rmSync(path.join(destination, '.sylphx-managed-current'), { force: true });
    rmSync(path.join(destination, '.sylphx-skills.json'), { force: true });
    const replacedOwnedName = path.join(destination, 'alpha', 'KEEP');
    rmSync(path.dirname(replacedOwnedName), { force: true });
    mkdirSync(path.dirname(replacedOwnedName));
    writeFileSync(replacedOwnedName, 'unrelated replacement\n');
    const victim = path.join(destination, 'victim', 'KEEP');
    mkdirSync(path.dirname(victim), { recursive: true });
    writeFileSync(victim, 'unrelated user data\n');
    writeFileSync(path.join(destination, '.sylphx-skills.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      skills: ['victim'],
    })}\n`);

    const result = spawnSync(process.execPath, [fixtureCli, 'clear', '--dest', destination, '--quiet'], {
      cwd: path.dirname(path.dirname(fixtureCli)),
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(victim, 'utf8'), 'unrelated user data\n');
    assert.equal(readFileSync(replacedOwnedName, 'utf8'), 'unrelated replacement\n');
    assert.equal(existsSync(path.join(destination, '.sylphx-managed-generations')), false);
    assert.equal(existsSync(path.join(destination, 'beta')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation rejects a concurrent writer without creating multiple journals', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-concurrent-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const environment = {
      ...process.env,
      NODE_ENV: 'test',
      SYLPHX_SKILLS_TEST_HOLD_AT: 'before-switch',
      SYLPHX_SKILLS_TEST_HOLD_MS: '1000',
    };
    const first = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      env: environment,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let firstError = '';
    first.stderr.on('data', (chunk) => { firstError += chunk; });
    const firstExit = new Promise((resolve) => first.once('exit', resolve));
    const lock = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`);
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (let attempt = 0; attempt < 250 && !existsSync(lock); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(lock), true, 'first writer did not acquire the target lock');
    const liveLock = JSON.parse(readFileSync(lock, 'utf8'));
    liveLock.createdAt = 1;
    writeFileSync(lock, `${JSON.stringify(liveLock)}\n`);

    const second = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.notEqual(second.status, 0, second.stderr || second.stdout);
    assert.match(second.stderr, /target generation is busy/);
    const firstCode = await firstExit;
    assert.equal(firstCode, 0, firstError);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
    assert.equal(existsSync(lock), false);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('two contenders CAS-reclaim one expired lock without overlapping target writers', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-stale-lock-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const lock = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`);
    writeFileSync(lock, `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      target: path.basename(destination),
      pid: process.pid,
      createdAt: Date.now() - (11 * 60 * 1_000),
      processStartIdentity: 'expired process identity fixture',
      token: 'a'.repeat(32),
    })}\n`);
    const environment = {
      ...process.env,
      NODE_ENV: 'test',
      SYLPHX_SKILLS_TEST_HOLD_AT: 'before-switch',
      SYLPHX_SKILLS_TEST_HOLD_MS: '500',
    };
    const start = () => {
      const child = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
        cwd: source,
        env: environment,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      let stderr = '';
      child.stderr.on('data', (chunk) => { stderr += chunk; });
      return new Promise((resolve) => child.once('exit', (code) => resolve({ code, stderr })));
    };
    const results = await Promise.all([start(), start()]);
    assert.equal(results.filter((result) => result.code === 0).length, 1, JSON.stringify(results));
    assert.match(results.find((result) => result.code !== 0).stderr, /target generation is busy/);
    assert.equal(existsSync(lock), false);
    assert.equal(existsSync(`${lock}-reclaiming`), false);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('target generation never moves a late unrelated write during the managed pointer switch', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-late-write-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    let result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
      env: { ...process.env, NODE_ENV: 'test', SYLPHX_SKILLS_TEST_LATE_UNOWNED_WRITE: '1' },
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const lateFile = path.join(destination, 'third-party-late-write', 'KEEP');
    assert.equal(readFileSync(lateFile, 'utf8'), 'late user-owned write\n');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('an unrelated open file descriptor remains live across the managed generation switch', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-open-fd-'));
  let descriptor;
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const unrelated = path.join(destination, 'third-party-open-fd');
    mkdirSync(unrelated);
    const unrelatedFile = path.join(unrelated, 'KEEP');
    writeFileSync(unrelatedFile, 'before\n');
    descriptor = openSync(unrelatedFile, 'a');
    const oldPointer = readlinkSync(path.join(destination, '.sylphx-managed-current'));
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const child = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_AT: 'after-switch',
        SYLPHX_SKILLS_TEST_HOLD_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    const exit = new Promise((resolve) => child.once('exit', resolve));
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    const pointer = path.join(destination, '.sylphx-managed-current');
    for (let attempt = 0; attempt < 250 && readlinkSync(pointer) === oldPointer; attempt += 1) {
      Atomics.wait(waiter, 0, 0, 20);
    }
    assert.notEqual(readlinkSync(pointer), oldPointer, 'managed pointer did not switch');
    writeSync(descriptor, 'after\n');
    closeSync(descriptor);
    descriptor = undefined;
    assert.equal(await exit, 0, stderr);
    assert.equal(readFileSync(unrelatedFile, 'utf8'), 'before\nafter\n');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    if (descriptor !== undefined) closeSync(descriptor);
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

test('reconciler fetches only changed commits, honors TTL, and fences concurrent scheduler ticks', async () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-reconcile-'));
  const remote = path.join(sandbox, 'source');
  const stateDirectory = path.join(sandbox, 'state');
  const codexHome = path.join(sandbox, 'codex');
  const claudeHome = path.join(sandbox, 'claude');
  const grokHome = path.join(sandbox, 'grok');
  try {
    mkdirSync(path.join(remote, 'runtime'), { recursive: true });
    git(remote, ['init', '--initial-branch=main']);
    const fixtureCli = `import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';\nimport path from 'node:path';\nconst args = process.argv.slice(2);\nconst agentIndex = args.indexOf('--agent');\nconst agents = agentIndex >= 0 ? args[agentIndex + 1].split(',') : ['codex', 'claude', 'grok'];\nconst homes = { codex: process.env.CODEX_HOME, claude: process.env.CLAUDE_CONFIG_DIR, grok: process.env.GROK_HOME };\nif (args[0] === 'status') {\n  const targets = agents.map((runtime) => {\n    const marker = path.join(homes[runtime], 'applied-sha.txt');\n    return { runtime, current: existsSync(marker) && readFileSync(marker, 'utf8').trim() === process.env.SYLPHX_SKILLS_COMMIT_SHA };\n  });\n  console.log(JSON.stringify({ command: 'status', targets }));\n} else {\n  for (const runtime of agents) {\n    mkdirSync(homes[runtime], { recursive: true });\n    writeFileSync(path.join(homes[runtime], 'applied-sha.txt'), process.env.SYLPHX_SKILLS_COMMIT_SHA + '\\n');\n  }\n}\n`;
    writeFileSync(path.join(remote, 'runtime', 'sylphx-skills.mjs'), fixtureCli);
    cpSync(path.join(root, 'runtime', 'reconcile.mjs'), path.join(remote, 'runtime', 'reconcile.mjs'));
    writeFileSync(path.join(remote, 'content.txt'), 'one\n');
    const firstSha = commit(remote, 'first');

    mkdirSync(stateDirectory, { recursive: true });
    const config = {
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      enabled: true,
      mode: 'interval-scheduler',
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

    const crlfCheckoutRun = (command, args, options) => {
      const clone = command === 'git' && args[0] === 'clone';
      const result = spawnSync(command, clone ? ['-c', 'core.autocrlf=true', ...args] : args, {
        encoding: 'utf8',
        ...options,
      });
      if (clone && result.status === 0) git(config.repository, ['config', 'core.autocrlf', 'true']);
      return result;
    };
    const first = reconcile({ stateDirectory, force: true, strict: true, now: 1_000, run: crlfCheckoutRun });
    assert.equal(first.status, 'updated');
    assert.equal(first.appliedSha, firstSha);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstSha);
    assert.equal(readFileSync(path.join(config.repository, 'content.txt'), 'utf8'), 'one\r\n');

    let remoteChecks = 0;
    const countingRun = (command, args, options) => {
      if (command === 'git' && args.includes('ls-remote')) remoteChecks += 1;
      return spawnSync(command, args, { encoding: 'utf8', ...options });
    };
    const fresh = reconcile({ stateDirectory, maxAgeMs: 10_000, now: 5_000, run: countingRun });
    assert.equal(fresh.status, 'fresh');
    assert.equal(remoteChecks, 0);

    writeFileSync(path.join(codexHome, 'applied-sha.txt'), 'locally drifted\n');
    const repaired = reconcile({ stateDirectory, maxAgeMs: 10_000, strict: true, now: 6_000, run: countingRun });
    assert.equal(repaired.status, 'updated');
    assert.equal(repaired.repaired, true);
    assert.equal(repaired.appliedSha, firstSha);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstSha);
    assert.equal(remoteChecks, 0);

    writeFileSync(path.join(codexHome, 'applied-sha.txt'), 'offline local drift\n');
    const offlineRun = (command, args, options) => {
      if (command === 'git' && args.includes('ls-remote')) {
        return { status: 1, stdout: '', stderr: 'offline fixture' };
      }
      return spawnSync(command, args, { encoding: 'utf8', ...options });
    };
    const offlineRepaired = reconcile({ stateDirectory, force: true, now: 7_000, run: offlineRun });
    assert.equal(offlineRepaired.status, 'unavailable');
    assert.equal(offlineRepaired.repaired, true);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), firstSha);

    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');
    writeFileSync(path.join(remote, '.gitattributes'), '* text=auto eol=lf\n');
    const attributesSha = commit(remote, 'bind exact checkout line endings');
    const attributesUpdate = reconcile({ stateDirectory, force: true, strict: true, now: 16_000 });
    assert.equal(attributesUpdate.status, 'updated');
    assert.equal(attributesUpdate.appliedSha, attributesSha);
    assert.equal(
      readFileSync(path.join(config.repository, 'content.txt'), 'utf8'),
      'one\n',
      'candidate application must rematerialize unchanged tracked files under new attributes',
    );

    writeFileSync(path.join(remote, 'content.txt'), 'two\n');
    const secondSha = commit(remote, 'second');
    const second = reconcile({ stateDirectory, force: true, maxAgeMs: 10_000, strict: true, now: 17_000 });
    assert.equal(second.status, 'updated');
    assert.equal(second.appliedSha, secondSha);
    assert.equal(readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(), secondSha);

    const held = spawn(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_STATE_DIR: stateDirectory,
        SYLPHX_SKILLS_TEST_HOLD_RECONCILE_LOCK_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let heldStderr = '';
    held.stderr.on('data', (chunk) => { heldStderr += chunk; });
    const heldExit = new Promise((resolve) => held.once('exit', resolve));
    const lockFile = path.join(stateDirectory, 'reconcile.lock');
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (let attempt = 0; attempt < 250 && !existsSync(lockFile); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(lockFile), true, 'first scheduler tick did not acquire its lock');
    const liveLock = JSON.parse(readFileSync(lockFile, 'utf8'));
    liveLock.createdAt = 1;
    writeFileSync(lockFile, `${JSON.stringify(liveLock)}\n`);

    const overlapping = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, SYLPHX_SKILLS_STATE_DIR: stateDirectory },
    });
    assert.equal(overlapping.status, 0, overlapping.stderr || overlapping.stdout);
    assert.equal(JSON.parse(overlapping.stdout).status, 'busy');
    assert.equal(await heldExit, 0, heldStderr);
    assert.equal(existsSync(lockFile), false);

    writeFileSync(lockFile, `${JSON.stringify({
      schemaVersion: 1,
      owner: 'SylphxAI/skills',
      pid: process.pid,
      createdAt: 1,
      processStartIdentity: 'reused pid identity fixture',
      token: 'b'.repeat(32),
    })}\n`);
    const reclaimed = reconcile({ stateDirectory, force: true, strict: true, now: 17_500, run: countingRun });
    assert.notEqual(reclaimed.status, 'busy');
    assert.equal(existsSync(lockFile), false);

    mkdirSync(path.join(stateDirectory, 'reconcile.lock'));
    const busy = reconcile({ stateDirectory, force: true, now: 18_000, run: countingRun });
    assert.equal(busy.status, 'busy');
    rmSync(path.join(stateDirectory, 'reconcile.lock'), { recursive: true, force: true });

    const unavailableCommands = [];
    const unavailable = reconcile({
      stateDirectory,
      maxAgeMs: 10_000,
      now: 28_000,
      run: (command, args, options) => {
        unavailableCommands.push([command, ...args]);
        if (command === 'git' && args.includes('ls-remote')) {
          return { status: 1, stdout: '', stderr: 'offline' };
        }
        return spawnSync(command, args, { encoding: 'utf8', ...options });
      },
    });
    assert.equal(unavailable.status, 'unavailable');
    assert.equal(
      unavailableCommands.some(([command, ...args]) => command === 'git' && args.includes('rev-parse')),
      true,
      'a due tick must verify its exact local source before checking the remote',
    );
    assert.equal(
      unavailableCommands.filter(([command, ...args]) => command === 'git' && args.includes('ls-remote')).length,
      1,
    );
    const backoff = reconcile({ stateDirectory, maxAgeMs: 10_000, now: 29_000, run: countingRun });
    assert.equal(backoff.status, 'backoff');

    config.enabled = false;
    writeFileSync(path.join(stateDirectory, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
    writeFileSync(path.join(codexHome, 'applied-sha.txt'), 'disabled scheduler fence\n');
    const disabledTick = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, SYLPHX_SKILLS_STATE_DIR: stateDirectory },
    });
    assert.equal(disabledTick.status, 0, disabledTick.stderr || disabledTick.stdout);
    assert.equal(JSON.parse(disabledTick.stdout).status, 'disabled');
    assert.equal(
      readFileSync(path.join(codexHome, 'applied-sha.txt'), 'utf8').trim(),
      'disabled scheduler fence',
      'a scheduled entry must not perform target effects before enable promotion commits',
    );
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('auto-sync enables a configurable scheduler, repairs exact-source drift, and removes legacy hooks', async () => {
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
    const remoteReconciler = path.join(source, 'runtime', 'reconcile.mjs');
    writeFileSync(remoteReconciler, `${readFileSync(remoteReconciler, 'utf8')}\n// exact remote candidate fixture\n`);
    const sourceSha = commit(source, 'fixture source');

    const legacyCommand = `'${process.execPath}' '${path.join(managedHome, '.sylphx-skills', 'reconcile.mjs')}' --quiet`;
    const legacyHooks = { UserPromptSubmit: [{ hooks: [{ type: 'command', command: legacyCommand }] }] };
    mkdirSync(claudeHome, { recursive: true });
    writeFileSync(path.join(claudeHome, 'settings.json'), `${JSON.stringify({ language: 'en', hooks: legacyHooks }, null, 2)}\n`);
    mkdirSync(path.join(grokHome, 'hooks'), { recursive: true });
    writeFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), `${JSON.stringify({ hooks: legacyHooks }, null, 2)}\n`);
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

    const lifecycleReady = path.join(managedHome, '.sylphx-skills', '.test-enable-after-reconcile-ready');
    const enabling = spawn(process.execPath, [cli, 'auto-sync', 'enable', '--interval', '7m', '--quiet'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_ENABLE_AFTER_RECONCILE_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let enableStdout = '';
    let enableStderr = '';
    enabling.stdout.on('data', (chunk) => { enableStdout += chunk; });
    enabling.stderr.on('data', (chunk) => { enableStderr += chunk; });
    const enableExit = new Promise((resolve) => enabling.once('exit', resolve));
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (let attempt = 0; attempt < 250 && !existsSync(lifecycleReady); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(lifecycleReady), true, 'enable did not reach its post-reconcile lifecycle phase');
    const busyDisableDuringEnable = spawnSync(process.execPath, [cli, 'auto-sync', 'disable', '--quiet'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.notEqual(busyDisableDuringEnable.status, 0);
    assert.match(busyDisableDuringEnable.stderr, /lifecycle is busy/);
    assert.equal(JSON.parse(readFileSync(path.join(managedHome, '.sylphx-skills', 'config.json'), 'utf8')).enabled, false);
    const tickBetweenEnablePhases = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force',
    ], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.equal(tickBetweenEnablePhases.status, 0, tickBetweenEnablePhases.stderr || tickBetweenEnablePhases.stdout);
    assert.equal(JSON.parse(tickBetweenEnablePhases.stdout).status, 'disabled');
    assert.equal(await enableExit, 0, enableStderr || enableStdout);

    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'sync.sh')), false);
    assert.equal(
      readFileSync(path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), 'utf8'),
      readFileSync(remoteReconciler, 'utf8'),
      'scheduler adapter must remain sourced from the exact remote candidate applied during enable',
    );
    const installedManifest = path.join(codexHome, 'skills', '.sylphx-skills.json');
    assert.equal(existsSync(installedManifest), true, `installed paths: ${readdirSync(managedHome, { recursive: true }).join(', ')}`);
    assert.equal(readFileSync(installedManifest, 'utf8').includes(sourceSha), true);
    assert.equal(JSON.parse(readFileSync(path.join(grokHome, 'skills', '.sylphx-skills.json'), 'utf8')).sourceCommit, sourceSha);
    const status = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(status.enabled, true);
    assert.equal(status.intervalMinutes, 7);
    assert.equal(status.mode, 'interval-scheduler');
    const plist = path.join(managedHome, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist');
    assert.match(readFileSync(plist, 'utf8'), /<key>StartInterval<\/key><integer>420<\/integer>/);
    assert.equal(Object.hasOwn(JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8')), 'hooks'), false);
    assert.equal(Object.hasOwn(JSON.parse(readFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), 'utf8')), 'hooks'), false);

    const driftedManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    driftedManifest.catalogDigest = `sha256:${'0'.repeat(64)}`;
    driftedManifest.profiles[0].lifecycle = 'candidate';
    driftedManifest.skills = [];
    writeFileSync(installedManifest, `${JSON.stringify(driftedManifest, null, 2)}\n`);
    const driftedSkill = path.join(codexHome, 'skills', 'engineering-standard', 'SKILL.md');
    writeFileSync(driftedSkill, `${readFileSync(driftedSkill, 'utf8')}\nlocal drift\n`);
    const repaired = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repaired.status, 0, repaired.stderr || repaired.stdout);
    const repairResult = JSON.parse(repaired.stdout);
    assert.equal(repairResult.status, 'updated');
    assert.equal(repairResult.repaired, true);
    assert.equal(repairResult.appliedSha, sourceSha);
    const repairedManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    assert.notEqual(repairedManifest.catalogDigest, driftedManifest.catalogDigest);
    assert.equal(repairedManifest.profiles[0].lifecycle, 'active');
    assert.deepEqual(repairedManifest.skills, catalog.skills.map((skill) => skill.name));
    assert.equal(repairedManifest.sourceCommit, sourceSha);
    assert.equal(readFileSync(driftedSkill, 'utf8').includes('local drift'), false);

    rmSync(installedManifest, { force: true });
    writeFileSync(installedManifest, '{"owner":"invalid projection"}\n');
    const installedSkillLink = path.join(codexHome, 'skills', 'engineering-standard');
    rmSync(installedSkillLink, { recursive: true, force: true });
    mkdirSync(installedSkillLink);
    writeFileSync(path.join(installedSkillLink, 'SKILL.md'), 'managed link drift\n');
    const repairedLinks = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedLinks.status, 0, repairedLinks.stderr || repairedLinks.stdout);
    assert.equal(JSON.parse(repairedLinks.stdout).repaired, true);
    assert.equal(lstatSync(installedManifest).isSymbolicLink(), true);
    assert.equal(lstatSync(installedSkillLink).isSymbolicLink(), true);
    assert.equal(readFileSync(path.join(installedSkillLink, 'SKILL.md'), 'utf8').includes('managed link drift'), false);

    const managedCurrent = path.join(codexHome, 'skills', '.sylphx-managed-current');
    rmSync(managedCurrent, { force: true });
    writeFileSync(managedCurrent, 'managed current pointer drift\n');
    const repairedCurrent = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedCurrent.status, 0, repairedCurrent.stderr || repairedCurrent.stdout);
    assert.equal(JSON.parse(repairedCurrent.stdout).repaired, true);
    assert.equal(lstatSync(managedCurrent).isSymbolicLink(), true);
    assert.match(readlinkSync(managedCurrent), /^\.sylphx-managed-generations\/generation-[0-9a-f]{16}$/);
    assert.equal(JSON.parse(readFileSync(installedManifest, 'utf8')).sourceCommit, sourceSha);

    const residualSkill = path.join(codexHome, 'skills', '.sylphx-managed-current', 'residual-owned-skill');
    mkdirSync(residualSkill);
    writeFileSync(path.join(residualSkill, 'SKILL.md'), 'stale owned package\n');
    symlinkSync('.sylphx-managed-current/residual-owned-skill', path.join(codexHome, 'skills', 'residual-owned-skill'), 'dir');
    const repairedResidual = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedResidual.status, 0, repairedResidual.stderr || repairedResidual.stdout);
    assert.equal(JSON.parse(repairedResidual.stdout).repaired, true);
    assert.equal(existsSync(path.join(codexHome, 'skills', 'residual-owned-skill')), false);
    assert.equal(existsSync(residualSkill), false);

    const staleAuthoredFields = JSON.parse(readFileSync(installedManifest, 'utf8'));
    staleAuthoredFields.packageVersion = '0.0.0-stale';
    staleAuthoredFields.runtime = 'wrong-runtime';
    staleAuthoredFields.unexpected = 'stale field';
    writeFileSync(installedManifest, `${JSON.stringify(staleAuthoredFields, null, 2)}\n`);
    const repairedAuthoredFields = spawnSync(process.execPath, [
      path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'),
      '--force', '--strict',
    ], { encoding: 'utf8', env: { ...process.env, ...environment } });
    assert.equal(repairedAuthoredFields.status, 0, repairedAuthoredFields.stderr || repairedAuthoredFields.stdout);
    assert.equal(JSON.parse(repairedAuthoredFields.stdout).repaired, true);
    const exactManifest = JSON.parse(readFileSync(installedManifest, 'utf8'));
    assert.equal(exactManifest.packageVersion, JSON.parse(readFileSync(path.join(source, 'package.json'), 'utf8')).version);
    assert.equal(exactManifest.runtime, 'codex');
    assert.equal(Object.hasOwn(exactManifest, 'unexpected'), false);

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
    for (const skill of updatedCatalog.skills) {
      skill.packageDigest = packageDigest(path.join(source, 'skills', skill.name));
    }
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

    const held = spawn(process.execPath, [path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), '--force'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_RECONCILE_LOCK_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let heldStdout = '';
    let heldStderr = '';
    held.stdout.on('data', (chunk) => { heldStdout += chunk; });
    held.stderr.on('data', (chunk) => { heldStderr += chunk; });
    const heldExit = new Promise((resolve) => held.once('exit', resolve));
    const reconcileLock = path.join(managedHome, '.sylphx-skills', 'reconcile.lock');
    for (let attempt = 0; attempt < 250 && !existsSync(reconcileLock); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(reconcileLock), true, 'scheduler tick did not acquire its reconcile lock');
    const busyDisableDuringReconcile = spawnSync(process.execPath, [cli, 'auto-sync', 'disable', '--quiet'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...environment },
    });
    assert.notEqual(busyDisableDuringReconcile.status, 0);
    assert.match(busyDisableDuringReconcile.stderr, /automatic synchronization is busy/);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'config.json')), true);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'reconcile.mjs')), true);
    assert.equal(existsSync(plist), false, 'disable admission must stop future scheduler ticks before waiting');
    assert.equal(await heldExit, 0, heldStderr || heldStdout);

    const preLockReady = path.join(managedHome, '.sylphx-skills', '.test-before-reconcile-lock-ready');
    const preLockTick = spawn(process.execPath, [path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), '--force'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_BEFORE_RECONCILE_LOCK_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let preLockStdout = '';
    let preLockStderr = '';
    preLockTick.stdout.on('data', (chunk) => { preLockStdout += chunk; });
    preLockTick.stderr.on('data', (chunk) => { preLockStderr += chunk; });
    const preLockExit = new Promise((resolve) => preLockTick.once('exit', resolve));
    for (let attempt = 0; attempt < 250 && !existsSync(preLockReady); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(preLockReady), true, 'scheduler tick did not reach its pre-lock test boundary');
    runWithEnvironment(['auto-sync', 'disable', '--quiet'], environment);
    assert.equal(await preLockExit, 0, preLockStderr || preLockStdout);
    assert.equal(JSON.parse(preLockStdout).status, 'unconfigured');
    assert.equal(
      JSON.parse(readFileSync(installedManifest, 'utf8')).sourceCommit,
      updatedSha,
      'a tick admitted before disable must re-read config under lock and perform no later target effects',
    );
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
