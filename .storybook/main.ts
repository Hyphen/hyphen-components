import custom from '../webpack.config';

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.@(mdx|stories.@([tj]sx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook'
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  // typescript: {
  //   check: true, // type-check stories during Storybook build
  // },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [...custom.module.rules],
      },
    };
  },
};
