<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-2 text-white">Extension Store</h1>
          <p class="text-violet-100">Transform your CRM with industry-specific extensions</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <div class="text-2xl font-bold">3</div>
            <div class="text-violet-200 text-sm">Active Extensions</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search extensions..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select v-model="selectedCategory" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500">
          <option value="">All Categories</option>
          <option value="healthcare">Healthcare</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="real-estate">Real Estate</option>
          <option value="financial">Financial Services</option>
          <option value="education">Education</option>
          <option value="hospitality">Hospitality</option>
        </select>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-600">{{ filteredExtensions.length }} extensions</span>
        <button
          @click="showCustomExtensionModal = true"
          class="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Request Custom Extension</span>
        </button>
      </div>
    </div>

    <!-- Featured Extensions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="extension in filteredExtensions"
        :key="extension.id"
        class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-6"
      >
        <!-- Extension Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div :class="extension.iconClass" class="w-12 h-12 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="extension.icon"></svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ extension.name }}</h3>
              <p class="text-sm text-gray-500">by {{ extension.developer }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span v-if="extension.installed" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              Active
            </span>
            <span v-else class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {{ extension.price }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm mb-4">{{ extension.description }}</p>

        <!-- Features -->
        <div class="mb-4">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="feature in extension.features"
              :key="feature"
              class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {{ feature }}
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{{ extension.rating }}</span>
            </div>
            <span>{{ extension.downloads }} downloads</span>
          </div>
        </div>

        <!-- Action Button -->
        <button
          v-if="extension.installed"
          disabled
          class="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium"
        >
          ✓ Installed
        </button>
        <button
          v-else
          @click="installExtension(extension)"
          class="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Install Extension
        </button>
      </div>
    </div>

    <!-- Custom Extension Request Modal -->
    <div v-if="showCustomExtensionModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Request Custom Extension</h2>
            <p class="text-sm text-gray-600 mt-1">Tell us about your specific industry needs and we'll build a custom extension for you</p>
          </div>
          <button 
            @click="showCustomExtensionModal = false"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <form @submit.prevent="submitCustomExtensionRequest" class="p-6 space-y-6">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
              <input
                v-model="customExtensionForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input
                v-model="customExtensionForm.company"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Acme Corporation"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                v-model="customExtensionForm.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="john@acme.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
              <select
                v-model="customExtensionForm.industry"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="">Select your industry</option>
                <option value="agriculture">Agriculture</option>
                <option value="automotive">Automotive</option>
                <option value="construction">Construction</option>
                <option value="consulting">Consulting</option>
                <option value="entertainment">Entertainment</option>
                <option value="food-beverage">Food & Beverage</option>
                <option value="government">Government</option>
                <option value="insurance">Insurance</option>
                <option value="logistics">Logistics & Transportation</option>
                <option value="nonprofit">Non-Profit</option>
                <option value="pharmaceuticals">Pharmaceuticals</option>
                <option value="telecommunications">Telecommunications</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Extension Details -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Extension Name *</label>
            <input
              v-model="customExtensionForm.extensionName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="e.g., Agriculture Management Suite"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Business Requirements *</label>
            <textarea
              v-model="customExtensionForm.requirements"
              required
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Describe your specific business processes, workflows, and features you need. Be as detailed as possible..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Current Software/Systems</label>
            <textarea
              v-model="customExtensionForm.currentSystems"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="List any existing software or systems that need integration (optional)"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
              <select
                v-model="customExtensionForm.teamSize"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="">Select team size</option>
                <option value="1-10">1-10 users</option>
                <option value="11-50">11-50 users</option>
                <option value="51-100">51-100 users</option>
                <option value="101-500">101-500 users</option>
                <option value="500+">500+ users</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Timeline</label>
              <select
                v-model="customExtensionForm.timeline"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                <option value="1-2 months">1-2 months</option>
                <option value="3-4 months">3-4 months</option>
                <option value="5-6 months">5-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
            <select
              v-model="customExtensionForm.budget"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Select budget range (optional)</option>
              <option value="< $5,000">Less than $5,000</option>
              <option value="$5,000 - $15,000">$5,000 - $15,000</option>
              <option value="$15,000 - $50,000">$15,000 - $50,000</option>
              <option value="$50,000 - $100,000">$50,000 - $100,000</option>
              <option value="$100,000+">$100,000+</option>
            </select>
          </div>

          <!-- Priority Features -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Priority Features (select up to 5)</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label
                v-for="feature in availableFeatures"
                :key="feature.value"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="feature.value"
                  v-model="customExtensionForm.priorityFeatures"
                  :disabled="customExtensionForm.priorityFeatures.length >= 5 && !customExtensionForm.priorityFeatures.includes(feature.value)"
                  class="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span class="text-sm text-gray-700">{{ feature.label }}</span>
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="text-sm text-gray-500">
              * Required fields. We'll respond within 2 business days.
            </div>
            <div class="flex items-center space-x-3">
              <button
                type="button"
                @click="showCustomExtensionModal = false"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="!isFormValid"
                class="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Demo extensions data
const extensions = ref([
  {
    id: 1,
    name: 'Healthcare Suite',
    developer: 'Synthesq Health',
    description: 'HIPAA-compliant patient management, appointment scheduling, and medical billing integration.',
    category: 'healthcare',
    price: '$49/month',
    rating: 4.9,
    downloads: '12.5k',
    installed: true,
    iconClass: 'bg-gradient-to-br from-red-400 to-pink-500',
    features: ['HIPAA Compliance', 'Patient Portal', 'Appointment Scheduling', 'Medical Billing', 'EHR Integration'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />'
  },
  {
    id: 2,
    name: 'Manufacturing Pro',
    developer: 'Industrial Solutions',
    description: 'Production planning, quality control, and supply chain management for manufacturers.',
    category: 'manufacturing',
    price: '$89/month',
    rating: 4.8,
    downloads: '8.2k',
    installed: true,
    iconClass: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    features: ['Production Planning', 'Quality Control', 'Supply Chain', 'Inventory Tracking', 'Equipment Maintenance'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />'
  },
  {
    id: 3,
    name: 'Real Estate Plus',
    developer: 'PropTech Solutions',
    description: 'Property listings, client management, and transaction tracking for real estate professionals.',
    category: 'real-estate',
    price: '$39/month',
    rating: 4.7,
    downloads: '15.3k',
    installed: true,
    iconClass: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    features: ['Property Listings', 'Lead Management', 'Transaction Tracking', 'Document Management', 'Market Analysis'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />'
  },
  {
    id: 4,
    name: 'Financial Services',
    developer: 'FinTech Pro',
    description: 'Compliance tracking, risk management, and client portfolio management for financial advisors.',
    category: 'financial',
    price: '$69/month',
    rating: 4.6,
    downloads: '6.8k',
    installed: false,
    iconClass: 'bg-gradient-to-br from-amber-400 to-orange-500',
    features: ['Portfolio Management', 'Risk Assessment', 'Compliance Tracking', 'Client Reporting', 'Market Integration'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />'
  },
  {
    id: 5,
    name: 'Education Management',
    developer: 'EduTech Systems',
    description: 'Student information management, course tracking, and parent communication for educational institutions.',
    category: 'education',
    price: '$29/month',
    rating: 4.5,
    downloads: '22.1k',
    installed: false,
    iconClass: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    features: ['Student Records', 'Grade Management', 'Parent Portal', 'Attendance Tracking', 'Course Scheduling'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />'
  },
  {
    id: 6,
    name: 'Hospitality Suite',
    developer: 'Hotel Solutions',
    description: 'Reservation management, guest services, and event coordination for hotels and restaurants.',
    category: 'hospitality',
    price: '$59/month',
    rating: 4.4,
    downloads: '9.7k',
    installed: false,
    iconClass: 'bg-gradient-to-br from-rose-400 to-pink-500',
    features: ['Reservation System', 'Guest Management', 'Event Planning', 'Billing Integration', 'Service Tracking'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />'
  },
  {
    id: 7,
    name: 'Legal Practice',
    developer: 'LegalTech Inc',
    description: 'Case management, time tracking, and client communication for law firms.',
    category: 'legal',
    price: '$79/month',
    rating: 4.3,
    downloads: '4.2k',
    installed: false,
    iconClass: 'bg-gradient-to-br from-slate-500 to-gray-600',
    features: ['Case Management', 'Time Tracking', 'Document Management', 'Client Portal', 'Billing Integration'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />'
  },
  {
    id: 8,
    name: 'Retail Management',
    developer: 'Retail Solutions',
    description: 'Point of sale, inventory management, and customer loyalty programs for retail stores.',
    category: 'retail',
    price: '$45/month',
    rating: 4.6,
    downloads: '18.9k',
    installed: false,
    iconClass: 'bg-gradient-to-br from-green-500 to-emerald-600',
    features: ['POS System', 'Inventory Management', 'Loyalty Programs', 'Sales Analytics', 'Multi-Location Support'],
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />'
  }
])

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('')

// Custom extension modal state
const showCustomExtensionModal = ref(false)
const customExtensionForm = ref({
  name: '',
  company: '',
  email: '',
  industry: '',
  extensionName: '',
  requirements: '',
  currentSystems: '',
  teamSize: '',
  timeline: '',
  budget: '',
  priorityFeatures: []
})

// Available features for selection
const availableFeatures = ref([
  { label: 'Custom Workflows', value: 'workflows' },
  { label: 'API Integration', value: 'api' },
  { label: 'Custom Reports', value: 'reports' },
  { label: 'Mobile App', value: 'mobile' },
  { label: 'Third-party Sync', value: 'sync' },
  { label: 'Advanced Analytics', value: 'analytics' },
  { label: 'Custom Fields', value: 'fields' },
  { label: 'Automation Rules', value: 'automation' },
  { label: 'User Roles', value: 'roles' },
  { label: 'Document Management', value: 'documents' },
  { label: 'Email Integration', value: 'email' },
  { label: 'Calendar Sync', value: 'calendar' },
  { label: 'Compliance Features', value: 'compliance' },
  { label: 'Multi-language', value: 'i18n' },
  { label: 'Data Import/Export', value: 'data-transfer' }
])

// Computed filtered extensions
const filteredExtensions = computed(() => {
  let filtered = extensions.value

  if (searchQuery.value) {
    filtered = filtered.filter(ext => 
      ext.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ext.features.some(feature => feature.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(ext => ext.category === selectedCategory.value)
  }

  return filtered
})

// Form validation
const isFormValid = computed(() => {
  return customExtensionForm.value.name &&
         customExtensionForm.value.company &&
         customExtensionForm.value.email &&
         customExtensionForm.value.industry &&
         customExtensionForm.value.extensionName &&
         customExtensionForm.value.requirements
})

// Notifications composable
const { success, info } = useNotifications()

// Install extension method
const installExtension = (extension) => {
  extension.installed = true
  success(
    'Extension Installed!',
    `${extension.name} has been successfully installed and activated.`,
    { duration: 3000 }
  )
}

// Submit custom extension request
const submitCustomExtensionRequest = () => {
  // In a real application, this would send the data to your backend
  console.log('Custom Extension Request:', customExtensionForm.value)
  
  success(
    'Request Submitted!',
    `Thank you ${customExtensionForm.value.name}! We've received your custom extension request and will contact you within 2 business days.`,
    { duration: 5000 }
  )
  
  // Reset form and close modal
  showCustomExtensionModal.value = false
  customExtensionForm.value = {
    name: '',
    company: '',
    email: '',
    industry: '',
    extensionName: '',
    requirements: '',
    currentSystems: '',
    teamSize: '',
    timeline: '',
    budget: '',
    priorityFeatures: []
  }
}

// Set page meta
definePageMeta({
  title: 'Extension Store'
})
</script>