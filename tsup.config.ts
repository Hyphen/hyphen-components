import { defineConfig } from 'tsup';
import { Plugin } from 'esbuild';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs/promises';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import sass from 'sass';

const require = createRequire(import.meta.url);
const { generateScopedName } = require('./scripts/cssModulesNaming.cjs');

const cssModulesPlugin: Plugin = {
  name: 'css-modules',
  setup(build) {
    build.onResolve({ filter: /\.scss$/ }, (args) => {
      if (args.path.endsWith('.module.scss')) {
        return;
      }

      return {
        path: args.path,
        namespace: 'ignore-scss',
      };
    });

    build.onLoad({ filter: /\.module\.scss$/ }, async (args) => {
      const source = await fs.readFile(args.path, 'utf8');
      const result = sass.compileString(source, {
        loadPaths: [
          path.dirname(args.path),
          path.resolve(process.cwd(), 'node_modules'),
        ],
        url: new URL(`file://${args.path}`),
      });

      let exportedClasses: Record<string, string> = {};
      await postcss([
        postcssModules({
          generateScopedName: (name: string, filename: string) =>
            generateScopedName(name, filename),
          getJSON: (_filename: string, json: Record<string, string>) => {
            exportedClasses = json;
          },
        }),
      ]).process(result.css, { from: args.path });

      return {
        contents: `export default ${JSON.stringify(exportedClasses)};`,
        loader: 'js',
        resolveDir: path.dirname(args.path),
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'ignore-scss' }, () => ({
      contents: '',
      loader: 'js',
    }));
  },
};

export default defineConfig([
  // CJS Development build
  {
    entry: { 'hyphen-components.cjs.development': 'src/index.ts' },
    format: ['cjs'],
    target: 'es2020',
    dts: false,
    sourcemap: true,
    clean: false,
    banner: { js: "'use client';" },
    external: ['react', 'react-dom'],
    outExtension: () => ({ js: '.js' }),
    esbuildPlugins: [cssModulesPlugin],
  },
  // CJS Production build (minified)
  {
    entry: { 'hyphen-components.cjs.production.min': 'src/index.ts' },
    format: ['cjs'],
    target: 'es2020',
    dts: false,
    sourcemap: true,
    clean: false,
    minify: true,
    banner: { js: "'use client';" },
    external: ['react', 'react-dom'],
    outExtension: () => ({ js: '.js' }),
    esbuildPlugins: [cssModulesPlugin],
  },
  // ESM build
  {
    entry: { 'hyphen-components.esm': 'src/index.ts' },
    format: ['esm'],
    target: 'es2020',
    dts: false,
    sourcemap: true,
    clean: false,
    banner: { js: "'use client';" },
    external: ['react', 'react-dom'],
    outExtension: () => ({ js: '.js' }),
    esbuildPlugins: [cssModulesPlugin],
  },
  // Type declarations only
  {
    entry: { index: 'src/index.ts' },
    dts: { only: true },
    clean: false,
  },
]);
