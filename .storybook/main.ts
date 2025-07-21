import custom from '../webpack.config';

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.@(mdx|stories.@([tj]sx))'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],

  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  // typescript: {
  //   check: true, // type-check stories during Storybook build
  // },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [...custom.module.rules],
      },
    };
  }
};
