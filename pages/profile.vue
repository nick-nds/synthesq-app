<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Profile</h2>
        <p class="text-sm text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="isEditing = !isEditing"
          :class="isEditing ? 'btn-secondary' : 'btn-primary'"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isEditing" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {{ isEditing ? 'Cancel' : 'Edit Profile' }}
        </button>
        <button 
          v-if="isEditing" 
          @click="saveProfile"
          class="btn-primary"
          :disabled="isSaving"
        >
          <svg v-if="isSaving" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Overview -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="text-center">
            <!-- Profile Avatar -->
            <div class="relative inline-block">
              <div class="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span class="text-primary-600 font-bold text-2xl">{{ userInitials }}</span>
              </div>
              <button 
                v-if="isEditing" 
                class="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                @click="uploadAvatar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ authStore.user?.name || 'User Name' }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ authStore.user?.email || 'user@example.com' }}</p>
            
            <!-- Status Badge -->
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 mb-4">
              <svg class="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
              </svg>
              Active
            </span>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4 mt-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ accountStats.daysActive }}</div>
                <div class="text-xs text-gray-600">Days Active</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ accountStats.lastLogin }}</div>
                <div class="text-xs text-gray-600">Last Login</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Summary -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Account Summary</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Account Type</span>
              <span class="text-sm font-medium text-gray-900">{{ accountInfo.type }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Business ID</span>
              <span class="text-sm font-medium text-gray-900">{{ accountInfo.businessId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Role</span>
              <span class="text-sm font-medium text-gray-900">{{ accountInfo.role }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Member Since</span>
              <span class="text-sm font-medium text-gray-900">{{ formatDate(accountInfo.memberSince) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Information -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-6">Personal Information</h4>
          
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- First Name -->
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  id="firstName"
                  v-model="profileForm.firstName"
                  type="text"
                  :disabled="!isEditing"
                  :class="[
                    'input',
                    !isEditing && 'bg-gray-50 cursor-not-allowed'
                  ]"
                  required
                >
              </div>

              <!-- Last Name -->
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  id="lastName"
                  v-model="profileForm.lastName"
                  type="text"
                  :disabled="!isEditing"
                  :class="[
                    'input',
                    !isEditing && 'bg-gray-50 cursor-not-allowed'
                  ]"
                  required
                >
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  id="email"
                  v-model="profileForm.email"
                  type="email"
                  :disabled="!isEditing"
                  :class="[
                    'input',
                    !isEditing && 'bg-gray-50 cursor-not-allowed'
                  ]"
                  required
                >
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  id="phone"
                  v-model="profileForm.phone"
                  type="tel"
                  :disabled="!isEditing"
                  :class="[
                    'input',
                    !isEditing && 'bg-gray-50 cursor-not-allowed'
                  ]"
                >
              </div>

              <!-- Job Title -->
              <div>
                <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  id="jobTitle"
                  v-model="profileForm.jobTitle"
                  type="text"
                  :disabled="!isEditing"
                  :class="[
                    'input',
                    !isEditing && 'bg-gray-50 cursor-not-allowed'
                  ]"
                >
              </div>

              <!-- Department -->
              <div>
                <label for="department" class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  id="department"
                  v-model="profileForm.department"
                  :disabled="!isEditing"
                  :class="[
                    'input',
                    !isEditing && 'bg-gray-50 cursor-not-allowed'
                  ]"
                >
                  <option value="">Select Department</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                  <option value="it">Information Technology</option>
                </select>
              </div>
            </div>

            <!-- Bio -->
            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                id="bio"
                v-model="profileForm.bio"
                rows="4"
                :disabled="!isEditing"
                :class="[
                  'input resize-none',
                  !isEditing && 'bg-gray-50 cursor-not-allowed'
                ]"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Preferences -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-6">Preferences</h4>
          
          <div class="space-y-6">
            <!-- Timezone -->
            <div>
              <label for="timezone" class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                id="timezone"
                v-model="profileForm.timezone"
                :disabled="!isEditing"
                :class="[
                  'input',
                  !isEditing && 'bg-gray-50 cursor-not-allowed'
                ]"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
              </select>
            </div>

            <!-- Language -->
            <div>
              <label for="language" class="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                id="language"
                v-model="profileForm.language"
                :disabled="!isEditing"
                :class="[
                  'input',
                  !isEditing && 'bg-gray-50 cursor-not-allowed'
                ]"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <!-- Date Format -->
            <div>
              <label for="dateFormat" class="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select
                id="dateFormat"
                v-model="profileForm.dateFormat"
                :disabled="!isEditing"
                :class="[
                  'input',
                  !isEditing && 'bg-gray-50 cursor-not-allowed'
                ]"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <!-- Notification Settings -->
            <div class="space-y-4">
              <h5 class="font-medium text-gray-900">Email Notifications</h5>
              
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="profileForm.notifications.emailDigest"
                    :disabled="!isEditing"
                    class="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                  >
                  <span class="ml-2 text-sm text-gray-700">Daily email digest</span>
                </label>
                
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="profileForm.notifications.taskReminders"
                    :disabled="!isEditing"
                    class="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                  >
                  <span class="ml-2 text-sm text-gray-700">Task reminders</span>
                </label>
                
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="profileForm.notifications.leadAlerts"
                    :disabled="!isEditing"
                    class="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                  >
                  <span class="ml-2 text-sm text-gray-700">New lead alerts</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-6">Security Settings</h4>
          
          <div class="space-y-6">
            <!-- Password Change -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h5 class="font-medium text-gray-900">Password</h5>
                  <p class="text-sm text-gray-600">Last changed 3 months ago</p>
                </div>
                <button
                  @click="showPasswordForm = !showPasswordForm"
                  class="btn-secondary"
                >
                  Change Password
                </button>
              </div>
              
              <div v-if="showPasswordForm" class="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    id="currentPassword"
                    v-model="passwordForm.currentPassword"
                    type="password"
                    class="input"
                    required
                  >
                </div>
                
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    id="newPassword"
                    v-model="passwordForm.newPassword"
                    type="password"
                    class="input"
                    required
                  >
                </div>
                
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    class="input"
                    required
                  >
                </div>
                
                <div class="flex gap-2">
                  <button
                    @click="changePassword"
                    class="btn-primary"
                    :disabled="isChangingPassword"
                  >
                    {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
                  </button>
                  <button
                    @click="showPasswordForm = false"
                    class="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <!-- Two-Factor Authentication -->
            <div class="border-t pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h5 class="font-medium text-gray-900">Two-Factor Authentication</h5>
                  <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="profileForm.twoFactorEnabled"
                    :disabled="!isEditing"
                    class="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                  >
                  <span class="ml-2 text-sm font-medium text-gray-900">{{ profileForm.twoFactorEnabled ? 'Enabled' : 'Disabled' }}</span>
                </label>
              </div>
            </div>

            <!-- Login Sessions -->
            <div class="border-t pt-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h5 class="font-medium text-gray-900">Active Sessions</h5>
                  <p class="text-sm text-gray-600">Manage your login sessions across devices</p>
                </div>
                <button class="btn-secondary">
                  View All Sessions
                </button>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Chrome on Windows</p>
                      <p class="text-xs text-gray-600">Current session • Last active now</p>
                    </div>
                  </div>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    Current
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccessMessage" class="fixed bottom-4 right-4 bg-success-100 border border-success-200 text-success-800 px-4 py-3 rounded-lg shadow-lg z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Profile updated successfully!
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

// Reactive data
const isEditing = ref(false)
const isSaving = ref(false)
const showPasswordForm = ref(false)
const isChangingPassword = ref(false)
const showSuccessMessage = ref(false)

// Profile form data
const profileForm = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@synthesq.com',
  phone: '+1 (555) 123-4567',
  jobTitle: 'Sales Manager',
  department: 'sales',
  bio: 'Experienced sales professional with a passion for building client relationships and driving revenue growth.',
  timezone: 'UTC-5',
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  notifications: {
    emailDigest: true,
    taskReminders: true,
    leadAlerts: false
  },
  twoFactorEnabled: false
})

