<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div class="flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span class="text-lg font-medium text-neutral-700">Loading lead details...</span>
        </div>
      </div>
    </div>

    <!-- Lead View -->
    <div v-else>
      <!-- Floating Header with Glassmorphism -->
      <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <NuxtLink to="/leads" class="group p-2 rounded-xl text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">{{ lead.title }}</h1>
                <p class="text-neutral-500 mt-1">{{ lead.company }} • {{ lead.contactName }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <NuxtLink :to="`/leads/${leadId}/edit`" class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:text-primary-900 hover:bg-primary-50 transition-all duration-200 hover:shadow-md">
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Lead
                </div>
              </NuxtLink>
              <button 
                @click="convertToCustomer"
                class="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  Convert to Customer
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-12 gap-8">
          <!-- Lead Details -->
          <div class="col-span-12 lg:col-span-8 space-y-6">
            <!-- Lead Overview -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <div class="flex items-start space-x-6">
                <!-- Lead Icon -->
                <div class="flex-shrink-0">
                  <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>

                <!-- Lead Info -->
                <div class="flex-1 space-y-4">
                  <div>
                    <h2 class="text-2xl font-bold text-neutral-900">{{ lead.title }}</h2>
                    <p class="text-neutral-600 mt-1">{{ lead.description || 'No description available' }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Pipeline Stage</span>
                      <div class="mt-1">
                        <span 
                          :class="getStageClass(lead.stage)"
                          class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                        >
                          {{ formatStage(lead.stage) }}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Lead Source</span>
                      <p class="text-neutral-900 font-medium">{{ lead.source }}</p>
                    </div>
                  </div>

                  <!-- Opportunity Value -->
                  <div class="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
                    <div class="text-center">
                      <span class="text-sm font-medium text-neutral-500">Deal Value</span>
                      <p class="text-2xl font-bold text-primary-600">${{ formatCurrency(lead.value) }}</p>
                    </div>
                    <div class="text-center">
                      <span class="text-sm font-medium text-neutral-500">Probability</span>
                      <p class="text-xl font-semibold text-neutral-700">{{ lead.probability }}%</p>
                    </div>
                    <div class="text-center">
                      <span class="text-sm font-medium text-neutral-500">Weighted Value</span>
                      <p class="text-xl font-semibold text-green-600">${{ formatCurrency(weightedValue) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline & Progress -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Timeline & Progress
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Expected Close Date -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-blue-600 font-medium text-sm">Expected Close</p>
                      <p class="text-2xl font-bold text-blue-800">{{ formatDate(lead.expectedCloseDate) }}</p>
                      <p class="text-blue-600 text-sm">{{ daysToClose }} days</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Days in Pipeline -->
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-amber-600 font-medium text-sm">Days in Pipeline</p>
                      <p class="text-2xl font-bold text-amber-800">{{ daysInPipeline }}</p>
                      <p class="text-amber-600 text-sm">since creation</p>
                    </div>
                    <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Last Activity -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-green-600 font-medium text-sm">Last Activity</p>
                      <p class="text-xl font-bold text-green-800">{{ daysSinceActivity }}</p>
                      <p class="text-green-600 text-sm">days ago</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Progress Indicator -->
              <div class="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-neutral-600">Pipeline Progress</span>
                  <span class="text-sm font-medium text-neutral-900">{{ lead.probability }}%</span>
                </div>
                <div class="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${lead.probability}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Contact Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Contact Name</span>
                    <p class="text-neutral-900 font-medium">{{ lead.contactName }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Email</span>
                    <p class="text-neutral-900 font-medium">{{ lead.email }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Phone</span>
                    <p class="text-neutral-900 font-medium">{{ lead.phone || 'Not provided' }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Company</span>
                    <p class="text-neutral-900 font-medium">{{ lead.company }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Title</span>
                    <p class="text-neutral-900 font-medium">{{ lead.title || 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Industry</span>
                    <p class="text-neutral-900 font-medium">{{ lead.industry || 'Not specified' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-span-12 lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <!-- Quick Actions -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Quick Actions</h3>
                <div class="space-y-3">
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Send Email</span>
                  </button>
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-secondary-300 hover:bg-secondary-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-secondary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Schedule Call</span>
                  </button>
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Add Task</span>
                  </button>
                </div>
              </div>

              <!-- Lead Metrics -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Lead Metrics</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Created</span>
                    <span class="font-semibold text-neutral-900">{{ formatDate(lead.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Last Activity</span>
                    <span class="font-semibold text-neutral-900">{{ formatDate(lead.lastActivity) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Engagement Score</span>
                    <span class="font-semibold text-primary-600">{{ lead.engagementScore || 0 }}/100</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Follow-ups</span>
                    <span class="font-semibold text-neutral-900">{{ lead.followUps || 0 }}</span>
                  </div>
                </div>
              </div>

              <!-- Recent Notes -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Recent Notes</h3>
                <div class="space-y-3">
                  <div v-for="note in recentNotes" :key="note.id" class="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <p class="text-sm text-neutral-900">{{ note.content }}</p>
                    <p class="text-xs text-neutral-500 mt-1">{{ formatDate(note.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

const leadId = route.params.id
const loading = ref(true)

// Lead data
const lead = ref({})

// Mock recent notes
const recentNotes = ref([
  { id: 1, content: 'Had a great call with the decision maker. They are very interested in our enterprise solution.', date: '2024-01-20' },
  { id: 2, content: 'Sent detailed proposal and pricing information. Following up next week.', date: '2024-01-18' },
  { id: 3, content: 'Initial discovery call completed. Good fit for our services.', date: '2024-01-15' },
])

// Load lead data
onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock lead data
    lead.value = {
      id: leadId,
      title: 'Enterprise CRM Implementation',
      description: 'Large enterprise client looking to implement comprehensive CRM solution with custom integrations and training.',
      company: 'Global Manufacturing Corp',
      contactName: 'Michael Rodriguez',
      email: 'michael.rodriguez@globalmanufacturing.com',
      phone: '+1 (555) 987-6543',
      title: 'IT Director',
      industry: 'Manufacturing',
      source: 'Website Form',
      stage: 'proposal',
      value: 150000,
      probability: 75,
      expectedCloseDate: '2024-02-15',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-20',
      engagementScore: 85,
      followUps: 6
    }
  } catch (error) {
    console.error('Error loading lead:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties
const weightedValue = computed(() => {
  return (lead.value.value * lead.value.probability / 100)
})

const daysToClose = computed(() => {
  if (!lead.value.expectedCloseDate) return 0
  const today = new Date()
  const closeDate = new Date(lead.value.expectedCloseDate)
  const diffTime = closeDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
})

const daysInPipeline = computed(() => {
  if (!lead.value.createdAt) return 0
  const today = new Date()
  const createdDate = new Date(lead.value.createdAt)
  const diffTime = today - createdDate
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
})

const daysSinceActivity = computed(() => {
  if (!lead.value.lastActivity) return 0
  const today = new Date()
  const activityDate = new Date(lead.value.lastActivity)
  const diffTime = today - activityDate
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
})

// Helper functions
const getStageClass = (stage) => {
  const classes = {
    lead: 'bg-blue-100 text-blue-800',
    qualified: 'bg-indigo-100 text-indigo-800',
    proposal: 'bg-amber-100 text-amber-800',
    negotiation: 'bg-orange-100 text-orange-800',
    closed_won: 'bg-green-100 text-green-800',
    closed_lost: 'bg-red-100 text-red-800'
  }
  return classes[stage] || 'bg-neutral-100 text-neutral-800'
}

const formatStage = (stage) => {
  const stages = {
    lead: 'Lead',
    qualified: 'Qualified',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    closed_won: 'Closed Won',
    closed_lost: 'Closed Lost'
  }
  return stages[stage] || stage
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Actions
const convertToCustomer = async () => {
  try {
    // Simulate conversion
    await new Promise(resolve => setTimeout(resolve, 1000))
    await router.push(`/customers/add?lead=${leadId}`)
  } catch (error) {
    console.error('Error converting lead:', error)
  }
}
</script>