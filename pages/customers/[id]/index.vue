<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div class="flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span class="text-lg font-medium text-neutral-700">Loading customer details...</span>
        </div>
      </div>
    </div>

    <!-- Customer View -->
    <div v-else>
      <!-- Floating Header with Glassmorphism -->
      <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <NuxtLink to="/customers" class="group p-2 rounded-xl text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </NuxtLink>
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold text-lg">{{ customerInitials }}</span>
                </div>
                <div>
                  <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">{{ customer.name }}</h1>
                  <p class="text-neutral-500 mt-1">{{ customer.email }} • {{ customer.company || 'Individual Customer' }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <NuxtLink :to="`/customers/${customerId}/edit`" class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:text-primary-900 hover:bg-primary-50 transition-all duration-200 hover:shadow-md">
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Customer
                </div>
              </NuxtLink>
              <button 
                @click="createOrder"
                class="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Create Order
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-12 gap-8">
          <!-- Customer Details -->
          <div class="col-span-12 lg:col-span-8 space-y-6">
            <!-- Customer Overview -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <div class="flex items-start space-x-6">
                <!-- Customer Avatar -->
                <div class="flex-shrink-0">
                  <div class="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl">
                    <span class="text-white font-bold text-4xl">{{ customerInitials }}</span>
                  </div>
                </div>

                <!-- Customer Info -->
                <div class="flex-1 space-y-4">
                  <div>
                    <h2 class="text-2xl font-bold text-neutral-900">{{ customer.name }}</h2>
                    <p class="text-neutral-600 mt-1">{{ customer.title || 'Customer' }} {{ customer.company ? `at ${customer.company}` : '' }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Status</span>
                      <div class="mt-1">
                        <span 
                          :class="getStatusClass(customer.status)"
                          class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                        >
                          {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Customer Type</span>
                      <p class="text-neutral-900 font-medium">{{ customer.type || 'Individual' }}</p>
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div class="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Email</span>
                      <p class="text-neutral-900 font-medium">{{ customer.email }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Phone</span>
                      <p class="text-neutral-900 font-medium">{{ customer.phone || 'Not provided' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Business Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Company</span>
                    <p class="text-neutral-900 font-medium">{{ customer.company || 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Industry</span>
                    <p class="text-neutral-900 font-medium">{{ customer.industry || 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Website</span>
                    <p class="text-neutral-900 font-medium">{{ customer.website || 'Not specified' }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Tax ID</span>
                    <p class="text-neutral-900 font-medium font-mono">{{ customer.taxId || 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Annual Revenue</span>
                    <p class="text-neutral-900 font-medium">{{ customer.annualRevenue ? `$${formatCurrency(customer.annualRevenue)}` : 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Employees</span>
                    <p class="text-neutral-900 font-medium">{{ customer.employees || 'Not specified' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Address Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Address Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-neutral-700 mb-3">Billing Address</h4>
                  <div class="space-y-2 text-sm">
                    <p class="text-neutral-900">{{ customer.address || 'Not specified' }}</p>
                    <p class="text-neutral-900">{{ customer.city ? `${customer.city}, ${customer.state} ${customer.zip}` : 'Not specified' }}</p>
                    <p class="text-neutral-900">{{ customer.country || 'Not specified' }}</p>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-neutral-700 mb-3">Shipping Address</h4>
                  <div class="space-y-2 text-sm">
                    <p class="text-neutral-900">{{ customer.shippingAddress || customer.address || 'Same as billing' }}</p>
                    <p class="text-neutral-900">{{ customer.shippingCity ? `${customer.shippingCity}, ${customer.shippingState} ${customer.shippingZip}` : (customer.city ? `${customer.city}, ${customer.state} ${customer.zip}` : 'Not specified') }}</p>
                    <p class="text-neutral-900">{{ customer.shippingCountry || customer.country || 'Not specified' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="customer.tags && customer.tags.length > 0" class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                Tags
              </h3>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in customer.tags" 
                  :key="tag"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200"
                >
                  {{ tag }}
                </span>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Call Customer</span>
                  </button>
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Create Order</span>
                  </button>
                </div>
              </div>

              <!-- Customer Metrics -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Customer Metrics</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Customer Since</span>
                    <span class="font-semibold text-neutral-900">{{ formatDate(customer.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Last Contact</span>
                    <span class="font-semibold text-neutral-900">{{ formatDate(customer.lastContact) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Total Orders</span>
                    <span class="font-semibold text-neutral-900">{{ customer.totalOrders || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Total Value</span>
                    <span class="font-semibold text-green-600">${{ formatCurrency(customer.totalValue || 0) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Avg. Order Value</span>
                    <span class="font-semibold text-primary-600">${{ formatCurrency(customer.avgOrderValue || 0) }}</span>
                  </div>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Recent Activity</h3>
                <div class="space-y-3">
                  <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0">
                    <div>
                      <p class="text-sm font-medium text-neutral-900">{{ activity.type }}</p>
                      <p class="text-xs text-neutral-500">{{ formatDate(activity.date) }}</p>
                    </div>
                    <div class="text-right">
                      <span :class="activity.value ? 'text-green-600' : 'text-neutral-500'" class="text-sm font-medium">
                        {{ activity.value || activity.status }}
                      </span>
                    </div>
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
  layout: 'default'
})

const route = useRoute()
const router = useRouter()

const customerId = route.params.id
const loading = ref(true)

// Customer data
const customer = ref({})

// Mock recent activity
const recentActivity = ref([
  { id: 1, type: 'Order Placed', value: '$1,250', date: '2024-01-20' },
  { id: 2, type: 'Email Sent', status: 'Opened', date: '2024-01-19' },
  { id: 3, type: 'Payment Received', value: '$850', date: '2024-01-18' },
  { id: 4, type: 'Phone Call', status: 'Completed', date: '2024-01-17' },
])

// Load customer data
onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock customer data
    customer.value = {
      id: customerId,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      company: 'TechStart Solutions',
      title: 'CEO',
      status: 'active',
      type: 'Business',
      industry: 'Technology',
      website: 'https://techstart.example.com',
      taxId: '12-3456789',
      annualRevenue: 2500000,
      employees: '25-50',
      address: '123 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      shippingAddress: null,
      shippingCity: null,
      shippingState: null,
      shippingZip: null,
      shippingCountry: null,
      tags: ['VIP', 'Technology', 'West Coast', 'Enterprise'],
      createdAt: '2023-06-15',
      lastContact: '2024-01-20',
      totalOrders: 15,
      totalValue: 18750,
      avgOrderValue: 1250
    }
  } catch (error) {
    console.error('Error loading customer:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties
const customerInitials = computed(() => {
  if (!customer.value.name) return ''
  return customer.value.name.split(' ').map(n => n[0]).join('').toUpperCase()
})

// Helper functions
const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    prospect: 'bg-blue-100 text-blue-800',
    inactive: 'bg-neutral-100 text-neutral-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
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
const createOrder = async () => {
  try {
    await router.push(`/sales/orders/add?customer=${customerId}`)
  } catch (error) {
    console.error('Error creating order:', error)
  }
}
</script>