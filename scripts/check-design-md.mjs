/**
 * Verifies the committed DESIGN.md.
 *
 * DESIGN.md is generated from the design tokens but committed to the repo,
 * because that is the only way a coding agent reading this repository will see
 * it — `packages/design-tokens/build/` is gitignored. A committed generated
 * file rots silently, so CI checks two things:
 *
 *   1. Drift — regenerating from the current tokens produces the committed file.
 *   2. Conformance — the file validates against the DESIGN.md spec.
 *
 * Only spec *errors* fail the build. Warnings are printed with a per-rule
 * summary: some are accepted trade-offs (`borderColor` is not one of the spec's
 * named component sub-tokens but is load-bearing for Hyphen's outline variants)
 * and some are real accessibility findings that should be fixed in the tokens
 * rather than hidden here.
 *
 * Run via `pnpm lint-design-md`, which builds the tokens first.
 */
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const generateDesignMd = require(
  path.join(REPO_ROOT, 'packages/design-tokens/utils/generateDesignMd/generateDesignMd.js')
);
// The linter is ESM-only (its `./linter` subpath exports `import` alone).
const { lint } = await import('@google/design.md/linter');

function fail(message) {
  process.stderr.write(`\n${message}\n`);
  process.exitCode = 1;
}

const { changed, content, outputPath } = generateDesignMd({ check: true });
const relativePath = path.relative(REPO_ROOT, outputPath);

// `pnpm build-tokens` regenerates DESIGN.md on disk, so comparing the generated
// content against the file is only enough to catch a hand-edit made after the
// last build. The drift that actually matters — tokens changed, DESIGN.md not
// regenerated and committed — shows up as an uncommitted change to a tracked
// file once the build has run.
if (changed) {
  fail(
    [
      `${relativePath} does not match the current design tokens.`,
      '',
      'It was probably edited by hand. Edit the prose in',
      'packages/design-tokens/design-md/prose.md or the token curation in',
      'packages/design-tokens/design-md/designMdConfig.js instead, then run',
      '`pnpm build-tokens`.',
    ].join('\n')
  );
} else {
  console.log(`${relativePath} matches the current design tokens.`);
}

let gitStatus = '';
try {
  gitStatus = execFileSync('git', ['status', '--porcelain', '--', outputPath], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  }).trim();
} catch {
  console.log('Skipping the git drift check — git is unavailable.');
}

if (gitStatus !== '') {
  fail(
    [
      `${relativePath} is out of date with the design tokens.`,
      '',
      'The tokens changed but the regenerated DESIGN.md was not committed.',
      'Run `pnpm build-tokens` and commit the result.',
      '',
      execFileSync('git', ['diff', '--stat', '--', outputPath], {
        cwd: REPO_ROOT,
        encoding: 'utf8',
      }).trim(),
    ].join('\n')
  );
}

const report = lint(content);

const byRule = new Map();
for (const finding of report.findings) {
  if (finding.severity === 'info') continue;
  byRule.set(finding.rule, (byRule.get(finding.rule) ?? 0) + 1);
}

if (byRule.size > 0) {
  console.log('\nDESIGN.md spec warnings:');
  for (const [rule, count] of [...byRule].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(3)}  ${rule}`);
  }
  console.log('\nRun `npx design.md lint DESIGN.md` for the full report.');
}

if (report.summary.errors > 0) {
  for (const finding of report.findings.filter((f) => f.severity === 'error')) {
    process.stderr.write(`  error  ${finding.path ?? ''} ${finding.message}\n`);
  }
  fail(`DESIGN.md has ${report.summary.errors} spec error(s).`);
} else {
  console.log(`\nDESIGN.md conforms to the spec (0 errors, ${report.summary.warnings} warnings).`);
}
