import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.@(mdx|stories.@([tj]sx))'],

  staticDirs: ['../public'],

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
