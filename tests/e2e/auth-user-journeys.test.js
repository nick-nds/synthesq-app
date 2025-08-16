import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import LoginPage from '@/pages/login.vue'
import authMiddleware from '@/middleware/auth.js'

// Mock full application context for E2E-style tests
const createMockApp = () => {
  const mockRouter = {
    push: jest.fn().mockResolvedValue(),
    currentRoute: { value: { path: '/' } }
  }
  
  const mockApiClient = {
    csrfCookie: jest.fn(),
    login: jest.fn(),
    getUser: jest.fn(),
    logout: jest.fn()
  }
  
  return { mockRouter, mockApiClient }
}

// Comprehensive API response mocks
const createApiMocks = () => ({
  successfulAuth: {
    csrfCookie: () => Promise.resolve({}),
    login: () => Promise.resolve({
      _data: { message: 'Login successful', token: 'mock-session-token' },
      headers: new Map([
        ['X-XSRF-TOKEN', 'new-csrf-token-after-login'],
        ['Set-Cookie', 'laravel_session=abc123; XSRF-TOKEN=new-csrf-token-after-login']
      ])
    }),
    getUser: () => Promise.resolve({
      _data: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        business_id: 'tenant1',
        roles: ['user'],
        permissions: ['read:dashboard', 'read:customers']
      },
      headers: new Map()
    }),
    logout: () => Promise.resolve({
      _data: { message: 'Successfully logged out' },
      headers: new Map()
    })
  },
  
  failedAuth: {
    invalidCredentials: () => Promise.reject({
      status: 401,
      data: { message: 'The provided credentials are incorrect.' }
    }),
    invalidBusinessId: () => Promise.reject({
      status: 403,
      data: { message: 'Access denied for this business.' }
    }),
    accountLocked: () => Promise.reject({
      status: 423,
      data: { message: 'Account is temporarily locked due to too many failed attempts.' }
    }),
    serverError: () => Promise.reject({
      status: 500,
      data: { message: 'Internal server error' }
    }),
    networkError: () => Promise.reject(new Error('Network Error'))
  },
  
  sessionExpired: {
    expiredSession: () => Promise.reject({
      status: 401,
      data: { message: 'Session has expired' }
    })
  }
})

// Mock Nuxt environment
const setupNuxtMocks = (mockRouter, apiMocks) => {
  global.useRuntimeConfig = jest.fn(() => ({
    public: {
      apiBase: 'https://api.crm.test:40443',
      apiPrefix: '/api/v1'
    }
  }))
  
  global.navigateTo = jest.fn().mockImplementation((path) => {
    mockRouter.currentRoute.value.path = path
    return Promise.resolve()
  })
  
  global.$fetch = jest.fn()
  global.$fetch.raw = jest.fn()
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
}

