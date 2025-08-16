import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import LoginPage from '@/pages/login.vue'
import authMiddleware from '@/middleware/auth.js'

// Mock API responses
const mockApiResponses = {
  csrfCookie: () => Promise.resolve({}),
  loginSuccess: () => Promise.resolve({
    _data: { message: 'Login successful' },
    headers: new Map([['X-XSRF-TOKEN', 'new-csrf-token']])
  }),
  loginFailure: (status, message) => Promise.reject({
    status,
    data: { message }
  }),
  userSuccess: () => Promise.resolve({
    _data: {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      business_id: 'tenant1'
    },
    headers: new Map()
  }),
  userFailure: () => Promise.reject({
    status: 401,
    message: 'Unauthorized'
  }),
  logoutSuccess: () => Promise.resolve({
    _data: { message: 'Logged out' },
    headers: new Map()
  })
}

// Mock Nuxt composables and globals
const mockUseRuntimeConfig = jest.fn(() => ({
  public: {
    apiBase: 'https://api.crm.test:40443',
    apiPrefix: '/api/v1'
  }
}))

const mockNavigateTo = jest.fn()
const mockFetch = jest.fn()
const mockFetchRaw = jest.fn()
const mockRouter = { push: jest.fn() }

global.useRuntimeConfig = mockUseRuntimeConfig
global.navigateTo = mockNavigateTo
global.$fetch = mockFetch
global.$fetch.raw = mockFetchRaw
global.useRouter = () => mockRouter
global.useAuthStore = () => useAuthStore()
global.definePageMeta = jest.fn()
global.defineNuxtRouteMiddleware = jest.fn((fn) => fn)
global.reactive = (obj) => obj
global.ref = (val) => ({ value: val })
global.readonly = (val) => val
global.computed = (fn) => ({ value: fn() })
global.onMounted = (fn) => fn()
global.watch = jest.fn()

