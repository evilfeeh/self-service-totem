// jest.config.js
module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/Application/Entities/*.ts','<rootDir>/src/Application/ValueObjects/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',  
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
};
