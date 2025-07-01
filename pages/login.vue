<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-xl">BK</span>
          </div>
          <span class="ml-3 text-2xl font-bold text-neutral-900">BistroKeep</span>
        </div>
      </div>
      
      <h2 class="mt-6 text-center text-3xl font-bold text-neutral-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-neutral-600">
        Or
        <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
          contact your administrator for access
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card-premium">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Business ID -->
          <div>
            <label for="businessId" class="block text-sm font-medium text-neutral-700">
              Business ID
            </label>
            <div class="mt-1 relative">
              <input
                id="businessId"
                v-model="form.businessId"
                name="businessId"
                type="text"
                autocomplete="organization"
                required
                class="input"
                :class="{ 'border-danger-300 focus:ring-danger-500': errors.businessId }"
                placeholder="Enter your business ID"
                @blur="validateBusinessId"
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="businessValidating" class="animate-spin h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else-if="businessFound" class="h-5 w-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else-if="errors.businessId" class="h-5 w-5 text-danger-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.businessId" class="mt-2 text-sm text-danger-600">{{ errors.businessId }}</p>
            <p v-else-if="businessFound" class="mt-2 text-sm text-success-600">
              Business found: {{ businessFound.name }}
            </p>
            <p v-else class="mt-2 text-xs text-neutral-500">
              Your unique business identifier (e.g., bistro-downtown, acme-corp)
            </p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700">
              Email address
            </label>
            <div class="mt-1 relative">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="input"
                :class="{ 'border-danger-300 focus:ring-danger-500': errors.email }"
                placeholder="Enter your email"
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="errors.email" class="h-5 w-5 text-danger-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-2 text-sm text-danger-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="input pr-10"
                :class="{ 'border-danger-300 focus:ring-danger-500': errors.password }"
                placeholder="Enter your password"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showPassword" class="h-5 w-5 text-neutral-400 hover:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5 text-neutral-400 hover:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-2 text-sm text-danger-600">{{ errors.password }}</p>
          </div>

          <!-- Remember me & Forgot password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-neutral-700">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>

          <!-- Submit button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn-gradient w-full flex justify-center py-3"
              :class="{ 'opacity-50 cursor-not-allowed': loading }"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>

          <!-- Error message -->
          <div v-if="loginError" class="rounded-md bg-danger-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-danger-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-danger-800">Login Failed</h3>
                <div class="mt-2 text-sm text-danger-700">
                  <p>{{ loginError }}</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <!-- Demo credentials -->
        <div class="mt-6 pt-6 border-t border-neutral-200">
          <div class="text-center">
            <p class="text-xs text-neutral-500 mb-3">Demo Credentials:</p>
            <div class="grid grid-cols-1 gap-3 text-xs">
              <div class="bg-neutral-50 rounded-lg p-3">
                <button
                  @click="fillDemoCredentials('admin')"
                  class="text-primary-600 hover:text-primary-500 font-medium block w-full text-left"
                >
                  <span class="block font-semibold">Admin Access</span>
                  <span class="block text-neutral-600">bistro-downtown</span>
                  <span class="block text-neutral-600">admin@bistrokeep.com / admin123</span>
                </button>
              </div>
              <div class="bg-neutral-50 rounded-lg p-3">
                <button
                  @click="fillDemoCredentials('manager')"
                  class="text-primary-600 hover:text-primary-500 font-medium block w-full text-left"
                >
                  <span class="block font-semibold">Manager Access</span>
                  <span class="block text-neutral-600">acme-corp</span>
                  <span class="block text-neutral-600">manager@bistrokeep.com / manager123</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center">
      <p class="text-xs text-neutral-500">
        © 2024 BistroKeep CRM/ERP. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
// Set layout to false to use custom layout
definePageMeta({
  layout: false
})

const router = useRouter()

