export const useAuth = () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const businessId = ref(null)

  // Mock users for demo
  const mockUsers = [
    {
      id: 1,
      name: 'John Admin',
      email: 'admin@synthesq.com',
      business_id: 'bistro-downtown',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Sarah Manager',
      email: 'manager@synthesq.com',
      business_id: 'acme-corp',
      role: 'manager'
    }
  ]

  // Mock businesses
  const mockBusinesses = [
    { id: 'bistro-downtown', name: 'Bistro Downtown', plan: 'premium' },
    { id: 'acme-corp', name: 'Acme Corporation', plan: 'enterprise' },
    { id: 'tech-startup', name: 'Tech Startup Inc', plan: 'standard' },
    { id: 'demo-business', name: 'Demo Business', plan: 'trial' },
    { id: 'restaurant-chain', name: 'Restaurant Chain Co', plan: 'enterprise' }
  ]

  const getBusinessId = () => {
    if (process.client) {
      return localStorage.getItem('business_id')
    }
    return null
  }

  const setBusinessId = (id) => {
    businessId.value = id
    if (process.client) {
      localStorage.setItem('business_id', id)
    }
  }

  const getAuthHeaders = () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
    const storedBusinessId = getBusinessId()
    if (storedBusinessId) {
      headers['tenant'] = storedBusinessId
    }

    return headers
  }

  const login = async (credentials) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check if business exists
      const business = mockBusinesses.find(b => b.id === credentials.business_id)
      if (!business) {
        return { 
          success: false, 
          error: 'Business ID not found. Please check your business ID.' 
        }
      }

      // Find matching user
      const mockUser = mockUsers.find(u => 
        u.email === credentials.email && 
        u.business_id === credentials.business_id
      )

      // Check credentials
      const validCredentials = [
        { email: 'admin@synthesq.com', password: 'admin123', business: 'bistro-downtown' },
        { email: 'manager@synthesq.com', password: 'manager123', business: 'acme-corp' }
      ]

      const isValidLogin = validCredentials.some(cred => 
        cred.email === credentials.email && 
        cred.password === credentials.password &&
        cred.business === credentials.business_id
      )

      if (!isValidLogin) {
        return { 
          success: false, 
          error: 'Invalid email or password. Please check your credentials.' 
        }
      }

      if (mockUser) {
        setBusinessId(credentials.business_id)
        user.value = mockUser
        
        // Store user in localStorage for persistence
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(mockUser))
        }
        
        return { success: true, user: mockUser }
      }

      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      }
    }
  }

  const logout = async () => {
    try {
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
      businessId.value = null
      if (process.client) {
        localStorage.removeItem('business_id')
        localStorage.removeItem('user')
      }
      await navigateTo('/login')
    }
  }

  const getUser = async () => {
    try {
      // Try to get user from localStorage first
      if (process.client) {
        const storedUser = localStorage.getItem('user')
        const storedBusinessId = localStorage.getItem('business_id')
        
        if (storedUser && storedBusinessId) {
          const parsedUser = JSON.parse(storedUser)
          user.value = parsedUser
          businessId.value = storedBusinessId
          return parsedUser
        }
      }
    } catch (error) {
      console.error('Get user error:', error)
      user.value = null
      businessId.value = null
      if (process.client) {
        localStorage.removeItem('user')
        localStorage.removeItem('business_id')
      }
    }
    return null
  }

  onMounted(() => {
    if (process.client) {
      businessId.value = getBusinessId()
    }
  })

  return {
    user: readonly(user),
    isAuthenticated,
    businessId: readonly(businessId),
    login,
    logout,
    getUser,
    setBusinessId,
    getAuthHeaders
  }
}