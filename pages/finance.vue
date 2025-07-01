<template>
  <div>
    <!-- Finance Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-success-100">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Revenue</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(totalRevenue) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-primary-100">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Invoices</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ totalInvoices }}</p>
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
            <p class="text-sm font-medium text-neutral-500">Pending Payments</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(pendingPayments) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-danger-100">
            <svg class="w-6 h-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Overdue</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(overdueAmount) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-neutral-900">Invoices & Billing</h2>
      <div class="flex space-x-3">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Report
        </button>
        <button class="btn-gradient">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Invoice
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex items-center space-x-4 mb-6">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search invoices..."
          class="input pl-10 w-80"
        >
        <svg class="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <select v-model="statusFilter" class="input w-40">
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="paid">Paid</option>
        <option value="overdue">Overdue</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Invoices Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Invoice #</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Amount</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Due Date</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Created</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="invoice in filteredInvoices" 
              :key="invoice.id"
              class="border-b border-neutral-100 hover:bg-neutral-50"
            >
              <td class="py-3 px-4">
                <p class="font-mono text-sm font-medium text-neutral-900">{{ invoice.invoiceNumber }}</p>
              </td>
              <td class="py-3 px-4 text-neutral-900">{{ invoice.customer }}</td>
              <td class="py-3 px-4 font-semibold text-neutral-900">${{ formatCurrency(invoice.amount) }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="getStatusColor(invoice.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <span :class="isOverdue(invoice.dueDate) ? 'text-danger-600 font-medium' : 'text-neutral-600'">
                  {{ formatDate(invoice.dueDate) }}
                </span>
              </td>
              <td class="py-3 px-4 text-neutral-500">{{ formatDate(invoice.createdAt) }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button class="p-1 text-neutral-400 hover:text-primary-600 transition-colors" title="View">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button class="p-1 text-neutral-400 hover:text-primary-600 transition-colors" title="Edit">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button class="p-1 text-neutral-400 hover:text-success-600 transition-colors" title="Send">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                  <button class="p-1 text-neutral-400 hover:text-danger-600 transition-colors" title="Delete">
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

    <!-- Recent Transactions and Financial Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <!-- Payment Status Breakdown -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Payment Status</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-success-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
              <span class="text-sm font-medium text-neutral-700">Paid Invoices</span>
            </div>
            <div class="text-right">
              <p class="font-semibold text-neutral-900">${{ formatCurrency(paidAmount) }}</p>
              <p class="text-xs text-neutral-500">{{ paidCount }} invoices</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-warning-500 rounded-full mr-3"></div>
              <span class="text-sm font-medium text-neutral-700">Pending Payment</span>
            </div>
            <div class="text-right">
              <p class="font-semibold text-neutral-900">${{ formatCurrency(pendingPayments) }}</p>
              <p class="text-xs text-neutral-500">{{ pendingCount }} invoices</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-danger-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-danger-500 rounded-full mr-3"></div>
              <span class="text-sm font-medium text-neutral-700">Overdue Payment</span>
            </div>
            <div class="text-right">
              <p class="font-semibold text-neutral-900">${{ formatCurrency(overdueAmount) }}</p>
              <p class="text-xs text-neutral-500">{{ overdueCount }} invoices</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Customers by Revenue -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Top Customers by Revenue</h3>
        <div class="space-y-4">
          <div 
            v-for="customer in topCustomersByRevenue" 
            :key="customer.customer"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-primary-600 font-medium text-sm">{{ getInitials(customer.customer) }}</span>
              </div>
              <span class="ml-3 text-sm font-medium text-neutral-900">{{ customer.customer }}</span>
            </div>
            <div class="text-right">
              <p class="font-semibold text-neutral-900">${{ formatCurrency(customer.total) }}</p>
              <p class="text-xs text-neutral-500">{{ customer.invoices }} {{ customer.invoices === 1 ? 'invoice' : 'invoices' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { invoices } = useMockData()

const searchQuery = ref('')
const statusFilter = ref('')

const filteredInvoices = computed(() => {
  return invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         invoice.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === '' || invoice.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const totalRevenue = computed(() => {
  return invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
})

const totalInvoices = computed(() => invoices.length)

const pendingPayments = computed(() => {
  return invoices
    .filter(invoice => invoice.status === 'sent')
    .reduce((sum, invoice) => sum + invoice.amount, 0)
})

const overdueAmount = computed(() => {
  return invoices
    .filter(invoice => invoice.status === 'overdue' || isOverdue(invoice.dueDate))
    .reduce((sum, invoice) => sum + invoice.amount, 0)
})

const paidAmount = computed(() => {
  return invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0)
})

const paidCount = computed(() => {
  return invoices.filter(invoice => invoice.status === 'paid').length
})

const pendingCount = computed(() => {
  return invoices.filter(invoice => invoice.status === 'sent').length
})

const overdueCount = computed(() => {
  return invoices.filter(invoice => invoice.status === 'overdue' || isOverdue(invoice.dueDate)).length
})

const topCustomersByRevenue = computed(() => {
  const customerRevenue = {}
  
  invoices.forEach(invoice => {
    if (!customerRevenue[invoice.customer]) {
      customerRevenue[invoice.customer] = { total: 0, invoices: 0 }
    }
    customerRevenue[invoice.customer].total += invoice.amount
    customerRevenue[invoice.customer].invoices += 1
  })
  
  return Object.entries(customerRevenue)
    .map(([customer, data]) => ({ customer, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
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

const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date()
}

const getStatusColor = (status) => {
  const colors = {
    draft: 'bg-neutral-100 text-neutral-800',
    sent: 'bg-primary-100 text-primary-800',
    paid: 'bg-success-100 text-success-800',
    overdue: 'bg-danger-100 text-danger-800',
    cancelled: 'bg-neutral-100 text-neutral-800'
  }
  return colors[status] || 'bg-neutral-100 text-neutral-800'
}
</script>