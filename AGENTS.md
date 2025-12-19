# AGENTS.md

## Testing instructions

- Find the CI plan in the .github/workflows folder.
- From the package root you can just call `npm test`. The commit should pass all tests before you merge.
- Fix any test or type errors until the whole suite is green.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions

- Always run `npm lint` and `npm test` before committing.

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
