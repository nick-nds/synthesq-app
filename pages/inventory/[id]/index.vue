<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div class="flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span class="text-lg font-medium text-neutral-700">Loading product details...</span>
        </div>
      </div>
    </div>

    <!-- Product View -->
    <div v-else>
      <!-- Floating Header with Glassmorphism -->
      <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <NuxtLink to="/inventory" class="group p-2 rounded-xl text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </NuxtLink>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">{{ product.name }}</h1>
                <p class="text-neutral-500 mt-1">{{ product.sku }} • {{ product.category }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <NuxtLink :to="`/inventory/${productId}/edit`" class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:text-primary-900 hover:bg-primary-50 transition-all duration-200 hover:shadow-md">
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Product
                </div>
              </NuxtLink>
              <button 
                @click="duplicateProduct"
                class="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div class="relative flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Duplicate
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-12 gap-8">
          <!-- Product Details -->
          <div class="col-span-12 lg:col-span-8 space-y-6">
            <!-- Product Overview -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <div class="flex items-start space-x-6">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <div class="w-48 h-48 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center border-2 border-dashed border-neutral-300">
                    <svg class="w-20 h-20 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <!-- Product Info -->
                <div class="flex-1 space-y-4">
                  <div>
                    <h2 class="text-2xl font-bold text-neutral-900">{{ product.name }}</h2>
                    <p class="text-neutral-600 mt-2">{{ product.description || 'No description available' }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Category</span>
                      <p class="text-neutral-900 font-medium">{{ product.category }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-neutral-500">Status</span>
                      <div class="mt-1">
                        <span 
                          :class="getStatusClass(product.status)"
                          class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                        >
                          {{ product.status.charAt(0).toUpperCase() + product.status.slice(1) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Price Information -->
                  <div class="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
                    <div class="text-center">
                      <span class="text-sm font-medium text-neutral-500">Selling Price</span>
                      <p class="text-2xl font-bold text-primary-600">${{ product.price }}</p>
                    </div>
                    <div class="text-center">
                      <span class="text-sm font-medium text-neutral-500">Cost Price</span>
                      <p class="text-xl font-semibold text-neutral-700">${{ product.cost }}</p>
                    </div>
                    <div class="text-center">
                      <span class="text-sm font-medium text-neutral-500">Profit Margin</span>
                      <p class="text-xl font-semibold text-green-600">{{ profitMargin }}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Inventory Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                Inventory Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Current Stock -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-blue-600 font-medium text-sm">Current Stock</p>
                      <p class="text-3xl font-bold text-blue-800">{{ product.stock }}</p>
                      <p class="text-blue-600 text-sm">{{ product.unit || 'units' }}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Minimum Stock -->
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-amber-600 font-medium text-sm">Minimum Stock</p>
                      <p class="text-3xl font-bold text-amber-800">{{ product.minStock }}</p>
                      <p class="text-amber-600 text-sm">threshold</p>
                    </div>
                    <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Stock Value -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-green-600 font-medium text-sm">Stock Value</p>
                      <p class="text-3xl font-bold text-green-800">${{ formatCurrency(stockValue) }}</p>
                      <p class="text-green-600 text-sm">total value</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stock Status Alert -->
              <div v-if="stockStatus !== 'good'" class="mt-6 p-4 rounded-xl" :class="stockStatusClass">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="stockStatus === 'warning'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="font-medium">{{ stockStatusMessage }}</p>
                    <p class="text-sm mt-1">Consider restocking to maintain optimal inventory levels.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <h3 class="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Additional Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Supplier</span>
                    <p class="text-neutral-900 font-medium">{{ product.supplier || 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Storage Location</span>
                    <p class="text-neutral-900 font-medium">{{ product.location || 'Not specified' }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Barcode</span>
                    <p class="text-neutral-900 font-medium font-mono">{{ product.barcode || 'Not specified' }}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-neutral-500">Weight</span>
                    <p class="text-neutral-900 font-medium">{{ product.weight ? `${product.weight} kg` : 'Not specified' }}</p>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span class="font-medium text-neutral-700">Adjust Stock</span>
                  </button>
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-secondary-300 hover:bg-secondary-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-secondary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                    </svg>
                    <span class="font-medium text-neutral-700">Generate Barcode</span>
                  </button>
                  <button class="w-full flex items-center px-4 py-3 text-left rounded-xl border border-neutral-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                    <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="font-medium text-neutral-700">View Reports</span>
                  </button>
                </div>
              </div>

              <!-- Product Metrics -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Product Metrics</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Created</span>
                    <span class="font-semibold text-neutral-900">{{ formatDate(product.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Last Updated</span>
                    <span class="font-semibold text-neutral-900">{{ formatDate(product.updatedAt) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Times Sold</span>
                    <span class="font-semibold text-neutral-900">{{ product.timesSold || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-neutral-600">Total Revenue</span>
                    <span class="font-semibold text-green-600">${{ formatCurrency(product.totalRevenue || 0) }}</span>
                  </div>
                </div>
              </div>

              <!-- Stock History -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Recent Stock Changes</h3>
                <div class="space-y-3">
                  <div v-for="change in stockHistory" :key="change.id" class="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0">
                    <div>
                      <p class="text-sm font-medium text-neutral-900">{{ change.type }}</p>
                      <p class="text-xs text-neutral-500">{{ formatDate(change.date) }}</p>
                    </div>
                    <div class="text-right">
                      <p :class="change.quantity > 0 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                        {{ change.quantity > 0 ? '+' : '' }}{{ change.quantity }}
                      </p>
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

const productId = route.params.id
const loading = ref(true)

// Product data
const product = ref({})

// Mock stock history
const stockHistory = ref([
  { id: 1, type: 'Stock Added', quantity: 50, date: '2024-01-20' },
  { id: 2, type: 'Sale', quantity: -2, date: '2024-01-19' },
  { id: 3, type: 'Stock Added', quantity: 100, date: '2024-01-15' },
  { id: 4, type: 'Sale', quantity: -1, date: '2024-01-14' },
])

// Load product data
onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock product data
    product.value = {
      id: productId,
      name: 'Professional CRM License',
      sku: 'CRM-PRO-001',
      description: 'Professional CRM software license for small to medium businesses. Includes advanced features like pipeline management, reporting, and integrations.',
      category: 'Software',
      status: 'active',
      price: 299,
      cost: 150,
      stock: 100,
      minStock: 10,
      unit: 'licenses',
      supplier: 'TechCorp Solutions',
      location: 'Digital Inventory',
      barcode: '1234567890123',
      weight: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20',
      timesSold: 45,
      totalRevenue: 13455
    }
  } catch (error) {
    console.error('Error loading product:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties
const profitMargin = computed(() => {
  if (!product.value.price || !product.value.cost) return 0
  return (((product.value.price - product.value.cost) / product.value.price) * 100).toFixed(1)
})

const stockValue = computed(() => {
  return (product.value.stock || 0) * (product.value.price || 0)
})

const stockStatus = computed(() => {
  if (!product.value.stock || !product.value.minStock) return 'unknown'
  if (product.value.stock <= product.value.minStock) return 'critical'
  if (product.value.stock <= product.value.minStock * 2) return 'warning'
  return 'good'
})

const stockStatusClass = computed(() => {
  const classes = {
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    critical: 'bg-red-50 text-red-700 border border-red-200'
  }
  return classes[stockStatus.value] || ''
})

const stockStatusMessage = computed(() => {
  const messages = {
    warning: 'Stock level is getting low',
    critical: 'Stock level is critically low!'
  }
  return messages[stockStatus.value] || ''
})

// Helper functions
const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
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
const duplicateProduct = async () => {
  try {
    // Simulate duplication
    await new Promise(resolve => setTimeout(resolve, 1000))
    await router.push('/inventory/add?duplicate=' + productId)
  } catch (error) {
    console.error('Error duplicating product:', error)
  }
}
</script>