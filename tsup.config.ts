import { defineConfig } from 'tsup';
import { Plugin } from 'esbuild';

// Plugin to ignore SCSS imports (CSS is handled by webpack separately)
const ignoreScssPlugin: Plugin = {
  name: 'ignore-scss',
  setup(build) {
    build.onResolve({ filter: /\.scss$/ }, (args) => ({
      path: args.path,
      namespace: 'ignore-scss',
    }));
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
    esbuildPlugins: [ignoreScssPlugin],
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
    esbuildPlugins: [ignoreScssPlugin],
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
    esbuildPlugins: [ignoreScssPlugin],
  },
  // Type declarations only
  {
    entry: { index: 'src/index.ts' },
    dts: { only: true },
    clean: false,
  },
]);
