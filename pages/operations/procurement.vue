<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Procurement</h2>
        <p class="text-sm text-gray-600 mt-1">Manage vendors, purchase orders, and procurement workflows</p>
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Vendors
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Purchase Order
        </button>
      </div>
    </div>

    <!-- Procurement Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Purchase Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ mockPurchaseOrders.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+8% this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Vendors</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeVendors }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v3m-2 8V9.5" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ mockVendors.length }} total vendors</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Spend</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalSpend) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">-5% vs last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Approvals</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingOrders }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">{{ formatCurrency(pendingAmount) }} awaiting approval</p>
      </div>
    </div>

    <!-- View Toggle -->
    <div class="flex items-center space-x-4">
      <button 
        @click="viewMode = 'orders'" 
        :class="viewMode === 'orders' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
        class="text-sm"
      >
        Purchase Orders
      </button>
      <span class="text-gray-400">|</span>
      <button 
        @click="viewMode = 'vendors'" 
        :class="viewMode === 'vendors' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
        class="text-sm"
      >
        Vendors
      </button>
    </div>

    <!-- Purchase Orders View -->
    <div v-if="viewMode === 'orders'">
      <!-- Status Filter Tabs -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="status in purchaseOrderStatuses" 
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
              {{ getPurchaseOrderCountByStatus(status.value) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search purchase orders..." 
              class="input"
            >
          </div>
          <select v-model="vendorFilter" class="input">
            <option value="">All Vendors</option>
            <option v-for="vendor in mockVendors" :key="vendor.id" :value="vendor.name">{{ vendor.name }}</option>
          </select>
          <select v-model="departmentFilter" class="input">
            <option value="">All Departments</option>
            <option value="Administration">Administration</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
      </div>

      <!-- Purchase Orders Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Order</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Delivery</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredPurchaseOrders" :key="order.id" class="hover:bg-gray-50 cursor-pointer" @click="selectPurchaseOrder(order)">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ order.number }}</div>
                  <div class="text-sm text-gray-500">{{ order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.vendor }}</div>
                  <div class="text-sm text-gray-500">{{ order.vendorId }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.department }}</div>
                  <div class="text-sm text-gray-500">{{ order.approver }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getOrderStatusBadgeClass(order.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ formatOrderStatusName(order.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(order.total) }}</div>
                  <div class="text-sm text-gray-500">{{ order.items.length }} items</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(order.date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(order.expectedDelivery) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button v-if="order.status === 'pending'" class="text-success-600 hover:text-success-900 mr-3">Approve</button>
                  <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                  <button class="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Vendors View -->
    <div v-else>
      <!-- Vendor Categories -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="category in vendorCategories" 
            :key="category"
            @click="categoryFilter = category"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              categoryFilter === category 
                ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ category }}
            <span :class="[
              'ml-2 px-2 py-0.5 rounded-full text-xs',
              categoryFilter === category ? 'bg-primary-200' : 'bg-gray-200'
            ]">
              {{ getVendorCountByCategory(category) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Vendors Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="vendor in filteredVendors" :key="vendor.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow" @click="selectVendor(vendor)">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                <span class="text-primary-600 font-bold text-lg">{{ vendor.name.charAt(0) }}</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ vendor.name }}</h3>
                <p class="text-sm text-gray-500">{{ vendor.category }}</p>
              </div>
            </div>
            <span :class="getVendorStatusBadge(vendor.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ vendor.status }}
            </span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ vendor.contact }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ vendor.email }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ vendor.phone }}
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="text-center">
              <div class="text-lg font-bold text-gray-900">{{ formatCurrency(vendor.totalSpent) }}</div>
              <div class="text-xs text-gray-500">Total Spent</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-gray-900">{{ vendor.ordersCount }}</div>
              <div class="text-xs text-gray-500">Orders</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-gray-900">{{ vendor.paymentTerms }}</div>
              <div class="text-xs text-gray-500">Terms</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Purchase Order Detail Modal -->
    <div v-if="selectedPurchaseOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedPurchaseOrder = null">
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-screen overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Purchase Order: {{ selectedPurchaseOrder.number }}</h3>
          <button @click="selectedPurchaseOrder = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Order Information -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Order Information</h4>
                <div class="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Order Number:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPurchaseOrder.number }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Vendor:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPurchaseOrder.vendor }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Department:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPurchaseOrder.department }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Approver:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPurchaseOrder.approver }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Status:</span>
                    <span :class="getOrderStatusBadgeClass(selectedPurchaseOrder.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                      {{ formatOrderStatusName(selectedPurchaseOrder.status) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Order Date:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedPurchaseOrder.date) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Expected Delivery:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedPurchaseOrder.expectedDelivery) }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Amount Details -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Order Total</h4>
                <div class="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-900">Total Amount:</span>
                    <span class="text-lg font-bold text-gray-900">{{ formatCurrency(selectedPurchaseOrder.total) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Items:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedPurchaseOrder.items.length }} items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Items -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Order Items</h4>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="space-y-3">
                <div v-for="item in selectedPurchaseOrder.items" :key="item.product" class="flex justify-between items-center">
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ item.product }}</div>
                    <div class="text-xs text-gray-600">Qty: {{ item.quantity }} × {{ formatCurrency(item.price) }}</div>
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(item.total) }}</div>
                </div>
                <div class="border-t border-gray-200 pt-2 mt-3">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-900">Total:</span>
                    <span class="text-sm font-bold text-gray-900">{{ formatCurrency(selectedPurchaseOrder.total) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notes -->
          <div v-if="selectedPurchaseOrder.notes" class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Notes</h4>
            <div class="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
              <p class="text-sm text-blue-900">{{ selectedPurchaseOrder.notes }}</p>
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
          <p class="text-sm text-warning-700 mt-1">This page is displaying mock procurement data for demonstration purposes. Real functionality will be available when the backend is integrated.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { mockPurchaseOrders, mockVendors, formatCurrency, getStatusColor } = useMockCRM()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const viewMode = ref('orders')
const searchQuery = ref('')
const statusFilter = ref('')
const vendorFilter = ref('')
const departmentFilter = ref('')
const categoryFilter = ref('')
const selectedPurchaseOrder = ref(null)
const selectedVendor = ref(null)

const purchaseOrderStatuses = [
  { value: '', label: 'All Orders' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' }
]

const vendorCategories = ['All Categories', 'Office Supplies', 'Technology', 'Marketing', 'Operations']

// Computed properties
const activeVendors = computed(() => mockVendors.filter(v => v.status === 'active').length)
const totalSpend = computed(() => mockPurchaseOrders.reduce((sum, order) => sum + order.total, 0))
const pendingOrders = computed(() => mockPurchaseOrders.filter(order => order.status === 'pending').length)
const pendingAmount = computed(() => mockPurchaseOrders.filter(order => order.status === 'pending').reduce((sum, order) => sum + order.total, 0))

const filteredPurchaseOrders = computed(() => {
  let filtered = [...mockPurchaseOrders]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.number.toLowerCase().includes(query) ||
      order.vendor.toLowerCase().includes(query) ||
      order.department.toLowerCase().includes(query)
    )
  }
  
  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }
  
  // Apply vendor filter
  if (vendorFilter.value) {
    filtered = filtered.filter(order => order.vendor === vendorFilter.value)
  }
  
  // Apply department filter
  if (departmentFilter.value) {
    filtered = filtered.filter(order => order.department === departmentFilter.value)
  }
  
  return filtered
})

