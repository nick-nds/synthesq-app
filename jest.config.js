export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/utils/**/*.js',
    '<rootDir>/composables/**/*.js',
    '<rootDir>/plugins/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.nuxt/',
    '/dist/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@nuxt|nuxt|#app|#build|.pnpm))',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
}