// Password form data
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Account info and stats
const accountInfo = reactive({
  type: 'Professional',
  businessId: 'BIZ-123456',
  role: 'Admin',
  memberSince: '2023-01-15'
})

const accountStats = reactive({
  daysActive: '245',
  lastLogin: '2 hrs ago'
})

// Computed properties
const userInitials = computed(() => {
  const firstName = profileForm.firstName || 'J'
  const lastName = profileForm.lastName || 'D'
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
})

// Methods
const saveProfile = async () => {
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    isEditing.value = false
    showSuccessMessage.value = true
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isSaving.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  
  isChangingPassword.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    showPasswordForm.value = false
    
    alert('Password changed successfully!')
    
  } catch (error) {
    console.error('Error changing password:', error)
    alert('Error changing password')
  } finally {
    isChangingPassword.value = false
  }
}

const uploadAvatar = () => {
  // Simulate file upload
  console.log('Upload avatar functionality')
  alert('Avatar upload functionality would be implemented here')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Initialize form with user data
onMounted(() => {
  if (authStore.user?.name) {
    const nameParts = authStore.user.name.split(' ')
    profileForm.firstName = nameParts[0] || 'John'
    profileForm.lastName = nameParts.slice(1).join(' ') || 'Doe'
  }
  
  if (authStore.user?.email) {
    profileForm.email = authStore.user.email
  }
})
</script>