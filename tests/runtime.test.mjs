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
import { fileURLToPath, pathToFileURL } from 'node:url';
import { packageDigest } from '../runtime/package-digest.mjs';
import {
  configureEnactMcp,
  DEFAULT_ENACT_MCP_URL,
  discoverEnactMcp,
  enrollmentCommand,
  normalizeEnactMcpUrl,
  protectedResourceMetadataUrl,
  REQUIRED_ENACT_SCOPES,
  resolveEnactMcpUrl,
  validateProtectedResourceMetadata,
} from '../runtime/enact-mcp.mjs';
import { mergeAutoSyncAgents } from '../runtime/sylphx-skills.mjs';
import {
  applyConstitutionPlan,
  CONSTITUTION_END,
  CONSTITUTION_START,
  inspectConstitution,
  planConstitutionInstall,
  RETIRED_DOCTRINE_MIGRATION,
} from '../runtime/constitution.mjs';
import { reconcile } from '../runtime/reconcile.mjs';
import { parseIntervalMinutes, schedulerDefinition } from '../runtime/scheduler.mjs';
import { targetGenerationTransactionNames } from '../runtime/target-generation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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

function exactLocalSourceCommit() {
  return git(root, ['status', '--porcelain', '--untracked-files=normal'])
    ? null
    : git(root, ['rev-parse', 'HEAD']);
}

