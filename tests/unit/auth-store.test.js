import { useAuthStore } from '../../stores/auth.js'

describe('useAuthStore', () => {
  let authStore
  let mockFetch

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Setup fetch mock
    mockFetch = jest.fn()
    global.$fetch = mockFetch
    global.$fetch.raw = jest.fn()
    
    // Reset document.cookie completely
    global.resetDocumentCookies()
    
    // Reset localStorage
    global.localStorage.getItem.mockReturnValue(null)
    global.localStorage.setItem.mockClear()
    global.localStorage.removeItem.mockClear()
    global.localStorage.clear.mockClear()
    
    // Reset process.client to true (default for browser environment)
    process.client = true
    
    // Mock navigateTo
    global.navigateTo = jest.fn()
    
    // Create fresh store instance
    authStore = useAuthStore()
  })

  describe('Store Initialization', () => {
    it('should initialize with default state', () => {
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
      expect(authStore.isLoading).toBe(false)
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should initialize from localStorage when available', () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' }
      const mockBusinessId = 'business-123'
      
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify(mockUser)
        if (key === 'business_id') return mockBusinessId
        return null
      })

      const store = useAuthStore()
      store.initializeFromStorage()

      expect(store.user).toEqual(mockUser)
      expect(store.businessId).toBe(mockBusinessId)
      expect(store.isAuthenticated).toBe(true)
    })

    it('should handle malformed JSON in localStorage gracefully', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return 'invalid-json'
        return null
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const store = useAuthStore()
      store.initializeFromStorage()

      expect(store.user).toBe(null)
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse stored user:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should not initialize from localStorage when process.client is false', () => {
      process.client = false
      global.localStorage.getItem.mockReturnValue(JSON.stringify({ id: 1 }))

      const store = useAuthStore()
      store.initializeFromStorage()

      expect(global.localStorage.getItem).not.toHaveBeenCalled()
      expect(store.user).toBe(null)
    })
  })

  describe('State Management', () => {
    it('should set user and persist to localStorage', () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' }
      
      authStore.setUser(userData)
      
      expect(authStore.user).toEqual(userData)
      expect(authStore.isAuthenticated).toBe(true)
      expect(global.localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userData))
    })

    it('should set business ID and persist to localStorage', () => {
      const businessId = 'business-123'
      
      authStore.setBusinessId(businessId)
      
      expect(authStore.businessId).toBe(businessId)
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', businessId)
    })

    it('should clear auth state and localStorage', () => {
      // Set initial state
      authStore.setUser({ id: 1, name: 'John' })
      authStore.setBusinessId('business-123')
      
      // Clear auth
      authStore.clearAuth()
      
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
      expect(authStore.isAuthenticated).toBe(false)
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('user')
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('business_id')
    })

    it('should not persist to localStorage when process.client is false', () => {
      process.client = false
      
      authStore.setUser({ id: 1 })
      authStore.setBusinessId('business-123')
      authStore.clearAuth()
      
      expect(global.localStorage.setItem).not.toHaveBeenCalled()
      expect(global.localStorage.removeItem).not.toHaveBeenCalled()
    })
  })

  describe('CSRF Token Management', () => {
    it('should extract CSRF token from cookies', () => {
      document.cookie = 'session_id=abc123'
      document.cookie = 'XSRF-TOKEN=csrf_token_value'
      document.cookie = 'other=value'
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBe('csrf_token_value')
    })

    it('should handle URL-encoded CSRF token', () => {
      document.cookie = 'XSRF-TOKEN=token%20with%20spaces'
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBe('token with spaces')
    })

    it('should return null when CSRF token is not found', () => {
      document.cookie = 'session_id=abc123'
      document.cookie = 'other=value'
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBe(null)
    })

    it('should return null when no cookies exist', () => {
      const token = authStore.getCsrfToken()
      
      expect(token).toBe(null)
    })

    it('should return null when process.client is false', () => {
      process.client = false
      document.cookie = 'XSRF-TOKEN=csrf_token_value'
      
      const token = authStore.getCsrfToken()
      
      expect(token).toBe(null)
    })

    it('should get CSRF cookie from server', async () => {
      mockFetch.mockResolvedValue({})
      
      const result = await authStore.getCsrfCookie()
      
      expect(result).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith('/csrf-cookie', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include'
      })
    })

    it('should handle CSRF cookie request failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockFetch.mockRejectedValue(new Error('Network error'))
      
      const result = await authStore.getCsrfCookie()
      
      expect(result).toBe(false)
      expect(consoleSpy).toHaveBeenCalledWith('Failed to get CSRF cookie:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('Authenticated Requests', () => {
    beforeEach(() => {
      authStore.setBusinessId('business-123')
      document.cookie = 'XSRF-TOKEN=csrf_token_value'
    })

    it('should make authenticated request with correct headers', async () => {
      const mockResponse = {
        _data: { success: true },
        headers: {
          get: jest.fn()
        }
      }
      global.$fetch.raw.mockResolvedValue(mockResponse)
      
      const result = await authStore.makeAuthenticatedRequest('/test')
      
      expect(global.$fetch.raw).toHaveBeenCalledWith('/test', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Business-ID': 'business-123',
          'X-XSRF-TOKEN': 'csrf_token_value'
        }
      })
      expect(result).toEqual({ success: true })
    })

    it('should make authenticated request without business ID or CSRF token', async () => {
      authStore.setBusinessId(null)
      global.resetDocumentCookies()
      
      const mockResponse = {
        _data: { success: true },
        headers: {
          get: jest.fn()
        }
      }
      global.$fetch.raw.mockResolvedValue(mockResponse)
      
      await authStore.makeAuthenticatedRequest('/test')
      
      expect(global.$fetch.raw).toHaveBeenCalledWith('/test', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    })

    it('should merge custom options and headers', async () => {
      const mockResponse = {
        _data: { success: true },
        headers: {
          get: jest.fn()
        }
      }
      global.$fetch.raw.mockResolvedValue(mockResponse)
      
      await authStore.makeAuthenticatedRequest('/test', {
        method: 'POST',
        body: { data: 'test' },
        headers: {
          'X-Custom': 'custom-value'
        }
      })
      
      expect(global.$fetch.raw).toHaveBeenCalledWith('/test', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        method: 'POST',
        body: { data: 'test' },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Business-ID': 'business-123',
          'X-XSRF-TOKEN': 'csrf_token_value',
          'X-Custom': 'custom-value'
        }
      })
    })

    it('should handle CSRF token mismatch and retry with new token', async () => {
      const error419 = new Error('CSRF token mismatch')
      error419.status = 419
      
      const newTokenResponse = {
        _data: { success: true },
        headers: {
          get: jest.fn()
        }
      }
      
      global.$fetch.raw
        .mockRejectedValueOnce(error419)
        .mockResolvedValueOnce(newTokenResponse)
      
      mockFetch.mockResolvedValue({}) // For getCsrfCookie
      
      // Set new CSRF token after getCsrfCookie call
      document.cookie = 'XSRF-TOKEN=new_csrf_token'
      
      const result = await authStore.makeAuthenticatedRequest('/test')
      
      expect(mockFetch).toHaveBeenCalledWith('/csrf-cookie', expect.any(Object))
      expect(global.$fetch.raw).toHaveBeenCalledTimes(2)
      expect(global.$fetch.raw).toHaveBeenLastCalledWith('/test', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        headers: expect.objectContaining({
          'X-XSRF-TOKEN': 'new_csrf_token'
        })
      })
      expect(result).toEqual({ success: true })
    })

    it('should throw error when CSRF refresh fails', async () => {
      const error419 = new Error('CSRF token mismatch')
      error419.status = 419
      
      global.$fetch.raw.mockRejectedValue(error419)
      mockFetch.mockRejectedValue(new Error('CSRF refresh failed'))
      
      await expect(authStore.makeAuthenticatedRequest('/test')).rejects.toThrow('CSRF token mismatch')
    })

    it('should handle new CSRF token from Set-Cookie headers', async () => {
      const mockHeaders = {
        get: jest.fn((header) => {
          if (header === 'set-cookie') {
            return 'XSRF-TOKEN=new_csrf_token_value; Path=/; SameSite=Lax'
          }
          return null
        })
      }
      
      const mockResponse = {
        _data: { success: true },
        headers: mockHeaders
      }
      global.$fetch.raw.mockResolvedValue(mockResponse)
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      await authStore.makeAuthenticatedRequest('/test')
      
      expect(consoleSpy).toHaveBeenCalledWith('New CSRF token received in Set-Cookie, will be automatically used')
      
      consoleSpy.mockRestore()
    })

    it('should handle new CSRF token from response headers', async () => {
      const mockHeaders = {
        get: jest.fn((header) => {
          if (header === 'X-XSRF-TOKEN') {
            return 'header_csrf_token'
          }
          return null
        })
      }
      
      const mockResponse = {
        _data: { success: true },
        headers: mockHeaders
      }
      global.$fetch.raw.mockResolvedValue(mockResponse)
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      await authStore.makeAuthenticatedRequest('/test')
      
      expect(document.cookie).toContain('XSRF-TOKEN=header_csrf_token')
      expect(consoleSpy).toHaveBeenCalledWith('Updated CSRF token from response headers')
      
      consoleSpy.mockRestore()
    })
  })

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' }
      
      authStore.makeAuthenticatedRequest = jest.fn().mockResolvedValue(userData)
      
      const result = await authStore.getCurrentUser()
      
      expect(authStore.makeAuthenticatedRequest).toHaveBeenCalledWith('/user')
      expect(result).toEqual(userData)
    })

    it('should return null on 401 error', async () => {
      const error401 = new Error('Unauthorized')
      error401.status = 401
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(error401)
      
      const result = await authStore.getCurrentUser()
      
      expect(result).toBe(null)
    })

    it('should throw error on non-401 errors', async () => {
      const error500 = new Error('Server error')
      error500.status = 500
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(error500)
      
      await expect(authStore.getCurrentUser()).rejects.toThrow('Server error')
    })

    it('should wait for token refresh when forceRefreshToken is true', async () => {
      const userData = { id: 1, name: 'John Doe' }
      authStore.makeAuthenticatedRequest = jest.fn().mockResolvedValue(userData)
      
      const startTime = Date.now()
      await authStore.getCurrentUser(true)
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(100)
    })
  })

  describe('checkAuthStatus', () => {
    it('should check auth status successfully', async () => {
      const userData = { id: 1, name: 'John Doe' }
      
      mockFetch.mockResolvedValue({}) // For getCsrfCookie
      authStore.getCurrentUser = jest.fn().mockResolvedValue(userData)
      
      const result = await authStore.checkAuthStatus()
      
      expect(authStore.isLoading).toBe(false)
      expect(authStore.user).toEqual(userData)
      expect(result).toBe(true)
    })

    it('should return false when CSRF cookie fails', async () => {
      mockFetch.mockRejectedValue(new Error('CSRF failed'))
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(authStore.isLoading).toBe(false)
    })

    it('should clear auth and return false when user is null', async () => {
      mockFetch.mockResolvedValue({}) // For getCsrfCookie
      authStore.getCurrentUser = jest.fn().mockResolvedValue(null)
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
    })

    it('should handle errors and clear auth', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockFetch.mockRejectedValue(new Error('Network error'))
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(authStore.user).toBe(null)
      expect(consoleSpy).toHaveBeenCalledWith('Auth check failed:', expect.any(Error))
      expect(authStore.isLoading).toBe(false)
      
      consoleSpy.mockRestore()
    })

    it('should return false if already loading', async () => {
      // Simulate loading state
      authStore.isLoading.value = true
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
    })
  })

  describe('handleAuthRedirect', () => {
    beforeEach(() => {
      global.window = {
        location: { pathname: '/' }
      }
    })

    it('should not run on server side', async () => {
      process.client = false
      authStore.checkAuthStatus = jest.fn()
      
      await authStore.handleAuthRedirect()
      
      expect(authStore.checkAuthStatus).not.toHaveBeenCalled()
    })

    it('should redirect to dashboard when authenticated and on login page', async () => {
      global.window.location.pathname = '/login'
      authStore.checkAuthStatus = jest.fn().mockResolvedValue(true)
      
      await authStore.handleAuthRedirect()
      
      expect(global.navigateTo).toHaveBeenCalledWith('/')
    })

    it('should redirect to login when not authenticated and not on login page', async () => {
      global.window.location.pathname = '/dashboard'
      authStore.checkAuthStatus = jest.fn().mockResolvedValue(false)
      
      await authStore.handleAuthRedirect()
      
      expect(global.navigateTo).toHaveBeenCalledWith('/login')
    })

    it('should not redirect when authenticated and not on login page', async () => {
      global.window.location.pathname = '/dashboard'
      authStore.checkAuthStatus = jest.fn().mockResolvedValue(true)
      
      await authStore.handleAuthRedirect()
      
      expect(global.navigateTo).not.toHaveBeenCalled()
    })

    it('should not redirect when not authenticated and on login page', async () => {
      global.window.location.pathname = '/login'
      authStore.checkAuthStatus = jest.fn().mockResolvedValue(false)
      
      await authStore.handleAuthRedirect()
      
      expect(global.navigateTo).not.toHaveBeenCalled()
    })
  })

  describe('login', () => {
    const validCredentials = {
      email: 'john@example.com',
      password: 'password123',
      business_id: 'business-123'
    }

    it('should login successfully', async () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' }
      const loginResponse = { success: true }
      
      authStore.makeAuthenticatedRequest = jest.fn()
        .mockResolvedValueOnce(loginResponse) // login endpoint
      
      authStore.getCurrentUser = jest.fn().mockResolvedValue(userData)
      
      const result = await authStore.login(validCredentials)
      
      expect(authStore.businessId).toBe('business-123')
      expect(authStore.makeAuthenticatedRequest).toHaveBeenCalledWith('/login', {
        method: 'POST',
        headers: {
          'X-Business-ID': 'business-123'
        },
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      })
      expect(authStore.getCurrentUser).toHaveBeenCalledWith(true)
      expect(authStore.user).toEqual(userData)
      expect(result).toEqual({ success: true, user: userData })
      expect(authStore.isLoading).toBe(false)
    })

    it('should return error when login already in progress', async () => {
      authStore.isLoading.value = true
      
      const result = await authStore.login(validCredentials)
      
      expect(result).toEqual({ success: false, error: 'Login already in progress' })
    })

    it('should handle 401 unauthorized error', async () => {
      const error401 = new Error('Unauthorized')
      error401.status = 401
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(error401)
      
      const result = await authStore.login(validCredentials)
      
      expect(result).toEqual({
        success: false,
        error: 'Invalid credentials. Please check your email and password.'
      })
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
      expect(authStore.isLoading).toBe(false)
    })

    it('should handle 422 validation error', async () => {
      const error422 = new Error('Validation error')
      error422.status = 422
      error422.data = { message: 'Email is required' }
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(error422)
      
      const result = await authStore.login(validCredentials)
      
      expect(result).toEqual({
        success: false,
        error: 'Email is required'
      })
    })

    it('should handle 403 access denied error', async () => {
      const error403 = new Error('Forbidden')
      error403.status = 403
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(error403)
      
      const result = await authStore.login(validCredentials)
      
      expect(result).toEqual({
        success: false,
        error: 'Access denied. Please check your business ID.'
      })
    })

    it('should handle generic errors', async () => {
      const error500 = new Error('Server error')
      error500.status = 500
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(error500)
      
      const result = await authStore.login(validCredentials)
      
      expect(result).toEqual({
        success: false,
        error: 'Login failed. Please try again.'
      })
    })

    it('should handle failure to get user data after login', async () => {
      const loginResponse = { success: true }
      
      authStore.makeAuthenticatedRequest = jest.fn().mockResolvedValue(loginResponse)
      authStore.getCurrentUser = jest.fn().mockResolvedValue(null)
      
      const result = await authStore.login(validCredentials)
      
      expect(result).toEqual({
        success: false,
        error: 'Failed to get user data after login'
      })
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      authStore.setUser({ id: 1, name: 'John' })
      authStore.setBusinessId('business-123')
      
      authStore.makeAuthenticatedRequest = jest.fn().mockResolvedValue({ success: true })
      
      await authStore.logout()
      
      expect(authStore.makeAuthenticatedRequest).toHaveBeenCalledWith('/logout', {
        method: 'POST'
      })
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
      expect(global.navigateTo).toHaveBeenCalledWith('/login')
    })

    it('should clear auth even when logout request fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      authStore.setUser({ id: 1, name: 'John' })
      authStore.setBusinessId('business-123')
      
      authStore.makeAuthenticatedRequest = jest.fn().mockRejectedValue(new Error('Logout failed'))
      
      await authStore.logout()
      
      expect(authStore.user).toBe(null)
      expect(authStore.businessId).toBe(null)
      expect(global.navigateTo).toHaveBeenCalledWith('/login')
      expect(consoleSpy).toHaveBeenCalledWith('Logout error:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('Store Properties', () => {
    it('should expose readonly state properties', () => {
      authStore.setUser({ id: 1, name: 'John' })
      authStore.setBusinessId('business-123')
      
      expect(authStore.user).toEqual({ id: 1, name: 'John' })
      expect(authStore.businessId).toBe('business-123')
      expect(authStore.isLoading).toBe(false)
      expect(authStore.isAuthenticated).toBe(true)
    })

    it('should compute isAuthenticated correctly', () => {
      expect(authStore.isAuthenticated).toBe(false)
      
      authStore.setUser({ id: 1 })
      expect(authStore.isAuthenticated).toBe(true)
      
      authStore.clearAuth()
      expect(authStore.isAuthenticated).toBe(false)
    })
  })
})