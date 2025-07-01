<template>
  <div>
    <!-- Header with Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders..."
            class="input pl-10 w-80"
          >
          <svg class="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select v-model="statusFilter" class="input w-40">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select v-model="paymentStatusFilter" class="input w-40">
          <option value="">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
      <button class="btn-gradient">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Order
      </button>
    </div>

    <!-- Sales Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-primary-100">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Orders</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ metrics.totalOrders }}</p>
          </div>
        </div>
      </div>

      <div class="card-premium">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-secondary-100">
            <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Sales Revenue</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(metrics.totalRevenue) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-success-100">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Avg Order Value</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(metrics.avgOrderValue) }}</p>
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
            <p class="text-sm font-medium text-neutral-500">Pending Orders</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ metrics.pendingOrders }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-neutral-900">Recent Orders</h3>
        <div class="flex space-x-2">
          <button class="btn-secondary text-sm">Export</button>
          <button class="btn-secondary text-sm">Filter</button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Order</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Date</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Total</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Payment</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Expected Delivery</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="order in filteredOrders" 
              :key="order.id"
              @click="navigateToOrder(order.id)"
              class="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <td class="py-3 px-4">
                <div>
                  <p class="font-medium text-neutral-900">{{ order.orderNumber }}</p>
                  <p class="text-sm text-neutral-500">{{ order.items.length }} item{{ order.items.length !== 1 ? 's' : '' }}</p>
                </div>
              </td>
              <td class="py-3 px-4">
                <div>
                  <p class="font-medium text-neutral-900">{{ order.customer }}</p>
                  <p class="text-sm text-neutral-500">{{ order.paymentMethod }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-neutral-600">{{ formatDate(order.orderDate) }}</td>
              <td class="py-3 px-4 font-semibold text-neutral-900">${{ formatCurrency(order.total) }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="getOrderStatusColor(order.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStatus(order.status) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <span 
                  :class="getPaymentStatusColor(order.paymentStatus)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStatus(order.paymentStatus) }}
                </span>
              </td>
              <td class="py-3 px-4 text-neutral-600">
                {{ order.expectedDelivery ? formatDate(order.expectedDelivery) : 'N/A' }}
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button @click.stop="$router.push(`/sales/orders/${order.id}`)" class="p-1 text-neutral-400 hover:text-primary-600 transition-colors" title="View Details">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click.stop="$router.push(`/sales/orders/${order.id}/edit`)" class="p-1 text-neutral-400 hover:text-primary-600 transition-colors" title="Edit Order">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    v-if="order.status !== 'cancelled'"
                    @click.stop
                    class="p-1 text-neutral-400 hover:text-danger-600 transition-colors" 
                    title="Cancel Order"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top Products Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <!-- Monthly Orders Chart -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Monthly Orders</h3>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div 
            v-for="(orders, index) in metrics.monthlyOrders" 
            :key="index"
            class="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md transition-all duration-300 hover:from-primary-600 hover:to-primary-500 flex-1"
            :style="{ height: (orders / Math.max(...metrics.monthlyOrders)) * 100 + '%' }"
            :title="`${getMonthName(index)}: ${orders} orders`"
          ></div>
        </div>
        <div class="flex justify-between mt-4 text-xs text-neutral-500">
          <span v-for="(month, index) in monthNames" :key="index">{{ month.slice(0, 3) }}</span>
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Top Selling Products</h3>
        <div class="space-y-4">
          <div 
            v-for="(product, index) in metrics.topProducts" 
            :key="index"
            class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
          >
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <span class="text-primary-600 font-medium text-sm">{{ index + 1 }}</span>
              </div>
              <div>
                <p class="font-medium text-neutral-900">{{ product.name }}</p>
                <p class="text-sm text-neutral-500">{{ product.quantity }} units sold</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-neutral-900">${{ formatCurrency(product.revenue) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { orders, salesMetrics } = useMockData()
const metrics = salesMetrics

const searchQuery = ref('')
const statusFilter = ref('')
const paymentStatusFilter = ref('')

const filteredOrders = computed(() => {
  return orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === '' || order.status === statusFilter.value
    const matchesPayment = paymentStatusFilter.value === '' || order.paymentStatus === paymentStatusFilter.value
    
    return matchesSearch && matchesStatus && matchesPayment
  })
})

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

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

const getMonthName = (index) => {
  return monthNames[index]
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getOrderStatusColor = (status) => {
  const colors = {
    pending: 'bg-warning-100 text-warning-800',
    processing: 'bg-primary-100 text-primary-800',
    shipped: 'bg-secondary-100 text-secondary-800',
    delivered: 'bg-success-100 text-success-800',
    cancelled: 'bg-danger-100 text-danger-800'
  }
  return colors[status] || 'bg-neutral-100 text-neutral-800'
}

const getPaymentStatusColor = (status) => {
  const colors = {
    pending: 'bg-warning-100 text-warning-800',
    paid: 'bg-success-100 text-success-800',
    failed: 'bg-danger-100 text-danger-800',
    refunded: 'bg-neutral-100 text-neutral-800'
  }
  return colors[status] || 'bg-neutral-100 text-neutral-800'
}

const router = useRouter()
const navigateToOrder = (orderId) => {
  router.push(`/sales/orders/${orderId}`)
}
</script>