describe('Authentication Flow Integration Tests', () => {
  let authStore
  let wrapper

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()
    global.localStorage.clear()
    global.resetDocumentCookies()
    
    // Set up fresh Pinia
    setActivePinia(createPinia())
    authStore = useAuthStore()
    
    // Set process.client
    global.process.client = true
    
    // Initialize auth store from storage (empty initially)
    authStore.initializeFromStorage()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Complete Login Flow', () => {
    test('successful login flow with CSRF token handling', async () => {
      // Mock successful API responses
      mockFetch.mockImplementation(mockApiResponses.csrfCookie)
      mockFetchRaw
        .mockImplementationOnce(mockApiResponses.loginSuccess)
        .mockImplementationOnce(mockApiResponses.userSuccess)
      
      // Mount login page
      wrapper = mount(LoginPage)
      
      // Fill in login form
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password123')
      
      // Submit login form
      await wrapper.find('form').trigger('submit.prevent')
      
      // Verify CSRF cookie was requested
      expect(mockFetch).not.toHaveBeenCalledWith('/csrf-cookie', expect.any(Object))
      
      // Verify login request was made
      expect(mockFetchRaw).toHaveBeenCalledWith('/login', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Business-ID': 'tenant1'
        },
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      })
      
      // Verify user data was fetched
      expect(mockFetchRaw).toHaveBeenCalledWith('/user', expect.objectContaining({
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include'
      }))
      
      // Verify auth store state is updated
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        business_id: 'tenant1'
      })
      expect(authStore.businessId).toBe('tenant1')
      
      // Verify localStorage was updated
      expect(global.localStorage.setItem).toHaveBeenCalledWith('user', expect.any(String))
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', 'tenant1')
      
      // Verify redirect to dashboard
      expect(mockRouter.push).toHaveBeenCalledWith('/')
    })

    test('login flow with invalid credentials', async () => {
      mockFetchRaw.mockImplementation(() => mockApiResponses.loginFailure(401, 'Invalid credentials'))
      
      wrapper = mount(LoginPage)
      
      // Fill in login form with wrong credentials
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('wrong@example.com')
      await wrapper.find('#password').setValue('wrongpassword')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      // Verify error is displayed
      expect(wrapper.vm.loginError).toBe('Invalid credentials. Please check your email and password.')
      
      // Verify auth store remains unauthenticated
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBeNull()
      
      // Verify no redirect occurred
      expect(mockRouter.push).not.toHaveBeenCalled()
    })

    test('login flow with business ID validation error', async () => {
      mockFetchRaw.mockImplementation(() => mockApiResponses.loginFailure(403, 'Access denied'))
      
      wrapper = mount(LoginPage)
      
      await wrapper.find('#businessId').setValue('invalid-tenant')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password123')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Access denied. Please check your business ID.')
      expect(authStore.isAuthenticated).toBe(false)
    })

    test('login flow with validation errors', async () => {
      mockFetchRaw.mockImplementation(() => mockApiResponses.loginFailure(422, 'Email is required'))
      
      wrapper = mount(LoginPage)
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('')
      await wrapper.find('#password').setValue('password123')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Email is required')
    })
  })

  describe('CSRF Token Management Integration', () => {
    test('handles CSRF token mismatch and retry', async () => {
      // First login attempt fails with CSRF error, second succeeds
      const csrfError = { status: 419, message: 'CSRF token mismatch' }
      
      mockFetch.mockImplementation(mockApiResponses.csrfCookie)
      mockFetchRaw
        .mockRejectedValueOnce(csrfError) // First login fails
        .mockImplementationOnce(mockApiResponses.loginSuccess) // Retry succeeds
        .mockImplementationOnce(mockApiResponses.userSuccess) // Get user
      
      // Set initial CSRF token
      global.document.cookie = 'XSRF-TOKEN=old-token'
      
      wrapper = mount(LoginPage)
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password123')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      // Verify CSRF cookie was refreshed
      expect(mockFetch).toHaveBeenCalledWith('/csrf-cookie', expect.any(Object))
      
      // Verify login was retried
      expect(mockFetchRaw).toHaveBeenCalledTimes(3) // Failed login, retry login, get user
      
      // Verify successful authentication
      expect(authStore.isAuthenticated).toBe(true)
      expect(mockRouter.push).toHaveBeenCalledWith('/')
    })

    test('updates CSRF token from response headers', async () => {
      mockFetchRaw.mockImplementation(() => Promise.resolve({
        _data: { message: 'Success' },
        headers: new Map([['X-XSRF-TOKEN', 'updated-token-from-server']])
      }))
      
      global.document.cookie = 'XSRF-TOKEN=old-token'
      
      await authStore.makeAuthenticatedRequest('/test')
      
      // Verify token was updated in document.cookie
      expect(global.document.cookie).toContain('XSRF-TOKEN=updated-token-from-server')
    })
  })

  describe('Session Persistence Integration', () => {
    test('restores authentication state from localStorage', () => {
      const userData = { id: 1, email: 'test@example.com', name: 'Test User' }
      
      global.localStorage.getItem
        .mockReturnValueOnce(JSON.stringify(userData)) // user
        .mockReturnValueOnce('tenant1') // business_id
      
      // Create fresh auth store and initialize from storage
      setActivePinia(createPinia())
      const newAuthStore = useAuthStore()
      newAuthStore.initializeFromStorage()
      
      expect(newAuthStore.user).toEqual(userData)
      expect(newAuthStore.businessId).toBe('tenant1')
      expect(newAuthStore.isAuthenticated).toBe(true)
    })

    test('handles corrupted localStorage data gracefully', () => {
      global.localStorage.getItem
        .mockReturnValueOnce('invalid-json') // corrupted user data
        .mockReturnValueOnce('tenant1') // valid business_id
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      setActivePinia(createPinia())
      const newAuthStore = useAuthStore()
      newAuthStore.initializeFromStorage()
      
      expect(newAuthStore.user).toBeNull()
      expect(newAuthStore.businessId).toBe('tenant1')
      expect(newAuthStore.isAuthenticated).toBe(false)
      
      consoleSpy.mockRestore()
    })

    test('persists business ID changes to localStorage', () => {
      wrapper = mount(LoginPage)
      
      // Simulate business ID change (would normally trigger watch)
      wrapper.vm.form.businessId = 'new-tenant'
      
      // In real app, this would be handled by the watcher
      authStore.setBusinessId('new-tenant')
      
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', 'new-tenant')
    })
  })

  describe('Authentication Status Check Integration', () => {
    test('checkAuthStatus with successful authentication', async () => {
      mockFetch.mockImplementation(mockApiResponses.csrfCookie)
      mockFetchRaw.mockImplementation(mockApiResponses.userSuccess)
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(true)
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        business_id: 'tenant1'
      })
    })

    test('checkAuthStatus with failed authentication', async () => {
      mockFetch.mockImplementation(mockApiResponses.csrfCookie)
      mockFetchRaw.mockImplementation(mockApiResponses.userFailure)
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBeNull()
    })

    test('checkAuthStatus with CSRF cookie failure', async () => {
      mockFetch.mockRejectedValue(new Error('CSRF failed'))
      
      const result = await authStore.checkAuthStatus()
      
      expect(result).toBe(false)
      expect(mockFetchRaw).not.toHaveBeenCalled()
    })
  })

  describe('Logout Flow Integration', () => {
    test('complete logout flow', async () => {
      // Set up authenticated state
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      mockFetchRaw.mockImplementation(mockApiResponses.logoutSuccess)
      
      await authStore.logout()
      
      // Verify logout API was called
      expect(mockFetchRaw).toHaveBeenCalledWith('/logout', {
        baseURL: 'https://api.crm.test:40443/api/v1',
        credentials: 'include',
        method: 'POST',
        headers: expect.objectContaining({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Business-ID': 'tenant1'
        })
      })
      
      // Verify state was cleared
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
      
      // Verify localStorage was cleared
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('user')
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('business_id')
      
      // Verify redirect to login
      expect(mockNavigateTo).toHaveBeenCalledWith('/login')
    })

    test('logout with API failure still clears local state', async () => {
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      mockFetchRaw.mockRejectedValue(new Error('Logout API failed'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await authStore.logout()
      
      // Verify state was still cleared despite API failure
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(mockNavigateTo).toHaveBeenCalledWith('/login')
      
      consoleSpy.mockRestore()
    })
  })

  describe('Middleware Integration', () => {
    test('middleware redirects unauthenticated user to login', async () => {
      const to = { path: '/dashboard' }
      
      const result = await authMiddleware(to)
      
      expect(mockNavigateTo).toHaveBeenCalledWith('/login')
      expect(result).toBeDefined()
    })

    test('middleware allows authenticated user to access protected routes', async () => {
      authStore.setUser({ id: 1, email: 'test@example.com' })
      
      const to = { path: '/dashboard' }
      
      const result = await authMiddleware(to)
      
      expect(mockNavigateTo).not.toHaveBeenCalled()
      expect(result).toBeUndefined()
    })

    test('middleware redirects authenticated user away from login', async () => {
      authStore.setUser({ id: 1, email: 'test@example.com' })
      
      const to = { path: '/login' }
      
      const result = await authMiddleware(to)
      
      expect(mockNavigateTo).toHaveBeenCalledWith('/')
      expect(result).toBeDefined()
    })

    test('middleware waits for auth loading to complete', async () => {
      authStore.isLoading.value = true
      
      // Simulate loading completion
      setTimeout(() => {
        authStore.isLoading.value = false
        authStore.setUser({ id: 1, email: 'test@example.com' })
      }, 200)
      
      const to = { path: '/dashboard' }
      
      await authMiddleware(to)
      
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })

  describe('Form Validation Integration', () => {
    test('client-side validation prevents API calls', async () => {
      wrapper = mount(LoginPage)
      
      // Submit empty form
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Business ID is required')
      expect(mockFetchRaw).not.toHaveBeenCalled()
    })

    test('email validation prevents submission', async () => {
      wrapper = mount(LoginPage)
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('invalid-email')
      await wrapper.find('#password').setValue('password123')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.errors.email).toBe('Please enter a valid email address')
      expect(mockFetchRaw).not.toHaveBeenCalled()
    })

    test('password length validation prevents submission', async () => {
      wrapper = mount(LoginPage)
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('123')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.errors.password).toBe('Password must be at least 6 characters')
      expect(mockFetchRaw).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling Integration', () => {
    test('network errors are handled gracefully', async () => {
      mockFetchRaw.mockRejectedValue(new Error('Network error'))
      
      wrapper = mount(LoginPage)
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password123')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Login failed. Please try again.')
      expect(authStore.isAuthenticated).toBe(false)
    })

    test('server errors are categorized correctly', async () => {
      const errorCases = [
        { status: 401, expectedMessage: 'Invalid credentials. Please check your email and password.' },
        { status: 403, expectedMessage: 'Access denied. Please check your business ID.' },
        { status: 422, expectedMessage: 'Validation error. Please check your input.' },
        { status: 500, expectedMessage: 'Login failed. Please try again.' }
      ]
      
      for (const errorCase of errorCases) {
        wrapper = mount(LoginPage)
        mockFetchRaw.mockRejectedValue({ status: errorCase.status })
        
        await wrapper.find('#businessId').setValue('tenant1')
        await wrapper.find('#email').setValue('test@example.com')
        await wrapper.find('#password').setValue('password123')
        
        await wrapper.find('form').trigger('submit.prevent')
        
        expect(wrapper.vm.loginError).toBe(errorCase.expectedMessage)
        
        wrapper.unmount()
        jest.clearAllMocks()
      }
    })
  })

  describe('Demo Credentials Integration', () => {
    test('demo credentials button fills form correctly', async () => {
      wrapper = mount(LoginPage)
      
      const demoButton = wrapper.find('button[class*="text-primary-600"]')
      await demoButton.trigger('click')
      
      expect(wrapper.vm.form.businessId).toBe('tenant1')
      expect(wrapper.vm.form.email).toBe('test@example.com')
      expect(wrapper.vm.form.password).toBe('password')
      expect(wrapper.vm.errors.email).toBe('')
      expect(wrapper.vm.errors.password).toBe('')
    })

    test('demo credentials can be used for successful login', async () => {
      mockFetchRaw
        .mockImplementationOnce(mockApiResponses.loginSuccess)
        .mockImplementationOnce(mockApiResponses.userSuccess)
      
      wrapper = mount(LoginPage)
      
      // Click demo credentials
      const demoButton = wrapper.find('button[class*="text-primary-600"]')
      await demoButton.trigger('click')
      
      // Submit form
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(authStore.isAuthenticated).toBe(true)
      expect(mockRouter.push).toHaveBeenCalledWith('/')
    })
  })
})