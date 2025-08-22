<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Payment processing and tracking system for managing customer payments, refunds, and transaction reconciliation.'">
          <h2 class="text-2xl font-bold text-gray-900">Payments</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Track and manage payment transactions</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reconcile
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Process Payment
        </button>
      </div>
    </div>

    <!-- Payment Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('totalPayments')">
              <p class="text-sm text-gray-600">Total Payments</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockPayments.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+12% this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('completedPayments')">
              <p class="text-sm text-gray-600">Completed</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ completedPayments }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ Math.round((completedPayments / mockPayments.length) * 100) }}% success rate</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('totalRevenue')">
              <p class="text-sm text-gray-600">Total Amount</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalPaymentAmount) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+25% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('failedPayments')">
              <p class="text-sm text-gray-600">Failed Payments</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ failedPayments }}</p>
          </div>
          <div class="p-3 bg-error-100 rounded-lg">
            <svg class="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-error-600 mt-2">{{ formatCurrency(failedPaymentAmount) }} failed</p>
      </div>
    </div>

    <!-- Payment Method Breakdown -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <HelpTooltip :content="getHelpText('paymentMethods')">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Payment Methods</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="method in paymentMethods" :key="method.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="method.color" class="w-3 h-3 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">{{ method.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ method.count }}</div>
              <div class="text-xs text-gray-500">{{ formatCurrency(method.amount) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <HelpTooltip :content="getHelpText('paymentGateways')">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Payment Gateways</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="gateway in paymentGateways" :key="gateway.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="gateway.color" class="w-3 h-3 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">{{ gateway.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ gateway.count }}</div>
              <div class="text-xs text-gray-500">{{ formatCurrency(gateway.fees) }} fees</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <HelpTooltip :content="getHelpText('recentPayments')">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="payment in mockPayments.slice(0, 3)" :key="payment.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="getStatusIndicator(payment.status)" class="w-3 h-3 rounded-full mr-2"></div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(payment.amount) }}</div>
                <div class="text-xs text-gray-500">{{ payment.customer }}</div>
              </div>
            </div>
            <div class="text-xs text-gray-500">{{ formatDate(payment.date) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Filter Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="status in paymentStatuses" 
          :key="status.value"
          @click="statusFilter = status.value"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            statusFilter === status.value 
              ? 'bg-primary-100 text-primary-700 border border-primary-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ status.label }}
          <span :class="[
            'ml-2 px-2 py-0.5 rounded-full text-xs',
            statusFilter === status.value ? 'bg-primary-200' : 'bg-gray-200'
          ]">
            {{ getPaymentCountByStatus(status.value) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search payments..." 
            class="input"
          >
        </div>
        <select v-model="methodFilter" class="input">
          <option value="">All Methods</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Credit Card">Credit Card</option>
          <option value="ACH">ACH</option>
          <option value="PayPal">PayPal</option>
        </select>
        <select v-model="gatewayFilter" class="input">
          <option value="">All Gateways</option>
          <option value="Stripe">Stripe</option>
          <option value="PayPal">PayPal</option>
          <option value="Square">Square</option>
        </select>
        <select v-model="typeFilter" class="input">
          <option value="">All Types</option>
          <option value="invoice">Invoice Payment</option>
          <option value="subscription">Subscription</option>
          <option value="refund">Refund</option>
        </select>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gateway</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-gray-50 cursor-pointer" @click="selectPayment(payment)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ payment.transactionId }}</div>
                <div class="text-sm text-gray-500">{{ payment.invoiceNumber || payment.reference }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-xs">{{ payment.customer.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ payment.customer }}</div>
                    <div class="text-sm text-gray-500">{{ payment.customerId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ payment.method }}</div>
                <div class="text-sm text-gray-500">{{ payment.type }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ payment.gateway }}</div>
                <div class="text-sm text-gray-500">Fee: {{ formatCurrency(payment.processingFee) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(payment.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStatusName(payment.status) }}
                </span>
                <div v-if="payment.failureReason" class="text-xs text-error-600 mt-1">
                  {{ payment.failureReason }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(payment.amount) }}</div>
                <div class="text-sm text-gray-500">Net: {{ formatCurrency(payment.netAmount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(payment.date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button v-if="payment.status === 'completed'" class="text-primary-600 hover:text-primary-900 mr-3">Refund</button>
                <button v-if="payment.status === 'failed'" class="text-warning-600 hover:text-warning-900 mr-3">Retry</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Detail Modal -->
    <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedPayment = null">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Payment Details</h3>
          <button @click="selectedPayment = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Payment Information -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Payment Information</h4>
                <div class="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Transaction ID:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPayment.transactionId }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Customer:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPayment.customer }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Method:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPayment.method }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Gateway:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPayment.gateway }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Type:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPayment.type }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Status:</span>
                    <span :class="getStatusBadgeClass(selectedPayment.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                      {{ formatStatusName(selectedPayment.status) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Date:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedPayment.date) }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Amount Breakdown -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Amount Breakdown</h4>
                <div class="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Gross Amount:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatCurrency(selectedPayment.amount) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Processing Fee:</span>
                    <span class="text-sm font-medium text-gray-900">-{{ formatCurrency(selectedPayment.processingFee) }}</span>
                  </div>
                  <div class="border-t border-gray-200 pt-2">
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-900">Net Amount:</span>
                      <span class="text-sm font-bold text-gray-900">{{ formatCurrency(selectedPayment.netAmount) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Reference Information -->
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Reference</h4>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="space-y-2">
                <div v-if="selectedPayment.invoiceNumber" class="flex justify-between">
                  <span class="text-sm text-gray-600">Invoice:</span>
                  <span class="text-sm font-medium text-gray-900">{{ selectedPayment.invoiceNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Reference:</span>
                  <span class="text-sm font-medium text-gray-900">{{ selectedPayment.reference }}</span>
                </div>
                <div v-if="selectedPayment.failureReason" class="flex justify-between">
                  <span class="text-sm text-gray-600">Failure Reason:</span>
                  <span class="text-sm font-medium text-error-600">{{ selectedPayment.failureReason }}</span>
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
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockPayments, formatCurrency, getStatusColor } = useMockCRM()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const methodFilter = ref('')
const gatewayFilter = ref('')
const typeFilter = ref('')
const selectedPayment = ref(null)

const paymentStatuses = [
  { value: '', label: 'All Payments' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' }
]

// Computed properties
const completedPayments = computed(() => mockPayments.filter(p => p.status === 'completed').length)
const failedPayments = computed(() => mockPayments.filter(p => p.status === 'failed').length)
const totalPaymentAmount = computed(() => mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0))
const failedPaymentAmount = computed(() => mockPayments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0))

const paymentMethods = computed(() => {
  const methods = {}
  mockPayments.forEach(payment => {
    if (!methods[payment.method]) {
      methods[payment.method] = { count: 0, amount: 0 }
    }
    methods[payment.method].count++
    methods[payment.method].amount += payment.amount
  })
  
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
  return Object.entries(methods).map(([name, data], index) => ({
    name,
    count: data.count,
    amount: data.amount,
    color: colors[index % colors.length]
  }))
})

const paymentGateways = computed(() => {
  const gateways = {}
  mockPayments.forEach(payment => {
    if (!gateways[payment.gateway]) {
      gateways[payment.gateway] = { count: 0, fees: 0 }
    }
    gateways[payment.gateway].count++
    gateways[payment.gateway].fees += payment.processingFee
  })
  
  const colors = ['bg-indigo-500', 'bg-pink-500', 'bg-gray-500']
  return Object.entries(gateways).map(([name, data], index) => ({
    name,
    count: data.count,
    fees: data.fees,
    color: colors[index % colors.length]
  }))
})

const filteredPayments = computed(() => {
  let filtered = [...mockPayments]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(payment => 
      payment.customer.toLowerCase().includes(query) ||
      payment.transactionId.toLowerCase().includes(query) ||
      payment.reference.toLowerCase().includes(query)
    )
  }
  
  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(payment => payment.status === statusFilter.value)
  }
  
  // Apply method filter
  if (methodFilter.value) {
    filtered = filtered.filter(payment => payment.method === methodFilter.value)
  }
  
  // Apply gateway filter
  if (gatewayFilter.value) {
    filtered = filtered.filter(payment => payment.gateway === gatewayFilter.value)
  }
  
  // Apply type filter
  if (typeFilter.value) {
    filtered = filtered.filter(payment => payment.type === typeFilter.value)
  }
  
  return filtered
})

// Methods
const selectPayment = (payment) => {
  selectedPayment.value = payment
}

const getPaymentCountByStatus = (status) => {
  if (!status) return mockPayments.length
  return mockPayments.filter(payment => payment.status === status).length
}

const formatStatusName = (status) => {
  const statusNames = {
    'completed': 'Completed',
    'pending': 'Pending',
    'failed': 'Failed',
    'refunded': 'Refunded'
  }
  return statusNames[status] || status
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'completed': 'bg-success-100 text-success-800',
    'pending': 'bg-warning-100 text-warning-800',
    'failed': 'bg-error-100 text-error-800',
    'refunded': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusIndicator = (status) => {
  const indicators = {
    'completed': 'bg-success-500',
    'pending': 'bg-warning-500',
    'failed': 'bg-error-500',
    'refunded': 'bg-gray-500'
  }
  return indicators[status] || 'bg-gray-500'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Watch for filter changes
watch([searchQuery, statusFilter, methodFilter, gatewayFilter, typeFilter], () => {
  // Optional: Reset selection when filters change
})
</script>