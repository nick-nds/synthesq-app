<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Orders</h2>
        <p class="text-sm text-gray-600 mt-1">Manage sales orders and track fulfillment</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Reports
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Order
        </button>
      </div>
    </div>

    <!-- Order Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ mockOrders.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+15% this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingOrders }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ Math.round((pendingOrders / mockOrders.length) * 100) }}% of total</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalOrderValue) }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+22% revenue</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Avg. Order</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(avgOrderValue) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">Order size</p>
      </div>
    </div>

    <!-- Status Filter Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="status in orderStatuses" 
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
            {{ getOrderCountByStatus(status.value) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 cursor-pointer" @click="selectOrder(order)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.number }}</div>
                <div class="text-sm text-gray-500">{{ order.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-xs">{{ order.customer.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ order.customer }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(order.date) }}</div>
                <div class="text-sm text-gray-500">Due: {{ formatDate(order.dueDate) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(order.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStatusName(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.items.length }} items
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(order.total) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">View</button>
                <button class="text-gray-600 hover:text-gray-900">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Modal/Card -->
    <div v-if="selectedOrder" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Order Details: {{ selectedOrder.number }}</h3>
        <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Order Info -->
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Order Information</h4>
            <div class="bg-gray-50 rounded-lg p-3 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Order Number:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedOrder.number }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Customer:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedOrder.customer }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Order Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedOrder.date) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Due Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedOrder.dueDate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <span :class="getStatusBadgeClass(selectedOrder.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ formatStatusName(selectedOrder.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Items -->
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Order Items</h4>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="space-y-3">
                <div v-for="item in selectedOrder.items" :key="item.product" class="flex justify-between items-center">
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ item.product }}</div>
                    <div class="text-xs text-gray-600">Qty: {{ item.quantity }} × {{ formatCurrency(item.price) }}</div>
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(item.total) }}</div>
                </div>
                <div class="border-t border-gray-200 pt-2 mt-3">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-900">Total:</span>
                    <span class="text-sm font-bold text-gray-900">{{ formatCurrency(selectedOrder.total) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
const { mockOrders, formatCurrency, getStatusColor } = useMockCRM()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const statusFilter = ref('')
const selectedOrder = ref(null)

const orderStatuses = [
  { value: '', label: 'All Orders' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
]

// Computed properties
const pendingOrders = computed(() => mockOrders.filter(o => o.status === 'pending').length)
const totalOrderValue = computed(() => mockOrders.reduce((sum, o) => sum + o.total, 0))
const avgOrderValue = computed(() => Math.round(totalOrderValue.value / mockOrders.length))

const filteredOrders = computed(() => {
  if (!statusFilter.value) return mockOrders
  return mockOrders.filter(order => order.status === statusFilter.value)
})

// Methods
const selectOrder = (order) => {
  selectedOrder.value = order
}

const getOrderCountByStatus = (status) => {
  if (!status) return mockOrders.length
  return mockOrders.filter(order => order.status === status).length
}

const formatStatusName = (status) => {
  const statusNames = {
    'pending': 'Pending',
    'processing': 'Processing',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  }
  return statusNames[status] || status
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'pending': 'bg-warning-100 text-warning-800',
    'processing': 'bg-primary-100 text-primary-800',
    'completed': 'bg-success-100 text-success-800',
    'cancelled': 'bg-error-100 text-error-800'
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
</script>