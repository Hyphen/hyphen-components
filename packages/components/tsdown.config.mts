import { createRequire } from 'node:module';
import path from 'node:path';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import { compile } from 'sass';
import { defineConfig, type TsdownPlugin, type UserConfig } from 'tsdown';

const require = createRequire(import.meta.url);
const { generateScopedName } = require('./scripts/cssModulesNaming.cjs');

const cssModulesPlugin: TsdownPlugin = {
  name: 'css-modules',
  load: {
    filter: { id: /\.scss$/ },
    async handler(id) {
      // webpack emits the CSS. The JS bundles only need the class names.
      if (!id.endsWith('.module.scss')) {
        return { code: '', moduleType: 'js' };
      }

      const { css } = compile(id, {
        loadPaths: [path.dirname(id), path.resolve('node_modules')],
      });

      let exportedClasses: Record<string, string> = {};
      await postcss([
        postcssModules({
          generateScopedName,
          getJSON: (_filename: string, json: Record<string, string>) => {
            exportedClasses = json;
          },
        }),
      ]).process(css, { from: id });

      return {
        code: `export default ${JSON.stringify(exportedClasses)};`,
        moduleType: 'js',
      };
    },
  },
};

const jsBuild = {
  target: 'es2020',
  dts: false,
  sourcemap: true,
  clean: false,
  css: false,
  banner: "'use client';",
  deps: { neverBundle: ['react', 'react-dom'] },
  outExtensions: () => ({ js: '.js' }),
  plugins: [cssModulesPlugin],
} satisfies UserConfig;

export default defineConfig([
  {
    ...jsBuild,
    entry: { 'hyphen-components.cjs.development': 'src/index.ts' },
    format: 'cjs',
  },
  {
    ...jsBuild,
    entry: { 'hyphen-components.cjs.production.min': 'src/index.ts' },
    format: 'cjs',
    minify: true,
  },
  {
    ...jsBuild,
    entry: { 'hyphen-components.esm': 'src/index.ts' },
    format: 'esm',
  },
  {
    entry: { index: 'src/index.ts' },
    format: 'esm',
    dts: { emitDtsOnly: true },
    deps: { onlyBundle: ['csstype'] },
    css: false,
    outExtensions: () => ({ dts: '.d.ts' }),
    clean: false,
  },
]);
