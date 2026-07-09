import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.@(mdx|stories.@([tj]sx))'],

  staticDirs: ['../public'],

  // @hyphen/hyphen-design-tokens is a workspace package, so Vite resolves it
  // outside node_modules and skips the CommonJS interop it applied when the
  // package came from the registry. Its build/assets output is CJS, so opt it
  // back in for both the dev server (optimizeDeps) and static builds (rollup).
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      optimizeDeps: {
        include: [
          '@hyphen/hyphen-design-tokens/build/assets/icons',
          '@hyphen/hyphen-design-tokens/build/assets/icons/react',
          '@hyphen/hyphen-design-tokens/build/assets/images/react',
        ],
      },
      build: {
        commonjsOptions: {
          include: [/node_modules/, /design-tokens[\\/]build[\\/]/],
        },
      },
    }),

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],

  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  // typescript: {
  //   check: true, // type-check stories during Storybook build
  // },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
