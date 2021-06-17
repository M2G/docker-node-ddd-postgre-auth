module.exports = {
  coverageDirectory: './test/coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/node_modules/**',
    "!<rootDir>/src/core/**",
    "!<rootDir>/src/models/**",
    "!<rootDir>/src/repository/**",
    "!<rootDir>/src/utils/**",
    "!<rootDir>/src/index.ts"
  ],
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  },
  preset: "ts-jest",
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts?$',
  modulePaths: [],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/(build|node_modules)/"
  ],
  testEnvironment: 'node',
};
