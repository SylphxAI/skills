import {
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const LABEL = 'ai.sylphx.skills-sync';
const TASK_NAME = 'SylphxSkillsSync';

function execute(command, args, { tolerateFailure = false } = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 30_000 });
  if (result.status !== 0 && !tolerateFailure) {
    const detail = String(result.stderr || result.stdout || result.error?.message || '').trim();
    throw new Error(`${command} ${args.join(' ')} failed${detail ? `: ${detail}` : ''}`);
  }
  return result;
}

function xml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function systemd(value) {
  return `"${String(value).replaceAll('%', '%%').replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;
}

export function parseIntervalMinutes(args, fallback = 10) {
  const index = args.indexOf('--interval');
  if (index < 0) return fallback;
  const input = args[index + 1];
  const match = String(input || '').trim().match(/^(\d+)(m|h)?$/i);
  if (!match) throw new Error('--interval must be whole minutes such as 5m, 10m, 1h, or 30');
  const minutes = Number(match[1]) * (match[2]?.toLowerCase() === 'h' ? 60 : 1);
  if (!Number.isSafeInteger(minutes) || minutes < 1 || minutes > 1_440) {
    throw new Error('--interval must be between 1 minute and 24 hours');
  }
  return minutes;
}

export function schedulerDefinition({
  platform = process.platform,
  home = os.homedir(),
  nodePath,
  reconcilerPath,
  pathEnv,
  intervalMinutes,
}) {
  if (platform === 'darwin') {
    const file = path.join(home, 'Library', 'LaunchAgents', `${LABEL}.plist`);
    return {
      kind: 'launchd',
      files: [{
        path: file,
        contents: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>${LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${xml(nodePath)}</string>
    <string>${xml(reconcilerPath)}</string>
    <string>--force</string>
    <string>--quiet</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict><key>PATH</key><string>${xml(pathEnv)}</string></dict>
  <key>StartInterval</key><integer>${intervalMinutes * 60}</integer>
  <key>RunAtLoad</key><true/>
  <key>ProcessType</key><string>Background</string>
</dict>
</plist>
`,
      }],
      activate: [
        ['launchctl', ['bootout', `gui/${process.getuid()}`, file], true],
        ['launchctl', ['bootstrap', `gui/${process.getuid()}`, file], false],
      ],
    };
  }

  if (platform === 'linux') {
    const directory = path.join(home, '.config', 'systemd', 'user');
    return {
      kind: 'systemd-user',
      files: [
        {
          path: path.join(directory, 'sylphx-skills-sync.service'),
          contents: `[Unit]\nDescription=Synchronize Sylphx Skills\n\n[Service]\nType=oneshot\nEnvironment=PATH=${systemd(pathEnv)}\nExecStart=${systemd(nodePath)} ${systemd(reconcilerPath)} --force --quiet\n`,
        },
        {
          path: path.join(directory, 'sylphx-skills-sync.timer'),
          contents: `[Unit]\nDescription=Synchronize Sylphx Skills every ${intervalMinutes} minutes\n\n[Timer]\nOnBootSec=1min\nOnUnitActiveSec=${intervalMinutes}min\nPersistent=true\nUnit=sylphx-skills-sync.service\n\n[Install]\nWantedBy=timers.target\n`,
        },
      ],
      activate: [
        ['systemctl', ['--user', 'daemon-reload'], false],
        ['systemctl', ['--user', 'enable', '--now', 'sylphx-skills-sync.timer'], false],
      ],
    };
  }

  if (platform === 'win32') {
    const command = `"${nodePath}" "${reconcilerPath}" --force --quiet`;
    return {
      kind: 'windows-task-scheduler',
      files: [],
      activate: [[
        'schtasks',
        ['/Create', '/TN', TASK_NAME, '/TR', command, '/SC', 'MINUTE', '/MO', String(intervalMinutes), '/F'],
        false,
      ]],
    };
  }

  throw new Error(`Automatic synchronization is not supported on ${platform}; use manual sync`);
}

export function installScheduler(options) {
  const definition = schedulerDefinition(options);
  for (const file of definition.files) {
    mkdirSync(path.dirname(file.path), { recursive: true });
    writeFileSync(file.path, file.contents, { mode: 0o644 });
  }
  if (process.env.SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION !== '1') {
    for (const [command, args, tolerateFailure] of definition.activate) {
      execute(command, args, { tolerateFailure });
    }
  }
  return definition;
}

export function removeScheduler({ platform = process.platform, home = os.homedir() } = {}) {
  if (platform === 'darwin') {
    const file = path.join(home, 'Library', 'LaunchAgents', `${LABEL}.plist`);
    if (process.env.SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION !== '1' && existsSync(file)) {
      execute('launchctl', ['bootout', `gui/${process.getuid()}`, file], { tolerateFailure: true });
    }
    rmSync(file, { force: true });
    return;
  }
  if (platform === 'linux') {
    const directory = path.join(home, '.config', 'systemd', 'user');
    const timer = path.join(directory, 'sylphx-skills-sync.timer');
    if (process.env.SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION !== '1' && existsSync(timer)) {
      execute('systemctl', ['--user', 'disable', '--now', 'sylphx-skills-sync.timer'], { tolerateFailure: true });
    }
    rmSync(path.join(directory, 'sylphx-skills-sync.service'), { force: true });
    rmSync(timer, { force: true });
    if (process.env.SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION !== '1' && existsSync(directory)) {
      execute('systemctl', ['--user', 'daemon-reload'], { tolerateFailure: true });
    }
    return;
  }
  if (platform === 'win32' && process.env.SYLPHX_SKILLS_TEST_SKIP_SCHEDULER_ACTIVATION !== '1') {
    execute('schtasks', ['/Delete', '/TN', TASK_NAME, '/F'], { tolerateFailure: true });
  }
}