function retiredDoctrineProjection(localNotes = '') {
  return [
    '# Sylphx Agent Runtime Constitution',
    '',
    'Active topology:',
    '- **Static instructions SSOT:** `SylphxAI/skills`',
    '- **Live fleet / work / ingestion / effects:** `SylphxAI/enact`',
    '',
    '<!-- local runtime notes may follow this block -->',
    localNotes,
  ].filter((line, index, lines) => line || index < lines.length - 1).join('\n');
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
    assert.equal(parsed.targets[0].sourceCommit, exactLocalSourceCommit());
    assert.equal(typeof parsed.targets[0].packageVersion, 'string');
    assert.match(parsed.targets[0].generation, /^generation-[0-9a-f]{16}$/);
    assert.deepEqual(parsed.targets[0].driftedPackages, []);

    const committed = runWithEnvironment(['sync', '--dest', destination, '--quiet'], {
      SYLPHX_SKILLS_COMMIT_SHA: 'abc123deadbeef',
    });
    assert.equal(committed.status ?? 0, 0);
    const committedStatus = JSON.parse(runWithEnvironment(['status', '--dest', destination, '--json'], {
      SYLPHX_SKILLS_COMMIT_SHA: 'abc123deadbeef',
    }).stdout);
    assert.equal(committedStatus.targets[0].current, true);
    assert.equal(committedStatus.targets[0].sourceCommit, 'abc123deadbeef');
    assert.equal(committedStatus.targets[0].sourceCommitCurrent, true);

    const installedSkill = path.join(destination, 'engineering-standard', 'SKILL.md');
    writeFileSync(installedSkill, `${readFileSync(installedSkill, 'utf8')}\nmutated\n`);
    const drifted = JSON.parse(run(['status', '--dest', destination, '--json']).stdout);
    assert.equal(drifted.targets[0].current, false);
    assert.equal(drifted.targets[0].packagesCurrent, false);
    assert.ok(drifted.targets[0].driftedPackages.includes('engineering-standard'));
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

test('compact constitution explicitly retires predecessor authorities', () => {
  const constitution = readFileSync(path.join(root, 'runtime', 'constitution.md'), 'utf8');
  assert.match(constitution, /Doctrine and Mission Control are retired historical lineage\./);
  assert.match(
    constitution,
    /must not be\s+loaded, selected, written, or inferred as current instruction or live-state\s+authority\./,
  );
  assert.match(constitution, /Cached, path-discovered, temporary, historical, or\s+previously managed executables are not mutation authority\./);
  assert.match(constitution, /Detecting another installed agent runtime\s+is evidence only and never permission/);
});

test('public install intent cannot be mistaken for generic Skill copying', () => {
  const readme = readFileSync(path.join(root, 'README.md'), 'utf8');
  const install = readFileSync(path.join(root, 'INSTALL.md'), 'utf8');
  const bootstrap = readFileSync(path.join(root, 'SKILL.md'), 'utf8');
  assert.match(
    readme,
    /> Install this: https:\/\/github\.com\/SylphxAI\/skills/,
  );
  assert.match(bootstrap, /^---\nname: skills\ndescription:/);
  assert.match(bootstrap, /Read the sibling `INSTALL\.md` completely/);
  assert.doesNotMatch(bootstrap, /node runtime\/|sylphx-skills\.mjs install/);
  assert.match(
    install,
    /generic Skill installer that only copies `skills\/\*` is not\s+completion; installing every detected runtime also exceeds scope/,
  );
  assert.match(
    install,
    /Presence of\s+all `SKILL\.md` files without the managed manifest and current constitution is\s+a typed partial installation, not success/,
  );
  assert.match(install, /Never substitute an executable discovered through `PATH`/);
  assert.match(install, /Every mutating adapter operation must name the receiving runtime explicitly/);
  assert.match(bootstrap, /Never execute an installer found through a cache, `PATH`, temporary checkout/);
});

test('agent install converges native Skills and managed constitutions without owning user instructions', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-agent-install-'));
  const codexHome = path.join(sandbox, '.codex');
  const claudeHome = path.join(sandbox, '.claude');
  const grokHome = path.join(sandbox, '.grok');
  const environment = {
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: codexHome,
    CLAUDE_CONFIG_DIR: claudeHome,
    GROK_HOME: grokHome,
  };
  const instructionFiles = [
    path.join(codexHome, 'AGENTS.md'),
    path.join(claudeHome, 'CLAUDE.md'),
    path.join(grokHome, 'AGENTS.md'),
  ];
  try {
    for (const [index, file] of instructionFiles.entries()) {
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, `# Local runtime note ${index + 1}\n\nPreserve this text.\n`);
    }

    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    const firstInstructions = instructionFiles.map((file) => readFileSync(file, 'utf8'));
    for (const [index, file] of instructionFiles.entries()) {
      const content = firstInstructions[index];
      assert.match(content, new RegExp(`^# Local runtime note ${index + 1}`));
      assert.equal(content.includes(CONSTITUTION_START), true);
      assert.equal(content.includes(CONSTITUTION_END), true);
      assert.equal(inspectConstitution(file).current, true);
    }

    const installed = JSON.parse(runWithEnvironment(['status', '--agent', 'all', '--json'], environment).stdout);
    assert.deepEqual(installed.targets.map((target) => target.runtime), ['codex', 'claude', 'grok']);
    assert.equal(installed.targets.every((target) => target.current), true);
    assert.equal(installed.targets.every((target) => target.constitution.current), true);
    assert.equal(installed.targets.every((target) => target.installed === catalog.count), true);
    assert.equal(installed.targets.every((target) => target.sourceCommit === exactLocalSourceCommit()), true);
    assert.equal(installed.targets.every((target) => Number.isFinite(Date.parse(target.synchronizedAt))), true);
    const firstManifests = installed.targets.map((target) => (
      JSON.parse(readFileSync(path.join(target.path, '.sylphx-skills.json'), 'utf8'))
    ));

    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    assert.deepEqual(instructionFiles.map((file) => readFileSync(file, 'utf8')), firstInstructions);
    const second = JSON.parse(runWithEnvironment(['status', '--agent', 'all', '--json'], environment).stdout);
    assert.deepEqual(
      second.targets.map(({ runtime, generation, sourceCommit, synchronizedAt }) => ({
        runtime,
        generation,
        sourceCommit,
        synchronizedAt,
      })),
      installed.targets.map(({ runtime, generation, sourceCommit, synchronizedAt }) => ({
        runtime,
        generation,
        sourceCommit,
        synchronizedAt,
      })),
    );
    second.targets.forEach((target, index) => {
      const manifest = JSON.parse(readFileSync(path.join(target.path, '.sylphx-skills.json'), 'utf8'));
      assert.equal(manifest.synchronizedAt, firstManifests[index].synchronizedAt);
    });

    writeFileSync(
      instructionFiles[0],
      readFileSync(instructionFiles[0], 'utf8').replace(
        '# Sylphx Agent Runtime Constitution',
        '# Stale Sylphx Agent Runtime Constitution',
      ),
    );
    const drifted = JSON.parse(runWithEnvironment(['status', '--agent', 'codex', '--json'], environment).stdout);
    assert.equal(drifted.targets[0].current, false);
    assert.equal(drifted.targets[0].constitution.current, false);
    runWithEnvironment(['install', '--agent', 'codex', '--quiet'], environment);
    assert.equal(inspectConstitution(instructionFiles[0]).current, true);
    assert.match(readFileSync(instructionFiles[0], 'utf8'), /^# Local runtime note 1/);

    writeFileSync(instructionFiles[1], `${readFileSync(instructionFiles[1], 'utf8')}\n${CONSTITUTION_START}\n`);
    assert.throws(
      () => planConstitutionInstall(instructionFiles[1]),
      /malformed Sylphx constitution markers/,
    );
    writeFileSync(instructionFiles[1], firstInstructions[1]);

    runWithEnvironment(['clear', '--agent', 'all', '--quiet'], environment);
    for (const [index, file] of instructionFiles.entries()) {
      assert.equal(readFileSync(file, 'utf8'), `# Local runtime note ${index + 1}\n\nPreserve this text.\n`);
      assert.equal(existsSync(path.join(path.dirname(file), 'skills', 'engineering-standard')), false);
    }
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent install safely retires recognized Doctrine instruction projections and preserves local notes', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-retired-doctrine-'));
  const codexHome = path.join(sandbox, '.codex');
  const claudeHome = path.join(sandbox, '.claude');
  const grokHome = path.join(sandbox, '.grok');
  const retiredTarget = path.join(sandbox, '.doctrine-runtime-current', 'templates', 'AGENTS.md');
  const codexInstructions = path.join(codexHome, 'AGENTS.md');
  const claudeInstructions = path.join(claudeHome, 'CLAUDE.md');
  const targetContent = retiredDoctrineProjection('# Retained Codex note\n\nKeep this.\n');
  const claudeLocalNotes = [
    '- Preserve Claude worktree behavior.',
    '- Preserve denied-permission behavior.',
    '',
  ].join('\n');
  const environment = {
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: codexHome,
    CLAUDE_CONFIG_DIR: claudeHome,
    GROK_HOME: grokHome,
  };
  try {
    mkdirSync(path.dirname(retiredTarget), { recursive: true });
    mkdirSync(codexHome);
    mkdirSync(claudeHome);
    writeFileSync(retiredTarget, targetContent, { mode: 0o644 });
    symlinkSync(retiredTarget, codexInstructions, 'file');
    writeFileSync(
      claudeInstructions,
      `# Claude Code runtime mapping\n\n@${retiredTarget}\n\n${claudeLocalNotes}`,
    );

    const beforeCodex = JSON.parse(
      runWithEnvironment(['status', '--agent', 'codex', '--json'], environment).stdout,
    );
    assert.equal(beforeCodex.targets[0].current, false);
    assert.equal(beforeCodex.targets[0].constitution.error, null);
    assert.equal(
      beforeCodex.targets[0].constitution.migrationRequired,
      RETIRED_DOCTRINE_MIGRATION,
    );
    const beforeClaude = JSON.parse(
      runWithEnvironment(['status', '--agent', 'claude', '--json'], environment).stdout,
    );
    assert.equal(
      beforeClaude.targets[0].constitution.migrationRequired,
      RETIRED_DOCTRINE_MIGRATION,
    );

    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    const codexAfter = readFileSync(codexInstructions, 'utf8');
    const claudeAfter = readFileSync(claudeInstructions, 'utf8');
    assert.equal(lstatSync(codexInstructions).isFile(), true);
    assert.equal(lstatSync(codexInstructions).isSymbolicLink(), false);
    assert.equal(readFileSync(retiredTarget, 'utf8'), targetContent);
    assert.match(codexAfter, /^# Retained Codex note/);
    assert.equal(codexAfter.includes('# Sylphx Agent Runtime Constitution'), true);
    assert.equal(codexAfter.includes('.doctrine-runtime-current'), false);
    assert.match(claudeAfter, /^- Preserve Claude worktree behavior\./);
    assert.equal(claudeAfter.includes(`@${retiredTarget}`), false);
    assert.equal(claudeAfter.includes('.doctrine-runtime-current'), false);
    assert.equal(inspectConstitution(codexInstructions).current, true);
    assert.equal(inspectConstitution(claudeInstructions).current, true);

    const firstInstructions = [codexAfter, claudeAfter];
    runWithEnvironment(['install', '--agent', 'all', '--quiet'], environment);
    assert.deepEqual(
      [readFileSync(codexInstructions, 'utf8'), readFileSync(claudeInstructions, 'utf8')],
      firstInstructions,
    );

    const installed = JSON.parse(
      runWithEnvironment(['status', '--agent', 'all', '--json'], environment).stdout,
    );
    assert.equal(installed.targets.every((target) => target.current), true);
    assert.equal(
      installed.targets.every((target) => target.constitution.migrationRequired === null),
      true,
    );

    runWithEnvironment(['clear', '--agent', 'all', '--quiet'], environment);
    assert.equal(readFileSync(codexInstructions, 'utf8'), '# Retained Codex note\n\nKeep this.\n');
    assert.equal(readFileSync(claudeInstructions, 'utf8'), claudeLocalNotes);
    assert.equal(readFileSync(retiredTarget, 'utf8'), targetContent);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('retired projection migration keeps arbitrary links fail-closed and detects target races', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-retired-doctrine-fence-'));
  const codexHome = path.join(sandbox, '.codex');
  const instructionFile = path.join(codexHome, 'AGENTS.md');
  const retiredTarget = path.join(sandbox, '.doctrine-runtime-current', 'templates', 'AGENTS.md');
  const unrelatedTarget = path.join(sandbox, 'unrelated.md');
  try {
    mkdirSync(codexHome);
    writeFileSync(unrelatedTarget, retiredDoctrineProjection());
    symlinkSync(unrelatedTarget, instructionFile, 'file');
    assert.throws(
      () => planConstitutionInstall(instructionFile),
      /Refusing to modify non-regular instruction file/,
    );
    assert.equal(readFileSync(unrelatedTarget, 'utf8'), retiredDoctrineProjection());

    rmSync(instructionFile);
    mkdirSync(path.dirname(retiredTarget), { recursive: true });
    writeFileSync(retiredTarget, retiredDoctrineProjection(), { mode: 0o644 });
    symlinkSync(retiredTarget, instructionFile, 'file');
    const plan = planConstitutionInstall(instructionFile);
    writeFileSync(retiredTarget, retiredDoctrineProjection('# concurrent note\n'), { mode: 0o644 });
    assert.throws(
      () => applyConstitutionPlan(plan),
      /Instruction file changed during Sylphx constitution update/,
    );
    assert.equal(lstatSync(instructionFile).isSymbolicLink(), true);

    rmSync(instructionFile);
    writeFileSync(retiredTarget, '# not a recognized projection\n', { mode: 0o644 });
    symlinkSync(retiredTarget, instructionFile, 'file');
    assert.throws(
      () => planConstitutionInstall(instructionFile),
      /unrecognized retired Doctrine instruction projection/,
    );
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('help is read-only and never falls through to installation', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-help-'));
  try {
    const result = runWithEnvironment(['--help'], {
      SYLPHX_SKILLS_HOME: sandbox,
      CODEX_HOME: path.join(sandbox, '.codex'),
    });
    assert.match(result.stdout, /sylphx-skills install/);
    assert.equal(existsSync(path.join(sandbox, '.codex')), false);
    assert.equal(existsSync(path.join(sandbox, '.sylphx-skills')), false);

    const bare = runWithEnvironment([], {
      SYLPHX_SKILLS_HOME: sandbox,
      CODEX_HOME: path.join(sandbox, '.codex'),
    });
    assert.match(bare.stdout, /Every mutating native operation requires an explicit runtime selection/);
    assert.equal(existsSync(path.join(sandbox, '.codex')), false);
    assert.equal(existsSync(path.join(sandbox, '.sylphx-skills')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('mutating operations fail closed without one explicit target mode', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-mutation-scope-'));
  const environment = {
    ...process.env,
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: path.join(sandbox, '.codex'),
    CLAUDE_CONFIG_DIR: path.join(sandbox, '.claude'),
    GROK_HOME: path.join(sandbox, '.grok'),
  };
  try {
    for (const args of [
      ['sync'],
      ['clear'],
      ['auto-sync', 'enable'],
      ['sync', '--agent'],
      ['sync', '--dest'],
      ['sync', '--agent', 'codex', '--dest', path.join(sandbox, 'custom')],
    ]) {
      const result = spawnSync(process.execPath, [cli, ...args], {
        cwd: root,
        encoding: 'utf8',
        env: environment,
      });
      assert.equal(result.status, 1, `${args.join(' ')} unexpectedly succeeded`);
    }
    assert.equal(existsSync(path.join(sandbox, '.codex')), false);
    assert.equal(existsSync(path.join(sandbox, '.claude')), false);
    assert.equal(existsSync(path.join(sandbox, '.grok')), false);
    assert.equal(existsSync(path.join(sandbox, '.sylphx-skills')), false);
    assert.equal(existsSync(path.join(sandbox, 'custom')), false);

    runWithEnvironment(['sync', '--agent', 'codex', '--quiet'], environment);
    assert.equal(existsSync(path.join(sandbox, '.codex', 'skills', '.sylphx-skills.json')), true);
    assert.equal(existsSync(path.join(sandbox, '.claude')), false);
    assert.equal(existsSync(path.join(sandbox, '.grok')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent install requires one explicit native runtime and rejects custom destinations', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-install-target-'));
  const environment = {
    ...process.env,
    SYLPHX_SKILLS_HOME: sandbox,
    CODEX_HOME: path.join(sandbox, '.codex'),
  };
  try {
    const implicit = spawnSync(process.execPath, [cli, 'install'], {
      cwd: root,
      encoding: 'utf8',
      env: environment,
    });
    assert.equal(implicit.status, 1);
    assert.match(implicit.stderr, /install requires --agent/);
    assert.equal(existsSync(path.join(sandbox, '.claude')), false);
    assert.equal(existsSync(path.join(sandbox, '.grok')), false);

    const custom = spawnSync(process.execPath, [cli, 'install', '--dest', path.join(sandbox, 'custom')], {
      cwd: root,
      encoding: 'utf8',
      env: environment,
    });
    assert.equal(custom.status, 1);
    assert.match(custom.stderr, /custom destinations support Skills sync only/);
    assert.equal(existsSync(path.join(sandbox, 'custom')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('agent install fails closed when the native runtime home is a symbolic link', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-install-home-link-'));
  const actualHome = path.join(sandbox, 'actual-codex-home');
  const codexHome = path.join(sandbox, '.codex');
  try {
    mkdirSync(actualHome);
    symlinkSync(actualHome, codexHome, 'dir');
    const result = spawnSync(process.execPath, [cli, 'install', '--agent', 'codex'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        SYLPHX_SKILLS_HOME: sandbox,
        CODEX_HOME: codexHome,
      },
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /non-regular runtime home/);
    assert.equal(existsSync(path.join(actualHome, 'AGENTS.md')), false);
    assert.equal(existsSync(path.join(actualHome, 'skills')), false);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

function validEnactMetadata(endpoint = 'https://cp.example/api/mcp') {
  return {
    resource: endpoint,
    authorization_servers: ['https://identity.example/oauth'],
    scopes_supported: [...REQUIRED_ENACT_SCOPES, 'enact.attest'],
    mcp: {
      transport: 'streamable_http',
      endpoint,
      protocol_revisions_supported: ['2024-11-05', '2025-03-26'],
    },
  };
}

test('Enact MCP discovery defaults to the safe canonical Sylphx SaaS endpoint', async () => {
  assert.equal(resolveEnactMcpUrl(''), DEFAULT_ENACT_MCP_URL);
  const canonical = await discoverEnactMcp({
    endpoint: '',
    fetchImpl: async (url) => {
      assert.equal(url, 'https://enact.sylphx.com/.well-known/oauth-protected-resource');
      return new Response(JSON.stringify(validEnactMetadata(DEFAULT_ENACT_MCP_URL)), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    },
  });
  assert.equal(canonical.endpointSource, 'canonical_sylphx_saas');
  assert.equal(canonical.endpoint, DEFAULT_ENACT_MCP_URL);
  assert.equal(normalizeEnactMcpUrl('https://cp.example/api/mcp'), 'https://cp.example/api/mcp');
  assert.equal(
    protectedResourceMetadataUrl('https://cp.example/api/mcp'),
    'https://cp.example/.well-known/oauth-protected-resource',
  );
  assert.throws(
    () => normalizeEnactMcpUrl('http://cp.example/api/mcp'),
    /must use HTTPS/,
  );
  assert.throws(
    () => normalizeEnactMcpUrl('https://user:secret@cp.example/api/mcp'),
    /must not contain credentials/,
  );
  assert.throws(
    () => normalizeEnactMcpUrl('https://cp.example/api/mcp?token=secret'),
    /must not contain a query or fragment/,
  );
  assert.throws(
    () => normalizeEnactMcpUrl('https://cp.example/mcp'),
    /canonical \/api\/mcp path/,
  );
  assert.equal(
    normalizeEnactMcpUrl('http://127.0.0.1:8787/api/mcp'),
    'http://127.0.0.1:8787/api/mcp',
  );
});

test('Enact MCP discovery binds RFC 9728 metadata before enrollment', async () => {
  const endpoint = 'https://cp.example/api/mcp';
  let request;
  const discovered = await discoverEnactMcp({
    endpoint,
    fetchImpl: async (url, options) => {
      request = { url, options };
      return {
        ok: true,
        status: 200,
        async json() { return validEnactMetadata(endpoint); },
      };
    },
  });
  assert.equal(request.url, 'https://cp.example/.well-known/oauth-protected-resource');
  assert.equal(request.options.redirect, 'error');
  assert.deepEqual(request.options.headers, { accept: 'application/json' });
  assert.equal(discovered.disposition, 'ready_for_enrollment');
  assert.equal(discovered.endpointSource, 'controlled_override');
  assert.equal(discovered.endpoint, endpoint);
  assert.deepEqual(discovered.authorizationServers, ['https://identity.example/oauth']);
  assert.deepEqual(discovered.protocolRevisionsSupported, ['2024-11-05', '2025-03-26']);

  assert.throws(
    () => validateProtectedResourceMetadata(validEnactMetadata('https://other.example/api/mcp'), endpoint),
    /resource does not match/,
  );
  assert.throws(
    () => validateProtectedResourceMetadata({
      ...validEnactMetadata(endpoint),
      scopes_supported: ['enact.observe'],
    }, endpoint),
    /missing required scopes/,
  );
  assert.throws(
    () => validateProtectedResourceMetadata({
      ...validEnactMetadata(endpoint),
      authorization_servers: ['http://identity.example/oauth'],
    }, endpoint),
    /must use HTTPS/,
  );

  await assert.rejects(
    discoverEnactMcp({
      endpoint,
      fetchImpl: async () => ({ ok: false, status: 503 }),
    }),
    /failed with HTTP 503/,
  );
  await assert.rejects(
    discoverEnactMcp({
      endpoint,
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        async json() { throw new SyntaxError('fixture'); },
      }),
    }),
    /did not return JSON/,
  );
  await assert.rejects(
    discoverEnactMcp({
      endpoint,
      fetchImpl: async () => new Response('x'.repeat((64 * 1024) + 1), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    }),
    /exceeds 64 KiB/,
  );
});

test('Enact MCP enrollment uses runtime-native remote transports without credentials', () => {
  const endpoint = 'https://cp.example/api/mcp';
  const codex = enrollmentCommand('codex', endpoint);
  assert.deepEqual(codex, {
    executable: 'codex',
    args: ['mcp', 'add', 'sylphx-enact', '--url', endpoint, '--oauth-resource', endpoint],
    oauth: {
      supported: true,
      initiation: 'native_login_command',
      loginArgs: ['mcp', 'login', 'sylphx-enact'],
    },
  });
  assert.deepEqual(enrollmentCommand('claude', endpoint).args, [
    'mcp', 'add', '--transport', 'http', '--scope', 'user', 'sylphx-enact', endpoint,
  ]);
  assert.deepEqual(enrollmentCommand('grok', endpoint).args, [
    'mcp', 'add', '--transport', 'http', '--scope', 'user', 'sylphx-enact', endpoint,
  ]);
  assert.deepEqual(enrollmentCommand('grok', endpoint).oauth, {
    supported: true,
    initiation: 'automatic_on_connect',
    loginArgs: null,
  });
  for (const runtime of ['codex', 'claude', 'grok']) {
    const command = enrollmentCommand(runtime, endpoint);
    assert.equal(JSON.stringify(command).includes('secret'), false);
    assert.equal(JSON.stringify(command).includes('token'), false);
    assert.equal(command.args.includes('--header'), false);
  }

  const discovery = {
    disposition: 'ready_for_enrollment',
    endpoint,
    metadataUrl: 'https://cp.example/.well-known/oauth-protected-resource',
  };
  const invocations = [];
  const configured = configureEnactMcp('codex', discovery, {
    run(executable, args, options) {
      invocations.push({ executable, args, options });
      if (args[1] === 'get') {
        return { status: 1, stdout: '', stderr: "No MCP server named 'sylphx-enact' found." };
      }
      return { status: 0, stdout: '', stderr: '' };
    },
    pathEnv: '/fixture/bin',
  });
  assert.equal(invocations.length, 2);
  assert.equal(invocations[1].executable, 'codex');
  assert.deepEqual(invocations[1].args, codex.args);
  assert.equal(invocations[1].options.env.PATH, '/fixture/bin');
  assert.equal(configured.disposition, 'configured_authentication_required');
  assert.equal(configured.configuration, 'created');

  let readbacks = 0;
  const committedDespiteNonzero = configureEnactMcp('codex', discovery, {
    run: (_executable, args) => {
      if (args[1] === 'get') {
        readbacks += 1;
        if (readbacks === 1) {
          return { status: 1, stdout: '', stderr: "No MCP server named 'sylphx-enact' found." };
        }
        return {
          status: 0,
          stdout: JSON.stringify({
            enabled: true,
            transport: {
              type: 'streamable_http',
              url: endpoint,
              bearer_token_env_var: null,
              http_headers: null,
              env_http_headers: null,
            },
          }),
          stderr: '',
        };
      }
      return { status: 1, stdout: '', stderr: 'native login bootstrap pending' };
    },
  });
  assert.equal(committedDespiteNonzero.configuration, 'created_after_nonzero_readback');
  assert.equal(readbacks, 2);

  const grok = configureEnactMcp('grok', discovery, {
    run: (_executable, args) => (
      args[1] === 'list'
        ? { status: 0, stdout: '[]\n', stderr: '' }
        : { status: 0, stdout: '', stderr: '' }
    ),
  });
  assert.equal(grok.disposition, 'configured_authentication_required');
  assert.equal(grok.configuration, 'created');

  const existingClaude = configureEnactMcp('claude', discovery, {
    run: () => ({
      status: 0,
      stdout: `sylphx-enact:\n  Scope: User config (available in all your projects)\n  Status: Failed to connect\n  Type: http\n  URL: ${endpoint}\n`,
      stderr: '',
    }),
  });
  assert.equal(existingClaude.configuration, 'existing');
  assert.equal(existingClaude.disposition, 'configured_authentication_required');
  const existingCodex = configureEnactMcp('codex', discovery, {
    run: () => ({
      status: 0,
      stdout: JSON.stringify({
        enabled: true,
        transport: {
          type: 'streamable_http',
          url: endpoint,
          bearer_token_env_var: null,
          http_headers: null,
          env_http_headers: null,
        },
      }),
      stderr: '',
    }),
  });
  assert.equal(existingCodex.configuration, 'existing');
  assert.equal(existingCodex.disposition, 'configured_authentication_required');
  const existingGrok = configureEnactMcp('grok', discovery, {
    run: () => ({
      status: 0,
      stdout: JSON.stringify([{
        name: 'sylphx-enact',
        scope: 'user',
        enabled: true,
        url: endpoint,
      }]),
      stderr: '',
    }),
  });
  assert.equal(existingGrok.configuration, 'existing');
  assert.equal(existingGrok.disposition, 'configured_authentication_required');
  assert.throws(
    () => configureEnactMcp('codex', discovery, {
      run: () => ({
        status: 0,
        stdout: JSON.stringify({
          enabled: true,
          transport: {
            type: 'streamable_http',
            url: endpoint,
            bearer_token_env_var: 'LEGACY_TOKEN',
            http_headers: null,
            env_http_headers: null,
          },
        }),
        stderr: '',
      }),
    }),
    /incompatible existing MCP server/,
  );
  assert.throws(
    () => configureEnactMcp('claude', discovery, {
      run: () => ({
        status: 0,
        stdout: `sylphx-enact:\n  Type: http\n  URL: ${endpoint}\n  Headers:\n    Authorization: redacted\n`,
        stderr: '',
      }),
    }),
    /incompatible existing MCP server/,
  );
  assert.throws(
    () => configureEnactMcp('claude', discovery, {
      run: () => ({
        status: 0,
        stdout: 'sylphx-enact:\n  Scope: User config\n  Type: http\n  URL: https://other.example/api/mcp\n',
        stderr: '',
      }),
    }),
    /different endpoint/,
  );
  assert.throws(
    () => configureEnactMcp('grok', discovery, {
      run: () => ({
        status: 0,
        stdout: JSON.stringify([{
          name: 'sylphx-enact',
          scope: 'user',
          enabled: true,
          url: endpoint,
          headers: { Authorization: 'redacted' },
        }]),
        stderr: '',
      }),
    }),
    /incompatible existing MCP server/,
  );
  assert.throws(
    () => configureEnactMcp('codex', { disposition: 'not_applicable' }),
    /requires verified protected-resource metadata/,
  );
  assert.throws(
    () => configureEnactMcp('codex', discovery, {
      run: (_executable, args) => (
        args[1] === 'get'
          ? { status: 1, stdout: '', stderr: "No MCP server named 'sylphx-enact' found." }
          : { status: 9, stdout: 'token=must-not-leak', stderr: 'secret=must-not-leak' }
      ),
    }),
    (error) => error.message === 'codex MCP enrollment failed with exit code 9',
  );
});

test('mandatory AutoSync adds a receiving runtime without dropping prior selection', () => {
  assert.deepEqual(mergeAutoSyncAgents(null, ['codex']), ['codex']);
  assert.deepEqual(
    mergeAutoSyncAgents({ enabled: true, agents: ['codex'] }, ['claude']),
    ['codex', 'claude'],
  );
  assert.deepEqual(
    mergeAutoSyncAgents({ enabled: true, agents: null }, ['codex']),
    ['codex', 'claude', 'grok'],
  );
  assert.throws(
    () => mergeAutoSyncAgents({ enabled: true, agents: ['unknown'] }, ['codex']),
    /Invalid existing AutoSync runtime selection/,
  );
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

function managedGenerationName(pointer) {
  assert.equal(lstatSync(pointer).isSymbolicLink(), true);
  const target = readlinkSync(pointer);
  const generationName = path.basename(path.normalize(target));
  assert.match(generationName, /^generation-[0-9a-f]{16}$/);
  const actual = path.isAbsolute(target)
    ? path.normalize(target)
    : path.resolve(path.dirname(pointer), target);
  const expected = path.join(path.dirname(pointer), '.sylphx-managed-generations', generationName);
  assert.ok(
    actual === expected || actual === path.toNamespacedPath(expected),
    `managed generation pointer escaped its store: ${target}`,
  );
  return generationName;
}

function replaceManagedLinkWithAbsoluteTarget(file, type) {
  const absoluteTarget = path.resolve(path.dirname(file), readlinkSync(file));
  rmSync(file, { force: true });
  symlinkSync(absoluteTarget, file, type);
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
    managedGenerationName(pointer);
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
    managedGenerationName(pointer);
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
    assert.notEqual(managedGenerationName(pointer), 'generation-0000000000000000');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-one/);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test('sync and status accept only exact absolute forms of managed symlink targets', () => {
  const sandbox = mkdtempSync(path.join(os.tmpdir(), 'sylphx-generation-absolute-targets-'));
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    const pointer = path.join(destination, '.sylphx-managed-current');
    const manifest = path.join(destination, '.sylphx-skills.json');
    const packageLink = path.join(destination, 'alpha');
    replaceManagedLinkWithAbsoluteTarget(pointer, 'dir');
    replaceManagedLinkWithAbsoluteTarget(manifest, 'file');
    replaceManagedLinkWithAbsoluteTarget(packageLink, 'dir');

    let result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).targets[0].current, true);

    result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    managedGenerationName(pointer);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);

    writeFixtureCatalog(source, ['beta']);
    result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(existsSync(packageLink), false, 'an exact absolute managed link must be removable after catalog retirement');
    assert.deepEqual(targetGenerationTransactionNames(destination), []);

    const betaLink = path.join(destination, 'beta');
    const outside = path.join(sandbox, 'outside-beta');
    mkdirSync(outside);
    writeFileSync(path.join(outside, 'KEEP'), 'unrelated user data\n');
    rmSync(betaLink, { force: true });
    symlinkSync(outside, betaLink, 'dir');
    result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).targets[0].current, false);
    result = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    result = spawnSync(process.execPath, [fixtureCli, 'status', '--dest', destination, '--json'], {
      cwd: source,
      encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(JSON.parse(result.stdout).targets[0].current, true);
    assert.equal(readFileSync(path.join(outside, 'KEEP'), 'utf8'), 'unrelated user data\n');
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
  const holdReady = path.join(sandbox, 'target-generation-hold-ready');
  const holdRelease = path.join(sandbox, 'target-generation-hold-release');
  let first = null;
  try {
    const { source, destination, fixtureCli } = createGenerationFixture(sandbox);
    writeFixtureSkill(source, 'alpha', 'generation-two');
    writeFixtureCatalog(source, ['alpha', 'beta']);
    const environment = {
      ...process.env,
      NODE_ENV: 'test',
      SYLPHX_SKILLS_TEST_HOLD_AT: 'before-switch',
      SYLPHX_SKILLS_TEST_HOLD_READY: holdReady,
      SYLPHX_SKILLS_TEST_HOLD_RELEASE: holdRelease,
    };
    first = spawn(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      env: environment,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let firstError = '';
    first.stderr.on('data', (chunk) => { firstError += chunk; });
    const firstExit = new Promise((resolve) => first.once('exit', resolve));
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (let attempt = 0; attempt < 250 && !existsSync(holdReady); attempt += 1) Atomics.wait(waiter, 0, 0, 20);
    assert.equal(existsSync(holdReady), true, 'first writer did not reach the held switch boundary');
    const lock = path.join(path.dirname(destination), `.${path.basename(destination)}.sylphx-generation-lock`);
    assert.equal(existsSync(lock), true, 'first writer did not acquire the target lock');
    const liveLock = JSON.parse(readFileSync(lock, 'utf8'));
    liveLock.createdAt = 1;
    writeFileSync(lock, `${JSON.stringify(liveLock)}\n`);

    const second = spawnSync(process.execPath, [fixtureCli, 'sync', '--dest', destination, '--quiet'], {
      cwd: source,
      encoding: 'utf8',
      timeout: 5_000,
    });
    writeFileSync(holdRelease, 'release\n');
    assert.notEqual(second.status, 0, second.stderr || second.stdout);
    assert.match(second.stderr, /target generation is busy/);
    const firstCode = await firstExit;
    assert.equal(firstCode, 0, firstError);
    assert.deepEqual(targetGenerationTransactionNames(destination), []);
    assert.equal(existsSync(lock), false);
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    if (first?.exitCode === null) {
      writeFileSync(holdRelease, 'release\n');
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
      if (first.exitCode === null) first.kill('SIGTERM');
    }
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
  let childExit;
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
    childExit = new Promise((resolve) => child.once('exit', resolve));
    const pointer = path.join(destination, '.sylphx-managed-current');
    let observedPointer = oldPointer;
    for (let attempt = 0; attempt < 1_000 && observedPointer === oldPointer; attempt += 1) {
      try {
        observedPointer = readlinkSync(pointer);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      if (observedPointer === oldPointer) await new Promise((resolve) => setTimeout(resolve, 20));
    }
    assert.notEqual(observedPointer, oldPointer, 'managed pointer did not switch');
    writeSync(descriptor, 'after\n');
    closeSync(descriptor);
    descriptor = undefined;
    assert.equal(await childExit, 0, stderr);
    childExit = undefined;
    assert.equal(readFileSync(unrelatedFile, 'utf8'), 'before\nafter\n');
    assert.match(readFileSync(path.join(destination, 'alpha', 'SKILL.md'), 'utf8'), /generation-two/);
  } finally {
    if (descriptor !== undefined) closeSync(descriptor);
    if (childExit) await childExit;
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
    const interrupted = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_STATE_DIR: stateDirectory,
        SYLPHX_SKILLS_TEST_CRASH_AFTER_MATERIALIZED_FILES: '2',
      },
    });
    assert.equal(interrupted.status, 86, interrupted.stderr || interrupted.stdout);
    const materializationStage = path.join(stateDirectory, '.repository.sylphx-materialize');
    assert.equal(existsSync(materializationStage), true, 'interrupted materialization must retain its owned journal');
    assert.notEqual(
      git(config.repository, ['status', '--porcelain', '--untracked-files=all']),
      '',
      'the fixture must interrupt after canonical bytes make the worktree look dirty',
    );

    const attributesUpdate = reconcile({ stateDirectory, force: true, strict: true, now: 16_000 });
    assert.equal(attributesUpdate.status, 'updated');
    assert.equal(attributesUpdate.appliedSha, attributesSha);
    assert.equal(existsSync(materializationStage), false, 'successful recovery must remove the owned journal');
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');
    assert.equal(
      readFileSync(path.join(config.repository, 'content.txt'), 'utf8'),
      'one\n',
      'candidate application must rematerialize unchanged tracked files under new attributes',
    );

    writeFileSync(path.join(remote, 'content.txt'), 'temporary index recovery\n');
    const temporaryIndexSha = commit(remote, 'exercise temporary index recovery');
    const interruptedIndex = spawnSync(process.execPath, [config.reconcilerPath, '--force'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_STATE_DIR: stateDirectory,
        SYLPHX_SKILLS_TEST_CRASH_AFTER_TEMP_INDEX: '1',
      },
    });
    assert.equal(interruptedIndex.status, 87, interruptedIndex.stderr || interruptedIndex.stdout);
    assert.equal(existsSync(path.join(materializationStage, 'candidate.index.lock')), true);
    const recoveredIndex = reconcile({ stateDirectory, force: true, strict: true, now: 16_125 });
    assert.equal(recoveredIndex.status, 'updated');
    assert.equal(recoveredIndex.appliedSha, temporaryIndexSha);
    assert.equal(existsSync(materializationStage), false);
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');

    writeFileSync(path.join(remote, 'content.txt'), 'invalid candidate\r\n');
    const invalidBlob = git(remote, ['hash-object', '-w', '--no-filters', 'content.txt']);
    git(remote, ['update-index', '--cacheinfo', `100644,${invalidBlob},content.txt`]);
    git(remote, ['-c', 'user.name=Sylphx Test', '-c', 'user.email=test@sylphx.invalid', 'commit', '-m', 'noncanonical candidate']);
    const invalidSha = git(remote, ['rev-parse', 'HEAD']);
    const rejected = reconcile({ stateDirectory, force: true, now: 16_250 });
    assert.equal(rejected.status, 'unavailable');
    assert.match(rejected.error, /do not normalize to the committed tree/);
    assert.equal(git(config.repository, ['rev-parse', 'HEAD']), invalidSha);
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');
    assert.equal(existsSync(materializationStage), false, 'deterministically rejected candidate must not trap recovery');

    writeFileSync(path.join(remote, 'content.txt'), 'fixed candidate\n');
    const fixedSha = commit(remote, 'fix candidate normalization');
    const fixed = reconcile({ stateDirectory, force: true, strict: true, now: 16_500 });
    assert.equal(fixed.status, 'updated');
    assert.equal(fixed.appliedSha, fixedSha);
    assert.equal(git(config.repository, ['status', '--porcelain', '--untracked-files=all']), '');

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
  let lifecycleRelease;
  let enableExit;
  try {
    mkdirSync(source, { recursive: true });
    git(source, ['init', '--initial-branch=main']);
    cpSync(path.join(root, 'runtime'), path.join(source, 'runtime'), { recursive: true });
    mkdirSync(path.join(source, 'skills'));
    const fixtureSkillNames = [
      'engineering-standard',
      'technology-stack-profile',
      'voice-preserving-editor',
    ];
    for (const name of fixtureSkillNames) {
      cpSync(path.join(root, 'skills', name), path.join(source, 'skills', name), { recursive: true });
    }
    const fixtureCatalog = {
      ...catalog,
      count: fixtureSkillNames.length,
      skills: catalog.skills.filter((skill) => fixtureSkillNames.includes(skill.name)),
    };
    writeFileSync(path.join(source, 'catalog.json'), `${JSON.stringify(fixtureCatalog, null, 2)}\n`);
    for (const entry of ['.gitattributes', 'package.json']) cpSync(path.join(root, entry), path.join(source, entry));
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
    lifecycleRelease = path.join(managedHome, '.sylphx-skills', '.test-enable-after-reconcile-release');
    const enabling = spawn(process.execPath, [cli, 'auto-sync', 'enable', '--agent', 'codex,claude', '--interval', '7m', '--quiet'], {
      cwd: root,
      env: {
        ...process.env,
        ...environment,
        NODE_ENV: 'test',
        SYLPHX_SKILLS_TEST_HOLD_ENABLE_AFTER_RECONCILE_RELEASE: lifecycleRelease,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let enableStdout = '';
    let enableStderr = '';
    enabling.stdout.on('data', (chunk) => { enableStdout += chunk; });
    enabling.stderr.on('data', (chunk) => { enableStderr += chunk; });
    enableExit = new Promise((resolve) => enabling.once('exit', resolve));
    const waiter = new Int32Array(new SharedArrayBuffer(4));
    for (
      let attempt = 0;
      attempt < 3_000 && !existsSync(lifecycleReady) && enabling.exitCode === null;
      attempt += 1
    ) await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(
      existsSync(lifecycleReady),
      true,
      `enable did not reach its post-reconcile lifecycle phase${enableStderr || enableStdout ? `: ${enableStderr || enableStdout}` : ''}`,
    );
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
    writeFileSync(lifecycleRelease, 'release\n');
    assert.equal(await enableExit, 0, enableStderr || enableStdout);
    enableExit = undefined;

    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'sync.sh')), false);
    assert.equal(
      readFileSync(path.join(managedHome, '.sylphx-skills', 'reconcile.mjs'), 'utf8'),
      readFileSync(remoteReconciler, 'utf8'),
      'scheduler adapter must remain sourced from the exact remote candidate applied during enable',
    );
    const installedManifest = path.join(codexHome, 'skills', '.sylphx-skills.json');
    assert.equal(existsSync(installedManifest), true, `installed paths: ${readdirSync(managedHome, { recursive: true }).join(', ')}`);
    assert.equal(readFileSync(installedManifest, 'utf8').includes(sourceSha), true);
    assert.equal(existsSync(path.join(grokHome, 'skills', '.sylphx-skills.json')), false);
    const status = JSON.parse(runWithEnvironment(['auto-sync', 'status', '--json'], environment).stdout);
    assert.equal(status.enabled, true);
    assert.equal(status.intervalMinutes, 7);
    assert.equal(status.mode, 'interval-scheduler');
    assert.deepEqual(status.agents, ['codex', 'claude']);
    const plist = path.join(managedHome, 'Library', 'LaunchAgents', 'ai.sylphx.skills-sync.plist');
    assert.match(readFileSync(plist, 'utf8'), /<key>StartInterval<\/key><integer>420<\/integer>/);
    assert.equal(Object.hasOwn(JSON.parse(readFileSync(path.join(claudeHome, 'settings.json'), 'utf8')), 'hooks'), false);
    assert.deepEqual(
      JSON.parse(readFileSync(path.join(grokHome, 'hooks', 'sylphx-skills.json'), 'utf8')).hooks,
      legacyHooks,
    );

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
    assert.deepEqual(repairedManifest.skills, fixtureCatalog.skills.map((skill) => skill.name));
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
    managedGenerationName(managedCurrent);
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
    assert.equal(existsSync(path.join(claudeHome, 'skills', addedSkill, 'SKILL.md')), true);
    assert.equal(existsSync(path.join(grokHome, 'skills', addedSkill, 'SKILL.md')), false);
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
    assert.deepEqual(grok.hooks, legacyHooks);
    assert.equal(existsSync(plist), false);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'repository')), true);
    assert.equal(existsSync(path.join(managedHome, '.sylphx-skills', 'config.json')), false);
  } finally {
    if (lifecycleRelease) {
      mkdirSync(path.dirname(lifecycleRelease), { recursive: true });
      writeFileSync(lifecycleRelease, 'release\n');
    }
    if (enableExit) await enableExit;
    rmSync(sandbox, { recursive: true, force: true });
  }
});
