<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="getHelpText('workflowAutomation')">
          <h2 class="text-2xl font-bold text-gray-900">Workflow Automation</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Automate business processes and workflows</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Templates
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Workflow
        </button>
      </div>
    </div>

    <!-- Automation Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('totalWorkflows')">
              <p class="text-sm text-gray-600">Total Workflows</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockWorkflows.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+2 new this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('activeWorkflows')">
              <p class="text-sm text-gray-600">Active Workflows</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ activeWorkflows }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ Math.round((activeWorkflows / mockWorkflows.length) * 100) }}% of total</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('workflowExecutions')">
              <p class="text-sm text-gray-600">Executions Today</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ totalExecutions }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+15% from yesterday</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('workflowSuccessRate')">
              <p class="text-sm text-gray-600">Success Rate</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ successRate }}%</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">{{ failedExecutions }} failed today</p>
      </div>
    </div>

    <!-- Recent Activity and Performance -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Executions -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <HelpTooltip :content="getHelpText('recentExecutions')">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Executions</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="execution in recentExecutions.slice(0, 5)" :key="execution.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="getExecutionStatusColor(execution.status)" class="w-3 h-3 rounded-full mr-3"></div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ execution.workflow }}</div>
                <div class="text-xs text-gray-500">{{ execution.trigger }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ formatTime(execution.time) }}</div>
              <div class="text-xs text-gray-500">{{ execution.duration }}ms</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Workflow Categories -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <HelpTooltip :content="getHelpText('workflowCategories')">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Workflow Categories</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="category in workflowCategories" :key="category.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="category.color" class="w-3 h-3 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700">{{ category.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ category.count }}</div>
              <div class="text-xs text-gray-500">{{ category.executions }} runs</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Triggers -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Triggers</h3>
        <div class="space-y-3">
          <div v-for="trigger in popularTriggers" :key="trigger.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="trigger.color" class="w-3 h-3 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700">{{ trigger.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ trigger.workflows }}</div>
              <div class="text-xs text-gray-500">workflows</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Workflows Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Workflows</h3>
      </div>
      
      <!-- Search and Filters -->
      <div class="p-4 border-b border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search workflows..." 
            class="input"
          >
          <select v-model="statusFilter" class="input">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
          <select v-model="categoryFilter" class="input">
            <option value="">All Categories</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
            <option value="Finance">Finance</option>
          </select>
          <select v-model="triggerFilter" class="input">
            <option value="">All Triggers</option>
            <option value="Manual">Manual</option>
            <option value="Schedule">Schedule</option>
            <option value="Webhook">Webhook</option>
            <option value="Email">Email</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="workflow in filteredWorkflows" :key="workflow.id" class="hover:bg-gray-50 cursor-pointer" @click="selectWorkflow(workflow)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div :class="getWorkflowIcon(workflow.category)" class="h-8 w-8 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ workflow.name }}</div>
                    <div class="text-sm text-gray-500">{{ workflow.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {{ workflow.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ workflow.trigger }}</div>
                <div class="text-sm text-gray-500">{{ workflow.triggerDetail }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getWorkflowStatusBadge(workflow.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ workflow.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(workflow.lastRun) }}</div>
                <div class="text-sm text-gray-500">{{ workflow.executions }} runs</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ workflow.successRate }}%</div>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div class="bg-success-600 h-1.5 rounded-full" :style="`width: ${workflow.successRate}%`"></div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button v-if="workflow.status === 'active'" class="text-warning-600 hover:text-warning-900 mr-3">Pause</button>
                <button v-else class="text-success-600 hover:text-success-900 mr-3">Activate</button>
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const triggerFilter = ref('')
const selectedWorkflow = ref(null)

