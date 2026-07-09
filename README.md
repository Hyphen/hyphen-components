<p align="center">
  <a href="https://hyphen.ai" rel="noopener" target="_blank"><img width="150" src="packages/components/public/images/logo.png" alt="Hyphen logo"></a></p>
</p>

<h1 align="center" style="border-bottom: none;">Hyphen Design System</h1>
<h3 align="center">

  The monorepo for Hyphen's design system packages

</h3>

## Packages

| Package | Description |
| --- | --- |
| [`@hyphen/hyphen-components`](packages/components) | A [React](https://reactjs.org/) component library to power all Hyphen UI |
| [`@hyphen/hyphen-design-tokens`](packages/design-tokens) | Design tokens (color, spacing, typography, icons, logos) that power all Hyphen UIs |

Both packages are versioned and released together: one GitHub release
publishes both to npm with the same version.

## Quick Start (consumers)

`pnpm add @hyphen/hyphen-components`

See the [components README](packages/components/README.md) for usage,
global CSS imports, and documentation links.

Design tokens can also be consumed directly on other platforms:
`pnpm add @hyphen/hyphen-design-tokens` — see the
[design tokens README](packages/design-tokens/README.md).

## Development

This is a [pnpm workspace](https://pnpm.io/workspaces). All commands run
from the repo root:

```sh
pnpm install          # install all workspace dependencies
pnpm build            # build design tokens, then components
pnpm test             # build tokens, then run all test suites
pnpm lint             # lint all packages
pnpm storybook        # run the component Storybook locally
```

Changing a color, icon, or any other token is now a normal PR to this
repo: edit the sources in `packages/design-tokens` (token JSON in
`tokens/`, icon SVGs in `assets/icons`) and the same PR can update the
components that use them.

## Releasing

Releases are automated with [semantic-release](https://github.com/semantic-release/semantic-release)
from conventional commit messages. When a GitHub release is published,
the Release workflow stamps the tag's version into both packages and
publishes them to npm in dependency order.
