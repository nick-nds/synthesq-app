import ApiClient from '../../utils/api/ApiClient.js'

describe('ApiClient', () => {
  let apiClient
  let mockFetch

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
    
    // Setup fetch mock
    mockFetch = jest.fn()
    global.fetch = mockFetch
    
    // Reset document.cookie completely
    global.resetDocumentCookies()
    
    // Reset process.client to true (default for browser environment)
    process.client = true
  })

  describe('Constructor and Configuration', () => {
    it('should initialize with default configuration', () => {
      apiClient = new ApiClient()
      
      expect(apiClient.baseURL).toBe('')
      expect(apiClient.credentials).toBe('include')
      expect(apiClient.headers).toEqual({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      expect(apiClient.csrfToken).toBe(null)
      expect(apiClient.csrfCookie).toBe('XSRF-TOKEN')
      expect(apiClient.csrfHeader).toBe('X-XSRF-TOKEN')
      expect(apiClient.interceptors).toEqual({
        request: [],
        response: [],
        error: []
      })
    })

    it('should initialize with custom configuration', () => {
      const customConfig = {
        baseURL: 'https://api.example.com',
        credentials: 'same-origin',
        headers: {
          'Authorization': 'Bearer token123',
          'Custom-Header': 'custom-value'
        },
        csrfCookie: 'csrf_token',
        csrfHeader: 'X-CSRF-TOKEN'
      }
      
      apiClient = new ApiClient(customConfig)
      
      expect(apiClient.baseURL).toBe('https://api.example.com')
      expect(apiClient.credentials).toBe('same-origin')
      expect(apiClient.headers).toEqual({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123',
        'Custom-Header': 'custom-value'
      })
      expect(apiClient.csrfCookie).toBe('csrf_token')
      expect(apiClient.csrfHeader).toBe('X-CSRF-TOKEN')
    })

    it('should merge custom headers with default headers', () => {
      const customConfig = {
        headers: {
          'Content-Type': 'application/xml', // Override default
          'Authorization': 'Bearer token123' // Additional header
        }
      }
      
      apiClient = new ApiClient(customConfig)
      
      expect(apiClient.headers).toEqual({
        'Accept': 'application/json',
        'Content-Type': 'application/xml',
        'Authorization': 'Bearer token123'
      })
    })
  })

  describe('CSRF Token Management', () => {
    beforeEach(() => {
      global.resetDocumentCookies()  // Ensure clean state for each CSRF test
      apiClient = new ApiClient()
    })

    it('should extract CSRF token from cookies', () => {
      // Set cookies individually to mimic browser behavior
      global.resetDocumentCookies()
      document.cookie = 'session_id=abc123'
      document.cookie = 'XSRF-TOKEN=csrf_token_value'
      document.cookie = 'other=value'
      
      const token = apiClient.getCsrfToken()
      
      expect(token).toBe('csrf_token_value')
    })

    it('should handle URL-encoded CSRF token', () => {
      global.resetDocumentCookies()
      document.cookie = 'XSRF-TOKEN=token%20with%20spaces'
      
      const token = apiClient.getCsrfToken()
      
      expect(token).toBe('token with spaces')
    })

    it('should return null when CSRF token is not found', () => {
      global.resetDocumentCookies()
      document.cookie = 'session_id=abc123'
      document.cookie = 'other=value'
      
      const token = apiClient.getCsrfToken()
      
      expect(token).toBe(null)
    })

    it('should return null when no cookies exist', () => {
      global.resetDocumentCookies()
      
      const token = apiClient.getCsrfToken()
      
      expect(token).toBe(null)
    })

    it('should use custom CSRF cookie name', () => {
      global.resetDocumentCookies()
      document.cookie = 'XSRF-TOKEN=wrong_token'
      document.cookie = 'custom_csrf=correct_token'
      
      const customApiClient = new ApiClient({ csrfCookie: 'custom_csrf' })
      const token = customApiClient.getCsrfToken()
      
      expect(token).toBe('correct_token')
    })

    it('should return null when process.client is false', () => {
      process.client = false
      document.cookie = 'XSRF-TOKEN=csrf_token_value'
      
      const token = apiClient.getCsrfToken()
      
      expect(token).toBe(null)
    })

    it('should handle malformed cookies gracefully', () => {
      global.resetDocumentCookies()
      document.cookie = 'malformed_cookie'
      document.cookie = 'XSRF-TOKEN=valid_token'
      document.cookie = 'another_malformed'
      
      const token = apiClient.getCsrfToken()
      
      expect(token).toBe('valid_token')
    })
  })

  describe('Interceptor System', () => {
    beforeEach(() => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com' })
    })

    describe('Request Interceptors', () => {
      it('should add and execute request interceptors', async () => {
        const mockInterceptor = jest.fn((options) => ({
          ...options,
          headers: {
            ...options.headers,
            'X-Custom': 'intercepted'
          }
        }))

        mockFetch.mockResolvedValue({
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        })

        apiClient.addRequestInterceptor(mockInterceptor)
        
        await apiClient.get('/test')
        
        expect(mockInterceptor).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'GET',
            credentials: 'include',
            headers: expect.objectContaining({
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            })
          })
        )
        
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/test',
          expect.objectContaining({
            headers: expect.objectContaining({
              'X-Custom': 'intercepted'
            })
          })
        )
      })

      it('should remove request interceptors', () => {
        const interceptor = jest.fn()
        const removeInterceptor = apiClient.addRequestInterceptor(interceptor)
        
        expect(apiClient.interceptors.request).toContain(interceptor)
        
        removeInterceptor()
        
        expect(apiClient.interceptors.request).not.toContain(interceptor)
      })

      it('should execute multiple request interceptors in order', async () => {
        const interceptor1 = jest.fn((options) => ({
          ...options,
          headers: { ...options.headers, 'X-First': 'first' }
        }))
        const interceptor2 = jest.fn((options) => ({
          ...options,
          headers: { ...options.headers, 'X-Second': 'second' }
        }))

        mockFetch.mockResolvedValue({
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        })

        apiClient.addRequestInterceptor(interceptor1)
        apiClient.addRequestInterceptor(interceptor2)
        
        await apiClient.get('/test')
        
        expect(interceptor1).toHaveBeenCalled()
        expect(interceptor2).toHaveBeenCalled()
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/test',
          expect.objectContaining({
            headers: expect.objectContaining({
              'X-First': 'first',
              'X-Second': 'second'
            })
          })
        )
      })
    })

    describe('Response Interceptors', () => {
      it('should add and execute response interceptors', async () => {
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ data: 'original' })
        }
        const modifiedResponse = {
          ...mockResponse,
          json: () => Promise.resolve({ data: 'intercepted' })
        }
        
        const mockInterceptor = jest.fn(() => modifiedResponse)
        mockFetch.mockResolvedValue(mockResponse)

        apiClient.addResponseInterceptor(mockInterceptor)
        
        const result = await apiClient.get('/test')
        
        expect(mockInterceptor).toHaveBeenCalledWith(mockResponse)
        expect(result).toEqual({ data: 'intercepted' })
      })

      it('should remove response interceptors', () => {
        const interceptor = jest.fn()
        const removeInterceptor = apiClient.addResponseInterceptor(interceptor)
        
        expect(apiClient.interceptors.response).toContain(interceptor)
        
        removeInterceptor()
        
        expect(apiClient.interceptors.response).not.toContain(interceptor)
      })
    })

    describe('Error Interceptors', () => {
      it('should add and execute error interceptors', async () => {
        const networkError = new Error('Network error')
        const mockInterceptor = jest.fn()
        
        mockFetch.mockRejectedValue(networkError)
        apiClient.addErrorInterceptor(mockInterceptor)
        
        await expect(apiClient.get('/test')).rejects.toThrow('Network error')
        
        expect(mockInterceptor).toHaveBeenCalledWith(networkError)
      })

      it('should prevent error propagation when interceptor returns false', async () => {
        const networkError = new Error('Network error')
        const mockInterceptor = jest.fn(() => false)
        
        mockFetch.mockRejectedValue(networkError)
        apiClient.addErrorInterceptor(mockInterceptor)
        
        const result = await apiClient.get('/test')
        
        expect(result).toBeUndefined()
        expect(mockInterceptor).toHaveBeenCalledWith(networkError)
      })

      it('should remove error interceptors', () => {
        const interceptor = jest.fn()
        const removeInterceptor = apiClient.addErrorInterceptor(interceptor)
        
        expect(apiClient.interceptors.error).toContain(interceptor)
        
        removeInterceptor()
        
        expect(apiClient.interceptors.error).not.toContain(interceptor)
      })
    })
  })

  describe('HTTP Methods', () => {
    beforeEach(() => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com' })
    })

    describe('GET Method', () => {
      it('should make GET request with correct parameters', async () => {
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ id: 1, name: 'Test' })
        }
        mockFetch.mockResolvedValue(mockResponse)

        const result = await apiClient.get('/users', { page: 1, limit: 10 })

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users?page=1&limit=10',
          expect.objectContaining({
            method: 'GET',
            credentials: 'include',
            headers: expect.objectContaining({
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            })
          })
        )
        expect(result).toEqual({ id: 1, name: 'Test' })
      })

      it('should make GET request without parameters', async () => {
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve([])
        }
        mockFetch.mockResolvedValue(mockResponse)

        await apiClient.get('/users')

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            method: 'GET'
          })
        )
      })

      it('should not add CSRF token to GET requests', async () => {
        document.cookie = 'XSRF-TOKEN=csrf_token_value'
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({})
        }
        mockFetch.mockResolvedValue(mockResponse)

        await apiClient.get('/users')

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            headers: expect.not.objectContaining({
              'X-XSRF-TOKEN': 'csrf_token_value'
            })
          })
        )
      })
    })

    describe('POST Method', () => {
      it('should make POST request with JSON body and CSRF token', async () => {
        document.cookie = 'XSRF-TOKEN=csrf_token_value'
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ id: 1, name: 'Created' })
        }
        mockFetch.mockResolvedValue(mockResponse)

        const requestBody = { name: 'Test User', email: 'test@example.com' }
        const result = await apiClient.post('/users', requestBody)

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            method: 'POST',
            credentials: 'include',
            headers: expect.objectContaining({
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-XSRF-TOKEN': 'csrf_token_value'
            }),
            body: JSON.stringify(requestBody)
          })
        )
        expect(result).toEqual({ id: 1, name: 'Created' })
      })

      it('should handle FormData body without JSON serialization', async () => {
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        }
        mockFetch.mockResolvedValue(mockResponse)

        const formData = new FormData()
        formData.append('file', 'test-file')
        formData.append('name', 'Test')

        await apiClient.post('/upload', formData)

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/upload',
          expect.objectContaining({
            method: 'POST',
            body: formData // Should not be JSON.stringify'd
          })
        )
      })

      it('should make POST request without CSRF token when not available', async () => {
        // Ensure absolutely no cookies are present
        global.resetDocumentCookies()
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        }
        mockFetch.mockResolvedValue(mockResponse)

        await apiClient.post('/users', { name: 'Test' })

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            headers: expect.not.objectContaining({
              'X-XSRF-TOKEN': expect.any(String)
            })
          })
        )
      })
    })

    describe('PUT Method', () => {
      it('should make PUT request with JSON body and CSRF token', async () => {
        document.cookie = 'XSRF-TOKEN=csrf_token_value'
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ id: 1, name: 'Updated' })
        }
        mockFetch.mockResolvedValue(mockResponse)

        const requestBody = { name: 'Updated User' }
        const result = await apiClient.put('/users/1', requestBody)

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/1',
          expect.objectContaining({
            method: 'PUT',
            headers: expect.objectContaining({
              'X-XSRF-TOKEN': 'csrf_token_value'
            }),
            body: JSON.stringify(requestBody)
          })
        )
        expect(result).toEqual({ id: 1, name: 'Updated' })
      })
    })

    describe('PATCH Method', () => {
      it('should make PATCH request with JSON body and CSRF token', async () => {
        document.cookie = 'XSRF-TOKEN=csrf_token_value'
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ id: 1, name: 'Patched' })
        }
        mockFetch.mockResolvedValue(mockResponse)

        const requestBody = { name: 'Patched User' }
        const result = await apiClient.patch('/users/1', requestBody)

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/1',
          expect.objectContaining({
            method: 'PATCH',
            headers: expect.objectContaining({
              'X-XSRF-TOKEN': 'csrf_token_value'
            }),
            body: JSON.stringify(requestBody)
          })
        )
        expect(result).toEqual({ id: 1, name: 'Patched' })
      })
    })

    describe('DELETE Method', () => {
      it('should make DELETE request with CSRF token', async () => {
        document.cookie = 'XSRF-TOKEN=csrf_token_value'
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        }
        mockFetch.mockResolvedValue(mockResponse)

        const result = await apiClient.delete('/users/1')

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/1',
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
              'X-XSRF-TOKEN': 'csrf_token_value'
            })
          })
        )
        expect(result).toEqual({ success: true })
      })

      it('should make DELETE request with custom options', async () => {
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        }
        mockFetch.mockResolvedValue(mockResponse)

        await apiClient.delete('/users/1', {
          headers: { 'X-Custom': 'custom-value' }
        })

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/1',
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
              'X-Custom': 'custom-value'
            })
          })
        )
      })
    })

    describe('Custom CSRF Header', () => {
      it('should use custom CSRF header name', async () => {
        apiClient = new ApiClient({
          baseURL: 'https://api.example.com',
          csrfHeader: 'X-CSRF-TOKEN'
        })
        document.cookie = 'XSRF-TOKEN=csrf_token_value'
        
        const mockResponse = {
          ok: true,
          headers: new Map([['content-type', 'application/json']]),
          json: () => Promise.resolve({ success: true })
        }
        mockFetch.mockResolvedValue(mockResponse)

        await apiClient.post('/users', { name: 'Test' })

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            headers: expect.objectContaining({
              'X-CSRF-TOKEN': 'csrf_token_value'
            })
          })
        )
      })
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com' })
    })

    it('should handle HTTP error responses with JSON data', async () => {
      const errorData = { message: 'Validation failed', errors: { name: ['required'] } }
      const mockResponse = {
        ok: false,
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve(errorData)
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(apiClient.get('/users')).rejects.toMatchObject({
        message: 'HTTP 422: Unprocessable Entity',
        status: 422,
        response: mockResponse,
        data: errorData
      })
    })

    it('should handle HTTP error responses without JSON data', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Map([['content-type', 'text/html']]),
        json: () => Promise.reject(new Error('Not JSON'))
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(apiClient.get('/users')).rejects.toMatchObject({
        message: 'HTTP 500: Internal Server Error',
        status: 500,
        response: mockResponse,
        data: null
      })
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network request failed')
      mockFetch.mockRejectedValue(networkError)

      await expect(apiClient.get('/users')).rejects.toThrow('Network request failed')
    })

    it('should handle JSON parsing errors for successful responses', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.reject(new Error('Invalid JSON'))
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(apiClient.get('/users')).rejects.toThrow('Invalid JSON')
    })

    it('should handle malformed JSON in error responses gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.reject(new Error('Invalid JSON'))
      }
      mockFetch.mockResolvedValue(mockResponse)

      await expect(apiClient.get('/users')).rejects.toMatchObject({
        message: 'HTTP 400: Bad Request',
        status: 400,
        data: null
      })
    })

    it('should return non-JSON responses as-is for successful requests', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'text/plain']]),
        text: () => Promise.resolve('Plain text response')
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await apiClient.get('/users')

      expect(result).toBe(mockResponse)
    })

    it('should handle responses with no content-type header', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map(),
        text: () => Promise.resolve('No content type')
      }
      mockFetch.mockResolvedValue(mockResponse)

      const result = await apiClient.get('/users')

      expect(result).toBe(mockResponse)
    })
  })

  describe('Parameter Handling and URL Construction', () => {
    beforeEach(() => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com' })
    })

    it('should construct URLs with query parameters', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users', { page: 1, limit: 10, sort: 'name' })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1&limit=10&sort=name',
        expect.any(Object)
      )
    })

    it('should handle URLs that already have query parameters', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users?existing=param', { page: 1, limit: 10 })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users?existing=param&page=1&limit=10',
        expect.any(Object)
      )
    })

    it('should handle special characters in query parameters', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users', { search: 'john@example.com', filter: 'name=John Doe' })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users?search=john%40example.com&filter=name%3DJohn+Doe',
        expect.any(Object)
      )
    })

    it('should handle empty parameters object', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users', {})

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.any(Object)
      )
    })

    it('should remove params from request options after URL construction', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users', { page: 1 })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1',
        expect.not.objectContaining({
          params: expect.anything()
        })
      )
    })

    it('should handle baseURL without trailing slash', async () => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com' })
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.any(Object)
      )
    })

    it('should handle baseURL with trailing slash', async () => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com/' })
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('users')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.any(Object)
      )
    })

    it('should handle empty baseURL', async () => {
      apiClient = new ApiClient({ baseURL: '' })
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve([])
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users')

      expect(mockFetch).toHaveBeenCalledWith(
        '/users',
        expect.any(Object)
      )
    })
  })

  describe('Edge Cases and Advanced Scenarios', () => {
    beforeEach(() => {
      apiClient = new ApiClient({ baseURL: 'https://api.example.com' })
    })

    it('should handle null or undefined request body', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.post('/users', null)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          body: 'null'
        })
      )
    })

    it('should handle string request body without JSON serialization', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.post('/users', 'plain string body')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          body: 'plain string body'
        })
      )
    })

    it('should merge custom options with default options', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      await apiClient.get('/users', {}, {
        headers: { 'X-Custom': 'custom-value' },
        mode: 'cors'
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          credentials: 'include',
          mode: 'cors',
          headers: expect.objectContaining({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Custom': 'custom-value'
          })
        })
      )
    })

    it('should handle async request interceptor errors', async () => {
      const interceptorError = new Error('Interceptor failed')
      const failingInterceptor = jest.fn().mockRejectedValue(interceptorError)
      
      apiClient.addRequestInterceptor(failingInterceptor)

      await expect(apiClient.get('/users')).rejects.toThrow('Interceptor failed')
    })

    it('should handle async response interceptor errors', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      const interceptorError = new Error('Response interceptor failed')
      const failingInterceptor = jest.fn().mockRejectedValue(interceptorError)
      
      apiClient.addResponseInterceptor(failingInterceptor)

      await expect(apiClient.get('/users')).rejects.toThrow('Response interceptor failed')
    })

    it('should handle async error interceptor errors', async () => {
      const networkError = new Error('Network error')
      const interceptorError = new Error('Error interceptor failed')
      
      mockFetch.mockRejectedValue(networkError)
      
      const failingInterceptor = jest.fn().mockRejectedValue(interceptorError)
      apiClient.addErrorInterceptor(failingInterceptor)

      await expect(apiClient.get('/users')).rejects.toThrow('Error interceptor failed')
    })

    it('should handle request interceptor returning null/undefined', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      const nullInterceptor = jest.fn(() => null)
      const undefinedInterceptor = jest.fn(() => undefined)
      
      apiClient.addRequestInterceptor(nullInterceptor)
      apiClient.addRequestInterceptor(undefinedInterceptor)

      await apiClient.get('/users')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'GET'
        })
      )
    })

    it('should handle response interceptor returning null/undefined', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ data: 'original' })
      }
      mockFetch.mockResolvedValue(mockResponse)

      const nullInterceptor = jest.fn(() => null)
      const undefinedInterceptor = jest.fn(() => undefined)
      
      apiClient.addResponseInterceptor(nullInterceptor)
      apiClient.addResponseInterceptor(undefinedInterceptor)

      const result = await apiClient.get('/users')

      expect(result).toEqual({ data: 'original' })
    })

    it('should handle complex nested objects in request body', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      const complexBody = {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          preferences: {
            theme: 'dark',
            notifications: ['email', 'push']
          }
        },
        metadata: {
          source: 'web',
          timestamp: new Date().toISOString()
        }
      }

      await apiClient.post('/users', complexBody)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          body: JSON.stringify(complexBody)
        })
      )
    })

    it('should preserve Content-Type for FormData requests', async () => {
      const mockResponse = {
        ok: true,
        headers: new Map([['content-type', 'application/json']]),
        json: () => Promise.resolve({ success: true })
      }
      mockFetch.mockResolvedValue(mockResponse)

      const formData = new FormData()
      formData.append('file', 'test-content')

      await apiClient.post('/upload', formData, {
        headers: { 'X-Custom': 'value' }
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/upload',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/json',
            'Content-Type': 'application/json', // This should be preserved from default headers
            'X-Custom': 'value'
          }),
          body: formData
        })
      )
    })
  })
})