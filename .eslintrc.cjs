module.exports = {
  root: true,
  env: { 
    node: true, 
    es2023: true 
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended'
  ],
  ignorePatterns: [
    'dist/', 
    'node_modules/', 
    '*.cjs',
    '*.js'
  ],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  rules: {
    // Disable rules that don't work well with TypeScript
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
};