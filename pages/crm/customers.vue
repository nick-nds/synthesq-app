<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Customers</h2>
        <p class="text-sm text-gray-600 mt-1">Manage your customer relationships and interactions</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Import
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Customer
        </button>
      </div>
    </div>

    <!-- Customer Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Customers</p>
            <p class="text-2xl font-bold text-gray-900">{{ mockCustomers.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+8% this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Customers</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeCustomers }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ Math.round((activeCustomers / mockCustomers.length) * 100) }}% of total</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalCustomerValue) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+15% revenue growth</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Avg. Value</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(avgCustomerValue) }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">Per customer</p>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search customers by name, company, or email..." 
            class="input"
          >
        </div>
        <select v-model="statusFilter" class="input">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="prospect">Prospect</option>
        </select>
        <select v-model="typeFilter" class="input">
          <option value="">All Types</option>
          <option value="company">Company</option>
          <option value="individual">Individual</option>
        </select>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in filteredCustomers" :key="customer.id" class="hover:bg-gray-50 cursor-pointer" @click="selectCustomer(customer)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-sm">{{ customer.avatar }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                    <div class="text-sm text-gray-500">{{ customer.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ customer.company }}</div>
                <div class="text-sm text-gray-500">{{ customer.industry }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ customer.email }}</div>
                <div class="text-sm text-gray-500">{{ customer.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(customer.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStatusName(customer.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(customer.value) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(customer.lastContact) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ Math.min((currentPage - 1) * itemsPerPage + 1, filteredCustomers.length) }}</span> to 
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredCustomers.length) }}</span> of 
            <span class="font-medium">{{ filteredCustomers.length }}</span> results
          </div>
          <div class="flex space-x-2">
            <button 
              @click="previousPage" 
              :disabled="currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-1 border rounded-md text-sm font-medium',
                currentPage === page 
                  ? 'border-primary-600 bg-primary-600 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
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
const { mockCustomers, formatCurrency, getStatusColor } = useMockCRM()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const selectedCustomer = ref(null)

// Computed properties
const activeCustomers = computed(() => mockCustomers.filter(c => c.status === 'active').length)
const totalCustomerValue = computed(() => mockCustomers.reduce((sum, c) => sum + c.value, 0))
const avgCustomerValue = computed(() => Math.round(totalCustomerValue.value / mockCustomers.length))

const filteredCustomers = computed(() => {
  let filtered = [...mockCustomers]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(query) ||
      customer.company.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    )
  }
  
  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(customer => customer.status === statusFilter.value)
  }
  
  // Apply type filter
  if (typeFilter.value) {
    filtered = filtered.filter(customer => customer.type === typeFilter.value)
  }
  
  return filtered
})

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCustomers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const selectCustomer = (customer) => {
  selectedCustomer.value = customer
  console.log('Selected customer:', customer)
}

const formatStatusName = (status) => {
  const statusNames = {
    'active': 'Active',
    'inactive': 'Inactive',
    'prospect': 'Prospect'
  }
  return statusNames[status] || status
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'active': 'bg-success-100 text-success-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'prospect': 'bg-warning-100 text-warning-800'
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

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Watch for filter changes and reset pagination
watch([searchQuery, statusFilter, typeFilter], () => {
  currentPage.value = 1
})
</script>