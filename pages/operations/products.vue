<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Product catalog management system for organizing, pricing, and tracking all items you sell to customers.'">
          <h2 class="text-2xl font-bold text-gray-900">Products</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Manage your product catalog and inventory</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Catalog
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Import Products
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>
    </div>

    <!-- Product Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('totalProducts')">
              <p class="text-sm text-gray-600">Total Products</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockProducts.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+3 new this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('activeProducts')">
              <p class="text-sm text-gray-600">Active Products</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ activeProducts }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ Math.round((activeProducts / mockProducts.length) * 100) }}% of catalog</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('inventoryValue')">
              <p class="text-sm text-gray-600">Total Value</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalInventoryValue) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">Inventory value</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('lowStockProducts')">
              <p class="text-sm text-gray-600">Low Stock</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ lowStockProducts }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">Need restock</p>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="category in productCategories" 
          :key="category.value"
          @click="categoryFilter = category.value"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            categoryFilter === category.value 
              ? 'bg-primary-100 text-primary-700 border border-primary-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ category.label }}
          <span :class="[
            'ml-2 px-2 py-0.5 rounded-full text-xs',
            categoryFilter === category.value ? 'bg-primary-200' : 'bg-gray-200'
          ]">
            {{ getProductCountByCategory(category.value) }}
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
            placeholder="Search products by name or SKU..." 
            class="input"
          >
        </div>
        <select v-model="statusFilter" class="input">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discontinued">Discontinued</option>
        </select>
        <select v-model="stockFilter" class="input">
          <option value="">All Stock Levels</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 cursor-pointer" @click="selectProduct(product)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ product.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ product.sku }}</div>
                <div class="text-sm text-gray-500">{{ product.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(product.price) }}</div>
                <div class="text-sm text-gray-500">{{ product.unit }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span :class="getStockStatusClass(product.stock)" class="text-sm font-medium">
                    {{ product.stock }}
                  </span>
                  <div :class="getStockIndicatorClass(product.stock)" class="ml-2 w-2 h-2 rounded-full"></div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(product.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStatusName(product.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Detail Modal/Card -->
    <div v-if="selectedProduct" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Product Details: {{ selectedProduct.name }}</h3>
        <button @click="selectedProduct = null" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Product Info -->
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Product Information</h4>
            <div class="bg-gray-50 rounded-lg p-3 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Product Name:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedProduct.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">SKU:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedProduct.sku }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Category:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedProduct.category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Price:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatCurrency(selectedProduct.price) }} / {{ selectedProduct.unit }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <span :class="getStatusBadgeClass(selectedProduct.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ formatStatusName(selectedProduct.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Inventory Info -->
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Inventory Status</h4>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Current Stock:</span>
                  <div class="flex items-center">
                    <span :class="getStockStatusClass(selectedProduct.stock)" class="text-sm font-medium">
                      {{ selectedProduct.stock }} units
                    </span>
                    <div :class="getStockIndicatorClass(selectedProduct.stock)" class="ml-2 w-3 h-3 rounded-full"></div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Stock Value:</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatCurrency(selectedProduct.stock * selectedProduct.price) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Created:</span>
                  <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedProduct.created) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Description -->
      <div class="mt-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Description</h4>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-sm text-gray-900">{{ selectedProduct.description }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockProducts, formatCurrency, getStatusColor } = useMockCRM()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const stockFilter = ref('')
const selectedProduct = ref(null)

const productCategories = [
  { value: '', label: 'All Categories' },
  { value: 'Software', label: 'Software' },
  { value: 'Service', label: 'Services' },
  { value: 'Hardware', label: 'Hardware' }
]

// Computed properties
const activeProducts = computed(() => mockProducts.filter(p => p.status === 'active').length)
const totalInventoryValue = computed(() => mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0))
const lowStockProducts = computed(() => mockProducts.filter(p => p.stock < 100).length)

const filteredProducts = computed(() => {
  let filtered = [...mockProducts]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }
  
  // Apply category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(product => product.category === categoryFilter.value)
  }
  
  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(product => product.status === statusFilter.value)
  }
  
  // Apply stock filter
  if (stockFilter.value) {
    if (stockFilter.value === 'in-stock') {
      filtered = filtered.filter(product => product.stock > 100)
    } else if (stockFilter.value === 'low-stock') {
      filtered = filtered.filter(product => product.stock > 0 && product.stock <= 100)
    } else if (stockFilter.value === 'out-of-stock') {
      filtered = filtered.filter(product => product.stock === 0)
    }
  }
  
  return filtered
})

// Methods
const selectProduct = (product) => {
  selectedProduct.value = product
}

const getProductCountByCategory = (category) => {
  if (!category) return mockProducts.length
  return mockProducts.filter(product => product.category === category).length
}

const formatStatusName = (status) => {
  const statusNames = {
    'active': 'Active',
    'inactive': 'Inactive',
    'discontinued': 'Discontinued'
  }
  return statusNames[status] || status
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'active': 'bg-success-100 text-success-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'discontinued': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStockStatusClass = (stock) => {
  if (stock === 0) return 'text-error-600'
  if (stock <= 100) return 'text-warning-600'
  return 'text-success-600'
}

const getStockIndicatorClass = (stock) => {
  if (stock === 0) return 'bg-error-500'
  if (stock <= 100) return 'bg-warning-500'
  return 'bg-success-500'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Watch for filter changes
watch([searchQuery, categoryFilter, statusFilter, stockFilter], () => {
  selectedProduct.value = null
})
</script>