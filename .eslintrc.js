module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    // Basic rules only to avoid false alarms
    'no-unused-vars': 'off', // Turn off base rule for TypeScript
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'off', // Allow console.log for CLI tools
    'no-undef': 'off', // TypeScript handles this
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.js', // Ignore JS files like test files
    '*.cjs', // Ignore CommonJS files
  ],
};