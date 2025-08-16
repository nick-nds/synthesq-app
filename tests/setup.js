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

process.client = true