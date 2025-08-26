<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="flex items-center">
          <img src="/logo.png" alt="Synthesq" class="w-12 h-12 rounded-xl object-cover" />
          <span class="ml-3 text-2xl font-bold text-neutral-900">Synthesq</span>
        </div>
      </div>
      
      <h2 class="mt-6 text-center text-3xl font-bold text-neutral-900">
        Set new password
      </h2>
      <p class="mt-2 text-center text-sm text-neutral-600">
        Enter your new password below.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card-premium">
        <!-- Success state -->
        <div v-if="passwordReset" class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
            <svg class="h-6 w-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-neutral-900">Password updated</h3>
          <p class="mt-2 text-sm text-neutral-600">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <div class="mt-6">
            <NuxtLink to="/login" class="btn-gradient w-full block text-center">
              Sign in to your account
            </NuxtLink>
          </div>
        </div>

        <!-- Form state -->
        <form v-else class="space-y-6" @submit.prevent="handlePasswordReset">
          <!-- New Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700">
              New Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input pr-10"
                :class="{ 'border-danger-300 focus:ring-danger-500': errors.password }"
                placeholder="Enter new password"
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
            
            <!-- Password strength indicator -->
            <div class="mt-2">
              <div class="flex justify-between text-xs text-neutral-500 mb-1">
                <span>Password strength</span>
                <span>{{ passwordStrength.label }}</span>
              </div>
              <div class="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="passwordStrength.color"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-neutral-700">
              Confirm New Password
            </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="input pr-10"
                :class="{ 'border-danger-300 focus:ring-danger-500': errors.confirmPassword }"
                placeholder="Confirm new password"
              >
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showConfirmPassword" class="h-5 w-5 text-neutral-400 hover:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5 text-neutral-400 hover:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-danger-600">{{ errors.confirmPassword }}</p>
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
              {{ loading ? 'Updating...' : 'Update password' }}
            </button>
          </div>

          <!-- Error message -->
          <div v-if="resetError" class="rounded-md bg-danger-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-danger-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-danger-800">Error</h3>
                <div class="mt-2 text-sm text-danger-700">
                  <p>{{ resetError }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements -->
          <div class="text-xs text-neutral-500">
            <p class="font-medium mb-1">Password requirements:</p>
            <ul class="space-y-1">
              <li class="flex items-center">
                <svg class="h-3 w-3 mr-2" :class="form.password.length >= 8 ? 'text-success-500' : 'text-neutral-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                At least 8 characters
              </li>
              <li class="flex items-center">
                <svg class="h-3 w-3 mr-2" :class="/[A-Z]/.test(form.password) ? 'text-success-500' : 'text-neutral-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                One uppercase letter
              </li>
              <li class="flex items-center">
                <svg class="h-3 w-3 mr-2" :class="/[0-9]/.test(form.password) ? 'text-success-500' : 'text-neutral-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                One number
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center">
      <p class="text-xs text-neutral-500">
        © 2024 Synthesq by TheMessieCompany. All rights reserved.
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
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const resetError = ref('')
const passwordReset = ref(false)
const errors = reactive({
  password: '',
  confirmPassword: ''
})

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.password
  let score = 0
  
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  if (score === 0) return { width: '0%', color: 'bg-neutral-300', label: '' }
  if (score <= 2) return { width: '25%', color: 'bg-danger-500', label: 'Weak' }
  if (score === 3) return { width: '50%', color: 'bg-warning-500', label: 'Fair' }
  if (score === 4) return { width: '75%', color: 'bg-secondary-500', label: 'Good' }
  return { width: '100%', color: 'bg-success-500', label: 'Strong' }
})

// Validation
const validateForm = () => {
  errors.password = ''
  errors.confirmPassword = ''
  
  if (!form.password) {
    errors.password = 'Password is required'
    return false
  }
  
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    return false
  }
  
  if (!/[A-Z]/.test(form.password)) {
    errors.password = 'Password must contain at least one uppercase letter'
    return false
  }
  
  if (!/[0-9]/.test(form.password)) {
    errors.password = 'Password must contain at least one number'
    return false
  }
  
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    return false
  }
  
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    return false
  }
  
  return true
}

// Handle password reset
const handlePasswordReset = async () => {
  resetError.value = ''
  
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Success
    passwordReset.value = true
  } catch (error) {
    resetError.value = 'An error occurred. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Clear errors on input
watch(() => form.password, () => {
  if (errors.password) errors.password = ''
})

watch(() => form.confirmPassword, () => {
  if (errors.confirmPassword) errors.confirmPassword = ''
})
</script>