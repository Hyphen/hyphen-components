import custom from '../webpack.config';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.@(mdx|stories.@([tj]sx))'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
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
