// Mock Nuxt composables for testing
export const defineNuxtRouteMiddleware = (middleware) => middleware
export const definePageMeta = () => {}
export const defineNuxtPlugin = (plugin) => plugin
export const navigateTo = jest.fn()
export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
})
export const useRoute = () => ({
  path: '/',
  params: {},
  query: {},
  hash: '',
  name: 'index',
})
export const useRuntimeConfig = () => ({
  public: {
    apiBase: 'https://api.crm.test:40443',
    apiPrefix: '/api/v1'
  }
})
export const useNuxtApp = () => ({
  $pinia: {
    state: { value: {} },
    _s: new Map()
  }
})
export const nextTick = () => Promise.resolve()
export const $fetch = jest.fn()
export const readonly = (value) => value
export const ref = (value) => ({ value })
export const reactive = (value) => value
export const computed = (fn) => ({ value: fn() })
export const watch = jest.fn()
export const onMounted = jest.fn()
export const onUnmounted = jest.fn()
export const toRaw = (value) => value
export const process = {
  client: true,
  server: false,
  env: {
    NODE_ENV: 'test'
  }
}