const filteredVendors = computed(() => {
  let filtered = [...mockVendors]
  
  if (categoryFilter.value && categoryFilter.value !== 'All Categories') {
    filtered = filtered.filter(vendor => vendor.category === categoryFilter.value)
  }
  
  return filtered
})

// Methods
const selectPurchaseOrder = (order) => {
  selectedPurchaseOrder.value = order
}

const selectVendor = (vendor) => {
  selectedVendor.value = vendor
}

const getPurchaseOrderCountByStatus = (status) => {
  if (!status) return mockPurchaseOrders.length
  return mockPurchaseOrders.filter(order => order.status === status).length
}

const getVendorCountByCategory = (category) => {
  if (category === 'All Categories') return mockVendors.length
  return mockVendors.filter(vendor => vendor.category === category).length
}

const formatOrderStatusName = (status) => {
  const statusNames = {
    'pending': 'Pending Approval',
    'approved': 'Approved',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  }
  return statusNames[status] || status
}

const getOrderStatusBadgeClass = (status) => {
  const statusClasses = {
    'pending': 'bg-warning-100 text-warning-800',
    'approved': 'bg-success-100 text-success-800',
    'delivered': 'bg-primary-100 text-primary-800',
    'cancelled': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getVendorStatusBadge = (status) => {
  const statusClasses = {
    'active': 'bg-success-100 text-success-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'pending': 'bg-warning-100 text-warning-800'
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

// Watch for filter changes
watch([searchQuery, statusFilter, vendorFilter, departmentFilter], () => {
  selectedPurchaseOrder.value = null
})
</script>