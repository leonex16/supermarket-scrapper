const RULE = {
  OFF: 'off',
  ERROR: 'error',
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'react-app',
    'react-app/jest',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': RULE.OFF,
    'import/no-unresolved': RULE.OFF,
    'import/extensions': RULE.OFF,
    'no-underscore-dangle': RULE.OFF,
    'require-jsdoc': RULE.OFF,
    'max-len': [RULE.ERROR, { code: 160, comments: 80 }],
    indent: [RULE.ERROR, 2],
    'arrow-parens': [RULE.ERROR, 'as-needed'],
    'space-in-parens': [RULE.ERROR, 'always'],
    'object-curly-spacing': [RULE.ERROR, 'always'],
    'sort-imports': [RULE.ERROR, { allowSeparatedGroups: true, memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'] }],
    'react/jsx-filename-extension': [RULE.ERROR, { extensions: ['.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': RULE.OFF
  },
};
