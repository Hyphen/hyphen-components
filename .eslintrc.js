module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React 17+ doesn't require React in scope
    'react/react-in-jsx-scope': 'off',

    // Disable prop-types (TypeScript handles type checking)
    'react/prop-types': 'off',
    'react/display-name': 'off',

    // Allow unused vars with underscore prefix
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],

    // Allow explicit any in some cases (component library needs flexibility)
    '@typescript-eslint/no-explicit-any': 'warn',

    // React hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Prefer const
    'prefer-const': 'warn',

    // No console in production
    'no-console': 'warn',

    // Allow unescaped entities in JSX (common in component libraries)
    'react/no-unescaped-entities': 'off',

    // Allow children prop for testing
    'react/no-children-prop': 'warn',

    // Import rules
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      // Test files can have different rules
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
};
