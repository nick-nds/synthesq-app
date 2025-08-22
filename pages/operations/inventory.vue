<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="getHelpText('inventoryManagement')">
          <h2 class="text-2xl font-bold text-gray-900">Inventory Management</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Track stock levels, manage inventory, and monitor product movement</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Reports
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Import Stock
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Stock Adjustment
        </button>
      </div>
    </div>

    <!-- Inventory Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('totalSKUs')">
              <p class="text-sm text-gray-600">Total SKUs</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockProducts.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">Across all locations</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('inStock')">
              <p class="text-sm text-gray-600">In Stock</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ inStockProducts }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ Math.round((inStockProducts / mockProducts.length) * 100) }}% availability</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('lowStock')">
              <p class="text-sm text-gray-600">Low Stock Alerts</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ lowStockCount }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">Need immediate attention</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('outOfStock')">
              <p class="text-sm text-gray-600">Out of Stock</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ outOfStockCount }}</p>
          </div>
          <div class="p-3 bg-error-100 rounded-lg">
            <svg class="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-error-600 mt-2">Immediate restocking required</p>
      </div>
    </div>

    <!-- Inventory Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <HelpTooltip :content="getHelpText('inventoryTurnover')">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Inventory Turnover</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="category in inventoryCategories" :key="category.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="category.color" class="w-3 h-3 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">{{ category.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ category.turnover }}x</div>
              <div class="text-xs text-gray-500">{{ category.days }} days avg</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <HelpTooltip :content="getHelpText('stockMovement')">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Recent Stock Movement</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="movement in recentMovements" :key="movement.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="getMovementColor(movement.type)" class="w-3 h-3 rounded-full mr-2"></div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ movement.product }}</div>
                <div class="text-xs text-gray-500">{{ movement.type }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ movement.quantity }}</div>
              <div class="text-xs text-gray-500">{{ formatDate(movement.date) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <HelpTooltip :content="getHelpText('reorderAlerts')">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Reorder Alerts</h3>
        </HelpTooltip>
        <div class="space-y-3">
          <div v-for="alert in reorderAlerts.slice(0, 4)" :key="alert.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ alert.product }}</div>
                <div class="text-xs text-gray-500">Current: {{ alert.currentStock }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ alert.reorderLevel }}</div>
              <div class="text-xs text-gray-500">Min level</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 class="text-lg font-semibold text-gray-900">Inventory Overview</h3>
          <div class="flex items-center space-x-2">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search inventory..." 
              class="input w-64"
            >
            <select v-model="stockFilter" class="input">
              <option value="">All Stock Levels</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredInventory" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                <div class="text-sm text-gray-500">{{ item.category }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.sku }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.stock }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.reorderLevel }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStockStatusClass(item)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStockStatus(item) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(item.lastUpdated) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Adjust</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockProducts, formatCurrency } = useMockCRM()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const searchQuery = ref('')
const stockFilter = ref('')

// Computed properties for inventory stats
const inStockProducts = computed(() => mockProducts.filter(p => p.stock > p.reorderLevel).length)
const lowStockCount = computed(() => mockProducts.filter(p => p.stock <= p.reorderLevel && p.stock > 0).length)
const outOfStockCount = computed(() => mockProducts.filter(p => p.stock === 0).length)

// Mock data for inventory-specific features
const inventoryCategories = [
  { name: 'Electronics', turnover: 12, days: 30, color: 'bg-blue-500' },
  { name: 'Clothing', turnover: 8, days: 45, color: 'bg-green-500' },
  { name: 'Books', turnover: 6, days: 60, color: 'bg-purple-500' },
  { name: 'Home & Garden', turnover: 4, days: 90, color: 'bg-yellow-500' }
]

const recentMovements = [
  { id: 1, product: 'Wireless Headphones', type: 'Sale', quantity: -5, date: '2024-01-15' },
  { id: 2, product: 'Gaming Laptop', type: 'Restock', quantity: +10, date: '2024-01-14' },
  { id: 3, product: 'Office Chair', type: 'Return', quantity: +2, date: '2024-01-14' },
  { id: 4, product: 'Bluetooth Speaker', type: 'Sale', quantity: -3, date: '2024-01-13' }
]

const reorderAlerts = mockProducts.filter(p => p.stock <= p.reorderLevel).map(p => ({
  id: p.id,
  product: p.name,
  currentStock: p.stock,
  reorderLevel: p.reorderLevel
}))

// Computed for filtered inventory
const filteredInventory = computed(() => {
  let filtered = [...mockProducts]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query)
    )
  }
  
  if (stockFilter.value) {
    filtered = filtered.filter(item => {
      if (stockFilter.value === 'in-stock') return item.stock > item.reorderLevel
      if (stockFilter.value === 'low-stock') return item.stock <= item.reorderLevel && item.stock > 0
      if (stockFilter.value === 'out-of-stock') return item.stock === 0
      return true
    })
  }
  
  return filtered
})

// Methods
const getMovementColor = (type) => {
  const colors = {
    'Sale': 'bg-red-500',
    'Restock': 'bg-green-500',
    'Return': 'bg-blue-500',
    'Adjustment': 'bg-yellow-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getStockStatus = (item) => {
  if (item.stock === 0) return 'Out of Stock'
  if (item.stock <= item.reorderLevel) return 'Low Stock'
  return 'In Stock'
}

const getStockStatusClass = (item) => {
  if (item.stock === 0) return 'bg-error-100 text-error-800'
  if (item.stock <= item.reorderLevel) return 'bg-warning-100 text-warning-800'
  return 'bg-success-100 text-success-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>