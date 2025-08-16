export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': '<rootDir>/tests/mocks/vue.js',
    '^#app': '<rootDir>/tests/mocks/nuxt.js',
    '^#build': '<rootDir>/tests/mocks/nuxt.js',
    '^pinia$': '<rootDir>/tests/mocks/pinia.js',
  },
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/utils/**/*.js',
    '<rootDir>/composables/**/*.js',
    '<rootDir>/stores/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.nuxt/',
    '/dist/',
    '/tests/unit/pages/',
    '/tests/integration/',
    '/tests/e2e/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(pinia|@pinia|@vue|@nuxt|nuxt|#app|#build|.pnpm))',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
}