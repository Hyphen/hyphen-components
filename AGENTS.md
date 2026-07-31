# AGENTS.md

## Repository layout

- This is a pnpm workspace monorepo with two published packages:
  - `packages/components` — `@hyphen/hyphen-components`, the React component library.
  - `packages/design-tokens` — `@hyphen/hyphen-design-tokens`, the design token source (token JSON in `tokens/`, icon/logo SVGs in `assets/`) and its Style Dictionary build.
- Components consume the tokens package via a `workspace:^` dependency; the tokens `build/` output must exist before component tests or Storybook run. The root scripts handle this ordering — prefer them over per-package scripts.
- Both packages share one version and are published together by the Release workflow (version comes from the GitHub release tag).

## DESIGN.md

- `DESIGN.md` at the repo root describes Hyphen's visual identity in the
  [design.md](https://github.com/google-labs-code/design.md) format: YAML front
  matter carrying the design tokens, markdown prose carrying the rationale. Read
  it before building UI with this library.
- **It is generated — do not edit it directly.** `pnpm build-tokens` regenerates
  it as the last step of the design-token build. Change it by editing:
  - `packages/design-tokens/design-md/prose.md` — the markdown body.
  - `packages/design-tokens/design-md/designMdConfig.js` — which tokens are
    published and how they map onto design.md's schema.
  - `packages/design-tokens/tokens/**` — the values themselves.
- `pnpm lint-design-md` rebuilds the tokens, checks the committed file is not
  stale, and validates it against the spec. CI runs this in the Lint job, so a
  token change without a regenerated `DESIGN.md` fails the build.
- The file is committed (agents read it from the repo) and copied into
  `packages/components/dist/` at build time so it ships to consumers.

## Testing instructions

- Find the CI plan in the .github/workflows folder.
- From the repo root you can just call `pnpm test` (it builds the design tokens first, then runs every package's tests). The commit should pass all tests before you merge.
- Fix any test or type errors until the whole suite is green.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions

- Always run `pnpm lint` and `pnpm test` from the repo root before committing.

## Code Review Checklist

- Ensure code is readable, well-commented, and follows project conventions.
- Check for unnecessary complexity or duplication.
- Confirm all new code is covered by tests.
- Verify accessibility and responsiveness for UI components.
- Ensure all dependencies are up-to-date and necessary.

## Branching & Commit Guidelines

- Use descriptive branch names (e.g., `feature/`, `bugfix/`, `chore/`).
- Commit messages must follow the [semantic-release](https://semantic-release.gitbook.io/semantic-release/) format (e.g., `feat:`, `fix:`, `chore:`, etc.).
- Write clear, concise commit messages describing the change and why it was made.

## Release & Merge Process

- Rebase or merge the latest `main` branch before opening a PR.
- Ensure the PR description explains the context and reasoning for the change.
- Tag reviewers and wait for approval before merging.

## Documentation

- Update or add documentation for any new features or changes.
- Ensure usage examples are clear and up-to-date.

## Troubleshooting

- If tests fail locally but pass in CI, clear local caches and try again.
- For flaky tests, investigate root cause and add comments or skip with a clear TODO.