describe('Authentication User Journeys (E2E-style)', () => {
  let authStore
  let mockApp
  let apiMocks
  
  beforeEach(() => {
    // Clear all mocks and state
    jest.clearAllMocks()
    global.localStorage.clear()
    global.resetDocumentCookies()
    
    // Set up application context
    mockApp = createMockApp()
    apiMocks = createApiMocks()
    setupNuxtMocks(mockApp.mockRouter, apiMocks)
    
    // Set up fresh Pinia
    setActivePinia(createPinia())
    authStore = useAuthStore()
    
    global.process.client = true
    authStore.initializeFromStorage()
  })

  describe('Happy Path: Complete User Login Journey', () => {
    test('user successfully logs in with demo credentials and accesses dashboard', async () => {
      // Setup API mocks for successful flow
      global.$fetch.mockImplementation(apiMocks.successfulAuth.csrfCookie)
      global.$fetch.raw
        .mockImplementationOnce(apiMocks.successfulAuth.login)
        .mockImplementationOnce(apiMocks.successfulAuth.getUser)
      
      // Step 1: User navigates to login page
      const wrapper = mount(LoginPage)
      expect(wrapper.find('h2').text()).toContain('Sign in to your account')
      
      // Step 2: User clicks demo credentials to auto-fill
      const demoButton = wrapper.find('button[class*="text-primary-600"]')
      await demoButton.trigger('click')
      
      expect(wrapper.vm.form.businessId).toBe('tenant1')
      expect(wrapper.vm.form.email).toBe('test@example.com')
      expect(wrapper.vm.form.password).toBe('password')
      
      // Step 3: User submits login form
      await wrapper.find('form').trigger('submit.prevent')
      
      // Step 4: Verify authentication flow completed successfully
      expect(global.$fetch.raw).toHaveBeenCalledWith('/login', expect.objectContaining({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password'
        },
        headers: expect.objectContaining({
          'X-Business-ID': 'tenant1'
        })
      }))
      
      // Step 5: Verify user data was fetched and stored
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        business_id: 'tenant1',
        roles: ['user'],
        permissions: ['read:dashboard', 'read:customers']
      })
      expect(authStore.businessId).toBe('tenant1')
      
      // Step 6: Verify localStorage persistence
      expect(global.localStorage.setItem).toHaveBeenCalledWith('user', expect.stringContaining('test@example.com'))
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', 'tenant1')
      
      // Step 7: Verify redirect to dashboard
      expect(mockApp.mockRouter.push).toHaveBeenCalledWith('/')
      
      wrapper.unmount()
    })

    test('authenticated user is automatically redirected from login page', async () => {
      // Step 1: Set up authenticated state (user returning to app)
      authStore.setUser({
        id: 1,
        email: 'test@example.com',
        name: 'Test User'
      })
      authStore.setBusinessId('tenant1')
      
      // Step 2: User tries to navigate to login page (maybe from bookmark)
      const to = { path: '/login' }
      const result = await authMiddleware(to)
      
      // Step 3: Verify automatic redirect to dashboard
      expect(global.navigateTo).toHaveBeenCalledWith('/')
      expect(result).toBeDefined() // Indicates navigation occurred
    })

    test('user session persists across page reloads', async () => {
      // Step 1: Simulate existing authenticated session in localStorage
      const userData = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        business_id: 'tenant1'
      }
      
      global.localStorage.getItem
        .mockReturnValueOnce(JSON.stringify(userData))
        .mockReturnValueOnce('tenant1')
      
      // Step 2: Simulate page reload - create fresh auth store
      setActivePinia(createPinia())
      const freshAuthStore = useAuthStore()
      freshAuthStore.initializeFromStorage()
      
      // Step 3: Verify session was restored
      expect(freshAuthStore.isAuthenticated).toBe(true)
      expect(freshAuthStore.user).toEqual(userData)
      expect(freshAuthStore.businessId).toBe('tenant1')
      
      // Step 4: Verify user can access protected routes without re-authentication
      const to = { path: '/dashboard' }
      const result = await authMiddleware(to)
      
      expect(global.navigateTo).not.toHaveBeenCalled()
      expect(result).toBeUndefined() // No navigation needed
    })
  })

  describe('Error Scenarios: Invalid Credentials Journey', () => {
    test('user receives clear feedback for wrong password', async () => {
      global.$fetch.raw.mockImplementation(apiMocks.failedAuth.invalidCredentials)
      
      // Step 1: User fills form with wrong password
      const wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('wrongpassword')
      
      // Step 2: User submits form
      await wrapper.find('form').trigger('submit.prevent')
      
      // Step 3: Verify clear error message is shown
      expect(wrapper.vm.loginError).toBe('Invalid credentials. Please check your email and password.')
      
      // Step 4: Verify user remains unauthenticated
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBeNull()
      
      // Step 5: Verify no redirect occurred
      expect(mockApp.mockRouter.push).not.toHaveBeenCalled()
      
      // Step 6: Verify error state is displayed in UI
      const errorPanel = wrapper.find('div[class*="bg-error-50"]')
      expect(errorPanel.exists()).toBe(true)
      expect(errorPanel.text()).toContain('Login Failed')
      
      wrapper.unmount()
    })

    test('user receives specific feedback for invalid business ID', async () => {
      global.$fetch.raw.mockImplementation(apiMocks.failedAuth.invalidBusinessId)
      
      const wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('invalid-tenant')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Access denied. Please check your business ID.')
      expect(authStore.isAuthenticated).toBe(false)
      
      wrapper.unmount()
    })

    test('user can retry login after fixing errors', async () => {
      const wrapper = mount(LoginPage)
      
      // Step 1: First attempt with wrong credentials
      global.$fetch.raw.mockImplementationOnce(apiMocks.failedAuth.invalidCredentials)
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('wrong@example.com')
      await wrapper.find('#password').setValue('wrongpass')
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBeTruthy()
      expect(authStore.isAuthenticated).toBe(false)
      
      // Step 2: User corrects credentials
      global.$fetch.raw
        .mockImplementationOnce(apiMocks.successfulAuth.login)
        .mockImplementationOnce(apiMocks.successfulAuth.getUser)
      
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      
      // Step 3: Second attempt succeeds
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(authStore.isAuthenticated).toBe(true)
      expect(mockApp.mockRouter.push).toHaveBeenCalledWith('/')
      
      wrapper.unmount()
    })
  })

  describe('Network Issues and Recovery Journey', () => {
    test('user experiences network error and can retry', async () => {
      const wrapper = mount(LoginPage)
      
      // Step 1: Network error on first attempt
      global.$fetch.raw.mockRejectedValueOnce(apiMocks.failedAuth.networkError())
      
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Login failed. Please try again.')
      
      // Step 2: Network recovers, retry succeeds
      global.$fetch.raw
        .mockImplementationOnce(apiMocks.successfulAuth.login)
        .mockImplementationOnce(apiMocks.successfulAuth.getUser)
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(authStore.isAuthenticated).toBe(true)
      expect(wrapper.vm.loginError).toBe('')
      
      wrapper.unmount()
    })

    test('CSRF token mismatch is handled transparently', async () => {
      // Step 1: Simulate CSRF token mismatch
      const csrfError = { status: 419, message: 'CSRF token mismatch' }
      
      global.$fetch.mockImplementation(apiMocks.successfulAuth.csrfCookie)
      global.$fetch.raw
        .mockRejectedValueOnce(csrfError) // First login fails with CSRF error
        .mockImplementationOnce(apiMocks.successfulAuth.login) // Retry succeeds
        .mockImplementationOnce(apiMocks.successfulAuth.getUser)
      
      // Set old CSRF token
      global.document.cookie = 'XSRF-TOKEN=expired-token'
      
      const wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      
      // Step 2: Login automatically handles CSRF refresh and retry
      await wrapper.find('form').trigger('submit.prevent')
      
      // Step 3: Verify CSRF token was refreshed
      expect(global.$fetch).toHaveBeenCalledWith('/csrf-cookie', expect.any(Object))
      
      // Step 4: Verify login eventually succeeded
      expect(authStore.isAuthenticated).toBe(true)
      expect(wrapper.vm.loginError).toBe('')
      
      wrapper.unmount()
    })
  })

  describe('Session Management Journey', () => {
    test('user session expires and is redirected to login', async () => {
      // Step 1: Set up authenticated user
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      // Step 2: Simulate session expiration during API call
      global.$fetch.raw.mockImplementation(apiMocks.sessionExpired.expiredSession)
      
      // Step 3: User tries to make authenticated request
      try {
        await authStore.getCurrentUser()
      } catch (error) {
        // Expected to fail with 401
      }
      
      // Step 4: Check authentication status (simulates app-level check)
      const isAuthenticated = await authStore.checkAuthStatus()
      
      expect(isAuthenticated).toBe(false)
      expect(authStore.user).toBeNull()
    })

    test('user logs out successfully and is redirected', async () => {
      // Step 1: Set up authenticated user
      authStore.setUser({ id: 1, email: 'test@example.com' })
      authStore.setBusinessId('tenant1')
      
      global.$fetch.raw.mockImplementation(apiMocks.successfulAuth.logout)
      
      // Step 2: User initiates logout
      await authStore.logout()
      
      // Step 3: Verify logout API was called
      expect(global.$fetch.raw).toHaveBeenCalledWith('/logout', expect.objectContaining({
        method: 'POST'
      }))
      
      // Step 4: Verify complete state cleanup
      expect(authStore.user).toBeNull()
      expect(authStore.businessId).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
      
      // Step 5: Verify localStorage was cleared
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('user')
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('business_id')
      
      // Step 6: Verify redirect to login
      expect(global.navigateTo).toHaveBeenCalledWith('/login')
    })

    test('business ID is remembered for future logins', async () => {
      // Step 1: User logs in with specific business ID
      global.$fetch.raw
        .mockImplementationOnce(apiMocks.successfulAuth.login)
        .mockImplementationOnce(apiMocks.successfulAuth.getUser)
      
      const wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('custom-tenant')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', 'custom-tenant')
      
      wrapper.unmount()
      
      // Step 2: Simulate user returning to login page later
      global.localStorage.getItem.mockReturnValue('custom-tenant')
      
      const newWrapper = mount(LoginPage)
      
      // Step 3: Verify business ID is pre-populated
      expect(newWrapper.vm.form.businessId).toBe('custom-tenant')
      
      newWrapper.unmount()
    })
  })

  describe('Form Interaction Journey', () => {
    test('user can toggle password visibility', async () => {
      const wrapper = mount(LoginPage)
      
      // Step 1: Password is initially hidden
      const passwordInput = wrapper.find('#password')
      expect(passwordInput.attributes('type')).toBe('password')
      expect(wrapper.vm.showPassword).toBe(false)
      
      // Step 2: User clicks eye icon to show password
      const toggleButton = wrapper.find('button[type="button"]')
      await toggleButton.trigger('click')
      
      expect(wrapper.vm.showPassword).toBe(true)
      
      // Step 3: User clicks again to hide password
      await toggleButton.trigger('click')
      
      expect(wrapper.vm.showPassword).toBe(false)
      
      wrapper.unmount()
    })

    test('user can check remember me option', async () => {
      const wrapper = mount(LoginPage)
      
      // Step 1: Remember me is initially unchecked
      expect(wrapper.vm.form.remember).toBe(false)
      
      // Step 2: User checks remember me
      const rememberCheckbox = wrapper.find('#remember-me')
      await rememberCheckbox.setChecked(true)
      
      expect(wrapper.vm.form.remember).toBe(true)
      
      wrapper.unmount()
    })

    test('form validation provides immediate feedback', async () => {
      const wrapper = mount(LoginPage)
      
      // Step 1: User tries to submit empty form
      await wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.loginError).toBe('Business ID is required')
      
      // Step 2: User fills business ID but leaves email empty
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.errors.email).toBe('Email is required')
      
      // Step 3: User enters invalid email
      await wrapper.find('#email').setValue('invalid-email')
      await wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.errors.email).toBe('Please enter a valid email address')
      
      // Step 4: User enters valid email but short password
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('123')
      await wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.errors.password).toBe('Password must be at least 6 characters')
      
      wrapper.unmount()
    })
  })

  describe('Multi-Tenant Journey', () => {
    test('user switches between different tenants', async () => {
      // Step 1: Login to first tenant
      global.$fetch.raw
        .mockImplementationOnce(apiMocks.successfulAuth.login)
        .mockImplementationOnce(() => Promise.resolve({
          _data: { id: 1, email: 'test@example.com', business_id: 'tenant1' },
          headers: new Map()
        }))
      
      let wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(authStore.businessId).toBe('tenant1')
      wrapper.unmount()
      
      // Step 2: User logs out
      await authStore.logout()
      
      // Step 3: User logs into different tenant
      global.$fetch.raw
        .mockImplementationOnce(apiMocks.successfulAuth.login)
        .mockImplementationOnce(() => Promise.resolve({
          _data: { id: 2, email: 'test@example.com', business_id: 'tenant2' },
          headers: new Map()
        }))
      
      wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('tenant2')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(authStore.businessId).toBe('tenant2')
      expect(authStore.user.business_id).toBe('tenant2')
      
      wrapper.unmount()
    })
  })

  describe('Accessibility and UX Journey', () => {
    test('loading states provide clear feedback', async () => {
      let resolveLogin
      global.$fetch.raw.mockReturnValue(new Promise(resolve => {
        resolveLogin = resolve
      }))
      
      const wrapper = mount(LoginPage)
      
      // Step 1: User submits form
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password')
      
      expect(wrapper.vm.loading).toBe(false)
      
      // Step 2: Form submission starts loading
      const submitPromise = wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.loading).toBe(true)
      
      // Step 3: Verify loading UI
      await wrapper.vm.$nextTick()
      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.text()).toContain('Signing in...')
      expect(submitButton.attributes('disabled')).toBeDefined()
      
      // Step 4: Complete the request
      resolveLogin({ _data: {}, headers: new Map() })
      await submitPromise
      
      expect(wrapper.vm.loading).toBe(false)
      
      wrapper.unmount()
    })

    test('error messages are clearly displayed and accessible', async () => {
      global.$fetch.raw.mockImplementation(apiMocks.failedAuth.invalidCredentials)
      
      const wrapper = mount(LoginPage)
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('wrong@example.com')
      await wrapper.find('#password').setValue('wrongpass')
      await wrapper.find('form').trigger('submit.prevent')
      
      // Verify error panel exists and is accessible
      const errorPanel = wrapper.find('div[class*="bg-error-50"]')
      expect(errorPanel.exists()).toBe(true)
      expect(errorPanel.find('h3').text()).toBe('Login Failed')
      expect(errorPanel.find('p').text()).toContain('Invalid credentials')
      
      // Verify error icon is present
      expect(errorPanel.find('svg').exists()).toBe(true)
      
      wrapper.unmount()
    })
  })
})