export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Create a custom fetch wrapper with interceptors
  const apiClient = $fetch.create({
    baseURL: config.public.apiBase + config.public.apiPrefix,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    onRequest({ options }) {
      // Get business ID from localStorage and add tenant header
      if (process.client) {
        const businessId = localStorage.getItem('business_id')
        if (businessId) {
          options.headers = {
            ...options.headers,
            'X-Business-ID': businessId
          }
        }
      }
    },
    onRequestError({ error }) {
      console.error('Request error:', error)
    },
    onResponseError({ response }) {
      // Handle 401 responses by redirecting to login
      if (response.status === 401) {
        // Clear auth data
        if (process.client) {
          localStorage.removeItem('business_id')
          navigateTo('/login')
        }
      }
    }
  })

  // Provide the api client globally
  return {
    provide: {
      api: apiClient
    }
  }
})