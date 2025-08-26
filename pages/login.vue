<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-gray-50 to-accent-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="flex items-center">
          <img src="/logo.png" alt="Synthesq" class="w-12 h-12 rounded-xl object-cover" />
          <span class="ml-3 text-2xl font-bold text-gray-900">Synthesq</span>
        </div>
      </div>
      
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
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
            <label for="businessId" class="block text-sm font-medium text-gray-700">
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
                placeholder="Enter your business ID"
              >
            </div>
            <p class="mt-2 text-xs text-gray-500">
              Your unique business identifier (e.g., synthesq-downtown, acme-corp)
            </p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
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
                :class="{ 'border-error-300 focus:ring-error-500': errors.email }"
                placeholder="Enter your email"
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="errors.email" class="h-5 w-5 text-error-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-2 text-sm text-error-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
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
                :class="{ 'border-error-300 focus:ring-error-500': errors.password }"
                placeholder="Enter your password"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-2 text-sm text-error-600">{{ errors.password }}</p>
          </div>

          <!-- Remember me & Forgot password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
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
              class="btn-gradient w-full flex justify-center py-2.5 sm:py-3"
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
          <div v-if="loginError" class="rounded-md bg-error-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-error-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-error-800">Login Failed</h3>
                <div class="mt-2 text-sm text-error-700">
                  <p>{{ loginError }}</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <!-- Demo credentials -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-3">Demo Credentials (Click to auto-fill):</p>
            <div class="grid grid-cols-1 gap-2 text-xs">
              <div 
                v-for="(demo, index) in demoCredentials" 
                :key="index"
                class="bg-gradient-to-r from-gray-50 to-primary-50 rounded-lg p-3 border border-gray-200 hover:border-primary-200 transition-colors"
              >
                <button
                  @click="fillDemoCredentials(demo)"
                  class="text-primary-600 hover:text-primary-700 font-medium block w-full text-left"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-semibold">{{ demo.label }}</span>
                    <div class="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {{ demo.businessId }}
                    </div>
                  </div>
                  <div class="text-gray-600 text-xs mb-1">{{ demo.email }}</div>
                  <div class="text-gray-500 text-xs">{{ demo.description }}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center">
      <p class="text-xs text-gray-500">
        © 2024 Synthesq by TheMessieCompany. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { DEMO_CREDENTIALS } from '~/utils/mockAuth.js'

// Set layout to false to use custom layout
definePageMeta({
  layout: false
})

const router = useRouter()
const demoCredentials = DEMO_CREDENTIALS

// Form state
const form = reactive({
  businessId: '',
  email: '',
  password: '',
  remember: false
})

// Pre-populate business ID from localStorage if available
onMounted(() => {
  if (process.client) {
    const storedBusinessId = localStorage.getItem('business_id')
    if (storedBusinessId) {
      form.businessId = storedBusinessId
    }
  }
})

const showPassword = ref(false)
const loading = ref(false)
const loginError = ref('')
const errors = reactive({
  email: '',
  password: ''
})


// Validation
const validateForm = () => {
  errors.email = ''
  errors.password = ''
  
  if (!form.businessId) {
    loginError.value = 'Business ID is required'
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

// Auth store and notifications
const authStore = useAuthStore()
const { success, error: notifyError } = useNotifications()

// Handle login
const handleLogin = async () => {
  loginError.value = ''
  
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    const result = await authStore.login({
      business_id: form.businessId,
      email: form.email,
      password: form.password
    })
    
    if (result.success) {
      success(
        'Welcome back!',
        `Successfully signed in as ${result.user.name}`,
        { duration: 3000 }
      )
      await router.push('/')
    } else {
      loginError.value = result.error || 'Invalid credentials. Please check your business ID, email, and password.'
    }
  } catch (error) {
    console.error('Login error:', error)
    loginError.value = 'An error occurred. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Fill demo credentials
const fillDemoCredentials = async (demo) => {
  form.businessId = demo.businessId
  form.email = demo.email
  form.password = demo.password
  
  errors.email = ''
  errors.password = ''
  loginError.value = ''
}

// Clear errors on input and update localStorage for business ID
watch(() => form.businessId, (newBusinessId) => {
  // Update localStorage when business ID changes
  if (process.client && newBusinessId) {
    localStorage.setItem('business_id', newBusinessId)
  }
})

watch(() => form.email, () => {
  if (errors.email) errors.email = ''
})

watch(() => form.password, () => {
  if (errors.password) errors.password = ''
})
</script>