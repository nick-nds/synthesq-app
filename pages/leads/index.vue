<template>
  <div>
    <!-- Header with Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search leads..."
            class="input pl-10 w-80"
          >
          <svg class="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select v-model="stageFilter" class="input w-48">
          <option value="">All Stages</option>
          <option value="prospect">Prospect</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="closed-won">Closed Won</option>
          <option value="closed-lost">Closed Lost</option>
        </select>
      </div>
      <NuxtLink to="/leads/add" class="btn-gradient">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Lead
      </NuxtLink>
    </div>

    <!-- Sales Pipeline -->
    <div class="card mb-8">
      <h3 class="text-lg font-semibold text-neutral-900 mb-6">Sales Pipeline</h3>
      <div class="grid grid-cols-6 gap-4">
        <div 
          v-for="stage in pipelineStages" 
          :key="stage.key"
          class="text-center"
        >
          <div class="p-4 rounded-lg border-2 border-dashed border-neutral-200 min-h-32">
            <h4 class="font-medium text-neutral-700 mb-2">{{ stage.name }}</h4>
            <p class="text-2xl font-bold text-neutral-900">{{ stage.count }}</p>
            <p class="text-sm text-neutral-500">${{ formatCurrency(stage.value) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Leads Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Lead</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Value</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Stage</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Probability</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Expected Close</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Assigned To</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="lead in filteredLeads" 
              :key="lead.id"
              @click="navigateToLead(lead.id)"
              class="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <td class="py-3 px-4">
                <div>
                  <p class="font-medium text-neutral-900">{{ lead.title }}</p>
                  <p class="text-sm text-neutral-500">Created {{ formatDate(lead.createdAt) }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-neutral-900">{{ lead.customer }}</td>
              <td class="py-3 px-4 font-semibold text-neutral-900">${{ formatCurrency(lead.value) }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="getStageColor(lead.stage)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStage(lead.stage) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div class="w-16 bg-neutral-200 rounded-full h-2 mr-2">
                    <div 
                      class="bg-primary-500 h-2 rounded-full" 
                      :style="{ width: lead.probability + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-neutral-700">{{ lead.probability }}%</span>
                </div>
              </td>
              <td class="py-3 px-4 text-neutral-600">{{ formatDate(lead.expectedCloseDate) }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <span class="text-primary-600 font-medium text-xs">{{ getInitials(lead.assignedTo) }}</span>
                  </div>
                  <span class="ml-2 text-sm text-neutral-700">{{ lead.assignedTo }}</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button @click.stop="$router.push(`/leads/${lead.id}/edit`)" class="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button @click.stop class="p-1 text-neutral-400 hover:text-success-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button @click.stop class="p-1 text-neutral-400 hover:text-danger-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Lead Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-primary-100">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Pipeline</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(totalPipelineValue) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-warning-100">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Avg. Deal Size</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(avgDealSize) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-success-100">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Win Rate</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ winRate }}%</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-neutral-100">
            <svg class="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Active Leads</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ activeLeads }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { leads } = useMockData()

const searchQuery = ref('')
const stageFilter = ref('')

const filteredLeads = computed(() => {
  return leads.filter(lead => {
    const matchesSearch = lead.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         lead.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStage = stageFilter.value === '' || lead.stage === stageFilter.value
    
    return matchesSearch && matchesStage
  })
})

const pipelineStages = computed(() => {
  const stages = [
    { key: 'prospect', name: 'Prospect' },
    { key: 'qualified', name: 'Qualified' },
    { key: 'proposal', name: 'Proposal' },
    { key: 'negotiation', name: 'Negotiation' },
    { key: 'closed-won', name: 'Closed Won' },
    { key: 'closed-lost', name: 'Closed Lost' }
  ]
  
  return stages.map(stage => {
    const stageLeads = leads.filter(lead => lead.stage === stage.key)
    return {
      ...stage,
      count: stageLeads.length,
      value: stageLeads.reduce((sum, lead) => sum + lead.value, 0)
    }
  })
})

const totalPipelineValue = computed(() => {
  return leads.reduce((sum, lead) => sum + lead.value, 0)
})

const avgDealSize = computed(() => {
  return leads.length > 0 ? totalPipelineValue.value / leads.length : 0
})

const winRate = computed(() => {
  const closedWon = leads.filter(lead => lead.stage === 'closed-won').length
  const totalClosed = leads.filter(lead => lead.stage === 'closed-won' || lead.stage === 'closed-lost').length
  return totalClosed > 0 ? Math.round((closedWon / totalClosed) * 100) : 0
})

const activeLeads = computed(() => {
  return leads.filter(lead => !['closed-won', 'closed-lost'].includes(lead.stage)).length
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStageColor = (stage) => {
  const colors = {
    prospect: 'stage-prospect',
    qualified: 'stage-qualified',
    proposal: 'stage-proposal',
    negotiation: 'stage-negotiation',
    'closed-won': 'stage-closed-won',
    'closed-lost': 'stage-closed-lost'
  }
  return colors[stage] || 'stage-prospect'
}

const formatStage = (stage) => {
  return stage.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const router = useRouter()
const navigateToLead = (leadId) => {
  router.push(`/leads/${leadId}`)
}
</script>