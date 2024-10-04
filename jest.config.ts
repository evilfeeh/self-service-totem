// jest.config.js
module.exports = {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'cobertura'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
}
