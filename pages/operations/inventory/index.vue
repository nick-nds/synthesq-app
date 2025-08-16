<template>
  <div>
    <!-- Header with Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="input pl-10 w-80"
          >
          <svg class="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select v-model="categoryFilter" class="input w-40">
          <option value="">All Categories</option>
          <option value="Software">Software</option>
          <option value="Service">Service</option>
          <option value="Hardware">Hardware</option>
        </select>
        <select v-model="statusFilter" class="input w-32">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="flex space-x-3">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
        <NuxtLink to="/inventory/add" class="btn-gradient">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </NuxtLink>
      </div>
    </div>

    <!-- Inventory Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-primary-100">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Products</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ totalProducts }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-success-100">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Value</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(totalInventoryValue) }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-warning-100">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Low Stock Items</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ lowStockItems }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-neutral-100">
            <svg class="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Categories</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ totalCategories }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Product</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Category</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">SKU</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Price</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Cost</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Stock</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="product in filteredProducts" 
              :key="product.id"
              @click="navigateToProduct(product.id)"
              class="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <td class="py-3 px-4">
                <div>
                  <p class="font-medium text-neutral-900">{{ product.name }}</p>
                  <p class="text-sm text-neutral-500">{{ product.description }}</p>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-800">
                  {{ product.category }}
                </span>
              </td>
              <td class="py-3 px-4 font-mono text-sm text-neutral-600">{{ product.sku }}</td>
              <td class="py-3 px-4 font-semibold text-neutral-900">${{ product.price }}</td>
              <td class="py-3 px-4 text-neutral-600">${{ product.cost }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <span 
                    :class="getStockColor(product)"
                    class="font-medium"
                  >
                    {{ product.stock }}
                  </span>
                  <span class="text-neutral-400 text-sm ml-1">/ {{ product.minStock }} min</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span 
                  :class="getStatusColor(product.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ product.status.charAt(0).toUpperCase() + product.status.slice(1) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button @click.stop="$router.push(`/inventory/${product.id}/edit`)" class="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button @click.stop class="p-1 text-neutral-400 hover:text-warning-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                  <button @click.stop class="p-1 text-neutral-400 hover:text-danger-600 transition-colors">
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

    <!-- Low Stock Alert -->
    <div v-if="lowStockProducts.length > 0" class="card mt-8 border-l-4 border-warning-500 bg-warning-50">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-warning-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-warning-800">Low Stock Alert</h3>
          <div class="mt-2 text-sm text-warning-700">
            <p>The following products are running low on stock:</p>
            <ul class="mt-2 space-y-1">
              <li v-for="product in lowStockProducts" :key="product.id" class="flex justify-between">
                <span>{{ product.name }}</span>
                <span class="font-medium">{{ product.stock }} remaining (min: {{ product.minStock }})</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { products } = useMockData()

const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

const filteredProducts = computed(() => {
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = categoryFilter.value === '' || product.category === categoryFilter.value
    const matchesStatus = statusFilter.value === '' || product.status === statusFilter.value
    
    return matchesSearch && matchesCategory && matchesStatus
  })
})

const totalProducts = computed(() => products.length)

const totalInventoryValue = computed(() => {
  return products.reduce((sum, product) => sum + (product.price * product.stock), 0)
})

const lowStockItems = computed(() => {
  return products.filter(product => product.stock <= product.minStock).length
})

const lowStockProducts = computed(() => {
  return products.filter(product => product.stock <= product.minStock)
})

const totalCategories = computed(() => {
  return new Set(products.map(product => product.category)).size
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const getStatusColor = (status) => {
  const colors = {
    active: 'bg-success-100 text-success-800',
    inactive: 'bg-neutral-100 text-neutral-800'
  }
  return colors[status] || 'bg-neutral-100 text-neutral-800'
}

const getStockColor = (product) => {
  if (product.stock <= product.minStock) {
    return 'text-danger-600'
  } else if (product.stock <= product.minStock * 2) {
    return 'text-warning-600'
  }
  return 'text-success-600'
}

const router = useRouter()
const navigateToProduct = (productId) => {
  router.push(`/inventory/${productId}`)
}
</script>