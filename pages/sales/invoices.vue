<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Invoices are bills sent to customers for products or services. Track invoice status, payments, and outstanding balances.'">
          <h2 class="text-2xl font-bold text-gray-900">Invoices</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Create, send, and track customer invoices</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Reports
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Invoice
        </button>
      </div>
    </div>

    <!-- Invoice Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Total number of invoices created in the system, including drafts, sent, paid, and overdue invoices.'">
              <p class="text-sm text-gray-600 mb-2">Total Invoices</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockInvoices.length }}</p>
            <p class="text-xs text-success-600 mt-2">+5 this month</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg flex-shrink-0">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Number of invoices that have been fully paid by customers. This indicates successful revenue collection.'">
              <p class="text-sm text-gray-600 mb-2">Paid Invoices</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ paidInvoices }}</p>
            <p class="text-xs text-gray-600 mt-2">{{ Math.round((paidInvoices / mockInvoices.length) * 100) }}% of total</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Total amount of money collected from paid invoices. This represents actual revenue received.'">
              <p class="text-sm text-gray-600 mb-2">Total Revenue</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalRevenue) }}</p>
            <p class="text-xs text-success-600 mt-2">+18% revenue growth</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Invoices that have passed their due date without payment. These require follow-up action for collection.'">
              <p class="text-sm text-gray-600 mb-2">Overdue</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ overdueInvoices }}</p>
            <p class="text-xs text-error-600 mt-2">{{ formatCurrency(overdueAmount) }} overdue</p>
          </div>
          <div class="p-3 bg-error-100 rounded-lg">
            <svg class="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Filter Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="status in invoiceStatuses" 
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
            {{ getInvoiceCountByStatus(status.value) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search invoices by number or customer..." 
            class="input"
          >
        </div>
        <select v-model="dateFilter" class="input">
          <option value="">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-quarter">This Quarter</option>
          <option value="this-year">This Year</option>
        </select>
        <select v-model="amountFilter" class="input">
          <option value="">All Amounts</option>
          <option value="0-1000">$0 - $1,000</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000+">$5,000+</option>
        </select>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in filteredInvoices" :key="invoice.id" class="hover:bg-gray-50 cursor-pointer" @click="selectInvoice(invoice)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ invoice.number }}</div>
                <div class="text-sm text-gray-500">{{ invoice.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-xs">{{ invoice.customer.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ invoice.customer }}</div>
                    <div class="text-sm text-gray-500">{{ invoice.customerId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(invoice.issueDate) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(invoice.dueDate) }}</div>
                <div v-if="invoice.status === 'overdue'" class="text-xs text-error-600">
                  {{ getDaysOverdue(invoice.dueDate) }} days overdue
                </div>
                <div v-else-if="invoice.status === 'paid' && invoice.paidDate" class="text-xs text-success-600">
                  Paid {{ formatDate(invoice.paidDate) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(invoice.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStatusName(invoice.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(invoice.total) }}</div>
                <div class="text-sm text-gray-500">{{ invoice.items.length }} items</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">View</button>
                <button v-if="invoice.status === 'draft'" class="text-gray-600 hover:text-gray-900 mr-3">Send</button>
                <button class="text-gray-600 hover:text-gray-900">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Invoice Detail Modal/Card -->
    <div v-if="selectedInvoice" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Invoice Details: {{ selectedInvoice.number }}</h3>
        <button @click="selectedInvoice = null" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Invoice Info -->
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Invoice Information</h4>
            <div class="bg-gray-50 rounded-lg p-3 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Invoice Number:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedInvoice.number }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Customer:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedInvoice.customer }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Issue Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedInvoice.issueDate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Due Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedInvoice.dueDate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <span :class="getStatusBadgeClass(selectedInvoice.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ formatStatusName(selectedInvoice.status) }}
                </span>
              </div>
              <div v-if="selectedInvoice.orderId" class="flex justify-between">
                <span class="text-sm text-gray-600">Related Order:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedInvoice.orderId }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Amount Breakdown -->
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Amount Breakdown</h4>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Subtotal:</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatCurrency(selectedInvoice.subtotal) }}</span>
                </div>
                <div v-if="selectedInvoice.tax" class="flex justify-between">
                  <span class="text-sm text-gray-600">Tax:</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatCurrency(selectedInvoice.tax) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-900">Total:</span>
                    <span class="text-sm font-bold text-gray-900">{{ formatCurrency(selectedInvoice.total) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Invoice Items -->
      <div class="mt-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Invoice Items</h4>
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="space-y-3">
            <div v-for="item in selectedInvoice.items" :key="item.product" class="flex justify-between items-center">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-900">{{ item.product }}</div>
                <div class="text-xs text-gray-600">Qty: {{ item.quantity }} × {{ formatCurrency(item.price) }}</div>
              </div>
              <div class="text-sm font-medium text-gray-900">{{ formatCurrency(item.total) }}</div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockInvoices, formatCurrency, getStatusColor } = useMockCRM()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')
const amountFilter = ref('')
const selectedInvoice = ref(null)

const invoiceStatuses = [
  { value: '', label: 'All Invoices' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' }
]

// Computed properties
const paidInvoices = computed(() => mockInvoices.filter(i => i.status === 'paid').length)
const overdueInvoices = computed(() => mockInvoices.filter(i => i.status === 'overdue').length)
const totalRevenue = computed(() => mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0))
const overdueAmount = computed(() => mockInvoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0))

const filteredInvoices = computed(() => {
  let filtered = [...mockInvoices]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(invoice => 
      invoice.number.toLowerCase().includes(query) ||
      invoice.customer.toLowerCase().includes(query) ||
      invoice.customerId.toLowerCase().includes(query)
    )
  }
  
  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(invoice => invoice.status === statusFilter.value)
  }
  
  // Apply amount filter
  if (amountFilter.value) {
    if (amountFilter.value === '0-1000') {
      filtered = filtered.filter(invoice => invoice.total <= 1000)
    } else if (amountFilter.value === '1000-5000') {
      filtered = filtered.filter(invoice => invoice.total > 1000 && invoice.total <= 5000)
    } else if (amountFilter.value === '5000+') {
      filtered = filtered.filter(invoice => invoice.total > 5000)
    }
  }
  
  return filtered
})

// Methods
const selectInvoice = (invoice) => {
  selectedInvoice.value = invoice
}

const getInvoiceCountByStatus = (status) => {
  if (!status) return mockInvoices.length
  return mockInvoices.filter(invoice => invoice.status === status).length
}

const formatStatusName = (status) => {
  const statusNames = {
    'draft': 'Draft',
    'sent': 'Sent',
    'paid': 'Paid',
    'overdue': 'Overdue'
  }
  return statusNames[status] || status
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'draft': 'bg-gray-100 text-gray-800',
    'sent': 'bg-primary-100 text-primary-800',
    'paid': 'bg-success-100 text-success-800',
    'overdue': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getDaysOverdue = (dueDate) => {
  const due = new Date(dueDate)
  const today = new Date()
  const diffTime = today - due
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

// Watch for filter changes
watch([searchQuery, statusFilter, dateFilter, amountFilter], () => {
  selectedInvoice.value = null
})
</script>