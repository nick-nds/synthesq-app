<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Sales orders represent customer requests for products or services. Track orders from creation through fulfillment and delivery.'">
          <h2 class="text-2xl font-bold text-gray-900">Orders</h2>
        </HelpTooltip>
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
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Total number of sales orders across all statuses in the system.'">
              <p class="text-sm text-gray-600 mb-2">Total Orders</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockOrders.length }}</p>
            <p class="text-xs text-success-600 mt-2">+15% this month</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg flex-shrink-0">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Orders that have been placed but not yet processed or fulfilled. These require immediate attention.'">
              <p class="text-sm text-gray-600 mb-2">Pending Orders</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ pendingOrders }}</p>
            <p class="text-xs text-gray-600 mt-2">{{ Math.round((pendingOrders / mockOrders.length) * 100) }}% of total</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Combined monetary value of all orders in the system. This represents total sales volume.'">
              <p class="text-sm text-gray-600 mb-2">Total Value</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalOrderValue) }}</p>
            <p class="text-xs text-success-600 mt-2">+22% revenue</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Average monetary value per order. This metric helps understand customer purchasing patterns and order size trends.'">
              <p class="text-sm text-gray-600 mb-2">Avg. Order</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(avgOrderValue) }}</p>
            <p class="text-xs text-gray-600 mt-2">Order size</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
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

    <!-- Enhanced Order Detail Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="selectedOrder = null">
      <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 shadow-lg rounded-md bg-white" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">Order {{ selectedOrder.number }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ selectedOrder.customer }} • {{ formatDate(selectedOrder.date) }}</p>
          </div>
          <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Order Information -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Order Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Order Number:</span> {{ selectedOrder.number }}
                </div>
                <div>
                  <span class="text-gray-500">Customer:</span> {{ selectedOrder.customer }}
                </div>
                <div>
                  <span class="text-gray-500">Order Date:</span> {{ formatDate(selectedOrder.date) }}
                </div>
                <div>
                  <span class="text-gray-500">Due Date:</span> {{ formatDate(selectedOrder.dueDate) }}
                </div>
                <div>
                  <span class="text-gray-500">Status:</span> 
                  <span :class="getStatusBadgeClass(selectedOrder.status)" class="ml-2 px-2 py-1 rounded-full text-xs font-semibold">
                    {{ formatStatusName(selectedOrder.status) }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Priority:</span> 
                  <span class="font-medium">{{ selectedOrder.priority || 'Normal' }}</span>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Order Items ({{ selectedOrder.items.length }})</h4>
              <div class="space-y-3">
                <div v-for="item in selectedOrder.items" :key="item.product" class="bg-white rounded-lg p-3 border">
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900">{{ item.product }}</div>
                      <div class="text-xs text-gray-600 mt-1">
                        SKU: {{ item.sku || 'N/A' }} • Qty: {{ item.quantity }} × {{ formatCurrency(item.price) }}
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-sm font-bold text-gray-900">{{ formatCurrency(item.total) }}</div>
                      <div class="text-xs text-gray-500">{{ item.status || 'pending' }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Order Summary -->
                <div class="bg-white rounded-lg p-3 border border-gray-300">
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Subtotal:</span>
                      <span class="font-medium">{{ formatCurrency(calculateSubtotal(selectedOrder)) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Tax:</span>
                      <span class="font-medium">{{ formatCurrency(calculateTax(selectedOrder)) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Shipping:</span>
                      <span class="font-medium">{{ formatCurrency(selectedOrder.shipping || 0) }}</span>
                    </div>
                    <div class="border-t border-gray-200 pt-2">
                      <div class="flex justify-between font-bold">
                        <span>Total:</span>
                        <span class="text-lg">{{ formatCurrency(selectedOrder.total) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Timeline -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Order Timeline</h4>
              <div class="space-y-3">
                <div v-for="event in getOrderTimeline(selectedOrder)" :key="event.id" class="flex items-start space-x-3">
                  <div :class="event.type === 'success' ? 'bg-green-400' : event.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'" class="w-2 h-2 rounded-full mt-2"></div>
                  <div>
                    <p class="text-sm text-gray-900 font-medium">{{ event.description }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(event.date) }} • {{ event.user || 'System' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Panel -->
          <div class="space-y-4">
            <!-- Status Management -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Status Management</h4>
              <div class="space-y-3">
                <div>
                  <HelpTooltip :content="'Change the order status to reflect its current state in the fulfillment process.'">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                  </HelpTooltip>
                  <select :value="selectedOrder.status" @change="updateOrderStatus($event.target.value)" class="input">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <HelpTooltip :content="'Enter the shipping tracking number provided by the carrier to allow customers to track their order.'">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  </HelpTooltip>
                  <input type="text" :value="selectedOrder.tracking || ''" @input="updateTrackingNumber($event.target.value)" placeholder="Enter tracking number" class="input">
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Quick Actions</h4>
              <div class="space-y-2">
                <button class="w-full btn-primary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9.414a1 1 0 01-.707-.293l-2-2H4a2 2 0 00-2 2v7a2 2 0 002 2h2m3 0h6m-3-3l3 3m-3-3l3-3" />
                  </svg>
                  Generate Invoice
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Ship Order
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Customer
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Duplicate Order
                </button>
              </div>
            </div>

            <!-- Customer Info -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Customer Details</h4>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="text-gray-500">Name:</span> {{ selectedOrder.customer }}
                </div>
                <div>
                  <span class="text-gray-500">Email:</span> 
                  <a href="#" class="text-primary-600 hover:text-primary-800">{{ selectedOrder.customerEmail || 'customer@example.com' }}</a>
                </div>
                <div>
                  <span class="text-gray-500">Phone:</span> {{ selectedOrder.customerPhone || '+1 (555) 123-4567' }}
                </div>
                <div>
                  <span class="text-gray-500">Total Orders:</span> {{ getCustomerOrderCount(selectedOrder.customer) }}
                </div>
              </div>
            </div>

            <!-- Order Notes -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="mb-3">
                <HelpTooltip :content="'Add internal notes about this order for your team. These notes are not visible to customers.'">
                  <h4 class="font-medium text-gray-900">Order Notes</h4>
                </HelpTooltip>
              </div>
              <textarea v-model="orderNotes" class="input h-20" placeholder="Add notes about this order..."></textarea>
              <button @click="saveOrderNotes" class="mt-2 w-full btn-secondary text-sm">Save Notes</button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button @click="selectedOrder = null" class="btn-secondary">Close</button>
          <button @click="editOrder(selectedOrder)" class="btn-primary">Edit Order</button>
        </div>
      </div>

  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockOrders, formatCurrency, getStatusColor } = useMockCRM()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const statusFilter = ref('')
const selectedOrder = ref(null)
const orderNotes = ref('')

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

// Enhanced order management methods
const calculateSubtotal = (order) => {
  return order.items.reduce((sum, item) => sum + item.total, 0)
}

const calculateTax = (order) => {
  const subtotal = calculateSubtotal(order)
  return subtotal * 0.08 // 8% tax rate
}

const getOrderTimeline = (order) => {
  return [
    { id: 1, description: 'Order placed', date: order.date, type: 'success', user: 'Customer' },
    { id: 2, description: 'Payment confirmed', date: order.date, type: 'success', user: 'Payment System' },
    { id: 3, description: 'Order processing started', date: order.date, type: 'info', user: 'Sales Team' },
    { id: 4, description: 'Items picked and packed', date: order.date, type: order.status === 'completed' ? 'success' : 'info', user: 'Warehouse' }
  ]
}

const getCustomerOrderCount = (customerName) => {
  return mockOrders.filter(order => order.customer === customerName).length
}

const updateOrderStatus = (newStatus) => {
  if (selectedOrder.value) {
    const orderIndex = mockOrders.findIndex(order => order.id === selectedOrder.value.id)
    if (orderIndex !== -1) {
      mockOrders[orderIndex].status = newStatus
      selectedOrder.value.status = newStatus
      
      // Show success notification
      const { success } = useNotifications()
      success(
        'Order Updated', 
        `Order ${selectedOrder.value.number} status changed to ${formatStatusName(newStatus)}`, 
        { duration: 3000 }
      )
    }
  }
}

const updateTrackingNumber = (trackingNumber) => {
  if (selectedOrder.value) {
    const orderIndex = mockOrders.findIndex(order => order.id === selectedOrder.value.id)
    if (orderIndex !== -1) {
      mockOrders[orderIndex].tracking = trackingNumber
      selectedOrder.value.tracking = trackingNumber
    }
  }
}

const saveOrderNotes = () => {
  if (selectedOrder.value && orderNotes.value) {
    const orderIndex = mockOrders.findIndex(order => order.id === selectedOrder.value.id)
    if (orderIndex !== -1) {
      mockOrders[orderIndex].notes = orderNotes.value
      selectedOrder.value.notes = orderNotes.value
      
      const { success } = useNotifications()
      success('Notes Saved', 'Order notes have been updated successfully.', { duration: 3000 })
    }
  }
}

const editOrder = (order) => {
  console.log('Edit order:', order)
  // TODO: Implement order editing functionality
  const { info } = useNotifications()
  info('Feature Coming Soon', 'Order editing functionality will be available soon.', { duration: 3000 })
}

// Watch for selected order changes to load notes
watch(selectedOrder, (newOrder) => {
  if (newOrder) {
    orderNotes.value = newOrder.notes || ''
  }
})
</script>