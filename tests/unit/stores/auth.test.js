import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

// Mock Nuxt composables
const mockUseRuntimeConfig = jest.fn(() => ({
  public: {
    apiBase: 'https://api.crm.test:40443',
    apiPrefix: '/api/v1'
  }
}))

const mockNavigateTo = jest.fn()
const mockFetchRaw = jest.fn()
const mockFetch = jest.fn()

global.useRuntimeConfig = mockUseRuntimeConfig
global.navigateTo = mockNavigateTo
global.$fetch = mockFetch
global.$fetch.raw = mockFetchRaw
global.ref = (val) => ({ value: val })
global.readonly = (val) => val
global.computed = (fn) => ({ value: fn() })

describe('Auth Store', () => {
  let authStore

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()
    global.localStorage.clear()
    global.resetDocumentCookies()
    
    // Set up fresh Pinia
    setActivePinia(createPinia())
    authStore = useAuthStore()
    
    // Reset process.client
    global.process.client = true
  })

  describe('State Management', () => {
    test('initializes with empty state', () => {
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(authStore.isLoading).toBe(false)
      expect(authStore.isAuthenticated).toBe(false)
    })

    test('setUser updates user state and persists to localStorage', () => {
      const userData = { id: 1, email: 'test@example.com', name: 'Test User' }
      
      authStore.setUser(userData)
      
      expect(authStore.user).toEqual(userData)
      expect(global.localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userData))
    })

    test('setBusinessId updates businessId state and persists to localStorage', () => {
      const businessId = 'tenant1'
      
      authStore.setBusinessId(businessId)
      
      expect(authStore.businessId).toBe(businessId)
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', businessId)
    })

    test('clearAuth clears state and localStorage', () => {
      // Set some initial state
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      authStore.clearAuth()
      
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('user')
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('business_id')
    })

    test('isAuthenticated computed returns true when user exists', () => {
      expect(authStore.isAuthenticated).toBe(false)
      
      authStore.setUser({ id: 1, email: 'test@example.com' })
      
      expect(authStore.isAuthenticated).toBe(true)
    })
  })

  describe('CSRF Token Management', () => {
    test('getCsrfToken returns null when no XSRF-TOKEN cookie exists', () => {
      global.document.cookie = ''
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBeNull()
    })

    test('getCsrfToken extracts XSRF-TOKEN from cookies', () => {
      global.document.cookie = 'XSRF-TOKEN=test-csrf-token-123; other=value'
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBe('test-csrf-token-123')
    })

    test('getCsrfToken handles URL encoded tokens', () => {
      const encodedToken = encodeURIComponent('test+token/with=special&chars')
      global.document.cookie = `XSRF-TOKEN=${encodedToken}`
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBe('test+token/with=special&chars')
    })

    test('getCsrfCookie makes request to /csrf-cookie endpoint', async () => {
      mockFetch.mockResolvedValue({})
      
      const result = await authStore.getCsrfCookie()
      
      expect(mockFetch).toHaveBeenCalledWith('/csrf-cookie', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include'
      })
      expect(result).toBe(true)
    })

    test('getCsrfCookie handles errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const result = await authStore.getCsrfCookie()
      
      expect(result).toBe(false)
      expect(consoleSpy).toHaveBeenCalledWith('Failed to get CSRF cookie:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('Authenticated Requests', () => {
    beforeEach(() => {
      global.document.cookie = 'XSRF-TOKEN=test-csrf-token'
      authStore.setBusinessId('tenant1')
    })

    test('makeAuthenticatedRequest includes proper headers', async () => {
      mockFetchRaw.mockResolvedValue({
        _data: { success: true },
        headers: new Map()
      })
      
      await authStore.makeAuthenticatedRequest('/test')
      
      expect(mockFetchRaw).toHaveBeenCalledWith('/test', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Business-ID': 'tenant1',
          'X-XSRF-TOKEN': 'test-csrf-token'
        }
      })
    })

    test('makeAuthenticatedRequest handles 419 CSRF errors with retry', async () => {
      const csrfError = new Error('CSRF token mismatch')
      csrfError.status = 419
      
      // First call fails with 419, second succeeds
      mockFetchRaw
        .mockRejectedValueOnce(csrfError)
        .mockResolvedValueOnce({
          _data: { success: true },
          headers: new Map()
        })
      
      mockFetch.mockResolvedValue({}) // for getCsrfCookie
      global.document.cookie = 'XSRF-TOKEN=new-csrf-token'
      
      const result = await authStore.makeAuthenticatedRequest('/test')
      
      expect(mockFetch).toHaveBeenCalledWith('/csrf-cookie', expect.any(Object))
      expect(mockFetchRaw).toHaveBeenCalledTimes(2)
      expect(result).toEqual({ success: true })
    })

    test('makeAuthenticatedRequest updates CSRF token from response headers', async () => {
      const mockHeaders = new Map([
        ['X-XSRF-TOKEN', 'new-token-from-header']
      ])
      
      mockFetchRaw.mockResolvedValue({
        _data: { success: true },
        headers: mockHeaders
      })
      
      await authStore.makeAuthenticatedRequest('/test')
      
      expect(global.document.cookie).toContain('XSRF-TOKEN=new-token-from-header')
    })
  })

  describe('User Management', () => {
    test('getCurrentUser makes authenticated request to /user', async () => {
      const userData = { id: 1, email: 'test@example.com' }
      mockFetchRaw.mockResolvedValue({
        _data: userData,
        headers: new Map()
      })
      
      const result = await authStore.getCurrentUser()
      
      expect(mockFetchRaw).toHaveBeenCalledWith('/user', expect.objectContaining({
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include'
      }))
      expect(result).toEqual(userData)
    })

    test('getCurrentUser returns null on 401 error', async () => {
      const error = new Error('Unauthorized')
      error.status = 401
      mockFetchRaw.mockRejectedValue(error)
      
      const result = await authStore.getCurrentUser()
      
      expect(result).toBeNull()
    })

    test('getCurrentUser throws on non-401 errors', async () => {
      const error = new Error('Server error')
      error.status = 500
      mockFetchRaw.mockRejectedValue(error)
      
      await expect(authStore.getCurrentUser()).rejects.toThrow('Server error')
    })

    test('getCurrentUser waits for token refresh when forceRefreshToken is true', async () => {
      const userData = { id: 1, email: 'test@example.com' }
      mockFetchRaw.mockResolvedValue({
        _data: userData,
        headers: new Map()
      })
      
      const startTime = Date.now()
      await authStore.getCurrentUser(true)
      const endTime = Date.now()
      
      // Should have waited at least 100ms
      expect(endTime - startTime).toBeGreaterThanOrEqual(90)
    })
  })

  describe('Authentication Status', () => {
    test('checkAuthStatus gets CSRF cookie and user data', async () => {
      const userData = { id: 1, email: 'test@example.com' }
      mockFetch.mockResolvedValue({}) // for getCsrfCookie
      mockFetchRaw.mockResolvedValue({
        _data: userData,
        headers: new Map()
      })
      
      const result = await authStore.checkAuthStatus()
      
      expect(mockFetch).toHaveBeenCalledWith('/csrf-cookie', expect.any(Object))
      expect(authStore.user).toEqual(userData)
      expect(result).toBe(true)
    })

    test('checkAuthStatus returns false when CSRF cookie fails', async () => {
      mockFetch.mockRejectedValue(new Error('CSRF failed'))
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(authStore.user).toBeNull()
    })

    test('checkAuthStatus clears auth on user fetch failure', async () => {
      mockFetch.mockResolvedValue({}) // CSRF succeeds
      mockFetchRaw.mockRejectedValue(new Error('User fetch failed'))
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(authStore.user).toBeNull()
      
      consoleSpy.mockRestore()
    })

    test('checkAuthStatus skips if already loading', async () => {
      authStore.isLoading.value = true
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(mockFetch).not.toHaveBeenCalled()
    })

    test('checkAuthStatus sets loading state correctly', async () => {
      mockFetch.mockResolvedValue({})
      mockFetchRaw.mockResolvedValue({
        _data: null,
        headers: new Map()
      })
      
      expect(authStore.isLoading).toBe(false)
      
      const promise = authStore.checkAuthStatus()
      expect(authStore.isLoading).toBe(true)
      
      await promise
      expect(authStore.isLoading).toBe(false)
    })
  })

  describe('Login Flow', () => {
    test('login sets business ID and makes login request', async () => {
      const credentials = {
        business_id: 'tenant1',
        email: 'test@example.com',
        password: 'password123'
      }
      const userData = { id: 1, email: 'test@example.com' }
      
      mockFetchRaw
        .mockResolvedValueOnce({ _data: { success: true }, headers: new Map() }) // login
        .mockResolvedValueOnce({ _data: userData, headers: new Map() }) // getCurrentUser
      
      const result = await authStore.login(credentials)
      
      expect(authStore.businessId).toBe('tenant1')
      expect(mockFetchRaw).toHaveBeenCalledWith('/login', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        method: 'POST',
        headers: expect.objectContaining({
          'X-Business-ID': 'tenant1'
        }),
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      })
      expect(authStore.user).toEqual(userData)
      expect(result).toEqual({ success: true, user: userData })
    })

    test('login handles 401 unauthorized error', async () => {
      const error = new Error('Unauthorized')
      error.status = 401
      mockFetchRaw.mockRejectedValue(error)
      
      const result = await authStore.login({
        business_id: 'tenant1',
        email: 'wrong@example.com',
        password: 'wrongpass'
      })
      
      expect(result).toEqual({
        success: false,
        error: 'Invalid credentials. Please check your email and password.'
      })
      expect(authStore.user).toBeNull()
    })

    test('login handles 422 validation error', async () => {
      const error = new Error('Validation failed')
      error.status = 422
      error.data = { message: 'Email is required' }
      mockFetchRaw.mockRejectedValue(error)
      
      const result = await authStore.login({
        business_id: 'tenant1',
        email: '',
        password: 'password123'
      })
      
      expect(result).toEqual({
        success: false,
        error: 'Email is required'
      })
    })

    test('login handles 403 access denied error', async () => {
      const error = new Error('Forbidden')
      error.status = 403
      mockFetchRaw.mockRejectedValue(error)
      
      const result = await authStore.login({
        business_id: 'invalid-tenant',
        email: 'test@example.com',
        password: 'password123'
      })
      
      expect(result).toEqual({
        success: false,
        error: 'Access denied. Please check your business ID.'
      })
    })

    test('login handles generic errors', async () => {
      const error = new Error('Network error')
      error.status = 500
      mockFetchRaw.mockRejectedValue(error)
      
      const result = await authStore.login({
        business_id: 'tenant1',
        email: 'test@example.com',
        password: 'password123'
      })
      
      expect(result).toEqual({
        success: false,
        error: 'Login failed. Please try again.'
      })
    })

    test('login prevents concurrent login attempts', async () => {
      authStore.isLoading.value = true
      
      const result = await authStore.login({
        business_id: 'tenant1',
        email: 'test@example.com',
        password: 'password123'
      })
      
      expect(result).toEqual({
        success: false,
        error: 'Login already in progress'
      })
      expect(mockFetchRaw).not.toHaveBeenCalled()
    })

    test('login clears auth on getCurrentUser failure', async () => {
      mockFetchRaw
        .mockResolvedValueOnce({ _data: { success: true }, headers: new Map() }) // login succeeds
        .mockResolvedValueOnce({ _data: null, headers: new Map() }) // getCurrentUser returns null
      
      const result = await authStore.login({
        business_id: 'tenant1',
        email: 'test@example.com',
        password: 'password123'
      })
      
      expect(result).toEqual({
        success: false,
        error: 'Failed to get user data after login'
      })
      expect(authStore.user).toBeNull()
    })
  })

  describe('Logout Flow', () => {
    test('logout makes logout request and clears auth', async () => {
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      mockFetchRaw.mockResolvedValue({ _data: { success: true }, headers: new Map() })
      
      await authStore.logout()
      
      expect(mockFetchRaw).toHaveBeenCalledWith('/logout', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        method: 'POST',
        headers: expect.any(Object)
      })
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(mockNavigateTo).toHaveBeenCalledWith('/login')
    })

    test('logout clears auth even if API request fails', async () => {
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      mockFetchRaw.mockRejectedValue(new Error('Logout failed'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await authStore.logout()
      
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(mockNavigateTo).toHaveBeenCalledWith('/login')
      
      consoleSpy.mockRestore()
    })
  })

  describe('Storage Initialization', () => {
    test('initializeFromStorage restores user and businessId from localStorage', () => {
      const userData = { id: 1, email: 'test@example.com' }
      global.localStorage.getItem
        .mockReturnValueOnce(JSON.stringify(userData)) // user
        .mockReturnValueOnce('tenant1') // business_id
      
      authStore.initializeFromStorage()
      
      expect(authStore.user).toEqual(userData)
      expect(authStore.businessId).toBe('tenant1')
    })

    test('initializeFromStorage handles invalid JSON gracefully', () => {
      global.localStorage.getItem
        .mockReturnValueOnce('invalid-json') // user
        .mockReturnValueOnce('tenant1') // business_id
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      authStore.initializeFromStorage()
      
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBe('tenant1')
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse stored user:', expect.any(SyntaxError))
      
      consoleSpy.mockRestore()
    })

    test('initializeFromStorage does nothing when process.client is false', () => {
      global.process.client = false
      global.localStorage.getItem.mockReturnValue('should-not-be-called')
      
      authStore.initializeFromStorage()
      
      expect(global.localStorage.getItem).not.toHaveBeenCalled()
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
    })
  })

  describe('Auth Redirect Handling', () => {
    test('handleAuthRedirect redirects authenticated user from login to dashboard', async () => {
      global.window = { location: { pathname: '/login' } }
      mockFetch.mockResolvedValue({})
      mockFetchRaw.mockResolvedValue({
        _data: { id: 1, email: 'test@example.com' },
        headers: new Map()
      })
      
      await authStore.handleAuthRedirect()
      
      expect(mockNavigateTo).toHaveBeenCalledWith('/')
    })

    test('handleAuthRedirect redirects unauthenticated user to login', async () => {
      global.window = { location: { pathname: '/dashboard' } }
      mockFetch.mockResolvedValue({})
      mockFetchRaw.mockResolvedValue({ _data: null, headers: new Map() })
      
      await authStore.handleAuthRedirect()
      
      expect(mockNavigateTo).toHaveBeenCalledWith('/login')
    })

    test('handleAuthRedirect does nothing when already on correct page', async () => {
      global.window = { location: { pathname: '/dashboard' } }
      mockFetch.mockResolvedValue({})
      mockFetchRaw.mockResolvedValue({
        _data: { id: 1, email: 'test@example.com' },
        headers: new Map()
      })
      
      await authStore.handleAuthRedirect()
      
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })

    test('handleAuthRedirect does nothing on server side', async () => {
      global.process.client = false
      
      await authStore.handleAuthRedirect()
      
      expect(mockFetch).not.toHaveBeenCalled()
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })
})