/**
 * This single config file handles both the production and development/storybook builds.
 * If the environment is production, a fully minified/production build,
 * using custom plugins and module rules, is generated and output to `/dist`.
 * If the environment is development/storybook, a custom set of module rules are created,
 * and a subset of the resulting config (plugins, module.rules, and resolve.extensions) are consumed by
 * `.storybook/main.js` to supplement Storybook's existing config.
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// TODO: find a replacement for this plugin.
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rules = [];

// Process all SCSS modules which will be compiled inside the main JS bundle.
const injectCssModulesInJS = {
  test: /\.scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]__[hash:base64:5]',
        },
        sourceMap: true,
      },
    },
    'sass-loader',
    'postcss-loader',
  ],
  include: /\.module\.scss$/,
};

// Process all SCSS modules which will be compiled to an index.css
const extractCssModulesToCss = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: {
          localIdentName: '[local]__[hash:base64:5]',
        },
      },
    },
    'sass-loader',
    'postcss-loader',
  ],
  include: /\.module\.scss$/,
};

const processGlobalCss = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
    'postcss-loader',
  ],
  exclude: /\.module\.scss$/,
};

const processFonts = {
  test: /\.(woff(2)?|otf|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  type: 'asset/inline'
};

// When previewing or building storybook, global CSS is imported
// via the storybook preview.js, so only modules need to be processed.
// NOTE: this rule is merged with the rest of the storybook webpack config in
// .storybook/main.js
if (process.env.IS_STORYBOOK) {
  rules.push(
    { ...injectCssModulesInJS },
  );
}

// Rules for package publishing.
// All JS is built with dts/rollup but
// global CSS files are generated via webpack.
if (process.env.IS_PUBLISHING) {
  rules.push(
    ...[
      { ...extractCssModulesToCss },
      { ...processGlobalCss },
      { ...processFonts },
    ],
  );
}

module.exports = {
  mode: process.env.NODE_ENV || 'development', // Should be set in the yarn script since there is no true ENV.
  // Files to be bundled
  entry: {
    index: [path.join(__dirname, 'src/styles/component-modules.js')], // Component CSS modules extracted to index.css.
    utilities: [path.join(__dirname, 'src/styles/utilities.scss')], // Utilities CSS only.
    fonts: [path.join(__dirname, 'src/styles/fonts.scss')], // Fonts CSS only.
    variables: [path.join(__dirname, 'src/styles/variables/index.scss')], // Variables CSS only.
    reset: [path.join(__dirname, 'src/styles/reset.scss')], // CSS Reset only.
  },
  optimization: {
    usedExports: true,
    minimizer: [
      // Minify CSS/SCSS
      new CssMinimizerPlugin(),
    ],
  },
  // Final files based on entry files.
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    // Extract css to its own .css file as opposed to a JS module.
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    // Clear out the css directory on every build.
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'css/**',
      ],
    }),
    // This removes empty .js files generated for css/scss-only entries. Issue inherent to webpack, more details here:
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
    new FixStyleOnlyEntriesPlugin(),
  ],
  module: {
    rules,
  },
  resolve: {
    alias: {
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
    },
  },
};