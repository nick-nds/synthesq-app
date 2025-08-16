global.fetch = jest.fn()
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

class CookieJar {
  constructor() {
    this.cookies = new Map()
  }

  get cookieString() {
    return Array.from(this.cookies.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join('; ')
  }

  setCookie(cookieString) {
    if (cookieString === '') {
      this.cookies.clear()
      return
    }

    if (cookieString.includes(';') && cookieString.includes('=')) {
      // Handle full cookie string (for tests)
      this.cookies.clear()
      const pairs = cookieString.split(';')
      for (const pair of pairs) {
        const [name, value] = pair.trim().split('=')
        if (name && value !== undefined) {
          this.cookies.set(name, value)
        }
      }
    } else {
      // Handle single cookie
      const [name, value] = cookieString.trim().split('=')
      if (name && value !== undefined) {
        this.cookies.set(name, value)
      }
    }
  }

  clear() {
    this.cookies.clear()
  }
}

const cookieJar = new CookieJar()

global.document = {
  get cookie() {
    return cookieJar.cookieString
  },
  set cookie(value) {
    cookieJar.setCookie(value)
  }
}

// Helper to completely reset cookies (for test isolation)
global.resetDocumentCookies = () => {
  cookieJar.clear()
  // Force document.cookie to return empty string by clearing and resetting the getter
  Object.defineProperty(global.document, 'cookie', {
    get() {
      return cookieJar.cookieString
    },
    set(value) {
      cookieJar.setCookie(value)
    },
    configurable: true
  })
}

// Global process object
global.process = {
  client: true,
  server: false,
  env: {
    NODE_ENV: 'test'
  }
}

// Global window object for devtools
global.window = {
  __VUE_DEVTOOLS_GLOBAL_HOOK__: {
    emit: jest.fn()
  },
  location: {
    pathname: '/',
    search: '',
    hash: ''
  }
}

// Make process available on window for compatibility
window.process = global.process

// Define Nuxt composables globally
global.defineNuxtRouteMiddleware = (middleware) => middleware
global.definePageMeta = () => {}
global.defineNuxtPlugin = (plugin) => plugin
global.navigateTo = jest.fn()
global.useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
})
global.useRoute = () => ({
  path: '/',
  params: {},
  query: {},
  hash: '',
  name: 'index',
})
global.useRuntimeConfig = () => ({
  public: {
    apiBase: 'https://api.crm.test:40443',
    apiPrefix: '/api/v1'
  }
})
global.useNuxtApp = () => ({
  $pinia: {
    state: { value: {} },
    _s: new Map()
  }
})
global.nextTick = () => Promise.resolve()
global.$fetch = jest.fn()

// Mock $fetch.raw for auth store
global.$fetch.raw = jest.fn(() => Promise.resolve({
  _data: {},
  headers: {
    get: jest.fn()
  }
}))

// Vue composition API mocks
global.ref = (value) => ({ value })
global.reactive = (value) => value
global.computed = (fn) => ({ value: fn() })
global.watch = jest.fn()
global.onMounted = jest.fn()
global.onUnmounted = jest.fn()
global.readonly = (value) => value
global.toRaw = (value) => value