// Mock automation data
const mockWorkflows = [
  { id: 1, name: 'Lead Assignment', description: 'Auto-assign leads to sales reps', category: 'Sales', trigger: 'Webhook', triggerDetail: 'New lead created', status: 'active', lastRun: '2024-08-15T10:30:00Z', executions: 145, successRate: 98 },
  { id: 2, name: 'Welcome Email Sequence', description: 'Send welcome emails to new customers', category: 'Marketing', trigger: 'Schedule', triggerDetail: 'Every 15 minutes', status: 'active', lastRun: '2024-08-15T11:00:00Z', executions: 89, successRate: 95 },
  { id: 3, name: 'Invoice Reminder', description: 'Send reminders for overdue invoices', category: 'Finance', trigger: 'Schedule', triggerDetail: 'Daily at 9 AM', status: 'active', lastRun: '2024-08-15T09:00:00Z', executions: 23, successRate: 92 },
  { id: 4, name: 'Ticket Escalation', description: 'Escalate unresolved support tickets', category: 'Support', trigger: 'Schedule', triggerDetail: 'Every 4 hours', status: 'paused', lastRun: '2024-08-14T16:00:00Z', executions: 67, successRate: 88 },
  { id: 5, name: 'Customer Onboarding', description: 'Automated customer onboarding flow', category: 'Marketing', trigger: 'Manual', triggerDetail: 'Triggered manually', status: 'draft', lastRun: null, executions: 0, successRate: 0 },
  { id: 6, name: 'Inventory Alert', description: 'Alert when inventory is low', category: 'Sales', trigger: 'Webhook', triggerDetail: 'Stock level changes', status: 'active', lastRun: '2024-08-15T08:45:00Z', executions: 12, successRate: 100 }
]

const recentExecutions = [
  { id: 1, workflow: 'Lead Assignment', trigger: 'New lead created', status: 'success', time: '2024-08-15T11:15:00Z', duration: 245 },
  { id: 2, workflow: 'Welcome Email Sequence', trigger: 'Schedule', status: 'success', time: '2024-08-15T11:00:00Z', duration: 1850 },
  { id: 3, workflow: 'Lead Assignment', trigger: 'New lead created', status: 'success', time: '2024-08-15T10:45:00Z', duration: 198 },
  { id: 4, workflow: 'Invoice Reminder', trigger: 'Schedule', status: 'failed', time: '2024-08-15T09:00:00Z', duration: 5000 },
  { id: 5, workflow: 'Inventory Alert', trigger: 'Stock level change', status: 'success', time: '2024-08-15T08:45:00Z', duration: 320 }
]

// Computed properties
const activeWorkflows = computed(() => mockWorkflows.filter(w => w.status === 'active').length)
const totalExecutions = computed(() => recentExecutions.length * 15) // Simulated
const successRate = computed(() => {
  const successful = recentExecutions.filter(e => e.status === 'success').length
  return Math.round((successful / recentExecutions.length) * 100)
})
const failedExecutions = computed(() => recentExecutions.filter(e => e.status === 'failed').length)

const workflowCategories = computed(() => {
  const categories = {}
  mockWorkflows.forEach(w => {
    if (!categories[w.category]) {
      categories[w.category] = { count: 0, executions: 0 }
    }
    categories[w.category].count++
    categories[w.category].executions += w.executions
  })
  
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
  return Object.entries(categories).map(([name, data], index) => ({
    name,
    count: data.count,
    executions: data.executions,
    color: colors[index % colors.length]
  }))
})

const popularTriggers = computed(() => {
  const triggers = {}
  mockWorkflows.forEach(w => {
    triggers[w.trigger] = (triggers[w.trigger] || 0) + 1
  })
  
  const colors = ['bg-indigo-500', 'bg-pink-500', 'bg-gray-500', 'bg-orange-500']
  return Object.entries(triggers).map(([name, workflows], index) => ({
    name,
    workflows,
    color: colors[index % colors.length]
  }))
})

const filteredWorkflows = computed(() => {
  let filtered = [...mockWorkflows]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(w => 
      w.name.toLowerCase().includes(query) ||
      w.description.toLowerCase().includes(query) ||
      w.category.toLowerCase().includes(query)
    )
  }
  
  if (statusFilter.value) {
    filtered = filtered.filter(w => w.status === statusFilter.value)
  }
  
  if (categoryFilter.value) {
    filtered = filtered.filter(w => w.category === categoryFilter.value)
  }
  
  if (triggerFilter.value) {
    filtered = filtered.filter(w => w.trigger === triggerFilter.value)
  }
  
  return filtered
})

// Methods
const selectWorkflow = (workflow) => {
  selectedWorkflow.value = workflow
}

const getExecutionStatusColor = (status) => {
  return status === 'success' ? 'bg-green-500' : 'bg-red-500'
}

const getWorkflowStatusBadge = (status) => {
  const statusClasses = {
    'active': 'bg-success-100 text-success-800',
    'paused': 'bg-warning-100 text-warning-800',
    'draft': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getWorkflowIcon = (category) => {
  const iconClasses = {
    'Sales': 'bg-blue-500',
    'Marketing': 'bg-green-500',
    'Finance': 'bg-yellow-500',
    'Support': 'bg-purple-500'
  }
  return iconClasses[category] || 'bg-gray-500'
}

const formatTime = (timeString) => {
  if (!timeString) return '-'
  return new Date(timeString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>