// Form state
const form = reactive({
  businessId: '',
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const loading = ref(false)
const loginError = ref('')
const businessValidating = ref(false)
const businessFound = ref(null)
const errors = reactive({
  businessId: '',
  email: '',
  password: ''
})

// Mock businesses for demo
const mockBusinesses = [
  { id: 'bistro-downtown', name: 'Bistro Downtown', plan: 'premium' },
  { id: 'acme-corp', name: 'Acme Corporation', plan: 'enterprise' },
  { id: 'tech-startup', name: 'Tech Startup Inc', plan: 'standard' },
  { id: 'demo-business', name: 'Demo Business', plan: 'trial' },
  { id: 'restaurant-chain', name: 'Restaurant Chain Co', plan: 'enterprise' }
]

// Business validation
const validateBusinessId = async () => {
  if (!form.businessId) {
    businessFound.value = null
    errors.businessId = ''
    return
  }
  
  businessValidating.value = true
  errors.businessId = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const business = mockBusinesses.find(b => b.id.toLowerCase() === form.businessId.toLowerCase())
    
    if (business) {
      businessFound.value = business
    } else {
      businessFound.value = null
      errors.businessId = 'Business ID not found. Please check and try again.'
    }
  } catch (error) {
    errors.businessId = 'Unable to verify business ID. Please try again.'
  } finally {
    businessValidating.value = false
  }
}

// Validation
const validateForm = () => {
  errors.businessId = ''
  errors.email = ''
  errors.password = ''
  
  if (!form.businessId) {
    errors.businessId = 'Business ID is required'
    return false
  }
  
  if (!businessFound.value) {
    errors.businessId = 'Please enter a valid business ID'
    return false
  }
  
  if (!form.email) {
    errors.email = 'Email is required'
    return false
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }
  
  if (!form.password) {
    errors.password = 'Password is required'
    return false
  }
  
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }
  
  return true
}

// Handle login
const handleLogin = async () => {
  loginError.value = ''
  
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Demo authentication logic with business validation
    const demoUsers = {
      'bistro-downtown': {
        'admin@bistrokeep.com': 'admin123',
        'user@bistrokeep.com': 'user123'
      },
      'acme-corp': {
        'manager@bistrokeep.com': 'manager123',
        'user@bistrokeep.com': 'user123'
      },
      'tech-startup': {
        'admin@bistrokeep.com': 'admin123',
        'dev@bistrokeep.com': 'dev123'
      },
      'demo-business': {
        'demo@bistrokeep.com': 'demo123'
      }
    }
    
    const businessUsers = demoUsers[form.businessId]
    
    if (businessUsers && businessUsers[form.email] && businessUsers[form.email] === form.password) {
      // Store business context (in real app, this would be handled by auth system)
      localStorage.setItem('currentBusiness', JSON.stringify({
        businessId: form.businessId,
        businessName: businessFound.value.name,
        userEmail: form.email
      }))
      
      // Success - redirect to dashboard
      await router.push('/')
    } else {
      loginError.value = 'Invalid credentials for this business. Please check your business ID, email, and password.'
    }
  } catch (error) {
    loginError.value = 'An error occurred. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Fill demo credentials
const fillDemoCredentials = async (type) => {
  if (type === 'admin') {
    form.businessId = 'bistro-downtown'
    form.email = 'admin@bistrokeep.com'
    form.password = 'admin123'
    // Trigger business validation
    await validateBusinessId()
  } else if (type === 'manager') {
    form.businessId = 'acme-corp'
    form.email = 'manager@bistrokeep.com'
    form.password = 'manager123'
    // Trigger business validation
    await validateBusinessId()
  }
  errors.businessId = ''
  errors.email = ''
  errors.password = ''
}

// Clear errors on input
watch(() => form.businessId, () => {
  if (errors.businessId) errors.businessId = ''
  businessFound.value = null
})

watch(() => form.email, () => {
  if (errors.email) errors.email = ''
})

watch(() => form.password, () => {
  if (errors.password) errors.password = ''
})
</script>