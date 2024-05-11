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
    moduleNameMapper: {
        '^@Application/(.*)$': '<rootDir>/src/Application/$1',
        '^@Shared/(.*)$': '<rootDir>/src/Shared/$1',
        '^@Entities/(.*)$': '<rootDir>/src/Application/domain/Entities/$1',
        '^@Adapters/(.*)$': '<rootDir>/src/Adapters/$1',
        '^@Exceptions/(.*)$': '<rootDir>/src/Application/domain/Exceptions/$1',
    },
}
