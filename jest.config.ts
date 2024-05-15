// jest.config.js
module.exports = {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
        'src/Application/domain/Entities/*.ts',
        'src/Application/domain/ValueObjects/*.ts',
        'src/Application/services/*.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
}
