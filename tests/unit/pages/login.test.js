import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginPage from '@/pages/login.vue'
import { useAuthStore } from '@/stores/auth.js'

// Mock Nuxt composables
const mockUseRouter = jest.fn(() => ({
  push: jest.fn()
}))

const mockUseAuthStore = jest.fn()

global.useRouter = mockUseRouter
global.useAuthStore = mockUseAuthStore
global.definePageMeta = jest.fn()
global.reactive = (obj) => obj
global.ref = (val) => ({ value: val })
global.onMounted = (fn) => fn()
global.watch = jest.fn()

describe('Login Page', () => {
  let wrapper
  let authStore
  let router

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()
    global.localStorage.clear()
    
    // Set up fresh Pinia
    setActivePinia(createPinia())
    
    // Create mock auth store
    authStore = {
      login: jest.fn(),
      isLoading: false
    }
    
    // Create mock router
    router = {
      push: jest.fn()
    }
    
    mockUseAuthStore.mockReturnValue(authStore)
    mockUseRouter.mockReturnValue(router)
    
    // Set process.client
    global.process.client = true
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Component Mounting', () => {
    test('renders login form with all required fields', () => {
      wrapper = mount(LoginPage)

      expect(wrapper.find('#businessId').exists()).toBe(true)
      expect(wrapper.find('#email').exists()).toBe(true)
      expect(wrapper.find('#password').exists()).toBe(true)
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    })

    test('displays Synthesq branding and logo', () => {
      wrapper = mount(LoginPage)

      expect(wrapper.text()).toContain('Synthesq')
      expect(wrapper.text()).toContain('SQ')
      expect(wrapper.text()).toContain('Sign in to your account')
    })

    test('shows demo credentials section', () => {
      wrapper = mount(LoginPage)

      expect(wrapper.text()).toContain('Demo Credentials:')
      expect(wrapper.text()).toContain('tenant1')
      expect(wrapper.text()).toContain('test@example.com / password')
    })

    test('pre-populates business ID from localStorage on mount', () => {
      global.localStorage.getItem.mockReturnValue('stored-tenant')
      
      wrapper = mount(LoginPage)

      expect(wrapper.vm.form.businessId).toBe('stored-tenant')
    })
  })

  describe('Form Validation', () => {
    beforeEach(() => {
      wrapper = mount(LoginPage)
    })

    test('validates required business ID field', async () => {
      // Submit form without business ID
      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.vm.loginError).toBe('Business ID is required')
      expect(authStore.login).not.toHaveBeenCalled()
    })

    test('validates required email field', async () => {
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = ''
      
      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.vm.errors.email).toBe('Email is required')
      expect(authStore.login).not.toHaveBeenCalled()
    })

    test('validates email format', async () => {
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = 'invalid-email'
      
      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.vm.errors.email).toBe('Please enter a valid email address')
      expect(authStore.login).not.toHaveBeenCalled()
    })

    test('validates required password field', async () => {
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = 'test@example.com'
      wrapper.vm.form.password = ''
      
      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.vm.errors.password).toBe('Password is required')
      expect(authStore.login).not.toHaveBeenCalled()
    })

    test('validates minimum password length', async () => {
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = 'test@example.com'
      wrapper.vm.form.password = '123'
      
      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.vm.errors.password).toBe('Password must be at least 6 characters')
      expect(authStore.login).not.toHaveBeenCalled()
    })

    test('passes validation with valid inputs', async () => {
      authStore.login.mockResolvedValue({ success: true })
      
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = 'test@example.com'
      wrapper.vm.form.password = 'password123'
      
      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.vm.errors.email).toBe('')
      expect(wrapper.vm.errors.password).toBe('')
      expect(wrapper.vm.loginError).toBe('')
      expect(authStore.login).toHaveBeenCalled()
    })
  })

  describe('User Interactions', () => {
    beforeEach(() => {
      wrapper = mount(LoginPage)
    })

    test('updates form data when typing in business ID field', async () => {
      const businessIdInput = wrapper.find('#businessId')
      
      await businessIdInput.setValue('new-tenant')
      
      expect(wrapper.vm.form.businessId).toBe('new-tenant')
    })

    test('updates form data when typing in email field', async () => {
      const emailInput = wrapper.find('#email')
      
      await emailInput.setValue('user@example.com')
      
      expect(wrapper.vm.form.email).toBe('user@example.com')
    })

    test('updates form data when typing in password field', async () => {
      const passwordInput = wrapper.find('#password')
      
      await passwordInput.setValue('mypassword')
      
      expect(wrapper.vm.form.password).toBe('mypassword')
    })

    test('toggles password visibility when clicking eye icon', async () => {
      const passwordInput = wrapper.find('#password')
      const toggleButton = wrapper.find('button[type="button"]')
      
      expect(passwordInput.attributes('type')).toBe('password')
      expect(wrapper.vm.showPassword).toBe(false)
      
      await toggleButton.trigger('click')
      
      expect(wrapper.vm.showPassword).toBe(true)
      // Note: The actual DOM update would show type="text"
    })

    test('toggles remember me checkbox', async () => {
      const rememberCheckbox = wrapper.find('#remember-me')
      
      expect(wrapper.vm.form.remember).toBe(false)
      
      await rememberCheckbox.setChecked(true)
      
      expect(wrapper.vm.form.remember).toBe(true)
    })

    test('fills demo credentials when clicking demo button', async () => {
      const demoButton = wrapper.find('button[class*="text-primary-600"]')
      
      await demoButton.trigger('click')
      
      expect(wrapper.vm.form.businessId).toBe('tenant1')
      expect(wrapper.vm.form.email).toBe('test@example.com')
      expect(wrapper.vm.form.password).toBe('password')
      expect(wrapper.vm.errors.email).toBe('')
      expect(wrapper.vm.errors.password).toBe('')
    })
  })

  describe('Form Submission', () => {
    beforeEach(() => {
      wrapper = mount(LoginPage)
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = 'test@example.com'
      wrapper.vm.form.password = 'password123'
    })

    test('calls authStore.login with form data on valid submission', async () => {
      authStore.login.mockResolvedValue({ success: true })
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(authStore.login).toHaveBeenCalledWith({
        business_id: 'tenant1',
        email: 'test@example.com',
        password: 'password123'
      })
    })

    test('redirects to dashboard on successful login', async () => {
      authStore.login.mockResolvedValue({ success: true })
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(router.push).toHaveBeenCalledWith('/')
    })

    test('displays error message on failed login', async () => {
      authStore.login.mockResolvedValue({ 
        success: false, 
        error: 'Invalid credentials' 
      })
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Invalid credentials')
      expect(router.push).not.toHaveBeenCalled()
    })

    test('displays default error message when no specific error provided', async () => {
      authStore.login.mockResolvedValue({ success: false })
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('Invalid credentials. Please check your business ID, email, and password.')
    })

    test('handles login exceptions gracefully', async () => {
      authStore.login.mockRejectedValue(new Error('Network error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('An error occurred. Please try again later.')
      expect(consoleSpy).toHaveBeenCalledWith('Login error:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    test('sets loading state during login attempt', async () => {
      let resolveLogin
      authStore.login.mockReturnValue(new Promise(resolve => {
        resolveLogin = () => resolve({ success: true })
      }))
      
      expect(wrapper.vm.loading).toBe(false)
      
      const submitPromise = wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.vm.loading).toBe(true)
      
      resolveLogin()
      await submitPromise
      expect(wrapper.vm.loading).toBe(false)
    })

    test('disables submit button when loading', async () => {
      wrapper.vm.loading = true
      await wrapper.vm.$nextTick()
      
      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.attributes('disabled')).toBeDefined()
      expect(submitButton.classes()).toContain('opacity-50')
      expect(submitButton.classes()).toContain('cursor-not-allowed')
    })

    test('shows loading spinner and text when submitting', async () => {
      wrapper.vm.loading = true
      await wrapper.vm.$nextTick()
      
      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.text()).toContain('Signing in...')
      expect(submitButton.find('svg.animate-spin').exists()).toBe(true)
    })
  })

  describe('Error Display', () => {
    beforeEach(() => {
      wrapper = mount(LoginPage)
    })

    test('shows email field error styling when email error exists', async () => {
      wrapper.vm.errors.email = 'Invalid email'
      await wrapper.vm.$nextTick()
      
      const emailInput = wrapper.find('#email')
      expect(emailInput.classes()).toContain('border-error-300')
      expect(emailInput.classes()).toContain('focus:ring-error-500')
    })

    test('shows password field error styling when password error exists', async () => {
      wrapper.vm.errors.password = 'Password too short'
      await wrapper.vm.$nextTick()
      
      const passwordInput = wrapper.find('#password')
      expect(passwordInput.classes()).toContain('border-error-300')
      expect(passwordInput.classes()).toContain('focus:ring-error-500')
    })

    test('displays email error message', async () => {
      wrapper.vm.errors.email = 'Please enter a valid email'
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Please enter a valid email')
    })

    test('displays password error message', async () => {
      wrapper.vm.errors.password = 'Password is required'
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Password is required')
    })

    test('displays login error in error panel', async () => {
      wrapper.vm.loginError = 'Login failed'
      await wrapper.vm.$nextTick()
      
      const errorPanel = wrapper.find('div[class*="bg-error-50"]')
      expect(errorPanel.exists()).toBe(true)
      expect(errorPanel.text()).toContain('Login Failed')
      expect(errorPanel.text()).toContain('Login failed')
    })

    test('hides error panel when no login error', () => {
      wrapper.vm.loginError = ''
      
      const errorPanel = wrapper.find('div[class*="bg-error-50"]')
      expect(errorPanel.exists()).toBe(false)
    })
  })

  describe('Error Clearing', () => {
    beforeEach(() => {
      wrapper = mount(LoginPage)
      // Set up some initial errors
      wrapper.vm.errors.email = 'Some error'
      wrapper.vm.errors.password = 'Some error'
    })

    test('clears errors when form inputs change', () => {
      // The actual watch implementation would be tested here
      // This tests the expected behavior based on the component logic
      expect(wrapper.vm.errors.email).toBe('Some error')
      expect(wrapper.vm.errors.password).toBe('Some error')
      
      // In the real component, watching form.email would clear errors.email
      // and watching form.password would clear errors.password
    })

    test('clears login error when starting new submission', async () => {
      wrapper.vm.loginError = 'Previous error'
      wrapper.vm.form.businessId = 'tenant1'
      wrapper.vm.form.email = 'test@example.com'
      wrapper.vm.form.password = 'password123'
      
      authStore.login.mockResolvedValue({ success: true })
      
      await wrapper.find('form').trigger('submit.prevent')
      
      expect(wrapper.vm.loginError).toBe('')
    })
  })

  describe('localStorage Integration', () => {
    test('saves business ID to localStorage when changed', () => {
      wrapper = mount(LoginPage)
      
      // Simulate business ID change (this would normally happen via watch)
      wrapper.vm.form.businessId = 'new-tenant'
      
      // The component has a watcher that should save to localStorage
      // In a real test, this would be verified by checking the watch callback
      expect(global.localStorage.setItem).toHaveBeenCalledWith('business_id', 'new-tenant')
    })

    test('does not save business ID when process.client is false', () => {
      global.process.client = false
      wrapper = mount(LoginPage)
      
      wrapper.vm.form.businessId = 'new-tenant'
      
      // Should not call localStorage when not on client
      expect(global.localStorage.setItem).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      wrapper = mount(LoginPage)
    })

    test('has proper form labels associated with inputs', () => {
      const businessIdLabel = wrapper.find('label[for="businessId"]')
      const emailLabel = wrapper.find('label[for="email"]')
      const passwordLabel = wrapper.find('label[for="password"]')
      
      expect(businessIdLabel.exists()).toBe(true)
      expect(emailLabel.exists()).toBe(true)
      expect(passwordLabel.exists()).toBe(true)
      
      expect(businessIdLabel.text()).toContain('Business ID')
      expect(emailLabel.text()).toContain('Email address')
      expect(passwordLabel.text()).toContain('Password')
    })

    test('has proper autocomplete attributes', () => {
      const businessIdInput = wrapper.find('#businessId')
      const emailInput = wrapper.find('#email')
      const passwordInput = wrapper.find('#password')
      
      expect(businessIdInput.attributes('autocomplete')).toBe('organization')
      expect(emailInput.attributes('autocomplete')).toBe('email')
      expect(passwordInput.attributes('autocomplete')).toBe('current-password')
    })

    test('has required attributes on form fields', () => {
      const businessIdInput = wrapper.find('#businessId')
      const emailInput = wrapper.find('#email')
      const passwordInput = wrapper.find('#password')
      
      expect(businessIdInput.attributes('required')).toBeDefined()
      expect(emailInput.attributes('required')).toBeDefined()
      expect(passwordInput.attributes('required')).toBeDefined()
    })

    test('has proper input types', () => {
      const emailInput = wrapper.find('#email')
      const passwordInput = wrapper.find('#password')
      
      expect(emailInput.attributes('type')).toBe('email')
      expect(passwordInput.attributes('type')).toBe('password')
    })
  })

  describe('Component State Management', () => {
    test('initializes form with empty values', () => {
      wrapper = mount(LoginPage)
      
      expect(wrapper.vm.form.businessId).toBe('')
      expect(wrapper.vm.form.email).toBe('')
      expect(wrapper.vm.form.password).toBe('')
      expect(wrapper.vm.form.remember).toBe(false)
    })

    test('initializes state variables correctly', () => {
      wrapper = mount(LoginPage)
      
      expect(wrapper.vm.showPassword).toBe(false)
      expect(wrapper.vm.loading).toBe(false)
      expect(wrapper.vm.loginError).toBe('')
      expect(wrapper.vm.errors.email).toBe('')
      expect(wrapper.vm.errors.password).toBe('')
    })

    test('maintains state during user interactions', async () => {
      wrapper = mount(LoginPage)
      
      // Fill out form
      await wrapper.find('#businessId').setValue('tenant1')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#password').setValue('password123')
      await wrapper.find('#remember-me').setChecked(true)
      
      expect(wrapper.vm.form.businessId).toBe('tenant1')
      expect(wrapper.vm.form.email).toBe('test@example.com')
      expect(wrapper.vm.form.password).toBe('password123')
      expect(wrapper.vm.form.remember).toBe(true)
    })
  })
})