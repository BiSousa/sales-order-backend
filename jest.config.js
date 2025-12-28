/* eslint-disable @typescript-eslint/no-require-imports */

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: 'ts-jest',
    collectCoverage: false,
    globalSetup: './test//e2e/config/setup.ts',
    moduleNameManager: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: '<rootDir>/'
    }),
    testMatch: ['**/*.e2e.ts']
};
