<template>
  <div>
    <!-- Header with Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search customers..."
            class="input pl-10 w-80"
          >
          <svg class="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select v-model="statusFilter" class="input w-40">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="prospect">Prospect</option>
        </select>
      </div>
      <NuxtLink to="/customers/add" class="btn-gradient">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Customer
      </NuxtLink>
    </div>

    <!-- Customers Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Company</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Phone</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Value</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Last Contact</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="customer in filteredCustomers" 
              :key="customer.id"
              @click="navigateToCustomer(customer.id)"
              class="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span class="text-primary-600 font-medium text-sm">{{ getInitials(customer.name) }}</span>
                  </div>
                  <div class="ml-3">
                    <p class="font-medium text-neutral-900">{{ customer.name }}</p>
                    <p class="text-sm text-neutral-500">{{ customer.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 text-neutral-900">{{ customer.company }}</td>
              <td class="py-3 px-4 text-neutral-600">{{ customer.phone }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="getStatusColor(customer.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                </span>
              </td>
              <td class="py-3 px-4 font-semibold text-neutral-900">${{ formatCurrency(customer.value) }}</td>
              <td class="py-3 px-4 text-neutral-500">{{ formatDate(customer.lastContact) }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button @click.stop="$router.push(`/customers/${customer.id}/edit`)" class="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button @click.stop class="p-1 text-neutral-400 hover:text-success-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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

    <!-- Customer Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-success-100">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Active Customers</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ activeCustomers }}</p>
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
            <p class="text-sm font-medium text-neutral-500">Prospects</p>
            <p class="text-2xl font-semibold text-neutral-900">{{ prospects }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-secondary-100">
            <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-neutral-500">Total Value</p>
            <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(totalValue) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { customers } = useMockData()

const searchQuery = ref('')
const statusFilter = ref('')

const filteredCustomers = computed(() => {
  return customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === '' || customer.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const activeCustomers = computed(() => {
  return customers.filter(c => c.status === 'active').length
})

const prospects = computed(() => {
  return customers.filter(c => c.status === 'prospect').length
})

const totalValue = computed(() => {
  return customers.reduce((sum, customer) => sum + customer.value, 0)
})

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

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusColor = (status) => {
  const colors = {
    active: 'status-active',
    inactive: 'status-inactive',
    prospect: 'status-prospect'
  }
  return colors[status] || 'status-inactive'
}

const router = useRouter()
const navigateToCustomer = (customerId) => {
  router.push(`/customers/${customerId}`)
}
</script>