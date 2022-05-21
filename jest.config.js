/* eslint-disable max-len */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const TS_CONFIG = {
  APPLICATION: 'Application/tsconfig.json',
  SERVER: 'Application/tsconfig.json',
  DOMAIN: 'Domain/tsconfig.json',
  INFRASTRUCTURE: 'Infrastructure/tsconfig.json',
};
const pathToTsConfig = TS_CONFIG[ process.env.LAYERS_TEST_ENV ];

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: process.env.LAYERS_TEST_ENV === 'APPLICATION' ? 'jsdom' : 'node',
  rootDir: '.',
  testRegex: '(spec.tsx?)',
  verbose: false,
  setupFilesAfterEnv: [ '@testing-library/jest-dom/extend-expect' ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|scss|sass|css)$': '<rootDir>/Application/src/__tests__/__mocks__/fileTransformer.ts',
    '@Application/(.*)': '<rootDir>/Application/$1',
    '@server/(.*)': '<rootDir>/Application/pages/api/src/$1',
    '@Domain/(.*)': '<rootDir>/Domain/$1',
    '@Infrastructure/(.*)': '<rootDir>/Infrastructure/$1',
  },
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: pathToTsConfig,
      diagnostics: false,
    },
  },
};
