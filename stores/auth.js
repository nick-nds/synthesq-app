import { defineStore, acceptHMRUpdate } from 'pinia'

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

  const getCsrfToken = () => {
    if (!process.client) return null
    
    // Extract XSRF-TOKEN from cookies
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'XSRF-TOKEN') {
        return decodeURIComponent(value)
      }
    }
    return null
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

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const config = useRuntimeConfig()
    const csrfToken = getCsrfToken()
    
    console.log(`Making request to ${url} with CSRF token:`, csrfToken ? csrfToken.substring(0, 50) + '...' : 'No token')
    
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(businessId.value ? { 'X-Business-ID': businessId.value } : {}),
      ...(csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {}),
      ...(options.headers || {})
    }

    try {
      const response = await $fetch.raw(url, {
        baseURL: config.public.apiBase + config.public.apiPrefix,
        credentials: 'include',
        ...options,
        headers
      })

      // Check if server returned a new CSRF token in Set-Cookie headers
      if (process.client && response.headers) {
        const setCookieHeaders = response.headers.get('set-cookie')
        if (setCookieHeaders) {
          // Extract XSRF-TOKEN from Set-Cookie header
          const xsrfTokenMatch = setCookieHeaders.match(/XSRF-TOKEN=([^;]+)/)
          if (xsrfTokenMatch) {
            const newXsrfToken = decodeURIComponent(xsrfTokenMatch[1])
            const currentToken = getCsrfToken()
            if (newXsrfToken !== currentToken) {
              console.log('New CSRF token received in Set-Cookie, will be automatically used')
            }
          }
        }
        
        // Also check for token in response headers (fallback)
        const newXsrfToken = response.headers.get('X-XSRF-TOKEN') || response.headers.get('x-xsrf-token')
        if (newXsrfToken && newXsrfToken !== csrfToken) {
          document.cookie = `XSRF-TOKEN=${encodeURIComponent(newXsrfToken)}; path=/; SameSite=Lax`
          console.log('Updated CSRF token from response headers')
        }
      }

      return response._data
    } catch (error) {
      // If CSRF token mismatch (419), try to refresh the token and retry once
      if (error.status === 419) {
        console.log('CSRF token mismatch, refreshing token and retrying...')
        const csrfSuccess = await getCsrfCookie()
        if (csrfSuccess) {
          const newCsrfToken = getCsrfToken()
          const retryHeaders = {
            ...headers,
            ...(newCsrfToken ? { 'X-XSRF-TOKEN': newCsrfToken } : {})
          }
          
          const retryResponse = await $fetch.raw(url, {
            baseURL: config.public.apiBase + config.public.apiPrefix,
            credentials: 'include',
            ...options,
            headers: retryHeaders
          })
          
          return retryResponse._data
        }
      }
      throw error
    }
  }

  const getCurrentUser = async (forceRefreshToken = false) => {
    try {
      // If we need to force refresh (like after login), wait for cookies to update
      if (forceRefreshToken && process.client) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      const response = await makeAuthenticatedRequest('/user')
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

  const login = async (credentials) => {
    if (isLoading.value) return { success: false, error: 'Login already in progress' }
    
    try {
      isLoading.value = true
      
      // Set business ID first so it's available for API requests
      setBusinessId(credentials.business_id)
      
      // Call login endpoint with CSRF token (cookie should already be set from page load)
      const loginResponse = await makeAuthenticatedRequest('/login', {
        method: 'POST',
        headers: {
          'X-Business-ID': credentials.business_id
        },
        body: {
          email: credentials.email,
          password: credentials.password
        }
      })
      
      // Get authenticated user data with fresh token
      const userData = await getCurrentUser(true)
      
      if (userData) {
        setUser(userData)
        return { success: true, user: userData }
      } else {
        clearAuth()
        return { success: false, error: 'Failed to get user data after login' }
      }
    } catch (error) {
      console.error('Login error:', error)
      clearAuth()
      
      if (error.status === 401) {
        return { success: false, error: 'Invalid credentials. Please check your email and password.' }
      } else if (error.status === 422) {
        return { success: false, error: error.data?.message || 'Validation error. Please check your input.' }
      } else if (error.status === 403) {
        return { success: false, error: 'Access denied. Please check your business ID.' }
      } else {
        return { success: false, error: 'Login failed. Please try again.' }
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await makeAuthenticatedRequest('/logout', {
        method: 'POST'
      })
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
    getCsrfToken,
    getCurrentUser,
    handleAuthRedirect,
    login,
    logout,
    makeAuthenticatedRequest
  }
})

// Hot Module Replacement support for devtools
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}