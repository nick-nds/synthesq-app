// Mock authentication data for demo
export const MOCK_USERS = {
  'synthesq-demo': {
    'admin@synthesq.com': {
      id: 'user-1',
      name: 'John Smith',
      email: 'admin@synthesq.com',
      password: 'admin123',
      role: 'admin',
      permissions: ['all'],
      avatar: null,
      businessId: 'synthesq-demo',
      businessName: 'Synthesq Demo Company',
      title: 'System Administrator',
      department: 'Executive',
      lastLogin: new Date().toISOString(),
      created_at: '2024-01-01T00:00:00Z'
    }
  }
}

export const DEMO_CREDENTIALS = [
  {
    label: 'Admin Account',
    businessId: 'synthesq-demo',
    email: 'admin@synthesq.com',
    password: 'admin123',
    description: 'Full access to all modules and features'
  }
]

// Mock authentication functions
export class MockAuthService {
  static validateCredentials(businessId, email, password) {
    const tenant = MOCK_USERS[businessId]
    if (!tenant) {
      throw new Error('Invalid business ID. Please check your tenant identifier.')
    }

    const user = tenant[email]
    if (!user) {
      throw new Error('User not found. Please check your email address.')
    }

    if (user.password !== password) {
      throw new Error('Invalid password. Please check your credentials.')
    }

    // Return user data without password
    const { password: _, ...userData } = user
    return userData
  }

  static async mockDelay(ms = 800) {
    // Simulate network delay for realistic login experience
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static generateMockToken(user) {
    // Generate a mock JWT-like token for demo purposes
    const header = { alg: 'HS256', typ: 'JWT' }
    const payload = {
      sub: user.id,
      email: user.email,
      businessId: user.businessId,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }
    
    // Mock encoding (not secure, just for demo)
    return 'demo.' + btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(payload)) + '.mock-signature'
  }

  static parseMockToken(token) {
    try {
      if (!token || !token.startsWith('demo.')) {
        return null
      }
      
      const parts = token.split('.')
      if (parts.length !== 4) {
        return null
      }
      
      const payload = JSON.parse(atob(parts[2]))
      
      // Check if token is expired
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return null
      }
      
      return payload
    } catch {
      return null
    }
  }

  static getCurrentUser(token) {
    const payload = this.parseMockToken(token)
    if (!payload) {
      return null
    }

    const tenant = MOCK_USERS[payload.businessId]
    if (!tenant) {
      return null
    }

    const user = tenant[payload.email]
    if (!user) {
      return null
    }

    // Return user data without password
    const { password: _, ...userData } = user
    return userData
  }

  static hasPermission(user, permission) {
    if (!user || !user.permissions) {
      return false
    }

    if (user.permissions.includes('all')) {
      return true
    }

    return user.permissions.includes(permission)
  }

  static canAccessModule(user, module) {
    const modulePermissions = {
      'crm': ['crm.read'],
      'sales': ['sales.read'],
      'operations': ['operations.read'],
      'finance': ['finance.read'],
      'hrm': ['hrm.read'],
      'analytics': ['analytics.read']
    }

    const requiredPermissions = modulePermissions[module] || []
    return requiredPermissions.some(permission => this.hasPermission(user, permission))
  }
}

// Export for use in components
export default MockAuthService