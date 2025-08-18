<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Leads</h2>
        <p class="text-sm text-gray-600 mt-1">Track and manage your sales leads through the pipeline</p>
      </div>
    </div>

    <!-- Header with KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Leads</p>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.totalLeads }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+12% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Qualified</p>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.qualified }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ kpis.qualificationRate }}% qualification rate</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">In Pipeline</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(kpis.pipelineValue) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ kpis.qualified }} opportunities</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Conversion</p>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.conversionRate }}%</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">-2% from target</p>
      </div>
    </div>

    <!-- View Toggle and Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center space-x-4">
        <button 
          @click="viewMode = 'pipeline'" 
          :class="viewMode === 'pipeline' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
          class="text-sm"
        >
          Pipeline View
        </button>
        <span class="text-gray-400">|</span>
        <button 
          @click="viewMode = 'list'" 
          :class="viewMode === 'list' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
          class="text-sm"
        >
          List View
        </button>
      </div>
      <button class="btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Lead
      </button>
    </div>

    <!-- Pipeline View -->
    <div v-if="viewMode === 'pipeline'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Sales Pipeline</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div v-for="stageData in leadsByStage" :key="stageData.stage" class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900 capitalize">{{ formatStageName(stageData.stage) }}</h4>
            <span class="text-sm text-gray-500">{{ stageData.leads.length }} leads</span>
          </div>
          <div class="space-y-3">
            <div 
              v-for="lead in stageData.leads" 
              :key="lead.id" 
              :class="[
                'bg-white rounded-lg p-3 border cursor-pointer hover:shadow-sm transition-shadow',
                getStageCardBorder(stageData.stage)
              ]"
              @click="selectLead(lead)"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-900">{{ lead.company }}</span>
                <div class="flex items-center space-x-2">
                  <span v-if="lead.priority === 'hot'" class="text-xs text-warning-600 font-medium">Hot</span>
                  <span class="text-xs text-gray-500">{{ lead.lastActivity }}</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mb-2">{{ lead.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-gray-900">{{ formatCurrency(lead.value) }}</span>
                <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <span class="text-xs text-primary-600">{{ lead.assigned }}</span>
                </div>
              </div>
              <div v-if="lead.stage === 'closed-won'" class="flex items-center justify-end mt-2">
                <svg class="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="lead in mockLeads" :key="lead.id" class="hover:bg-gray-50 cursor-pointer" @click="selectLead(lead)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-sm">{{ lead.company.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ lead.company }}</div>
                    <div class="text-sm text-gray-500">{{ lead.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ lead.contact }}</div>
                <div class="text-sm text-gray-500">{{ lead.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(lead.stage)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStageName(lead.stage) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(lead.value) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-gray-900">{{ lead.probability }}%</span>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                      :style="`width: ${lead.probability}%`"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ lead.source }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                  <span class="text-xs text-accent-600 font-medium">{{ lead.assigned }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Demo Data Notice -->
    <div class="bg-warning-50 border border-warning-200 rounded-lg p-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-warning-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="text-sm font-medium text-warning-800">Demo Data Active</h4>
          <p class="text-sm text-warning-700 mt-1">This page is displaying mock data for demonstration purposes. Real functionality will be available when the backend is integrated.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { mockLeads, getLeadKPIs, getLeadsByStage, formatCurrency, getStatusColor } = useMockCRM()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const viewMode = ref('pipeline')
const selectedLead = ref(null)

// Computed properties
const kpis = computed(() => getLeadKPIs())
const leadsByStage = computed(() => getLeadsByStage())

// Methods
const selectLead = (lead) => {
  selectedLead.value = lead
  console.log('Selected lead:', lead)
}

const formatStageName = (stage) => {
  const stageNames = {
    'new': 'New',
    'qualified': 'Qualified', 
    'proposal': 'Proposal',
    'negotiation': 'Negotiation',
    'closed-won': 'Closed Won',
    'closed-lost': 'Closed Lost'
  }
  return stageNames[stage] || stage
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'new': 'bg-gray-100 text-gray-800',
    'qualified': 'bg-primary-100 text-primary-800',
    'proposal': 'bg-warning-100 text-warning-800',
    'negotiation': 'bg-accent-100 text-accent-800',
    'closed-won': 'bg-success-100 text-success-800',
    'closed-lost': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStageCardBorder = (stage) => {
  const borderClasses = {
    'new': 'border-gray-200',
    'qualified': 'border-primary-200',
    'proposal': 'border-warning-200',
    'negotiation': 'border-accent-200',
    'closed-won': 'border-success-200',
    'closed-lost': 'border-error-200'
  }
  return borderClasses[stage] || 'border-gray-200'
}
</script>