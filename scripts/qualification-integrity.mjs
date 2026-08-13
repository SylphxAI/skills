/**
 * Qualification integrity helpers shared by the repository check and the
 * qualification runner. These are consistency floors, not value evidence.
 */

export const FORBIDDEN_INSTRUCTION_PATTERNS = [
  { re: /do not web[- ]search/i, label: 'do not web-search' },
  { re: /no search engine required/i, label: 'no search engine required' },
  { re: /open recipes\.md first/i, label: 'open recipes.md first' },
  { re: /open\s+\[references\/recipes\.md\].*first/i, label: 'open recipes.md first' },
];

const PACKAGE_DIGEST = /^sha256:[0-9a-f]{64}$/;

export function scanTextForForbiddenInstructions(text) {
  if (typeof text !== 'string' || !text) return [];
  return FORBIDDEN_INSTRUCTION_PATTERNS.filter((pattern) => pattern.re.test(text)).map((pattern) => pattern.label);
}

export function suitePromptTexts(suite) {
  const texts = [];
  if (suite?.baseline?.prompt) texts.push(suite.baseline.prompt);
  for (const task of suite?.tasks || []) {
    if (task.prompt) texts.push(task.prompt);
  }
  for (const activationCase of suite?.activation?.cases || []) {
    if (activationCase.prompt) texts.push(activationCase.prompt);
  }
  return texts;
}

export function suiteForbiddenInstructionFindings(suite) {
  const findings = [];
  for (const text of suitePromptTexts(suite)) {
    for (const label of scanTextForForbiddenInstructions(text)) {
      findings.push(label);
    }
  }
  return [...new Set(findings)];
}

export function qualifiedDigestError(record, currentDigest) {
  if (!record || record.status !== 'qualified') return null;
  if (!PACKAGE_DIGEST.test(record.packageDigest || '')) {
    return 'qualified record requires packageDigest matching sha256:<64 hex>';
  }
  if (!PACKAGE_DIGEST.test(currentDigest || '')) {
    return `current package digest is invalid: ${currentDigest || 'missing'}`;
  }
  if (record.packageDigest !== currentDigest) {
    return `qualified packageDigest ${record.packageDigest} does not match current ${currentDigest}`;
  }
  return null;
}

export function unqualifiedRecord(name) {
  return {
    schemaVersion: 1,
    name,
    status: 'unqualified',
    evaluator: null,
    qualifiedAt: null,
    expiresAt: null,
    evidence: [],
    compatibility: [],
  };
}
