/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const TS_CONFIG = {
  APPLICATION: 'Application/tsconfig.json',
  DOMAIN: 'Domain/tsconfig.json',
  INFRASTRUCTURE: 'Infrastructure/tsconfig.json',
};
const pathToTsConfig = TS_CONFIG[ process.env.LAYERS_TEST_ENV ];

module.exports = {
  // moduleNameMapper: pathsToModuleNameMapper( compilerOptions.paths, { prefix: '<rootDir>' } ),
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: '(spec.ts)',
  verbose: false,
  moduleNameMapper: {
    '@Application/(.*)': '<rootDir>/Application/$1',
    '@server/(.*)': '<rootDir>/Application/pages/api/src/$1',
    '@Domain/(.*)': '<rootDir>/Domain/$1',
    '@Infrastructure/(.*)': '<rootDir>/Infrastructure/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: pathToTsConfig,
      diagnostics: {
        exclude: [ '**' ],
      },
    },
  },
};
