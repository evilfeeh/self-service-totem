import { defineConfig } from 'vite';


export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts'],
    coverage: {
      enabled: true,
      reporter: ['lcov', 'cobertura','text'],
      include: ['src/**/*.ts'],
    }
  }
})