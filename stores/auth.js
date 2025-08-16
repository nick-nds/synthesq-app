import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const businessId = ref(null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value)

  // Actions
  const setUser = (userData) => {
    user.value = userData
    // Persist to localStorage
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
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
    // Clear from localStorage
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('business_id')
    }
  }

  const getCsrfCookie = async () => {
    try {
      const config = useRuntimeConfig()
      await $fetch('/csrf-cookie', {
        baseURL: config.public.apiBase + config.public.apiPrefix,
        credentials: 'include'
      })
      return true
    } catch (error) {
      console.error('Failed to get CSRF cookie:', error)
      return false
    }
  }

  const getCurrentUser = async () => {
    try {
      const config = useRuntimeConfig()
      const response = await $fetch('/user', {
        baseURL: config.public.apiBase + config.public.apiPrefix,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(businessId.value ? { 'X-Business-ID': businessId.value } : {})
        }
      })
      return response
    } catch (error) {
      if (error.status === 401) {
        // User not authenticated
        return null
      }
      console.error('Failed to get current user:', error)
      throw error
    }
  }

  const checkAuthStatus = async () => {
    if (isLoading.value) return false
    
    try {
      isLoading.value = true
      
      // Step 1: Get CSRF cookie
      const csrfSuccess = await getCsrfCookie()
      if (!csrfSuccess) {
        return false
      }
      
      // Step 2: Try to get authenticated user
      const userData = await getCurrentUser()
      
      if (userData) {
        setUser(userData)
        return true
      } else {
        clearAuth()
        return false
      }
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

      // Restore business ID from localStorage
      const storedBusinessId = localStorage.getItem('business_id')
      if (storedBusinessId) {
        businessId.value = storedBusinessId
      }
    }
  }

  return {
    // State
    user: readonly(user),
    businessId: readonly(businessId),
    isLoading: readonly(isLoading),
    
    // Getters
    isAuthenticated,
    
    // Actions
    setUser,
    setBusinessId,
    clearAuth,
    initializeFromStorage,
    checkAuthStatus,
    getCsrfCookie,
    getCurrentUser,
    handleAuthRedirect
  }
})