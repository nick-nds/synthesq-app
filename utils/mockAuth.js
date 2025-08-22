// Mock authentication data for demo
export const MOCK_USERS = {
  'tenant1': {
    'test@example.com': {
      id: 'user-1',
      name: 'John Smith',
      email: 'test@example.com',
      password: 'password', // In real app, this would be hashed
      role: 'admin',
      permissions: ['all'],
      avatar: null,
      businessId: 'tenant1',
      businessName: 'Acme Corporation',
      title: 'CEO',
      department: 'Executive',
      lastLogin: new Date().toISOString(),
      created_at: '2024-01-01T00:00:00Z'
    },
    'sarah.johnson@tenant1.com': {
      id: 'user-2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@tenant1.com',
      password: 'password123',
      role: 'sales_manager',
      permissions: ['crm.read', 'crm.write', 'sales.read', 'sales.write'],
      avatar: null,
      businessId: 'tenant1',
      businessName: 'Acme Corporation',
      title: 'Sales Manager',
      department: 'Sales',
      lastLogin: new Date(Date.now() - 86400000).toISOString(),
      created_at: '2024-01-15T00:00:00Z'
    }
  },
  'demo-corp': {
    'admin@democorp.com': {
      id: 'user-3',
      name: 'Emily Davis',
      email: 'admin@democorp.com',
      password: 'demo123',
      role: 'admin',
      permissions: ['all'],
      avatar: null,
      businessId: 'demo-corp',
      businessName: 'Demo Corporation',
      title: 'Administrator',
      department: 'IT',
      lastLogin: new Date(Date.now() - 3600000).toISOString(),
      created_at: '2024-02-01T00:00:00Z'
    },
    'mike.chen@democorp.com': {
      id: 'user-4',
      name: 'Mike Chen',
      email: 'mike.chen@democorp.com',
      password: 'password456',
      role: 'sales_rep',
      permissions: ['crm.read', 'crm.write', 'sales.read'],
      avatar: null,
      businessId: 'demo-corp',
      businessName: 'Demo Corporation',
      title: 'Sales Representative',
      department: 'Sales',
      lastLogin: new Date(Date.now() - 7200000).toISOString(),
      created_at: '2024-02-15T00:00:00Z'
    }
  },
  'enterprise-ltd': {
    'ceo@enterprise-ltd.com': {
      id: 'user-5',
      name: 'Alexander Rodriguez',
      email: 'ceo@enterprise-ltd.com',
      password: 'enterprise2024',
      role: 'ceo',
      permissions: ['all'],
      avatar: null,
      businessId: 'enterprise-ltd',
      businessName: 'Enterprise Solutions Ltd',
      title: 'Chief Executive Officer',
      department: 'Executive',
      lastLogin: new Date(Date.now() - 1800000).toISOString(),
      created_at: '2024-01-01T00:00:00Z'
    }
  }
}

export const DEMO_CREDENTIALS = [
  {
    label: 'Admin Demo (Acme Corp)',
    businessId: 'tenant1',
    email: 'test@example.com',
    password: 'password',
    description: 'Full access to all modules'
  },
  {
    label: 'Sales Manager (Acme Corp)',
    businessId: 'tenant1',
    email: 'sarah.johnson@tenant1.com',
    password: 'password123',
    description: 'Sales and CRM access'
  },
  {
    label: 'Admin Demo (Demo Corp)',
    businessId: 'demo-corp',
    email: 'admin@democorp.com',
    password: 'demo123',
    description: 'Alternative demo tenant'
  },
  {
    label: 'CEO Enterprise',
    businessId: 'enterprise-ltd',
    email: 'ceo@enterprise-ltd.com',
    password: 'enterprise2024',
    description: 'Enterprise demo account'
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