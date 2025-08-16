// Mock Pinia store functionality
export const defineStore = (id, setup) => {
  const store = setup()
  const mockStore = {
    ...store,
    $id: id,
    $state: {},
    $reset: jest.fn(),
    $patch: jest.fn(),
    $subscribe: jest.fn(),
    $onAction: jest.fn(),
  }
  return () => mockStore
}

export const createPinia = () => ({
  state: { value: {} },
  _s: new Map(),
  install: jest.fn(),
})

export const setActivePinia = jest.fn()
export const getActivePinia = () => ({ state: { value: {} } })
export const acceptHMRUpdate = jest.fn()
export const storeToRefs = (store) => store