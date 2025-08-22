<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Customers are individuals or organizations who have purchased your products or services. Track their information, purchase history, and ongoing relationships.'">
          <h2 class="text-2xl font-bold text-gray-900">Customers</h2>
        </HelpTooltip>
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
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Total number of customers in your database, including active, inactive, and prospect customers.'">
              <p class="text-sm text-gray-600 mb-2">Total Customers</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockCustomers.length }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg flex-shrink-0">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+8% this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('active_customer')">
              <p class="text-sm text-gray-600 mb-2">Active Customers</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ activeCustomers }}</p>
            <p class="text-xs text-gray-600 mt-2">{{ Math.round((activeCustomers / mockCustomers.length) * 100) }}% of total</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('customer_lifetime_value')">
              <p class="text-sm text-gray-600 mb-2">Total Value</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalCustomerValue) }}</p>
            <p class="text-xs text-success-600 mt-2">+15% revenue growth</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Average customer lifetime value across all customers. This helps you understand the typical value of each customer relationship.'">
              <p class="text-sm text-gray-600 mb-2">Avg. Value</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(avgCustomerValue) }}</p>
            <p class="text-xs text-gray-600 mt-2">Per customer</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
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

    <!-- Customer 360 View Modal -->
    <div v-if="selectedCustomer" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="selectedCustomer = null">
      <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 shadow-lg rounded-md bg-white" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ selectedCustomer.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ selectedCustomer.company }} • {{ selectedCustomer.id }}</p>
          </div>
          <button @click="selectedCustomer = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Information -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Contact Details -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Contact Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Name:</span> {{ selectedCustomer.name }}
                </div>
                <div>
                  <span class="text-gray-500">Email:</span> 
                  <a :href="`mailto:${selectedCustomer.email}`" class="text-primary-600 hover:text-primary-800">{{ selectedCustomer.email }}</a>
                </div>
                <div>
                  <span class="text-gray-500">Phone:</span> 
                  <a :href="`tel:${selectedCustomer.phone}`" class="text-primary-600 hover:text-primary-800">{{ selectedCustomer.phone }}</a>
                </div>
                <div>
                  <span class="text-gray-500">Industry:</span> {{ selectedCustomer.industry }}
                </div>
              </div>
            </div>

            <!-- Customer Details -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Customer Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Status:</span> 
                  <span :class="getStatusBadgeClass(selectedCustomer.status)" class="ml-2 px-2 py-1 rounded-full text-xs font-semibold">
                    {{ formatStatusName(selectedCustomer.status) }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Customer Value:</span> 
                  <span class="font-semibold text-gray-900">{{ formatCurrency(selectedCustomer.value) }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Customer Since:</span> 
                  <span class="font-semibold">{{ formatDate(selectedCustomer.customerSince || '2022-01-15') }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Last Contact:</span> {{ formatDate(selectedCustomer.lastContact) }}
                </div>
              </div>
            </div>

            <!-- Purchase History -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Recent Purchases</h4>
              <div class="space-y-3">
                <div v-for="purchase in getCustomerPurchases(selectedCustomer.id)" :key="purchase.id" class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-900">{{ purchase.product }}</span>
                    <span class="text-sm font-bold text-gray-900">{{ formatCurrency(purchase.amount) }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>{{ formatDate(purchase.date) }}</span>
                    <span class="px-2 py-1 bg-success-100 text-success-700 rounded-full">{{ purchase.status }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Timeline -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Activity Timeline</h4>
              <div class="space-y-3">
                <div v-for="activity in getCustomerActivities(selectedCustomer.id)" :key="activity.id" class="flex items-start space-x-3">
                  <div :class="activity.type === 'purchase' ? 'bg-green-400' : activity.type === 'contact' ? 'bg-blue-400' : 'bg-gray-400'" class="w-2 h-2 rounded-full mt-2"></div>
                  <div>
                    <p class="text-sm text-gray-900 font-medium">{{ activity.description }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(activity.date) }} • {{ activity.type }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Panel -->
          <div class="space-y-4">
            <!-- Quick Actions -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Actions</h4>
              <div class="space-y-2">
                <button class="w-full btn-primary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Customer
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Meeting
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Order
                </button>
              </div>
            </div>

            <!-- Customer Stats -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Customer Stats</h4>
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Total Orders:</span>
                  <span class="font-medium">{{ getCustomerStats(selectedCustomer.id).totalOrders }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Total Spent:</span>
                  <span class="font-medium">{{ formatCurrency(getCustomerStats(selectedCustomer.id).totalSpent) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Avg. Order Value:</span>
                  <span class="font-medium">{{ formatCurrency(getCustomerStats(selectedCustomer.id).avgOrderValue) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Last Order:</span>
                  <span class="font-medium">{{ getCustomerStats(selectedCustomer.id).lastOrderDate }}</span>
                </div>
              </div>
            </div>

            <!-- Support Tickets -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Support Tickets</h4>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Open:</span>
                  <span class="font-medium text-warning-600">2</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Resolved:</span>
                  <span class="font-medium text-success-600">15</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Satisfaction:</span>
                  <span class="font-medium">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button @click="selectedCustomer = null" class="btn-secondary">Close</button>
          <button @click="editCustomer(selectedCustomer)" class="btn-primary">Edit Customer</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockCustomers, formatCurrency, getStatusColor } = useMockCRM()
const { getHelpText } = useHelpContent()

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
}

const editCustomer = (customer) => {
  console.log('Edit customer:', customer)
  // TODO: Implement customer editing functionality
}

// Mock data generators for customer 360 view
const getCustomerPurchases = (customerId) => {
  const mockPurchases = [
    { id: 1, product: 'Enterprise Software License', amount: 50000, date: '2024-08-15', status: 'Completed' },
    { id: 2, product: 'Professional Services', amount: 25000, date: '2024-07-20', status: 'Completed' },
    { id: 3, product: 'Training Package', amount: 8000, date: '2024-06-10', status: 'Completed' },
    { id: 4, product: 'Support Contract', amount: 15000, date: '2024-05-25', status: 'Active' }
  ]
  return mockPurchases.slice(0, 3) // Return latest 3 purchases
}

const getCustomerActivities = (customerId) => {
  const mockActivities = [
    { id: 1, type: 'purchase', description: 'Purchased Enterprise Software License', date: '2024-08-15' },
    { id: 2, type: 'contact', description: 'Support ticket resolved - Login issues', date: '2024-08-10' },
    { id: 3, type: 'contact', description: 'Phone call - Product demo discussion', date: '2024-08-05' },
    { id: 4, type: 'contact', description: 'Email sent - Monthly newsletter', date: '2024-08-01' },
    { id: 5, type: 'purchase', description: 'Renewed support contract', date: '2024-07-20' }
  ]
  return mockActivities.slice(0, 4) // Return latest 4 activities
}

const getCustomerStats = (customerId) => {
  return {
    totalOrders: 8,
    totalSpent: 125000,
    avgOrderValue: 15625,
    lastOrderDate: '15 days ago'
  }
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