// Mock Vue 3 composition API
export const ref = (value) => ({ value })
export const reactive = (value) => value
export const computed = (fn) => ({ value: fn() })
export const watch = jest.fn()
export const onMounted = jest.fn()
export const onUnmounted = jest.fn()
export const readonly = (value) => value
export const toRaw = (value) => value
export const nextTick = () => Promise.resolve()
export const defineComponent = (component) => component
export const createApp = () => ({
  mount: jest.fn(),
  use: jest.fn(),
  provide: jest.fn(),
})