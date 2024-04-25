const path = require('path');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        use: [
          ['sass', {
            includePaths: [path.resolve('node_modules')]
          }]
        ],
        inject: false,
        extract: path.resolve('dist/css/index.css'),
      })
    );

    if (!config.output.banner) {
      config.output.banner = "'use client';";
    }
  
    return config;
  },
};
