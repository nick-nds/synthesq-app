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
        Reset your password
      </h2>
      <p class="mt-2 text-center text-sm text-neutral-600">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card-premium">
        <!-- Success state -->
        <div v-if="emailSent" class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
            <svg class="h-6 w-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-neutral-900">Check your email</h3>
          <p class="mt-2 text-sm text-neutral-600">
            We've sent a password reset link to <strong>{{ form.email }}</strong>
          </p>
          <p class="mt-1 text-xs text-neutral-500">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div class="mt-6 space-y-3">
            <button
              @click="resetForm"
              class="btn-secondary w-full"
            >
              Try another email
            </button>
            <NuxtLink to="/login" class="btn-gradient w-full block text-center">
              Back to sign in
            </NuxtLink>
          </div>
        </div>

        <!-- Form state -->
        <form v-else class="space-y-6" @submit.prevent="handleReset">
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
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="errors.businessId" class="h-5 w-5 text-danger-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.businessId" class="mt-2 text-sm text-danger-600">{{ errors.businessId }}</p>
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
                placeholder="Enter your email address"
              >
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="errors.email" class="h-5 w-5 text-danger-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-2 text-sm text-danger-600">{{ errors.email }}</p>
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
              {{ loading ? 'Sending...' : 'Send reset link' }}
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

          <!-- Back to login -->
          <div class="text-center">
            <NuxtLink to="/login" class="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
              ← Back to sign in
            </NuxtLink>
          </div>
        </form>

        <!-- Security note -->
        <div v-if="!emailSent" class="mt-6 pt-6 border-t border-neutral-200">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-xs text-neutral-600">
                For security reasons, we'll only send reset instructions to email addresses associated with BistroKeep accounts.
              </p>
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

// Form state
const form = reactive({
  businessId: '',
  email: ''
})

const loading = ref(false)
const resetError = ref('')
const emailSent = ref(false)
const errors = reactive({
  businessId: '',
  email: ''
})

// Validation
const validateForm = () => {
  errors.businessId = ''
  errors.email = ''
  
  if (!form.businessId) {
    errors.businessId = 'Business ID is required'
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
  
  return true
}

// Handle password reset
const handleReset = async () => {
  resetError.value = ''
  
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Demo logic - always succeed for known emails
    const knownEmails = [
      'admin@bistrokeep.com',
      'manager@bistrokeep.com',
      'user@bistrokeep.com'
    ]
    
    if (knownEmails.includes(form.email) || form.email.endsWith('@bistrokeep.com')) {
      emailSent.value = true
    } else {
      // For demo purposes, we'll still "send" the email but with a note
      emailSent.value = true
    }
  } catch (error) {
    resetError.value = 'An error occurred. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Reset form
const resetForm = () => {
  emailSent.value = false
  form.businessId = ''
  form.email = ''
  errors.businessId = ''
  errors.email = ''
  resetError.value = ''
}

// Clear errors on input
watch(() => form.businessId, () => {
  if (errors.businessId) errors.businessId = ''
})

watch(() => form.email, () => {
  if (errors.email) errors.email = ''
})
</script>