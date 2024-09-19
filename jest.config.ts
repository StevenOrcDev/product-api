import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]s$',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ['src/**/*.(t|j)s', '!**/index.{ts,js}', '!**/*.test.ts', '!**/*.spec.ts', '!**/mocks/**/*.{ts,js}'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
