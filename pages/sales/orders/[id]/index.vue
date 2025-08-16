<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div class="flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span class="text-lg font-medium text-neutral-700">Loading order details...</span>
        </div>
      </div>
    </div>

    <!-- Order View -->
    <div v-else>
      <!-- Floating Header with Glassmorphism -->
      <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <NuxtLink to="/sales" class="group p-2 rounded-xl text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">Order #{{ order.orderNumber }}</h1>
                <p class="text-neutral-500 mt-1">{{ order.customerName }} • {{ formatDate(order.orderDate) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <NuxtLink :to="`/sales/orders/${orderId}/edit`" class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:text-primary-900 hover:bg-primary-50 transition-all duration-200 hover:shadow-md">
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Order
                </div>
              </NuxtLink>
              <button 
                @click="printInvoice"
                class="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Invoice
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-12 gap-8">
          <!-- Order Details -->
          <div class="col-span-12 lg:col-span-8 space-y-6">
            <!-- Order Overview -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <div class="flex items-start justify-between mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-neutral-900">Order #{{ order.orderNumber }}</h2>
                  <p class="text-neutral-600 mt-1">{{ order.description || 'Standard order' }}</p>
                </div>
                <div class="text-right">
                  <span 
                    :class="getOrderStatusClass(order.status)"
                    class="inline-flex px-4 py-2 text-sm font-medium rounded-full"
                  >
                    {{ formatOrderStatus(order.status) }}
                  </span>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span class="text-sm font-medium text-neutral-500">Order Date</span>
                  <p class="text-neutral-900 font-medium">{{ formatDate(order.orderDate) }}</p>
                </div>
                <div>
                  <span class="text-sm font-medium text-neutral-500">Expected Delivery</span>
                  <p class="text-neutral-900 font-medium">{{ formatDate(order.expectedDelivery) }}</p>
                </div>
              </div>

              <!-- Order Totals -->
              <div class="bg-gradient-to-r from-neutral-50 to-white rounded-xl p-6 border border-neutral-200">
                <div class="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Subtotal</span>
                    <p class="text-xl font-bold text-neutral-900">${{ formatCurrency(order.subtotal) }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Tax</span>
                    <p class="text-xl font-bold text-neutral-700">${{ formatCurrency(order.tax) }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Shipping</span>
                    <p class="text-xl font-bold text-neutral-700">${{ formatCurrency(order.shipping) }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Total</span>
                    <p class="text-2xl font-bold text-primary-600">${{ formatCurrency(order.total) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                Order Items
              </h3>

              <div class="space-y-4">
                <div v-for="item in order.items" :key="item.id" class="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
                      <svg class="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-neutral-900">{{ item.name }}</h4>
                      <p class="text-sm text-neutral-600">SKU: {{ item.sku }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-neutral-900">{{ item.quantity }} × ${{ formatCurrency(item.unitPrice) }}</p>
                    <p class="text-lg font-bold text-primary-600">${{ formatCurrency(item.total) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Customer Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Customer Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Customer Name</span>
                    <p class="text-neutral-900 font-medium">{{ order.customerName }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Email</span>
                    <p class="text-neutral-900 font-medium">{{ order.email }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Phone</span>
                    <p class="text-neutral-900 font-medium">{{ order.phone || 'Not provided' }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Billing Address</span>
                    <div class="text-neutral-900 font-medium text-sm">
                      <p>{{ order.billingAddress }}</p>
                      <p>{{ order.billingCity }}, {{ order.billingState }} {{ order.billingZip }}</p>
                      <p>{{ order.billingCountry }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping & Payment -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Shipping & Payment
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-neutral-700 mb-3">Shipping Information</h4>
                  <div class="space-y-2">
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Method</span>
                      <p class="text-neutral-900 font-medium">{{ order.shippingMethod }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Status</span>
                      <span 
                        :class="getShippingStatusClass(order.shippingStatus)"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full ml-2"
                      >
                        {{ formatShippingStatus(order.shippingStatus) }}
                      </span>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Tracking Number</span>
                      <p class="text-neutral-900 font-medium font-mono">{{ order.trackingNumber || 'Not available' }}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-neutral-700 mb-3">Payment Information</h4>
                  <div class="space-y-2">
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Method</span>
                      <p class="text-neutral-900 font-medium">{{ order.paymentMethod }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Status</span>
                      <span 
                        :class="getPaymentStatusClass(order.paymentStatus)"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full ml-2"
                      >
                        {{ formatPaymentStatus(order.paymentStatus) }}
                      </span>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Transaction ID</span>
                      <p class="text-neutral-900 font-medium font-mono">{{ order.transactionId || 'Not available' }}</p>
                    </div>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span class="font-medium text-neutral-700">Process Refund</span>
                  </button>
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Download Invoice</span>
                  </button>
                </div>
              </div>

              <!-- Order Progress -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Order Progress</h3>
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-neutral-900">Order Placed</p>
                      <p class="text-xs text-neutral-500">{{ formatDate(order.orderDate) }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full" :class="order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-neutral-300'"></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-neutral-900">Payment Confirmed</p>
                      <p class="text-xs text-neutral-500">{{ order.paymentStatus === 'paid' ? formatDate(order.paymentDate) : 'Pending' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full" :class="['processing', 'shipped', 'delivered'].includes(order.shippingStatus) ? 'bg-green-500' : 'bg-neutral-300'"></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-neutral-900">Order Processing</p>
                      <p class="text-xs text-neutral-500">{{ ['processing', 'shipped', 'delivered'].includes(order.shippingStatus) ? 'In progress' : 'Pending' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full" :class="['shipped', 'delivered'].includes(order.shippingStatus) ? 'bg-green-500' : 'bg-neutral-300'"></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-neutral-900">Shipped</p>
                      <p class="text-xs text-neutral-500">{{ ['shipped', 'delivered'].includes(order.shippingStatus) ? formatDate(order.shippedDate) : 'Pending' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full" :class="order.shippingStatus === 'delivered' ? 'bg-green-500' : 'bg-neutral-300'"></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-neutral-900">Delivered</p>
                      <p class="text-xs text-neutral-500">{{ order.shippingStatus === 'delivered' ? formatDate(order.deliveredDate) : 'Pending' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Order Summary</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Items</span>
                    <span class="font-semibold text-neutral-900">{{ order.items.length }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Total Quantity</span>
                    <span class="font-semibold text-neutral-900">{{ totalQuantity }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Weight</span>
                    <span class="font-semibold text-neutral-900">{{ order.totalWeight || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between items-center pt-3 border-t border-neutral-200">
                    <span class="text-sm text-neutral-600">Order Total</span>
                    <span class="font-bold text-primary-600 text-lg">${{ formatCurrency(order.total) }}</span>
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

const orderId = route.params.id
const loading = ref(true)

// Order data
const order = ref({})

// Load order data
onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock order data
    order.value = {
      id: orderId,
      orderNumber: 'ORD-2024-001',
      customerName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      status: 'processing',
      orderDate: '2024-01-20',
      expectedDelivery: '2024-01-25',
      description: 'CRM software licenses and implementation services',
      billingAddress: '123 Innovation Drive',
      billingCity: 'San Francisco',
      billingState: 'CA',
      billingZip: '94105',
      billingCountry: 'United States',
      shippingMethod: 'Digital Delivery',
      shippingStatus: 'processing',
      paymentMethod: 'Credit Card (**** 4567)',
      paymentStatus: 'paid',
      paymentDate: '2024-01-20',
      trackingNumber: null,
      transactionId: 'txn_1234567890',
      shippedDate: null,
      deliveredDate: null,
      items: [
        {
          id: 1,
          name: 'Professional CRM License',
          sku: 'CRM-PRO-001',
          quantity: 5,
          unitPrice: 299,
          total: 1495
        },
        {
          id: 2,
          name: 'Implementation Services',
          sku: 'SRV-IMP-001',
          quantity: 1,
          unitPrice: 2500,
          total: 2500
        },
        {
          id: 3,
          name: 'Training Package',
          sku: 'TRN-PKG-001',
          quantity: 1,
          unitPrice: 750,
          total: 750
        }
      ],
      subtotal: 4745,
      tax: 379.60,
      shipping: 0,
      total: 5124.60,
      totalWeight: null
    }
  } catch (error) {
    console.error('Error loading order:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties
const totalQuantity = computed(() => {
  return order.value.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
})

// Helper functions
const getOrderStatusClass = (status) => {
  const classes = {
    pending: 'bg-amber-100 text-amber-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

const getShippingStatusClass = (status) => {
  const classes = {
    pending: 'bg-amber-100 text-amber-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

const getPaymentStatusClass = (status) => {
  const classes = {
    pending: 'bg-amber-100 text-amber-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-neutral-100 text-neutral-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

const formatOrderStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatShippingStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatPaymentStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
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
const printInvoice = async () => {
  try {
    // Simulate invoice generation
    await new Promise(resolve => setTimeout(resolve, 1000))
    window.print()
  } catch (error) {
    console.error('Error printing invoice:', error)
  }
}
</script>