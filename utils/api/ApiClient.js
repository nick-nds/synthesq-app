class ApiClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || ''
    this.credentials = config.credentials || 'include'
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...config.headers
    }
    this.interceptors = {
      request: [],
      response: [],
      error: []
    }
    this.csrfToken = null
    this.csrfCookie = config.csrfCookie || 'XSRF-TOKEN'
    this.csrfHeader = config.csrfHeader || 'X-XSRF-TOKEN'
  }

  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor)
    return () => {
      const index = this.interceptors.request.indexOf(interceptor)
      if (index !== -1) {
        this.interceptors.request.splice(index, 1)
      }
    }
  }

  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor)
    return () => {
      const index = this.interceptors.response.indexOf(interceptor)
      if (index !== -1) {
        this.interceptors.response.splice(index, 1)
      }
    }
  }

  addErrorInterceptor(interceptor) {
    this.interceptors.error.push(interceptor)
    return () => {
      const index = this.interceptors.error.indexOf(interceptor)
      if (index !== -1) {
        this.interceptors.error.splice(index, 1)
      }
    }
  }

  getCsrfToken() {
    if (!process.client) return null
    
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === this.csrfCookie) {
        return decodeURIComponent(value)
      }
    }
    return null
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    let requestOptions = {
      ...options,
      credentials: this.credentials,
      headers: {
        ...this.headers,
        ...options.headers
      }
    }

    const csrfToken = this.getCsrfToken()
    if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(requestOptions.method)) {
      requestOptions.headers[this.csrfHeader] = csrfToken
    }

    for (const interceptor of this.interceptors.request) {
      requestOptions = await interceptor({ url, options: requestOptions }) || requestOptions
    }

    if (requestOptions.body && typeof requestOptions.body === 'object' && !(requestOptions.body instanceof FormData)) {
      requestOptions.body = JSON.stringify(requestOptions.body)
    }

    if (options.params) {
      const params = new URLSearchParams(options.params)
      const separator = url.includes('?') ? '&' : '?'
      url = `${url}${separator}${params.toString()}`
      delete requestOptions.params
    }

    try {
      let response = await fetch(url, requestOptions)
      
      for (const interceptor of this.interceptors.response) {
        response = await interceptor(response) || response
      }

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.response = response
        error.status = response.status
        
        if (response.headers.get('content-type')?.includes('application/json')) {
          try {
            error.data = await response.json()
          } catch (e) {
            error.data = null
          }
        }
        
        throw error
      }

      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      }
      
      return response
    } catch (error) {
      for (const interceptor of this.interceptors.error) {
        const handled = await interceptor(error)
        if (handled === false) {
          return
        }
      }
      throw error
    }
  }

  async get(endpoint, params = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'GET',
      params
    })
  }

  async post(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body
    })
  }

  async put(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body
    })
  }

  async patch(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body
    })
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE'
    })
  }
}

export default ApiClient