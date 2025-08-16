import ApiClient from '~/utils/api/ApiClient'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()
  
  const api = new ApiClient({
    baseURL: config.public.apiBase + config.public.apiPrefix,
    credentials: 'include',
    csrfCookie: 'XSRF-TOKEN',
    csrfHeader: 'X-XSRF-TOKEN'
  })

  api.addRequestInterceptor(async ({ options }) => {
    if (process.client) {
      const businessId = localStorage.getItem('business_id')
      if (businessId) {
        options.headers['X-Business-ID'] = businessId
      }
      
      const locale = localStorage.getItem('locale') || 'en'
      options.headers['Accept-Language'] = locale
    }
    
    return options
  })

  api.addErrorInterceptor(async (error) => {
    if (error.status === 401) {
      if (process.client) {
        localStorage.removeItem('business_id')
        localStorage.removeItem('user')
        await router.push('/login')
        return false
      }
    }
    
    if (error.status === 419) {
      if (process.client) {
        await api.get('/sanctum/csrf-cookie')
        console.warn('CSRF token refreshed, please retry the request')
      }
    }
    
    if (error.status === 403) {
      console.error('Forbidden: You do not have permission to perform this action')
    }
    
    if (error.status === 422) {
      console.error('Validation error:', error.data?.errors)
    }
    
    if (error.status >= 500) {
      console.error('Server error:', error.message)
    }
    
    throw error
  })

  const sanctumAuth = {
    async getCsrfCookie() {
      try {
        await api.get('/sanctum/csrf-cookie')
        return true
      } catch (error) {
        console.error('Failed to get CSRF cookie:', error)
        return false
      }
    },

    async login(credentials) {
      try {
        await this.getCsrfCookie()
        const response = await api.post('/login', credentials)
        return response
      } catch (error) {
        throw error
      }
    },

    async logout() {
      try {
        await api.post('/logout')
        if (process.client) {
          localStorage.removeItem('business_id')
          localStorage.removeItem('user')
        }
        return true
      } catch (error) {
        console.error('Logout error:', error)
        throw error
      }
    },

    async register(userData) {
      try {
        await this.getCsrfCookie()
        const response = await api.post('/register', userData)
        return response
      } catch (error) {
        throw error
      }
    },

    async forgotPassword(email) {
      try {
        await this.getCsrfCookie()
        const response = await api.post('/forgot-password', { email })
        return response
      } catch (error) {
        throw error
      }
    },

    async resetPassword(data) {
      try {
        await this.getCsrfCookie()
        const response = await api.post('/reset-password', data)
        return response
      } catch (error) {
        throw error
      }
    },

    async user() {
      try {
        const response = await api.get('/user')
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response))
        }
        return response
      } catch (error) {
        throw error
      }
    },

    async updateProfile(data) {
      try {
        const response = await api.put('/user/profile', data)
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response))
        }
        return response
      } catch (error) {
        throw error
      }
    },

    async changePassword(data) {
      try {
        const response = await api.put('/user/password', data)
        return response
      } catch (error) {
        throw error
      }
    }
  }

  return {
    provide: {
      api,
      sanctumAuth
    }
  }
})