import { defineStore, acceptHMRUpdate } from 'pinia'
import MockAuthService from '~/utils/mockAuth.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const businessId = ref(null)
  const isLoading = ref(false)
  const token = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Actions
  const setUser = (userData) => {
    user.value = userData
    // Persist to localStorage
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  const setToken = (tokenValue) => {
    token.value = tokenValue
    // Persist to localStorage
    if (process.client) {
      localStorage.setItem('auth_token', tokenValue)
    }
  }

  const setBusinessId = (id) => {
    businessId.value = id
    // Persist to localStorage
    if (process.client) {
      localStorage.setItem('business_id', id)
    }
  }

  const clearAuth = () => {
    user.value = null
    businessId.value = null
    token.value = null
    // Clear from localStorage
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('business_id')
      localStorage.removeItem('auth_token')
    }
  }

  // Mock authentication methods for demo
  const getCurrentUser = async () => {
    try {
      // Check if we have a valid token
      if (!token.value) {
        return null
      }
      
      const userData = MockAuthService.getCurrentUser(token.value)
      return userData
    } catch (error) {
      console.error('Failed to get current user:', error)
      return null
    }
  }

  const checkAuthStatus = async () => {
    if (isLoading.value) return false
    
    try {
      isLoading.value = true
      
      // Check if we have stored auth data
      if (process.client) {
        const storedToken = localStorage.getItem('auth_token')
        if (storedToken) {
          setToken(storedToken)
          const userData = await getCurrentUser()
          
          if (userData) {
            setUser(userData)
            setBusinessId(userData.businessId)
            return true
          }
        }
      }
      
      clearAuth()
      return false
    } catch (error) {
      console.error('Auth check failed:', error)
      clearAuth()
      return false
    } finally {
      isLoading.value = false
    }
  }

  const handleAuthRedirect = async () => {
    if (!process.client) return
    
    const currentPath = window.location.pathname
    const isAuthenticated = await checkAuthStatus()
    
    if (isAuthenticated) {
      // User is authenticated
      if (currentPath === '/login') {
        // Redirect to dashboard if on login page
        await navigateTo('/')
      }
      // Otherwise stay on current page
    } else {
      // User is not authenticated
      if (currentPath !== '/login') {
        // Redirect to login if not already there
        await navigateTo('/login')
      }
    }
  }

  const login = async (credentials) => {
    if (isLoading.value) return { success: false, error: 'Login already in progress' }
    
    try {
      isLoading.value = true
      
      // Add realistic loading delay for demo
      await MockAuthService.mockDelay()
      
      // Validate credentials using mock service
      const userData = MockAuthService.validateCredentials(
        credentials.business_id,
        credentials.email,
        credentials.password
      )
      
      // Generate mock token
      const mockToken = MockAuthService.generateMockToken(userData)
      
      // Set auth data
      setUser(userData)
      setToken(mockToken)
      setBusinessId(userData.businessId)
      
      return { success: true, user: userData }
    } catch (error) {
      console.error('Login error:', error.message)
      clearAuth()
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      // Add slight delay to simulate logout request
      await MockAuthService.mockDelay(300)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      await navigateTo('/login')
    }
  }

  const initializeFromStorage = () => {
    if (process.client) {
      // Restore user from localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Failed to parse stored user:', error)
        }
      }

      // Restore token from localStorage
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        token.value = storedToken
      }

      // Restore business ID from localStorage
      const storedBusinessId = localStorage.getItem('business_id')
      if (storedBusinessId) {
        businessId.value = storedBusinessId
      }
    }
  }

  // Permission helper methods
  const hasPermission = (permission) => {
    if (!user.value) return false
    return MockAuthService.hasPermission(user.value, permission)
  }

  const canAccessModule = (module) => {
    if (!user.value) return false
    return MockAuthService.canAccessModule(user.value, module)
  }

  return {
    // State
    user: readonly(user),
    businessId: readonly(businessId),
    isLoading: readonly(isLoading),
    token: readonly(token),
    
    // Getters
    isAuthenticated,
    
    // Actions
    setUser,
    setToken,
    setBusinessId,
    clearAuth,
    initializeFromStorage,
    checkAuthStatus,
    getCurrentUser,
    handleAuthRedirect,
    login,
    logout,
    hasPermission,
    canAccessModule
  }
})

// Hot Module Replacement support for devtools
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
// }