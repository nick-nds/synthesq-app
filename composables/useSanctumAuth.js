export const useSanctumAuth = () => {
  const { $api, $sanctumAuth } = useNuxtApp()
  const router = useRouter()
  
  const user = useState('auth.user', () => null)
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  const isLoading = useState('auth.isLoading', () => false)
  const businessId = useState('auth.businessId', () => null)

  const initializeAuth = async () => {
    if (process.client) {
      const storedUser = localStorage.getItem('user')
      const storedBusinessId = localStorage.getItem('business_id')
      
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
          businessId.value = storedBusinessId
        } catch (error) {
          console.error('Failed to parse stored user:', error)
          clearAuth()
        }
      }
    }
  }

  const clearAuth = () => {
    user.value = null
    isAuthenticated.value = false
    businessId.value = null
    
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('business_id')
    }
  }

  const login = async (credentials) => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.login(credentials)
      
      if (response.user) {
        user.value = response.user
        isAuthenticated.value = true
        
        if (response.business_id) {
          businessId.value = response.business_id
          if (process.client) {
            localStorage.setItem('business_id', response.business_id)
          }
        }
        
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }
      }
      
      return response
    } catch (error) {
      clearAuth()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await $sanctumAuth.logout()
      clearAuth()
      await router.push('/login')
    } catch (error) {
      clearAuth()
      await router.push('/login')
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.register(userData)
      
      if (response.user) {
        user.value = response.user
        isAuthenticated.value = true
        
        if (response.business_id) {
          businessId.value = response.business_id
          if (process.client) {
            localStorage.setItem('business_id', response.business_id)
          }
        }
        
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }
      }
      
      return response
    } catch (error) {
      clearAuth()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const fetchUser = async () => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.user()
      user.value = response
      isAuthenticated.value = true
      return response
    } catch (error) {
      clearAuth()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (data) => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.updateProfile(data)
      user.value = response
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const changePassword = async (data) => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.changePassword(data)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const forgotPassword = async (email) => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.forgotPassword(email)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (data) => {
    isLoading.value = true
    try {
      const response = await $sanctumAuth.resetPassword(data)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const switchBusiness = async (newBusinessId) => {
    businessId.value = newBusinessId
    if (process.client) {
      localStorage.setItem('business_id', newBusinessId)
    }
    
    await router.go(0)
  }

  const hasPermission = (permission) => {
    if (!user.value) return false
    return user.value.permissions?.includes(permission) || false
  }

  const hasRole = (role) => {
    if (!user.value) return false
    return user.value.roles?.includes(role) || false
  }

  const hasAnyRole = (roles) => {
    if (!user.value) return false
    return roles.some(role => hasRole(role))
  }

  const hasAllRoles = (roles) => {
    if (!user.value) return false
    return roles.every(role => hasRole(role))
  }

  initializeAuth()

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    businessId: readonly(businessId),
    login,
    logout,
    register,
    fetchUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    switchBusiness,
    hasPermission,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    initializeAuth,
    clearAuth
  }
}