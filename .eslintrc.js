const VALUE_RULE = {
  ERROR: 'error',
  WARN: 'warn',
  OFF: 'off',
};

const RULES = {
  TS: {
    '@typescript-eslint/indent': [ VALUE_RULE.ERROR, 2 ],
    '@typescript-eslint/no-explicit-any': VALUE_RULE.OFF,
    '@typescript-eslint/no-unused-vars': [ VALUE_RULE.WARN, { varsIgnorePattern: '__' } ],
  },
  JEST: {
    'jest/no-disabled-tests': VALUE_RULE.WARN,
    'jest/no-focused-tests': VALUE_RULE.ERROR,
    'jest/no-identical-title': VALUE_RULE.ERROR,
    'jest/prefer-to-have-length': VALUE_RULE.WARN,
    'jest/valid-expect': VALUE_RULE.ERROR,
  },
  REACT: {
    'react/jsx-filename-extension': [ VALUE_RULE.ERROR, { extensions: [ '.jsx', '.tsx' ] } ],
    'react/react-in-jsx-scope': VALUE_RULE.OFF,
  },
  VUE: {
    'vue/multi-word-component-names': VALUE_RULE.OFF,
    'import/no-extraneous-dependencies': VALUE_RULE.OFF,
  },
  ESLINT: {
    'array-bracket-spacing': [ VALUE_RULE.ERROR, 'always' ],
    'arrow-parens': [ VALUE_RULE.ERROR, 'as-needed' ],
    'computed-property-spacing': [ VALUE_RULE.ERROR, 'always' ],
    // 'indent': [ VALUE_RULE.ERROR, 2 ],
    'import/extensions': VALUE_RULE.OFF,
    'import/no-unresolved': VALUE_RULE.OFF,
    'import/prefer-default-export': VALUE_RULE.OFF,
    'max-len': [ VALUE_RULE.ERROR, { code: 160, comments: 160 } ],
    'max-classes-per-file': VALUE_RULE.OFF,
    'no-console': [ VALUE_RULE.ERROR, { allow: [ 'error', 'warn', 'dir', 'info' ] } ],
    'no-continue': VALUE_RULE.OFF,
    'no-plusplus': VALUE_RULE.OFF,
    'no-this-before-super': VALUE_RULE.OFF,
    'no-param-reassign': VALUE_RULE.OFF,
    'no-restricted-syntax': VALUE_RULE.OFF,
    'no-underscore-dangle': VALUE_RULE.OFF,
    'no-unused-expressions': [ VALUE_RULE.ERROR, { allowTernary: true } ],
    'no-unused-vars': VALUE_RULE.ERROR,
    'object-curly-spacing': [ VALUE_RULE.ERROR, 'always' ],
    'require-jsdoc': VALUE_RULE.WARN,
    'semi': [ VALUE_RULE.ERROR, 'always' ],
    'sort-imports': [ VALUE_RULE.ERROR, { allowSeparatedGroups: true, memberSyntaxSortOrder: [ 'none', 'all', 'single', 'multiple' ] } ],
    'space-before-function-paren': [ VALUE_RULE.ERROR, 'never' ],
    'space-in-parens': [ VALUE_RULE.ERROR, 'always' , { 'exceptions': [ 'empty' ] } ],
    'template-curly-spacing': [ VALUE_RULE.ERROR, 'always' ],
    'quotes': [ VALUE_RULE.ERROR, 'single' ],
  },
};


module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jsdoc/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'jsdoc',
  ],
  rules: {
    ...RULES.TS,
    ...RULES.JEST,
    ...RULES.REACT,
    ...RULES.ESLINT,
  },
};
