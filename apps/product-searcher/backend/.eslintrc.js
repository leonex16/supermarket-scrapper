const VALUE_RULE = {
  ERROR: 'error',
  WARN: 'warn',
  OFF: 'off'
};

const ENVS = {
  TS: {
    RULES: {
      '@typescript-eslint/indent': [ VALUE_RULE.ERROR, 2 ],
      '@typescript-eslint/no-explicit-any': VALUE_RULE.OFF,
      '@typescript-eslint/no-unused-vars': [ VALUE_RULE.ERROR, { argsIgnorePattern: '^_' } ],
      '@typescript-eslint/no-shadow': [ VALUE_RULE.ERROR ],
      '@typescript-eslint/no-useless-constructor': VALUE_RULE.ERROR,
      'no-shadow': VALUE_RULE.OFF,
      indent: VALUE_RULE.OFF
    },
    EXTENDS: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/eslint-recommended'
    ],
    PLUGINS: [
      '@typescript-eslint'
    ]
  },
  JEST: {
    RULES: {
      'jest/no-disabled-tests': VALUE_RULE.WARN,
      'jest/no-focused-tests': VALUE_RULE.ERROR,
      'jest/no-identical-title': VALUE_RULE.ERROR,
      'jest/prefer-to-have-length': VALUE_RULE.WARN,
      'jest/valid-expect': VALUE_RULE.ERROR
    },
    EXTENDS: [
      'react-app/jest'
    ],

    PLUGINS: [
      'jest'
    ]
  },
  REACT: {
    RULES: {
      'react/jsx-filename-extension': [ VALUE_RULE.ERROR, { extensions: [ '.jsx', '.tsx' ] } ],
      'react/react-in-jsx-scope': VALUE_RULE.OFF
    },
    EXTENDS: [
      'react-app',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    ],

    PLUGINS: [
      'react'
    ]
  },
  VUE: {
    RULES: {
      'vue/multi-word-component-names': VALUE_RULE.OFF,
      'import/no-extraneous-dependencies': VALUE_RULE.OFF,
      'no-unused-expressions': VALUE_RULE.OFF
    },
    EXTENDS: [
      'plugin:vue/essential'
    ],

    PLUGINS: [
      'vue'
    ]
  },
  ESLINT: {
    RULES: {
      'array-bracket-spacing': [ VALUE_RULE.ERROR, 'always' ],
      'arrow-parens': [ VALUE_RULE.ERROR, 'as-needed' ],
      'computed-property-spacing': [ VALUE_RULE.ERROR, 'always' ],
      'import/extensions': VALUE_RULE.OFF,
      'import/no-unresolved': VALUE_RULE.OFF,
      'import/prefer-default-export': VALUE_RULE.OFF,
      'max-len': [ VALUE_RULE.ERROR, { code: 160, comments: 160 } ],
      'max-classes-per-file': VALUE_RULE.OFF,
      'max-nested-callbacks': VALUE_RULE.ERROR,
      'no-async-promise-executor': VALUE_RULE.ERROR,
      'no-await-in-loop': VALUE_RULE.ERROR,
      'no-console': [ VALUE_RULE.ERROR, { allow: [ 'error', 'warn', 'dir', 'info', 'table', 'time', 'timeEnd', 'assert' ] } ],
      'no-continue': VALUE_RULE.OFF,
      'no-plusplus': VALUE_RULE.OFF,
      'no-this-before-super': VALUE_RULE.OFF,
      'no-param-reassign': VALUE_RULE.OFF,
      'no-promise-executor-return': VALUE_RULE.ERROR,
      'no-return-await': VALUE_RULE.ERROR,
      'no-restricted-syntax': VALUE_RULE.OFF,
      'no-underscore-dangle': VALUE_RULE.OFF,
      'no-unused-expressions': [ VALUE_RULE.ERROR, { allowTernary: true } ],
      'no-unused-vars': VALUE_RULE.OFF,
      'object-curly-spacing': [ VALUE_RULE.ERROR, 'always' ],
      'prefer-promise-reject-errors': VALUE_RULE.ERROR,
      'require-atomic-updates': VALUE_RULE.ERROR,
      'require-jsdoc': VALUE_RULE.OFF,
      semi: [ VALUE_RULE.ERROR, 'always' ],
      'sort-imports': [ VALUE_RULE.ERROR, { allowSeparatedGroups: true, memberSyntaxSortOrder: [ 'none', 'all', 'single', 'multiple' ] } ],
      // 'space-before-function-paren': [ VALUE_RULE.ERROR, 'never', { anonymous: 'always', asyncArrow: 'always', named: 'never' } ],
      'space-in-parens': [ VALUE_RULE.ERROR, 'always', { exceptions: [ 'empty' ] } ],
      'template-curly-spacing': [ VALUE_RULE.ERROR, 'always' ],
      'no-useless-constructor': VALUE_RULE.OFF,
      'func-names': VALUE_RULE.OFF,
      quotes: [ VALUE_RULE.ERROR, 'single' ],
      'quote-props': VALUE_RULE.OFF
    },
    EXTENDS: [
      'standard'
    ],

    PLUGINS: []
  },
  TESTING_LIBRARY: {
    RULES: {},

    EXTENDS: {},

    PLUGINS: [
      'testing-library'
    ]
  }
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    ...ENVS.TS.EXTENDS,
    ...ENVS.ESLINT.EXTENDS
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    ...ENVS.ESLINT.PLUGINS,
    ...ENVS.TS.PLUGINS
    // ...ENVS.JEST.PLUGINS,
  ],
  rules: {
    ...ENVS.ESLINT.RULES,
    ...ENVS.TS.RULES
    // ...ENVS.JEST.RULES,
  }
};
